"use client";

import Link from "next/link";
import { Home, Building2, Brush, Palette, Fence, Sparkles, Check } from "lucide-react";
import MobileAccordion from "./MobileAccordion";
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
    {
      icon: Fence,
      key: "deck",
      link: "/services/deck"
    },
    {
      icon: Sparkles,
      key: "pressure",
      link: "/services/pressure-washing"
    }
  ];
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
            {t("services.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">{t("services.titleHighlight")}</span>
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
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 relative">
              {/* Popular Badge (for first service) */}
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-600 to-accent-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                  {t("services.popular")}
                </div>
              )}

              <MobileAccordion
                title={title}
                headerContent={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-accent-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 truncate">{title}</h3>
                      <div className="text-sm font-bold text-accent-600">{priceRange}</div>
                    </div>
                  </div>
                }
              >
                {/* Desktop Version: Full Card */}
                <div className="hidden md:block">
                  {/* Header with Icon and Price */}
                  <div className="bg-gradient-to-br from-gray-50 to-accent-50 p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{priceRange}</div>
                        <div className="text-sm text-gray-600">{priceUnit}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors">
                      {title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                          <Check className="w-5 h-5 text-accent-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={service.link}
                      className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-all group-hover:bg-accent-600"
                    >
                      {t("services.moreInfo")}
                    </Link>
                  </div>
                </div>

                {/* Mobile Version: Collapsed Content */}
                <div className="md:hidden p-4 space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>

                  <div className="text-xs text-gray-500">{priceUnit}</div>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-accent-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={service.link}
                    className="block w-full bg-gray-900 text-white text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-accent-600 transition-all text-sm"
                  >
                    {t("services.moreInfo")}
                  </Link>
                </div>
              </MobileAccordion>
            </div>
          );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-800 to-accent-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">{t("services.ctaTitle")}</h3>
            <p className="text-xl mb-8 opacity-90">
              {t("services.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-primary-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                {t("services.ctaFree")}
              </a>
              <a
                href="tel:+17863506367"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                {t("services.ctaCall")}
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            {t("services.priceNote")}
            <br />
            {t("services.priceNote2")}
          </p>
        </div>
      </div>
    </section>
  );
}
