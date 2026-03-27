"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle2, ArrowRight, ShieldCheck, Zap, Clock, Star, Sparkles, Wand2, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CombinedConversion() {
  const { t } = useLanguage();

  const differences = (t as any)("whyChoose.core_value_proposition.the_difference", { returnObjects: true }) || [];
  const pricing = (t as any)("whyChoose.conversion_triggers.pricing_range", { returnObjects: true });
  const marketAuthority = (t as any)("whyChoose.business_identity.market_authority", { returnObjects: true });

  const icons: Record<string, JSX.Element> = {
    price_disruption: <Wand2 className="w-5 h-5 text-blue-500" />,
    time_efficiency: <Zap className="w-5 h-5 text-blue-500" />,
    payment_flexibility: <ShieldCheck className="w-5 h-5 text-blue-500" />
  };

  return (
    <section id="why-choose-us" className="relative py-28 md:py-36 bg-slate-50 antialiased overflow-hidden">
      
      {/* DECORACIÓN ORGÁNICA DE FONDO */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[130px] rounded-full z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] bg-white/50 blur-[130px] rounded-full z-0" />

      <div className="container relative mx-auto px-6 z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* LADO IZQUIERDO: COLLAGE DE BURBUJAS ACTUALIZADO */}
          <div className="w-full lg:w-1/2 relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
            {/* Burbuja Principal con la nueva foto */}
            <div className="absolute z-20 top-[-10%] left-[10%] w-[70%] h-auto aspect-square rounded-full border-4 border-white shadow-2xl shadow-slate-200 overflow-hidden group animate-float">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Professional Exterior Painting Orlando"
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Burbuja Secundaria (puedes usar la misma o una de detalle) */}
            <div className="absolute z-10 bottom-[10%] right-[5%] w-[45%] h-auto aspect-square rounded-full border-4 border-white shadow-xl shadow-slate-200 overflow-hidden animate-float-delayed">
              <Image 
                src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
                alt="Painting Detail Orlando"
                width={400}
                height={400}
                className="w-full h-full object-cover brightness-110"
              />
            </div>

            <div className="absolute z-0 top-[20%] right-[15%] w-[25%] h-auto aspect-square rounded-full bg-blue-100 border-4 border-white flex items-center justify-center animate-pulse-slow">
              <Flower2 className="w-10 h-10 text-blue-400 opacity-60" />
            </div>

            <div className="absolute z-30 bottom-[15%] left-[5%] bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] shadow-lg border border-white/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  {marketAuthority.satisfaction_rate}
                </p>
                <p className="text-sm font-semibold text-slate-900 leading-none">
                  Verified Local Results
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: NARRATIVA */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                   {(t as any)("hero.badge2.licensed")} {(t as any)("hero.badge2.insured")}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-950 uppercase tracking-tighter leading-[0.9] max-w-xl">
                 {(t as any)("whyChoose.core_value_proposition.hook").split(',')[0]}
                 <span className="font-serif italic text-blue-600 block lowercase md:mt-2">
                    {(t as any)("whyChoose.core_value_proposition.hook").split(',')[1]}
                 </span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                {(t as any)("whyChoose.marketing_narrative.solution")}
              </p>
            </div>

            {/* LISTA DE BENEFICIOS */}
            <div className="space-y-10">
              {differences.map((item: any) => (
                <div key={item.id} className="flex gap-6 items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-inner">
                    {icons[item.id]}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-slate-950 uppercase tracking-wide text-lg">
                      {item.label}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {item.argument} <span className="text-blue-600 font-semibold">• {item.benefit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BLOCK */}
            <div className="pt-12 border-t border-slate-100 space-y-8">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-2xl transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200"
                >
                  <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-3">
                    {(t as any)("combined_conversion_section.cta_box.action")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <a
                  href={`tel:${(t as any)("combined_conversion_section.cta_box.phone")}`}
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-950 px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all font-semibold text-sm uppercase tracking-widest"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  {(t as any)("combined_conversion_section.cta_box.phone")}
                </a>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">
                  Average Florida investment: ${pricing.average} USD per project
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEPARADOR FLOTANTE FINAL (NIVEL INFERIOR) */}
      <div className="absolute bottom-12 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-5xl mx-auto px-4 relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-slate-200" />
          <div className="relative flex items-center gap-3 bg-white px-7 py-3 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.4em] whitespace-nowrap">
              Elite Quality
            </span>
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 1s;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
    </section>
  );
}