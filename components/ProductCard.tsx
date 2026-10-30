'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Zap, Check, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { getProductTitle, getProductDescription } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { lang, t, isUrdu } = useLanguage();
  const [added, setAdded] = useState(false);

  const title = getProductTitle(product, lang);
  const description = getProductDescription(product, lang);

  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '/images/peanut-rewri.jpg';

  const discountAmount =
    product.compare_at_price && product.compare_at_price > product.price
      ? product.compare_at_price - product.price
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeText = isUrdu ? product.badge_ur : product.badge_en;

  return (
    <div className="group relative bg-white rounded-2xl border border-stone-200/80 hover:border-amber-400/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {discountAmount > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[10px] sm:text-xs shadow-md tracking-wider">
              {t.saveAmount} Rs. {discountAmount.toLocaleString()}
            </span>
          ) : <span />}

          {badgeText && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-[10px] sm:text-xs shadow-md">
              {badgeText}
            </span>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="px-4 py-2 rounded-xl bg-white/95 text-stone-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>{isUrdu ? 'تفصیلات دیکھیں' : 'View Details'}</span>
          </span>
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price Box */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-black text-amber-900">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-xs text-stone-400 line-through">
                Rs. {product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="truncate">{t.addedToCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="truncate">{t.addToCart}</span>
                </>
              )}
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition active:scale-95 text-center"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
              <span className="truncate">{t.buyNowCod}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
