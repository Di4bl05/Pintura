"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import ServiceDetail from "./ServiceDetails";
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";

export default function Services() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedServiceData, setSelectedServiceData] = useState<any>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 1.2
          : scrollLeft + clientWidth / 1.2;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleOpenDetails = (service: { key: string; img: string }) => {
    
    setSelectedServiceData({
      id: service.key,
      img: service.img,
      
      steps: [{}, {}, {}], 
    });

    setIsDetailsOpen(true);
  };

  const services = [
    {
      key: "exterior",
      img: getStaticGalleryImageUrl("exteriorAfter"),
    },
    {
      key: "interior",
      img: getStaticGalleryImageUrl("exteriorBefore"),
    },
    {
      key: "pressure",
      img: getStaticGalleryImageUrl("pressureWash"),
    },
    {
      key: "repair",
      img: getStaticGalleryImageUrl("exterior2After"),
    },
  ];

  const serviceAreas = [
    "Orlando",
    "Kissimmee",
    "Windermere",
    "Winter Park",
    "Lake Nona",
  ];

  return (
  <section
  id="services"
className="relative py-24 sm:py-32 md:py-48 overflow-hidden bg-[#F5F5F7]"
>
  {/* 1. BLOQUE DE TEXTO: Alineado a la izquierda del logo */}
  <div className="relative z-10 w-full">
    <div className="pl-6 md:pl-16 lg:pl-24 flex flex-col gap-12"> 
      <div className="max-w-5xl"> 
        <h2 className="flex flex-col gap-0 mb-8 md:mb-10">
          <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-950 uppercase leading-[1.1] tracking-tight">
            {t("services.title")}
          </span>
          <span className="font-serif text-2xl sm:text-3xl md:text-5xl italic text-primary-600 leading-tight">
            {t("services.titleHighlight")}
          </span>
        </h2>

        <p className="font-sans text-sm lg:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mb-12">
          {t("services.subtitle")}
        </p>

        {/* ZONAS */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-sans text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {t("services.zone")}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {serviceAreas.map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary-600/40" />
                <span className="font-sans text-[10px] md:text-[11px] font-black text-slate-600 uppercase tracking-widest">
                  {city}
                </span>
              </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* 1. CONTENEDOR MAESTRO: Rompe cualquier límite y ocupa el 100% de la pantalla del monitor */}
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
  
  <div
    ref={scrollRef}
    /* 2. EL TRACK DEL CARRUSEL: 
       - CERO PADDING IZQUIERDO. Empieza pegado al borde del monitor.
       - pr-[20vw] para dejar aire al final.
    */
    className="flex gap-6 md:gap-8 pb-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide pr-[20vw]"
  >
    
    {/* =========================================
        EL TRUCO DE TESLA: EL ESPACIADOR INVISIBLE
        Este div vacío es el que empuja la primera foto para que se alinee con tu logo.
        Al hacer scroll, las fotos se mueven hacia la izquierda ocupando este espacio hasta tocar el borde.
        *Nota: El 720px asume que tu max-w es 1440px (720 es la mitad). Si usas max-w-7xl (1280px), pon 640px.
        ========================================= */}
    <div className="shrink-0 w-[1.5rem] md:w-[calc(50vw-720px+1.5rem)] snap-start" />


    {services.map((service, index) => (
      <div
        key={index}
        /* Mantenemos tu ancho para que la foto no se deforme */
        className="shrink-0 w-[85%] md:w-[70%] lg:w-[60%] snap-start"
      >
        <div className="group/item flex flex-col">
          
          {/* CONTENEDOR DE LA IMAGEN */}
          <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-xl md:rounded-2xl mb-6 shadow-lg">
            <Image
              src={service.img}
              alt={t(`services.${service.key}.title`)}
              fill
              className="object-cover group-hover/item:scale-[1.02] transition-transform duration-[2s] ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* TÍTULO ELEGANTE */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h3 className="font-display text-2xl md:text-4xl lg:text-3xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                {t(`services.${service.key}.title`)}
              </h3>
            </div>
          </div>

          {/* INFO DEBAJO */}
          <div className="flex flex-col gap-4 px-1">
            <div className="max-w-2xl">
              <p className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                {t("services.include")}:
              </p>
              <p className="font-sans text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                {[0, 1, 2, 3]
                  .map((i) => t(`services.${service.key}.features.${i}`))
                  .join(", ")}
              </p>
            </div>

            <button
              onClick={() => handleOpenDetails(service)}
              className="group/btn flex items-center gap-2 text-slate-950 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] border-b border-slate-950 w-fit pb-1 hover:text-primary-600 transition-all"
            >
              <span>{t("services.moreInfo")}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

      <ServiceDetail
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        serviceData={selectedServiceData}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}