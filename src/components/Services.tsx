"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft, Check, ShieldCheck } from "lucide-react";
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

  return (
    <section id="services" className="relative pt-12 md:pt-24 pb-20 md:pb-32 overflow-hidden antialiased bg-white">
      {/* Glow de fondo adaptado a pantallas pequeñas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-1/4 w-[30rem] md:w-[60rem] h-[30rem] md:h-[60rem] bg-blue-100 rounded-full blur-[80px] md:blur-[150px] pointer-events-none -z-10 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        
        {/* ENCABEZADO: Responsive h2 y paddings */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-12 mb-10 md:mb-16 items-start lg:items-center">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-blue-600 mb-4 md:mb-6 shadow-xl shadow-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em]">
                {t("services.badge")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.95] md:leading-[0.9]">
              {t("services.title")}<br/>
              <span className="relative inline-block text-blue-600 italic mt-1 md:mt-2">
                {t("services.titleHighlight")}
                <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1.5 md:h-2 bg-blue-600/10 rounded-full -z-10" />
              </span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mt-6 md:mt-8 italic leading-relaxed border-l-2 border-blue-600 pl-4 md:pl-6">
              {t("services.subtitle")}
            </p>
          </div>
        </div>

        {/* CARRUSEL DE SERVICIOS */}
        <div className="relative group mb-8 md:mb-24">
          {/* Botones de scroll: solo visibles en desktop */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-slate-950 text-white border border-slate-800 rounded-2xl items-center justify-center shadow-xl hover:bg-blue-600 transition-all hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Contenedor scrollable con snapping mejorado para móvil */}
          <div 
            ref={scrollRef} 
            className="flex gap-4 md:gap-8 pb-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
          >
            {services.map((service, index) => (
              <div key={index} className="flex-[0_0_88%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center">
                <div className="group/card relative bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-200/60 h-full flex flex-col transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2">
                  
                  {/* Imagen optimizada para altura responsive */}
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
                    <ul className="flex-grow mb-6 md:mb-8 space-y-3 md:space-y-4">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-800 text-[11px] md:text-[13px] font-bold uppercase text-left tracking-tight">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 md:mt-0" />
                          <span className="leading-tight">{t(`services.${service.key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full bg-slate-950 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98]"
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
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-slate-950 text-white border border-slate-800 rounded-2xl items-center justify-center shadow-xl hover:bg-blue-600 transition-all hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicador visual de scroll para móvil (opcional pero ayuda a UX) */}
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

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] md:h-[2px] bg-slate-100 z-10">
        <div className="absolute inset-x-0 top-0 h-10 md:h-16 bg-gradient-to-b from-slate-900/5 to-transparent blur-xl -z-10" />
      </div>
    </section>
  );
}