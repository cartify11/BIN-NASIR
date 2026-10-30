'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, Banknote, AlertCircle, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { formatPKR, PAKISTAN_MAJOR_CITIES } from '@/lib/utils';
import { normalizePakistaniPhone, PAKISTANI_PHONE_REGEX } from '@/lib/validation';
import { getProductTitle } from '@/lib/mock-data';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, orderTotal, clearCart, isMounted } = useCart();
  const { lang, t, isUrdu } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isMounted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-gray-600">{t.cartEmptyTitle}</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold"
        >
          {t.startShopping}
        </Link>
      </div>
    );
  }

  const selectedCity = city === 'Other City' ? customCity : city;

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

    setSubmitting(true);

    try {
      const payload = {
        customer_name: customerName.trim(),
        phone: normalizePakistaniPhone(phone.trim()),
        city: selectedCity.trim(),
        address: address.trim(),
        notes: notes.trim() || undefined,
        payment_method: 'cod',
        items: items.map((i) => ({
          product_id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images?.[0],
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(
          data.message || (isUrdu ? 'آرڈر محفوظ کرنے میں مسئلہ پیش آیا۔' : 'Failed to create order.')
        );
        setSubmitting(false);
        return;
      }

      // Success! Clear cart and redirect
      clearCart();
      router.push(
        `/order-success?order_number=${encodeURIComponent(
          data.order_number
        )}&customer_name=${encodeURIComponent(
          customerName
        )}&phone=${encodeURIComponent(
          phone
        )}&total=${orderTotal}&city=${encodeURIComponent(selectedCity)}`
      );
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg(
        isUrdu
          ? 'سرور کنکشن کا مسئلہ ہے۔ دوبارہ کوشش کریں۔'
          : 'Network error. Please try again.'
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/cart" className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition">
          {isUrdu ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-gray-900">
            {t.checkoutTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            {t.checkoutSubtitle}
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Customer Info Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm space-y-5 sm:space-y-6">
            <h2 className="text-lg font-bold text-gray-900 font-serif border-b pb-3">
              {t.shippingDetailsTitle}
            </h2>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t.fullNameLabel}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t.phoneLabel}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm font-mono"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute end-3.5 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                {t.phoneHelper}
              </p>
            </div>

            {/* City Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t.cityLabel}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm bg-white"
                >
                  {PAKISTAN_MAJOR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {city === 'Other City' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isUrdu ? 'اپنے شہر کا نام لکھیں *' : 'Your City Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder={t.otherCityPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm"
                  />
                </div>
              )}
            </div>

            {/* Complete Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t.addressLabel}
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.addressPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm"
              />
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {t.notesLabel}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base sm:text-sm"
              />
            </div>

            {/* Payment Method Option */}
            <div className="pt-4 border-t space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {t.paymentMethodTitle}
              </label>
              <div className="p-4 rounded-2xl border-2 border-amber-600 bg-amber-50/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white flex-shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{t.codTitle}</h4>
                    <p className="text-xs text-gray-600">{t.codDesc}</p>
                  </div>
                </div>
                <span className="w-4 h-4 rounded-full border-4 border-amber-600 bg-white flex-shrink-0"></span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary & Confirm Button */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-md space-y-6">
            <h2 className="text-lg font-bold text-gray-900 font-serif border-b pb-3">
              {t.orderItemsTitle} ({items.length})
            </h2>

            {/* Mini Items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pe-1">
              {items.map(({ product, quantity }) => {
                const itemTitle = getProductTitle(product, lang);
                return (
                  <div key={product.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-amber-50 flex-shrink-0 border border-gray-200">
                      <Image
                        src={product.images?.[0] || '/images/peanut-rewri.jpg'}
                        alt={itemTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{itemTitle}</p>
                      <p className="text-gray-500">
                        {quantity} × {formatPKR(product.price)}
                      </p>
                    </div>
                    <span className="font-bold font-mono text-gray-900">
                      {formatPKR(product.price * quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-gray-200 space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{t.subtotal}</span>
                <span className="font-semibold font-mono text-gray-900">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t.shippingFee}</span>
                <span className="font-semibold font-mono text-gray-900">
                  {shippingFee === 0 ? <span className="text-green-700 font-bold">{t.free}</span> : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-bold text-base text-gray-900">{t.totalPayable}</span>
                <span className="font-black text-2xl text-amber-900 font-mono">
                  {formatPKR(orderTotal)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-base shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.submittingOrder}</span>
                </>
              ) : (
                <>
                  <Truck className="w-5 h-5" />
                  <span>{t.confirmOrderBtn}</span>
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 text-[11px] text-gray-500 text-center">
              <div className="flex items-center justify-center gap-1.5 text-green-700 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{isUrdu ? '100% تسلی بخش کیش آن ڈلیوری سروس' : '100% Satisfactory Cash on Delivery'}</span>
              </div>
              <p>
                {isUrdu
                  ? 'آرڈر کے بعد ہمارے واٹس ایپ یا کال سسٹم سے تصدیق کی جائے گی۔'
                  : 'Your address will be verified before parcel dispatch.'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
