export interface StoreSettings {
  id: string;
  advance_discount_percent: number;
  free_shipping_threshold: number;
  standard_shipping_fee: number;
  
  // Payment Accounts
  jazzcash_title: string;
  jazzcash_number: string;
  easypaisa_title: string;
  easypaisa_number: string;
  bank_name: string;
  bank_title: string;
  bank_account_number: string;
  bank_iban: string;
  
  // Announcements
  announcement_en: string;
  announcement_ur: string;
  
  // Editable Stats (instead of hardcoded numbers)
  stats_rating: number;
  stats_reviews_count: number;
  stats_customers_count: number;
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: 'default',
  advance_discount_percent: 5, // 5% discount if paid via JazzCash / Easypaisa / Bank
  free_shipping_threshold: 3000,
  standard_shipping_fee: 200,

  jazzcash_title: 'Bin Nasir / Muhammad Nasir',
  jazzcash_number: '0300-1788080',

  easypaisa_title: 'Bin Nasir / Muhammad Nasir',
  easypaisa_number: '0300-1788080',

  bank_name: 'Meezan Bank Limited',
  bank_title: 'Bin Nasir Traditional Foods',
  bank_account_number: '0214-0105884901',
  bank_iban: 'PK65MEZN0002140105884901',

  announcement_en: '🎉 Free Express Delivery on orders above Rs. 3,000! Pay Advance & get 5% OFF.',
  announcement_ur: '🎉 پورے پاکستان میں 3,000 روپے سے زائد کے آرڈر پر مفت ڈلیوری! ایڈوانس پیمنٹ پر 5 فیصد رعایت۔',

  stats_rating: 4.9,
  stats_reviews_count: 1250,
  stats_customers_count: 15000,
};

// In-memory cache for fast local reads
let currentSettings = { ...DEFAULT_STORE_SETTINGS };

export function getStoreSettings(): StoreSettings {
  return currentSettings;
}

export function updateStoreSettings(newSettings: Partial<StoreSettings>): StoreSettings {
  currentSettings = { ...currentSettings, ...newSettings };
  return currentSettings;
}
