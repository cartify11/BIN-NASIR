'use client';

import React from 'react';
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
  MessageCircle,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPKR } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { getProductTitle, getProductDescription } from '@/lib/mock-data';
import ProductDetailClient from '@/app/product/[slug]/ProductDetailClient';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClientView({
  product,
  relatedProducts,
}: ProductDetailClientViewProps) {
  const { lang, t, isUrdu } = useLanguage();

  const title = getProductTitle(product, lang);
  const description = getProductDescription(product, lang);

  const discountPercent =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 pb-2">
        <Link href="/" className="hover:text-amber-700 transition">
          {t.home}
        </Link>
        {isUrdu ? (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        )}
        <Link href="/shop" className="hover:text-amber-700 transition">
          {t.allProducts}
        </Link>
        {isUrdu ? (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        )}
        <span className="text-gray-900 font-semibold truncate max-w-sm">{title}</span>
      </nav>

      {/* Main Product Layout (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-amber-200/70 shadow-lg shadow-amber-900/5 group">
            <Image
              src={product.images?.[0] || '/images/peanut-rewri.jpg'}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Quality Seal Overlay */}
            <div className="absolute top-4 start-4 z-10 flex flex-col gap-2">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-amber-950/90 text-amber-200 backdrop-blur-md shadow-sm border border-amber-500/30">
                {isUrdu ? '100% اصل بن ناصر' : '100% Authentic Bin Nasir'}
              </span>
            </div>

            {discountPercent && (
              <div className="absolute top-4 end-4 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-black bg-red-600 text-white shadow-md uppercase tracking-wider">
                  {t.saveAmount} {discountPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Additional thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-sm cursor-pointer hover:border-amber-600 transition flex-shrink-0"
                >
                  <Image src={img} alt={`${title} photo ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info, Professional Description, Price & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                {isUrdu ? 'کیش آن ڈلیوری (COD)' : 'Cash on Delivery (COD)'}
              </span>
              <span className="text-[11px] font-semibold text-green-800 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                {t.inStock}
              </span>
            </div>

            {/* Clean Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-gray-900 leading-tight">
              {title}
            </h1>
          </div>

          {/* Professional Description Card (Right below title) */}
          <div className="rounded-3xl bg-white border border-amber-200/90 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                  {t.productHighlights}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {isUrdu ? '100% خالص' : '100% Pure'}
              </span>
            </div>

            <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">
              {description}
            </p>

            {/* 3 Quick Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-gray-100 text-xs text-gray-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="font-semibold">{t.productFeatures.f1}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="font-semibold">{t.productFeatures.f2}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="font-semibold">{t.productFeatures.f3}</span>
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 font-medium block">
                {isUrdu ? 'کیش آن ڈلیوری کی خصوصی قیمت' : 'Special Cash on Delivery Price'}
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-amber-950 font-sans tracking-tight">
                  {formatPKR(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    {formatPKR(product.compare_at_price)}
                  </span>
                )}
              </div>
            </div>

            {product.price >= 3000 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-100 text-green-800 text-xs font-bold border border-green-200">
                <Truck className="w-4 h-4 text-green-600" />
                {isUrdu ? 'مفت ڈلیوری (Free Shipping)' : 'Free Nationwide Delivery'}
              </span>
            ) : (
              <span className="text-xs text-gray-600 font-medium bg-white px-3 py-1.5 rounded-xl border border-amber-200">
                {isUrdu ? 'ملک بھر میں معیاری ڈلیوری Rs. 200' : 'Standard Shipping Rs. 200'}
              </span>
            )}
          </div>

          {/* Interactive Client Component (Quantity Stepper, Add to Cart & Buy Now Buttons) */}
          <ProductDetailClient product={product} />

          {/* 4 Delivery & Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">{t.deliveryTimeTitle}</p>
                <p className="text-[11px] text-gray-500">{t.deliveryTimeDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
                <PackageCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">{t.openParcelTitle}</p>
                <p className="text-[11px] text-gray-500">{t.openParcelDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">{t.callConfirmTitle}</p>
                <p className="text-[11px] text-gray-500">{t.callConfirmDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">{t.purityGuaranteeTitle}</p>
                <p className="text-[11px] text-gray-500">{t.purityGuaranteeDesc}</p>
              </div>
            </div>
          </div>

          {/* Dedicated WhatsApp Direct Order Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-green-50 border border-green-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-start">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{t.whatsappInquiryTitle}</p>
                <p className="text-xs text-green-800 mt-0.5">{t.whatsappInquiryDesc} (0300-1788080)</p>
              </div>
            </div>

            <a
              href={`https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir%2C%20mujhe%20${encodeURIComponent(title)}%20order%20karna%20hai`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{isUrdu ? 'واٹس ایپ چیٹ' : 'WhatsApp Chat'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-amber-200/70 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {isUrdu ? 'دیگر تجاویز' : 'Recommendations'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 mt-0.5">
                {t.relatedHeading}
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition underline underline-offset-4"
            >
              {isUrdu ? 'تمام کیٹلاگ دیکھیں ←' : 'View Full Catalog →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
