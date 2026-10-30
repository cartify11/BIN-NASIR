'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  X,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
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
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    orderTotal,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingPercent,
    isMounted,
    getItemKey,
  } = useCart();
  const { lang, t, isUrdu } = useLanguage();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-stone-500 text-sm mt-4">
          {isUrdu ? 'کارٹ لوڈ ہو رہا ہے...' : 'Loading cart...'}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-100 text-amber-900 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.cartEmptyTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            {t.cartEmptyDesc}
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-amber-600/20 transition active:scale-95"
          >
            <span>{t.startShopping}</span>
            {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) {
      setInputCoupon('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.cartTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.cartSubtitle}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-bold transition"
        >
          {t.clearCart}
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            {freeShippingRemaining > 0 ? (
              <span>
                {t.freeShippingProgress.replace('{amount}', formatPKR(freeShippingRemaining))}
              </span>
            ) : (
              <span className="text-emerald-800 font-extrabold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.freeShippingAchieved}</span>
              </span>
            )}
          </div>
          <span className="text-[11px] text-amber-800 font-mono">
            {freeShippingPercent}%
          </span>
        </div>

        <div className="w-full bg-amber-200/70 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-600 to-emerald-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const itemKey = getItemKey(item);
            const title = getProductTitle(item.product, lang);
            const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
            const variantLabel = item.selectedVariant
              ? isUrdu
                ? item.selectedVariant.label_ur
                : item.selectedVariant.label_en
              : null;
            const image = item.product.images?.[0] || '/images/peanut-rewri.jpg';

            return (
              <div
                key={itemKey}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image src={image} alt={title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif font-bold text-sm sm:text-base text-stone-900 hover:text-amber-800 transition line-clamp-1"
                    >
                      {title}
                    </Link>
                    {variantLabel && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-semibold">
                        {variantLabel}
                      </span>
                    )}
                    <p className="text-xs sm:text-sm font-black text-amber-900">
                      {formatPKR(price)}
                    </p>
                  </div>
                </div>

                {/* Controls: Quantity Stepper & Subtotal & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center rounded-xl border border-stone-300 bg-stone-50 p-1">
                    <button
                      onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center font-bold text-xs text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div className="text-end min-w-[80px]">
                    <span className="text-sm sm:text-base font-black text-stone-900">
                      {formatPKR(price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(itemKey)}
                    className="p-2 text-stone-400 hover:text-red-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Continue Shopping Button */}
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-950 transition"
            >
              {isUrdu ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.continueShopping}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-5">
          {/* Coupon Box */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <Tag className="w-4 h-4 text-amber-700" />
              <span>{t.couponTitle}</span>
            </div>

            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs">
                <div>
                  <span className="font-bold text-emerald-900">{couponCode}</span>
                  <span className="text-emerald-700 block text-[11px]">
                    {discountAmount > 0 ? `-${formatPKR(discountAmount)}` : 'Applied'}
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 rounded-full text-emerald-700 hover:bg-emerald-200/50"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder={t.couponPlaceholder}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-amber-600 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition"
                >
                  {t.applyCouponBtn}
                </button>
              </form>
            )}

            {couponMsg && (
              <p
                className={`text-[11px] font-medium ${
                  couponMsg.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {couponMsg.text}
              </p>
            )}
          </div>

          {/* Summary Card */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-black text-base text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'آرڈر کا خلاصہ' : 'Order Summary'}
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-bold text-stone-900">{formatPKR(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>{t.couponDiscount}</span>
                  <span>-{formatPKR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.shippingFee}</span>
                <span className="font-bold text-stone-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 uppercase font-black">{t.free}</span>
                  ) : (
                    formatPKR(shippingFee)
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
              <span className="font-bold text-sm text-stone-900">{t.totalPayable}</span>
              <span className="font-black text-xl text-amber-950 font-sans">
                {formatPKR(orderTotal)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-600/25 transition active:scale-95 text-center"
            >
              <span>{t.proceedToCheckout}</span>
              {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            {/* Trust Assurance */}
            <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUrdu ? 'پارسل کھول کر تسلی کے بعد ادائیگی کریں' : 'Inspect parcel before payment'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
