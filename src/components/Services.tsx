"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react"; 
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import ServiceModal from "./ServiceModal"; 

export default function Services() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceData, setSelectedServiceData] = useState<any>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 1.2 
        : scrollLeft + clientWidth / 1.2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleOpenDetails = (service: { key: string; img: string }) => {
    const data = (t as any)(`services.${service.key}`, { returnObjects: true });
    const dataWithImg = { ...data, img: service.img };
    setSelectedServiceData(dataWithImg);
    setIsModalOpen(true);
  };

  const services = [
    { key: "exterior", img: "/images/gallery/pintores-exteriores-residenciales-orlando.webp" },
    { key: "interior", img: "/images/gallery/pintura-interiores-casas-orlando-fl.webp" },
    { key: "pressure", img: "/images/gallery/pintura-interiores-casas-orlando-fl.webp" },
    { key: "repair", img: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp" }
  ];

  const serviceAreas = ["Orlando", "Kissimmee", "Windermere", "Winter Park", "Lake Nona"];

  return (
    <section 
      id="services" 
      className="relative pt-36 md:pt-24 pb-20 md:pb-32 overflow-hidden antialiased bg-white"
    >
      {/* Glow de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-1/4 w-[30rem] md:w-[60rem] h-[30rem] md:h-[60rem] bg-blue-50 rounded-full blur-[100px] pointer-events-none -z-10 opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        
        {/* ENCABEZADO */}
        <div className="max-w-5xl text-left mb-12 md:mb-20 px-4 md:px-0">
          
          {/* Badge Estilo Galería (Restaurado y Actualizado) */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 mb-8 shadow-xl shadow-blue-100 w-fit">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {t("services.badge") || "PORTAFOLIO DE EXCELENCIA"}
            </span>
          </div>

          {/* Títulos Masivos */}
          <h2 className="flex flex-col -space-y-1 md:-space-y-2 mb-10">
            <span className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase tracking-tighter leading-none">
              {t("services.title")}
            </span>
            <span className="text-4xl md:text-7xl font-black italic text-blue-600 uppercase tracking-tighter leading-none">
              {t("services.titleHighlight")}
            </span>
          </h2>

          {/* Bloque de Párrafo con línea azul */}
          <div className="flex gap-4 md:gap-6 items-stretch mb-10 md:mb-14">
            <div className="w-[2px] bg-blue-600 rounded-full flex-shrink-0" />
            <p className="text-base md:text-lg text-slate-500 font-medium italic leading-relaxed max-w-2xl">
              {t("services.subtitle")}
            </p>
          </div>

          {/* ÁREAS DE SERVICIO */}
          <div className="pl-[calc(1rem+2px)] md:pl-[calc(1.5rem+2px)] flex flex-col gap-5 mt-10"> 
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[11px] md:text-xs font-bold text-[#0f172a] uppercase tracking-[0.2em]">
                Zonas de Operación Actual
              </span>
            </div>

            {/* Píldoras Dark */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {serviceAreas.map((city) => (
                <span 
                  key={city} 
                  className="px-4 md:px-5 py-2.5 rounded-full bg-[#0f172a] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-default hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 active:scale-95"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARRUSEL DE SERVICIOS */}
        <div className="relative group mt-16 md:mt-24 mb-8 md:mb-12">
          {/* Botones de navegación (Desktop) */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white text-blue-700 border border-blue-500/10 rounded-2xl items-center justify-center shadow-xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef} 
            className="flex gap-4 md:gap-8 pb-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
          >
            {services.map((service, index) => (
              <div key={index} className="flex-[0_0_88%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center">
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2">
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-6 right-6 text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-6 md:p-8">
                    <ul className="flex-grow mb-6 md:mb-8 space-y-4 text-left">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 text-[11px] md:text-[12px] font-bold uppercase tracking-tight">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="leading-tight">{t(`services.${service.key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full bg-slate-950 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all"
                    >
                      <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover/btn:translate-y-0" />
                      <span className="relative z-10">{t("services.moreInfo")}</span>
                      <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white text-blue-700 border border-blue-500/10 rounded-2xl items-center justify-center shadow-xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots (Mobile) */}
        <div className="flex justify-center gap-2 md:hidden -mt-4">
          {services.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          ))}
        </div>
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceData={selectedServiceData} 
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
    </section>
  );
}