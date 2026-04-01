"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react"; 
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import ServiceDetail from "./ServiceDetails"; 

export default function Services() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); 
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
    setIsDetailsOpen(true);
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
      className="relative py-20 lg:py-32 overflow-hidden antialiased bg-white"
    >
      {/* Círculo de fondo decorativo original */}
      <div className="absolute top-0 left-1/4 w-[60rem] h-[60rem] bg-primary-50 rounded-full blur-[120px] pointer-events-none -z-10 opacity-60" />

      {/* Contenedor con el margen izquierdo grabado (lg:px-16) */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        
        {/* ENCABEZADO */}
        <div className="max-w-5xl text-left mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-600 mb-8 shadow-xl shadow-primary-100 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-sans text-[10px] font-bold text-white uppercase tracking-[0.3em]">
              {t("services.badge") || "PORTAFOLIO DE EXCELENCIA"}
            </span>
          </div>

          <h2 className="flex flex-col mb-10">
            <span className="font-display text-5xl md:text-8xl font-bold text-slate-950 uppercase tracking-tightest leading-[0.9]">
              {t("services.title")}
            </span>
            <span className="font-serif text-4xl md:text-7xl italic font-normal text-primary-600 block leading-none mt-2">
              {t("services.titleHighlight")}
            </span>
          </h2>

          <div className="flex gap-6 items-stretch mb-12">
            <div className="w-[2px] bg-primary-600 rounded-full flex-shrink-0" />
            <p className="font-sans text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-xl">
              {t("services.subtitle")}
            </p>
          </div>

          {/* ÁREAS DE SERVICIO */}
          <div className="flex flex-col gap-5 mt-12"> 
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Zonas de Operación Actual
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {serviceAreas.map((city) => (
                <span 
                  key={city} 
                  className="font-sans px-4 py-2.5 rounded-xl border border-slate-100 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest transition-all cursor-default hover:bg-primary-600 hover:text-white hover:border-primary-600 active:scale-95 shadow-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="relative group mb-12">
          {/* Botones de navegación ajustados */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white text-primary-700 border border-slate-100 rounded-full items-center justify-center shadow-xl hover:bg-primary-600 hover:text-white transition-all hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef} 
            className="flex gap-6 md:gap-10 pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
          >
            {services.map((service, index) => (
              <div key={index} className="flex-[0_0_90%] sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0 snap-center">
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-700 hover:shadow-2xl">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-10">
                    <ul className="flex-grow mb-10 space-y-4">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            {t(`services.${service.key}.features.${i}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="font-sans group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full bg-slate-950 text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                      <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-300 group-hover/btn:translate-y-0" />
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
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white text-primary-700 border border-slate-100 rounded-full items-center justify-center shadow-xl hover:bg-primary-600 hover:text-white transition-all hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
     {/* SEPARADOR INFERIOR - Estilo Revista con Línea Original */}
<div className="-mb-32 lg:mt-40 w-full flex items-center justify-center"> 
  <div className="flex items-center gap-8 w-full max-w-[1440px] px-6 lg:px-16">
    {/* Línea Izquierda */}
    <div className="h-[1px] flex-grow bg-slate-200" />
    
    {/* Bloque Central */}
    <div className="flex items-center gap-4 bg-slate-50 px-8 py-3 rounded-full border border-slate-100 flex-shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
      <span className="font-sans text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
        Before-After-Gallery
      </span>
      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
    </div>

    {/* Línea Derecha */}
    <div className="h-[1px] flex-grow bg-slate-200" />
  </div>
</div>

      <ServiceDetail 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        serviceData={selectedServiceData} 
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}