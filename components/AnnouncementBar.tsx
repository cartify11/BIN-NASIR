'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

export default function AnnouncementBar() {
  const { isUrdu } = useLanguage();

  const itemsUrdu = [
    'پورے پاکستان میں 3,000 روپے سے زائد کے آرڈر پر مفت ڈلیوری',
    'اوپن پارسل گارنٹی - پہلے پارسل کھولیں پھر کیش دیں',
    '100% خالص دیسی گھی، سدر بیری شہد، سلاجیت اور چکوال ریوڑی',
    'جاز کیش / ایزی پیسہ / بینک ایڈوانس ادائیگی پر 5% فوری رعایت',
    'بغیر کسی کیمیکل یا ملاوٹ کے خالص روایتی اور قدرتی تیاری',
  ];

  const itemsEn = [
    'Free Express Delivery across Pakistan on orders above Rs. 3,000!',
    'Open Parcel Guarantee - Inspect parcel before paying cash',
    '100% Pure Chakwal Rewri, Sidr Honey, Shilajit & Desi Ghee',
    'Extra 5% OFF on Advance Payment via JazzCash / Easypaisa / Bank',
    'Fresh batch dispatched daily - 100% Pure Traditional Delights',
  ];

  const items = isUrdu ? itemsUrdu : itemsEn;

  // Duplicate items twice to form a seamless infinite loop with translateX(-50%)
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200 border-b border-amber-800/30 py-2 select-none"
      title={isUrdu ? 'رکنے کے لیے ماؤس اوپر لائیں' : 'Hover to pause'}
    >
      <div className="flex w-max animate-marquee" dir="ltr">
        {duplicatedItems.map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center mx-6 sm:mx-8 text-[11px] sm:text-xs font-medium tracking-wide"
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            <span className="whitespace-nowrap text-amber-100/95">{text}</span>
            <span className="inline-block mx-6 text-amber-500/40 text-xs select-none">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
