"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, Check } from "lucide-react";
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
        
        {/* Header Centrado */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            {t("services.title")} <span className="text-blue-600">{t("services.titleHighlight")}</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Contenedor de Carrusel */}
        <div className="relative px-2">
          
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-900 hover:text-white transition-all hidden md:flex active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-16 snap-x snap-mandatory scrollbar-hide"
          >
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex-[0_0_88%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 snap-center"
              >
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover-neon-shadow">
                  
                  {/* Imagen */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={t(`services.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting at</span>
                      <span className="text-xl font-black text-blue-600">{t(`services.${service.key}.price`)}</span>
                    </div>

                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-medium italic">
                      {t(`services.${service.key}.description`)}
                    </p>

                    <ul className="space-y-3 mb-10 flex-grow">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-800 text-[11px] font-bold uppercase">
                          <Check className="w-4 h-4 text-blue-600 stroke-[4px]" />
                          {t(`services.${service.key}.features.${i}`)}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.link}
                      className="flex items-center justify-center w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300"
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
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-900 hover:text-white transition-all hidden md:flex active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Efecto de Sombra Animada Rojo-Azul-Rojo */
        .hover-neon-shadow:hover {
          animation: neon-glow 3s infinite alternate;
        }

        @keyframes neon-glow {
          0% {
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.5), 0 0 40px rgba(37, 99, 235, 0.3);
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
          }
        }
      `}</style>
    </section>
  );
}