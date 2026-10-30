'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function FloatingWhatsApp() {
  const { lang, isUrdu } = useLanguage();

  const msg = isUrdu
    ? 'السلام علیکم بن ناصر، مجھے آرڈر کرنا ہے یا رہنمائی درکار ہے۔'
    : 'Assalam o Alaikum Bin Nasir, I would like to place an order or inquire about your products.';

  const encoded = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/923001788080?text=${encoded}`;

  return (
    <aside
      aria-label="Customer Support"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group"
    >
      {/* Tooltip on hover (desktop only) */}
      <span className="hidden lg:inline-block px-3 py-1.5 rounded-full bg-stone-900/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {isUrdu ? 'واٹس ایپ پر فوری رابطہ کریں' : 'Chat with us on WhatsApp'}
      </span>

      {/* Pulsing button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-xl shadow-green-600/30 hover:scale-110 active:scale-95 transition-transform duration-200"
      >
        {/* Pulsing rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <PhoneCall className="w-6 h-6 relative z-10" />
      </a>
    </aside>
  );
}
