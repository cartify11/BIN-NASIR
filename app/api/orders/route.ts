import { NextRequest, NextResponse } from 'next/server';
import { createOrderSchema } from '@/lib/validation';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { triggerOrderWebhook } from '@/lib/webhook';
import { generateOrderNumber } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '@/lib/cart-context';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate Input using Zod Schema
    const validationResult = createOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: 'Validation failed. Please check your inputs.',
        },
        { status: 400 }
      );
    }

    const input = validationResult.data;

    // 2. Calculate subtotal, discount, shipping fee, and total
    const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.max(0, input.discount_amount || 0);
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const shipping_fee = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const total = discountedSubtotal + shipping_fee;

    const payment_method = input.payment_method || 'cod';
    const payment_status = payment_method === 'advance' || payment_method === 'bank_transfer'
      ? (input.payment_proof_url ? 'pending_verification' : 'unpaid')
      : 'unpaid';

    // 3. Check if Supabase is fully configured
    if (!isSupabaseConfigured()) {
      console.warn('[API /orders] Supabase credentials not configured. Processing in Mock/Demo mode.');

      const mockOrderNumber = generateOrderNumber();
      const mockOrderId = `demo-${Date.now()}`;

      const mockOrder = {
        id: mockOrderId,
        order_number: mockOrderNumber,
        customer_name: input.customer_name,
        phone: input.phone,
        city: input.city,
        address: input.address,
        notes: input.notes || null,
        total,
        shipping_fee,
        discount_amount: discount,
        coupon_code: input.coupon_code || null,
        payment_method,
        payment_status,
        payment_proof_url: input.payment_proof_url || null,
        status: 'pending' as const,
        confirmation_status: 'not_called' as const,
        created_at: new Date().toISOString(),
        order_items: input.items,
      };

      // Call automation webhook
      await triggerOrderWebhook(mockOrder);

      return NextResponse.json({
        success: true,
        order_number: mockOrderNumber,
        order_id: mockOrderId,
        total,
        shipping_fee,
        discount_amount: discount,
        payment_method,
        payment_status,
        message: 'Order created successfully (Demo Mode - Supabase not connected).',
      });
    }

    const supabase = getSupabaseAdmin();

    // 4. Verify & Deduct Stock for each product (if exists in db)
    for (const item of input.items) {
      try {
        const { data: product, error: fetchErr } = await supabase
          .from('products')
          .select('id, name, stock')
          .eq('id', item.product_id)
          .single();

        if (!fetchErr && product) {
          if (product.stock < item.quantity) {
            return NextResponse.json(
              {
                success: false,
                message: `Sorry, not enough stock available for "${product.name}". Available: ${product.stock}`,
              },
              { status: 400 }
            );
          }

          // Decrement stock
          await supabase
            .from('products')
            .update({ stock: Math.max(0, product.stock - item.quantity) })
            .eq('id', item.product_id);
        }
      } catch (e) {
        console.warn(`Stock check skipped for ${item.product_id}`);
      }
    }

    // 5. Insert Order into `orders` table
    const orderDataToInsert: Record<string, any> = {
      customer_name: input.customer_name,
      phone: input.phone,
      city: input.city,
      address: input.address,
      notes: input.notes || null,
      total,
      shipping_fee,
      payment_method,
      status: 'pending',
      confirmation_status: 'not_called',
    };

    // Include payment_status and proof if fields exist or try-catch fallback
    if (payment_status) orderDataToInsert.payment_status = payment_status;
    if (input.payment_proof_url) orderDataToInsert.payment_proof_url = input.payment_proof_url;
    if (discount > 0) orderDataToInsert.discount_amount = discount;
    if (input.coupon_code) orderDataToInsert.coupon_code = input.coupon_code;

    let createdOrder: any = null;
    let orderErr: any = null;

    const res = await supabase.from('orders').insert(orderDataToInsert).select('*').single();
    createdOrder = res.data;
    orderErr = res.error;

    // Graceful fallback if newer columns don't exist yet on user's live database schema
    if (orderErr && (orderErr.message?.includes('payment_status') || orderErr.message?.includes('discount_amount') || orderErr.message?.includes('payment_proof_url'))) {
      console.warn('Retrying order insert without optional advance payment columns:', orderErr.message);
      delete orderDataToInsert.payment_status;
      delete orderDataToInsert.payment_proof_url;
      delete orderDataToInsert.discount_amount;
      delete orderDataToInsert.coupon_code;

      const retryRes = await supabase.from('orders').insert(orderDataToInsert).select('*').single();
      createdOrder = retryRes.data;
      orderErr = retryRes.error;
    }

    if (orderErr || !createdOrder) {
      console.error('Database error creating order:', orderErr);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to record order into database: ' + (orderErr?.message || 'Unknown error'),
        },
        { status: 500 }
      );
    }

    // 6. Insert Order Items into `order_items` table
    const itemsToInsert = input.items.map((item) => ({
      order_id: createdOrder.id,
      product_id: item.product_id,
      name: item.variant_label ? `${item.name} (${item.variant_label})` : item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert);
    if (itemsErr) {
      console.error('Database error inserting order items:', itemsErr);
    }

    // 7. Insert Initial Event into `order_events` table
    const paymentMsg = payment_method === 'advance' 
      ? `Advance Payment (${payment_status})` 
      : 'Cash on Delivery (COD)';
    await supabase.from('order_events').insert({
      order_id: createdOrder.id,
      event_type: 'ORDER_PLACED',
      message: `Order placed by ${input.customer_name} from ${input.city}. Total: PKR ${total}. Method: ${paymentMsg}.`,
    });

    // 8. Attach items to order object and trigger Automation Webhook
    const fullOrderWithItems = {
      ...createdOrder,
      order_items: input.items,
    };

    await triggerOrderWebhook(fullOrderWithItems);

    // 9. Return clean response
    return NextResponse.json({
      success: true,
      order_number: createdOrder.order_number,
      order_id: createdOrder.id,
      total: createdOrder.total,
      shipping_fee: createdOrder.shipping_fee,
      payment_method,
      payment_status,
    });
  } catch (error: any) {
    console.error('Unhandled Order Creation Exception:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while creating order: ' + error.message,
      },
      { status: 500 }
    );
  }
}
