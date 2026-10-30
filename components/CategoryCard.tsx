'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Category } from '@/types';
import { useLanguage } from '@/lib/language-context';
import { getCategoryTitle } from '@/lib/mock-data';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { lang, t, isUrdu } = useLanguage();
  const title = getCategoryTitle(category, lang);

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Image
        src={category.image || '/images/peanut-rewri.jpg'}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
        <h3 className="font-serif font-black text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-bold mt-2">
          <span>{t.exploreCategory}</span>
          {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </div>
      </div>
    </Link>
  );
}
