"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import esTranslations from '@/translations/es.json';
import enTranslations from '@/translations/en.json';

type Language = 'es' | 'en';

type TranslateOptions<T = unknown> = {
  returnObjects?: boolean;
  defaultValue?: T;
};

type TranslateFn = {
  (key: string): string;
  <T = unknown>(key: string, options: TranslateOptions<T>): T | string;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const allTranslations = {
  es: esTranslations,
  en: enTranslations
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect browser language on mount
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const detectedLang = browserLang.startsWith('es') ? 'es' : 'en';
      setLanguageState(detectedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t: TranslateFn = (key: string, options?: TranslateOptions) => {
    const keys = key.split('.');
    let value: any = allTranslations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (value === undefined || value === null) {
      return options?.defaultValue !== undefined ? options.defaultValue : key;
    }

    if (options?.returnObjects) {
      return value;
    }

    return typeof value === 'string' ? value : (options?.defaultValue ?? key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
