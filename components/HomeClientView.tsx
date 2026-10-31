'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  Truck,
  PhoneCall,
  Sparkles,
  ChevronDown,
  Gift,
  HelpCircle,
  Eye,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { Category, Product, BundleOffer, Review } from '@/types';
import { INITIAL_BUNDLES, INITIAL_REVIEWS, GENERAL_FAQS } from '@/lib/mock-data';
import { DEFAULT_STORE_SETTINGS, StoreSettings } from '@/lib/store-settings';

interface HomeClientViewProps {
  categories: Category[];
  products: Product[];
  settings?: StoreSettings;
}

export default function HomeClientView({
  categories,
  products,
  settings = DEFAULT_STORE_SETTINGS,
}: HomeClientViewProps) {
  const { lang, t, isUrdu } = useLanguage();
  const { addItem } = useCart();
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(settings);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeReviewIdx, setActiveReviewIdx] = useState<number>(0);

  // Fetch settings dynamically to ensure non-hardcoded stats
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setStoreSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  // Filter bestsellers
  const bestSellers = products.filter((p) => p.is_bestseller).slice(0, 4);
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : products.slice(0, 4);

  // Auto-advance customer reviews slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % INITIAL_REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAddBundleToCart = (bundle: BundleOffer) => {
    // Add the products in the bundle
    bundle.product_ids.forEach((pid) => {
      const prod = products.find((p) => p.id === pid);
      if (prod) {
        addItem(prod, 1);
      }
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          2. LIFESTYLE HERO SECTION (Dark brown / gold luxury theme, clean banner)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-[#1e140d] to-stone-950 text-white py-14 sm:py-24 lg:py-28">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              {/* Premium Heritage Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.25] text-stone-100">
                {t.heroTitle1}{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-stone-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition active:scale-95"
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
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>{t.heroWhatsappBtn}</span>
                </a>
              </div>

              {/* Dynamic Customer Rating from Admin Settings (No Fake Hardcoded Stats!) */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-amber-200/90">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium text-stone-300">
                  {t.heroRatingText
                    .replace('{rating}', storeSettings.stats_rating.toString())
                    .replace('{reviews}', storeSettings.stats_reviews_count.toLocaleString())}
                </span>
              </div>
            </div>

            {/* Right Lifestyle Visual Banner (Clean, elegant traditional photography) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-950/60 aspect-[4/3] sm:aspect-square group bg-stone-900">
                <Image
                  src="/images/banner.jpg"
                  alt="Bin Nasir Traditional Delights, Sidr Honey and Peanut Rewri"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Floating Open Parcel Tag */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-stone-100">{t.heroOpenParcelBadge}</p>
                      <p className="text-[11px] text-amber-300/80">{t.heroCodBadge}</p>
                    </div>
                  </div>
                  <Link
                    href="/shop"
                    className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition"
                  >
                    {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TRUST BADGES SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-lg shadow-stone-200/40 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-800 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t.trustDesiGheeTitle}</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{t.trustDesiGheeDesc}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-lg shadow-stone-200/40 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t.trustOpenBoxTitle}</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{t.trustOpenBoxDesc}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-lg shadow-stone-200/40 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-800 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t.trustFreeDeliveryTitle}</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{t.trustFreeDeliveryDesc}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-lg shadow-stone-200/40 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-800 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{t.trustCodTitle}</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{t.trustCodDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CATEGORIES SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.categoriesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.categoriesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. BEST SELLERS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{isUrdu ? 'مقبول ترین' : 'Customer Favorites'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
              {t.bestSellersHeading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {t.bestSellersSubtitle}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition group shrink-0"
          >
            <span>{t.allProducts}</span>
            {isUrdu ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US
          ========================================================================= */}
      <section className="bg-stone-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {isUrdu ? 'ہماری انفرادیت' : 'Pure Tradition'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-100">
              {t.whyChooseHeading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {t.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-stone-100">{t.whyItem1Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{t.whyItem1Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-stone-100">{t.whyItem2Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{t.whyItem2Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-stone-100">{t.whyItem3Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{t.whyItem3Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
                4
              </div>
              <h3 className="font-bold text-base text-stone-100">{t.whyItem4Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{t.whyItem4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. HOW IT WORKS (Order > Confirmation Call > Delivery > Open Parcel)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            {isUrdu ? 'آسان اور شفاف مرحلہ' : '100% Risk Free'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.howItWorksHeading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              1
            </div>
            <h4 className="font-bold text-base text-stone-900">{t.howStep1Title}</h4>
            <p className="text-xs text-stone-600 leading-relaxed">{t.howStep1Desc}</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              2
            </div>
            <h4 className="font-bold text-base text-stone-900">{t.howStep2Title}</h4>
            <p className="text-xs text-stone-600 leading-relaxed">{t.howStep2Desc}</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              3
            </div>
            <h4 className="font-bold text-base text-stone-900">{t.howStep3Title}</h4>
            <p className="text-xs text-stone-600 leading-relaxed">{t.howStep3Desc}</p>
          </div>

          {/* Step 4: Open Parcel */}
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-600/30 space-y-3 relative shadow-md">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              4
            </div>
            <h4 className="font-bold text-base text-emerald-950">{t.howStep4Title}</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">{t.howStep4Desc}</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CUSTOMER REVIEWS SLIDER
          ========================================================================= */}
      <section className="bg-stone-100 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {isUrdu ? 'صارفین کے تاثرات' : 'Verified Testimonials'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
              {t.reviewsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INITIAL_REVIEWS.map((review, idx) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-stone-400">
                      {isUrdu ? (review.date_ur || review.date) : (review.date_en || review.date)}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                    &quot;{isUrdu ? review.comment_ur : review.comment_en}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900">
                      {isUrdu ? (review.name_ur || review.name) : review.name}
                    </h5>
                    <p className="text-xs text-stone-500">
                      {isUrdu ? (review.city_ur || review.city) : review.city}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.verifiedBuyer}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. BUNDLE OFFERS (Value Packs)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Gift className="w-3.5 h-3.5 text-amber-700" />
            <span>{isUrdu ? 'بچت پیک' : 'Family Savings'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.bundlesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.bundlesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_BUNDLES.map((bundle) => {
            const title = isUrdu ? bundle.title_ur : bundle.title_en;
            const desc = isUrdu ? bundle.description_ur : bundle.description_en;
            const badge = isUrdu ? bundle.badge_ur : bundle.badge_en;
            const itemsList = isUrdu ? bundle.items_ur : bundle.items_en;

            return (
              <div
                key={bundle.id}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-900/15 shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-600 text-white font-black text-xs">
                      {badge}
                    </span>
                    <div className="text-end">
                      <span className="text-2xl font-black text-amber-950">
                        Rs. {bundle.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400 line-through block">
                        Rs. {bundle.original_price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif font-black text-xl text-stone-900">{title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{desc}</p>

                  <div className="pt-2 space-y-1.5">
                    <p className="text-xs font-bold text-stone-800">{t.bundleIncludes}</p>
                    <ul className="space-y-1">
                      {itemsList.map((item, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleAddBundleToCart(bundle)}
                  className="w-full py-3.5 rounded-2xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/20 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>{t.addBundleBtn}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          10. FAQ ACCORDION
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'اکثر پوچھے گئے سوالات' : 'Help & Queries'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            {t.faqHeading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {GENERAL_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            const question = isUrdu ? faq.q_ur : faq.q_en;
            const answer = isUrdu ? faq.a_ur : faq.a_en;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-start gap-4 hover:bg-amber-50/40 transition"
                >
                  <span className="font-bold text-xs sm:text-sm text-stone-900">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    <p className="mt-2">{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition"
          >
            <span>{t.viewAllFaqBtn}</span>
            {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </section>

      {/* =========================================================================
          11. FINAL HIGH-CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 text-white p-8 sm:p-14 text-center border border-amber-500/30 shadow-2xl space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              {t.finalCtaBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-100 leading-snug">
              {t.finalCtaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t.finalCtaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition active:scale-95"
            >
              {t.finalCtaShopBtn}
            </Link>
            <a
              href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-sm transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{t.finalCtaWhatsappBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
