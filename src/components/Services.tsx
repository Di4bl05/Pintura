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
    const data = (t as any)(`servicesdetails.${service.key}`, {
      returnObjects: true,
      defaultValue: {},
    });

    const premium = t("servicesdetails.premium");

    setSelectedServiceData({
      ...data,
      img: service.img,
      premium,
    });
    setIsDetailsOpen(true);
  };

  const services = [
    { key: "exterior", img: getStaticGalleryImageUrl("exteriorAfter") },
    { key: "interior", img: getStaticGalleryImageUrl("exteriorBefore") },
    { key: "pressure", img: getStaticGalleryImageUrl("pressureWash") },
    { key: "repair", img: getStaticGalleryImageUrl("exterior2After") },
  ];

  const serviceAreas = ["Orlando", "Kissimmee", "Windermere", "Winter Park", "Lake Nona"];

  return (
    <section id="services" className="relative py-24 sm:py-32 md:py-48 lg:py-64 overflow-hidden bg-white">
      <div className="absolute top-0 left-[-10%] w-[30rem] md:w-[70rem] h-[30rem] md:h-[70rem] bg-white rounded-full blur-[100px] md:blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-12 md:mb-20">
          <div className="max-w-4xl">
            <h2 className="flex flex-col gap-1 mb-6 md:mb-8">
              <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 uppercase leading-[0.95]">
                {t("services.title")}
              </span>
              <span className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-5xl italic text-primary-600 leading-none">
                {t("services.titleHighlight")}
              </span>
            </h2>
            <p className="font-sans text-sm lg:text-lg text-slate-500 font-medium leading-relaxed max-w-full">
              {t("services.subtitle")}
            </p>
          </div>
        </div>

        <div className="relative group/carousel mb-16 md:mb-24">
         <button
  onClick={() => scroll("left")}
  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl"
>
  <ChevronLeft className="w-8 h-8" />
</button>

<button
  onClick={() => scroll("right")}
  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl"
>
  <ChevronRight className="w-8 h-8" />
</button>

         <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1"
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex-none snap-start"
            >
              <div 
                onClick={() => handleOpenDetails(service)}
                className="group/card relative flex-shrink-0 w-[85vw] aspect-[2/3] md:w-[400px] md:h-[600px] md:aspect-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-2xl transition-all duration-700"
              >
                <Image
                  src={service.img}
                  alt={t(`services.${service.key}.title`)}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-1000"
                />
                
                {/* Overlay de información */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 md:p-14 flex flex-col justify-end">
                  <h3 className="font-display text-xl md:text-2xl lg:text-2xl font-bold text-white uppercase tracking-tighter leading-[0.85] mb-3 md:mb-7 transform transition-transform duration-700 group-hover/card:-translate-y-2">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  
                  <button className="flex items-center gap-4 text-white font-sans text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] group/btn w-fit transform transition-transform duration-700 group-hover/card:-translate-y-1">
                    <span className="border-b-2 border-white/20 group-hover/btn:border-white pb-1 transition-colors">
                      {t("services.moreInfo")}
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="font-sans text-[9px] sm:text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
              {t("services.zone")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-12 gap-y-4">
            {serviceAreas.map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                <span className="font-sans text-[9px] sm:text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  {city}
                </span>
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}