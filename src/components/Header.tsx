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
    { name: t("nav.why"), href: "#why-choose-us" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // 1. Cambiar la URL manualmente para avisar al ServiceDetail
    if (href !== "#") {
      window.history.pushState(null, "", href);
    } else {
      window.history.pushState(null, "", "/");
    }

    // 2. Disparar evento para que ServiceDetail se entere del cambio
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    // 3. Ejecutar el scroll suave
    const targetId = href.replace("#", "");
    const target = href === "#" ? document.body : document.getElementById(targetId);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      className={`fixed top-0 z-[50] w-full transition-all duration-500 ${
        scrolled 
          ? "bg-slate-950/90 backdrop-blur-md py-3 shadow-lg" 
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        <div className="flex items-center justify-between">
          
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <img 
              src="/images/logo/logo-original.png" 
              alt="LUISBETY INC" 
              className={`transition-all duration-300 ${scrolled ? "h-10" : "h-14 md:h-18"} w-auto`} 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="flex flex-col leading-none text-left">
              <span className={`font-black tracking-tighter text-white transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl md:text-3xl"}`}>
                LUISBETY <span className="text-blue-500 italic">INC.</span>
              </span>
              <span className={`font-bold uppercase tracking-[0.3em] text-white/90 transition-all duration-300 ${scrolled ? "text-[8px] mt-0.5" : "text-[10px] md:text-xs mt-1"}`}>
                Painting and Remodeling
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-bold uppercase tracking-widest text-white transition-all hover:text-blue-500 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl border transition-all duration-300 flex items-center justify-center bg-white/10 text-white border-white/30 backdrop-blur-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-3 right-3 top-[calc(100%+10px)] rounded-3xl border border-white/20 bg-slate-950 text-white shadow-2xl transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-[85vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-5 py-6 flex flex-col gap-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3.5 text-lg font-black uppercase tracking-tight hover:bg-blue-600/30"
              >
                <span>{item.name}</span>
                <span className="text-blue-200">→</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}