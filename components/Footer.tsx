'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, ShieldCheck, PhoneCall, RefreshCw, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { lang, t, isUrdu } = useLanguage();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 sm:pt-16 pb-24 md:pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {isUrdu ? 'کیش آن ڈلیوری' : 'Cash On Delivery (COD)'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {isUrdu ? 'پورے پاکستان کے 150+ شہروں میں' : 'Delivering across 150+ cities in Pakistan'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {isUrdu ? '100% خالص اور قدرتی' : '100% Pure & Lab Tested'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {isUrdu ? 'بغیر کسی ملاوٹ اور کیمیکل کے' : 'Zero chemicals or synthetic additives'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {isUrdu ? 'اوپن پارسل کی اجازت' : 'Open Parcel Guarantee'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {isUrdu ? 'پہلے پارسل کھولیں پھر کیش دیں' : 'Inspect contents before courier payment'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">
                {isUrdu ? '24/7 واٹس ایپ سپورٹ' : 'Direct WhatsApp Support'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {isUrdu ? 'کسی بھی سوال پر فوری رہنمائی' : 'Quick help at 0300-1788080'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 sm:py-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Bin Nasir Official Traditional Sweets"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-serif-luxury font-black text-amber-400 tracking-wider block">
                  BIN NASIR
                </span>
                <span className="text-[10px] text-amber-200/80 font-medium">
                  {isUrdu ? 'روایتی ذائقہ • جدید زندگی' : 'Traditional Taste • Modern Life'}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <PhoneCall className="w-4 h-4 shrink-0" />
              <a
                href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp: 0300-1788080
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-amber-300 font-bold text-xs uppercase tracking-wider mb-4">
              {isUrdu ? 'روایتی پراڈکٹس' : 'Our Products'}
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition">
                  {t.allProducts}
                </Link>
              </li>
              <li>
                <Link href="/product/special-peanut-rewri" className="hover:text-amber-400 transition">
                  {isUrdu ? 'خاص مونگ پھلی ریوڑی' : 'Special Peanut Rewri'}
                </Link>
              </li>
              <li>
                <Link href="/product/pure-natural-sidr-honey" className="hover:text-amber-400 transition">
                  {isUrdu ? 'خالص قدرتی بیری کا شہد' : 'Pure Natural Sidr Honey'}
                </Link>
              </li>
              <li>
                <Link href="/product/pure-himalayan-shilajit" className="hover:text-amber-400 transition">
                  {isUrdu ? 'خالص ہمالیائی سلاجیت' : 'Pure Himalayan Shilajit'}
                </Link>
              </li>
              <li>
                <Link href="/product/royal-desi-ghee-panjeeri" className="hover:text-amber-400 transition">
                  {isUrdu ? 'شاہی دیسی گھی پنجیری' : 'Royal Desi Ghee Panjeeri'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Assistance */}
          <div>
            <h5 className="text-amber-300 font-bold text-xs uppercase tracking-wider mb-4">
              {isUrdu ? 'کسٹمر سروس' : 'Customer Assistance'}
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/track-order" className="hover:text-amber-400 transition">
                  {t.trackOrder}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition">
                  {t.faqs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  {t.contactUs}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition">
                  {t.cart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Policies (No Admin Link!) */}
          <div>
            <h5 className="text-amber-300 font-bold text-xs uppercase tracking-wider mb-4">
              {isUrdu ? 'پالیسیز اور شرائط' : 'Policies & Terms'}
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/policies/delivery-returns" className="hover:text-amber-400 transition">
                  {isUrdu ? 'ڈلیوری اور ریٹرن پالیسی' : 'Delivery & Returns Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-amber-400 transition">
                  {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-amber-400 transition">
                  {isUrdu ? 'قواعد و ضوابط' : 'Terms & Conditions'}
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-stone-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {isUrdu ? 'مرکزی کوریئر ترسیل: چکوال و لاہور، پاکستان' : 'Express dispatch: Chakwal & Lahore, Pakistan'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
          <p className="flex items-center gap-2">
            <span>{isUrdu ? '100% خالص قدرتی اجزاء' : '100% Pure & Natural'}</span>
            <span>•</span>
            <span>{isUrdu ? 'اوپن پارسل گارنٹی' : 'Open Parcel Guarantee'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
