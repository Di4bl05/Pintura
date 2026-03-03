"use client";

import Link from "next/link";
import { Home, Building2, Brush, Palette, Fence, Sparkles, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Home,
      key: "interior",
      link: "/services/interior"
    },
    {
      icon: Building2,
      key: "exterior",
      link: "/services/exterior"
    },
    {
      icon: Brush,
      key: "commercial",
      link: "/services/commercial"
    },
    // {
    //   icon: Fence,
    //   key: "deck",
    //   link: "/services/deck"
    // },
    // {
    //   icon: Sparkles,
    //   key: "pressure",
    //   link: "/services/pressure-washing"
    // }
  ];
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            {t("services.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const title = t(`services.${service.key}.title`);
            const description = t(`services.${service.key}.description`);
            const priceRange = t(`services.${service.key}.price`);
            const priceUnit = t(`services.${service.key}.priceUnit`);
            const features = [
              t(`services.${service.key}.features.0`),
              t(`services.${service.key}.features.1`),
              t(`services.${service.key}.features.2`),
              t(`services.${service.key}.features.3`)
            ];
            
            return (
              <div key={index} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-200 hover:border-primary-300">
                {/* Popular Badge (for first service) */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-600 to-accent-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    {t("services.popular")}
                  </div>
                )}

                {/* Header */}
                <div className="p-4 md:p-6 border-b-2 border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-gradient-to-br from-primary-600 to-primary-700' :
                      index === 1 ? 'bg-gradient-to-br from-accent-600 to-accent-700' :
                      index === 2 ? 'bg-gradient-to-br from-secondary-600 to-secondary-700' :
                      index === 3 ? 'bg-gradient-to-br from-primary-600 to-accent-600' :
                      'bg-gradient-to-br from-secondary-600 to-accent-600'
                    }`}>
                      <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
                      <div className="text-base md:text-lg font-bold text-accent-600">{priceRange}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 space-y-4">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {description}
                  </p>

                  <div className="text-xs md:text-sm text-gray-500">{priceUnit}</div>

                  {/* Features List */}
                  <ul className="space-y-2 md:space-y-3">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-secondary-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={service.link}
                    className="block w-full bg-primary-600 text-white text-center px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-accent-600 transition-all text-sm md:text-base"
                  >
                    {t("services.moreInfo")}
                  </Link>
                </div>
              </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
