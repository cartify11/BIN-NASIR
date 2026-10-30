'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, isMounted } = useCart();
  const { isUrdu } = useLanguage();

  const isCart = pathname === '/cart';
  const isShop = pathname === '/shop';
  const isHome = pathname === '/';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
      <div className="grid grid-cols-4 h-15 py-1.5 px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
            isHome ? 'text-amber-800 font-bold' : 'text-gray-500 hover:text-amber-700'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : ''}`} />
          <span>{isUrdu ? 'ہوم' : 'Home'}</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
            isShop ? 'text-amber-800 font-bold' : 'text-gray-500 hover:text-amber-700'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${isShop ? 'stroke-[2.5]' : ''}`} />
          <span>{isUrdu ? 'پراڈکٹس' : 'Products'}</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
            isCart ? 'text-amber-800 font-bold' : 'text-gray-500 hover:text-amber-700'
          }`}
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${isCart ? 'stroke-[2.5]' : ''}`} />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-600 text-white font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span>{isUrdu ? 'کارٹ' : 'Cart'}</span>
        </Link>

        {/* WhatsApp */}
        <a
          href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-green-700 hover:text-green-800"
        >
          <MessageCircle className="w-5 h-5 text-green-600 stroke-[2.2]" />
          <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
        </a>
      </div>
    </nav>
  );
}
