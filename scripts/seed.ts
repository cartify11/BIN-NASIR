import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Please provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Traditional Sweets & Rewri',
    slug: 'traditional-sweets-rewri',
    image: '/images/peanut-rewri.jpg'
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Pure Honey & Syrups',
    slug: 'pure-honey-syrups',
    image: '/images/banner.jpg'
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Herbal & Health Supplements',
    slug: 'herbal-health-supplements',
    image: '/images/bag-catalog.jpg'
  }
];

const products = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    name: 'Special Peanut Rewri (خالص مونگ پھلی کی ریوڑی) - 500g',
    slug: 'special-peanut-rewri',
    description: 'خالص مونگ پھلی، گڑ اور تل سے تیار کردہ روایتی خستہ اور لذیذ ریوڑی۔ 100% قدرتی اجزاء اور بغیر کسی کیمیکل کے تیار کردہ۔ توانائی اور ذائقے کا بہترین سنگم۔ Authentic Bin Nasir Peanut Rewri.',
    price: 850,
    compare_at_price: 1100,
    images: ['/images/peanut-rewri.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 50,
    is_active: true
  },
  {
    id: 'p1000000-0000-0000-0000-000000000002',
    name: 'Pure Natural Sidr Honey (خالص بیری کا شہد) - 1000g Jar',
    slug: 'pure-natural-sidr-honey',
    description: 'قدرت کا نایاب تحفہ، 100% خالص اور قدرتی بیری کا شہد۔ گلے، کھانسی اور قوتِ مدافعت میں اضافے کے لیے بے حد مفید۔ Original wild Sidr Honey packed with natural enzymes and aroma.',
    price: 2950,
    compare_at_price: 3500,
    images: ['/images/banner.jpg', '/images/bag-catalog.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000002',
    stock: 35,
    is_active: true
  },
  {
    id: 'p1000000-0000-0000-0000-000000000003',
    name: 'Pure Himalayan Shilajit (خالص ہمالیائی سلاجیت) - 30g Soft Resin',
    slug: 'pure-himalayan-shilajit',
    description: 'ہمالیہ اور قراقرم کے پہاڑوں سے حاصل کردہ 100% مصفی اور اصلی سلاجیت۔ جسمانی توانائی، طاقت، جوڑوں کے درد اور کمزوری دور کرنے کے لیے صدیوں کا آزمودہ نسخہ۔ Gold grade purified Shilajit resin.',
    price: 2450,
    compare_at_price: 3200,
    images: ['/images/banner.jpg', '/images/bag-catalog.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000003',
    stock: 25,
    is_active: true
  },
  {
    id: 'p1000000-0000-0000-0000-000000000004',
    name: 'Royal Desi Ghee Panjeeri (شاہی دیسی گھی پنجیری) - 500g',
    slug: 'royal-desi-ghee-panjeeri',
    description: 'خالص دیسی گھی، بادام، اخروٹ، پستہ، چار مغز اور گوند کتیرا کے ساتھ تیار کردہ روایتی پنجیری۔ پٹھوں اور کمر کے درد میں اکسیر اور خواتین و بزرگوں کے لیے طاقت کا خزانہ۔',
    price: 1650,
    compare_at_price: 2100,
    images: ['/images/bag-catalog.jpg', '/images/peanut-rewri.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 40,
    is_active: true
  },
  {
    id: 'p1000000-0000-0000-0000-000000000005',
    name: 'Sunnah Talbina with Dry Fruits (نبوی تلبینہ ڈرائی فروٹس) - 400g',
    slug: 'sunnah-talbina-multi-dryfruit',
    description: 'طب نبوی ﷺ کا عظیم نسخہ۔ جو کا خالص دلیہ، شہد اور مغزیات سے بھرپور۔ معدے کی تیزابیت، ڈپریشن، ذہنی تناؤ اور کمزوری کا شاندار قدرتی علاج۔ 100% Natural health tonic.',
    price: 950,
    compare_at_price: 1250,
    images: ['/images/bag-catalog.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000003',
    stock: 60,
    is_active: true
  },
  {
    id: 'p1000000-0000-0000-0000-000000000006',
    name: 'Crispy Sesame Gur Rewri (تل اور گڑ کی خاص ریوڑی) - 500g',
    slug: 'crispy-sesame-gur-rewri',
    description: 'خالص دیسی گڑ اور اعلیٰ کوالٹی کے سفید تلوں سے تیار کردہ خستہ ریوڑی۔ ہر موسم کا کرسپی روایتی ذائقہ۔ Authentic crispy Pakistani sesame rewri.',
    price: 750,
    compare_at_price: 950,
    images: ['/images/peanut-rewri.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 75,
    is_active: true
  }
];

async function seed() {
  console.log('🌱 Starting Bin Nasir Store Database Seeding...');

  // 1. Seed Categories
  const { error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' });

  if (catError) {
    console.error('Error inserting categories:', catError.message);
  } else {
    console.log(`✅ Seeded ${categories.length} Categories successfully.`);
  }

  // 2. Seed Products
  const { error: prodError } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'slug' });

  if (prodError) {
    console.error('Error inserting products:', prodError.message);
  } else {
    console.log(`✅ Seeded ${products.length} Products successfully.`);
  }

  console.log('✨ Seeding process finished.');
}

seed().catch(err => {
  console.error('Seeding fatal error:', err);
  process.exit(1);
});
