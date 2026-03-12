"use client";

import Link from "next/link";
import { Phone, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href === "#" ? "body" : href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-3 shadow-lg border-b border-slate-200" 
          : "bg-transparent py-5"
      }`}
    >
      <nav className="px-6 lg:px-16">
        <div className="flex items-center justify-between">
          
          {/* Logo con efecto de escala */}
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <img 
              src="/images/logo/logo-mejorado-removebg-preview.png" 
              alt="LUISBETY INC" 
              className={`transition-all duration-300 ${
                scrolled ? "h-12" : "h-16 md:h-20"
              } w-auto brightness-0 invert-[${scrolled ? '0' : '1'}]`} 
              /* La lógica de brightness asegura que el logo se vea blanco sobre el hero oscuro 
                 y negro/original cuando el header se vuelve blanco */
              style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop Navigation - Minimalista y Elegante */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-500 relative group ${
                  scrolled ? "text-slate-800" : "text-white"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Bloque Derecha: Botón Premium e Idioma */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className={`flex items-center gap-1.5 font-bold uppercase text-xs tracking-tighter transition-colors ${
                scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
              }`}
            >
              <Globe className="w-4 h-4" />
              {language}
              <ChevronDown className="w-3 h-3" />
            </button>

            <a
              href="tel:+17863506367"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs tracking-widest transition-all shadow-md active:scale-95 ${
                scrolled 
                  ? "bg-slate-900 text-white hover:bg-blue-600" 
                  : "bg-white text-slate-900 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>(786) 350-6367</span>
            </a>
          </div>

          {/* Mobile Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu con efecto Glassmorphism */}
        <div className={`md:hidden absolute left-0 right-0 top-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen border-t border-slate-100 py-8 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="flex flex-col gap-6 px-8">
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-2xl font-black text-slate-900 tracking-tighter"
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <div className="h-[1px] bg-slate-100 my-2"></div>
            <a 
              href="tel:+17863506367" 
              className="flex justify-center items-center gap-3 py-5 bg-blue-600 rounded-2xl font-black text-white text-xl shadow-lg shadow-blue-200"
            >
              <Phone size={24} fill="currentColor" /> (786) 350-6367
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}