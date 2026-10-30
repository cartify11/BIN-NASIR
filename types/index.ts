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

export interface Category {
  id: string;
  name: string;
  name_en?: string;
  name_ur?: string;
  slug: string;
  image?: string | null;
  created_at?: string;
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
  created_at?: string;
  category?: Category;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
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
  payment_method: 'cod' | 'bank_transfer' | string;
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
}
