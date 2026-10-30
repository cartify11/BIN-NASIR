'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Award,
  Star,
  CheckCircle2,
  Truck,
  PhoneCall,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { useLanguage } from '@/lib/language-context';
import { Category, Product } from '@/types';

interface HomeClientViewProps {
  categories: Category[];
  products: Product[];
}

export default function HomeClientView({ categories, products }: HomeClientViewProps) {
  const { lang, t, isUrdu } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* =========================================================================
          LUXURY HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 text-white py-12 sm:py-20 lg:py-24">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              {/* Premium Heritage Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.18]">
                {t.heroTitle1}{' '}
                <span className="text-amber-400 underline decoration-amber-500/40 decoration-wavy underline-offset-8">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-amber-100/85 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.heroShopBtn}</span>
                </Link>

                <a
                  href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir%2C%20mujhe%20order%20karna%20hai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-green-400" />
                  <span>{t.heroWhatsappBtn}</span>
                </a>
              </div>

              {/* Customer Social Proof Rating */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-amber-200/90">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium text-amber-100/90">{t.heroRatingText}</span>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs text-amber-200/80 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>{t.heroCodBadge}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{t.heroQualityBadge}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{t.openBoxBadge}</span>
                </div>
              </div>
            </div>

            {/* Right Product Showcase Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 group bg-stone-900/60">
                <Image
                  src="/images/banner.jpg"
                  alt="Bin Nasir Heritage Collection"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glassmorphic Overlay Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-5 sm:p-6">
                  <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10 shadow-xl w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        {t.heroCardTag}
                      </span>
                      <span className="text-[10px] font-bold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                        COD Ready
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {t.heroCardTitle}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1">
                      {t.heroCardSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORIES SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900">
              {t.categoriesHeading}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t.categoriesSubtitle}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition"
          >
            <span>{isUrdu ? 'تمام کیٹیگریز دیکھیں' : 'View All Categories'}</span>
            {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURED PRODUCTS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {isUrdu ? 'خالص اور معیاری روایات' : 'Heritage & Quality'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900">
            {t.featuredHeading}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.featuredSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          BRAND STORY & HERITAGE SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 rounded-3xl p-6 sm:p-12 border border-amber-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {t.storyBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                {t.storyTitle}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.storyDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
                  <HeartPulse className="w-5 h-5 text-amber-600 mb-2" />
                  <h4 className="font-bold text-sm text-gray-900">{t.nutritionTitle}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.nutritionDesc}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-600 mb-2" />
                  <h4 className="font-bold text-sm text-gray-900">{t.packagingTitle}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.packagingDesc}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-amber-200">
              <Image
                src="/images/bag-catalog.jpg"
                alt="Bin Nasir Traditional Packaging"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
