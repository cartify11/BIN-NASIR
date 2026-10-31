'use client';

import React from 'react';
import { Sparkles, Truck, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AnnouncementBar() {
  const { isUrdu } = useLanguage();

  const itemsUrdu = [
    { icon: Truck, text: 'پورے پاکستان میں 3,000 روپے سے زائد کے آرڈر پر مفت ڈلیوری' },
    { icon: ShieldCheck, text: 'اوپن پارسل گارنٹی - پہلے پارسل کھولیں پھر کیش دیں' },
    { icon: Sparkles, text: '100% خالص دیسی گھی، سدر بیری شہد، سلاجیت اور چکوال ریوڑی' },
    { icon: Gift, text: 'جاز کیش / ایزی پیسہ / بینک ایڈوانس پر 5% فوری رعایت' },
    { icon: CheckCircle2, text: 'بغیر کسی کیمیکل یا ملاوٹ کے خالص قدرتی تیاری' },
  ];

  const itemsEn = [
    { icon: Truck, text: 'Free Express Delivery across Pakistan on orders above Rs. 3,000!' },
    { icon: ShieldCheck, text: 'Open Parcel Guarantee - Inspect parcel before paying cash' },
    { icon: Sparkles, text: '100% Pure Chakwal Rewri, Sidr Honey, Shilajit & Desi Ghee' },
    { icon: Gift, text: 'Extra 5% OFF on Advance Payment via JazzCash / Easypaisa / Bank' },
    { icon: CheckCircle2, text: 'Zero chemicals, zero artificial additives - Pure Farm Fresh' },
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
        {duplicatedItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 mx-5 sm:mx-8 text-[11px] sm:text-xs font-semibold tracking-wide"
              dir={isUrdu ? 'rtl' : 'ltr'}
            >
              <span className="p-1 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="whitespace-nowrap text-amber-100/95 font-medium">{item.text}</span>
              <span className="text-amber-500/50 text-[10px] sm:text-xs select-none">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
