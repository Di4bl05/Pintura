"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t } = useLanguage();

  const heroContent = [
    { title: t("hero.carousel.0"), img: "/images/gallery/pintura-interiores-casas-orlando-fl.webp" },
    { title: t("hero.carousel.1"), img: "/images/gallery/pintores-exteriores-residenciales-orlando.webp" },
    { title: t("hero.carousel.2"), img: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp" }
  ];

  const [current, setCurrent] = useState(0);
  const [isAnimate, setIsAnimate] = useState(true);

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
    <section className="relative h-screen min-h-[750px] flex items-center pt-28 overflow-hidden bg-slate-950">
      
      {/* SEO & Performance: LCP Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          key={heroContent[current].img}
          src={heroContent[current].img}
          alt={`Professional Painting Services in Orlando - ${heroContent[current].title}`}
          fill
          priority
          className="object-cover transition-all duration-1000 brightness-[0.3] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="max-w-4xl">
          
          {/* Eyebrow Text (Pre-título): Marketing de Confianza */}
          <span className="font-serif block text-primary-400 text-lg md:text-xl lg:text-2xl mb-3 italic tracking-tight opacity-90">
            {t("hero.title1")}
          </span>

          {/* H1: SEO Goldmine - El tamaño ahora es dominante pero controlado */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-white leading-[0.85] tracking-tightest uppercase mb-6 drop-shadow-2xl">
            {t("hero.title2")}
          </h1>

          {/* Carrusel: Ajustado de tamaño (Bajamos el peso visual de Interior/Exterior) */}
          <div className="h-8 md:h-10 overflow-hidden mb-8 border-l-2 border-primary-600/30 pl-4">
            <p className={`font-sans text-sm md:text-lg font-bold text-primary-100/40 uppercase tracking-[0.4em] transition-all duration-700
              ${isAnimate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              {heroContent[current].title}
            </p>
          </div>

          {/* Descripción: Optimizada para lectura rápida (Marketing) */}
          <div className="max-w-lg mb-12">
            <p className="font-sans text-sm md:text-base text-slate-400 leading-relaxed font-light">
              <span className="text-slate-200">{t("hero.description")}</span>{" "}
              <strong className="text-primary-400 font-bold decoration-primary-500/30 underline underline-offset-8">
                {t("hero.descriptionBold")}
              </strong>
            </p>
          </div>

          {/* CTAs: Foco en Conversión */}
          <div className="flex flex-wrap gap-5">
            <Link
              href="#contact"
              className="font-sans group px-12 py-5 bg-primary-600 hover:bg-primary-500 text-white font-black rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-4 uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-primary-900/40"
            >
              <span>{t("hero.ctaFree")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>

            <a
              href="tel:+17863506367"
              className="font-sans px-12 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] group"
            >
              <Phone className="w-4 h-4 text-primary-500 group-hover:rotate-12 transition-transform" />
              <span>(786) 350-6367</span>
            </a>
          </div>
        </div>
      </div>

      {/* Progress Bar: Micro-interacción de retención */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full z-20">
        <div
          className="h-full bg-primary-600 transition-all ease-linear shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          style={{
            width: isAnimate ? "100%" : "0%",
            transitionDuration: isAnimate ? "5000ms" : "0ms"
          }}
        ></div>
      </div>
    </section>
  );
}