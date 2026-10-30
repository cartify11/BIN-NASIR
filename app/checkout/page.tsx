'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Banknote,
  AlertCircle,
  Phone,
  MapPin,
  CheckCircle2,
  Upload,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { formatPKR, PAKISTAN_MAJOR_CITIES } from '@/lib/utils';
import { normalizePakistaniPhone, PAKISTANI_PHONE_REGEX } from '@/lib/validation';
import { getProductTitle } from '@/lib/mock-data';
import { DEFAULT_STORE_SETTINGS, StoreSettings } from '@/lib/store-settings';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, discountAmount, couponCode, clearCart, isMounted } = useCart();
  const { lang, t, isUrdu } = useLanguage();

  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Selection: 'cod' | 'advance'
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'advance'>('cod');
  const [paymentProofBase64, setPaymentProofBase64] = useState<string | null>(null);
  const [paymentProofName, setPaymentProofName] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch settings dynamically
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  if (!isMounted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-stone-600 font-medium">{t.cartEmptyTitle}</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md transition"
        >
          {t.startShopping}
        </Link>
      </div>
    );
  }

  const selectedCity = city === 'Other City' ? customCity : city;

  // Calculate Advance Payment Discount
  const advanceDiscount =
    paymentMethod === 'advance'
      ? Math.round((subtotal * settings.advance_discount_percent) / 100)
      : 0;

  const totalDiscount = (discountAmount || 0) + advanceDiscount;
  const discountedSubtotal = Math.max(0, subtotal - totalDiscount);
  const effectiveShippingFee =
    discountedSubtotal >= settings.free_shipping_threshold ? 0 : settings.standard_shipping_fee;
  const finalOrderTotal = discountedSubtotal + effectiveShippingFee;

  // Handle Screenshot Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg(isUrdu ? 'صرف تصویر فائل اپلوڈ کریں' : 'Please upload an image file (PNG/JPG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg(isUrdu ? 'تصویر کا سائز 5MB سے کم ہونا چاہیے' : 'File size must be under 5MB');
      return;
    }

    setPaymentProofName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentProofBase64(reader.result as string);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-validation
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg(isUrdu ? 'براہ کرم اپنا پورا نام درج کریں' : 'Please enter your full name');
      return;
    }

    if (!PAKISTANI_PHONE_REGEX.test(phone.trim())) {
      setErrorMsg(
        isUrdu
          ? 'براہ کرم درست پاکستانی موبائل نمبر درج کریں (مثال: 0300-1788080)'
          : 'Please enter a valid Pakistani mobile number (e.g. 0300-1788080)'
      );
      return;
    }

    if (!selectedCity.trim()) {
      setErrorMsg(isUrdu ? 'براہ کرم اپنا شہر درج کریں' : 'Please enter your city');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMsg(
        isUrdu
          ? 'براہ کرم مکمل پتہ (گھر نمبر / گلی / علاقہ) درج کریں'
          : 'Please enter a complete delivery address (House/Street/Area)'
      );
      return;
    }

    if (paymentMethod === 'advance' && !paymentProofBase64) {
      setErrorMsg(
        isUrdu
          ? 'براہ کرم ایڈوانس ادائیگی کا اسکرین شاٹ اپلوڈ کریں تاکہ آرڈر کی تصدیق ہو سکے'
          : 'Please upload the payment screenshot/receipt for advance payment verification'
      );
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: customerName.trim(),
        phone: normalizePakistaniPhone(phone.trim()),
        city: selectedCity.trim(),
        address: address.trim(),
        notes: notes.trim() || undefined,
        payment_method: paymentMethod,
        payment_proof_url: paymentProofBase64 || undefined,
        coupon_code: couponCode || undefined,
        discount_amount: totalDiscount,
        items: items.map((i) => ({
          product_id: i.product.id,
          name: i.product.name,
          variant_label: i.selectedVariant ? i.selectedVariant.weight : undefined,
          price: i.selectedVariant ? i.selectedVariant.price : i.product.price,
          quantity: i.quantity,
          image: i.product.images?.[0] || undefined,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to place order. Please check inputs.');
      }

      // Order created successfully! Clear cart & redirect
      clearCart();
      router.push(
        `/order-success?order_number=${data.order_number}&phone=${encodeURIComponent(
          payload.phone
        )}&method=${paymentMethod}`
      );
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again or WhatsApp us.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
          {t.checkoutTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          {t.checkoutSubtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMsg}</div>
        </div>
      )}

      {/* Main Single Page Checkout Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Address & Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact & Delivery Info */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <h2 className="font-serif font-black text-base sm:text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-700" />
              <span>{t.customerInfoTitle}</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Full Name */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">
                  {t.fullNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50"
                />
              </div>

              {/* Pakistani Phone Number */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50 font-mono"
                />
                <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-600" />
                  <span>{t.phoneHelper}</span>
                </p>
              </div>

              {/* City Selector */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">
                  {t.cityLabel}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50 font-medium"
                >
                  {PAKISTAN_MAJOR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {city === 'Other City' && (
                  <input
                    type="text"
                    required
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder={t.otherCityPlaceholder}
                    className="w-full mt-2 px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50"
                  />
                )}
              </div>

              {/* Full Delivery Address */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">
                  {t.addressLabel}
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50 resize-none"
                />
              </div>

              {/* Special Delivery Instructions / Notes */}
              <div>
                <label className="font-bold text-stone-800 block mb-1.5">
                  {t.notesLabel}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Selectable Payment Method Cards */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <div>
              <h2 className="font-serif font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-700" />
                <span>{t.paymentMethodTitle}</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.paymentMethodSubtitle}
              </p>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'cod'
                    ? 'border-amber-600 bg-amber-50/50 shadow-md ring-1 ring-amber-600'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-sm text-stone-900">{t.codTitle}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{t.codDesc}</p>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'اوپن پارسل معائنہ دستیاب' : 'Open Parcel Check Allowed'}</span>
                </span>
              </div>

              {/* Card 2: Advance Payment (JazzCash / Easypaisa / Bank) */}
              <div
                onClick={() => setPaymentMethod('advance')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 relative ${
                  paymentMethod === 'advance'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-1 ring-emerald-600'
                    : 'border-stone-200 hover:border-emerald-300 bg-white'
                }`}
              >
                {/* 5% Discount Ribbon */}
                <div className="absolute -top-3 end-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] shadow-sm uppercase tracking-wider">
                    {settings.advance_discount_percent}% OFF
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-sm text-stone-900">{t.advanceTitle}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'advance'}
                    onChange={() => setPaymentMethod('advance')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{t.advanceDesc}</p>
                <span className="text-[11px] font-bold text-emerald-800">
                  {t.advanceDiscountPill}
                </span>
              </div>
            </div>

            {/* Advance Payment Details & Screenshot Upload (conditionally shown if advance is selected) */}
            {paymentMethod === 'advance' && (
              <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-5 animate-fadeIn">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="font-serif font-black text-sm text-amber-300">
                    {t.advanceAccountsTitle}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {isUrdu
                      ? `اپنے آرڈر کی رقم (${formatPKR(finalOrderTotal)}) درج ذیل کسی بھی اکاؤنٹ میں بھیجیں:`
                      : `Transfer ${formatPKR(finalOrderTotal)} to any of the following official accounts:`}
                  </p>
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* JazzCash */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-amber-400 font-bold">JazzCash</p>
                    <p className="font-mono text-sm font-black text-white">{settings.jazzcash_number}</p>
                    <p className="text-[11px] text-stone-400">Title: {settings.jazzcash_title}</p>
                  </div>

                  {/* Easypaisa */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-emerald-400 font-bold">Easypaisa</p>
                    <p className="font-mono text-sm font-black text-white">{settings.easypaisa_number}</p>
                    <p className="text-[11px] text-stone-400">Title: {settings.easypaisa_title}</p>
                  </div>

                  {/* Bank Transfer */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 sm:col-span-2">
                    <p className="text-amber-400 font-bold">{settings.bank_name}</p>
                    <p className="font-mono text-sm font-black text-white">A/C: {settings.bank_account_number}</p>
                    <p className="text-[11px] text-stone-300">Title: {settings.bank_title}</p>
                    <p className="text-[10px] text-stone-400 font-mono">IBAN: {settings.bank_iban}</p>
                  </div>
                </div>

                {/* Screenshot Upload Field */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <label className="text-xs font-bold text-stone-200 block">
                    {t.paymentProofLabel}
                  </label>
                  <p className="text-[11px] text-stone-400">
                    {t.paymentProofHelper}
                  </p>

                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs inline-flex items-center gap-2 transition active:scale-95">
                      <Upload className="w-4 h-4" />
                      <span>{t.uploadScreenshotBtn}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {paymentProofName && (
                      <span className="text-xs text-emerald-400 font-bold truncate max-w-xs">
                        ✓ {paymentProofName}
                      </span>
                    )}
                  </div>

                  {paymentProofBase64 && (
                    <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-white/20">
                      <Image
                        src={paymentProofBase64}
                        alt="Payment Receipt Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar & Place Order */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-serif font-black text-base sm:text-lg text-stone-900 border-b border-stone-100 pb-3">
              {t.orderSummaryTitle} ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            {/* Items mini list */}
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1 space-y-2">
              {items.map((item) => {
                const title = getProductTitle(item.product, lang);
                const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
                const variantLabel = item.selectedVariant ? item.selectedVariant.weight : null;

                return (
                  <div key={item.product.id + (variantLabel || '')} className="pt-2 flex items-center justify-between text-xs">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-bold text-stone-900 truncate">{title}</p>
                      <p className="text-stone-400 text-[11px]">
                        {variantLabel ? `${variantLabel} • ` : ''}Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-black text-stone-900 shrink-0">
                      {formatPKR(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-3 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
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

              {advanceDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>{t.advanceDiscountLabel}</span>
                  <span>-{formatPKR(advanceDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.shippingFee}</span>
                <span className="font-bold text-stone-900">
                  {effectiveShippingFee === 0 ? (
                    <span className="text-emerald-700 font-black uppercase">{t.free}</span>
                  ) : (
                    formatPKR(effectiveShippingFee)
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
              <span className="font-bold text-sm text-stone-900">{t.totalPayable}</span>
              <span className="font-black text-2xl text-amber-950 font-sans">
                {formatPKR(finalOrderTotal)}
              </span>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-600/25 transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.submittingOrder}</span>
                </>
              ) : (
                <>
                  <span>{t.confirmOrderBtn}</span>
                  {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isUrdu ? 'اوپن پارسل: تسلی کے بعد کیش ادا کریں' : 'Open Parcel Inspection Allowed'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isUrdu ? '2 سے 4 دن میں پاکستان بھر میں ترسیل' : 'Express dispatch across 150+ cities'}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
