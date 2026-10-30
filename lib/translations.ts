export type Language = 'en' | 'ur';

export interface Translations {
  // Navigation & Header
  announcement: string;
  freeShippingNotice: string;
  whatsappOrder: string;
  home: string;
  allProducts: string;
  rewriCategory: string;
  honeyCategory: string;
  shilajitCategory: string;
  cart: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroShopBtn: string;
  heroWhatsappBtn: string;
  heroRatingText: string;
  heroCodBadge: string;
  heroQualityBadge: string;
  heroCardTag: string;
  heroCardTitle: string;
  heroCardSubtitle: string;

  // Categories Section
  categoriesHeading: string;
  categoriesSubtitle: string;
  exploreCategory: string;

  // Featured Products
  featuredHeading: string;
  featuredSubtitle: string;
  addToCart: string;
  addedToCart: string;
  buyNowCod: string;
  inStock: string;
  saveAmount: string;

  // Brand Story Section
  storyBadge: string;
  storyTitle: string;
  storyDesc: string;
  nutritionTitle: string;
  nutritionDesc: string;
  packagingTitle: string;
  packagingDesc: string;

  // Product Detail Page
  productHighlights: string;
  productFeatures: { f1: string; f2: string; f3: string };
  quantityLabel: string;
  deliveryTimeTitle: string;
  deliveryTimeDesc: string;
  openParcelTitle: string;
  openParcelDesc: string;
  callConfirmTitle: string;
  callConfirmDesc: string;
  purityGuaranteeTitle: string;
  purityGuaranteeDesc: string;
  whatsappInquiryTitle: string;
  whatsappInquiryDesc: string;
  relatedHeading: string;

  // Cart
  cartTitle: string;
  cartSubtitle: string;
  clearCart: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  startShopping: string;
  freeShippingProgress: string;
  freeShippingAchieved: string;
  subtotal: string;
  shippingFee: string;
  free: string;
  totalPayable: string;
  codNotice: string;
  proceedToCheckout: string;

  // Checkout
  checkoutTitle: string;
  checkoutSubtitle: string;
  shippingDetailsTitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHelper: string;
  cityLabel: string;
  otherCityPlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  paymentMethodTitle: string;
  codTitle: string;
  codDesc: string;
  orderItemsTitle: string;
  confirmOrderBtn: string;
  submittingOrder: string;

  // Order Success
  orderSuccessBadge: string;
  orderSuccessTitle: string;
  orderSuccessDesc: string;
  yourOrderNumber: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  whatsappConfirmBtn: string;
  continueShoppingBtn: string;

  // Footer
  footerDesc: string;
  quickCategoriesTitle: string;
  customerCareTitle: string;
  adminLink: string;
  allRightsReserved: string;
  openBoxBadge: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    announcement: '100% Pure Organic & Traditional Products | Cash on Delivery All Over Pakistan',
    freeShippingNotice: 'Free Delivery on Orders Over Rs. 3,000',
    whatsappOrder: 'WhatsApp Order',
    home: 'Home',
    allProducts: 'All Products',
    rewriCategory: 'Peanut Rewri',
    honeyCategory: 'Pure Sidr Honey',
    shilajitCategory: 'Shilajit & Health',
    cart: 'Cart',

    heroBadge: 'Traditional Taste • Modern Life',
    heroTitle1: 'Authentic Traditional Delights & Pure Nutrition,',
    heroTitleHighlight: 'Delivered to Your Doorstep',
    heroSubtitle:
      'Bin Nasir brings Pakistan’s most authentic handmade Special Peanut Rewri, wild organic Sidr Honey, purified Himalayan Shilajit resin, and Sunnah Talbina with zero chemicals.',
    heroShopBtn: 'Explore Products',
    heroWhatsappBtn: 'Order on WhatsApp',
    heroRatingText: '4.9/5 from 15,000+ Happy Pakistani Customers',
    heroCodBadge: 'Cash on Delivery (COD)',
    heroQualityBadge: '100% Purity Guaranteed',
    heroCardTag: 'Bestseller of the Season',
    heroCardTitle: 'Special Peanut Rewri & Sidr Honey',
    heroCardSubtitle: 'Handmade fresh daily with organic jaggery & premium peanuts',

    categoriesHeading: 'Our Heritage Categories',
    categoriesSubtitle: 'Handcrafted traditional sweets, wild organic honey, and Himalayan wellness supplements.',
    exploreCategory: 'Browse Category',

    featuredHeading: 'Featured Products',
    featuredSubtitle: 'Order the purest traditional delights delivered straight to your home with Cash on Delivery.',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    buyNowCod: 'Buy Now (Cash on Delivery)',
    inStock: 'In Stock & Ready to Dispatch',
    saveAmount: 'Save',

    storyBadge: 'The Bin Nasir Legacy',
    storyTitle: 'Pure Ingredients, Authentic Taste & Trust',
    storyDesc:
      'Every product at Bin Nasir is prepared following generations-old recipes without artificial colors, synthetic flavors, or chemical preservatives. We deliver goodness that nurtures your health and delights your family.',
    nutritionTitle: 'Natural Wholesome Nutrition',
    nutritionDesc: 'Made with organic gur, sesame seeds, raw wild honey, and premium dry fruits.',
    packagingTitle: 'Safe Vacuum Packaging',
    packagingDesc: 'Sealed for lasting crispness and freshness until it reaches your home.',

    productHighlights: 'Product Highlights & Benefits',
    productFeatures: {
      f1: '100% Natural Ingredients',
      f2: 'No Preservatives or Additives',
      f3: 'Fresh Handmade Batch',
    },
    quantityLabel: 'Quantity:',
    deliveryTimeTitle: '2 to 4 Days Nationwide Delivery',
    deliveryTimeDesc: 'Express dispatch across 150+ cities in Pakistan',
    openParcelTitle: 'Open Box Verification',
    openParcelDesc: 'You can check your parcel before payment',
    callConfirmTitle: 'Automated Call Confirmation',
    callConfirmDesc: 'Confirmation via AI call or WhatsApp message',
    purityGuaranteeTitle: '100% Purity Guarantee',
    purityGuaranteeDesc: 'Hassle-free money-back guarantee',
    whatsappInquiryTitle: 'Need assistance or have a question?',
    whatsappInquiryDesc: 'Chat directly with our support team on WhatsApp',
    relatedHeading: 'You May Also Like',

    cartTitle: 'Shopping Cart',
    cartSubtitle: 'Review your authentic traditional items before checkout.',
    clearCart: 'Clear Cart',
    cartEmptyTitle: 'Your Cart is Currently Empty',
    cartEmptyDesc: 'You have not added any products yet. Explore our fresh Peanut Rewri, pure Honey, and Shilajit.',
    startShopping: 'Start Shopping',
    freeShippingProgress: 'Add another {amount} to unlock FREE Delivery!',
    freeShippingAchieved: 'Congratulations! Your order qualifies for FREE Delivery.',
    subtotal: 'Subtotal',
    shippingFee: 'Shipping Charges',
    free: 'FREE',
    totalPayable: 'Total Payable (COD)',
    codNotice: 'Payment is made strictly upon delivery in cash.',
    proceedToCheckout: 'Proceed to Checkout (Cash on Delivery)',

    checkoutTitle: 'Checkout (Cash on Delivery)',
    checkoutSubtitle: 'Enter your delivery details. An automated confirmation call will verify your address.',
    shippingDetailsTitle: '1. Delivery Details',
    fullNameLabel: 'Full Name *',
    fullNamePlaceholder: 'e.g. Tariq Mehmood',
    phoneLabel: 'Pakistani Mobile Number *',
    phonePlaceholder: '0300-1788080',
    phoneHelper: 'Our automated AI system or representative will call this number to confirm your order.',
    cityLabel: 'City *',
    otherCityPlaceholder: 'Enter your city name',
    addressLabel: 'Complete Delivery Address *',
    addressPlaceholder: 'House #, Street #, Sector / Area, Landmark...',
    notesLabel: 'Special Delivery Instructions (Optional)',
    notesPlaceholder: 'e.g. Call before delivery, deliver after 2 PM',
    paymentMethodTitle: '2. Payment Method',
    codTitle: 'Cash on Delivery (COD)',
    codDesc: 'Pay in cash when you receive the parcel at your doorstep',
    orderItemsTitle: 'Order Summary',
    confirmOrderBtn: 'Place Order (Cash on Delivery)',
    submittingOrder: 'Processing your order...',

    orderSuccessBadge: 'Order Successfully Placed',
    orderSuccessTitle: 'Thank You! Your Order Has Been Received',
    orderSuccessDesc: 'Dear customer, your order has been registered in our automated system.',
    yourOrderNumber: 'Your Order Number:',
    step1Title: '1. Automated Confirmation',
    step1Desc: 'Our system will verify your order via an automated AI call or WhatsApp.',
    step2Title: '2. Fresh Packaging',
    step2Desc: 'Your items are packed fresh and sealed securely.',
    step3Title: '3. Courier Dispatch',
    step3Desc: 'Delivered to your city via courier within 2-4 business days.',
    whatsappConfirmBtn: 'Instant WhatsApp Confirmation',
    continueShoppingBtn: 'Continue Shopping',

    footerDesc:
      'Traditional Taste • Modern Life. Special Peanut Rewri, pure wild Sidr honey, purified Himalayan Shilajit, Talbina, and Royal Panjeeri. The trusted Pakistani name in purity.',
    quickCategoriesTitle: 'Categories',
    customerCareTitle: 'Customer Care',
    adminLink: 'Admin Portal',
    allRightsReserved: 'Bin Nasir. All rights reserved.',
    openBoxBadge: 'Open Parcel Check Available',
  },

  ur: {
    announcement: '100% خالص اور روایتی مصنوعات | پورے پاکستان میں کیش آن ڈلیوری (COD)',
    freeShippingNotice: '3,000 روپے سے زائد کے آرڈرز پر مفت ڈلیوری',
    whatsappOrder: 'واٹس ایپ آرڈر',
    home: 'ہوم پیج',
    allProducts: 'تمام مصنوعات',
    rewriCategory: 'مونگ پھلی کی ریوڑی',
    honeyCategory: 'خالص بیری کا شہد',
    shilajitCategory: 'ہمالیائی سلاجیت و صحت',
    cart: 'کارٹ',

    heroBadge: 'روایتی ذائقہ • جدید زندگی',
    heroTitle1: 'روایتی ذائقہ اور خالص قدرتی غذائیت،',
    heroTitleHighlight: 'اب براہِ راست آپ کی دہلیز پر',
    heroSubtitle:
      'بن ناصر پیش کرتے ہیں دیسی گڑ اور خالص مونگ پھلی سے تیار کردہ خستہ ریوڑی، جنگلی بیری کا شہد، پہاڑی ہمالیائی سلاجیت اور طبِ نبوی ﷺ کا تحفہ تلبینہ۔ بغیر کسی کیمیکل کے 100% قدرتی۔',
    heroShopBtn: 'تمام مصنوعات دیکھیں',
    heroWhatsappBtn: 'واٹس ایپ پر آرڈر کریں',
    heroRatingText: 'پاکستان بھر کے 15,000 سے زائد مطمئن صارفین کا اعتماد',
    heroCodBadge: 'کیش آن ڈلیوری (COD)',
    heroQualityBadge: '100% خالص ہونے کی ضمانت',
    heroCardTag: 'سیزن کی سب سے مقبول سوغات',
    heroCardTitle: 'اسپیشل مونگ پھلی ریوڑی اور بیری کا شہد',
    heroCardSubtitle: 'تازہ اور خستہ دیسی گڑ سے ہاتھ سے تیار کردہ',

    categoriesHeading: 'ہماری بنیادی اقسام',
    categoriesSubtitle: 'خالص روایتی ریوڑی، قدرتی شہد، اور ہمالیائی ہربل غذائیت۔',
    exploreCategory: 'کیٹیگری دیکھیں',

    featuredHeading: 'ہمارے مقبول پروڈکٹس',
    featuredSubtitle: 'خالص اور معیاری روایتی سوغاتیں گھر بیٹھے کیش آن ڈلیوری پر حاصل کریں۔',
    addToCart: 'کارٹ میں شامل کریں',
    addedToCart: 'شامل کر دیا گیا',
    buyNowCod: 'ابھی خریدیں (کیش آن ڈلیوری)',
    inStock: 'اسٹاک میں دستیاب ہے',
    saveAmount: 'بچت',

    storyBadge: 'بن ناصر کی روایات',
    storyTitle: 'خالص اجزاء، روایتی ذائقہ اور بھروسہ',
    storyDesc:
      'بن ناصر کی ہر پراڈکٹ نسل در نسل چلے آنے والے روایتی طریقوں کے مطابق تیار کی جاتی ہے۔ بغیر کسی ملاوٹ، مصنوعی رنگ یا کیمیکل کے، قدرت کی خالص ترین غذائیت۔',
    nutritionTitle: 'صحت بخش غذائیت',
    nutritionDesc: 'خالص دیسی گڑ، تل، بیری کا شہد اور مغزیات سے بھرپور۔',
    packagingTitle: 'محفوظ اور ایئر ٹائٹ پیکنگ',
    packagingDesc: 'کرنچی اور خستہ ذائقہ طویل عرصے تک برقرار رہتا ہے۔',

    productHighlights: 'تفصیلات، اجزاء اور اہم فوائد',
    productFeatures: {
      f1: '100% قدرتی اجزاء',
      f2: 'بغیر کیمیکل و پرزرویٹو',
      f3: 'تازہ دست ساز تیاری',
    },
    quantityLabel: 'تعداد:',
    deliveryTimeTitle: '2 سے 4 دن میں ملک گیر ڈلیوری',
    deliveryTimeDesc: 'پاکستان کے تمام شہروں میں تیز ترین ترسیل',
    openParcelTitle: 'اوپن پارسل کی اجازت',
    openParcelDesc: 'رقم ادا کرنے سے پہلے پارسل کھول کر تسلی کر سکتے ہیں',
    callConfirmTitle: 'فوری تصدیقی کال',
    callConfirmDesc: 'آٹومیٹک AI کال یا واٹس ایپ کے ذریعے تصدیق',
    purityGuaranteeTitle: '100% خالص ہونے کی گارنٹی',
    purityGuaranteeDesc: 'پسند نہ آنے پر رقم واپسی کی مکمل سہولت',
    whatsappInquiryTitle: 'کوئی سوال ہے یا رہنمائی درکار ہے؟',
    whatsappInquiryDesc: 'ہمارے نمائندے سے واٹس ایپ پر براہ راست بات کریں',
    relatedHeading: 'دیگر متعلقہ پراڈکٹس',

    cartTitle: 'شاپنگ کارٹ',
    cartSubtitle: 'آرڈر مکمل کرنے سے پہلے اپنی پراڈکٹس چیک کر لیں۔',
    clearCart: 'کارٹ خالی کریں',
    cartEmptyTitle: 'آپ کا کارٹ فی الحال خالی ہے',
    cartEmptyDesc: 'آپ نے ابھی تک کوئی پراڈکٹ منتخب نہیں کی۔ ہماری تازہ ریوڑی، شہد اور سلاجیت دیکھیں۔',
    startShopping: 'خریداری شروع کریں',
    freeShippingProgress: 'مفت ڈلیوری حاصل کرنے کے لیے مزید {amount} کی خریداری کریں!',
    freeShippingAchieved: 'مبارک ہو! آپ کا آرڈر فری ڈلیوری کا اہل ہو چکا ہے۔',
    subtotal: 'مصنوعات کی قیمت',
    shippingFee: 'ڈلیوری چارجز',
    free: 'مفت',
    totalPayable: 'کل قابلِ ادائیگی رقم',
    codNotice: 'ادائیگی صرف پارسل وصول کرنے پر نقد (Cash) کی جائے گی۔',
    proceedToCheckout: 'چیک آؤٹ پر جائیں (کیش آن ڈلیوری)',

    checkoutTitle: 'چیک آؤٹ (کیش آن ڈلیوری)',
    checkoutSubtitle: 'براہ کرم اپنا پتہ درج کریں۔ آرڈر بھیجنے سے پہلے تصدیقی کال کی جائے گی۔',
    shippingDetailsTitle: '1. ڈلیوری معلومات',
    fullNameLabel: 'آپ کا پورا نام *',
    fullNamePlaceholder: 'مثال: طارق محمود',
    phoneLabel: 'موبائل نمبر (03XX-XXXXXXX) *',
    phonePlaceholder: '0300-1788080',
    phoneHelper: 'ہمارا آٹومیٹک سسٹم یا نمائندہ اس نمبر پر کال کر کے آرڈر کنفرم کرے گا۔',
    cityLabel: 'شہر منتخب کریں *',
    otherCityPlaceholder: 'اپنے شہر کا نام لکھیں',
    addressLabel: 'مکمل پتہ (گھر نمبر / گلی / علاقہ) *',
    addressPlaceholder: 'مکان نمبر، گلی نمبر، محلہ / سیکٹر، قریبی مشہور جگہ...',
    notesLabel: 'خصوصی ہدایات (اختیاری)',
    notesPlaceholder: 'مثال: ڈلیوری سے قبل کال کریں، دوپہر کے وقت لائیں',
    paymentMethodTitle: '2. طریقہ ادائیگی',
    codTitle: 'کیش آن ڈلیوری (COD)',
    codDesc: 'پارسِل وصول کرتے وقت اپنے ہاتھ سے رقم ادا کریں',
    orderItemsTitle: 'آرڈر کا خلاصہ',
    confirmOrderBtn: 'آرڈر کنفرم کریں (کیش آن ڈلیوری)',
    submittingOrder: 'آرڈر رجسٹر ہو رہا ہے...',

    orderSuccessBadge: 'آرڈر کامیابی سے درج ہو چکا ہے',
    orderSuccessTitle: 'شکریہ! آپ کا آرڈر موصول ہو چکا ہے',
    orderSuccessDesc: 'محترم صارف، آپ کا آرڈر ہمارے سسٹم میں درج ہو چکا ہے۔',
    yourOrderNumber: 'آپ کا آرڈر نمبر:',
    step1Title: '1. تصدیقی کال و میسج',
    step1Desc: 'ہمارا سسٹم یا نمائندہ کال کر کے پتہ اور آرڈر کی تصدیق کرے گا۔',
    step2Title: '2. تازہ پیکنگ',
    step2Desc: 'پراڈکٹ کو ائیر ٹائٹ محفوظ باکس میں پیک کیا جائے گا۔',
    step3Title: '3. کوریئر روانگی',
    step3Desc: '2 سے 4 دن کے اندر پارسل آپ کے شہر پہنچا دیا جائے گا۔',
    whatsappConfirmBtn: 'واٹس ایپ پر فوری تصدیق کریں',
    continueShoppingBtn: 'مزید خریداری کریں',

    footerDesc:
      'روایتی ذائقہ • جدید زندگی۔ خالص مونگ پھلی کی ریوڑی، قدرتی شہد، ہمالیائی سلاجیت، تلبینہ اور پنجیری۔ روایات اور صحت کا بااعتماد پاکستانی نام۔',
    quickCategoriesTitle: 'اقسام',
    customerCareTitle: 'کسٹمر سپورٹ',
    adminLink: 'ایڈمن ڈیش بورڈ',
    allRightsReserved: 'بن ناصر۔ جملہ حقوق محفوظ ہیں۔',
    openBoxBadge: 'اوپن پارسل چیکنگ دستیاب ہے',
  },
};
