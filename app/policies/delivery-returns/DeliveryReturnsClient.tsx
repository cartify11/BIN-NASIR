'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, PackageCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function DeliveryReturnsClient() {
  const { lang, isUrdu } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-emerald-700" />
          <span>{isUrdu ? 'شفاف اور بااعتماد پالیسی' : 'Clear & Transparent Policies'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'ڈلیوری اور ریٹرن پالیسی' : 'Delivery & Returns Policy'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          {isUrdu
            ? 'بن ناصر کی ملک گیر ڈلیوری، اوپن پارسل گارنٹی اور آسان واپسی کی مکمل تفصیلات۔'
            : 'Everything you need to know about delivery times, open parcel verification, and 7-day returns.'}
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="font-serif font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-600" />
            <span>
              {isUrdu ? '1. اوپن پارسل پالیسی (پہلے تسلی پھر ادائیگی)' : '1. Open Parcel Policy (Inspect Before Paying)'}
            </span>
          </h2>
          <p>
            {isUrdu
              ? 'ہمیں اپنی مصنوعات کی 100% اصلیت اور خستہ پن پر مکمل اعتماد ہے۔ یہی وجہ ہے کہ بن ناصر پاکستان کا وہ واحد برانڈ ہے جو اپنے صارفین کو اوپن پارسل ڈلیوری کی سہولت فراہم کرتا ہے۔ جب ڈلیوری بوائے آپ کے گھر پارسل لائے، آپ رائیڈر کی موجودگی میں باکس کھول کر بوتلیں اور ریوڑی کا پیکٹ تسلی سے دیکھ سکتے ہیں، اور مکمل اطمینان کے بعد کیش ادا کریں۔'
              : 'We have absolute confidence in the purity, crispness, and authenticity of our traditional products. Bin Nasir proudly offers an Open Parcel Policy nationwide. You are fully entitled to open the parcel in front of the courier rider, inspect the contents and packaging, and only hand over cash once you are 100% satisfied.'}
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 border-t border-stone-100 pt-6">
          <h2 className="font-serif font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-700" />
            <span>
              {isUrdu ? '2. ڈلیوری کا دورانیہ اور کوریئر چارجز' : '2. Nationwide Delivery Times & Fees'}
            </span>
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              {isUrdu
                ? 'بڑے شہر (لاہور، اسلام آباد، راولپنڈی، کراچی، فیصل آباد، گوجرانوالہ): 2 سے 3 کام کے دن۔'
                : 'Major Cities (Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad): 2 to 3 business days.'}
            </li>
            <li>
              {isUrdu
                ? 'دیگر اضلاع اور قصبات: 3 سے 4 کام کے دن۔'
                : 'Other Districts and Towns: 3 to 4 business days.'}
            </li>
            <li>
              {isUrdu
                ? 'معیاری ڈلیوری فیس 200 روپے ہے۔ اگر آپ کا آرڈر 3,000 روپے یا اس سے زائد ہے تو ڈلیوری 100% مفت ہے۔'
                : 'Standard delivery fee is PKR 200 nationwide. Orders above PKR 3,000 qualify for 100% FREE express shipping.'}
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 border-t border-stone-100 pt-6">
          <h2 className="font-serif font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            <span>
              {isUrdu ? '3. 7 دن میں رقم واپسی اور ریپلیسمنٹ کی ضمانت' : '3. 7-Day Money-Back & Replacement Guarantee'}
            </span>
          </h2>
          <p>
            {isUrdu
              ? 'اگر سفر کے دوران کوئی جار ٹوٹ جائے یا کوالٹی میں کوئی خرابی پائی جائے، تو آپ 7 دن کے اندر ہمارے واٹس ایپ نمبر (0300-1788080) پر پارسل کی تصویر بھیج سکتے ہیں۔ بغیر کسی جھنجھٹ کے فوری متبادل پروڈکٹ روانہ کی جائے گی یا آپ کی پوری رقم واپس کر دی جائے گی۔'
              : 'In the rare event of transit damage or any quality dissatisfaction, simply message our official WhatsApp (0300-1788080) within 7 days. We will immediately dispatch a fresh replacement or issue a full refund to your bank or JazzCash account.'}
          </p>
        </div>

        {/* Contact Action */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-stone-500">
            {isUrdu ? 'کوئی سوال ہے؟ ہمارے نمائندے سے رابطہ کریں:' : 'Have a question about your order?'}
          </p>
          <a
            href="https://wa.me/923001788080"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp: 0300-1788080</span>
          </a>
        </div>
      </div>
    </div>
  );
}
