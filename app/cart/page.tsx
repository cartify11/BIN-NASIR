'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart, FREE_SHIPPING_THRESHOLD } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { formatPKR } from '@/lib/utils';
import { getProductTitle } from '@/lib/mock-data';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    orderTotal,
    isMounted,
  } = useCart();
  const { lang, t, isUrdu } = useLanguage();

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 text-sm mt-4">
          {isUrdu ? 'کارٹ لوڈ ہو رہا ہے...' : 'Loading cart...'}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-black text-gray-900">{t.cartEmptyTitle}</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {t.cartEmptyDesc}
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md hover:bg-amber-700 transition"
          >
            <span>{t.startShopping}</span>
            {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingDifference = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-amber-200/60 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-900">
            {t.cartTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.cartSubtitle}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold"
        >
          {t.clearCart}
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1.5">
          <Truck className="w-4 h-4 text-amber-700 flex-shrink-0" />
          {freeShippingDifference > 0 ? (
            <span>
              {isUrdu
                ? `مفت ڈلیوری حاصل کرنے کے لیے مزید `
                : `Add another `}
              <strong className="font-mono text-amber-950 font-bold">{formatPKR(freeShippingDifference)}</strong>
              {isUrdu ? ` کی خریداری کریں!` : ` to unlock FREE Delivery!`}
            </span>
          ) : (
            <span className="text-green-800 font-bold">
              {t.freeShippingAchieved}
            </span>
          )}
        </div>
        <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Main Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => {
            const itemTitle = getProductTitle(product, lang);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-amber-50 flex-shrink-0 border border-amber-100">
                    <Image
                      src={product.images?.[0] || '/images/peanut-rewri.jpg'}
                      alt={itemTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-bold text-gray-900 text-sm hover:text-amber-800 transition">
                        {itemTitle}
                      </h3>
                    </Link>
                    <p className="text-xs text-amber-900 font-bold mt-1 font-mono">
                      {formatPKR(product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-5">
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-gray-900 select-none font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-end">
                    <span className="text-sm font-extrabold text-gray-900 block font-mono">
                      {formatPKR(product.price * quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-400 hover:text-red-600 transition p-1"
                    title={isUrdu ? 'آئٹم ہٹائیں' : 'Remove item'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-amber-200/90 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-gray-900 font-serif border-b pb-3">
            {isUrdu ? 'خلاصہ آرڈر (Order Summary)' : 'Order Summary'}
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{t.subtotal}</span>
              <span className="font-semibold text-gray-900 font-mono">{formatPKR(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>{t.shippingFee}</span>
              <span className="font-semibold text-gray-900 font-mono">
                {shippingFee === 0 ? <span className="text-green-600 font-bold">{t.free}</span> : formatPKR(shippingFee)}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="font-bold text-gray-900 text-base">{t.totalPayable}</span>
              <span className="font-black text-2xl text-amber-900 font-mono">{formatPKR(orderTotal)}</span>
            </div>
            <p className="text-[11px] text-gray-500">{t.codNotice}</p>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>{t.proceedToCheckout}</span>
            {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>{isUrdu ? '100% محفوظ کیش آن ڈلیوری' : '100% Secure Cash on Delivery'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
