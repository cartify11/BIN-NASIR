'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { lang, t, isUrdu } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleIncrement = () => {
    if (product.stock && quantity >= product.stock) return;
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="space-y-5 pt-1">
      {/* Quantity & Stock Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {t.quantityLabel}
          </span>
          <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1 || isOutOfStock}
              className="p-2 sm:p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 sm:w-12 text-center text-sm font-black text-gray-900 select-none font-mono">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={isOutOfStock || (product.stock > 0 && quantity >= product.stock)}
              className="p-2 sm:p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-green-800 bg-green-100/80 px-3 py-1.5 rounded-full border border-green-300 inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            {isUrdu ? `${product.stock} دستیاب ہیں` : `${product.stock} Units In Stock`}
          </span>
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Buy Now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 border ${
            added
              ? 'bg-green-600 text-white border-green-700 shadow-md scale-[1.01]'
              : isOutOfStock
              ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              : 'bg-amber-50 text-amber-950 hover:bg-amber-100/90 border-amber-300 shadow-sm active:scale-95'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>{t.addedToCart}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <span>{t.addToCart}</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white shadow-xl shadow-amber-700/25 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          <span>{t.buyNowCod}</span>
        </button>
      </div>
    </div>
  );
}
