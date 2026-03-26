"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceAreas() {
  const { t } = useLanguage();
  const [showAreasMobile, setShowAreasMobile] = useState(false);

  const serviceAreas = useMemo(() => [
    { name: t("serviceAreas.areas.0.name"), description: t("serviceAreas.areas.0.description"), slug: "longwood" },
    { name: t("serviceAreas.areas.1.name"), description: t("serviceAreas.areas.1.description"), slug: "orlando" },
    { name: t("serviceAreas.areas.2.name"), description: t("serviceAreas.areas.2.description"), slug: "winter-park" },
    { name: t("serviceAreas.areas.3.name"), description: t("serviceAreas.areas.3.description"), slug: "altamonte-springs" },
    { name: t("serviceAreas.areas.4.name"), description: t("serviceAreas.areas.4.description"), slug: "lake-mary" },
    { name: t("serviceAreas.areas.5.name"), description: t("serviceAreas.areas.5.description"), slug: "sanford" },
    { name: t("serviceAreas.areas.6.name"), description: t("serviceAreas.areas.6.description"), slug: "florida-central" },
    { name: t("serviceAreas.areas.7.name"), description: t("serviceAreas.areas.7.description"), slug: "florida" }
  ], [t]);

  return (
    <section id="areas" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        {/* Header Premium */}
        <div className="max-w-3xl mb-10 md:mb-16 text-center mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 uppercase tracking-tighter leading-none">
            {t("serviceAreas.title")}{" "}
            <span className="text-blue-600 italic">{t("serviceAreas.titleHighlight")}</span>
          </h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-blue-600 mx-auto rounded-full mb-5 md:mb-8"></div>
          <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl md:max-w-2xl mx-auto italic px-2">
            {t("serviceAreas.subtitle")}
          </p>
        </div>

        {/* Áreas Grid - Estilo Minimalista y Bold */}
        <div className="md:hidden max-w-xl mx-auto mb-10">
          <button
            type="button"
            onClick={() => setShowAreasMobile((prev) => !prev)}
            className="w-full bg-white rounded-2xl px-5 py-4 border border-slate-200 shadow-lg shadow-slate-200/40 flex items-center justify-between"
            aria-expanded={showAreasMobile}
            aria-controls="mobile-areas-list"
          >
            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
              {t("serviceAreas.title")} {t("serviceAreas.titleHighlight")}
            </span>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${showAreasMobile ? "rotate-180" : "rotate-0"}`} />
          </button>

          {showAreasMobile && (
            <div id="mobile-areas-list" className="mt-3 bg-white rounded-2xl border border-slate-200 px-3 py-3 shadow-md">
              <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory hide-scrollbar">
                {serviceAreas.map((area, index) => (
                  <Link
                    key={index}
                    href={`/areas/${area.slug}`}
                    className="min-w-[170px] snap-start rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                  >
                    <div className="grid grid-cols-[16px_1fr] items-start gap-2 text-left">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{area.name}</p>
                        <p className="text-[11px] text-slate-500 italic leading-snug mt-0.5">{area.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-12 md:mb-20">
          {serviceAreas.map((area, index) => (
            <Link
              key={index}
              href={`/areas/${area.slug}`}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-200 shadow-lg md:shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 mb-1.5 md:mb-2 uppercase tracking-tight text-sm md:text-base">{area.name}</h3>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed italic">{area.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bloque de Información Adicional - Estilo Unificado */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl md:shadow-2xl shadow-slate-200/60 p-6 md:p-16 max-w-5xl mx-auto border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Por qué elegirnos */}
            <div className="text-center">
              <h3 className="w-full max-w-sm mx-auto text-xl md:text-2xl font-black mb-5 md:mb-8 text-slate-900 uppercase tracking-tighter italic border-b-4 border-blue-600 pb-2 text-center">
                {t("serviceAreas.whyChoose.title")}
              </h3>
              <ul className="space-y-3 md:space-y-4 max-w-sm mx-auto">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="grid grid-cols-[20px_1fr] md:grid-cols-[24px_1fr] items-start gap-3 md:gap-4 group text-left">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5 shadow-lg shadow-blue-200">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <span className="text-slate-700 font-bold text-xs md:text-sm group-hover:text-blue-600 transition-colors leading-tight mt-1">
                      {t(`serviceAreas.whyChoose.items.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Especialidades */}
            <div className="text-center">
              <h3 className="w-full max-w-sm mx-auto text-xl md:text-2xl font-black mb-5 md:mb-8 text-slate-900 uppercase tracking-tighter italic border-b-4 border-slate-900 pb-2 text-center">
                {t("serviceAreas.specialized.title")}
              </h3>
              <ul className="space-y-3 md:space-y-4 max-w-sm mx-auto">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="grid grid-cols-[20px_1fr] md:grid-cols-[24px_1fr] items-start gap-3 md:gap-4 group text-left">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <span className="text-slate-700 font-bold text-xs md:text-sm group-hover:text-slate-900 transition-colors leading-tight mt-1">
                      {t(`serviceAreas.specialized.items.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA de la sección - Estilo Premium Button */}
          <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-slate-100">
            <div className="text-center">
              <p className="text-base md:text-lg text-slate-500 mb-6 md:mb-8 font-medium italic px-2">
                {t("serviceAreas.cta.text")}
              </p>
              <a
                href="#contact"
                className="inline-block px-8 md:px-12 py-3.5 md:py-5 bg-blue-600 text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-2xl hover:bg-slate-950 transition-all shadow-xl shadow-blue-200"
              >
                {t("serviceAreas.cta.button")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}