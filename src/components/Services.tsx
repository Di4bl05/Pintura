"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronLeft, Check, ShieldCheck, MapPin, Building2, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
// Asegúrate de que la ruta de importación sea la correcta según tu estructura
import ServiceModal from "./ServiceModal"; 

export default function Services() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ESTADOS PARA EL MODAL
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

  // LOGICA CORREGIDA: Recibe el objeto service completo e inyecta la imagen
  const handleOpenDetails = (service: { key: string; img: string }) => {
    // 1. Obtenemos el objeto base del JSON (cast como any para evitar errores de tipo)
    const data = (t as any)(`services.${service.key}`, { returnObjects: true });
    
    // 2. Inyectamos la imagen del objeto de servicios al objeto de datos del modal
    const dataWithImg = {
      ...data,
      img: service.img
    };

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
    <section id="services" className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-[#f8fafc] overflow-hidden antialiased">
      
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20 relative px-2 md:px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-blue-600 border border-blue-500 mb-6 md:mb-8 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-xs font-black text-white uppercase tracking-[0.25em]">
              {t("services.badge")}
            </span>
          </div>

          <div className="grid grid-rows-[130px_auto] md:grid-rows-[220px_auto] items-center">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.95] md:leading-[0.9] flex flex-col items-center">
                <span className="block">{t("services.title")}</span>
                <span className="relative inline-block text-blue-600 italic">
                  {t("services.titleHighlight")}
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-600/10 rounded-full -rotate-1 -z-10" />
                  <div className="absolute -bottom-1 left-0 w-3/4 h-1.5 bg-blue-600 rounded-full -rotate-1" />
                </span>
              </h2>
            </div>

            <div className="flex items-start justify-center pt-4 md:pt-6 min-h-[64px] md:min-h-[80px]">
              <p className="text-base md:text-xl text-slate-500 font-medium max-w-xl md:max-w-2xl mx-auto leading-relaxed italic px-2">
                {t("services.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative group mb-14 md:mb-24">
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-8 pb-8 md:pb-12 snap-x snap-mandatory scrollbar-hide px-2 md:px-12"
          >
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex-[0_0_82%] sm:flex-[0_0_76%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center mx-auto"
              >
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 h-full flex flex-col transition-all duration-700 hover:-translate-y-5 hover:rotate-1 hover:shadow-[20px_40px_80px_rgba(15,23,42,0.15)]">
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                    <div className="absolute bottom-4 md:bottom-6 left-5 md:left-8 right-5 md:right-8 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic min-h-[48px] md:min-h-[60px] flex items-end justify-center md:justify-start leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 md:p-8 flex flex-col flex-grow text-center md:text-left">
                    <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-slate-50 pb-3 md:pb-4 gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{t("services.finishLabel")}</span>
                      <span className="text-lg md:text-xl font-black text-blue-600">{t(`services.${service.key}.price`)}</span>
                    </div>

                    <div className="min-h-[72px] md:min-h-[85px]">
                      <p className="text-slate-500 text-sm mb-5 md:mb-8 line-clamp-3 font-medium italic leading-relaxed">
                        {t(`services.${service.key}.description`)}
                      </p>
                    </div>

                    <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-10 flex-grow max-w-[280px] md:max-w-none mx-auto md:mx-0">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="grid grid-cols-[16px_1fr] md:grid-cols-[18px_1fr] items-start gap-2.5 md:gap-3 text-slate-800 text-[12px] md:text-[13px] font-bold uppercase text-left">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 stroke-[4px] mt-0.5" />
                          <span className="leading-tight">{t(`services.${service.key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* BOTÓN CORREGIDO: Pasa el objeto 'service' entero */}
                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="group/btn relative overflow-hidden flex items-center justify-center w-full bg-slate-950 text-white py-3.5 md:py-5 rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-[0.18em] md:tracking-[0.2em] transition-all duration-300 shadow-lg"
                    >
                      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 flex-1 text-center">{t("services.moreInfo")}</span>
                      <ArrowRight className="relative z-10 w-4 h-4 group-hover/btn:translate-x-2 transition-transform flex-shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BADGE DE CONFIANZA */}
        <div className="max-w-4xl mx-auto px-2 md:px-4 mb-10 md:mb-16">
          <div className="relative p-0.5 rounded-[2rem] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl">
            <div className="relative bg-slate-950 rounded-[1.9rem] px-5 py-7 md:px-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 overflow-hidden">
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 mb-4">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black text-blue-100 uppercase tracking-[0.2em]">
                    {t("services.localApproved")}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight italic mb-2">
                  {t("services.coveragePre")} <span className="text-blue-400">{t("services.coverageRegion")}</span>
                </h4>
                <p className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-tight leading-relaxed max-w-xl mx-auto md:mx-0">
                  {t("services.serviceAreas")}
                </p>
              </div>

              <div className="flex-shrink-0 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-900 bg-slate-900 shadow-2xl flex flex-col items-center justify-center">
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

      {/* COMPONENTE MODAL AL FINAL */}
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