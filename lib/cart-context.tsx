'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  orderTotal: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 200;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('binnasir_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('binnasir_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, isMounted]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: product.stock ? Math.min(newQty, product.stock) : newQty,
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = item.product.stock ? Math.min(quantity, item.product.stock) : quantity;
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 0 && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? STANDARD_SHIPPING_FEE : 0;
  const orderTotal = subtotal + shippingFee;

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
        orderTotal,
        isMounted,
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
