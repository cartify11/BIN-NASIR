'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, ArrowRight, ArrowLeft, PackageCheck, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number') || 'BN-1001';
  const phone = searchParams.get('phone') || '';
  const method = searchParams.get('method') || 'cod';
  const { t, isUrdu } = useLanguage();

  const isAdvance = method === 'advance';

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum Bin Nasir, my order number is ${orderNumber}. Please confirm my order dispatch.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {t.orderSuccessBadge}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
            {t.orderSuccessTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            {isAdvance ? (
              isUrdu ? (
                <>آپ کی ایڈوانس ادائیگی اور آرڈر کی تفصیلات ہمارے سسٹم میں محفوظ ہو چکی ہیں۔ ہماری ٹیم تصدیق کے بعد فوری پارسل روانہ کرے گی۔</>
              ) : (
                <>Your advance payment proof and order have been received. Our team will verify and dispatch your parcel promptly.</>
              )
            ) : (
              isUrdu ? (
                <>آپ کا کیش آن ڈلیوری آرڈر کامیابی کے ساتھ سسٹم میں رجسٹر ہو چکا ہے۔</>
              ) : (
                <>Your Cash on Delivery order has been registered in our automated system.</>
              )
            )}
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-md mx-auto">
          <p className="text-xs text-amber-800 font-semibold">{t.yourOrderNumber}</p>
          <p className="text-2xl font-black text-amber-950 tracking-wider font-mono mt-1">
            {orderNumber}
          </p>
          {phone && (
            <p className="text-xs text-stone-500 font-mono mt-1">
              Registered Phone: {phone}
            </p>
          )}
        </div>

        {/* Next Steps */}
        <div className="pt-6 border-t border-stone-100 text-start space-y-4">
          <h3 className="font-serif font-black text-stone-900 text-sm">
            {isUrdu ? 'آرڈر کے اگلے مراحل:' : 'What happens next:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
                <PhoneCall className="w-4 h-4" />
              </div>
              <p className="font-bold text-stone-900">{t.step1Title}</p>
              <p className="text-stone-500">{t.step1Desc}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
                <PackageCheck className="w-4 h-4" />
              </div>
              <p className="font-bold text-stone-900">{t.step2Title}</p>
              <p className="text-stone-500">{t.step2Desc}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
                <Truck className="w-4 h-4" />
              </div>
              <p className="font-bold text-stone-900">{t.step3Title}</p>
              <p className="text-stone-500">{t.step3Desc}</p>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Confirmation Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/923001788080?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.whatsappConfirmBtn}</span>
          </a>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
          >
            <span>{t.continueShoppingBtn}</span>
            {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
