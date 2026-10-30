'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  PackageCheck,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Check,
  Star,
  HelpCircle,
  Clock,
  Maximize2,
  X,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { formatPKR } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { getProductTitle, getProductDescription, INITIAL_REVIEWS } from '@/lib/mock-data';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

interface ProductDetailClientViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClientView({
  product,
  relatedProducts,
}: ProductDetailClientViewProps) {
  const { lang, t, isUrdu } = useLanguage();
  const { addItem } = useCart();
  const router = useRouter();

  // Images state
  const images = product.images && product.images.length > 0 ? product.images : ['/images/peanut-rewri.jpg'];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  // Variant state
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    variants.length > 0 ? variants[0] : undefined
  );

  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Active Tab: 'ingredients' | 'usage' | 'delivery' | 'faqs' | 'reviews'
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'delivery' | 'faqs' | 'reviews'>('ingredients');

  const title = getProductTitle(product, lang);
  const description = getProductDescription(product, lang);

  // Active price based on variant
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAt = selectedVariant
    ? selectedVariant.compare_at_price
    : product.compare_at_price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const discountPercent =
    currentCompareAt && currentCompareAt > currentPrice
      ? Math.round(((currentCompareAt - currentPrice) / currentCompareAt) * 100)
      : null;

  // Track scroll position to show sticky Add to Cart on mobile
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    router.push('/checkout');
  };

  const ingredientsText = isUrdu
    ? product.ingredients_ur || '100% خالص اور قدرتی اجزاء سے تیار کردہ۔'
    : product.ingredients_en || 'Prepared with 100% pure and natural traditional ingredients.';

  const usageText = isUrdu
    ? product.usage_ur || 'شام کی چائے کے ساتھ یا روزانہ صبح نہار منہ استعمال کریں۔'
    : product.usage_en || 'Enjoy with evening tea or take daily in the morning.';

  const productFaqs = product.faqs || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 pb-24 md:pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-amber-800 transition">
          {t.home}
        </Link>
        {isUrdu ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <Link href="/shop" className="hover:text-amber-800 transition">
          {t.allProducts}
        </Link>
        {isUrdu ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <span className="text-stone-900 font-bold truncate max-w-xs">{title}</span>
      </nav>

      {/* Main Product Layout (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md group">
            <Image
              src={images[selectedImageIdx] || images[0]}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Quality Badge */}
            <div className="absolute top-4 start-4 z-10 flex flex-col gap-2">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-black bg-stone-950/90 text-amber-300 backdrop-blur-md border border-amber-400/30 shadow-md">
                {isUrdu ? '100% اصل بن ناصر' : '100% Authentic Bin Nasir'}
              </span>
            </div>

            {/* Discount Badge */}
            {discountPercent && (
              <div className="absolute top-4 end-4 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-black bg-red-600 text-white shadow-md">
                  {t.saveAmount} {discountPercent}%
                </span>
              </div>
            )}

            {/* Zoom Button */}
            <button
              onClick={() => setZoomModalOpen(true)}
              className="absolute bottom-4 end-4 p-2.5 rounded-xl bg-white/90 text-stone-800 shadow-md hover:bg-white hover:text-amber-800 transition"
              title="Click to Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                    selectedImageIdx === idx
                      ? 'border-amber-600 shadow-md scale-95'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${title} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Open Parcel Assurance Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-500/30 flex items-center gap-3">
            <PackageCheck className="w-6 h-6 text-emerald-700 shrink-0" />
            <div className="text-xs text-emerald-950">
              <p className="font-bold">
                {isUrdu ? 'اوپن پارسل ڈلیوری کی سہولت' : 'Open Parcel Inspection Allowed'}
              </p>
              <p className="text-emerald-800 mt-0.5">
                {isUrdu
                  ? 'رقم ادا کرنے سے پہلے رائیڈر کے سامنے پارسل کھول کر مکمل تسلی کریں۔'
                  : 'Inspect your parcel before paying cash to the courier rider.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight leading-snug">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-sans">
                {formatPKR(currentPrice)}
              </span>
              {currentCompareAt && currentCompareAt > currentPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPKR(currentCompareAt)}
                </span>
              )}
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {t.inStock}
            </span>
          </div>

          {/* Weight / Pack Size Variants */}
          {variants.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                {t.weightOptions}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const label = isUrdu ? variant.label_ur : variant.label_en;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-500/10 text-amber-950 shadow-sm font-black'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 font-semibold'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="text-xs text-amber-800 font-bold">{formatPKR(variant.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              {t.quantityLabel}
            </label>
            <div className="inline-flex items-center rounded-2xl border border-stone-300 bg-white p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 transition active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-black text-sm text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(currentStock || 99, q + 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 transition active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`py-4 px-6 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.addedToCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-600/25 transition active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{t.buyNowCod}</span>
            </button>
          </div>

          {/* WhatsApp Direct Inquire */}
          <div className="pt-2">
            <a
              href={`https://wa.me/923001788080?text=${encodeURIComponent(
                `Assalam o Alaikum, I want to order ${title} (${selectedVariant ? selectedVariant.weight : ''})`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'واٹس ایپ پر یہ پراڈکٹ آرڈر کریں' : 'Quick Order this item on WhatsApp'}</span>
            </a>
          </div>

          {/* Product Structured Tabs: Ingredients, Usage, Delivery, FAQs, Reviews */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            {/* Tabs Header */}
            <div className="flex border-b border-stone-200 gap-4 overflow-x-auto text-xs font-bold pb-2">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 whitespace-nowrap border-b-2 transition ${
                  activeTab === 'ingredients'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.ingredientsTitle}
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-2 whitespace-nowrap border-b-2 transition ${
                  activeTab === 'usage'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.usageTitle}
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-2 whitespace-nowrap border-b-2 transition ${
                  activeTab === 'delivery'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.deliveryGuaranteesTitle}
              </button>
              {productFaqs.length > 0 && (
                <button
                  onClick={() => setActiveTab('faqs')}
                  className={`pb-2 whitespace-nowrap border-b-2 transition ${
                    activeTab === 'faqs'
                      ? 'border-amber-600 text-amber-900'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {t.faqTabTitle}
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 whitespace-nowrap border-b-2 transition ${
                  activeTab === 'reviews'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.reviewsTabTitle}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-relaxed min-h-[120px]">
              {activeTab === 'ingredients' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900">{t.ingredientsTitle}</h4>
                  <p>{ingredientsText}</p>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900">{t.usageTitle}</h4>
                  <p>{usageText}</p>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900">{t.deliveryGuaranteesTitle}</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>{isUrdu ? 'ملک گیر ڈلیوری: 2 سے 4 دن کے اندر۔' : 'Nationwide Delivery: 2 to 4 business days.'}</li>
                    <li>{isUrdu ? 'اوپن پارسل: پارسل کھول کر تسلی کے بعد کیش ادا کریں۔' : 'Open Parcel: Inspect parcel before paying.'}</li>
                    <li>{isUrdu ? '3000 روپے سے زائد پر مفت ڈلیوری۔' : 'Free delivery on orders above Rs. 3,000.'}</li>
                    <li>{isUrdu ? '7 دن میں رقم واپسی اور ریپلیسمنٹ کی سہولت۔' : '7-Day hassle-free return and money-back guarantee.'}</li>
                  </ul>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-3">
                  {productFaqs.map((faq, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-bold text-stone-900">
                        {isUrdu ? faq.question_ur : faq.question_en}
                      </p>
                      <p className="text-stone-600">
                        {isUrdu ? faq.answer_ur : faq.answer_en}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {INITIAL_REVIEWS.slice(0, 2).map((rev) => (
                    <div key={rev.id} className="pb-3 border-b border-stone-200 last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          {isUrdu ? (rev.name_ur || rev.name) : rev.name} ({isUrdu ? (rev.city_ur || rev.city) : rev.city})
                        </span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        &quot;{isUrdu ? rev.comment_ur : rev.comment_en}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomModalOpen(false)}
        >
          <button
            onClick={() => setZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={images[selectedImageIdx] || images[0]}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
              <Image src={images[0]} alt={title} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">{title}</p>
              <p className="text-xs font-black text-amber-900">{formatPKR(currentPrice)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAddToCart}
              className="px-3 py-2.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs"
            >
              {added ? '✓' : <ShoppingBag className="w-4 h-4" />}
            </button>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-md"
            >
              {t.buyNowCod}
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
              {t.relatedHeading}
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
