"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import ServiceDetail from "./ServiceDetails";
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";

interface ServicesProps {
  onOpenContact: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
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

  // Extraemos datos del JSON de traducción
  const locations = t("serviceAreas.locations", { returnObjects: true }) || [];
  const counties = t("serviceAreas.counties", { returnObjects: true }) || [];

  return (
    <section id="services" className="relative py-24 sm:py-32 md:py-48 lg:py-64 overflow-hidden bg-white">
      <div className="absolute top-0 left-[-10%] w-[30rem] md:w-[70rem] h-[30rem] md:h-[70rem] bg-white rounded-full blur-[100px] md:blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:pl-10 lg:pr-20">
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
            <p className="font-sans text-sm lg:text-lg text-slate-600 font-medium leading-relaxed max-w-full">
              {t("services.subtitle")}
            </p>
          </div>
        </div>

        <div className="relative group/carousel mb-16 md:mb-24">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl active:scale-90"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl active:scale-90"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-12 overflow-x-auto overflow-y-hidden snap-x snap-mandatory touch-action-pan-y scroll-smooth scrollbar-hide"
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none snap-center md:snap-start">
                <div 
                  onClick={() => handleOpenDetails(service)}
                  className="group/card relative flex-shrink-0 w-[80vw] aspect-[3/4] md:w-[450px] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-2xl transition-all duration-700 select-none"
                >
                  <Image
                    src={service.img}
                    alt={t(`services.${service.key}.title`)}
                    fill
                    className="object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 md:p-14 flex flex-col justify-end">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter leading-[0.85] mb-3 md:mb-7 transform transition-transform duration-700 group-hover/card:-translate-y-2">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <div className="flex items-center gap-4 text-white font-sans text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] group/btn w-fit transform transition-transform duration-700 group-hover/card:-translate-y-1">
                      <span className="border-b-2 border-white/20 group-hover/btn:border-white pb-1 transition-colors">
                        {t("services.moreInfo")}
                      </span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-slate-100 pt-16">
          <div className="flex flex-col items-center mb-16 lg:mb-24 text-center">
           
            <h3 className="font-display text-3xl lg:text-[50px] font-bold text-slate-900">
              {t("serviceAreas.primaryRegion")}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-32 gap-y-10 max-w-5xl mx-auto px-4">
             {Array.isArray(locations) && locations.map((loc: any, i: number) => (
          <div key={i} className="flex flex-col items-start text-left">
              <h4 className="font-body text-[12px] lg:text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 mb-3 border-b border-slate-100 pb-1 w-full">
                {loc.city}
              </h4>
      <div className="flex flex-col items-start justify-start gap-y-2">
        {loc.strategic_zones?.map((zone: string, zIdx: number) => (
          <span 
            key={zIdx} 
            className="font-sans text-sm lg:text-[15px] text-slate-500 font-medium leading-tight hover:text-primary-600 transition-colors cursor-default"
          >
            {zone}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>
          <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-50 pt-8">
            {Array.isArray(counties) && counties.map((county: string, i: number) => (
              <span key={i} className="font-sans text-[10px] lg:text-[12px] font-bold text-slate-500 uppercase">
                {county}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ServiceDetail
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        serviceData={selectedServiceData}
        onOpenContact={onOpenContact}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}