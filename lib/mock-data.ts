import { Category, Product, Review, BundleOffer } from '@/types';
import { Language } from './translations';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Traditional Sweets & Rewri',
    name_en: 'Traditional Sweets & Rewri',
    name_ur: 'روایتی ریوڑی اور سوغات',
    slug: 'traditional-sweets-rewri',
    image: '/images/peanut-rewri.jpg',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Pure Honey & Extracts',
    name_en: 'Pure Honey & Extracts',
    name_ur: 'خالص شہد و قدرتی اجزاء',
    slug: 'pure-honey-syrups',
    image: '/images/honey-main.jpg',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Herbal Wellness & Tonics',
    name_en: 'Herbal Wellness & Tonics',
    name_ur: 'ہربل و قدرتی فارمولہ',
    slug: 'herbal-health-supplements',
    image: '/images/shilajit-main.webp',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    name: 'Special Peanut Rewri',
    name_en: 'Special Peanut Rewri',
    name_ur: 'خاص مونگ پھلی کی ریوڑی',
    slug: 'special-peanut-rewri',
    description:
      'Handcrafted crispy rewri prepared with organic jaggery (gur), premium roasted peanuts, and white sesame seeds. 100% natural energy snack with zero chemical additives.',
    description_en:
      'Handcrafted crispy rewri prepared with organic jaggery (gur), premium roasted peanuts, and white sesame seeds. 100% natural energy snack with zero chemical additives.',
    description_ur:
      'خالص مونگ پھلی، دیسی گڑ اور سفید تل سے تیار کردہ روایتی خستہ اور لذیذ ریوڑی۔ 100% قدرتی اجزاء اور بغیر کسی کیمیکل کے تیار کردہ۔ توانائی اور روایتی ذائقے کا بہترین سنگم۔',
    price: 850,
    compare_at_price: 1100,
    images: ['/images/peanut-rewri.jpg', '/images/banner.jpg', '/images/bag-catalog.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 50,
    is_active: true,
    is_bestseller: true,
    badge_en: 'Bestseller',
    badge_ur: 'سب سے زیادہ مقبول',
    variants: [
      { id: 'v1-1', label_en: '500 Grams Pack', label_ur: '500 گرام پیک', weight: '500g', price: 850, compare_at_price: 1100, stock: 50 },
      { id: 'v1-2', label_en: '1 KG Family Pack', label_ur: '1 کلو فیملی پیک', weight: '1kg', price: 1600, compare_at_price: 2100, stock: 35 },
      { id: 'v1-3', label_en: '2 KG Gift Tin', label_ur: '2 کلو تحفہ پیک', weight: '2kg', price: 3100, compare_at_price: 4000, stock: 20 },
    ],
    ingredients_en: 'Roasted Golden Peanuts, Pure Desi Gur (Sugarcane Jaggery), White Sesame Seeds, Organic Desi Ghee essence.',
    ingredients_ur: 'بھنی ہوئی دیسی مونگ پھلی، خالص دیسی گڑ، قدرتی سفید تل، اور اصلی دیسی گھی۔',
    usage_en: 'Ready to eat anytime. Perfect with evening Kashmiri chai or green tea.',
    usage_ur: 'کھانے کے لیے تیار۔ شام کی کشمیری چائے یا قہوہ کے ساتھ بہترین روایتی لطف۔',
    faqs: [
      {
        question_en: 'How long can I store this Rewri?',
        question_ur: 'اس ریوڑی کو کتنے عرصے تک محفوظ رکھا جا سکتا ہے؟',
        answer_en: 'In an airtight jar at room temperature, it stays fresh and crispy for up to 6 months.',
        answer_ur: 'ہوا بند ڈبے میں کمرے کے عام درجہ حرارت پر 6 ماہ تک بالکل خستہ اور تازہ رہتی ہے۔',
      },
      {
        question_en: 'Is there any artificial sugar or preservative added?',
        question_ur: 'کیا اس میں چینی یا کیمیکل شامل ہے؟',
        answer_en: 'No! It is prepared with 100% natural desi jaggery (gur) with zero chemicals or artificial sugar.',
        answer_ur: 'ہرگز نہیں۔ یہ 100% خالص دیسی گڑ سے بنائی جاتی ہے اور اس میں کوئی مصنوعی چینی یا پریزرویٹو نہیں ہوتا۔',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000002',
    name: 'Pure Natural Sidr Honey',
    name_en: 'Pure Natural Sidr Honey',
    name_ur: 'خالص قدرتی بیری کا شہد',
    slug: 'pure-natural-sidr-honey',
    description:
      '100% raw and unfiltered wild Sidr (Beri) honey harvested from native flora. Rich in natural digestive enzymes, antibacterial properties, and immune-boosting nutrients.',
    description_en:
      '100% raw and unfiltered wild Sidr (Beri) honey harvested from native flora. Rich in natural digestive enzymes, antibacterial properties, and immune-boosting nutrients.',
    description_ur:
      'قدرت کا نایاب تحفہ، 100% خالص اور قدرتی بیری کا شہد۔ گلے کی خراش، کھانسی اور قوتِ مدافعت میں اضافے کے لیے بے حد مفید۔ اصل جنگلی بیری کا شہد قدرتی اینزائمز اور خوشبو سے بھرپور۔',
    price: 2950,
    compare_at_price: 3500,
    images: ['/images/honey-main.jpg', '/images/honey-2.jpg', '/images/honey-3.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000002',
    stock: 35,
    is_active: true,
    is_bestseller: true,
    badge_en: 'Pure & Lab Tested',
    badge_ur: '100% خالص و ٹیسٹ شدہ',
    variants: [
      { id: 'v2-1', label_en: '500g Glass Jar', label_ur: '500 گرام جار', weight: '500g', price: 1650, compare_at_price: 1950, stock: 40 },
      { id: 'v2-2', label_en: '1000g Family Jar', label_ur: '1000 گرام فیملی جار', weight: '1kg', price: 2950, compare_at_price: 3500, stock: 35 },
    ],
    ingredients_en: '100% Unpasteurized, Unfiltered Pure Wild Sidr (Ziziphus) Flower Nectar Honey.',
    ingredients_ur: '100% خالص اور غیر پروسیس شدہ قدرتی بیری کے پھولوں کا شہد۔',
    usage_en: 'Take 1 to 2 tablespoons daily with warm water or milk, preferably in the morning on an empty stomach.',
    usage_ur: 'روزانہ نہار منہ 1 سے 2 چمچ نیم گرم پانی یا دودھ کے ساتھ استعمال کریں۔',
    faqs: [
      {
        question_en: 'Can I check the honey quality before paying the rider?',
        question_ur: 'کیا میں ڈلیوری بوائے کے سامنے پارسل کھول کر چیک کر سکتا ہوں؟',
        answer_en: 'Yes, Bin Nasir offers an open-parcel policy. You can inspect the seal and bottle before paying.',
        answer_ur: 'جی ہاں، بن ناصر کی پالیسی کے تحت آپ پارسل کھول کر مکمل تسلی کے بعد کیش ادا کر سکتے ہیں۔',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000003',
    name: 'Pure Himalayan Shilajit',
    name_en: 'Pure Himalayan Shilajit',
    name_ur: 'خالص ہمالیائی سلاجیت',
    slug: 'pure-himalayan-shilajit',
    description:
      '100% pure gold-grade Himalayan Shilajit resin wild-harvested from high-altitude peaks (16,000+ ft) in Chitral and Karakoram ranges. Packed with 84+ ionic trace minerals, fulvic acid (70%+), and humic compounds to boost vitality, stamina, and natural strength. Lab-tested and certified pure.',
    description_en:
      '100% pure gold-grade Himalayan Shilajit resin wild-harvested from high-altitude peaks (16,000+ ft) in Chitral and Karakoram ranges. Packed with 84+ ionic trace minerals, fulvic acid (70%+), and humic compounds to boost vitality, stamina, and natural strength. Lab-tested and certified pure.',
    description_ur:
      'ہمالیہ، قراقرم اور چترال کی 16,000 فٹ بلند چوٹیوں سے حاصل کردہ 100% قدرتی مصفی گولڈ گریڈ سلاجیت ریزن۔ 84 سے زائد نامیاتی منرلز اور 70%+ فلوک ایسڈ سے بھرپور۔ مردانہ و جسمانی طاقت میں اضافہ، جوڑوں کے درد سے نجات، اعصابی کمزوری کا خاتمہ، اور مدافعت کی مضبوطی کے لیے صدیوں کا آزمودہ اکسیر۔ بغیر کسی کیمیکل، ملاوٹ یا مصنوعی اضافے کے۔',
    price: 2450,
    compare_at_price: 3200,
    images: ['/images/shilajit-main.webp', '/images/shilajit-2.jpg', '/images/shilajit-3.jpg', '/images/shilajit-4.webp'],
    category_id: 'c1000000-0000-0000-0000-000000000003',
    stock: 25,
    is_active: true,
    is_bestseller: true,
    badge_en: 'Gold Grade',
    badge_ur: 'گولڈ گریڈ ریزن',
    variants: [
      { id: 'v3-1', label_en: '15g Trial Jar', label_ur: '15 گرام جار', weight: '15g', price: 1450, compare_at_price: 1900, stock: 30 },
      { id: 'v3-2', label_en: '30g Soft Resin Jar', label_ur: '30 گرام سوفٹ ریزن', weight: '30g', price: 2450, compare_at_price: 3200, stock: 25 },
      { id: 'v3-3', label_en: '50g Master Pack', label_ur: '50 گرام ماسٹر پیک', weight: '50g', price: 3800, compare_at_price: 4900, stock: 15 },
    ],
    ingredients_en: '100% Purified Natural Himalayan Shilajit Resin, Fulvic Acid 70%+, 84+ Essential Ionic Minerals.',
    ingredients_ur: '100% خالص قدرتی مصفی ہمالیائی سلاجیت، 70%+ فلوک ایسڈ، اور 84 سے زائد قدرتی معدنیات۔',
    usage_en: 'Dissolve a rice to pea-sized portion (300mg-500mg) in warm milk, green tea, or warm water once daily.',
    usage_ur: 'چاول یا چنے کے دانے کے برابر مقدار نیم گرم دودھ، چائے یا پانی میں حل کر کے روزانہ پئیں۔',
    faqs: [
      {
        question_en: 'How can I verify the purity of this Shilajit?',
        question_ur: 'اصلی سلاجیت کی پہچان کیسے کی جائے؟',
        answer_en: 'It completely dissolves in warm water without leaving any residue, and hardens in the cold while softening with body heat.',
        answer_ur: 'یہ گرم پانی میں بغیر کسی ذرے کے مکمل گھل جاتی ہے اور ٹھنڈ میں سخت اور گرمی میں پگھل جاتی ہے۔',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000004',
    name: 'Royal Desi Ghee Panjeeri',
    name_en: 'Royal Desi Ghee Panjeeri',
    name_ur: 'شاہی دیسی گھی پنجیری',
    slug: 'royal-desi-ghee-panjeeri',
    description:
      'Traditional nourishing tonic roasted in pure grass-fed Desi Ghee, loaded with almonds, pistachios, walnuts, melon seeds (char maghaz), and edible gum (gond katira). Ideal for strength and vitality.',
    description_en:
      'Traditional nourishing tonic roasted in pure grass-fed Desi Ghee, loaded with almonds, pistachios, walnuts, melon seeds (char maghaz), and edible gum (gond katira). Ideal for strength and vitality.',
    description_ur:
      'خالص دیسی گھی، بادام، اخروٹ، پستہ، چار مغز اور گوند کتیرا کے ساتھ تیار کردہ روایتی پنجیری۔ پٹھوں اور کمر کے درد میں اکسیر اور خواتین و بزرگوں کے لیے طاقت کا خزانہ۔',
    price: 1650,
    compare_at_price: 2100,
    images: ['/images/bag-catalog.jpg', '/images/peanut-rewri.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 40,
    is_active: true,
    is_bestseller: true,
    badge_en: '100% Desi Ghee',
    badge_ur: 'خالص دیسی گھی',
    variants: [
      { id: 'v4-1', label_en: '500g Jar', label_ur: '500 گرام جار', weight: '500g', price: 1650, compare_at_price: 2100, stock: 40 },
      { id: 'v4-2', label_en: '1 KG Family Jar', label_ur: '1 کلو فیملی جار', weight: '1kg', price: 3100, compare_at_price: 3900, stock: 25 },
    ],
    ingredients_en: 'Pure Grass-fed Desi Ghee, Almonds, Walnuts, Pistachios, Cashews, Char Maghaz, Gond Katira, Kamarkas, Semolina/Wheat flour, Desi Shakkar.',
    ingredients_ur: 'خالص دیسی گھی، بادام، اخروٹ، پستہ، کاجو، چار مغز، گوند کتیرا، کمرکس، سوجی/آٹا اور دیسی شکر۔',
    usage_en: 'Consume 2-3 tablespoons with warm milk in the morning or at night.',
    usage_ur: 'صبح ناشتے کے وقت یا رات کو سونے سے پہلے 2 سے 3 چمچ نیم گرم دودھ کے ساتھ کھائیں۔',
    faqs: [
      {
        question_en: 'Is it suitable for new mothers and elderly individuals?',
        question_ur: 'کیا یہ خواتین اور بزرگوں کے لیے مفید ہے؟',
        answer_en: 'Yes, it is the classic gold standard traditional postpartum recovery and bone-strengthening formula.',
        answer_ur: 'جی ہاں، یہ خواتین کی ڈلیوری کے بعد کمزوری اور بزرگوں کے جوڑوں اور کمر کے درد کے لیے صدیوں پرانی آزمودہ طاقت ہے۔',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000005',
    name: 'Sunnah Talbina with Dry Fruits',
    name_en: 'Sunnah Talbina with Dry Fruits',
    name_ur: 'نبوی تلبینہ ڈرائی فروٹس',
    slug: 'sunnah-talbina-multi-dryfruit',
    description:
      'Holistic healing blend formulated according to prophetic tradition. Whole crushed barley combined with organic dry fruits and honey to soothe digestion, relieve fatigue, and lift spirits.',
    description_en:
      'Holistic healing blend formulated according to prophetic tradition. Whole crushed barley combined with organic dry fruits and honey to soothe digestion, relieve fatigue, and lift spirits.',
    description_ur:
      'طب نبوی ﷺ کا عظیم نسخہ۔ جو کا خالص دلیہ، شہد اور مغزیات سے بھرپور۔ معدے کی تیزابیت، ڈپریشن، ذہنی تناؤ اور کمزوری کا شاندار قدرتی علاج۔ 100% قدرتی ہیلتھ ٹانک۔',
    price: 950,
    compare_at_price: 1250,
    images: ['/images/bag-catalog.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000003',
    stock: 60,
    is_active: true,
    is_bestseller: false,
    variants: [
      { id: 'v5-1', label_en: '400g Pouch', label_ur: '400 گرام پاؤچ', weight: '400g', price: 950, compare_at_price: 1250, stock: 60 },
      { id: 'v5-2', label_en: '800g Economy Pack', label_ur: '800 گرام پیک', weight: '800g', price: 1800, compare_at_price: 2400, stock: 30 },
    ],
    ingredients_en: 'Whole Sprouted Barley (Jau), Roasted Almonds, Cardamom, Dates Powder, Lotus Seeds (Makhana).',
    ingredients_ur: 'خالص جو کا دلیہ، پسا ہوا بادام، چھوٹی الائچی، کھجور پاؤڈر اور پھول مکھانہ۔',
    usage_en: 'Cook 2-3 tablespoons in a cup of milk or water for 5-7 minutes. Sweeten with pure honey.',
    usage_ur: '2 سے 3 چمچ ایک کپ دودھ یا پانی میں 5 سے 7 منٹ پکائیں۔ حسب ذائقہ خالص شہد ملا کر نوش فرمائیں۔',
    faqs: [
      {
        question_en: 'Can diabetes patients consume it?',
        question_ur: 'کیا شوگر کے مریض اسے کھا سکتے ہیں؟',
        answer_en: 'Yes, it contains no added sugars and barley is rich in beta-glucan fiber which helps stabilize blood glucose.',
        answer_ur: 'جی ہاں، اس میں کوئی مصنوعی چینی شامل نہیں ہے اور جو میں موجود فائبر شوگر کو متوازن رکھنے میں مدد دیتا ہے۔',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000006',
    name: 'Crispy Sesame Gur Rewri',
    name_en: 'Crispy Sesame Gur Rewri',
    name_ur: 'تل اور گڑ کی خاص ریوڑی',
    slug: 'crispy-sesame-gur-rewri',
    description:
      'Classic golden crunchy sweet crafted from premium white sesame seeds and slow-cooked desi gur. A timeless winter tradition bursting with rich flavor and warmth.',
    description_en:
      'Classic golden crunchy sweet crafted from premium white sesame seeds and slow-cooked desi gur. A timeless winter tradition bursting with rich flavor and warmth.',
    description_ur:
      'خالص دیسی گڑ اور اعلیٰ کوالٹی کے سفید تلوں سے تیار کردہ خستہ ریوڑی۔ ہر موسم کا کرسپی روایتی ذائقہ۔ اصل پاکستانی روایتی ریوڑی۔',
    price: 750,
    compare_at_price: 950,
    images: ['/images/peanut-rewri.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 75,
    is_active: true,
    is_bestseller: false,
    variants: [
      { id: 'v6-1', label_en: '500g Pack', label_ur: '500 گرام پیک', weight: '500g', price: 750, compare_at_price: 950, stock: 75 },
      { id: 'v6-2', label_en: '1 KG Pack', label_ur: '1 کلو پیک', weight: '1kg', price: 1400, compare_at_price: 1800, stock: 40 },
    ],
    ingredients_en: 'Pure Desi Jaggery (Gur), Cleaned White Sesame Seeds, Ghee, Spices.',
    ingredients_ur: 'خالص گڑ، صاف شدہ سفید تل، گھی اور قدرتی ذائقہ۔',
    usage_en: 'A healthy and crispy snack to enjoy with tea, after meals, or as winter comfort food.',
    usage_ur: 'کھانے کے بعد میٹھے کے طور پر یا چائے کے ساتھ دل پسند روایتی سوغات۔',
    faqs: [
      {
        question_en: 'Where is this rewri manufactured?',
        question_ur: 'یہ ریوڑی کہاں تیار کی جاتی ہے؟',
        answer_en: 'Handmade by traditional artisans following authentic recipes from Chakwal, Pakistan.',
        answer_ur: 'یہ چکوال کے روایتی ماہر کاریگروں کے ہاتھوں روایتی بھٹیوں پر تیار کی جاتی ہے۔',
      },
    ],
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Tariq Mehmood',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '2 din pehle',
    product_name: 'Special Peanut Rewri',
    comment_en: 'SubhanAllah, the crispiness and freshness of the peanut rewri is outstanding! You can clearly smell pure desi gur. Delivery boy allowed me to open and check the box first.',
    comment_ur: 'ماشاءاللہ ریوڑی کا خستہ پن اور دیسی گڑ کی خوشبو لاجواب ہے۔ رائیڈر نے پہلے پارسل کھول کر چیک کرنے دیا پھر پیسے لیے۔ پورا خاندان بہت خوش ہوا۔',
    verified_purchase: true,
  },
  {
    id: 'rev-2',
    name: 'Haji Abdul Rasheed',
    city: 'Karachi (Gulshan-e-Iqbal)',
    rating: 5,
    date: '3 din pehle',
    product_name: 'Pure Natural Sidr Honey',
    comment_en: 'Authentic wild Sidr honey. Its thick aroma and rich taste proves it is 100% natural. Bin Nasir has earned a permanent customer in Karachi!',
    comment_ur: 'بہت عرصے بعد کراچی میں اصل بیری کا شہد ملا ہے۔ گاڑھا پن اور ذائقہ 100 فیصد خالص ہے۔ بن ناصر کی کوالٹی واقعی قابلِ تعریف ہے۔',
    verified_purchase: true,
  },
  {
    id: 'rev-3',
    name: 'Chaudhry Kamran',
    city: 'Islamabad (F-10)',
    rating: 5,
    date: '5 din pehle',
    product_name: 'Royal Desi Ghee Panjeeri',
    comment_en: 'The Panjeeri is packed with dry fruits and genuine desi ghee. My mother had backache and she feels much more energetic after just one week.',
    comment_ur: 'پنجیری میں خالص دیسی گھی اور مغزیات کی بھرمار ہے۔ والدہ کے کمر کے درد میں نمایاں افاقہ ہوا ہے۔ اللہ آپ کے کاروبار میں برکت ڈالے۔',
    verified_purchase: true,
  },
  {
    id: 'rev-4',
    name: 'Dr. Shahzad Aslam',
    city: 'Faisalabad',
    rating: 5,
    date: '1 hafta pehle',
    product_name: 'Pure Himalayan Shilajit',
    comment_en: 'As a medical practitioner I tested this Shilajit resin for water solubility and purity. It completely dissolved with zero residue. Real gold grade quality.',
    comment_ur: 'بہترین اور اصلی سلاجیت ریزن۔ گرم پانی میں مکمل حل ہو جاتی ہے۔ پٹھوں کے کھچاؤ اور کمزوری میں زبردست رزلٹ ملا ہے۔',
    verified_purchase: true,
  },
];

export const INITIAL_BUNDLES: BundleOffer[] = [
  {
    id: 'bundle-winter-royal',
    title_en: 'Royal Winter Vitality Pack',
    title_ur: 'شاہی ونٹر وائٹلٹی پیک',
    description_en: 'Complete family wellness package: 500g Special Peanut Rewri + 1000g Pure Sidr Honey + 500g Desi Ghee Panjeeri.',
    description_ur: 'پورے خاندان کے لیے مکمل صحت و طاقت کا تحفہ: 500 گرام مونگ پھلی ریوڑی + 1 کلو بیری کا شہد + 500 گرام دیسی گھی پنجیری۔',
    badge_en: 'Save Rs. 950 + Free Delivery',
    badge_ur: '950 روپے بچت + فری ڈلیوری',
    price: 4500,
    original_price: 5450,
    image: '/images/honey-2.jpg',
    items_en: ['Special Peanut Rewri 500g', 'Pure Natural Sidr Honey 1000g', 'Royal Desi Ghee Panjeeri 500g'],
    items_ur: ['خاص مونگ پھلی ریوڑی 500 گرام', 'خالص قدرتی بیری شہد 1 کلو', 'شاہی دیسی گھی پنجیری 500 گرام'],
    product_ids: ['p1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000004'],
  },
  {
    id: 'bundle-energy-duo',
    title_en: 'Himalayan Strength & Honey Duo',
    title_ur: 'ہمالین طاقت و شہد کمبو',
    description_en: 'Powerful energy combo for stamina and immunity: 30g Himalayan Shilajit + 500g Pure Sidr Honey.',
    description_ur: 'مردانہ و جسمانی قوت اور قوتِ مدافعت کا اکسیر جوڑ: 30 گرام ہمالیائی سلاجیت + 500 گرام بیری کا شہد۔',
    badge_en: 'Save Rs. 600',
    badge_ur: '600 روپے بچت',
    price: 3500,
    original_price: 4100,
    image: '/images/shilajit-main.webp',
    items_en: ['Pure Himalayan Shilajit 30g', 'Pure Sidr Honey 500g'],
    items_ur: ['خالص ہمالیائی سلاجیت 30 گرام', 'خالص بیری کا شہد 500 گرام'],
    product_ids: ['p1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000002'],
  },
];

export const GENERAL_FAQS = [
  {
    q_en: 'Can I open and inspect the parcel before paying (Open Parcel Policy)?',
    q_ur: 'کیا میں رقم ادا کرنے سے پہلے پارسل کھول کر چیک کر سکتا ہوں؟',
    a_en: 'Yes, 100%! Bin Nasir allows all customers across Pakistan to open the parcel in front of the courier rider, inspect the items, and only pay after complete satisfaction.',
    a_ur: 'جی ہاں، بالکل! بن ناصر پاکستان بھر میں اوپن پارسل ڈلیوری دیتا ہے۔ آپ رائیڈر کے سامنے پارسل کھول کر اشیاء چیک کریں اور مکمل تسلی کے بعد کیش ادا کریں۔',
  },
  {
    q_en: 'How long does delivery take across Pakistan?',
    q_ur: 'پورے پاکستان میں ڈلیوری میں کتنا وقت لگتا ہے؟',
    a_en: 'Orders are processed on the same day. Delivery takes 2 to 3 working days for major cities (Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad) and 3 to 4 days for other towns.',
    a_ur: 'آرڈر اسی دن روانہ کیا جاتا ہے۔ بڑے شہروں میں 2 سے 3 دن اور دور دراز علاقوں میں 3 سے 4 دن میں پارسل پہنچ جاتا ہے۔',
  },
  {
    q_en: 'What are the delivery charges and how can I get Free Delivery?',
    q_ur: 'ڈلیوری چارجز کتنے ہیں اور فری ڈلیوری کیسے ملے گی؟',
    a_en: 'Standard delivery fee is Rs. 200 anywhere in Pakistan. On any order of Rs. 3,000 or above, delivery is 100% FREE!',
    a_ur: 'پورے پاکستان کے لیے معیاری ڈلیوری فیس صرف 200 روپے ہے۔ اگر آپ کا آرڈر 3,000 روپے یا اس سے زائد ہو تو ڈلیوری بالکل مفت ہے۔',
  },
  {
    q_en: 'What payment options do you support?',
    q_ur: 'ادائیگی کے کون کون سے طریقے موجود ہیں؟',
    a_en: 'We support Cash on Delivery (COD) as well as Advance Payment via JazzCash, Easypaisa, or Bank Transfer. When paying in advance, you receive an extra 5% discount on your order!',
    a_ur: 'ہم کیش آن ڈلیوری (COD) اور جاز کیش، ایزی پیسہ، یا بینک ٹرانسفر دونوں پیش کرتے ہیں۔ ایڈوانس ادائیگی پر آپ کو 5 فیصد اضافی ڈسکاؤنٹ ملتا ہے۔',
  },
  {
    q_en: 'What is your return & guarantee policy?',
    q_ur: 'آپ کی واپسی اور گارنٹی کی کیا پالیسی ہے؟',
    a_en: 'We stand 100% behind the purity of our products. If you receive a damaged jar or find any quality concern, contact our WhatsApp at 0300-1788080 within 7 days for an instant replacement or full money refund.',
    a_ur: 'ہم اپنی مصنوعات کے 100% خالص ہونے کی گارنٹی دیتے ہیں۔ اگر پروڈکٹ ٹوٹ پھوٹ کا شکار ہو یا کوالٹی میں کوئی شکایت ہو تو 7 دن کے اندر واٹس ایپ (0300-1788080) پر رابطہ کریں، فوری ریپلیسمنٹ یا رقم واپس کی جائے گی۔',
  },
];

export function getProductTitle(product: Product, lang: Language): string {
  if (lang === 'ur') {
    return product.name_ur || product.name;
  }
  return product.name_en || product.name;
}

export function getProductDescription(product: Product, lang: Language): string {
  if (lang === 'ur') {
    return product.description_ur || product.description || '';
  }
  return product.description_en || product.description || '';
}

export function getCategoryTitle(category: Category, lang: Language): string {
  if (lang === 'ur') {
    return category.name_ur || category.name;
  }
  return category.name_en || category.name;
}
