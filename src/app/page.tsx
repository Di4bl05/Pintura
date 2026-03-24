"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs"; // La sección de la foto Fo.jpg
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import CTASection from "@/components/CTASection"; // El cierre azul con botones
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* 1. Inicio */}
      <Hero />

      {/* 3. Qué hacemos */}
      <Services />

      {/* 4. Prueba visual */}
      <BeforeAfterGallery />

      {/* 5. Lo que dicen de nosotros */}
      <Reviews />

      {/* 6. Dónde estamos */}
      <ServiceAreas />

      {/* 2. Autoridad y Confianza (Aquí va la foto Fo.jpg) */}
      <WhyChooseUs />

      {/* 7. Empujón final antes del formulario */}
      <CTASection />

      {/* 8. Captura de datos */}
      <ContactForm />
      
      <Footer />
    </main>
  );
}