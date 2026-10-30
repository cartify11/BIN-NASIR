-- =========================================================================
-- Migration: Add Advance Payment fields and Store Settings Table
-- =========================================================================

-- 1. Alter Orders Table to support advance payment and payment verification
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid' 
CHECK (payment_status IN ('unpaid', 'pending_verification', 'paid'));

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0);

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS coupon_code TEXT;

-- 2. Store Settings Table (For dynamic stats, announcement, and payment accounts)
CREATE TABLE IF NOT EXISTS store_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    advance_discount_percent NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
    free_shipping_threshold NUMERIC(10, 2) NOT NULL DEFAULT 3000.00,
    standard_shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 200.00,
    
    -- Payment Accounts
    jazzcash_title TEXT NOT NULL DEFAULT 'Bin Nasir / Muhammad Nasir',
    jazzcash_number TEXT NOT NULL DEFAULT '0300-1788080',
    easypaisa_title TEXT NOT NULL DEFAULT 'Bin Nasir / Muhammad Nasir',
    easypaisa_number TEXT NOT NULL DEFAULT '0300-1788080',
    bank_name TEXT NOT NULL DEFAULT 'Meezan Bank Limited',
    bank_title TEXT NOT NULL DEFAULT 'Bin Nasir Traditional Foods',
    bank_account_number TEXT NOT NULL DEFAULT '0214-0105884901',
    bank_iban TEXT NOT NULL DEFAULT 'PK65MEZN0002140105884901',
    
    -- Announcements
    announcement_en TEXT NOT NULL DEFAULT '🎉 Free Express Delivery on orders above Rs. 3,000! Cash on Delivery Available Nationwide.',
    announcement_ur TEXT NOT NULL DEFAULT '🎉 پورے پاکستان میں 3,000 روپے سے زائد کے آرڈر پر مفت ڈلیوری! پارسل کھول کر تسلی کرنے کی سہولت۔',
    
    -- Editable Stats (replaces hardcoded numbers)
    stats_rating NUMERIC(3, 2) NOT NULL DEFAULT 4.9,
    stats_reviews_count INTEGER NOT NULL DEFAULT 1250,
    stats_customers_count INTEGER NOT NULL DEFAULT 15000,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Insert default row if not exists
INSERT INTO store_settings (id) 
VALUES ('default')
ON CONFLICT (id) DO NOTHING;
