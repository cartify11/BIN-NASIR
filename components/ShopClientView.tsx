'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/language-context';
import { getCategoryTitle } from '@/lib/mock-data';
import { Category, Product } from '@/types';

interface ShopClientViewProps {
  categories: Category[];
  products: Product[];
  activeCategorySlug?: string;
}

export default function ShopClientView({
  categories,
  products,
  activeCategorySlug,
}: ShopClientViewProps) {
  const { lang, t, isUrdu } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="border-b border-amber-200/60 pb-6">
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-gray-900">
          {t.allProducts}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          {isUrdu
            ? 'بن ناصر کی تمام روایتی، نامیاتی اور خالص مصنوعات۔ پورے پاکستان میں کیش آن ڈلیوری دستیاب ہے۔'
            : 'Explore all authentic organic and traditional products from Bin Nasir. Cash on Delivery available across Pakistan.'}
        </p>
      </div>

      {/* Category Filter Pills (Touch Scrollable on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <Link
          href="/shop"
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition ${
            !activeCategorySlug
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
          }`}
        >
          {isUrdu ? 'تمام کیٹیگریز' : 'All Categories'}
        </Link>
        {categories.map((cat) => {
          const isActive = activeCategorySlug === cat.slug;
          const catTitle = getCategoryTitle(cat, lang);
          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition ${
                isActive
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {catTitle}
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
          <p className="text-gray-500 text-sm">
            {isUrdu ? 'اس کیٹیگری میں کوئی پراڈکٹ نہیں مل سکی۔' : 'No products found in this category.'}
          </p>
          <Link
            href="/shop"
            className="mt-3 inline-block text-xs font-bold text-amber-700 hover:underline"
          >
            {isUrdu ? 'تمام پراڈکٹس دیکھیں' : 'View all products'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
