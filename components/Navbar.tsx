'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Phone,
  Menu,
  X,
  Search,
  Truck,
  HelpCircle,
  Info,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import AnnouncementBar from '@/components/AnnouncementBar';
import SearchModal from '@/components/SearchModal';

export default function Navbar() {
  const { totalItems, isMounted } = useCart();
  const { lang, setLang, t, isUrdu } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-stone-950/95 text-white backdrop-blur-md border-b border-amber-900/30 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile Menu Button & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-amber-200 hover:text-white hover:bg-white/10 transition"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-11 sm:w-14 h-11 sm:h-14 transition-transform group-hover:scale-105 shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Bin Nasir Official Traditional Sweets & Pure Foods"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif-luxury uppercase">
                    BIN NASIR
                  </span>
                  <span className="text-[10px] sm:text-xs text-amber-400 font-semibold tracking-wider uppercase">
                    {isUrdu ? 'خالص روایتی سوغاتیں و ہربل شفا' : 'Pure Traditional Delights'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-200">
              <Link href="/" className="hover:text-amber-400 transition">
                {t.home}
              </Link>
              <Link href="/shop" className="hover:text-amber-400 transition">
                {t.allProducts}
              </Link>
              <Link href="/track-order" className="hover:text-amber-400 transition flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{t.trackOrder}</span>
              </Link>
              <Link href="/about" className="hover:text-amber-400 transition">
                {t.aboutUs}
              </Link>
              <Link href="/faq" className="hover:text-amber-400 transition">
                {t.faqs}
              </Link>
              <Link href="/contact" className="hover:text-amber-400 transition">
                {t.contactUs}
              </Link>
            </nav>

            {/* Right: Search, Language Switcher, WhatsApp & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition flex items-center gap-2 text-xs font-medium"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5 text-amber-400" />
                <span className="hidden sm:inline text-stone-300">{isUrdu ? 'تلاش کریں' : 'Search'}</span>
              </button>

              {/* Language Switcher Pill (Instant 1-Tap Toggle) */}
              <div className="inline-flex items-center rounded-full bg-stone-900/90 p-0.5 border border-amber-500/30 text-[11px] shrink-0 shadow-inner">
                <button
                  onClick={() => setLang('ur')}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition font-bold ${
                    isUrdu
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow'
                      : 'text-amber-200/80 hover:text-white'
                  }`}
                  aria-label="Urdu Language"
                >
                  اردو
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition font-semibold ${
                    !isUrdu
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow'
                      : 'text-amber-200/80 hover:text-white'
                  }`}
                  aria-label="English Language"
                >
                  English
                </button>
              </div>

              {/* Direct WhatsApp Action (Desktop) */}
              <a
                href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir%2C%20mujhe%20order%20karna%20hai"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>0300-1788080</span>
              </a>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-xs">{t.cart}</span>
                {isMounted && totalItems > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-stone-950 text-amber-300 text-[11px] font-black">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div
            className={`fixed inset-y-0 ${
              isUrdu ? 'right-0' : 'left-0'
            } w-4/5 max-w-sm bg-stone-950 text-white shadow-2xl p-6 flex flex-col justify-between border-l border-amber-900/30 z-50`}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9">
                    <Image src="/images/logo.png" alt="Bin Nasir" fill className="object-contain" />
                  </div>
                  <span className="font-serif-luxury font-black text-lg text-amber-300">BIN NASIR</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-3 text-base font-semibold">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition"
                >
                  {t.home}
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition"
                >
                  {t.allProducts}
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>{t.trackOrder}</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{t.aboutUs}</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>{t.faqs}</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{t.contactUs}</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {/* Language Switcher in Drawer */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-stone-300 font-medium">
                  {isUrdu ? 'زبان تبدیل کریں' : 'Switch Language'}:
                </span>
                <div className="inline-flex items-center rounded-full bg-stone-900 p-0.5 border border-amber-500/30 text-xs">
                  <button
                    onClick={() => {
                      setLang('ur');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full font-bold transition ${
                      isUrdu
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    اردو
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full font-semibold transition ${
                      !isUrdu
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <a
                href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-900/30"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: 0300-1788080</span>
              </a>
              <p className="text-center text-xs text-stone-400">
                {isUrdu ? 'پورے پاکستان میں کیش آن ڈلیوری' : 'Cash on Delivery Nationwide'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
