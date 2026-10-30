import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { normalizePakistaniPhone } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const { order_number, phone } = await req.json();

    if (!order_number || !phone) {
      return NextResponse.json(
        { success: false, message: 'Please provide both Order Number and Phone Number.' },
        { status: 400 }
      );
    }

    const cleanOrderNum = order_number.trim().toUpperCase();
    const cleanPhone = normalizePakistaniPhone(phone.trim());

    if (!isSupabaseConfigured()) {
      // Demo response
      return NextResponse.json({
        success: true,
        order: {
          order_number: cleanOrderNum,
          customer_name: 'Respected Customer',
          phone: cleanPhone,
          city: 'Lahore',
          address: 'Delivery address on file',
          status: 'confirmed',
          confirmation_status: 'confirmed',
          payment_method: 'cod',
          payment_status: 'unpaid',
          total: 2450,
          shipping_fee: 0,
          courier_name: 'Trax / Call Courier Logistics',
          tracking_number: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
          created_at: new Date(Date.now() - 86400000).toISOString(),
          order_items: [
            { name: 'Special Peanut Rewri (500g)', price: 850, quantity: 1 },
            { name: 'Pure Desi Ghee Panjeeri (500g)', price: 1650, quantity: 1 },
          ],
        },
      });
    }

    const supabase = getSupabaseAdmin();
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('order_number', cleanOrderNum)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { success: false, message: `No order found with number "${cleanOrderNum}". Please verify your details.` },
        { status: 404 }
      );
    }

    // Check phone match
    const orderPhoneNormalized = normalizePakistaniPhone(order.phone);
    if (!orderPhoneNormalized.includes(cleanPhone.replace(/[^0-9]/g, '').slice(-7))) {
      return NextResponse.json(
        { success: false, message: 'Phone number does not match the order record.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve tracking info: ' + e.message },
      { status: 500 }
    );
  }
}
