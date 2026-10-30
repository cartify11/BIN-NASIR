export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'shipped'
  | 'delivered'
  | 'returned';

export type ConfirmationStatus =
  | 'not_called'
  | 'calling'
  | 'confirmed'
  | 'no_answer'
  | 'rejected';

export type PaymentMethod = 'cod' | 'advance' | 'bank_transfer';

export type PaymentStatus = 'unpaid' | 'pending_verification' | 'paid';

export interface Category {
  id: string;
  name: string;
  name_en?: string;
  name_ur?: string;
  slug: string;
  image?: string | null;
  created_at?: string;
}

export interface ProductVariant {
  id: string;
  label_en: string;
  label_ur: string;
  weight: string;
  price: number;
  compare_at_price?: number;
  stock: number;
}

export interface ProductFAQ {
  question_en: string;
  question_ur: string;
  answer_en: string;
  answer_ur: string;
}

export interface Product {
  id: string;
  name: string;
  name_en?: string;
  name_ur?: string;
  slug: string;
  description: string | null;
  description_en?: string;
  description_ur?: string;
  price: number;
  compare_at_price?: number | null;
  images: string[];
  category_id?: string | null;
  stock: number;
  is_active: boolean;
  is_bestseller?: boolean;
  created_at?: string;
  category?: Category;
  variants?: ProductVariant[];
  ingredients_en?: string;
  ingredients_ur?: string;
  usage_en?: string;
  usage_ur?: string;
  faqs?: ProductFAQ[];
  badge_en?: string;
  badge_ur?: string;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant_label?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  notes?: string | null;
  total: number;
  shipping_fee: number;
  discount_amount?: number;
  coupon_code?: string | null;
  payment_method: PaymentMethod | string;
  payment_status?: PaymentStatus;
  payment_proof_url?: string | null;
  status: OrderStatus;
  confirmation_status: ConfirmationStatus;
  courier_name?: string | null;
  tracking_number?: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderEvent {
  id: string;
  order_id: string;
  event_type: string;
  message: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment_en: string;
  comment_ur: string;
  verified_purchase: boolean;
  product_name?: string;
}

export interface BundleOffer {
  id: string;
  title_en: string;
  title_ur: string;
  description_en: string;
  description_ur: string;
  badge_en: string;
  badge_ur: string;
  price: number;
  original_price: number;
  image: string;
  items_en: string[];
  items_ur: string[];
  product_ids: string[];
}
