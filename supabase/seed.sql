-- ==============================================================================
-- BIN NASIR SEED DATA (Categories & 6 Featured Products)
-- ==============================================================================

-- Clean existing data (optional for re-seeding)
-- TRUNCATE TABLE order_events, order_items, orders, products, categories CASCADE;

-- Insert Categories
INSERT INTO categories (id, name, slug, image) VALUES
('c1000000-0000-0000-0000-000000000001', 'Traditional Sweets & Rewri', 'traditional-sweets-rewri', '/images/peanut-rewri-main.webp'),
('c1000000-0000-0000-0000-000000000002', 'Pure Honey & Syrups', 'pure-honey-syrups', '/images/honey-main.jpg'),
('c1000000-0000-0000-0000-000000000003', 'Herbal & Health Supplements', 'herbal-health-supplements', '/images/shilajit-main.webp')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    image = EXCLUDED.image;

-- Insert 6 Pakistani Authentic Products for Bin Nasir
INSERT INTO products (id, name, slug, description, price, compare_at_price, images, category_id, stock, is_active) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'Special Peanut Rewri (خاص مونگ پھلی کی ریوڑی) - 250g / 500g',
    'special-peanut-rewri',
    'چکوال کی روایتی ترکیب سے تیار کردہ خالص مونگ پھلی کی ریوڑی۔ اعلٰی کوالٹی کی بھنی ہوئی دیسی مونگ پھلی، سفید تل اور اصلی دیسی گڑ۔ Authentic Chakwal style handcrafted crispy peanut rewri.',
    850.00,
    1100.00,
    ARRAY['/images/peanut-rewri-main.webp', '/images/peanut-rewri-2.webp', '/images/peanut-rewri-3.jpg', '/images/peanut-rewri-4.webp'],
    'c1000000-0000-0000-0000-000000000001',
    50,
    true
),
(
    'p1000000-0000-0000-0000-000000000002',
    'Pure Natural Sidr Honey (خالص بیری کا شہد) - 1000g Jar',
    'pure-natural-sidr-honey',
    'قدرت کا نایاب تحفہ، 100% خالص اور قدرتی بیری کا شہد۔ گلے، کھانسی اور قوتِ مدافعت میں اضافے کے لیے بے حد مفید۔ Original wild Sidr Honey packed with natural enzymes and aroma.',
    2950.00,
    3500.00,
    ARRAY['/images/honey-main.jpg', '/images/honey-2.jpg', '/images/honey-3.jpg'],
    'c1000000-0000-0000-0000-000000000002',
    35,
    true
),
(
    'p1000000-0000-0000-0000-000000000003',
    'Pure Himalayan Shilajit (خالص ہمالیائی سلاجیت) - 30g Soft Resin',
    'pure-himalayan-shilajit',
    '100% pure gold-grade Himalayan Shilajit resin wild-harvested from high-altitude peaks (16,000+ ft) in Chitral and Karakoram. Packed with 84+ ionic trace minerals and 70%+ fulvic acid to revitalize stamina, vitality, and joint health. 100% قدرتی مصفی گولڈ گریڈ سلاجیت ریزن۔',
    2450.00,
    3200.00,
    ARRAY['/images/shilajit-main.webp', '/images/shilajit-2.jpg', '/images/shilajit-3.jpg', '/images/shilajit-4.webp'],
    'c1000000-0000-0000-0000-000000000003',
    25,
    true
),
(
    'p1000000-0000-0000-0000-000000000004',
    'Pure Organic Desi Ghee (خالص دانہ دار دیسی گھی) - 500g / 1kg',
    'pure-organic-desi-ghee',
    '100% خالص اور روایتی طریقے سے تیار کردہ دانہ دار دیسی گھی۔ اشتہا انگیز خوشبو اور ذائقے سے بھرپور۔ 100% pure grass-fed danedaar Desi Ghee.',
    1650.00,
    2100.00,
    ARRAY['/images/desi-ghee-main.webp', '/images/desi-ghee-2.webp', '/images/desi-ghee-3.jpg', '/images/desi-ghee-4.webp'],
    'c1000000-0000-0000-0000-000000000001',
    40,
    true
),
(
    'p1000000-0000-0000-0000-000000000005',
    'Sunnah Talbina with Dry Fruits (نبوی تلبینہ ڈرائی فروٹس) - 400g',
    'sunnah-talbina-multi-dryfruit',
    'طب نبوی ﷺ کا عظیم نسخہ۔ جو کا خالص دلیہ، شہد اور مغزیات سے بھرپور۔ معدے کی تیزابیت، ڈپریشن، ذہنی تناؤ اور کمزوری کا شاندار قدرتی علاج۔ 100% Natural health tonic.',
    950.00,
    1250.00,
    ARRAY['/images/bag-catalog.jpg', '/images/banner.jpg'],
    'c1000000-0000-0000-0000-000000000003',
    60,
    true
),
(
    'p1000000-0000-0000-0000-000000000006',
    'Crispy Sesame Gur Rewri (تل اور گڑ کی خاص ریوڑی) - 500g',
    'crispy-sesame-gur-rewri',
    'خالص دیسی گڑ اور اعلیٰ کوالٹی کے سفید تلوں سے تیار کردہ خستہ ریوڑی۔ ہر موسم کا کرسپی روایتی ذائقہ۔ Authentic crispy Pakistani sesame rewri.',
    750.00,
    950.00,
    ARRAY['/images/peanut-rewri.jpg', '/images/banner.jpg'],
    'c1000000-0000-0000-0000-000000000001',
    75,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    images = EXCLUDED.images,
    category_id = EXCLUDED.category_id,
    stock = EXCLUDED.stock,
    is_active = EXCLUDED.is_active;
