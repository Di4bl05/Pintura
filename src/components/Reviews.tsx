"use client";

import { useState, useRef, useEffect } from "react";
import { Star, MapPin, ChevronRight, ExternalLink, Quote, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviewsData = [
  { id: 1, author: "María González", rating: 5, date: "twoWeeks", text: "¡Excelente trabajo! Pintaron mi casa completa y quedó impecable. El equipo fue muy profesional, detallista y dejaron todo limpio al terminar. 100% recomendados. Además, se encargaron de cubrir todos los muebles con plástico y no hubo ni una sola mancha de pintura en el suelo.", avatar: "MG", location: "Orlando, FL", color: "bg-blue-100 text-blue-600" },
  { id: 2, author: "Carlos Rodríguez", rating: 5, date: "oneMonth", text: "Muy detallistas y limpios. Cumplieron con los tiempos acordados y el presupuesto inicial. El trato fue inmejorable desde el primer día.", avatar: "CR", location: "Kissimmee, FL", color: "bg-purple-100 text-purple-600" },
  { id: 3, author: "Ana Martínez", rating: 5, date: "oneMonth", text: "Transformaron mi oficina. Acabado impecable y puntualidad. Los materiales que usan son de primera calidad y eso se nota en el resultado final.", avatar: "AM", location: "Windermere, FL", color: "bg-emerald-100 text-emerald-600" },
  { id: 4, author: "Roberto Silva", rating: 5, date: "twoMonths", text: "Pintaron el exterior y quedó como nueva. Es difícil encontrar contratistas serios hoy en día, pero ellos superaron mis expectativas.", avatar: "RS", location: "Winter Park, FL", color: "bg-orange-100 text-orange-600" },
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
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = 4.9;
          const timer = setInterval(() => {
            start += 0.1;
            if (start >= end) {
              setRating(end);
              clearInterval(timer);
            } else { setRating(Number(start.toFixed(1))); }
          }, 30);
        }
      }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleText = (id: number) => setExpandedTexts(prev => ({ ...prev, [id]: !prev[id] }));
  const displayedReviews = showAllReviews ? reviewsData : reviewsData.slice(0, 4);

  return (
    <section id="reviews" className="relative py-16 lg:py-24 bg-white antialiased overflow-hidden">
      
      <div className="absolute top-0 right-[-5%] w-[45rem] h-[45rem] bg-blue-50/60 rounded-full blur-[130px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-slate-50 rounded-full blur-[110px] -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        
        {/* ENCABEZADO */}
        <div className="max-w-5xl text-left mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 mb-8 shadow-xl shadow-blue-100 w-fit">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {t("reviews.badge") || "CLIENTES SATISFECHOS"}
            </span>
          </div>

          <h2 className="flex flex-col mb-10">
            <span className="text-4xl md:text-6xl font-extrabold text-slate-950 uppercase tracking-tighter leading-[0.9]">
              {t("reviews.title") || "OPINIONES DE"}
            </span>
            <span className="text-4xl md:text-6xl font-serif italic font-semibold text-blue-600 block lowercase md:mt-2 tracking-tight relative w-fit">
              {t("reviews.titleHighlight") || "Nuestros Clientes"}
            </span>
          </h2>

          <div className="flex gap-4 md:gap-6 items-stretch max-w-2xl">
            <div className="w-[2px] bg-blue-600 rounded-full flex-shrink-0" />
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg pl-2 italic">
              {t("reviews.subtitle") || "La confianza de nuestros clientes es nuestro mejor acabado."}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          
          {/* LISTADO DE RESEÑAS */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-8">
              {displayedReviews.map((review) => {
                const isExpanded = expandedTexts[review.id];
                return (
                  <div key={review.id} className="group relative bg-slate-50/40 p-8 md:p-10 rounded-[3rem] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-50/50 transition-all duration-500">
                    <Quote className="absolute top-8 right-10 w-12 h-12 text-blue-600/5 group-hover:text-blue-600/10 transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${review.color} flex-shrink-0 flex items-center justify-center font-black text-xl shadow-sm`}>
                        {review.avatar}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-black text-slate-900 text-xl uppercase tracking-tighter leading-none">
                            {review.author}
                          </h4>
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-blue-50 shadow-sm">
                            <GoogleIcon className="w-2.5 h-2.5" /> Google
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" stroke="none" />)}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <MapPin size={10} className="text-blue-400" /> {review.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium italic">
                      "{isExpanded ? review.text : `${review.text.substring(0, 150)}...`}"
                      {review.text.length > 150 && (
                        <button 
                          onClick={() => toggleText(review.id)}
                          className="ml-3 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline transition-all"
                        >
                          {isExpanded ? t("reviews.readLess") : t("reviews.readMore")}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Botón Ver Todas (Efecto Slide-Up) */}
            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="group relative overflow-hidden flex items-center justify-center gap-4 py-5 px-14 rounded-2xl font-black text-xs bg-slate-950 text-white uppercase tracking-widest transition-all shadow-2xl shadow-slate-200"
            >
              <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10">
                {showAllReviews ? t("reviews.showLess") : `${t("reviews.viewAll")} (${reviewsData.length})`}
              </span>
              <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* SCORE CARD */}
          <div className="lg:sticky lg:top-32 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center space-y-8">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 mx-auto mb-4">
                  <GoogleIcon className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Puntaje Total</p>
                <div className="text-7xl md:text-8xl font-black text-slate-950 tracking-tighter leading-none">
                  {rating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 text-yellow-400 pt-2">
                   {[...Array(5)].map((_, s) => <Star key={s} size={20} className="fill-current" stroke="none" />)}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed px-4">
                  Basado en <span className="text-slate-950">152 reseñas verificadas</span> de dueños de casas en Orlando.
                </p>
                
                {/* Botón Dejar Reseña (Efecto Slide-Up) */}
                <a 
                  href="https://google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-center gap-3 w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                >
                  <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="relative z-10">Dejar una reseña</span>
                  <ExternalLink size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
{/* SEPARADOR FLOTANTE CON LÍNEA INTEGRADA */}
      <div className="absolute bottom-1 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-5xl mx-auto px-4 relative flex items-center justify-center">
          
          {/* La Línea (ahora es visible y no llega a los bordes) */}
          <div className="absolute w-full h-px bg-slate-200" />
          
          {/* El Badge (con fondo blanco para tapar la línea justo detrás del texto) */}
          <div className="relative flex items-center gap-3 bg-white px-7 py-3 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
            
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.4em] whitespace-nowrap">
              Flawless Results
            </span>
            
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
          </div>
          
        </div>
      </div>
    </section>
    
  );
}