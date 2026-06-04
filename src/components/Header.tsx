"use client";

import Link from "next/link";
import { Phone, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteImageUrl } from "@/lib/siteImageSources";
import { useSmartLink } from "@/hooks/useSmartLink";

interface HeaderProps {
  forceSolid?: boolean;
}

export default function Header({ forceSolid = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasOverlayOpen, setHasOverlayOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { handlePhoneClick } = useSmartLink();
  const luisPhone = "+1 (786) 350-6367";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (isMenuOpen && y > 20) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

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
    window.dispatchEvent(new CustomEvent("app:close-overlays"));

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", href);
    }
  };

  const isSolid = scrolled || hasOverlayOpen || forceSolid;
  const logoUrl = getSiteImageUrl("logoOriginal");

  return (
    <header
      className={`fixed top-0 z-[50] w-full transition-all duration-700 ${
        isSolid
          ? "bg-slate-950/95 backdrop-blur-xl py-3 md:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-b border-white/5"
          : "bg-transparent py-5 md:py-8 border-b border-transparent"
      }`}
    >
      <nav className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:pl-10 lg:pr-20">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center flex-shrink-0 gap-3 md:gap-4 transition-transform group active:scale-95"
          >
            <div className="relative">
              <img
                src={logoUrl}
                alt="LUISBETY INC"
                className={`transition-all duration-500 object-contain ${
                  isSolid ? "h-8 sm:h-10" : "h-10 sm:h-12 md:h-14"
                } w-auto`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="absolute transition-opacity rounded-full opacity-0 -inset-2 bg-primary-500/20 blur-2xl group-hover:opacity-100" />
            </div>

            <div className="flex flex-col pl-2 sm:pl-3 md:pl-4 leading-none text-left border-l border-white/10">
              <span
                className={`font-display  text-white transition-all duration-500 ${
                  isSolid ? "text-sm sm:text-lg md:text-xl" : "text-base sm:text-xl md:text-3xl"
                }`}
              >
                LuisBety{" "}
                <span className="font-display italic text-primary-500">
                  Inc.
                </span>
              </span>
              <span
                className={`font-sans uppercase text-primary-200/50 transition-all duration-500 ${
                  isSolid
                    ? "text-[8px] mt-1"
                    : "text-[8px] sm:text-[9px] md:text-[11px] mt-1 md:mt-2"
                } tracking-[0.2em]  `}
              >
                Painting and Remodeling
              </span>
            </div>
          </Link>

          <div
            className={`hidden lg:flex items-center space-x-10 ml-auto transition-all duration-500 ${
              isSolid ? "mr-6" : "mr-8 xl:mr-10"
            }`}
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="font-sans  text-[10px] uppercase tracking-[0.25em] text-white/60 transition-all hover:text-white relative group"
              >
                {item.name}
                <span className="absolute left-0 w-0 h-px transition-all duration-500 -bottom-2 bg-primary-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div
            className={`hidden md:flex items-center gap-3 transition-all duration-500 ${
              isSolid
                ? "lg:ml-0 lg:translate-x-10"
                : "lg:ml-4 xl:ml-6 lg:-translate-x-2 xl:-translate-x-10"
            }`}
          >
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="font-sans flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em] text-white/40 hover:text-primary-400 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
            </button>

            <a
              href={`tel:${luisPhone.replace(/\D/g, "")}`}
              onClick={handlePhoneClick(luisPhone)}
              className="font-sans group flex items-center gap-3 rounded-xl text-[10px] tracking-[0.2em] transition-all bg-white text-slate-950 hover:bg-blue-500 hover:text-slate-100 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 focus:outline-none group uppercase whitespace-nowrap px-6 md:px-8 py-3 md:py-4"
            >
              <Phone className="w-3 h-3" />
              <span>(786) 350-6367</span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 ml-auto text-white transition-all duration-500 border lg:hidden rounded-xl bg-white/5 border-white/10 backdrop-blur-md"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={`lg:hidden absolute left-6 right-6 top-[calc(100%+12px)] rounded-[1.5rem] border border-white/10 bg-slate-950/98 backdrop-blur-3xl text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMenuOpen
              ? "opacity-100 translate-y-0 scale-100 visible"
              : "opacity-0 -translate-y-4 scale-[0.98] invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2 px-4 py-6">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                style={{ transitionDelay: `${index * 40}ms` }}
                className={`flex items-center justify-between px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.25em] bg-white/[0.03] border border-white/[0.05] rounded-xl active:scale-[0.98] transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <span className="text-white/70">{item.name}</span>
                <span className="text-primary-500 text-xs">→</span>
              </a>
            ))}

            <div className="h-px w-full bg-white/5 my-1" />

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[8px] font-bold uppercase tracking-[0.2em] text-primary-400 active:bg-primary-500/10 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === "es" ? "EN" : "ES"}</span>
              </button>

              <a
                href={`tel:${luisPhone.replace(/\D/g, "")}`}
                onClick={handlePhoneClick(luisPhone)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-600 text-white text-[9px] font-black uppercase tracking-[0.15em] active:scale-[0.98] transition-all shadow-lg shadow-primary-900/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}