"use client";

import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useMemo, memo } from "react";
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";
import { useSmartLink } from "@/hooks/useSmartLink";

const HeroContent = memo(({ t, onOpenContact, current, isAnimate, heroContent, handlePhoneClick }: any) => {
  const luisPhone = "+1 (786) 350-6367";

  return (
    <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
      <div className="max-w-4xl mt-6 sm:mt-0">
        <span className="font-serif text-primary-400  sm:text-lg md:text-xl lg:text-xl mb-5 italic">
          {t("hero.title1")}
        </span>

        <h1 className="font-serif text-5xl md:text-4xl lg:text-7xl xl:text-[7rem]  text-white leading-[0.92]  mb-7 drop-shadow-2xl">
          {t("hero.title2")}
        </h1>

        <div className="h-10 overflow-hidden mb-10 border-l-2 border-primary-600/30 pl-4">
          <p
            className={`font-sans text-[12px] md:text-lg text-primary-100/60 uppercase tracking-[0.35em] transition-all duration-700
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
            onClick={(e) => {
              e.preventDefault();
              onOpenContact();
            }}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-sans rounded-xl uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 focus:outline-none group"
          >
            <span>{t("hero.ctaFree")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href={`tel:${luisPhone.replace(/\D/g, "")}`}
            onClick={handlePhoneClick(luisPhone)}
            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-white/5 border border-white/10 text-white  rounded-xl flex items-center justify-center gap-3 text-[10px] tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-slate-950 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 group"
          >
            <Phone className="w-4 h-4 text-primary-500 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110" />
            <span>(786) 350-6367</span>
          </a>
        </div>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  const { t } = useLanguage();
  const { handlePhoneClick } = useSmartLink();
  const [current, setCurrent] = useState(0);
  const [isAnimate, setIsAnimate] = useState(true);

  const heroContent = useMemo(() => [
    {
      title: t("hero.carousel.0"),
      imgDesktop: getStaticGalleryImageUrl("cabinet"),
      imgMobile: getStaticGalleryImageUrl("cabinet"), 
    },
    {
      title: t("hero.carousel.1"),
      imgDesktop: getStaticGalleryImageUrl("repair"),
      imgMobile: getStaticGalleryImageUrl("repair"), 
    },
    {
      title: t("hero.carousel.2"),
      imgDesktop: getStaticGalleryImageUrl("pressure1"),
      imgMobile: getStaticGalleryImageUrl("pressure1"),
    }
  ], [t]);

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
    <section className="relative h-[100svh] min-h-[700px] flex items-center pt-0 md:pt-5 bg-slate-950 overflow-hidden">
      
      {/* SECCIÓN DE FOTOS ADAPTADA AL ANCHO TOTAL Y SIN ZOOM CORRECTO */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <picture className="w-full h-full">

          {/* Si el cliente entra desde celular (pantalla menor a 768px), usa imgMobile instantáneamente */}
          <source media="(max-width: 767px)" srcSet={heroContent[current].imgMobile} />
          <img
            src={heroContent[current].imgDesktop}
            alt="Hero background"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.35] transition-opacity duration-700 ease-in-out"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
      </div>

      <div className="relative z-20 w-full mt-12 md:mt-24">
        <HeroContent
          t={t}
          onOpenContact={onOpenContact} 
          current={current}
          isAnimate={isAnimate}
          heroContent={heroContent}
          handlePhoneClick={handlePhoneClick}
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
  );
}