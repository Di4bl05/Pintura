"use client";

import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import ContactForm from "./ContactForm";

const HeroContent = memo(({ t, onOpenContact, current, isAnimate, heroContent }: any) => (
  <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
    <div className="max-w-4xl mt-6 sm:mt-0">
      <span className="font-serif block text-primary-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-4 italic">
        {t("hero.title1")}
      </span>

      <h1 className="font-display text-5xl md:text-4xl lg:text-7xl xl:text-[7rem] font-black text-white leading-[0.92] uppercase mb-7 drop-shadow-2xl">
        {t("hero.title2")}
      </h1>

      <div className="h-10 overflow-hidden mb-10 border-l-2 border-primary-600/30 pl-4">
        <p
          className={`font-sans text-sm md:text-lg font-bold text-primary-100/60 uppercase tracking-[0.35em] transition-all duration-700
          ${isAnimate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {heroContent[current].title}
        </p>
      </div>

      <div className="max-w-lg mb-16">
        <p className="font-sans text-sm md:text-base text-slate-400 leading-relaxed">
          <span className="text-slate-200">{t("hero.description")}</span>{" "}
          <strong className="text-primary-400 underline underline-offset-8">
            {t("hero.descriptionBold")}
          </strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onOpenContact}
          className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-black rounded-xl uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 focus:outline-none group"
        >
          <span>{t("hero.ctaFree")}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <a
          href="tel:+17863506367"
          className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] transition-all duration-300 hover:bg-white hover:text-slate-950 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 group"
        >
          <Phone className="w-4 h-4 text-primary-500 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110" />
          <span>(786) 350-6367</span>
        </a>
      </div>
    </div>
  </div>
));

HeroContent.displayName = "HeroContent";

export default function Hero() {
  const { t } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAnimate, setIsAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const heroContent = useMemo(() => [
    {
      title: t("hero.carousel.0"),
      imgDesktop: "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
      imgMobile: "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
    },
    {
      title: t("hero.carousel.1"),
      imgDesktop: "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
      imgMobile: "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
    },
    {
      title: t("hero.carousel.2"),
      imgDesktop: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp",
      imgMobile: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp",
    }
  ], [t]);

  const handleOpenContact = useCallback(() => setIsContactOpen(true), []);
  const handleCloseContact = useCallback(() => setIsContactOpen(false), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimate(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroContent.length);
        setIsAnimate(true);
      }, 600);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroContent.length]);

  return (
    <>
      <section className="relative h-[100svh] min-h-[700px] flex items-center pt-0 md:pt-5 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={isMobile ? heroContent[current].imgMobile : heroContent[current].imgDesktop}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.3] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-20 w-full mt-12 md:mt-24">
            <HeroContent
              t={t}
              onOpenContact={handleOpenContact}
              current={current}
              isAnimate={isAnimate}
              heroContent={heroContent}
            />
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
          <div
            className="h-full bg-primary-600 transition-all"
            style={{
              width: isAnimate ? "100%" : "0%",
              transitionDuration: isAnimate ? "5000ms" : "0ms",
            }}
          />
        </div>
      </section>

      <ContactForm isOpen={isContactOpen} onClose={handleCloseContact} />
    </>
  );
}