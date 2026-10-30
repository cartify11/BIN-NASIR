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

    // 2. Calculate subtotal, shipping fee, and total
    const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping_fee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const total = subtotal + shipping_fee;

    // 3. Check if Supabase is fully configured
    if (!isSupabaseConfigured()) {
      console.warn('[API /orders] Supabase credentials not yet configured. Processing in Mock/Demo mode.');

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
        payment_method: input.payment_method || 'cod',
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
        message: 'Order created successfully (Demo Mode - Supabase not connected).',
      });
    }

    const supabase = getSupabaseAdmin();

    // 4. Verify & Deduct Stock for each product
    for (const item of input.items) {
      const { data: product, error: fetchErr } = await supabase
        .from('products')
        .select('id, name, stock')
        .eq('id', item.product_id)
        .single();

      if (fetchErr || !product) {
        console.warn(`Product not found in db: ${item.product_id}, continuing anyway`);
        continue;
      }

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
      const { error: stockErr } = await supabase
        .from('products')
        .update({ stock: Math.max(0, product.stock - item.quantity) })
        .eq('id', item.product_id);

      if (stockErr) {
        console.error(`Failed to update stock for product ${item.product_id}:`, stockErr);
      }
    }

    // 5. Insert Order into `orders` table
    const orderDataToInsert = {
      customer_name: input.customer_name,
      phone: input.phone,
      city: input.city,
      address: input.address,
      notes: input.notes || null,
      total,
      shipping_fee,
      payment_method: input.payment_method || 'cod',
      status: 'pending',
      confirmation_status: 'not_called',
    };

    const { data: createdOrder, error: orderErr } = await supabase
      .from('orders')
      .insert(orderDataToInsert)
      .select('*')
      .single();

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
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert);

    if (itemsErr) {
      console.error('Database error inserting order items:', itemsErr);
    }

    // 7. Insert Initial Event into `order_events` table (for automation history)
    const { error: eventErr } = await supabase.from('order_events').insert({
      order_id: createdOrder.id,
      event_type: 'ORDER_PLACED',
      message: `Order placed via website by ${input.customer_name} from ${input.city}. Total: PKR ${total}. Payment Method: COD.`,
    });

    if (eventErr) {
      console.error('Error recording order event:', eventErr);
    }

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
