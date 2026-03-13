"use client";

import { useMemo } from "react";
import { MapPin, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceAreas() {
  const { t } = useLanguage();

  const serviceAreas = useMemo(() => [
    { name: t("serviceAreas.areas.0.name"), description: t("serviceAreas.areas.0.description") },
    { name: t("serviceAreas.areas.1.name"), description: t("serviceAreas.areas.1.description") },
    { name: t("serviceAreas.areas.2.name"), description: t("serviceAreas.areas.2.description") },
    { name: t("serviceAreas.areas.3.name"), description: t("serviceAreas.areas.3.description") },
    { name: t("serviceAreas.areas.4.name"), description: t("serviceAreas.areas.4.description") },
    { name: t("serviceAreas.areas.5.name"), description: t("serviceAreas.areas.5.description") },
    { name: t("serviceAreas.areas.6.name"), description: t("serviceAreas.areas.6.description") },
    { name: t("serviceAreas.areas.7.name"), description: t("serviceAreas.areas.7.description") }
  ], [t]);

  return (
    <section id="areas" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        {/* Header Premium */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            {t("serviceAreas.title")}{" "}
            <span className="text-blue-600 italic">{t("serviceAreas.titleHighlight")}</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            {t("serviceAreas.subtitle")}
          </p>
        </div>

        {/* Áreas Grid - Estilo Minimalista y Bold */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight text-base">{area.name}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloque de Información Adicional - Estilo Unificado */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-10 md:p-16 max-w-5xl mx-auto border border-slate-100">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Por qué elegirnos */}
            <div>
              <h3 className="text-2xl font-black mb-8 text-slate-900 uppercase tracking-tighter italic border-l-4 border-blue-600 pl-4">
                {t("serviceAreas.whyChoose.title")}
              </h3>
              <ul className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-1 shadow-lg shadow-blue-200">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-bold text-sm group-hover:text-blue-600 transition-colors">
                      {t(`serviceAreas.whyChoose.items.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Especialidades */}
            <div>
              <h3 className="text-2xl font-black mb-8 text-slate-900 uppercase tracking-tighter italic border-l-4 border-slate-900 pl-4">
                {t("serviceAreas.specialized.title")}
              </h3>
              <ul className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-bold text-sm group-hover:text-slate-900 transition-colors">
                      {t(`serviceAreas.specialized.items.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA de la sección - Estilo Premium Button */}
          <div className="mt-12 pt-12 border-t border-slate-100">
            <div className="text-center">
              <p className="text-lg text-slate-500 mb-8 font-medium italic">
                {t("serviceAreas.cta.text")}
              </p>
              <a
                href="#contact"
                className="inline-block px-12 py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-950 transition-all shadow-xl shadow-blue-200"
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