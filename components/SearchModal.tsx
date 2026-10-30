'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { INITIAL_PRODUCTS, getProductTitle } from '@/lib/mock-data';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { lang, t, isUrdu } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = INITIAL_PRODUCTS.filter((p) => {
      const matchName = (p.name || '').toLowerCase().includes(term);
      const matchNameEn = (p.name_en || '').toLowerCase().includes(term);
      const matchNameUr = (p.name_ur || '').toLowerCase().includes(term);
      const matchDesc = (p.description || '').toLowerCase().includes(term);
      return matchName || matchNameEn || matchNameUr || matchDesc;
    });

    setResults(filtered);
  }, [searchTerm]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-900/10">
        {/* Header / Input */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-amber-50/50">
          <Search className="w-5 h-5 text-amber-700 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className="w-full bg-transparent border-0 outline-none text-base sm:text-lg text-gray-900 placeholder-gray-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200/80 text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              <p>Type product name (e.g. Rewri, Sidr Honey, Shilajit, Panjeeri)</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              <p>No products found matching &quot;{searchTerm}&quot;.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-block mt-3 text-amber-700 font-bold hover:underline"
              >
                Browse all products &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Products ({results.length})
              </p>
              {results.map((product) => {
                const title = getProductTitle(product, lang);
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-amber-50/70 transition group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-gray-200">
                      <Image
                        src={product.images[0] || '/images/peanut-rewri.jpg'}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-amber-800 transition truncate">
                        {title}
                      </h4>
                      <p className="text-xs text-amber-700 font-extrabold mt-0.5">
                        Rs. {product.price.toLocaleString()}
                        {product.compare_at_price && (
                          <span className="text-gray-400 line-through text-[11px] ml-2">
                            Rs. {product.compare_at_price.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-amber-600 shrink-0">
                      {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
