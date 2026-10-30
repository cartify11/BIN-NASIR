'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, translations, Translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ur'); // Default to Urdu for authentic Pakistani experience or English toggle
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('binnasir_lang') as Language;
      if (saved === 'en' || saved === 'ur') {
        setLangState(saved);
      }
    } catch (e) {
      console.warn('Failed to load language preference', e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('binnasir_lang', newLang);
    } catch (e) {
      console.warn('Failed to save language preference', e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ur' : 'en');
  };

  const dir: 'ltr' | 'rtl' = lang === 'ur' ? 'rtl' : 'ltr';
  const t = translations[lang];

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir, mounted]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        dir,
        isUrdu: lang === 'ur',
      }}
    >
      <div dir={dir} className={lang === 'ur' ? 'font-sans' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
