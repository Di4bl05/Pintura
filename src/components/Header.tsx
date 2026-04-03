"use client";

import Link from "next/link";
import { Phone, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  forceSolid?: boolean;
}

export default function Header({ forceSolid = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasOverlayOpen, setHasOverlayOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOverlayState = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setHasOverlayOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener("app:overlay-state", handleOverlayState as EventListener);
    return () => window.removeEventListener("app:overlay-state", handleOverlayState as EventListener);
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

    // Ask any open overlay/modal to close before attempting scroll.
    window.dispatchEvent(new CustomEvent("app:close-overlays"));

    window.setTimeout(() => {
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const extraOffset = 8;

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 80);
  };

  const isSolid = scrolled || hasOverlayOpen || forceSolid;

  return (
    <header 
      className={`fixed top-0 z-[50] w-full transition-all duration-700 ${
        isSolid 
          ? "bg-slate-950/95 backdrop-blur-xl py-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-b border-white/5" 
          : "bg-transparent py-8 border-b border-transparent"
      }`}
    >
      <nav className="mx-auto w-full max-w-[1400px] px-6 lg:pl-10 lg:pr-20">
        <div className="flex items-center">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center flex-shrink-0 gap-4 transition-transform group active:scale-95">
            <div className="relative">
              <img 
                src="/images/logo/logo-original.png" 
                alt="LUISBETY INC" 
                className={`transition-all duration-500 ${isSolid ? "h-10" : "h-14 md:h-16"} w-auto object-contain`} 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="absolute transition-opacity rounded-full opacity-0 -inset-2 bg-primary-500/20 blur-2xl group-hover:opacity-100" />
            </div>
            
            <div className="flex flex-col pl-4 leading-none text-left border-l border-white/10">
              <span className={`font-display font-black tracking-tightest text-white transition-all duration-500 ${isSolid ? "text-xl" : "text-2xl md:text-3xl"}`}>
                LUISBETY <span className="font-serif italic font-normal tracking-normal lowercase text-primary-500">Inc.</span>
              </span>
              <span className={`font-sans font-bold uppercase tracking-[0.4em] text-primary-200/50 transition-all duration-500 ${isSolid ? "text-[7px] mt-1" : "text-[9px] md:text-[10px] mt-2"}`}>
                Paiting and Remodeling
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV: Minimalismo editorial */}
          <div className={`hidden lg:flex items-center space-x-10 ml-auto transition-all duration-500 ${isSolid ? "mr-6" : "mr-8 xl:mr-10"}`}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-white/60 transition-all hover:text-white relative group"
              >
                {item.name}
                <span className="absolute left-0 w-0 h-px transition-all duration-500 -bottom-2 bg-primary-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* ACTIONS: Idioma y CTA */}
          <div className={`hidden md:flex items-center gap-3 transition-all duration-500 ${isSolid ? "lg:ml-0 lg:translate-x-10" : "lg:ml-4 xl:ml-6 lg:-translate-x-2 xl:-translate-x-10"}`}>
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className={`font-sans flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em] transition-all text-white/40 hover:text-primary-400 ${isSolid ? "lg:-translate-x-3" : "lg:-translate-x-2 xl:-translate-x-3"}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="transition-all border-b border-transparent hover:border-primary-500">{language}</span>
            </button>

            <a
              href="tel:+17863506367"
              className={`font-sans group flex items-center gap-3 rounded-2xl font-bold text-[10px] tracking-[0.2em] transition-all bg-white text-slate-950 hover:bg-primary-600 hover:text-white hover:shadow-[0_15px_40px_rgba(37,99,235,0.3)] active:scale-95 uppercase whitespace-nowrap ${isSolid ? "px-8 py-4" : "px-9 py-4"}`}
            >
              <div className="p-1.5 bg-slate-100 group-hover:bg-white/20 rounded-lg transition-colors">
                <Phone className="w-3 h-3 fill-current" />
              </div>
              <span>(786) 350-6367</span>
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-12 h-12 ml-auto text-white transition-all duration-500 border lg:hidden rounded-2xl bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU: Estilo Full Screen / Modal */}
        <div
          className={`lg:hidden absolute left-4 right-4 top-[calc(100%+16px)] rounded-[2.5rem] border border-white/10 bg-slate-950/95 backdrop-blur-2xl text-white shadow-2xl transition-all duration-500 ease-out overflow-hidden ${
            isMenuOpen ? "max-h-[80vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 px-8 py-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="font-sans flex items-center justify-between rounded-3xl bg-white/5 px-8 py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary-600/20 border border-transparent hover:border-primary-500/30 transition-all"
              >
                <span>{item.name}</span>
                <span className="text-primary-500">→</span>
              </a>
            ))}
            
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="mt-4 font-sans w-full py-6 rounded-3xl border border-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 flex items-center justify-center gap-3"
            >
              <Globe className="w-4 h-4" /> Switch to {language === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}