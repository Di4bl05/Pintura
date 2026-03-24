"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import MobileAccordion from "@/components/MobileAccordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  
  const benefits = [
    t("whyChoose.items.0"),
    t("whyChoose.items.1"),
    t("whyChoose.items.2"),
    t("whyChoose.items.3"),
    t("whyChoose.items.4"),
    t("whyChoose.items.5"),
    t("whyChoose.items.6"),
    t("whyChoose.items.7")
  ];

  return (
    <section className="py-20 bg-white/60">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Professional painting team"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("whyChoose.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">{t("whyChoose.titleHighlight")}</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              {t("whyChoose.description")}
            </p>
            
            <MobileAccordion
              title={t("whyChoose.benefits")}
              defaultOpen={true}
              headerContent={
                <div className="text-left">
                  <h3 className="text-base font-bold text-gray-900">{t("whyChoose.benefits")}</h3>
                  <p className="text-xs text-gray-600">{t("whyChoose.benefitsCount")}</p>
                </div>
              }
            >
              <ul className="space-y-4">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-600 w-6 h-6 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </MobileAccordion>
          </div>
        </div>
      </div>
    </section>
  );
}