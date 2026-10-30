'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Phone, Menu, X, ShieldCheck, Globe } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
  const { totalItems, isMounted } = useCart();
  const { lang, setLang, toggleLang, t, isUrdu } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-50 text-[11px] sm:text-xs py-1.5 px-3 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-1.5">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{t.announcement}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span>{t.freeShippingNotice}</span>
            <a
              href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-200 transition font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>0300-1788080</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-10 sm:w-12 h-12 sm:h-14 transition-transform group-hover:scale-105 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Bin Nasir Official Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 font-serif">
                BIN NASIR
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-700 font-semibold tracking-wide">
                {isUrdu ? 'روایتی ذائقہ و قدرتی شفا' : 'Traditional Taste • Modern Life'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 rtl:space-x-reverse text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-amber-700 transition">
              {t.home}
            </Link>
            <Link href="/shop" className="hover:text-amber-700 transition">
              {t.allProducts}
            </Link>
            <Link href="/shop?category=traditional-sweets-rewri" className="hover:text-amber-700 transition">
              {t.rewriCategory}
            </Link>
            <Link href="/shop?category=pure-honey-syrups" className="hover:text-amber-700 transition">
              {t.honeyCategory}
            </Link>
            <Link href="/shop?category=herbal-health-supplements" className="hover:text-amber-700 transition">
              {t.shilajitCategory}
            </Link>
          </nav>

          {/* Right Actions: Language Switcher, Cart & WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition shadow-sm active:scale-95"
              title="Switch Language (اردو / English)"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>

            <a
              href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {t.whatsappOrder}
            </a>

            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-amber-600 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-gray-700 hover:text-amber-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-800 font-medium hover:text-amber-600"
          >
            {t.home}
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-800 font-medium hover:text-amber-600"
          >
            {t.allProducts}
          </Link>
          <Link
            href="/shop?category=traditional-sweets-rewri"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-800 font-medium hover:text-amber-600"
          >
            {t.rewriCategory}
          </Link>
          <Link
            href="/shop?category=pure-honey-syrups"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-800 font-medium hover:text-amber-600"
          >
            {t.honeyCategory}
          </Link>
          <Link
            href="/shop?category=herbal-health-supplements"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-800 font-medium hover:text-amber-600"
          >
            {t.shilajitCategory}
          </Link>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                toggleLang();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Globe className="w-4 h-4 text-amber-700" />
              <span>Language: {isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}</span>
            </button>
            <a
              href="https://wa.me/923001788080"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-xl bg-green-600 text-white font-semibold text-xs flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
