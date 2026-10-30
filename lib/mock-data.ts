import { Category, Product } from '@/types';
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
    image: '/images/banner.jpg',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Herbal Wellness & Tonics',
    name_en: 'Herbal Wellness & Tonics',
    name_ur: 'ہربل و قدرتی فارمولہ',
    slug: 'herbal-health-supplements',
    image: '/images/bag-catalog.jpg',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    name: 'Special Peanut Rewri - 500g',
    name_en: 'Special Peanut Rewri - 500g',
    name_ur: 'خاص مونگ پھلی کی ریوڑی - 500 گرام',
    slug: 'special-peanut-rewri',
    description:
      'Handcrafted crispy rewri prepared with organic jaggery (gur), premium roasted peanuts, and white sesame seeds. 100% natural energy snack with zero chemical additives.',
    description_en:
      'Handcrafted crispy rewri prepared with organic jaggery (gur), premium roasted peanuts, and white sesame seeds. 100% natural energy snack with zero chemical additives.',
    description_ur:
      'خالص مونگ پھلی، دیسی گڑ اور سفید تل سے تیار کردہ روایتی خستہ اور لذیذ ریوڑی۔ 100% قدرتی اجزاء اور بغیر کسی کیمیکل کے تیار کردہ۔ توانائی اور روایتی ذائقے کا بہترین سنگم۔',
    price: 850,
    compare_at_price: 1100,
    images: ['/images/peanut-rewri.jpg', '/images/banner.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000001',
    stock: 50,
    is_active: true,
  },
  {
    id: 'p1000000-0000-0000-0000-000000000002',
    name: 'Pure Natural Sidr Honey - 1000g Jar',
    name_en: 'Pure Natural Sidr Honey - 1000g Jar',
    name_ur: 'خالص قدرتی بیری کا شہد - 1000 گرام جار',
    slug: 'pure-natural-sidr-honey',
    description:
      '100% raw and unfiltered wild Sidr (Beri) honey harvested from native flora. Rich in natural digestive enzymes, antibacterial properties, and immune-boosting nutrients.',
    description_en:
      '100% raw and unfiltered wild Sidr (Beri) honey harvested from native flora. Rich in natural digestive enzymes, antibacterial properties, and immune-boosting nutrients.',
    description_ur:
      'قدرت کا نایاب تحفہ، 100% خالص اور قدرتی بیری کا شہد۔ گلے کی خراش، کھانسی اور قوتِ مدافعت میں اضافے کے لیے بے حد مفید۔ اصل جنگلی بیری کا شہد قدرتی اینزائمز اور خوشبو سے بھرپور۔',
    price: 2950,
    compare_at_price: 3500,
    images: ['/images/banner.jpg', '/images/bag-catalog.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000002',
    stock: 35,
    is_active: true,
  },
  {
    id: 'p1000000-0000-0000-0000-000000000003',
    name: 'Pure Himalayan Shilajit - 30g Soft Resin',
    name_en: 'Pure Himalayan Shilajit - 30g Soft Resin',
    name_ur: 'خالص ہمالیائی سلاجیت - 30 گرام سوفٹ ریزن',
    slug: 'pure-himalayan-shilajit',
    description:
      'Gold-grade purified Shilajit resin extracted from the high peaks of the Himalayas. Packed with 84+ ionic trace minerals and fulvic acid to revitalize stamina, vitality, and joint health.',
    description_en:
      'Gold-grade purified Shilajit resin extracted from the high peaks of the Himalayas. Packed with 84+ ionic trace minerals and fulvic acid to revitalize stamina, vitality, and joint health.',
    description_ur:
      'ہمالیہ اور قراقرم کے پہاڑوں سے حاصل کردہ 100% مصفی اور اصلی سلاجیت۔ جسمانی توانائی، طاقت، جوڑوں کے درد اور کمزوری دور کرنے کے لیے صدیوں کا آزمودہ نسخہ۔ گولڈ گریڈ سلاجیت ریزن۔',
    price: 2450,
    compare_at_price: 3200,
    images: ['/images/banner.jpg', '/images/bag-catalog.jpg'],
    category_id: 'c1000000-0000-0000-0000-000000000003',
    stock: 25,
    is_active: true,
  },
  {
    id: 'p1000000-0000-0000-0000-000000000004',
    name: 'Royal Desi Ghee Panjeeri - 500g',
    name_en: 'Royal Desi Ghee Panjeeri - 500g',
    name_ur: 'شاہی دیسی گھی پنجیری - 500 گرام',
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
  },
  {
    id: 'p1000000-0000-0000-0000-000000000005',
    name: 'Sunnah Talbina with Dry Fruits - 400g',
    name_en: 'Sunnah Talbina with Dry Fruits - 400g',
    name_ur: 'نبوی تلبینہ ڈرائی فروٹس - 400 گرام',
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
  },
  {
    id: 'p1000000-0000-0000-0000-000000000006',
    name: 'Crispy Sesame Gur Rewri - 500g',
    name_en: 'Crispy Sesame Gur Rewri - 500g',
    name_ur: 'تل اور گڑ کی خاص ریوڑی - 500 گرام',
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
