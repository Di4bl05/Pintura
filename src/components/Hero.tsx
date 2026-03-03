"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-8 md:pt-6 md:pb-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <img 
            src="/images/gallery/IMG-20260225-WA0029.jpg" 
            alt="Professional painting work"
            className="object-cover w-full h-full lg:opacity-15 opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-red-50/90 lg:from-blue-50/95 lg:via-white/98 lg:to-red-50/95"></div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Main Content */}
          <div className="space-y-5 text-center lg:text-left">
            {/* Título principal más limpio */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-gray-900">{t("hero.title1")}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600">
                  {t("hero.title2")}
                </span>
              </h1>
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full mx-auto lg:mx-0"></div>
            </div>

            <p className="text-base md:text-lg text-gray-700 lg:text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t("hero.description")}
              <span className="font-semibold text-gray-900"> {t("hero.descriptionBold")}</span>
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <Link
                href="#contact"
                className="group px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
              >
                {t("hero.ctaFree")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>

              <a
                href="tel:+17863506367"
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-primary-600 hover:text-primary-600 transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (786) 350-6367
              </a>
            </div>
          </div>

          {/* Right Side - Imagen destacada - Solo desktop */}
          <div className="relative hidden lg:block">
            <div className="relative group">
              {/* Card de imagen */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/gallery/IMG-20260225-WA0029.jpg" 
                  alt="Professional painting transformation"
                  className="object-cover w-full h-[400px] md:h-[450px] lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xl md:text-2xl font-bold">{t("hero.card.transform")}</p>
                    <p className="text-base md:text-lg font-light">{t("hero.card.yourSpace")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
