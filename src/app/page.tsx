"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MobileAccordion from "@/components/MobileAccordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
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
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Services Section with Pricing */}
      <Services />

      {/* Before & After Gallery */}
      <BeforeAfterGallery />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder - Replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-accent-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <p className="text-6xl mb-4">🎨</p>
                    <p className="text-xl font-semibold">Profesionales Certificados</p>
                    <p className="text-sm opacity-90 mt-2">Agrega fotos de tu equipo aquí</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                {t("whyChoose.badge")}
              </div>
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
                {/* Desktop Version */}
                <ul className="space-y-4 hidden md:block">
                  {benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary-600 w-6 h-6 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Mobile Version */}
                <ul className="space-y-3 md:hidden">
                  {benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 px-4">
                      <CheckCircle2 className="text-primary-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Service Areas Section */}
      <ServiceAreas />

      {/* Contact Form */}
      <ContactForm />

      {/* Final CTA */}
      <CTASection />
      
      <Footer />
    </main>
  );
}
