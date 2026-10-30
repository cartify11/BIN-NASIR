'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, PhoneCall, ShieldCheck, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { GENERAL_FAQS } from '@/lib/mock-data';

export default function FaqClient() {
  const { lang, t, isUrdu } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>{isUrdu ? 'اکثر پوچھے گئے سوالات' : 'Frequently Asked Questions'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {isUrdu ? 'بن ناصر کسٹمر گائیڈ اور سوالات' : 'Bin Nasir Customer Help & FAQs'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          {isUrdu
            ? 'ڈلیوری، اوپن پارسل پالیسی، کوالٹی کی ضمانت اور مصنوعات کے بارے میں تمام ضروری معلومات۔'
            : 'Everything you need to know about delivery, open parcel inspection, product freshness, and guarantees.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {GENERAL_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const question = isUrdu ? faq.q_ur : faq.q_en;
          const answer = isUrdu ? faq.a_ur : faq.a_en;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-start gap-4 hover:bg-amber-50/50 transition"
              >
                <span className="font-bold text-sm sm:text-base text-stone-900">
                  {question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-700 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  <p className="mt-3">{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-8 rounded-3xl bg-stone-900 text-white text-center space-y-4 shadow-xl">
        <h3 className="font-serif font-black text-xl text-stone-100">
          {isUrdu ? 'کیا آپ کا سوال یہاں موجود نہیں ہے؟' : 'Still have a question or need personalized advice?'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
          {isUrdu
            ? 'ہماری سپورٹ ٹیم واٹس ایپ پر 24 گھنٹے آپ کی رہنمائی کے لیے تیار ہے۔'
            : 'Our customer support team is available on WhatsApp to assist you immediately.'}
        </p>
        <div className="pt-2 flex justify-center">
          <a
            href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir%2C%20mujhe%20ek%20sawal%20poochna%20hai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isUrdu ? 'واٹس ایپ پر رابطہ کریں: 0300-1788080' : 'Chat on WhatsApp: 0300-1788080'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
