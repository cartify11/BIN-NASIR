'use client';

import React, { useState } from 'react';
import { Truck, Search, AlertCircle, CheckCircle2, Clock, PackageCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { formatPKR } from '@/lib/utils';
import { Order } from '@/types';

export default function TrackOrderClient() {
  const { lang, t, isUrdu } = useLanguage();
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [order, setOrder] = useState<Order | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setOrder(null);

    if (!orderNumber.trim() || !phone.trim()) {
      setErrorMsg(
        isUrdu
          ? 'براہ کرم آرڈر نمبر اور موبائل نمبر دونوں درج کریں'
          : 'Please provide both Order Number and Phone Number.'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: orderNumber.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Order not found. Please verify details.');
      }

      setOrder(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to find order. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 1;
    }
  };

  const activeStep = order ? getStatusStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-amber-700" />
          <span>{isUrdu ? 'لائیو آرڈر ٹریکنگ' : 'Live Order Tracking'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'اپنے پارسل کی موجودہ صورتحال معلوم کریں' : 'Track Your Bin Nasir Order'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {isUrdu
            ? 'اپنا آرڈر نمبر (مثال: BN-1001) اور آرڈر کے وقت درج کردہ فون نمبر لکھ کر ٹریک کریں۔'
            : 'Enter your Order Number (e.g. BN-1001) and phone number to check dispatch status.'}
        </p>
      </div>

      {/* Tracking Search Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              {isUrdu ? 'آرڈر نمبر *' : 'Order Number *'}
            </label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. BN-1001"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm font-mono uppercase bg-stone-50/50"
            />
          </div>

          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              {isUrdu ? 'موبائل نمبر *' : 'Mobile Phone Number *'}
            </label>
            <input
              type="tel"
              required
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300-1788080"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm font-mono bg-stone-50/50"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{isUrdu ? 'تلاش' : 'Track'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Tracking Result View */}
      {order && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-lg space-y-8 animate-fadeIn">
          {/* Top Order Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider block">
                {isUrdu ? 'آرڈر نمبر' : 'Order ID'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                {order.order_number}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {order.customer_name} • {order.city}
              </p>
            </div>

            <div className="text-start sm:text-end">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
                {order.status}
              </span>
              <p className="text-xs font-bold text-stone-900 mt-1">
                {formatPKR(order.total)} ({order.payment_method?.toUpperCase()})
              </p>
            </div>
          </div>

          {/* 4-Step Milestone Progress Bar */}
          <div className="space-y-4">
            <h3 className="font-serif font-black text-sm text-stone-900">
              {isUrdu ? 'آرڈر کے مراحل' : 'Order Status Journey'}
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
              <div
                className={`p-3 rounded-2xl border transition ${
                  activeStep >= 0
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-400'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white mx-auto mb-1 flex items-center justify-center text-[11px] font-black">
                  1
                </div>
                <span>{isUrdu ? 'آرڈر درج' : 'Placed'}</span>
              </div>

              <div
                className={`p-3 rounded-2xl border transition ${
                  activeStep >= 1
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[11px] font-black ${
                    activeStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                  }`}
                >
                  2
                </div>
                <span>{isUrdu ? 'کنفرمیشن' : 'Confirmed'}</span>
              </div>

              <div
                className={`p-3 rounded-2xl border transition ${
                  activeStep >= 2
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[11px] font-black ${
                    activeStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                  }`}
                >
                  3
                </div>
                <span>{isUrdu ? 'روانہ (کوریئر)' : 'Dispatched'}</span>
              </div>

              <div
                className={`p-3 rounded-2xl border transition ${
                  activeStep >= 3
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 bg-stone-50 text-stone-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[11px] font-black ${
                    activeStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                  }`}
                >
                  4
                </div>
                <span>{isUrdu ? 'پہنچ گیا' : 'Delivered'}</span>
              </div>
            </div>
          </div>

          {/* Courier Details & Open Parcel Reminder */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
            <p className="font-bold text-amber-950">
              {isUrdu ? 'کوریئر پارٹنر:' : 'Courier Service:'}{' '}
              <span className="font-normal">{order.courier_name || 'Leopards / Trax Logistics'}</span>
            </p>
            {order.tracking_number && (
              <p className="font-bold text-amber-950">
                {isUrdu ? 'ٹریکنگ نمبر:' : 'Tracking Number:'}{' '}
                <span className="font-mono">{order.tracking_number}</span>
              </p>
            )}
            <p className="text-stone-600 pt-1">
              {isUrdu
                ? 'یاد دہانی: جب پارسل آپ کے پاس پہنچے، آپ ڈلیوری رائیڈر کے سامنے پارسل کھول کر اشیاء چیک کر سکتے ہیں۔'
                : 'Reminder: Bin Nasir allows you to open and verify the parcel before paying cash.'}
            </p>
          </div>

          {/* WhatsApp Support Action */}
          <div className="pt-2 flex justify-end">
            <a
              href={`https://wa.me/923001788080?text=${encodeURIComponent(
                `Assalam o Alaikum, inquiring about Order ${order.order_number}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isUrdu ? 'اس آرڈر کے بارے میں واٹس ایپ کریں' : 'Inquire on WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
