"use client";

import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Zap, Star, Sparkles, Wand2, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function CombinedConversion() {
  const { t } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Casting seguro para datos de i18n
  const differences = ((t as any)("whyChoose.core_value_proposition.the_difference", { returnObjects: true }) as any[]) || [];
  const pricing = ((t as any)("whyChoose.conversion_triggers.pricing_range", { returnObjects: true }) as any) || { average: "2,500" };
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
      
      {/* DECORACIÓN ORGÁNICA SUTIL */}
      <div className="absolute top-0 right-[-5%] w-[50%] h-[50%] bg-primary-50/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-slate-50 blur-[100px] rounded-full -z-10" />

      <div className="mx-auto px-6 lg:px-16 z-10 max-w-[1440px] text-left">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24 lg:items-center">
          
          {/* LADO IZQUIERDO: COLLAGE DE BURBUJAS REFINADO */}
          <div className="w-full lg:w-1/2 relative min-h-[500px] md:min-h-[650px] flex items-center justify-center">
            {/* Burbuja Principal */}
            <div className="absolute z-20 top-0 left-0 w-[85%] h-auto aspect-square rounded-[3rem] lg:rounded-full border-[6px] border-white shadow-2xl overflow-hidden group animate-float">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Expert Painting Services"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
              />
            </div>

            {/* Burbuja Secundaria */}
            <div className="absolute z-10 bottom-0 right-0 w-[50%] h-auto aspect-square rounded-[2rem] lg:rounded-full border-[6px] border-white shadow-xl overflow-hidden animate-float-delayed">
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
                <p className="font-sans text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
                  {marketAuthority.satisfaction_rate || "99% SATISFACTION"}
                </p>
                <p className="text-sm font-bold tracking-tight uppercase font-display text-slate-950">
                  Verified Local Results
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: NARRATIVA DE VENTAS */}
          <div className="w-full space-y-12 lg:w-1/2 lg:space-y-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary-600 shadow-lg shadow-primary-100">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span className="font-sans text-[9px] font-black text-white uppercase tracking-[0.3em]">
                  {t("hero.badge2.licensed")} & {t("hero.badge2.insured")}
                </span>
              </div>

              <h2 className="flex flex-col gap-1">
                <span className="text-4xl font-bold leading-tight uppercase font-display md:text-6xl text-slate-950 tracking-tightest">
                  {hookMain}
                </span>
                {hookItalic && (
                  <span className="font-serif text-3xl italic font-normal leading-none md:text-5xl text-primary-600">
                    {hookItalic}
                  </span>
                )}
              </h2>

              <p className="max-w-xl font-sans text-base leading-relaxed md:text-lg text-slate-600">
                {t("whyChoose.marketing_narrative.solution")}
              </p>
            </div>

            {/* DIFERENCIADORES V2 (Tarjetas Refinadas) */}
            <div className="grid gap-6">
              {differences.map((item: any) => (
                <div key={item.id} className="group flex gap-6 items-start p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:border-primary-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform bg-white border shadow-sm lg:w-14 lg:h-14 rounded-2xl border-slate-100 group-hover:scale-110">
                    {icons[item.id] || <Sparkles className="w-5 h-5 text-primary-600" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-base font-bold tracking-widest uppercase font-display text-slate-950 lg:text-lg">
                      {item.label}
                    </h3>
                    <p className="font-sans text-sm leading-snug text-slate-500 lg:text-base">
                      {item.argument} <span className="ml-1 font-bold text-primary-600">• {item.benefit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACCIONES Y TRIGGER DE PRECIO */}
            <div className="pt-8 space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                >
                  <div className="absolute inset-0 transition-transform duration-500 translate-y-full bg-primary-600 group-hover:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-3">
                    {t("combined_conversion_section.cta_box.action")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <a
                  href={`tel:${t("combined_conversion_section.cta_box.phone")}`}
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-950 px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                >
                  <Phone className="w-3.5 h-3.5 text-primary-600" />
                  {t("combined_conversion_section.cta_box.phone")}
                </a>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 border rounded-full bg-emerald-50/50 w-fit border-emerald-100/50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-sans text-[9px] font-bold text-emerald-800 uppercase tracking-[0.2em]">
                  Market baseline: <span className="font-black text-emerald-950">${pricing.average} USD</span> average project
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
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0.5deg); }
          50% { transform: translateY(-15px) rotate(-0.5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 1s; }
      `}</style>

      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
    </section>
  );
}