"use client";

import Link from "next/link";
import { Phone, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("nav.home"), href: "#" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.reviews"), href: "#reviews" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-800 backdrop-blur-lg shadow-2xl border-b-2 border-primary-100' 
        : 'bg-slate-800 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)] border-b border-gray-100'
    }`}>
      <nav className="container px-4 mx-auto">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-1.5 md:py-2' : 'py-2 md:py-3'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/images/logo/luisbety-inc.png" 
              alt="LUISBETY INC Logo" 
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
              } group-hover:scale-105`}
            />
            <span className="sr-only text-xl font-bold text-gray-900 transition-colors md:text-2xl group-hover:text-primary-600">
              LUISBETY INC.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-medium text-white transition-colors group hover:text-primary-600"
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
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="tel:+17863506367"
            className="items-center hidden gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-lg md:flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5 animate-pulse" />
            (786) 350-6367
          </a>

          {/* Language Selector - Desktop */}
          <div className="items-center hidden gap-2 md:flex">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 px-4 py-2 transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:scale-105"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5 text-white group-hover:text-primary-600" />
              <span className="text-sm font-semibold text-white uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-transform duration-300 md:hidden hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-accent-600" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-4 duration-300 border-t border-gray-200 md:hidden animate-in slide-in-from-top-2 bg-gradient-to-b from-white to-gray-50">
            <div className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-white transition-all hover:text-primary-600 hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
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
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-primary-50 hover:to-accent-50 hover:scale-105"
              >
                <Globe className="w-5 h-5" />
                {language === 'es' ? 'English' : 'Español'}
              </button>
              
              <a
                href="tel:+17863506367"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 hover:shadow-xl hover:scale-105"
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
