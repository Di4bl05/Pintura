"use client";

import Image from "next/image";
import { 
  Phone, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";
import { useSmartLink } from "@/hooks/useSmartLink";

interface WhyChooseProps {
  onOpenContact: () => void;
}

export default function WhyChooseClean({ onOpenContact }: WhyChooseProps) {
  const { t } = useLanguage();
  const { handlePhoneClick } = useSmartLink();
  const luisPhone = "+1 (786) 350-6367";

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
  
  const { leftCol, rightCol } = useMemo(() => ({
    leftCol: differences.slice(0, 4),
    rightCol: differences.slice(4)
  }), [differences]);

  const hookText = t("whyChoose.core_value_proposition.hook") || "Resultados de Élite, Precios de Realidad";
  const [hookMain, hookItalic] = hookText.includes(',') ? hookText.split(',') : [hookText, ""];

  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 md:py-48 lg:py-64 overflow-hidden antialiased bg-[#F5F5F7]">
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
                  Luis & Bety • Orlando FL
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start text-left mb-14 space-y-6">
          <h2 className="flex flex-col max-w-2xl text-left">
            <span className="font-display text-3xl md:text-6xl font-bold text-slate-950 uppercase tracking-tighter leading-[0.9]">
              {hookMain}
            </span>
            {hookItalic && (
              <span className="font-serif text-2xl md:text-5xl italic font-normal text-primary-600 mt-1">
                {hookItalic}
              </span>
            )}
          </h2>
          <p className="font-sans text-sm md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            {t("whyChoose.core_value_proposition.description")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-end">
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 w-full">
            {leftCol.map((item) => (
              <Card item={item} config={iconConfigs[item.id]} key={item.id} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 w-full h-full justify-end">
            {rightCol.map((item) => (
              <Card item={item} config={iconConfigs[item.id]} key={item.id} />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 sm:flex-row justify-center items-center">
        <button
        type="button"
        onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        requestAnimationFrame(() => {
          onOpenContact();
        });
      }}
      className="group relative overflow-hidden inline-flex items-center justify-center gap-4 bg-slate-950 text-white transition-all duration-700 ease-in-out font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-primary-600/20 active:scale-95 w-full h-[50px] px-6 text-[9px] rounded-2xl md:rounded-xl md:w-auto md:min-h-16 md:px-12 md:py-5 md:text-[10px]"
      >
        <span className="absolute inset-0 w-0 bg-primary-600 transition-all duration-500 ease-out group-hover:w-full" />
        <span className="relative z-10 flex items-center gap-3">
          {t("hero.ctaFree")}
          <ArrowRight className="md:text-lg transition-transform duration-500 group-hover:translate-x-2" />
          </span>
          </button>
          <a
            href={`tel:${luisPhone.replace(/\D/g, "")}`}
            onClick={handlePhoneClick(luisPhone)}
            className="inline-flex items-center justify-center gap-4 bg-primary-600 border-primary-600 text-slate-100 transition-all duration-300 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[50px] px-6 text-[9px] rounded-2xl md:w-auto md:min-h-16 md:px-12 md:py-5 md:text-[10px] md:rounded-xl hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 focus:outline-none group"
          >
            <Phone className="w-4 h-4" />
            <span>{luisPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ item, config }: { item: any; config: any }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 md:p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <div className="hidden md:block relative flex-shrink-0 w-16 h-16">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config?.grad} shadow-md`} />
        <div className="relative w-full h-full flex items-center justify-center text-white text-2xl font-bold">
          {config?.sym}
        </div>
      </div>

      <div className="space-y-3 flex-1 text-left">
        <h3 className="font-display font-black tracking-tight uppercase text-slate-950 leading-tight text-[17px] md:text-xl">
          {item.label}
        </h3>
        <p className="font-sans text-sm md:text-lg leading-snug text-slate-600">
          {item.argument} 
        </p>
        <div className="pt-3 border-t border-slate-200 w-full mt-1">
          <span className="font-sans text-primary-600 text-sm md:text-lg md:font-normal">
            • {item.benefit}
          </span>
        </div>
      </div>
    </div>
  );
}