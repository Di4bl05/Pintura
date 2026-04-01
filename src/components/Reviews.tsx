"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Star, MapPin, ChevronRight, ExternalLink, Quote, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Datos tipados para mejor mantenimiento
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
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Reviews() {
  const { t } = useLanguage();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedTexts, setExpandedTexts] = useState<Record<number, boolean>>({});
  const [rating, setRating] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animación del contador de rating
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
    <section id="reviews" ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-50/80 blur-[120px] rounded-full -z-10" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* HEADER */}
        <div className="max-w-4xl mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary-600 mb-10 shadow-xl shadow-primary-100">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="font-sans text-[10px] font-black text-white uppercase tracking-[0.4em]">
              {t("reviews.badge") || "Social Proof"}
            </span>
          </div>

          <h2 className="mb-10">
            <span className="font-display text-5xl md:text-8xl font-bold text-slate-950 uppercase tracking-tightest leading-[0.85] block">
              {t("reviews.title") || "Trusted by"}
            </span>
            <span className="font-serif text-5xl md:text-8xl italic font-normal text-primary-600 block leading-[1.1] lowercase">
              {t("reviews.titleHighlight") || "The Community"}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_450px] gap-20 items-start">
          
          {/* REVIEWS FEED */}
          <div className="space-y-12 order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-12">
              {displayedReviews.map((review) => {
                const isExpanded = expandedTexts[review.id];
                return (
                  <div key={review.id} className="group relative bg-slate-50/50 p-10 md:p-14 rounded-[3rem] border border-transparent hover:border-primary-100 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transition-all duration-700">
                    <Quote className="absolute top-12 right-12 w-16 h-16 text-primary-600/5 group-hover:text-primary-600/10 transition-colors" />
                    
                    <div className="flex flex-col md:flex-row gap-8 mb-10">
                      <div className={`w-20 h-20 rounded-3xl ${review.color} flex-shrink-0 flex items-center justify-center font-display font-bold text-3xl shadow-inner`}>
                        {review.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          <h4 className="font-display font-bold text-slate-900 text-3xl tracking-tight leading-none uppercase">
                            {review.author}
                          </h4>
                          <span className="font-sans flex items-center gap-2 text-[9px] font-black text-primary-600 bg-white px-4 py-2 rounded-full uppercase tracking-widest border border-primary-50 shadow-sm">
                            <GoogleIcon className="w-3.5 h-3.5" /> Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" stroke="none" />)}
                          </div>
                          <div className="font-sans flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <MapPin size={12} className="text-primary-500" /> {review.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif text-2xl md:text-3xl text-slate-700 leading-[1.4] italic">
                      "{isExpanded ? review.text : `${review.text.substring(0, 160)}...`}"
                      {review.text.length > 160 && (
                        <button 
                          onClick={() => toggleText(review.id)}
                          className="font-sans ml-4 text-primary-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-950 transition-colors"
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
              className="font-sans group relative overflow-hidden flex items-center justify-center gap-6 py-8 px-20 rounded-2xl font-black text-[10px] bg-slate-950 text-white uppercase tracking-[0.3em] transition-all shadow-3xl hover:shadow-primary-100"
            >
              <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative z-10">
                {showAllReviews ? "Show Less" : `View All Stories (${reviewsData.length})`}
              </span>
              <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* SIDEBAR SCORE CARD */}
          <div className="lg:sticky lg:top-32 order-1 lg:order-2">
            <div className="bg-slate-950 p-16 rounded-[4.5rem] text-center space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 mx-auto mb-10">
                  <GoogleIcon className="w-12 h-12" />
                </div>
                <p className="font-sans text-[11px] font-black text-primary-400 uppercase tracking-[0.4em]">Average Rating</p>
                <div className="font-display text-[10rem] font-bold text-white tracking-tighter leading-none animate-in fade-in zoom-in duration-1000">
                  {rating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-2 text-yellow-400 pt-4">
                   {[...Array(5)].map((_, s) => <Star key={s} size={28} className="fill-current" stroke="none" />)}
                </div>
              </div>

              <div className="space-y-8">
                <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  Based on <span className="text-white">150+ verified</span> painting projects in Central Florida.
                </p>
                
                <a 
                  href="https://google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans group relative overflow-hidden flex items-center justify-center gap-4 w-full py-7 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all"
                >
                  <span className="relative z-10">Leave a Review</span>
                  <ExternalLink size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}