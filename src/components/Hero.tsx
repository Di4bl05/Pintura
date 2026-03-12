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
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-slate-950">
      
      {/* --- FONDO OPTIMIZADO CON NEXT/IMAGE --- */}
      <div className="absolute inset-0 z-0">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.img}
              alt="Luisbety Inc Professional Painting"
              fill
              priority={index === 0} // Prioridad de carga para la primera imagen (Mejora LCP)
              quality={75} // Optimización de peso
              sizes="100vw"
              className={`object-cover transform-gpu transition-transform duration-[7000ms] ease-linear brightness-[0.45] ${
                index === current ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
        {/* Overlays para asegurar que el texto sea legible y el logo resalte */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
        
        <div className="max-w-2xl">
          {/* Título Principal - Ajustado para que no se desplace a la derecha */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            <span className="block text-blue-400 text-lg md:text-2xl font-bold tracking-normal mb-2 normal-case italic">
              {t("hero.title1")}
            </span>
            <span className="block">
              Interior &<br /> Exterior
            </span>
          </h1>

          {/* Texto dinámico del carrusel */}
          <div className="h-12 md:h-16 mt-6 overflow-hidden">
            <p 
              className={`text-2xl md:text-3xl font-bold text-slate-200 transition-all duration-700 
              ${isAnimate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              {heroContent[current].title}
            </p>
          </div>

          {/* Descripción con Glassmorphism para legibilidad extrema */}
          <div className="mt-6 max-w-lg">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light bg-slate-900/40 backdrop-blur-sm p-4 rounded-xl border-l-4 border-blue-600">
              {t("hero.description")}{" "}
              <span className="font-bold text-white border-b-2 border-blue-600/50"> 
                {t("hero.descriptionBold")}
              </span>
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="#contact"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-full transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 uppercase text-sm tracking-widest"
            >
              <span>{t("hero.ctaFree")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>

            <a
              href="tel:+17863506367"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm tracking-widest"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              <span>(786) 350-6367</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra de Progreso */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-white/5 w-full z-20">
        <div 
          className="h-full bg-blue-600 transition-all ease-linear"
          style={{ 
            width: isAnimate ? '100%' : '0%', 
            transitionDuration: isAnimate ? '5000ms' : '0ms' 
          }}
        ></div>
      </div>
    </section>
  );
}