"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, Check, ShieldCheck, MapPin, Building2, Palette } from "lucide-react";
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
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
      
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
    <section id="services" className="relative pt-24 pb-32 overflow-hidden antialiased bg-white">
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="container relative z-10 px-6 mx-auto">
        {/* HEADER */}
        <div className="relative max-w-5xl px-2 mx-auto mb-12 text-center md:mb-20 md:px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-blue-600 border border-blue-500 mb-6 md:mb-8 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-4 h-4 text-white md:w-5 md:h-5" />
            <span className="text-xs font-black text-white uppercase tracking-[0.25em]">
              {t("services.badge")}
            </span>
          </div>

          <div className="grid grid-rows-[130px_auto] md:grid-rows-[220px_auto] items-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.95] md:leading-[0.9] flex flex-col items-center">
                <span className="block">{t("services.title")}</span>
                <span className="relative inline-block italic text-blue-600">
                  {t("services.titleHighlight")}
                  <div className="absolute left-0 w-full h-3 rounded-full -bottom-2 bg-blue-600/10 -rotate-1 -z-10" />
                  <div className="absolute -bottom-1 left-0 w-3/4 h-1.5 bg-blue-600 rounded-full -rotate-1" />
                </span>
              </h2>
            </div>
            <div className="flex items-start justify-center pt-6 min-h-[80px]">
              <p className="max-w-2xl mx-auto text-xl italic font-medium leading-relaxed text-slate-500">
                {t("services.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative group mb-14 md:mb-24">
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div ref={scrollRef} className="flex gap-8 px-4 pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:px-12">
            {services.map((service, index) => (
              <div key={index} className="flex-[0_0_88%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center">
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 h-full flex flex-col transition-all duration-700 hover:-translate-y-5 hover:rotate-1 hover:shadow-[20px_40px_80px_rgba(15,23,42,0.15)]">
                  
                  <div className="relative overflow-hidden h-72">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                    <div className="absolute text-center bottom-4 md:bottom-6 left-5 md:left-8 right-5 md:right-8 md:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic min-h-[48px] md:min-h-[60px] flex items-end justify-center md:justify-start leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-8">
                    {/* SECCIÓN DE PRECIO Y DESCRIPCIÓN ELIMINADA PARA ACORTAR LA TARJETA */}
                    
                    <ul className="flex-grow mb-10 space-y-4">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="grid grid-cols-[16px_1fr] md:grid-cols-[18px_1fr] items-start gap-2.5 md:gap-3 text-slate-800 text-[12px] md:text-[13px] font-bold uppercase text-left">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 stroke-[4px] mt-0.5" />
                          <span className="leading-tight">{t(`services.${service.key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="group/btn relative overflow-hidden flex items-center justify-center gap-3 w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg"
                    >
                      <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-blue-600 group-hover/btn:translate-y-0" />
                      <span className="relative z-10 text-center">{t("services.moreInfo")}
                        
                      </span>
                      <ArrowRight className="relative z-10 flex-shrink-0 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>

                    <Link
                      href={`/servicios/${service.key}`}
                      className="mt-3 inline-flex items-center justify-center w-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 hover:text-slate-900 transition-colors"
                    >
                      Ver pagina del servicio
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BADGE DE CONFIANZA */}
        <div className="max-w-4xl px-2 mx-auto mb-10 md:px-4 md:mb-16">
          <div className="relative p-0.5 rounded-[2rem] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl">
            <div className="relative bg-slate-950 rounded-[1.9rem] px-5 py-7 md:px-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 overflow-hidden">
              <div className="relative z-10 flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 mb-4">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black text-blue-100 uppercase tracking-[0.2em]">
                    {t("services.localApproved")}
                  </span>
                </div>
                <h4 className="mb-2 text-xl italic font-black leading-tight tracking-tighter text-white uppercase md:text-2xl">
                  {t("services.coveragePre")} <span className="text-blue-400">{t("services.coverageRegion")}</span>
                </h4>
                <p className="max-w-xl mx-auto text-xs font-bold leading-relaxed tracking-tight uppercase md:text-sm text-slate-300 md:mx-0">
                  {t("services.serviceAreas")}
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <div className="flex flex-col items-center justify-center w-24 h-24 border-4 rounded-full shadow-2xl md:w-32 md:h-32 border-slate-900 bg-slate-900">
                  <div className="flex gap-1 mb-0.5 md:mb-1">
                    <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                    <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                  </div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">{t("services.statusLabel")}</span>
                  <span className="text-[10px] md:text-sm font-black text-white uppercase italic leading-none text-center">
                    {t("services.expertLine1")}<br/>{t("services.expertLine2")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-400/60 z-10">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-900/10 to-transparent blur-xl -z-10" />
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceData={selectedServiceData} 
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}