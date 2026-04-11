"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Zap, Star, Sparkles, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function CombinedConversion() {
  const { t } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Casting seguro para datos de i18n
  const differences = ((t as any)("whyChoose.core_value_proposition.the_difference", { returnObjects: true }) as any[]) || [];
  const marketAuthority = ((t as any)("whyChoose.business_identity.market_authority", { returnObjects: true }) as any) || {};

  const icons: Record<string, JSX.Element> = {
    price_disruption: <Wand2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />,
    time_efficiency: <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />,
    payment_flexibility: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />
  };

  const hookText = t("whyChoose.core_value_proposition.hook") || "Quality results, local trust";
  const [hookMain, hookItalic] = hookText.includes(',') ? hookText.split(',') : [hookText, ""];

  return (
    <section id="why-choose-us" className="relative py-20 overflow-hidden antialiased bg-white lg:py-28">
      
      <div className="absolute top-0 left-[-5%] w-[50%] h-[50%] bg-primary-50/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-slate-50 blur-[100px] rounded-full -z-10" />

      <div className="mx-auto px-6 lg:px-16 z-10 max-w-[1440px] text-left">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24 lg:items-center">
          
          <div className="order-2 w-full space-y-12 lg:w-1/2 lg:order-1">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary-600 shadow-xl shadow-primary-100/50">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span className="font-sans text-[9px] font-black text-white uppercase tracking-[0.3em]">
                  {t("hero.badge2.licensed")} & {t("hero.badge2.insured")}
                </span>
              </div>

        <h2 className="flex flex-col mb-8">
  {/* LÍNEA SUPERIOR: Cambiamos tracking-tightest por tracking-tight y font-black por font-bold */}
  <span className="font-display text-4xl md:text-6xl font-bold text-slate-950 uppercase tracking-tight leading-[0.95]">
    {hookMain}
  </span>
  
  {/* LÍNEA INFERIOR: Recuperamos el Serif Italic y quitamos el margen negativo excesivo */}
  {hookItalic && (
    <span className="font-serif text-3xl md:text-6xl italic font-normal text-primary-600 leading-none mt-2">
      {hookItalic}
    </span>
  )}
</h2>

              <p className="max-w-xl pl-6 font-sans text-lg leading-relaxed border-l-2 text-slate-500 border-primary-600/20">
                {t("whyChoose.marketing_narrative.solution")}
              </p>
            </div>

            <div className="grid gap-5">
              {differences.map((item: any, index: number) => (
                <div 
                  key={item.id} 
                  
                  className="flex gap-6 items-start p-6 rounded-[2.5rem] bg-slate-50/40 border border-slate-100 reveal-item pointer-events-none select-none"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-center flex-shrink-0 bg-white border shadow-sm w-14 h-14 rounded-2xl border-slate-100">
                    {icons[item.id] || <Sparkles className="w-5 h-5 text-primary-600" />}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold tracking-widest uppercase font-display text-slate-950">
                      {item.label}
                    </h3>
                    <p className="font-sans text-sm leading-snug text-slate-500 md:text-base">
                      {item.argument} <span className="ml-1 italic font-bold text-primary-600">• {item.benefit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACCIONES */}
            <div className="pt-6 space-y-8">
              <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-4 bg-slate-950 text-white px-12 py-6 rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-200"
                >
                  <div className="absolute inset-0 transition-transform duration-500 translate-y-full bg-primary-600 group-hover:translate-y-0" />
                  <div className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-3">
                    {t("combined_conversion_section.cta_box.action")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </span>
                </Link>

                <a
                  href={`tel:${t("combined_conversion_section.cta_box.phone")}`}
                  className="inline-flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-slate-950 px-12 py-6 rounded-[2rem] hover:border-primary-600 hover:text-primary-600 transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                >
                  <Phone className="w-4 h-4" />
                  {t("combined_conversion_section.cta_box.phone")}
                </a>
              </div>
            </div>
          </div>

       
          <div className="w-full lg:w-1/2 relative min-h-[450px] md:min-h-[600px] flex items-center justify-center order-1 lg:order-2">
            
            <div className="absolute z-20 top-0 right-2 lg:right-6 w-[65%] h-auto aspect-square rounded-[3.5rem] lg:rounded-full border-[8px] border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden animate-float">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Expert Painting Services"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute z-10 bottom-4 left-2 lg:left-4 w-[45%] h-auto aspect-square rounded-[2.5rem] lg:rounded-full border-[6px] border-white shadow-2xl overflow-hidden animate-float-delayed">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Detailed Work"
                fill
                className="object-cover brightness-105"
              />
            </div>

            {/* Badge de Autoridad V2 */}
            <div className="absolute z-30 -bottom-4 left-0 md:left-8 bg-white/95 backdrop-blur-md p-6 lg:p-8 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-500">
              <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-primary-600 shadow-primary-100">
                <Star className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <p className="font-sans text-[9px] font-black text-primary-700/60 uppercase tracking-[0.4em] mb-1">
                  {marketAuthority.satisfaction_rate || "99% SATISFACTION"}
                </p>
                <p className="text-sm font-bold tracking-tight uppercase font-display text-slate-950">
                  Verified Local Results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-20px) rotate(0.5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-delayed { animation: float 9s ease-in-out infinite 1s; }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
        .reveal-item { 
          opacity: 0;
          animation: reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>

      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}