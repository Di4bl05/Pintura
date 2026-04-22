"use client";

import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
// 1. QUITAMOS useState y ContactForm de aquí
import { useSmartLink } from "@/hooks/useSmartLink"; 
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";

export default function WhyChooseClean() {
  const { t } = useLanguage();
  // 2. BORRAMOS EL ESTADO LOCAL (Ya no se usa aquí)
  
  const { handlePhoneClick } = useSmartLink();
  const phoneNumber = t("combined_conversion_section.cta_box.phone") || "(786) 350-6367";

  const iconConfigs: Record<string, { grad: string; sym: string }> = {
    price_disruption: { grad: "from-green-400 to-emerald-600", sym: "$" },
    time_efficiency: { grad: "from-amber-400 to-orange-500", sym: "⚡" },
    payment_commitment: { grad: "from-blue-500 to-cyan-600", sym: "🤝" },
    owner_on_site: { grad: "from-indigo-500 to-purple-600", sym: "🏠" },
    extreme_clean: { grad: "from-cyan-300 to-blue-500", sym: "✨" },
    bilingual_experience: { grad: "from-red-400 to-rose-600", sym: "🇺🇸" },
    support_24_7: { grad: "from-slate-700 to-slate-900", sym: "📞" }
  };

  const differences = ((t as any)("whyChoose.core_value_proposition.the_difference", { returnObjects: true }) as any[]) || [];
  const leftCol = differences.slice(0, 4);
  const rightCol = differences.slice(4);

  return (
    <section id="why-choose-us" className="relative py-16 md:py-20 lg:py-28 overflow-hidden antialiased bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 z-10 max-w-[1440px] relative">
        
        <div className="hidden md:block absolute top-0 right-30 lg:right-40 z-20 group">
          <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full p-2 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
              <Image 
                src={getStaticGalleryImageUrl("luisBety")}
                alt="Luis y Bety"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-10 -right-4 bg-white py-3 px-6 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.12)] border border-slate-50 transition-all duration-500 group-hover:-translate-y-2">
              <div className="flex flex-col gap-0.5">
                <p className="font-sans font-black text-[8px] tracking-[0.3em] text-primary-600 uppercase">
                  Painting Experts
                </p>
                <p className="font-sans font-black text-[10px] tracking-[0.1em] text-slate-950 uppercase">
                  Luis & Bety • Orlando, FL
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start text-left mb-10 md:mb-14 space-y-5 md:space-y-6">
       <h2 className="flex flex-col gap-1 mb-8 md:mb-10 text-left max-w-2xl">
         <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 uppercase tracking-tighter leading-[0.95]">
          {t("whyChoose.core_value_proposition.hookMain")}
          </span>
          <span className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic font-normal text-primary-600 leading-none">
            {t("whyChoose.core_value_proposition.hookItalic")}
            </span>
            </h2>

         <div className="flex items-stretch gap-5 md:gap-8 mb-8 md:mb-12">
          <div className="w-[2px] sm:w-[3px] flex-shrink-0 rounded-full bg-primary-600" />
          <p className="max-w-xl font-sans text-sm lg:text-lg font-medium leading-relaxed text-slate-500 opacity-90">
            {t("whyChoose.core_value_proposition.description")}
            </p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-8 items-end">
          <div className="flex-1 flex flex-col gap-5 md:gap-6 lg:gap-8 w-full">
            {leftCol.map((item: any) => (
              <Card item={item} config={iconConfigs[item.id]} key={item.id} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-5 md:gap-6 lg:gap-8 w-full h-full justify-end">
            {rightCol.map((item: any) => (
              <Card item={item} config={iconConfigs[item.id]} key={item.id} />
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-20 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <button
            type="button"
              onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            window.dispatchEvent(new CustomEvent("app:open-contact"));
         }}
            className="group relative overflow-hidden flex items-center justify-center gap-4 bg-slate-950 text-white px-8 py-5 md:px-12 rounded-[2rem] transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 w-full sm:w-auto active:scale-95"
          >
            <span className="absolute inset-0 w-0 bg-primary-600 transition-all duration-500 ease-out group-hover:w-full" />
            <span className="relative z-10 flex items-center gap-3">
              {t("combined_conversion_section.cta_box.action")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </span>
          </button>

          <a
            href={`tel:${phoneNumber}`}
            onClick={handlePhoneClick(phoneNumber)}
            className="flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-slate-950 px-8 py-5 md:px-12 rounded-[2rem] hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] w-full sm:w-auto active:scale-95"
          >
            <Phone className="w-4 h-4" />
            {phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ item, config }: { item: any; config: any }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <div className="hidden md:block relative flex-shrink-0 w-14 h-14">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config?.grad} shadow-md`} />
        <div className="relative w-full h-full flex items-center justify-center text-white text-2xl font-bold">
          {config?.sym}
        </div>
      </div>
      <div className="space-y-2 md:space-y-6 flex-1 text-left">
        <h3 className="text-lg md:text-xl font-black tracking-tight uppercase font-display text-slate-950 leading-tight">
          {item.label}
        </h3>
        <p className="font-sans text-sm md:text-base leading-relaxed text-slate-600">
          {item.argument} 
        </p>
        <div className="inline-block pt-3 border-t border-slate-200 w-full mt-1">
          <span className="font-medium text-primary-600 text-sm">
            • {item.benefit}
          </span>
        </div>
      </div>
    </div>
  );
}