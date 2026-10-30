-- ==============================================================================
-- BIN NASIR E-COMMERCE DATABASE SCHEMA
-- Migration: 20250101000000_init_schema.sql
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Sequence for human-readable Order Number (e.g., BN-1001)
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 1001;

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= 0),
    images TEXT[] NOT NULL DEFAULT '{}',
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE DEFAULT ('BN-' || nextval('order_number_seq')::text),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    payment_method TEXT NOT NULL DEFAULT 'cod',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'confirmed', 'cancelled', 'shipped', 'delivered', 'returned')
    ),
    confirmation_status TEXT NOT NULL DEFAULT 'not_called' CHECK (
        confirmation_status IN ('not_called', 'calling', 'confirmed', 'no_answer', 'rejected')
    ),
    courier_name TEXT,
    tracking_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

-- 7. Order Events Table (Event log for Automation, AI Confirmation, WhatsApp, Courier APIs)
CREATE TABLE IF NOT EXISTS order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_confirmation_status ON orders(confirmation_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON order_events(order_id);

-- 9. Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;

-- Public Read for Active Products & Categories
CREATE POLICY "Allow public read access to categories" 
ON categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access to active products" 
ON products FOR SELECT USING (is_active = true);

-- Public Order Insertion (Anyone can place an order)
CREATE POLICY "Allow public insert to orders" 
ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to order_items" 
ON order_items FOR INSERT WITH CHECK (true);

-- Allow public to view their placed order by order_id or order_number
CREATE POLICY "Allow order lookup by id" 
ON orders FOR SELECT USING (true);

CREATE POLICY "Allow order items lookup" 
ON order_items FOR SELECT USING (true);

-- Admin & Service Role full access
CREATE POLICY "Allow full access for service_role on all tables" 
ON order_events FOR ALL USING (true);
