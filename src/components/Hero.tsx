"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t } = useLanguage();
  
  const heroContent = [
    { title: "Transforma tu hogar", img: "/images/gallery/acabado-perfecto.png" },
    { title: "Pasión en cada detalle", img: "/images/gallery/acabado-perfecto1.png" },
    { title: "Acabados de excelencia", img: "/images/gallery/acabado-perfecto2.png" }
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
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gray-950 will-change-transform">
      
      {/* --- FONDO --- */}
      <div className="absolute inset-0 z-0">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.img}
              alt="Professional painting"
              className="object-cover w-full h-full transform-gpu"
              loading="eager"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-8">
        <div className="max-w-4xl space-y-6"> 
          
          <div className="space-y-0"> {/* Eliminamos espacio entre h1 y p para control total */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              {/* Ajustado mb-1 para una separación mínima pero limpia */}
              <span className="block opacity-90 mb-1 uppercase">
                {t("hero.title1")}
              </span>
              
              {/* Contenedor optimizado: py-2 y h-[1.4em] para que la 'g' respire sin alejarse tanto */}
              <span className="relative block h-[1.4em] overflow-hidden py-2">
                <span 
                  className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300 transition-[transform,opacity] duration-700 ease-out pb-4
                  ${isAnimate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  {heroContent[current].title}
                </span>
              </span>
            </h1>
            
            {/* Margen superior reducido para el párrafo */}
            <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed font-light mt-2">
              {t("hero.description")} 
              <span className="font-semibold text-white ml-2 border-b-2 border-blue-500"> 
                {t("hero.descriptionBold")}
              </span>
            </p>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact"
              className="group relative overflow-hidden px-8 py-4 bg-blue-600 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">{t("hero.ctaFree")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </Link>

            <a
              href="tel:+17863506367"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              <span>(786) 350-6367</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-blue-600/30 w-full z-20">
        <div 
          className="h-full bg-blue-500 transition-[width] duration-[5000ms] linear"
          style={{ width: isAnimate ? '100%' : '0%' }}
        ></div>
      </div>
    </section>
  );
}