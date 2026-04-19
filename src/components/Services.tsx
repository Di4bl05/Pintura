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
    {
      key: "exterior",
      img: "/images/gallery/3_despues-1600.webp",
    },
    {
      key: "interior",
      img: "/images/gallery/15_antes-1600.webp",
    },
    {
      key: "pressure",
      img: "/images/gallery/8_despues-1600.webp",
    },
    {
      key: "repair",
      img: "/images/gallery/9_despues-1600.webp",
    },
  ];

  const serviceAreas = [
    "Orlando",
    "Kissimmee",
    "Windermere",
    "Winter Park",
    "Lake Nona",
  ];

  return (
    <section
      id="services"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="absolute top-0 left-[-10%] w-[20rem] sm:w-[30rem] md:w-[60rem] h-[20rem] sm:h-[30rem] md:h-[60rem] bg-slate-50/50 rounded-full blur-[60px] md:blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-12 mb-10 md:mb-24">
          <div className="max-w-4xl">
            <h2 className="flex flex-col gap-1 mb-6 md:mb-8">
              <span className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-950 uppercase leading-[0.95]">
                {t("services.title")}
              </span>

              <span className="font-serif text-xl sm:text-2xl md:text-5xl lg:text-6xl italic text-primary-600 leading-none">
                {t("services.titleHighlight")}
              </span>
            </h2>

            <p className="font-sans text-sm md:text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-xl border-l-2 border-primary-600 pl-4 md:pl-8 mb-6 md:mb-10">
              {t("services.subtitle")}
            </p>

            <div className="space-y-3 md:space-y-5">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
                </div>

                <span className="font-sans text-[8px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] md:tracking-[0.3em]">
                  Active Service Zones
                </span>
              </div>

              <div className="flex flex-wrap gap-x-3 md:gap-x-8 gap-y-2 md:gap-y-3">
                {serviceAreas.map((city) => (
                  <div
                    key={city}
                    className="group flex items-center gap-1 md:gap-2 py-1"
                  >
                    <MapPin className="w-3 h-3 text-primary-600" />
                    <span className="font-sans text-[8px] sm:text-[9px] md:text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] md:tracking-[0.2em]">
                      {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group/carousel">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white text-slate-950 border border-slate-200 rounded-full items-center justify-center hover:bg-primary-600 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white text-slate-950 border border-slate-200 rounded-full items-center justify-center hover:bg-primary-600 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_31%] snap-start"
              >
                <div className="group/card relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col hover:shadow-xl transition-all">
                  <div className="relative h-52 sm:h-60 md:h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-1000"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                      <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white uppercase leading-tight">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-5 sm:p-6 md:p-8 lg:p-10">
                    <ul className="flex-grow mb-5 md:mb-8 space-y-2 md:space-y-4">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-2 md:gap-3">
                          <Check className="w-3 h-3 text-primary-600 mt-0.5" />
                          <span className="font-sans text-[9px] sm:text-[10px] md:text-[11px] font-bold text-slate-600 uppercase leading-tight">
                            {t(`services.${service.key}.features.${i}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(service)}
                      className="group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full bg-slate-950 text-white py-4 md:py-5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em]"
                    >
                      <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 ease-out group-hover/btn:translate-y-0" />
                      <span className="relative z-10">
                        {t("services.moreInfo")}
                      </span>
                      <ArrowRight className="relative z-10 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full translate-y-1/2 pointer-events-none">
        <div className="flex items-center gap-4 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16">
          <div className="h-[1px] flex-grow bg-slate-200" />

          <div className="flex items-center gap-3 bg-white px-4 py-2 md:px-8 md:py-3 rounded-full border border-slate-200">
            <div className="w-1.5 h-1.5 bg-primary-600 animate-pulse rounded-full" />
            <span className="font-sans text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
              Section Service
            </span>
            <div className="w-1.5 h-1.5 bg-primary-600 animate-pulse rounded-full" />
          </div>

          <div className="h-[1px] flex-grow bg-slate-200" />
        </div>
      </div>

      <ServiceDetail
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        serviceData={selectedServiceData}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}