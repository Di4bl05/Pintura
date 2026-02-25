import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Reviews from "@/components/Reviews";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
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
                ¿POR QUÉ ELEGIRNOS?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                La Mejor Opción para tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">Proyecto de Pintura</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Con más de 15 años de experiencia sirviendo el área, entregamos resultados excepcionales para propiedades residenciales y comerciales.
              </p>
              <ul className="space-y-4">
                {[
                  "Presupuestos gratuitos sin compromiso",
                  "Licenciados y completamente asegurados",
                  "Materiales de calidad premium",
                  "Garantía de finalización a tiempo",
                  "Precios competitivos y transparentes",
                  "Garantía de satisfacción 100%",
                  "Personal profesional y cortés",
                  "Limpieza completa incluida"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-600 w-6 h-6 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Contact Form */}
      <ContactForm />

      {/* Final CTA */}
      <CTASection />
      
      <Footer />
    </main>
  );
}
