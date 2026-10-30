import { Order } from '@/types';

/**
 * triggerOrderWebhook
 * 
 * Automation-ready dispatcher called every time a new order is created.
 * 
 * Future Automation Integrations:
 * 1. AI Confirmation Calls (e.g., Bland.ai / Vapi):
 *    - Automatically dials customer's phone number to verify address and order details.
 * 2. WhatsApp Notification (e.g., WhatsApp Cloud API / Twilio):
 *    - Sends an interactive WhatsApp message with buttons: "Confirm Order", "Cancel", "Change Address".
 * 3. Courier API Dispatch (e.g., Trax, Leopards, TCS, CallCourier):
 *    - Automatically books the COD parcel and attaches a tracking number.
 * 
 * Currently logs payload to console and posts to ORDER_WEBHOOK_URL if defined in .env.
 */
export async function triggerOrderWebhook(order: Order | Record<string, any>): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.ORDER_WEBHOOK_URL;
  const timestamp = new Date().toISOString();

  const payload = {
    event: 'order.created',
    timestamp,
    brand: 'Bin Nasir',
    order: {
      id: order.id,
      order_number: order.order_number,
      customer_name: order.customer_name,
      phone: order.phone,
      city: order.city,
      address: order.address,
      notes: order.notes,
      total: order.total,
      shipping_fee: order.shipping_fee,
      payment_method: order.payment_method,
      status: order.status,
      confirmation_status: order.confirmation_status,
      items: order.order_items || [],
      created_at: order.created_at || timestamp,
    },
    automation_instructions: {
      action: 'initiate_ai_confirmation_call',
      recipient_phone: order.phone,
      script_context: {
        customer_name: order.customer_name,
        order_number: order.order_number,
        total_pkr: order.total,
        city: order.city,
        address: order.address,
      },
    },
  };

  console.log('----------------------------------------------------');
  console.log(`[Bin Nasir Automation Webhook] 🚀 Triggered for Order ${order.order_number}`);
  console.log(`Customer: ${order.customer_name} | Phone: ${order.phone} | City: ${order.city}`);
  console.log(`Total: PKR ${order.total} | Payment: ${order.payment_method?.toUpperCase()}`);
  console.log('Payload context prepared for Voice AI / WhatsApp automation:');
  console.log(JSON.stringify(payload, null, 2));
  console.log('----------------------------------------------------');

  if (!webhookUrl) {
    console.log('[Bin Nasir Automation] Notice: ORDER_WEBHOOK_URL not configured. Webhook logged locally only.');
    return { success: true };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Brand': 'Bin-Nasir',
        'X-Event': 'order.created',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Bin Nasir Automation] Webhook POST returned status ${response.status}: ${response.statusText}`);
      return { success: false, error: `HTTP ${response.status}` };
    }

    console.log(`[Bin Nasir Automation] ✅ Successfully posted order to webhook endpoint.`);
    return { success: true };
  } catch (err: any) {
    console.error(`[Bin Nasir Automation] ⚠️ Error sending webhook:`, err.message);
    // Don't throw - ensure order flow never fails if external webhook fails
    return { success: false, error: err.message };
  }
}
