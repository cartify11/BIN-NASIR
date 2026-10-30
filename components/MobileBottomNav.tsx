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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-amber-900/40 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] md:hidden">
      <div className="grid grid-cols-4 h-16 py-1 px-2 items-center">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
            isHome ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'text-amber-400 stroke-[2.5]' : ''}`} />
          <span>{isUrdu ? 'ہوم' : 'Home'}</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
            isShop ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${isShop ? 'text-amber-400 stroke-[2.5]' : ''}`} />
          <span>{isUrdu ? 'پراڈکٹس' : 'Shop'}</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
            isCart ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${isCart ? 'text-amber-400 stroke-[2.5]' : ''}`} />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-stone-950 font-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
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
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
          <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
        </a>
      </div>
    </nav>
  );
}
