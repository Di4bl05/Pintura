"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Star, MapPin, ChevronRight, ExternalLink, Quote, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  avatar: string;
  location: string;
  color: string;
}

const reviewsData: Review[] = [
  { id: 1, author: "María González", rating: 5, text: "Excellent work! They painted my entire house and it looks flawless. The team was professional, detailed, and left everything spotless. 100% recommended.", avatar: "MG", location: "Orlando, FL", color: "bg-primary-100 text-primary-600" },
  { id: 2, author: "Carlos Rodríguez", rating: 5, text: "Very detailed and clean. They met the agreed times and the initial budget. The service was unbeatable from day one.", avatar: "CR", location: "Kissimmee, FL", color: "bg-slate-100 text-slate-600" },
  { id: 3, author: "Ana Martínez", rating: 5, text: "They transformed my office. Impeccable finish and punctuality. The materials they use are top quality and it shows.", avatar: "AM", location: "Windermere, FL", color: "bg-primary-50 text-primary-700" },
  { id: 4, author: "Roberto Silva", rating: 5, text: "They painted the exterior and it looks like new. It's hard to find serious contractors, but they exceeded my expectations.", avatar: "RS", location: "Winter Park, FL", color: "bg-slate-200 text-slate-800" },
];

const GoogleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
        const end = 5.0;
        const timer = setInterval(() => {
          start += 0.1;
          if (start >= end) {
            setRating(end);
            clearInterval(timer);
          } else { setRating(Number(start.toFixed(1))); }
        }, 40);
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleText = (id: number) => setExpandedTexts(prev => ({ ...prev, [id]: !prev[id] }));
  const displayedReviews = useMemo(() => 
    showAllReviews ? reviewsData : reviewsData.slice(0, 3)
  , [showAllReviews]);

  return (
    <section id="reviews" ref={sectionRef} className="relative py-20 lg:py-28 bg-white overflow-hidden antialiased">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-slate-50/50 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16 text-left">
        
        {/* HEADER - ESCALA V2 REFINADA */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary-600 mb-8 shadow-lg shadow-primary-100">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-sans text-[9px] font-black text-white uppercase tracking-[0.3em]">
              {t("reviews.badge") || "SOCIAL PROOF"}
            </span>
          </div>

          <h2 className="flex flex-col gap-1">
            <span className="font-display text-4xl md:text-6xl font-bold text-slate-950 uppercase tracking-tightest leading-tight">
              {t("reviews.title") || "TRUSTED BY"}
            </span>
            <span className="font-serif text-3xl md:text-5xl italic font-normal text-primary-600 leading-none">
              {t("reviews.titleHighlight") || "the community"}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-24 items-start">
          
          {/* FEED DE RESEÑAS */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-8">
              {displayedReviews.map((review) => {
                const isExpanded = expandedTexts[review.id];
                return (
                  <div key={review.id} className="group relative bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 hover:border-primary-100 hover:bg-white hover:shadow-xl transition-all duration-700">
                    <Quote className="absolute top-8 right-10 w-12 h-12 text-primary-600/5 group-hover:text-primary-600/10 transition-colors" />
                    
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                      <div className={`w-14 h-14 rounded-2xl ${review.color} flex-shrink-0 flex items-center justify-center font-display font-bold text-xl shadow-sm`}>
                        {review.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="font-display font-bold text-slate-950 text-xl tracking-tight leading-none uppercase">
                            {review.author}
                          </h4>
                          <span className="font-sans flex items-center gap-2 text-[8px] font-black text-primary-600 bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-primary-50 shadow-sm">
                            <GoogleIcon className="w-3 h-3" /> VERIFIED
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" stroke="none" />)}
                          </div>
                          <div className="font-sans flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            <MapPin size={10} className="text-primary-500" /> {review.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif text-lg md:text-xl text-slate-600 leading-relaxed italic">
                      "{isExpanded ? review.text : `${review.text.substring(0, 150)}...`}"
                      {review.text.length > 150 && (
                        <button 
                          onClick={() => toggleText(review.id)}
                          className="font-sans ml-3 text-primary-600 font-black uppercase text-[9px] tracking-widest hover:text-slate-950 transition-colors"
                        >
                          {isExpanded ? t("reviews.readLess") : t("reviews.readMore")}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="font-sans group relative overflow-hidden flex items-center justify-center gap-4 py-6 px-12 rounded-2xl bg-slate-950 text-white transition-all shadow-xl"
            >
              <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 font-black text-[9px] uppercase tracking-[0.3em]">
                {showAllReviews ? "SHOW LESS" : `VIEW ALL STORIES (${reviewsData.length})`}
              </span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* SCORE CARD LATERAL - ESCALA PROFESIONAL */}
          <div className="lg:sticky lg:top-28 order-1 lg:order-2">
            <div className="bg-slate-950 p-12 rounded-[2.5rem] text-center space-y-8 shadow-xl border border-white/5">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mx-auto mb-6">
                  <GoogleIcon className="w-8 h-8" />
                </div>
                <p className="font-sans text-[10px] font-black text-primary-400 uppercase tracking-[0.3em]">AVERAGE RATING</p>
                <div className="font-display text-7xl md:text-8xl font-bold text-white tracking-tighter leading-none">
                  {rating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1.5 text-yellow-400 pt-2">
                    {[...Array(5)].map((_, s) => <Star key={s} size={20} className="fill-current" stroke="none" />)}
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  BASED ON <span className="text-white">150+ VERIFIED</span> PROJECTS IN FLORIDA.
                </p>
                
                <a 
                  href="https://google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-center gap-3 w-full py-5 bg-primary-600 text-white rounded-xl transition-all"
                >
                  <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10 font-sans font-black text-[9px] uppercase tracking-[0.2em] group-hover:text-slate-950 transition-colors">
                    LEAVE A REVIEW
                  </span>
                  <ExternalLink size={14} className="relative z-10 group-hover:scale-110 group-hover:text-slate-950 transition-all" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SEPARADOR INTEGRADO - VISIBILIDAD MEJORADA */}
  <div className="absolute bottom-6 left-0 w-full translate-y-1/2 z-30 pointer-events-none">
  <div className="flex items-center gap-6 w-full max-w-[1440px] px-6 lg:px-16">
    
    {/* Línea Izquierda: Más gruesa y oscura */}
    <div className="h-[2px] flex-grow bg-slate-200" />
    
    {/* Contenedor Central: Con sombra y borde definido */}
    <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-slate-200 flex-shrink-0 shadow-md">
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
      
      <span className="font-sans text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
        Section Portfolio
      </span>
      
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
    </div>
    
    {/* Línea Derecha */}
    <div className="h-[2px] flex-grow bg-slate-200" />
    
  </div>
</div>
    </section>
  );
}