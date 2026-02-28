"use client";

import Link from "next/link";
import { Phone, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: "#" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.reviews"), href: "#reviews" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/images/logo/logo-cropped.png" 
              alt="LUISBETY INC Logo" 
              className="w-auto h-16 md:h-20"
            />
            <span className="text-xl font-bold text-gray-900 md:text-2xl">
              LUISBETY INC.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 transition-colors hover:text-accent-600"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href === "#") {
                    // Scroll al inicio de la página
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (item.href.startsWith("#")) {
                    // Scroll a la sección específica
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="tel:+17863506367"
            className="items-center hidden gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg md:flex bg-accent-600 hover:bg-accent-700"
          >
            <Phone className="w-5 h-5" />
            (786) 350-6367
          </a>

          {/* Language Selector - Desktop */}
          <div className="items-center hidden gap-2 md:flex">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700 uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-4 border-t md:hidden">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-gray-700 hover:text-accent-600"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    e.preventDefault();
                    if (item.href === "#") {
                      // Scroll al inicio de la página
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (item.href.startsWith("#")) {
                      // Scroll a la sección específica
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Language Selector - Mobile */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Globe className="w-5 h-5" />
                {language === 'es' ? 'English' : 'Español'}
              </button>
              
              <a
                href="tel:+17863506367"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-accent-600 hover:bg-accent-700"
              >
                <Phone className="w-5 h-5" />
                (786) 350-6367
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
