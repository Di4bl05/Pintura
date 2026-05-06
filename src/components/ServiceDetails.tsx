"use client";

import React, { useEffect, useRef } from "react";
import { X, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import { useSmartLink } from "@/hooks/useSmartLink";

interface ServiceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: any;
  onOpenContact: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  isOpen,
  onClose,
  serviceData,
  onOpenContact,
}) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { handlePhoneClick } = useSmartLink();
  const luisPhone = "+1 (786) 350-6367";

  const handleEstimateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onClose();

    requestAnimationFrame(() => {
      onOpenContact();
    });
  };

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.closest("a")) onClose();
    };

    if (isOpen) window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isOpen, onClose]);

  if (!isOpen || !serviceData) return null;

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto antialiased animate-in fade-in duration-500"
    >
      <Header forceSolid />

      <div className="px-6 pb-28 pt-28 md:pt-36 lg:px-24">
        <div className="mx-auto max-w-[1440px] relative">
          
          <div className="sticky top-[70px] md:top-[90px] z-[120] flex justify-end md:mb-1 pointer-events-none">
            <button
              onClick={onClose}
              className="group pointer-events-auto flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-slate-950/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-primary-600 active:scale-90 -mr-2 md:-mr-16"
            >
              <X 
                size={18} 
                className="transition-transform duration-500 ease-in-out group-hover:rotate-90 md:size-20" 
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start max-w-6xl -mt-16 md:mt-14">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-slate-950 leading-[0.9]">
                {serviceData.title}
              </h1>

              <h2 className="font-serif text-xl md:text-4xl italic text-primary-600 font-normal mt-2">
                {serviceData.titleHighlight}
              </h2>

              <div className="h-[3px] w-24 bg-primary-600 mt-5 md:mt-8 mb-8" />

              <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium">
                {serviceData.description}
              </p>
            </div>

            <div className="hidden md:flex justify-end md:translate-x-32 md:-mt-8">
              <div className="relative group flex justify-end">
                <div className="absolute -inset-6 bg-primary-600/10 blur-3xl rounded-[2.5rem]" />
                <div className="relative w-full max-w-2xl rounded-[2.5rem] p-3 bg-white border border-slate-200 shadow-2xl overflow-hidden scale-105 md:scale-110">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
                    <img
                      src={serviceData.img}
                      alt={serviceData.title}
                      className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-32 max-w-6xl mx-auto">
            <div className="mb-10 md:mb-20 flex items-center gap-6">
              <div className="shrink-0">
                <h3 className=" text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                  {t("servicesdetails.execution")}
                </h3>
                <div className="h-[3px] w-12 bg-primary-600 mt-3" />
              </div>
              <div className="h-px w-full bg-slate-100" />
            </div>

            <div className="grid gap-16 md:gap-24 relative">
              <div className="absolute left-[35px] top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

              {serviceData.steps?.map((step: any, i: number) => (
                <div
                  key={i}
                  className="relative group flex flex-col md:flex-row items-start gap-5 md:gap-16"
                >
                  <div className="relative z-10 shrink-0 hidden md:block">
                    <div className="w-[70px] h-[70px] rounded-full bg-white border-2 border-slate-100 flex items-center justify-center group-hover:border-primary-600 group-hover:bg-primary-600 transition-all duration-500 shadow-sm">
                      <span className="font-display text-xl font-black text-slate-950 group-hover:text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pt-1 md:pt-2">
                    <div className="flex items center gap-4 mb-4">
                      <h4 className="text-xl md:text-2xl font-serif font-black text-slate-950">
                        {step.title}
                      </h4>
                      <div className="h-px flex-1 bg-slate-50 group-hover:bg-primary-100 transition-colors" />
                      <CheckCircle2
                        size={24}
                        className="text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                    <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium max-w-3xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 md:mt-28 border-t pt-10 md:pt-14 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <button
              onClick={handleEstimateClick}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-4 bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 w-full h-[50px] px-6 text-[9px] rounded-2xl md:rounded-xl md:w-auto md:min-h-16 md:px-12 md:py-5 md:text-[10px]"
            >
              <span className="absolute inset-0 w-0 bg-primary-600 transition-all duration-500 ease-out group-hover:w-full" />
              <span className="relative z-10 flex items-center gap-3">
                {t("hero.ctaFree")}
                <ArrowRight className="md:text-lg transition-transform group-hover:translate-x-2" />
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
      </div>
    </div>
  );
};

export default ServiceDetail;