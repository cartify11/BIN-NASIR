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
      className="group relative overflow-hidden rounded-3xl bg-amber-50 border border-amber-200/60 shadow-sm hover:shadow-lg transition duration-300 block aspect-[4/3]"
    >
      <Image
        src={category.image || '/images/peanut-rewri.jpg'}
        alt={title}
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
        <h4 className="text-white text-lg sm:text-xl font-bold group-hover:text-amber-300 transition">
          {title}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-amber-200 font-semibold mt-1">
          <span>{t.exploreCategory}</span>
          {isUrdu ? (
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      </div>
    </Link>
  );
}
