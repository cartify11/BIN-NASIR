'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function PrivacyClient() {
  const { isUrdu } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span>{isUrdu ? 'ڈیٹا کا تحفظ' : 'Data Protection & Trust'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          {isUrdu
            ? 'بن ناصر پر آپ کے ڈیٹا اور معلومات کے تحفظ کی مکمل ضمانت۔'
            : 'How Bin Nasir protects and handles customer contact information and delivery addresses.'}
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '1. معلومات کا جمع کیا جانا' : '1. Information We Collect'}
          </h3>
          <p>
            {isUrdu
              ? 'آرڈر کی ترسیل کے لیے ہم صارف کا نام، موبائل نمبر، شہر اور گھر کا پتہ درج کرتے ہیں۔ یہ معلومات صرف اور صرف پارسل آپ کے پتے پر پہنچانے اور تصدیقی کال کے لیے استعمال ہوتی ہے۔'
              : 'To deliver your order successfully across Pakistan, we collect your full name, Pakistani mobile number, city, and delivery street address. We never ask for sensitive bank PINs or passwords.'}
          </p>
        </div>

        <div className="space-y-2 border-t border-stone-100 pt-5">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '2. تیسرے فریق (Third Parties) سے شیئرنگ' : '2. Courier & Logistics Sharing'}
          </h3>
          <p>
            {isUrdu
              ? 'آپ کی معلومات صرف ہمارے بااعتماد کوریئر پارٹنرز (جیسے Leopards، Trax یا TCS) کے ساتھ پارسل کی ترسیل کے لیے شیئر کی جاتی ہیں۔ ہم کسی بھی اشتہاری کمپنی یا تیسرے فریق کو ڈیٹا فروخت نہیں کرتے۔'
              : 'Your shipping address and contact number are strictly shared with authorized national courier partners (such as Leopards, Trax, or TCS) solely for package dispatch and delivery confirmation. We do not sell your personal data to marketing third parties.'}
          </p>
        </div>

        <div className="space-y-2 border-t border-stone-100 pt-5">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '3. واٹس ایپ پیغامات اور اطلاعات' : '3. WhatsApp Updates & Communications'}
          </h3>
          <p>
            {isUrdu
              ? 'ہم آپ کے فراہم کردہ نمبر پر صرف آرڈر کی تصدیق، کوریئر ٹریکنگ کوڈ اور ڈلیوری کی اطلاع کے لیے میسج بھیجتے ہیں۔'
              : 'We only use your provided phone number to send order confirmations, courier dispatch tracking links, and delivery milestone notifications.'}
          </p>
        </div>
      </div>
    </div>
  );
}
