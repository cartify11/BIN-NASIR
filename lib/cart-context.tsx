'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ProductVariant, CartItem } from '@/types';
import { DEFAULT_STORE_SETTINGS } from './store-settings';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  orderTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  freeShippingPercent: number;
  isMounted: boolean;
  getItemKey: (item: CartItem) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD = DEFAULT_STORE_SETTINGS.free_shipping_threshold;
export const STANDARD_SHIPPING_FEE = DEFAULT_STORE_SETTINGS.standard_shipping_fee;

export function getItemKey(item: CartItem): string {
  return item.selectedVariant ? `${item.product.id}_${item.selectedVariant.id}` : item.product.id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('binnasir_cart_v2');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('binnasir_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code || '');
        setCouponDiscountPercent(parsed.percent || 0);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('binnasir_cart_v2', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, isMounted]);

  const addItem = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const activeVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const key = activeVariant ? `${product.id}_${activeVariant.id}` : product.id;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => getItemKey(item) === key);
      const maxStock = activeVariant?.stock || product.stock || 99;

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, maxStock);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      }
      return [...prev, { product, quantity: Math.min(quantity, maxStock), selectedVariant: activeVariant }];
    });
  };

  const removeItem = (itemKey: string) => {
    setItems((prev) => prev.filter((item) => getItemKey(item) !== itemKey));
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (getItemKey(item) === itemKey) {
          const maxStock = item.selectedVariant?.stock || item.product.stock || 99;
          const clamped = Math.min(quantity, maxStock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem('binnasir_cart_v2');
      localStorage.removeItem('binnasir_coupon');
    } catch (e) {}
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BINNASIR10') {
      setCouponCode('BINNASIR10');
      setCouponDiscountPercent(10);
      try {
        localStorage.setItem('binnasir_coupon', JSON.stringify({ code: 'BINNASIR10', percent: 10 }));
      } catch (e) {}
      return { success: true, message: '🎉 10% discount applied successfully!' };
    } else if (cleanCode === 'WELCOME5') {
      setCouponCode('WELCOME5');
      setCouponDiscountPercent(5);
      try {
        localStorage.setItem('binnasir_coupon', JSON.stringify({ code: 'WELCOME5', percent: 5 }));
      } catch (e) {}
      return { success: true, message: '🎉 5% welcome discount applied!' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try "BINNASIR10"' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem('binnasir_coupon');
    } catch (e) {}
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = couponDiscountPercent > 0 ? Math.round((subtotal * couponDiscountPercent) / 100) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const shippingFee = discountedSubtotal > 0 && discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : discountedSubtotal > 0 ? STANDARD_SHIPPING_FEE : 0;
  const orderTotal = discountedSubtotal + shippingFee;

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        discountAmount,
        couponCode,
        applyCoupon,
        removeCoupon,
        orderTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingPercent,
        isMounted,
        getItemKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
