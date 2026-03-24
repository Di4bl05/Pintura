"use client";

import Link from "next/link";
import { Phone, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden antialiased">
      {/* FONDO ÉPICO: Gradiente profundo de marca con desenfoque */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Píldora de Confianza */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black text-blue-100 uppercase tracking-[0.3em]">
              {t("cta.stats.satisfaction") || "CALIDAD GARANTIZADA"}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            {t("cta.title")}<br/>
            <span className="text-blue-500 italic lowercase font-serif">
              {t("cta.subtitle") ? "now" : ""}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("cta.subtitle")}
          </p>

          {/* BOTONES CON ESTILO PREMIUM */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl hover:bg-blue-500 transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1"
            >
              {t("cta.btnQuote")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="tel:+17863506367"
              className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl hover:bg-white/10 transition-all duration-300 font-black text-sm uppercase tracking-widest border border-white/10"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              (786) 350-6367
            </a>
          </div>

          {/* STATS EN TARJETAS DE CRISTAL (Glassmorphism) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { val: "3+", label: t("cta.stats.experience") },
              { val: "$2K-10K", label: t("cta.stats.projects") },
              { val: "100%", label: t("cta.stats.satisfaction") }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-colors"
              >
                <CheckCircle2 className="absolute top-6 right-6 w-5 h-5 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                <div className="text-4xl font-black text-white mb-2 tracking-tighter italic">
                  {stat.val}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}