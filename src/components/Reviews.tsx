

"use client";

import { useState, useRef, useEffect } from "react";
import { Star, MapPin, ChevronRight, ChevronUp, CheckCircle, ShieldCheck, ExternalLink, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviewsData = [
  { id: 1, author: "María González", rating: 5, date: "twoWeeks", text: "¡Excelente trabajo! Pintaron mi casa completa y quedó impecable. El equipo fue muy profesional, detallista y dejaron todo limpio al terminar. 100% recomendados. Además, se encargaron de cubrir todos los muebles con plástico y no hubo ni una sola mancha de pintura en el suelo al finalizar el proyecto.", avatar: "M", location: "Miami, FL" },
  { id: 2, author: "Carlos Rodríguez", rating: 5, date: "oneMonth", text: "Muy detallistas y limpios. Cumplieron con los tiempos acordados y el presupuesto inicial. El trato fue inmejorable desde el primer día.", avatar: "C", location: "Coral Gables, FL" },
  { id: 3, author: "Ana Martínez", rating: 5, date: "oneMonth", text: "Transformaron mi oficina. Acabado impecable y puntualidad. Los materiales que usan son de primera calidad y eso se nota en el resultado final. Estuvieron siempre atentos a mis peticiones especiales sobre los colores.", avatar: "A", location: "Homestead, FL" },
  { id: 4, author: "Roberto Silva", rating: 5, date: "twoMonths", text: "Pintaron el exterior y quedó como nueva. Es difícil encontrar contratistas serios hoy en día, pero ellos superaron mis expectativas.", avatar: "R", location: "Kendall, FL" },
  { id: 5, author: "Elena P.", rating: 5, date: "threeMonths", text: "Servicio rápido y limpio. Muy satisfechos con el color elegido.", avatar: "E", location: "Orlando, FL" },
  { id: 6, author: "Juan Castillo", rating: 5, date: "threeMonths", text: "Profesionales de confianza. Puntuales y el acabado es de lujo.", avatar: "J", location: "Miami, FL" },
  { id: 7, author: "Patricia M.", rating: 5, date: "fourMonths", text: "Excelente atención al detalle. Recomiendo a Luis para cualquier trabajo de pintura residencial.", avatar: "P", location: "Orlando, FL" },
  { id: 8, author: "Marcos V.", rating: 5, date: "fiveMonths", text: "Gran equipo de trabajo. Hicieron un trabajo increíble en la sala y los dormitorios.", avatar: "M", location: "Kissimmee, FL" },
  { id: 9, author: "Sofía R.", rating: 5, date: "sixMonths", text: "Muy contenta con el resultado final. Son muy limpios y ordenados.", avatar: "S", location: "Winter Park, FL" },
];


export default function Reviews() {
  const { t } = useLanguage();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedTexts, setExpandedTexts] = useState<Record<number, boolean>>({});
  const [rating, setRating] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // EFECTO 2: Contador Animado para el 4.9
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

  const toggleShowAll = () => {
    if (showAllReviews) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowAllReviews(false);
    } else {
      setShowAllReviews(true);
    }
  };

  const displayedReviews = showAllReviews ? reviewsData : reviewsData.slice(0, 4);

  return (
    <section ref={sectionRef} id="reviews" className="relative pt-24 pb-32 bg-white antialiased overflow-x-hidden">
      <div className="container relative z-10 mx-auto px-6">
        
        {/* TITULO PRINCIPAL */}
        <div className="max-w-4xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 border border-blue-500 mb-6 shadow-sm animate-bounce-subtle">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {t("reviews.badge")}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9] flex flex-col items-start mb-6">
            <span className="block">{t("reviews.title")}</span>
            <span className="relative inline-block italic text-blue-600 mt-2">
              {t("reviews.titleHighlight")}
              <div className="absolute left-0 w-full h-3 rounded-full -bottom-2 bg-blue-600/10 -rotate-1 -z-10" />
              <div className="absolute -bottom-1 left-0 w-3/4 h-1.5 bg-blue-600 rounded-full -rotate-1" />
            </span>
          </h2>

          <p className="text-lg text-slate-600 font-medium italic leading-relaxed border-l-2 border-blue-600 pl-6 max-w-2xl">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* CUERPO: GRID DE 2 COLUMNAS */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA: FEED DE RESEÑAS CON EFECTO 1 */}
          <div className="relative flex flex-col space-y-12 max-w-4xl">
            <div className="flex flex-col space-y-10">
              {displayedReviews.map((review, index) => {
                const isTextExpanded = expandedTexts[review.id];
                const shouldTruncate = review.text.length > 160;
                const displayText = shouldTruncate && !isTextExpanded 
                  ? `${review.text.substring(0, 160)}...` 
                  : review.text;

                return (
                  <div 
                    key={review.id} 
                    className="group flex flex-col pb-10 border-b border-slate-100 last:border-0 hover:pl-4 transition-all duration-500 ease-out"
                    style={{ 
                      animation: `fadeInSlide 0.6s ease-out forwards ${index * 0.1}s`,
                      opacity: 0 
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-bold text-xl border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-lg leading-none">{review.author}</h4>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                              <CheckCircle size={10} /> {t("reviews.verified")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1.5 font-medium">
                            <MapPin size={12} /> {review.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5 text-orange-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" stroke="none" />)}
                      </div>
                      <span className="text-sm text-slate-400 font-medium">• {t(`reviews.timeAgo.${review.date}`)}</span>
                    </div>

                    <p className="text-slate-700 text-lg leading-relaxed font-medium mb-4 group-hover:text-slate-900 transition-colors">
                      {displayText}
                      {shouldTruncate && (
                        <button onClick={() => toggleText(review.id)} className="ml-2 text-blue-600 font-black hover:underline">
                          {isTextExpanded ? t("reviews.readLess") : t("reviews.readMore")}
                        </button>
                      )}
                    </p>

                    <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors w-fit">
                      <ThumbsUp size={14} className="group-hover:scale-110 transition-transform" /> {t("reviews.helpful")}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Degradado para invitar al scroll (solo si no se muestran todas) */}
            {!showAllReviews && (
                <div className="absolute bottom-20 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}

            {/* BOTÓN VER TODAS */}
            <div className="flex justify-start pt-4">
              <button 
                onClick={toggleShowAll}
                className={`group flex items-center justify-center gap-3 py-5 px-10 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all border-2
                  ${showAllReviews 
                    ? "bg-white border-slate-200 text-slate-500 hover:bg-slate-50" 
                    : "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1"
                  }`}
              >
                {showAllReviews ? (
                  <><span>{t("reviews.showLess")}</span><ChevronUp size={20} /></>
                ) : (
                  <><span>{t("reviews.viewAll")} ({reviewsData.length})</span><ChevronRight size={20} /></>
                )}
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: TARJETA STICKY CON CONTADOR ANIMADO */}
          <div className="hidden lg:block sticky top-32 h-fit">
            <a 
              href="#" 
              target="_blank"
              className="group bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/40 border border-slate-100 flex flex-col gap-8 hover:border-blue-200 hover:shadow-blue-100 transition-all duration-500 active:scale-95"
            >
              <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                   <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                   </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    {t("reviews.basedOn")}
                  </p>
                  <div className="text-xl font-bold text-slate-950 flex items-center gap-2">
                    Google <ExternalLink size={14} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* CONTADOR ANIMADO */}
                <div className="text-7xl font-black text-slate-950 leading-none tracking-tighter">
                  {rating.toFixed(1)}
                </div>
                <div className="flex gap-1 text-orange-400">
                   {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} className="fill-current" stroke="none" />)}
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">
                   152 {t("reviews.reviews")}
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 group-hover:bg-white transition-colors">
                <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                  "The best painting service in Orlando. Clean, fast and professional."
                </p>
              </div>

              <div className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center justify-between group-hover:translate-x-1 transition-all">
                {t("reviews.viewGoogle")} <ChevronRight size={16} />
              </div>
            </a>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}