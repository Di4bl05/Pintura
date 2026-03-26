"use client";

import Image from "next/image";
import { ShieldCheck, Clock, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section id="why-choose-us" className="py-20 md:py-32 bg-white antialiased">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        
        {/* Encabezado Simple (Sin animaciones pesadas) */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 mb-6 shadow-md shadow-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
              {t("whyChoose.badge") || "EXCELENCIA COMPROBADA"}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 uppercase tracking-tighter leading-none">
            {t("whyChoose.title")} <span className="text-blue-600 italic">{t("whyChoose.titleHighlight")}</span>
          </h2>
        </div>

        {/* BENTO GRID OPTIMIZADO (Sin transformaciones costosas) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Bloque de Texto Principal (Col 7) */}
          <div className="md:col-span-7 bg-slate-950 rounded-[2rem] p-8 md:p-12 text-white flex flex-col justify-center">
             <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-6 tracking-tight">
                {t("whyChoose.mainBenefit") || "Más que pintura, es protección"}
             </h3>
             <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                {t("whyChoose.description")}
             </p>
          </div>

          {/* Imagen (Col 5) - Optimizada con priority */}
          <div className="md:col-span-5 relative h-64 md:h-auto rounded-[2rem] overflow-hidden border border-slate-100">
            <Image
              src="/images/gallery/pintores-exteriores-residenciales-orlando.webp"
              alt="Quality"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Fila Inferior de Beneficios (3 columnas) */}
          <div className="md:col-span-4 bg-blue-600 rounded-[2rem] p-8 text-white flex items-center gap-5">
            <ShieldCheck className="w-10 h-10 flex-shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest">Garantía Real</h4>
              <p className="text-blue-100 text-[11px] font-bold uppercase mt-1">Soporte post-servicio incluido.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-100 rounded-[2rem] p-8 text-slate-900 flex items-center gap-5">
            <Clock className="w-10 h-10 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest">Puntualidad</h4>
              <p className="text-slate-500 text-[11px] font-bold uppercase mt-1">Cronogramas estrictos.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-100 rounded-[2rem] p-8 text-slate-900 flex items-center gap-5">
            <Award className="w-10 h-10 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest">Material Premium</h4>
              <p className="text-slate-500 text-[11px] font-bold uppercase mt-1">Sherwin-Williams & Benjamin Moore.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}