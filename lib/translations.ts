export type Language = 'en' | 'ur';

export interface Translations {
  // Navigation & Header
  announcement: string;
  freeShippingNotice: string;
  whatsappOrder: string;
  home: string;
  allProducts: string;
  categories: string;
  trackOrder: string;
  aboutUs: string;
  contactUs: string;
  faqs: string;
  cart: string;
  searchPlaceholder: string;

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
  heroOpenParcelBadge: string;

  // Trust Badges Section
  trustDesiGheeTitle: string;
  trustDesiGheeDesc: string;
  trustOpenBoxTitle: string;
  trustOpenBoxDesc: string;
  trustFreeDeliveryTitle: string;
  trustFreeDeliveryDesc: string;
  trustCodTitle: string;
  trustCodDesc: string;

  // Categories Section
  categoriesHeading: string;
  categoriesSubtitle: string;
  exploreCategory: string;

  // Best Sellers Section
  bestSellersHeading: string;
  bestSellersSubtitle: string;
  addToCart: string;
  addedToCart: string;
  buyNowCod: string;
  inStock: string;
  saveAmount: string;

  // Why Choose Us
  whyChooseHeading: string;
  whyChooseSubtitle: string;
  whyItem1Title: string;
  whyItem1Desc: string;
  whyItem2Title: string;
  whyItem2Desc: string;
  whyItem3Title: string;
  whyItem3Desc: string;
  whyItem4Title: string;
  whyItem4Desc: string;

  // How It Works
  howItWorksHeading: string;
  howItWorksSubtitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  howStep4Title: string;
  howStep4Desc: string;

  // Customer Reviews Slider
  reviewsHeading: string;
  reviewsSubtitle: string;
  verifiedBuyer: string;

  // Bundle Offers
  bundlesHeading: string;
  bundlesSubtitle: string;
  bundleIncludes: string;
  addBundleBtn: string;

  // FAQ Accordion
  faqHeading: string;
  faqSubtitle: string;
  viewAllFaqBtn: string;

  // Final CTA
  finalCtaBadge: string;
  finalCtaTitle: string;
  finalCtaDesc: string;
  finalCtaShopBtn: string;
  finalCtaWhatsappBtn: string;

  // Product Detail Page
  productHighlights: string;
  weightOptions: string;
  quantityLabel: string;
  ingredientsTitle: string;
  usageTitle: string;
  deliveryGuaranteesTitle: string;
  faqTabTitle: string;
  reviewsTabTitle: string;
  relatedHeading: string;
  stickyAddToCart: string;
  stickyBuyNow: string;

  // Cart
  cartTitle: string;
  cartSubtitle: string;
  clearCart: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  startShopping: string;
  continueShopping: string;
  couponTitle: string;
  couponPlaceholder: string;
  applyCouponBtn: string;
  freeShippingProgress: string;
  freeShippingAchieved: string;
  subtotal: string;
  couponDiscount: string;
  advanceDiscountLabel: string;
  shippingFee: string;
  free: string;
  totalPayable: string;
  proceedToCheckout: string;

  // Checkout (Single Page)
  checkoutTitle: string;
  checkoutSubtitle: string;
  customerInfoTitle: string;
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

  // Payment Methods
  paymentMethodTitle: string;
  paymentMethodSubtitle: string;
  codTitle: string;
  codDesc: string;
  advanceTitle: string;
  advanceDesc: string;
  advanceDiscountPill: string;
  advanceAccountsTitle: string;
  paymentProofLabel: string;
  paymentProofHelper: string;
  uploadScreenshotBtn: string;
  screenshotUploaded: string;

  // Order Review
  orderSummaryTitle: string;
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

  // Footer & Policies
  footerDesc: string;
  quickLinksTitle: string;
  policiesTitle: string;
  customerCareTitle: string;
  allRightsReserved: string;
  deliveryReturnsLink: string;
  privacyPolicyLink: string;
  termsLink: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Header
    announcement: '🎉 Free Express Delivery across Pakistan on orders above Rs. 3,000! Pay Advance & get 5% OFF.',
    freeShippingNotice: 'Free Delivery on Orders Over Rs. 3,000',
    whatsappOrder: 'WhatsApp Order',
    home: 'Home',
    allProducts: 'Shop All',
    categories: 'Categories',
    trackOrder: 'Track Order',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    faqs: 'FAQs',
    cart: 'Cart',
    searchPlaceholder: 'Search Peanut Rewri, Sidr Honey, Shilajit...',

    // Hero Section
    heroBadge: 'Pure Traditional Foods • Farm Fresh Guarantee',
    heroTitle1: 'Authentic Traditional Delights & Pure Nutrition,',
    heroTitleHighlight: 'Delivered to Your Doorstep',
    heroSubtitle:
      'Handcrafted Chakwal Special Peanut Rewri, 100% wild Sidr Honey, gold-grade purified Himalayan Shilajit, and grass-fed Desi Ghee Panjeeri. Zero preservatives, zero artificial additives.',
    heroShopBtn: 'Shop Pure Products',
    heroWhatsappBtn: 'Order via WhatsApp',
    heroRatingText: 'Rated {rating}/5 by {reviews}+ Verified Pakistani Customers',
    heroCodBadge: 'Cash on Delivery (COD)',
    heroQualityBadge: '100% Khalis & Lab Tested',
    heroOpenParcelBadge: 'Open Parcel Inspection Allowed',

    // Trust Badges Section
    trustDesiGheeTitle: '100% Pure Desi Ghee',
    trustDesiGheeDesc: 'Roasted in authentic grass-fed butter & jaggery',
    trustOpenBoxTitle: 'Open Parcel Guarantee',
    trustOpenBoxDesc: 'Inspect & verify before paying the courier',
    trustFreeDeliveryTitle: 'Free Shipping Over Rs. 3,000',
    trustFreeDeliveryDesc: 'Direct express dispatch to all cities & towns',
    trustCodTitle: 'Cash on Delivery Nationwide',
    trustCodDesc: 'Convenient & safe payment at your doorstep',

    // Categories Section
    categoriesHeading: 'Our Pure Heritage Categories',
    categoriesSubtitle: 'Handmade traditional sweets, raw forest honey, and Himalayan revitalizing tonics.',
    exploreCategory: 'Explore Category',

    // Best Sellers Section
    bestSellersHeading: 'Customer Favorites & Best Sellers',
    bestSellersSubtitle: 'The most loved traditional delights ordered daily by Pakistani families.',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart ✓',
    buyNowCod: 'Buy Now (COD)',
    inStock: 'In Stock & Ready to Dispatch',
    saveAmount: 'Save',

    // Why Choose Us
    whyChooseHeading: 'Why Thousands of Families Trust Bin Nasir',
    whyChooseSubtitle: 'Rooted in timeless Pakistani food traditions with uncompromised dedication to pure ingredients.',
    whyItem1Title: 'Chakwal Handcrafted Heritage',
    whyItem1Desc: 'Our Rewri is handcrafted using age-old slow roasting methods over open bhatti with fresh desi gur.',
    whyItem2Title: 'Raw & Unfiltered Sidr Honey',
    whyItem2Desc: 'Harvested directly from wild Beri blooms in Karak and Potohar regions, preserving active live enzymes.',
    whyItem3Title: 'Gold-Grade Himalayan Shilajit',
    whyItem3Desc: 'Purified via traditional Ayurvedic filtration, rich in 84+ minerals and over 70% fulvic acid.',
    whyItem4Title: 'Zero Chemical Preservatives',
    whyItem4Desc: 'No artificial flavors, glucose syrups, or synthetic colors. What you eat is 100% pure nature.',

    // How It Works
    howItWorksHeading: 'How Your Order Works',
    howItWorksSubtitle: 'A smooth, transparent, and completely risk-free shopping experience from order to your kitchen.',
    howStep1Title: '1. Place Order Online',
    howStep1Desc: 'Choose your favorite items and order via Cash on Delivery or Advance Payment in 30 seconds.',
    howStep2Title: '2. Instant Confirmation',
    howStep2Desc: 'Our team verifies your order details and delivery address via a quick call or WhatsApp message.',
    howStep3Title: '3. Express Dispatch',
    howStep3Desc: 'Freshly packed in vacuum-sealed food-grade packaging and dispatched via top couriers in 2-4 days.',
    howStep4Title: '4. Open Parcel & Inspect',
    howStep4Desc: 'Open and inspect your parcel in front of the courier rider before paying. Complete peace of mind!',

    // Customer Reviews Slider
    reviewsHeading: 'What Our Customers Say Across Pakistan',
    reviewsSubtitle: 'Real reviews from verified buyers in Lahore, Karachi, Islamabad, Rawalpindi, and Faisalabad.',
    verifiedBuyer: 'Verified Purchase',

    // Bundle Offers
    bundlesHeading: 'Special Value Bundles & Gift Packs',
    bundlesSubtitle: 'Save more with our curated family health combos and festive gift boxes.',
    bundleIncludes: 'Package includes:',
    addBundleBtn: 'Order Bundle Now',

    // FAQ Accordion
    faqHeading: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about delivery, open parcel policy, and product storage.',
    viewAllFaqBtn: 'View All FAQs',

    // Final CTA
    finalCtaBadge: 'Taste The Pure Difference',
    finalCtaTitle: 'Ready to Experience 100% Authentic Pakistani Purity?',
    finalCtaDesc: 'Order today with complete confidence. Inspect your parcel upon delivery or pay advance for a 5% instant discount.',
    finalCtaShopBtn: 'Explore Full Collection',
    finalCtaWhatsappBtn: 'Quick Order on WhatsApp',

    // Product Detail Page
    productHighlights: 'Key Benefits & Purity Highlights',
    weightOptions: 'Select Weight / Pack Size:',
    quantityLabel: 'Quantity:',
    ingredientsTitle: 'Pure Ingredients',
    usageTitle: 'How to Consume / Use',
    deliveryGuaranteesTitle: 'Delivery & Guarantees',
    faqTabTitle: 'Product FAQs',
    reviewsTabTitle: 'Customer Reviews',
    relatedHeading: 'You May Also Like',
    stickyAddToCart: 'Add to Cart',
    stickyBuyNow: 'Buy Now (COD)',

    // Cart
    cartTitle: 'Your Shopping Cart',
    cartSubtitle: 'Review your items and enjoy free express delivery above Rs. 3,000.',
    clearCart: 'Clear Cart',
    cartEmptyTitle: 'Your Cart is Currently Empty',
    cartEmptyDesc: 'Add some authentic Peanut Rewri, pure Honey, or Shilajit to get started!',
    startShopping: 'Explore Our Products',
    continueShopping: 'Continue Shopping',
    couponTitle: 'Have a Discount Coupon?',
    couponPlaceholder: 'Enter code (e.g. BINNASIR10)',
    applyCouponBtn: 'Apply Coupon',
    freeShippingProgress: 'Add Rs. {amount} more to unlock FREE Nationwide Delivery!',
    freeShippingAchieved: '🎉 Congratulations! Your order qualifies for FREE Delivery across Pakistan.',
    subtotal: 'Items Subtotal',
    couponDiscount: 'Coupon Discount',
    advanceDiscountLabel: 'Advance Payment Discount (5%)',
    shippingFee: 'Shipping Charges',
    free: 'FREE',
    totalPayable: 'Total Amount',
    proceedToCheckout: 'Proceed to Single-Page Checkout',

    // Checkout (Single Page)
    checkoutTitle: 'Complete Your Order',
    checkoutSubtitle: 'Fill in your delivery address. Open parcel inspection is allowed before payment.',
    customerInfoTitle: '1. Contact & Delivery Address',
    fullNameLabel: 'Full Name *',
    fullNamePlaceholder: 'e.g. Tariq Mehmood',
    phoneLabel: 'Pakistani Mobile Number *',
    phonePlaceholder: '0300-1788080',
    phoneHelper: 'We will verify your order via a quick automated call or WhatsApp message.',
    cityLabel: 'Select City *',
    otherCityPlaceholder: 'Enter your city name',
    addressLabel: 'Complete Delivery Address *',
    addressPlaceholder: 'House #, Street #, Sector / Colony, Near Landmark...',
    notesLabel: 'Special Delivery Instructions (Optional)',
    notesPlaceholder: 'e.g. Please deliver after 3 PM or call before reaching.',

    // Payment Methods
    paymentMethodTitle: '2. Select Payment Method',
    paymentMethodSubtitle: 'Choose Cash on Delivery or save 5% with Advance Payment.',
    codTitle: 'Cash on Delivery (COD)',
    codDesc: 'Pay cash to the rider at your doorstep. Open parcel inspection allowed before payment.',
    advanceTitle: 'Advance Payment (JazzCash / Easypaisa / Bank)',
    advanceDesc: 'Pay now and get an instant 5% discount on your entire order.',
    advanceDiscountPill: '5% Instant Discount Applied',
    advanceAccountsTitle: 'Official Payment Accounts for Bin Nasir:',
    paymentProofLabel: 'Upload Payment Screenshot / Receipt *',
    paymentProofHelper: 'Attach the confirmation receipt screenshot from your JazzCash, Easypaisa, or Banking app.',
    uploadScreenshotBtn: 'Click to Upload Screenshot',
    screenshotUploaded: 'Screenshot uploaded successfully ✓',

    // Order Review
    orderSummaryTitle: 'Order Summary',
    confirmOrderBtn: 'Place Order Now',
    submittingOrder: 'Submitting your order securely...',

    // Order Success
    orderSuccessBadge: 'Order Successfully Placed',
    orderSuccessTitle: 'Thank You! Your Order Has Been Received',
    orderSuccessDesc: 'Dear customer, your order has been received and our dispatch team is preparing your package.',
    yourOrderNumber: 'Your Order Number:',
    step1Title: '1. Order Verification',
    step1Desc: 'Automated AI call or quick WhatsApp confirmation.',
    step2Title: '2. Vacuum-Sealed Fresh Packing',
    step2Desc: 'Packed hygienically in food-grade packaging.',
    step3Title: '3. Express Courier Dispatch',
    step3Desc: 'Delivered in 2-4 business days with Open Parcel guarantee.',
    whatsappConfirmBtn: 'Confirm via WhatsApp',
    continueShoppingBtn: 'Continue Shopping',

    // Footer & Policies
    footerDesc:
      'Bin Nasir brings the purity of traditional Pakistani delicacies. Handcrafted Peanut Rewri, wild Sidr Honey, purified Himalayan Shilajit, and Desi Ghee Panjeeri delivered nationwide.',
    quickLinksTitle: 'Quick Links',
    policiesTitle: 'Customer Policies',
    customerCareTitle: 'Customer Support',
    allRightsReserved: 'Bin Nasir Traditional Foods. All rights reserved.',
    deliveryReturnsLink: 'Delivery & Returns Policy',
    privacyPolicyLink: 'Privacy Policy',
    termsLink: 'Terms & Conditions',
  },

  ur: {
    // Navigation & Header
    announcement: '🎉 پورے پاکستان میں 3,000 روپے سے زائد کے آرڈر پر مفت ڈلیوری! ایڈوانس ادائیگی پر 5 فیصد رعایت۔',
    freeShippingNotice: '3,000 روپے سے زائد کے آرڈرز پر مفت ڈلیوری',
    whatsappOrder: 'واٹس ایپ آرڈر',
    home: 'ہوم پیج',
    allProducts: 'تمام مصنوعات',
    categories: 'اقسام',
    trackOrder: 'آرڈر ٹریک کریں',
    aboutUs: 'ہمارے بارے میں',
    contactUs: 'رابطہ کریں',
    faqs: 'عام سوالات',
    cart: 'کارٹ',
    searchPlaceholder: 'مونگ پھلی ریوڑی، بیری شہد، سلاجیت تلاش کریں...',

    // Hero Section
    heroBadge: 'خالص روایتی سوغاتیں • 100% قدرتی معیار',
    heroTitle1: 'روایتی ذائقہ اور خالص قدرتی غذائیت،',
    heroTitleHighlight: 'اب براہِ راست آپ کی دہلیز پر',
    heroSubtitle:
      'چکوال کی روایتی دیسی گڑ اور مونگ پھلی والی خستہ ریوڑی، 100% جنگلی بیری کا شہد، ہمالیائی گولڈ گریڈ سلاجیت اور خالص دیسی گھی پنجیری۔ بغیر کسی ملاوٹ اور کیمیکل کے۔',
    heroShopBtn: 'خالص پراڈکٹس دیکھیں',
    heroWhatsappBtn: 'واٹس ایپ پر آرڈر کریں',
    heroRatingText: 'پاکستان بھر کے {reviews} سے زائد مطمئن صارفین کا اعتماد ({rating}/5)',
    heroCodBadge: 'کیش آن ڈلیوری (COD)',
    heroQualityBadge: '100% خالص اور ٹیسٹ شدہ',
    heroOpenParcelBadge: 'پارسل کھول کر تسلی کی اجازت',

    // Trust Badges Section
    trustDesiGheeTitle: '100% خالص دیسی گھی',
    trustDesiGheeDesc: 'اصلی دیسی گھی اور گڑ کے ساتھ روایتی تیاری',
    trustOpenBoxTitle: 'اوپن پارسل گارنٹی',
    trustOpenBoxDesc: 'پہلے پارسل کھول کر چیک کریں، پھر پیسے دیں',
    trustFreeDeliveryTitle: '3000 روپے پر فری ڈلیوری',
    trustFreeDeliveryDesc: 'پورے پاکستان کے تمام شہروں میں تیز ترین ترسیل',
    trustCodTitle: 'کیش آن ڈلیوری کی سہولت',
    trustCodDesc: 'گھر کی دہلیز پر آرام اور تسلی کے ساتھ ادائیگی',

    // Categories Section
    categoriesHeading: 'ہماری بنیادی روایتی اقسام',
    categoriesSubtitle: 'خالص ہاتھ سے بنی ریوڑی، قدرتی جنگلی شہد، اور ہمالیائی ہربل غذائیت۔',
    exploreCategory: 'کیٹیگری دیکھیں',

    // Best Sellers Section
    bestSellersHeading: 'ہمارے سب سے مقبول پراڈکٹس',
    bestSellersSubtitle: 'پاکستانی خاندانوں کی سب سے پسندیدہ اور روزانہ بکنے والی روایتی سوغاتیں۔',
    addToCart: 'کارٹ میں شامل',
    addedToCart: 'شامل ہو گیا ✓',
    buyNowCod: 'ابھی خریدیں',
    inStock: 'اسٹاک میں دستیاب ہے',
    saveAmount: 'بچت',

    // Why Choose Us
    whyChooseHeading: 'ہزاروں پاکستانی خاندان بن ناصر پر کیوں بھروسہ کرتے ہیں؟',
    whyChooseSubtitle: 'صدیوں پرانی روایات اور خالص قدرتی اجزاء پر کوئی سمجھوتہ نہیں۔',
    whyItem1Title: 'چکوال کی روایتی تیاری',
    whyItem1Desc: 'ہماری ریوڑی دیسی گڑ اور اعلیٰ کوالٹی مونگ پھلی سے روایتی بھٹیوں پر ہاتھ سے بنائی جاتی ہے۔',
    whyItem2Title: 'خالص و غیر فلٹر شدہ بیری شہد',
    whyItem2Desc: 'پوٹھوہار اور کرک کے جنگلی بیری کے درختوں سے حاصل کردہ، قدرتی انزائمز اور افادیت سے بھرپور۔',
    whyItem3Title: 'گولڈ گریڈ ہمالیائی سلاجیت',
    whyItem3Desc: 'پہاڑوں سے حاصل کردہ مصفی ریزن، 84 سے زائد معدنیات اور 70 فیصد سے زائد فلوک ایسڈ کے ساتھ۔',
    whyItem4Title: 'مصنوعی کیمیکل سے مکمل پاک',
    whyItem4Desc: 'کوئی مصنوعی شیرہ، کیمیکل یا رنگ شامل نہیں ہوتا۔ قدرت کی عطا کردہ خالص غذا۔',

    // How It Works
    howItWorksHeading: 'آرڈر کا آسان اور محفوظ طریقہ کار',
    howItWorksSubtitle: 'مکمل اطمینان، شفافیت اور بغیر کسی خطرے کے خریداری۔',
    howStep1Title: '1. آن لائن آرڈر درج کریں',
    howStep1Desc: 'اپنی پسندیدہ اشیاء چنیں اور کیش آن ڈلیوری یا ایڈوانس ادائیگی کے ذریعے 30 سیکنڈ میں آرڈر دیں۔',
    howStep2Title: '2. فوری تصدیق',
    howStep2Desc: 'ہماری ٹیم فوری کال یا واٹس ایپ پر پتہ اور آرڈر کی تصدیق کرے گی۔',
    howStep3Title: '3. تیز ترین ترسیل',
    howStep3Desc: 'محفوظ ویکیوم پیکنگ میں تیار کر کے نامور کوریئر کے ذریعے 2 سے 4 دن میں پارسل روانہ کیا جائے گا۔',
    howStep4Title: '4. پارسل کھول کر تسلی کریں',
    howStep4Desc: 'رائیڈر کے سامنے پارسل کھول کر اشیاء چیک کریں اور مکمل تسلی کے بعد کیش ادا کریں۔',

    // Customer Reviews Slider
    reviewsHeading: 'ہمارے قابلِ قدر صارفین کی رائے',
    reviewsSubtitle: 'لاہور، کراچی، اسلام آباد، راولپنڈی اور فیصل آباد کے تصدیق شدہ خریداروں کے تاثرات۔',
    verifiedBuyer: 'تصدیق شدہ خریدار',

    // Bundle Offers
    bundlesHeading: 'خصوصی فیملی ڈسکاؤنٹ بنڈلز',
    bundlesSubtitle: 'ایک ساتھ خریدیں اور اضافی بچت اور فری ڈلیوری کا فائدہ اٹھائیں۔',
    bundleIncludes: 'بنڈل میں شامل اشیاء:',
    addBundleBtn: 'بنڈل ابھی آرڈر کریں',

    // FAQ Accordion
    faqHeading: 'اکثر پوچھے جانے والے سوالات',
    faqSubtitle: 'ڈلیوری، اوپن پارسل پالیسی اور پروڈکٹ کے استعمال کے بارے میں مکمل معلومات۔',
    viewAllFaqBtn: 'تمام سوالات دیکھیں',

    // Final CTA
    finalCtaBadge: 'خالص ذائقے کا تجربہ کریں',
    finalCtaTitle: 'کیا آپ 100% خالص اور روایتی معیار آزمانے کے لیے تیار ہیں؟',
    finalCtaDesc: 'پورے اعتماد سے آرڈر کریں۔ ڈلیوری پر پارسل کھول کر چیک کریں یا ایڈوانس ادائیگی پر 5 فیصد رعایت پائیں۔',
    finalCtaShopBtn: 'تمام پراڈکٹس دیکھیں',
    finalCtaWhatsappBtn: 'واٹس ایپ پر فوری آرڈر',

    // Product Detail Page
    productHighlights: 'اہم فوائد اور خصوصیات',
    weightOptions: 'وزن / پیک سائز منتخب کریں:',
    quantityLabel: 'تعداد:',
    ingredientsTitle: 'خالص اجزاء',
    usageTitle: 'طریقہ استعمال',
    deliveryGuaranteesTitle: 'ڈلیوری اور تسلی کی گارنٹی',
    faqTabTitle: 'اہم سوالات',
    reviewsTabTitle: 'صارفین کی رائے',
    relatedHeading: 'دیگر متعلقہ پراڈکٹس',
    stickyAddToCart: 'کارٹ میں شامل',
    stickyBuyNow: 'ابھی خریدیں',

    // Cart
    cartTitle: 'شاپنگ کارٹ',
    cartSubtitle: 'اپنی منتخب اشیاء چیک کریں اور 3000 روپے سے زائد پر مفت ڈلیوری حاصل کریں۔',
    clearCart: 'کارٹ خالی کریں',
    cartEmptyTitle: 'آپ کا کارٹ فی الحال خالی ہے',
    cartEmptyDesc: 'ہماری تازہ مونگ پھلی ریوڑی، بیری کا شہد یا سلاجیت شامل کر کے آغاز کریں!',
    startShopping: 'پراڈکٹس دیکھیں',
    continueShopping: 'مزید خریداری کریں',
    couponTitle: 'کیا آپ کے پاس ڈسکاؤنٹ کوپن ہے؟',
    couponPlaceholder: 'کوپن کوڈ لکھیں (مثلاً BINNASIR10)',
    applyCouponBtn: 'کوپن لگائیں',
    freeShippingProgress: 'مفت ڈلیوری حاصل کرنے کے لیے مزید {amount} کا اضافہ کریں!',
    freeShippingAchieved: '🎉 مبارک ہو! آپ کا آرڈر پورے پاکستان میں فری ڈلیوری کا اہل ہو چکا ہے۔',
    subtotal: 'اشیاء کی قیمت',
    couponDiscount: 'کوپن ڈسکاؤنٹ',
    advanceDiscountLabel: 'ایڈوانس پیمنٹ ڈسکاؤنٹ (5%)',
    shippingFee: 'ڈلیوری چارجز',
    free: 'مفت',
    totalPayable: 'کل قابلِ ادائیگی رقم',
    proceedToCheckout: 'چیک آؤٹ پر جائیں',

    // Checkout (Single Page)
    checkoutTitle: 'آرڈر کی تکمیل (سنگل پیج چیک آؤٹ)',
    checkoutSubtitle: 'اپنا پتہ درج کریں۔ رقم دینے سے پہلے پارسل کھول کر تسلی کرنے کی مکمل اجازت ہے۔',
    customerInfoTitle: '1. رابطہ اور ڈلیوری کا پتہ',
    fullNameLabel: 'آپ کا پورا نام *',
    fullNamePlaceholder: 'مثال: طارق محمود',
    phoneLabel: 'موبائل نمبر (03XX-XXXXXXX) *',
    phonePlaceholder: '0300-1788080',
    phoneHelper: 'ہماری ٹیم اس نمبر پر فون یا واٹس ایپ کر کے آرڈر کنفرم کرے گی۔',
    cityLabel: 'شہر کا انتخاب کریں *',
    otherCityPlaceholder: 'اپنے شہر کا نام لکھیں',
    addressLabel: 'مکمل اور درست پتہ *',
    addressPlaceholder: 'مکان نمبر، گلی نمبر، محلہ / سیکٹر، قریبی مشہور جگہ...',
    notesLabel: 'خصوصی ہدایات (اختیاری)',
    notesPlaceholder: 'مثال: دوپہر 3 بجے کے بعد لائیں یا آنے سے پہلے کال کریں۔',

    // Payment Methods
    paymentMethodTitle: '2. طریقہ ادائیگی منتخب کریں',
    paymentMethodSubtitle: 'کیش آن ڈلیوری منتخب کریں یا ایڈوانس ادائیگی پر فوری 5% رعایت پائیں۔',
    codTitle: 'کیش آن ڈلیوری (COD)',
    codDesc: 'پارسِل وصول کرتے وقت اپنے ہاتھ سے رقم ادا کریں۔ پارسل کھول کر تسلی کی مکمل اجازت ہے۔',
    advanceTitle: 'ایڈوانس ادائیگی (JazzCash / Easypaisa / بینک)',
    advanceDesc: 'ایڈوانس رقم بھیجیں اور اپنے پورے آرڈر پر فوری 5 فیصد اضافی بچت حاصل کریں۔',
    advanceDiscountPill: '5 فیصد فوری ڈسکاؤنٹ شامل ہے',
    advanceAccountsTitle: 'بن ناصر کے آفیشل اکاؤنٹس کی تفصیلات:',
    paymentProofLabel: 'ادائیگی کا اسکرین شاٹ / رسید اپلوڈ کریں *',
    paymentProofHelper: 'جاز کیش، ایزی پیسہ یا بینک ایپ کا کنفرمیشن اسکرین شاٹ منتخب کریں۔',
    uploadScreenshotBtn: 'اسکرین شاٹ اپلوڈ کریں',
    screenshotUploaded: 'اسکرین شاٹ کامیابی سے اپلوڈ ہو گیا ✓',

    // Order Review
    orderSummaryTitle: 'آرڈر کا خلاصہ',
    confirmOrderBtn: 'آرڈر کنفرم کریں',
    submittingOrder: 'آرڈر درج ہو رہا ہے، براہ کرم انتظار کریں...',

    // Order Success
    orderSuccessBadge: 'آرڈر کامیابی سے موصول ہو چکا ہے',
    orderSuccessTitle: 'شکریہ! آپ کا آرڈر موصول ہو چکا ہے',
    orderSuccessDesc: 'محترم گاہک، آپ کا آرڈر درج ہو چکا ہے اور ہماری ٹیم پارسل تیار کر رہی ہے۔',
    yourOrderNumber: 'آپ کا آرڈر نمبر:',
    step1Title: '1. تصدیقی کال و میسج',
    step1Desc: 'ہمارا سسٹم یا نمائندہ کال کر کے پتہ اور آرڈر کی تصدیق کرے گا۔',
    step2Title: '2. تازہ اور ایئرٹائٹ پیکنگ',
    step2Desc: 'پراڈکٹ کو فوڈ گریڈ محفوظ باکس میں پیک کیا جائے گا۔',
    step3Title: '3. کوریئر روانگی',
    step3Desc: '2 سے 4 دن کے اندر پارسل آپ کے شہر اوپن باکس گارنٹی کے ساتھ پہنچا دیا جائے گا۔',
    whatsappConfirmBtn: 'واٹس ایپ پر رابطہ کریں',
    continueShoppingBtn: 'مزید خریداری کریں',

    // Footer & Policies
    footerDesc:
      'بن ناصر روایتی پاکستانی سوغاتوں اور خالص غذا کا بااعتماد نام ہے۔ خاص مونگ پھلی ریوڑی، خالص بیری شہد، مصفی ہمالیائی سلاجیت اور دیسی گھی پنجیری پورے پاکستان میں دستیاب۔',
    quickLinksTitle: 'اہم لنکس',
    policiesTitle: 'پالیسیز اور شرائط',
    customerCareTitle: 'کسٹمر سپورٹ',
    allRightsReserved: 'بن ناصر روایتی فوڈز۔ جملہ حقوق محفوظ ہیں۔',
    deliveryReturnsLink: 'ڈلیوری اور ریٹرن پالیسی',
    privacyPolicyLink: 'پرائیویسی پالیسی',
    termsLink: 'قواعد و ضوابط',
  },
};
