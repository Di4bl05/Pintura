"use client";

import { useState, useRef, useEffect } from "react";
import { Star, MapPin, ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviewsData = [
  { id: 1, author: "María González", rating: 5, date: "twoWeeks", text: "¡Excelente trabajo! Pintaron mi casa completa y quedó impecable. El equipo fue muy profesional, detallista y dejaron todo limpio al terminar. 100% recomendados. Además, se encargaron de cubrir todos los muebles con plástico y no hubo ni una sola mancha de pintura en el suelo al finalizar el proyecto.", avatar: "M", location: "Miami, FL" },
  { id: 2, author: "Carlos Rodríguez", rating: 5, date: "oneMonth", text: "Muy detallistas y limpios. Cumplieron con los tiempos acordados y el presupuesto inicial. El trato fue inmejorable desde el primer día.", avatar: "C", location: "Coral Gables, FL" },
  { id: 3, author: "Ana Martínez", rating: 5, date: "oneMonth", text: "Transformaron mi oficina. Acabado impecable y puntualidad. Los materiales que usan son de primera calidad y eso se nota en el resultado final.", avatar: "A", location: "Homestead, FL" },
  { id: 4, author: "Roberto Silva", rating: 5, date: "twoMonths", text: "Pintaron el exterior y quedó como nueva. Es difícil encontrar contratistas serios hoy en día, pero ellos superaron mis expectativas.", avatar: "R", location: "Kendall, FL" },
];

const GoogleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Reviews() {
  const { t } = useLanguage();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedTexts, setExpandedTexts] = useState<Record<number, boolean>>({});
  const [rating, setRating] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = 4.9;
          const duration = 1500;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setRating(end);
              clearInterval(timer);
            } else {
              setRating(Number(start.toFixed(1)));
            }
          }, 16);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleText = (id: number) => {
    setExpandedTexts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const displayedReviews = showAllReviews ? reviewsData : reviewsData.slice(0, 4);

  return (
    <section ref={sectionRef} id="reviews" className="relative pt-16 md:pt-24 pb-20 md:pb-32 bg-white antialiased overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        
        {/* ENCABEZADO */}
        <div className="max-w-5xl text-left mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 mb-6 shadow-lg shadow-blue-100">
            <GoogleIcon className="w-3 md:w-3.5 h-3 md:h-3.5" />
            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.2em]">
              {t("reviews.badge")}
            </span>
          </div>

          <h2 className="flex flex-col -space-y-1 md:-space-y-2">
            <span className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase tracking-tighter leading-none">
              {t("reviews.title")}
            </span>
            <span className="text-4xl md:text-7xl font-black italic text-blue-600 uppercase tracking-tighter leading-none">
              {t("reviews.titleHighlight")}
            </span>
          </h2>

          <div className="mt-6 md:mt-8 flex gap-4 md:gap-5 items-stretch">
            <div className="w-[2.5px] bg-blue-600 rounded-full" />
            <p className="text-sm md:text-lg text-slate-600 font-medium italic leading-relaxed max-w-2xl">
              {t("reviews.subtitle")}
            </p>
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          
          {/* COLUMNA DE RESEÑAS */}
          <div className="relative flex flex-col space-y-8 md:space-y-12 w-full max-w-4xl order-2 lg:order-1">
            <div className="flex flex-col space-y-8 md:space-y-10">
              {displayedReviews.map((review) => {
                const isTextExpanded = expandedTexts[review.id];
                const shouldTruncate = review.text.length > 160;
                const displayText = shouldTruncate && !isTextExpanded 
                  ? `${review.text.substring(0, 160)}...` 
                  : review.text;

                return (
                  <div key={review.id} className="flex flex-col pb-8 md:pb-10 border-b border-slate-100 last:border-0 w-full">
                    {/* Header Reseña */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f172a] flex-shrink-0 flex items-center justify-center text-white font-black text-lg md:text-xl shadow-lg border-2 border-slate-50">
                          {review.avatar}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-black text-slate-950 text-base md:text-xl uppercase tracking-tighter leading-none">
                              {review.author}
                            </h4>
                            <span className="flex items-center gap-1 text-[8px] md:text-[9px] font-black text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-full uppercase tracking-tight border border-blue-100">
                              <GoogleIcon className="w-2 md:w-2.5 h-2 md:h-2.5" /> 
                              <span className="hidden xs:inline">Verificado en</span> Google
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                            <MapPin size={10} className="text-blue-500 md:w-3 md:h-3" /> {review.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:mt-1">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-current md:w-4 md:h-4" stroke="none" />
                          ))}
                        </div>
                        <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-tighter">
                          • {t(`reviews.timeAgo.${review.date}`)}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-medium italic px-1">
                      "{displayText}"
                      {shouldTruncate && (
                        <button 
                          onClick={() => toggleText(review.id)} 
                          className="ml-2 text-blue-600 font-black hover:underline uppercase text-[10px] md:text-xs tracking-widest inline-block"
                        >
                          {isTextExpanded ? t("reviews.readLess") : t("reviews.readMore")}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Botón Ver Todas */}
            <div className="flex justify-center md:justify-start pt-4">
              <button 
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="group w-full md:w-auto flex items-center justify-center gap-3 py-4 md:py-5 px-8 md:px-10 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs bg-slate-950 text-white uppercase tracking-[0.2em] transition-all hover:bg-blue-600 active:scale-95 shadow-xl"
              >
                {showAllReviews ? t("reviews.showLess") : `${t("reviews.viewAll")} (${reviewsData.length})`}
                <ChevronRight size={16} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* TARJETA STICKY (Derecha en desktop, Primera en móvil) */}
          <div className="lg:sticky lg:top-32 h-fit order-1 lg:order-2">
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <GoogleIcon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Puntuación en</span>
                  <span className="text-lg md:text-xl font-black text-slate-950 uppercase tracking-tighter">Google Maps</span>
                </div>
              </div>

              <div>
                <div className="text-5xl md:text-7xl font-black text-slate-950 leading-none tracking-tighter mb-4">
                  {rating.toFixed(1)}
                </div>
                <div className="flex gap-1 text-yellow-400 mb-2">
                   {[...Array(5)].map((_, s) => <Star key={s} size={18} className="fill-current md:w-5 md:h-5" stroke="none" />)}
                </div>
                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Basado en 152 reseñas reales</p>
              </div>

              <a href="#" className="flex items-center justify-center gap-3 w-full py-4 md:py-5 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 text-center">
                Escribir Reseña <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}