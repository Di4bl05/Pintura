"use client";

import { useMemo } from "react";
import { MapPin, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceAreas() {
  const { t } = useLanguage();
  
  // Datos de áreas de servicio traducidos dinámicamente
  const serviceAreas = useMemo(() => [
    {
      name: t("serviceAreas.areas.0.name"),
      description: t("serviceAreas.areas.0.description")
    },
    {
      name: t("serviceAreas.areas.1.name"),
      description: t("serviceAreas.areas.1.description")
    },
    {
      name: t("serviceAreas.areas.2.name"),
      description: t("serviceAreas.areas.2.description")
    },
    {
      name: t("serviceAreas.areas.3.name"),
      description: t("serviceAreas.areas.3.description")
    },
    {
      name: t("serviceAreas.areas.4.name"),
      description: t("serviceAreas.areas.4.description")
    },
    {
      name: t("serviceAreas.areas.5.name"),
      description: t("serviceAreas.areas.5.description")
    },
    {
      name: t("serviceAreas.areas.6.name"),
      description: t("serviceAreas.areas.6.description")
    },
    {
      name: t("serviceAreas.areas.7.name"),
      description: t("serviceAreas.areas.7.description")
    }
  ], [t]);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
            {t("serviceAreas.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("serviceAreas.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">{t("serviceAreas.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("serviceAreas.subtitle")}
          </p>
        </div>

        {/* Service Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{area.name}</h3>
                  <p className="text-xs text-gray-600">{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t("serviceAreas.whyChoose.title")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.whyChoose.items.0")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.whyChoose.items.1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.whyChoose.items.2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.whyChoose.items.3")}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t("serviceAreas.specialized.title")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.specialized.items.0")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.specialized.items.1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.specialized.items.2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t("serviceAreas.specialized.items.3")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                {t("serviceAreas.cta.text")}
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-800 to-accent-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
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
