"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft, Check, Sparkles, MapPin } from "lucide-react"; 
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
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden antialiased bg-white">
      <div className="absolute top-0 left-[-10%] w-[60rem] h-[60rem] bg-slate-50/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 lg:mb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary-600 shadow-lg shadow-primary-100 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="font-sans text-[9px] font-black text-white uppercase tracking-[0.3em]">
                {t("services.badge")}
              </span>
            </div>

            <h2 className="flex flex-col gap-1 mb-8">
              <span className="font-display text-4xl md:text-6xl font-bold text-slate-950 uppercase tracking-tightest leading-[0.95]">
                {t("services.title")}
              </span>
              <span className="font-serif text-3xl md:text-6xl italic font-normal text-primary-600 leading-none">
                {t("services.titleHighlight")}
              </span>
            </h2>

            <p className="font-sans text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl border-l-2 border-primary-600 pl-8 mb-10">
              {t("services.subtitle")}
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="font-sans text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Active Service Zones
                </span>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {serviceAreas.map((city) => (
                  <div key={city} className="group relative flex items-center gap-2 py-1 cursor-default">
                    <MapPin className="w-3.5 h-3.5 text-primary-600" />
                    <span className="font-sans text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">
                      {city}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group/carousel">
          {/* BOTONES DE NAVEGACIÓN (FLECHAS) */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-40 w-12 h-12 bg-white text-slate-950 border border-slate-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-xl active:scale-90 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-40 w-12 h-12 bg-white text-slate-950 border border-slate-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-xl active:scale-90 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={scrollRef} className="flex gap-6 lg:gap-8 pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x">
            {services.map((service, index) => (
              <div key={index} className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_31%] min-w-0 snap-start">
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <Image src={service.img} alt={t(`services.${service.key}.title`)} fill className="object-cover transition-transform duration-[3000ms] group-hover/card:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="font-display text-xl lg:text-2xl font-bold text-white uppercase tracking-tight leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-8 lg:p-10">
                    <ul className="flex-grow mb-8 space-y-4">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-3.5 h-3.5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-[10px] lg:text-[11px] font-bold text-slate-600 uppercase tracking-wide leading-tight">
                            {t(`services.${service.key}.features.${i}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="font-sans group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-[9px] uppercase tracking-[0.25em] transition-all"
                    >
                      <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-300 group-hover/btn:translate-y-0" />
                      <span className="relative z-10">{t("services.moreInfo")}</span>
                      <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
         
       {/* SEPARADOR INTEGRADO - VISIBILIDAD MEJORADA */}
  <div className="absolute bottom-6 left-0 w-full translate-y-1/2 z-30 pointer-events-none">
  <div className="flex items-center gap-6 w-full max-w-[1440px] px-6 lg:px-16">
    <div className="h-[2px] flex-grow bg-slate-200" />
    <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-slate-200 flex-shrink-0 shadow-md">
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
      <span className="font-sans text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
        Section Portfolio
      </span>
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
    </div>
    <div className="h-[2px] flex-grow bg-slate-200" />
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

       {/* SEPARADOR INTEGRADO - VISIBILIDAD MEJORADA */}
  <div className="absolute bottom-6 left-0 w-full translate-y-1/2 z-30 pointer-events-none">
  <div className="flex items-center gap-6 w-full max-w-[1440px] px-6 lg:px-16">
    <div className="h-[2px] flex-grow bg-slate-200" />
    <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-slate-200 flex-shrink-0 shadow-md">
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
      <span className="font-sans text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
        Section Portfolio
      </span>
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
    </div>
    <div className="h-[2px] flex-grow bg-slate-200" />
  </div>
</div>
    </section>
  );
}