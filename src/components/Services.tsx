"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, Check, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";

export default function Services() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const services = [
    { key: "interior", img: "/images/gallery/pintura-interiores-casas-orlando-fl.webp", link: "/services/interior" },
    { key: "exterior", img: "/images/gallery/pintores-exteriores-residenciales-orlando.webp", link: "/services/exterior" },
    { key: "commercial", img: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp", link: "/services/commercial" },
    { key: "deck", img: "/images/gallery/pintores-exteriores-residenciales-orlando.webp", link: "/services/deck" },
    { key: "pressure", img: "/images/gallery/pintura-interiores-casas-orlando-fl.webp", link: "/services/pressure" }
  ];

  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER SEO & MARKETING --- */}
        <div className="max-w-4xl mx-auto text-center mb-20 relative px-4">
          {/* Badge con fuente corregida: más grande y pesada */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-black text-blue-700 uppercase tracking-[0.25em]">
              {t("services.badge")}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-tight flex flex-col items-center">
            <span className="block">{t("services.title")}</span>
            <span className="relative inline-block text-blue-600 italic">
              {t("services.titleHighlight")}
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-600/10 rounded-full -rotate-1 -z-10" />
              <div className="absolute -bottom-1 left-0 w-3/4 h-1.5 bg-blue-600 rounded-full -rotate-1" />
            </span>
          </h2>

          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10 italic">
            {t("services.subtitle")}
          </p>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt="Client" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  ))}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  {t("services.socialProof")}
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-100 hidden md:block" />
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest">Garantía Certificada</span>
            </div>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-16 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-16 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none opacity-100 transition-opacity duration-500 hidden md:block" />

          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-16 snap-x snap-mandatory scrollbar-hide px-4 md:px-12"
          >
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex-[0_0_88%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center"
              >
                <div className="group/card relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover-neon-shadow">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Acabado Pro</span>
                      <span className="text-xl font-black text-blue-600">{t(`services.${service.key}.price`)}</span>
                    </div>

                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-medium italic leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>

                    <ul className="space-y-3 mb-10 flex-grow">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-800 text-[11px] font-bold uppercase">
                          <Check className="w-4 h-4 text-blue-600 stroke-[4px]" />
                          {t(`services.${service.key}.features.${i}`)}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.link}
                      className="flex items-center justify-center w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-100"
                    >
                      <span>{t("services.moreInfo")}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:text-white transition-all hidden md:flex active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- SEPARADOR FINAL: RAYA SIMPLE CON SOMBREADO --- */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-slate-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]" />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .hover-neon-shadow:hover {
          animation: neon-glow 4s infinite alternate;
        }

        @keyframes neon-glow {
          0% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.05); }
          50% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.3), 0 20px 40px rgba(0, 0, 0, 0.1); }
          100% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.05); }
        }
      `}</style>
    </section>
  );
}