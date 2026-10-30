-- ==============================================================================
-- BIN NASIR SEED DATA (Categories & 6 Featured Products)
-- ==============================================================================

-- Clean existing data (optional for re-seeding)
-- TRUNCATE TABLE order_events, order_items, orders, products, categories CASCADE;

-- Insert Categories
INSERT INTO categories (id, name, slug, image) VALUES
('c1000000-0000-0000-0000-000000000001', 'Traditional Sweets & Rewri', 'traditional-sweets-rewri', '/images/peanut-rewri.jpg'),
('c1000000-0000-0000-0000-000000000002', 'Pure Honey & Syrups', 'pure-honey-syrups', '/images/banner.jpg'),
('c1000000-0000-0000-0000-000000000003', 'Herbal & Health Supplements', 'herbal-health-supplements', '/images/bag-catalog.jpg')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    image = EXCLUDED.image;

-- Insert 6 Pakistani Authentic Products for Bin Nasir
INSERT INTO products (id, name, slug, description, price, compare_at_price, images, category_id, stock, is_active) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'Special Peanut Rewri (خالص مونگ پھلی کی ریوڑی) - 500g',
    'special-peanut-rewri',
    'خالص مونگ پھلی، گڑ اور تل سے تیار کردہ روایتی خستہ اور لذیذ ریوڑی۔ 100% قدرتی اجزاء اور بغیر کسی کیمیکل کے تیار کردہ۔ توانائی اور ذائقے کا بہترین سنگم۔ Authentic Bin Nasir Peanut Rewri.',
    850.00,
    1100.00,
    ARRAY['/images/peanut-rewri.jpg', '/images/banner.jpg'],
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
    ARRAY['/images/banner.jpg', '/images/bag-catalog.jpg'],
    'c1000000-0000-0000-0000-000000000002',
    35,
    true
),
(
    'p1000000-0000-0000-0000-000000000003',
    'Pure Himalayan Shilajit (خالص ہمالیائی سلاجیت) - 30g Soft Resin',
    'pure-himalayan-shilajit',
    'ہمالیہ اور قراقرم کے پہاڑوں سے حاصل کردہ 100% مصفی اور اصلی سلاجیت۔ جسمانی توانائی، طاقت، جوڑوں کے درد اور کمزوری دور کرنے کے لیے صدیوں کا آزمودہ نسخہ۔ Gold grade purified Shilajit resin.',
    2450.00,
    3200.00,
    ARRAY['/images/banner.jpg', '/images/bag-catalog.jpg'],
    'c1000000-0000-0000-0000-000000000003',
    25,
    true
),
(
    'p1000000-0000-0000-0000-000000000004',
    'Royal Desi Ghee Panjeeri (شاہی دیسی گھی پنجیری) - 500g',
    'royal-desi-ghee-panjeeri',
    'خالص دیسی گھی، بادام، اخروٹ، پستہ، چار مغز اور گوند کتیرا کے ساتھ تیار کردہ روایتی پنجیری۔ پٹھوں اور کمر کے درد میں اکسیر اور خواتین و بزرگوں کے لیے طاقت کا خزانہ۔',
    1650.00,
    2100.00,
    ARRAY['/images/bag-catalog.jpg', '/images/peanut-rewri.jpg'],
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
