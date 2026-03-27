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
          ? "bg-slate-950/80 backdrop-blur-md py-3 shadow-lg" 
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        <div className="flex items-center justify-between">
          
        {/* Logo con efecto de escala - Imagen y Texto AL LADO */}
<Link href="/" className="flex-shrink-0 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 ml-0">
  {/* 1. LA IMAGEN (Símbolo o Isotípo) */}
  <img 
    src="/images/logo/logo-original.png" 
    alt="LUISBETY INC" 
    className={`transition-all duration-300 ${
      scrolled ? "h-10" : "h-14 md:h-18"
    } w-auto`} 
    style={{ filter: 'brightness(0) invert(1)' }}
  />
  
  {/* 2. EL TEXTO (Alineado en dos líneas verticalmente) */}
  <div className="flex flex-col leading-none text-left">
    
    {/* Línea Superior: Nombre de la Empresa */}
    <span className={`font-black tracking-tighter text-white transition-all duration-300 ${
      scrolled ? "text-xl" : "text-2xl md:text-3xl"
    }`}>
      LUISBETY <span className="text-blue-500 italic">INC.</span>
    </span>
    
    {/* Línea Inferior: Eslogan */}
    <span className={`font-bold uppercase tracking-[0.3em] text-white/90 transition-all duration-300 ${
      scrolled ? "text-[8px] mt-0.5" : "text-[10px] md:text-xs mt-1"
    }`}>
      Painting and Remodeling
    </span>
  </div>
</Link>

          {/* Desktop Navigation - Minimalista y Elegante */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-500 relative group ${
                  scrolled ? "text-white/95" : "text-white"
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
              className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-tighter transition-colors text-white/80 hover:text-white"
            >
              <Globe className="w-4 h-4" />
              {language}
              <ChevronDown className="w-3 h-3" />
            </button>

            <a
              href="tel:+17863506367"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm tracking-widest transition-all shadow-md active:scale-95 bg-white text-slate-900 hover:bg-blue-500 hover:text-white"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span className="font-mono text-sm font-bold">(786) 350-6367</span>
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-11 h-11 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95 bg-white/10 text-white border-white/30 backdrop-blur-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`md:hidden fixed inset-0 top-[73px] bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden absolute left-3 right-3 top-[calc(100%+10px)] rounded-3xl border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-[0_30px_70px_rgba(15,23,42,0.55)] transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-[85vh] opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="absolute -top-20 -right-16 w-44 h-44 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />
          <div className="relative px-5 py-6">
            <div className="mb-5 pb-4 border-b border-white/10">
              <p className="text-[11px] uppercase tracking-[0.28em] font-black text-blue-200">Navigation</p>
            </div>

            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-lg font-black uppercase tracking-tight transition-all hover:bg-blue-600/30"
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                >
                  <span>{item.name}</span>
                  <span className="text-blue-200 transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>

            <div className="h-px bg-white/10 my-5"></div>

            <div className="flex gap-3">
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/15 bg-white/10 text-sm font-black uppercase tracking-[0.2em]"
              >
                <Globe className="w-4 h-4" />
                {language}
              </button>
              <a
                href="tel:+17863506367"
                className="flex-[1.6] flex justify-center items-center gap-3 py-3.5 bg-blue-600 rounded-2xl font-black text-white text-sm tracking-[0.18em] uppercase shadow-lg shadow-blue-900/40"
              >
                <Phone size={18} fill="currentColor" /> Llamar
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}