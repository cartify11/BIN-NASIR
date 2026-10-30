'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, MessageSquare, ArrowRight, ArrowLeft, PackageCheck, Truck } from 'lucide-react';
import { formatPKR } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number') || 'BN-1001';
  const customerName = searchParams.get('customer_name') || 'Customer';
  const phone = searchParams.get('phone') || '';
  const total = searchParams.get('total') ? Number(searchParams.get('total')) : 0;
  const city = searchParams.get('city') || 'Pakistan';
  const { t, isUrdu } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum Bin Nasir, my order number is ${orderNumber}. Please confirm my order.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-green-700 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-200">
            {t.orderSuccessBadge}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-gray-900">
            {t.orderSuccessTitle}
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            {isUrdu ? (
              <>
                محترم <strong>{customerName}</strong>، آپ کا آرڈر کامیابی کے ساتھ سسٹم میں رجسٹر ہو چکا ہے۔
              </>
            ) : (
              <>
                Dear <strong>{customerName}</strong>, your order has been successfully placed in our system.
              </>
            )}
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-md mx-auto">
          <p className="text-xs text-amber-800 font-semibold">{t.yourOrderNumber}</p>
          <p className="text-2xl font-black text-amber-900 tracking-wider font-mono mt-1">
            {orderNumber}
          </p>
          {total > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              {isUrdu ? 'کل قابلِ ادائیگی رقم:' : 'Total Payable (COD):'}{' '}
              <strong className="font-mono text-gray-900">{formatPKR(total)}</strong>
            </p>
          )}
        </div>

        {/* What Happens Next Timeline */}
        <div className="pt-6 border-t border-gray-100 text-start space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">
            {isUrdu ? 'اب کیا ہو گا؟ (What happens next):' : 'What happens next:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 w-fit">
                <PhoneCall className="w-4 h-4" />
              </div>
              <p className="font-bold text-gray-900">{t.step1Title}</p>
              <p className="text-gray-500">{t.step1Desc}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 w-fit">
                <PackageCheck className="w-4 h-4" />
              </div>
              <p className="font-bold text-gray-900">{t.step2Title}</p>
              <p className="text-gray-500">{t.step2Desc}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 w-fit">
                <Truck className="w-4 h-4" />
              </div>
              <p className="font-bold text-gray-900">{t.step3Title}</p>
              <p className="text-gray-500">{t.step3Desc}</p>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Confirmation Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/923001788080?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.whatsappConfirmBtn}</span>
          </a>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm flex items-center justify-center gap-2 transition"
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
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
