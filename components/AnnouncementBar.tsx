'use client';

import React from 'react';
import { Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AnnouncementBar() {
  const { lang, setLang, t, isUrdu } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 text-xs py-2 px-3 sm:px-6 border-b border-amber-800/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
        {/* Left / Center Announcement Text */}
        <div className="flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden xs:inline" />
          <span className="leading-snug">{t.announcement}</span>
        </div>

        {/* Right side Language Switcher & WhatsApp quick badge */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/923001788080?text=Assalam%20o%20Alaikum%20Bin%20Nasir%2C%20mujhe%20order%20karna%20hai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-amber-300 hover:text-white transition font-medium text-[11px]"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>0300-1788080</span>
          </a>

          {/* Language Toggle Pill */}
          <div className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/15 text-[11px]">
            <button
              onClick={() => setLang('ur')}
              className={`px-2.5 py-0.5 rounded-full transition font-bold ${
                isUrdu ? 'bg-amber-500 text-amber-950 shadow-sm' : 'text-amber-200/80 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-0.5 rounded-full transition font-semibold ${
                !isUrdu ? 'bg-amber-500 text-amber-950 shadow-sm' : 'text-amber-200/80 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
