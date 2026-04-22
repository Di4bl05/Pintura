"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import React, { useState, useEffect } from "react";

const BeforeAfterGallery = dynamic(() => import("@/components/BeforeAfterGallery"), {
  ssr: false,
  loading: () => (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 lg:px-16">
        <div className="rounded-[2rem] border border-slate-100 bg-slate-50 px-8 py-6 text-sm font-medium text-slate-500 shadow-sm">
          Cargando galería optimizada...
        </div>
      </div>
    </section>
  ),
});

export default function Home() {

  const [isContactOpen, setIsContactOpen] = useState(false);

  
  useEffect(() => {
  const handleOpen = (e: Event) => {
    e.stopImmediatePropagation(); 
    setIsContactOpen(true);
  };
  window.addEventListener("app:open-contact", handleOpen, true);
  return () => {
    window.removeEventListener("app:open-contact", handleOpen, true);
  };
}, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <BeforeAfterGallery />
      <Reviews />
      <WhyChooseUs />
      <Footer />
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </main>
  );
}