'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function TermsClient() {
  const { isUrdu } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <FileText className="w-3.5 h-3.5 text-amber-700" />
          <span>{isUrdu ? 'قواعد و ضوابط' : 'Terms of Service'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          {isUrdu
            ? 'بن ناصر پر خریداری اور آرڈر کے قواعد و ضوابط۔'
            : 'Terms governing the purchase and delivery of Bin Nasir authentic traditional foods.'}
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '1. آرڈر کی تصدیق اور روانگی' : '1. Order Acceptance & Dispatch'}
          </h3>
          <p>
            {isUrdu
              ? 'آن لائن آرڈر درج کرنے کے بعد ہماری ٹیم یا آٹومیٹک سسٹم فون یا واٹس ایپ کے ذریعے تصدیق کرتا ہے۔ تصدیق کے بغیر پارسل روانہ نہیں کیا جاتا تاکہ جعلی آرڈرز کی روک تھام ہو سکے۔'
              : 'All placed orders are verified via an automated call or WhatsApp confirmation message before dispatch to ensure genuine delivery addresses.'}
          </p>
        </div>

        <div className="space-y-2 border-t border-stone-100 pt-5">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '2. قیمتیں اور ادائیگی کے طریقے' : '2. Pricing & Payment'}
          </h3>
          <p>
            {isUrdu
              ? 'ویب سائٹ پر دی گئی تمام قیمتیں پاکستانی روپے (PKR) میں ہیں۔ کیش آن ڈلیوری کی صورت میں ادائیگی پارسل وصول کرتے وقت کی جاتی ہے۔ ایڈوانس ادائیگی کی صورت میں 5 فیصد رعایت لاگو ہوتی ہے اور رسید کا اسکرین شاٹ لازمی ہے۔'
              : 'All prices are listed in Pakistani Rupees (PKR). Cash on Delivery payments are made upon arrival of the parcel. Advance payments qualify for an instant 5% discount and require a valid screenshot receipt.'}
          </p>
        </div>

        <div className="space-y-2 border-t border-stone-100 pt-5">
          <h3 className="font-bold text-base text-stone-900">
            {isUrdu ? '3. قدرتی اجزاء اور شیلف لائف' : '3. Product Freshness & Natural Ingredients'}
          </h3>
          <p>
            {isUrdu
              ? 'ہماری تمام اشیاء 100% قدرتی اجزاء سے تیار کی جاتی ہیں۔ مصنوعات کو تازہ اور خستہ رکھنے کے لیے ایئر ٹائٹ جار میں عام درجہ حرارت پر رکھیں۔'
              : 'Our products are crafted with 100% natural ingredients without artificial preservatives. Please store in airtight containers at room temperature away from direct moisture.'}
          </p>
        </div>
      </div>
    </div>
  );
}
