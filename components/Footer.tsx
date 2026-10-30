'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, ShieldCheck, PhoneCall, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { lang, t, isUrdu } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-10 sm:pt-16 pb-20 sm:pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pb-8 sm:pb-12 border-b border-gray-800">
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-gray-900/70 border border-gray-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">
                {isUrdu ? 'کیش آن ڈلیوری' : 'Cash On Delivery (COD)'}
              </h4>
              <p className="text-[11px] text-gray-400">
                {isUrdu ? 'پورے پاکستان کے تمام شہروں میں' : 'Delivering across 150+ cities in Pakistan'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-gray-900/70 border border-gray-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">
                {isUrdu ? '100% خالص اجزاء' : '100% Pure & Natural'}
              </h4>
              <p className="text-[11px] text-gray-400">
                {isUrdu ? 'بغیر کسی ملاوٹ اور کیمیکل کے' : 'Zero chemicals or synthetic additives'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-gray-900/70 border border-gray-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">
                {isUrdu ? 'تصدیقی کال اور میسج' : 'Order Confirmation'}
              </h4>
              <p className="text-[11px] text-gray-400">
                {isUrdu ? 'بھیجنے سے پہلے مکمل تسلی' : 'Automated call / WhatsApp verification'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-gray-900/70 border border-gray-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">
                {isUrdu ? 'اوپن پارسل اور واپسی' : 'Open Box & Returns'}
              </h4>
              <p className="text-[11px] text-gray-400">
                {isUrdu ? 'پارسل کھول کر تسلی کر سکتے ہیں' : 'Check parcel at your doorstep'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 sm:py-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-14 bg-white/10 rounded-xl p-1 border border-amber-500/20">
                <Image
                  src="/images/logo.png"
                  alt="Bin Nasir Official Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-black text-amber-400 tracking-wider block">
                  BIN NASIR
                </span>
                <span className="text-[11px] text-amber-200/70 font-medium">
                  {isUrdu ? 'روایتی ذائقہ و قدرتی شفا' : 'Traditional Taste • Modern Life'}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="pt-2 text-xs text-amber-500/90 font-mono">
              <a
                href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <span>WhatsApp: 0300-1788080</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.quickCategoriesTitle}
            </h5>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/shop?category=traditional-sweets-rewri" className="hover:text-amber-400 transition">
                  {t.rewriCategory}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pure-honey-syrups" className="hover:text-amber-400 transition">
                  {t.honeyCategory}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=herbal-health-supplements" className="hover:text-amber-400 transition">
                  {t.shilajitCategory}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition">
                  {t.allProducts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.customerCareTitle}
            </h5>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a
                  href="https://wa.me/923001788080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  WhatsApp: 0300-1788080
                </a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition">
                  {t.cart}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-amber-400 transition">
                  {t.proceedToCheckout}
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500">
                  {isUrdu ? 'لیپرڈز، ٹریکس اور ٹی سی ایس کوریئر کے ذریعے ترسیل' : 'Nationwide dispatch via Leopards, Trax & TCS'}
                </span>
              </li>
            </ul>
          </div>

          {/* Admin Area */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.adminLink}
            </h5>
            <p className="text-xs text-gray-400 mb-3">
              {isUrdu
                ? 'آرڈرز کی تصدیق اور آٹومیشن کے لیے ایڈمن ایریا'
                : 'Protected orders & automation management system.'}
            </p>
            <Link
              href="/admin"
              className="inline-block px-4 py-2 text-xs font-semibold rounded-lg bg-gray-800 text-amber-300 border border-gray-700 hover:bg-gray-700 transition"
            >
              {isUrdu ? 'ایڈمن ڈیش بورڈ کھولیں ←' : 'Admin Dashboard →'}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
          <p>Traditional Taste • Modern Life | Bin Nasir</p>
        </div>
      </div>
    </footer>
  );
}
