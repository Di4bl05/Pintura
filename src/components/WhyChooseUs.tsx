"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Zap, Star, Sparkles, Wand2, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CombinedConversion() {
  const { t } = useLanguage();

  // Casting seguro para evitar errores de compilación con i18next returnObjects
  const differences = (t("whyChoose.core_value_proposition.the_difference", { returnObjects: true }) as any[]) || [];
  const pricing = (t("whyChoose.conversion_triggers.pricing_range", { returnObjects: true }) as any) || { average: "2,500" };
  const marketAuthority = (t("whyChoose.business_identity.market_authority", { returnObjects: true }) as any) || {};

  const icons: Record<string, JSX.Element> = {
    price_disruption: <Wand2 className="w-6 h-6 text-primary-600" />,
    time_efficiency: <Zap className="w-6 h-6 text-primary-600" />,
    payment_flexibility: <ShieldCheck className="w-6 h-6 text-primary-600" />
  };

  const hookText = t("whyChoose.core_value_proposition.hook") || "Quality results, local trust";
  const [hookMain, hookItalic] = hookText.includes(',') ? hookText.split(',') : [hookText, ""];

  return (
    <section id="why-choose-us" className="relative py-32 md:py-44 bg-slate-50 antialiased overflow-hidden">
      
      {/* DECORACIÓN ORGÁNICA */}
      <div className="absolute top-0 right-[-5%] w-[60%] h-[60%] bg-primary-100/20 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white blur-[120px] rounded-full -z-10" />

      <div className="mx-auto px-6 z-10 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-24 lg:items-center">
          
          {/* LADO IZQUIERDO: COLLAGE DE BURBUJAS ARTÍSTICO */}
          <div className="w-full lg:w-1/2 relative min-h-[550px] md:min-h-[750px] flex items-center justify-center">
            {/* Burbuja Principal */}
            <div className="absolute z-20 top-0 left-[5%] w-[80%] h-auto aspect-square rounded-full border-[8px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden group animate-float">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Expert Painting Services Orlando"
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
              />
            </div>

            {/* Burbuja Secundaria */}
            <div className="absolute z-10 bottom-[10%] right-0 w-[55%] h-auto aspect-square rounded-full border-[8px] border-white shadow-3xl overflow-hidden animate-float-delayed">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Detailed Painting Work"
                fill
                className="object-cover brightness-105"
              />
            </div>

            {/* Elemento Decorativo Abstracto */}
            <div className="absolute z-0 top-[15%] right-[5%] w-[35%] h-auto aspect-square rounded-full bg-primary-100/40 border-4 border-white flex items-center justify-center animate-pulse-slow">
              <Flower2 className="w-16 h-16 text-primary-400/30" />
            </div>

            {/* Badge de Autoridad Flotante */}
            <div className="absolute z-30 bottom-[15%] left-[-5%] md:left-0 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-white flex items-center gap-5 transition-all hover:-translate-y-2 duration-500">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-100">
                <Star className="w-7 h-7 text-white fill-current" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
                  {marketAuthority.satisfaction_rate || "99% SATISFACTION"}
                </p>
                <p className="font-display text-base font-bold text-slate-950 tracking-tight uppercase">
                  Verified Local Results
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: NARRATIVA DE VENTAS */}
          <div className="w-full lg:w-1/2 space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary-600">
                <div className="p-2.5 bg-primary-50 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.4em] text-primary-700">
                  {t("hero.badge2.licensed")} & {t("hero.badge2.insured")}
                </span>
              </div>

              <h2 className="font-display text-5xl md:text-8xl font-bold text-slate-950 uppercase tracking-tightest leading-[0.85]">
                {hookMain}
                {hookItalic && (
                  <span className="font-serif italic font-normal text-primary-600 block leading-[1.1] lowercase md:mt-4 tracking-normal">
                    {hookItalic}
                  </span>
                )}
              </h2>

              <p className="font-sans text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                {t("whyChoose.marketing_narrative.solution")}
              </p>
            </div>

            {/* LISTA DE DIFERENCIADORES */}
            <div className="space-y-12">
              {differences.map((item: any) => (
                <div key={item.id} className="group flex gap-10 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-2xl group-hover:shadow-primary-100 group-hover:-translate-y-2 transition-all duration-500">
                    {icons[item.id] || <Sparkles className="w-6 h-6 text-primary-600" />}
                  </div>
                  <div className="space-y-3 flex-1 pt-2">
                    <h3 className="font-display font-bold text-slate-950 uppercase tracking-widest text-xl leading-none">
                      {item.label}
                    </h3>
                    <p className="font-sans text-slate-500 text-lg leading-relaxed">
                      {item.argument} <span className="text-primary-600 font-bold ml-2">• {item.benefit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER DE CONVERSIÓN */}
            <div className="pt-16 border-t border-slate-200 space-y-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center">
                <Link
                  href="/contact"
                  className="font-sans group relative overflow-hidden inline-flex items-center justify-center gap-6 bg-slate-950 text-white px-14 py-8 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-3xl"
                >
                  <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-4">
                    {t("combined_conversion_section.cta_box.action")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>

                <a
                  href={`tel:${t("combined_conversion_section.cta_box.phone")}`}
                  className="font-sans inline-flex items-center justify-center gap-4 bg-white border border-slate-200 text-slate-950 px-14 py-8 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  {t("combined_conversion_section.cta_box.phone")}
                </a>
              </div>
              
              <div className="flex items-center gap-4 px-4 py-3 bg-emerald-50/50 rounded-full w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-sans text-[10px] font-bold text-emerald-800 uppercase tracking-[0.25em]">
                  Average Florida investment: <span className="font-black text-emerald-950">${pricing.average} USD</span> per project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-30px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 1s; }
        .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
      
    </section>
  );
}