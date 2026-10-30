import { NextRequest, NextResponse } from 'next/server';
import { getStoreSettings, updateStoreSettings } from '@/lib/store-settings';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, settings: getStoreSettings() });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('store_settings').select('*').eq('id', 'default').single();
    if (error || !data) {
      return NextResponse.json({ success: true, settings: getStoreSettings() });
    }
    return NextResponse.json({ success: true, settings: data });
  } catch (e) {
    return NextResponse.json({ success: true, settings: getStoreSettings() });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = updateStoreSettings(body);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      await supabase.from('store_settings').upsert({ id: 'default', ...body, updated_at: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
