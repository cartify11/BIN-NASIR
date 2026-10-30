'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AboutClient() {
  const { lang, t, isUrdu } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{isUrdu ? 'بن ناصر کی کہانی' : 'The Bin Nasir Story'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 leading-tight">
          {isUrdu
            ? 'خالص اجزاء، صدیوں کی روایات اور پاکستانی ثقافت کا فخر'
            : 'Pure Natural Ingredients, Generations of Tradition & Heritage'}
        </h1>
        <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
          {isUrdu
            ? 'بن ناصر کا آغاز ایک سادہ مگر مضبوط ارادے سے ہوا: پاکستانی خاندانوں کو ملاوٹ سے پاک، قدرت کے خالص ترین تحائف ان کے اصل روایتی ذائقے کے ساتھ پہنچانا۔'
            : 'Bin Nasir was founded with an unshakeable mission: to bring unadulterated, pure Pakistani traditional delicacies and health-giving natural foods directly from source to table.'}
        </p>
      </div>

      {/* Visual & Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-200">
          <Image
            src="/images/bag-catalog.jpg"
            alt="Bin Nasir Traditional Packaging and Products"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {isUrdu ? 'چکوال سے آپ کے گھر تک کا سفر' : 'The Journey from Chakwal to Your Doorstep'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isUrdu
              ? 'چکوال کی سرزمین روایتی ریوڑی اور مٹھائیوں کا مرکز مانی جاتی ہے۔ ہماری ریوڑی دیسی گڑ، بھنی ہوئی مونگ پھلی اور سفید تلوں سے تیار کی جاتی ہے۔ ہم فیکٹریوں کی کیمیکل پروسیسنگ کے بجائے روایتی کاریگروں کی مہارت پر بھروسہ کرتے ہیں۔'
              : 'The region of Chakwal in Punjab is legendary for authentic crunchy Rewri. Prepared over traditional open wood-fired bhattis with pure organic sugarcane jaggery (gur) and handpicked roasted peanuts, every bite honors centuries of confectionery craftsmanship.'}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                  {isUrdu ? '100% اصلی اور قدرتی جنگلی شہد' : '100% Raw Wild Sidr Honey'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isUrdu
                    ? 'کرک اور پوٹھوہار کے جنگلی بیری کے درختوں سے بغیر کسی چینی کی ملاوٹ کے حاصل کردہ۔'
                    : 'Harvested from wild Ziziphus flora with zero heat processing, preserving natural digestive enzymes.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                  {isUrdu ? 'مصفی ہمالیائی سلاجیت ریزن' : 'Purified Himalayan Shilajit Resin'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isUrdu
                    ? 'پہاڑوں کی بلندیوں سے حاصل کردہ، 84 سے زائد منرلز سے بھرپور خالص گولڈ گریڈ سلاجیت۔'
                    : 'Ethically sourced from high-altitude peaks, purified naturally without chemical solvents.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                  {isUrdu ? 'شاہی دیسی گھی پنجیری' : 'Royal Grass-fed Desi Ghee Panjeeri'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isUrdu
                    ? 'خالص دیسی گھی، گوند کتیرا، چار مغز اور اعلیٰ مغزیات کے ساتھ خواتین اور بزرگوں کے لیے طاقت کا نسخہ۔'
                    : 'Roasted in pure grass-fed butter with almonds, pistachios, gond katira and kamarkas for peak vitality.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-600/20 transition active:scale-95"
            >
              <span>{isUrdu ? 'ہماری مصنوعات آزمائیں' : 'Explore Our Products'}</span>
              {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
