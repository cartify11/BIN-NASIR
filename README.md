# Bin Nasir (بن ناصر) — E-Commerce Store

The scalable e-commerce foundation for **Bin Nasir**, an authentic Pakistani online brand specializing in traditional sweets, organic Sidr honey, and natural health supplements (Special Peanut Rewri, Pure Shilajit, Talbina, Panjeeri).

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL + Auth)**, pre-architected for Pakistani Cash on Delivery (COD) workflows and automated AI confirmation calls.

---

## 🚀 Key Features

- **Next.js App Router Architecture**: Clean route separation for Storefront, API, and Admin.
- **Pakistani E-Commerce Optimized**:
  - Cash on Delivery (COD) as primary payment method.
  - Prices formatted in Pakistani Rupees (`formatPKR()`, e.g., `Rs. 2,950`).
  - Strict validation for Pakistani mobile phone numbers (`03XX-XXXXXXX` / `03001788080`).
  - Major Pakistani cities dropdown with custom city fallback.
- **Automation Ready (`/lib/webhook.ts`)**:
  - Automatically dispatches every placed order payload to `ORDER_WEBHOOK_URL`.
  - Ready to plug into Voice AI confirmation bots (Bland.ai, Vapi), WhatsApp Cloud API, and courier booking (Trax, Leopards, TCS).
- **Relational PostgreSQL Schema with Supabase**:
  - Human-friendly order sequence: `BN-1001`, `BN-1002`, etc.
  - Complete history log in `order_events` for every status change.
  - Row-Level Security (RLS) configured.
- **Graceful Fallback / Zero-Configuration Preview**:
  - Works immediately in mock/demo mode right after `npm run dev`, even before connecting Supabase credentials.

---

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with CartProvider, Navbar, Footer
│   ├── page.tsx                   # Homepage (Hero, categories, featured products, brand story)
│   ├── globals.css                # Tailwind directives & styles
│   ├── shop/
│   │   └── page.tsx               # Catalog with category filter & product grid
│   ├── product/
│   │   └── [slug]/
│   │       ├── page.tsx           # Product detail page (images, description, guarantees)
│   │       └── ProductDetailClient.tsx # Client interactive purchase controls
│   ├── cart/
│   │   └── page.tsx               # Cart page with PKR calculations & free shipping progress
│   ├── checkout/
│   │   └── page.tsx               # COD checkout with Pakistani mobile & city validation
│   ├── order-success/
│   │   └── page.tsx               # Order confirmation screen with instant WhatsApp link
│   ├── admin/
│   │   ├── layout.tsx             # Protected admin shell layout
│   │   └── page.tsx               # Orders management, confirmation call status, webhook tester
│   └── api/
│       └── orders/
│           └── route.ts           # Order creation endpoint: validates, stocks, saves, dispatches
├── components/
│   ├── Navbar.tsx                 # Top banner, WhatsApp support (0300-1788080), Cart counter
│   ├── Footer.tsx                 # Trust badges, brand story, links
│   ├── ProductCard.tsx            # Product card with discount badge & Add to Cart
│   └── CategoryCard.tsx           # Visual category card
├── lib/
│   ├── cart-context.tsx           # React Context with localStorage persistence
│   ├── mock-data.ts               # Seed data for immediate local preview
│   ├── products-service.ts        # Database retrieval service with fallback
│   ├── supabase.ts                # Client & privileged Service Role Supabase handlers
│   ├── utils.ts                   # Currency formatter (PKR), order number generator
│   ├── validation.ts              # Zod schemas & Pakistani phone number normalizer
│   └── webhook.ts                 # triggerOrderWebhook() for voice AI / WhatsApp / courier
├── public/
│   └── images/                    # Bin Nasir branding & product assets
├── scripts/
│   └── seed.ts                    # TypeScript database seeder script
├── supabase/
│   ├── migrations/
│   │   └── 20250101000000_init_schema.sql  # SQL schema, tables, triggers, indexes, RLS
│   └── seed.sql                   # SQL seed script with 6 products & 3 categories
├── .env.example                   # Environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Tables (`supabase/migrations/`)

1. **`products`**:
   - `id`, `name`, `slug`, `description`, `price`, `compare_at_price`, `images` (text array), `category_id`, `stock`, `is_active`, `created_at`
2. **`categories`**:
   - `id`, `name`, `slug`, `image`, `created_at`
3. **`orders`**:
   - `id`, `order_number` (human friendly, e.g. `BN-1001` via Postgres sequence), `customer_name`, `phone`, `city`, `address`, `notes`, `total`, `shipping_fee`, `payment_method` (default `'cod'`), `status`, `confirmation_status`, `courier_name`, `tracking_number`, `created_at`
4. **`order_items`**:
   - `id`, `order_id`, `product_id`, `name`, `price`, `quantity`
5. **`order_events`**:
   - `id`, `order_id`, `event_type`, `message`, `created_at` (audit log of every change, ideal for webhook and voice AI history)

### Order Status & Confirmation Values
- `status`: `'pending'`, `'confirmed'`, `'cancelled'`, `'shipped'`, `'delivered'`, `'returned'`
- `confirmation_status`: `'not_called'`, `'calling'`, `'confirmed'`, `'no_answer'`, `'rejected'`

---

## 📦 Sample Products & Categories Included

### Categories:
1. **Traditional Sweets & Rewri** (`traditional-sweets-rewri`)
2. **Pure Honey & Syrups** (`pure-honey-syrups`)
3. **Herbal & Health Supplements** (`herbal-health-supplements`)

### 6 Seeded Products:
1. **Special Peanut Rewri (خالص مونگ پھلی کی ریوڑی) - 500g** — Rs. 850 (was Rs. 1,100)
2. **Pure Natural Sidr Honey (خالص بیری کا شہد) - 1000g Jar** — Rs. 2,950 (was Rs. 3,500)
3. **Pure Himalayan Shilajit (خالص ہمالیائی سلاجیت) - 30g Soft Resin** — Rs. 2,450 (was Rs. 3,200)
4. **Royal Desi Ghee Panjeeri (شاہی دیسی گھی پنجیری) - 500g** — Rs. 1,650 (was Rs. 2,100)
5. **Sunnah Talbina with Dry Fruits (نبوی تلبینہ ڈرائی فروٹس) - 400g** — Rs. 950 (was Rs. 1,250)
6. **Crispy Sesame Gur Rewri (تل اور گڑ کی خاص ریوڑی) - 500g** — Rs. 750 (was Rs. 950)

---

## 🛠️ Local Setup Guide

### 1. Clone & Install Dependencies
Dependencies are already installed. If needed, run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ORDER_WEBHOOK_URL=https://webhook.site/your-webhook-endpoint
```
*(Note: If you leave these default, the store will automatically run in local mock mode so you can test right away without needing a database!)*

### 3. Initialize Supabase Database
In your Supabase project dashboard:
1. Go to **SQL Editor**.
2. Copy and paste the contents of `supabase/migrations/20250101000000_init_schema.sql` and click **Run**.
3. Copy and paste the contents of `supabase/seed.sql` and click **Run**.

Alternatively, run the TypeScript seed script:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- Storefront: [http://localhost:3000](http://localhost:3000)
- Shop Catalog: [http://localhost:3000/shop](http://localhost:3000/shop)
- Cart: [http://localhost:3000/cart](http://localhost:3000/cart)
- Checkout: [http://localhost:3000/checkout](http://localhost:3000/checkout)
- Admin Portal: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔌 Connecting Future Automation

When an order is created, `/api/orders` calls:
```typescript
triggerOrderWebhook(order);
```
In `lib/webhook.ts`, the payload contains:
```json
{
  "event": "order.created",
  "brand": "Bin Nasir",
  "order": {
    "order_number": "BN-1001",
    "customer_name": "Tariq Mehmood",
    "phone": "0300-1788080",
    "city": "Lahore",
    "total": 3800,
    "payment_method": "cod"
  },
  "automation_instructions": {
    "action": "initiate_ai_confirmation_call",
    "recipient_phone": "0300-1788080"
  }
}
```
You can point `ORDER_WEBHOOK_URL` to:
1. **Bland.ai / Vapi**: An AI Voice agent dials the customer in Urdu/English to verify COD address.
2. **Make.com / n8n / Zapier**: To send a WhatsApp template with "Confirm" / "Cancel" buttons.
3. **Courier API (Trax / Leopards / TCS)**: To book the COD shipment and retrieve the tracking slip.

---

## 🚢 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ORDER_WEBHOOK_URL`
4. Click **Deploy**.
