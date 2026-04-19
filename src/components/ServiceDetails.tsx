"use client";

import React, { useEffect, useRef } from "react";
import { X, Phone, Send, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSmartLink } from "@/hooks/useSmartLink";

interface ServiceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: any;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  isOpen,
  onClose,
  serviceData,
}) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
 
  const { handlePhoneClick } = useSmartLink();
  const phone = "+17863506367";

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
      
      if (isOpen && target.closest("a") && !target.closest('a[href^="tel:"]')) {
        onClose();
      }
    };

    if (isOpen) window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isOpen, onClose]);

  const sId = serviceData?.id;

  if (!isOpen || !serviceData) return null;

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[40] bg-white overflow-y-auto antialiased"
    >
      <div className="pt-32 md:pt-44 pb-28 max-w-[1440px] mx-auto px-6 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-6xl">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-600 mb-6">
              {t("servicesdetails.premium")}
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-slate-950 leading-[0.9]">
              {t(`servicesdetails.${sId}.title`)}
            </h1>

            <h2 className="font-serif text-2xl md:text-4xl italic text-primary-600 font-normal mt-2">
              {t(`servicesdetails.${sId}.titleHighlight`)}
            </h2>

            <div className="h-[3px] w-24 bg-primary-600 mt-8 mb-8" />

            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {t(`servicesdetails.${sId}.description`)}
            </p>
          </div>

          <div className="hidden md:flex justify-end md:translate-x-20 md:mt-12">
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
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900">
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
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className="text-xl md:text-2xl font-display font-black uppercase text-slate-950 tracking-tighter">
                      {t(`servicesdetails.${sId}.steps.${i}.title`)}
                    </h4>
                    <div className="h-px flex-1 bg-slate-50 group-hover:bg-primary-100 transition-colors" />
                    <CheckCircle2
                      size={24}
                      className="text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-3xl">
                    {t(`servicesdetails.${sId}.steps.${i}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-28 border-t pt-10 md:pt-14 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <button
            onClick={onClose}
            className="relative group px-10 py-5 bg-slate-950 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-xl overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-primary-600 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0" />
            <div className="relative z-10 flex items-center gap-3">
              <Send size={15} />
              <span>{t("servicesdetails.buttons1")}</span>
            </div>
          </button>

          <a
            href={`tel:${phone}`}
            onClick={handlePhoneClick(phone)}
            className="group h-[60px] px-10 md:px-20 flex items-center gap-4 text-slate-950 border border-slate-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 font-black uppercase text-[11px] tracking-[0.2em] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
          >
            <div className="p-2.5 bg-slate-100 group-hover:bg-blue-500 group-hover:text-white rounded-lg transition-all">
              <Phone size={15} />
            </div>
            <span>(786) 350-6367</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;