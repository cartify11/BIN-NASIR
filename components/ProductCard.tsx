'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Zap } from 'lucide-react';
import { Product } from '@/types';
import { formatPKR } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { getProductTitle, getProductDescription } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { lang, t, isUrdu } = useLanguage();
  const [added, setAdded] = useState(false);

  const title = getProductTitle(product, lang);
  const description = getProductDescription(product, lang);

  const discountPercent =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const imageSrc = product.images?.[0] || '/images/peanut-rewri.jpg';

  return (
    <div className="group relative bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-amber-50/50">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-red-600 text-white shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            {isUrdu ? 'کیش آن ڈلیوری' : 'Cash On Delivery'}
          </span>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 start-3 bg-amber-900/80 backdrop-blur text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            {isUrdu ? `صرف ${product.stock} باقی ہیں` : `Only ${product.stock} left`}
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-gray-900 text-base group-hover:text-amber-800 transition line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          {/* Prices */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-amber-900 font-sans">
                {formatPKR(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPKR(product.compare_at_price)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-green-700 font-medium block">
              {isUrdu ? 'اسٹاک میں دستیاب ہے' : 'In Stock'}
            </span>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`p-2.5 rounded-xl transition font-medium flex items-center justify-center gap-1.5 text-xs ${
              added
                ? 'bg-green-600 text-white'
                : product.stock <= 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm active:scale-95'
            }`}
            title={t.addToCart}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">{t.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">{t.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
