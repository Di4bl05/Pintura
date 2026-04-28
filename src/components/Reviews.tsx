"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Star, MapPin, Quote, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  avatar: string;
  location: string;
  color: string;
  service?: string;
}

const GoogleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export default function Reviews() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const reviewsData = useMemo(() => {
    const items = t("reviews.items", { returnObjects: true });
    return Array.isArray(items) ? (items as Review[]) : [];
  }, [t]);

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
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reviews" ref={sectionRef} className="relative py-24 sm:py-32 md:py-48 lg:py-64 bg-white overflow-visible antialiased selection:bg-primary-100">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-16 text-left">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start">
          <div className="space-y-16 lg:space-y-24">
            <div className="max-w-4xl">
              <h2 className="flex flex-col gap-1 mb-6 md:mb-8">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 uppercase leading-[0.95] tracking-tight">
                  {t("reviews.title")}
                </span>
                <span className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-5xl italic text-primary-600 leading-none">
                  {t("reviews.titleHighlight")}
                </span>
              </h2>
              <p className="font-sans text-sm lg:text-lg text-slate-600 font-medium leading-relaxed max-w-full opacity-90">
                {t("reviews.subtitle")}
              </p>
            </div>
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-10">
                {reviewsData.map((review) => (
                  <div key={review.id} className="relative bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 select-none transition-all hover:bg-slate-50">
                    <Quote className="absolute top-8 right-10 w-12 h-12 text-primary-600/5" />
                    <div className="flex flex-col md:flex-row gap-6 mb-6 md:mb-8">
                      <div className={`hidden md:flex w-14 h-14 rounded-2xl ${review.color} flex-shrink-0 items-center justify-center font-display font-bold text-xl shadow-sm`}>
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="font-display font-bold text-[17px] md:text-xl text-slate-950 tracking-tight leading-none uppercase">
                            {review.author}
                          </h4>
                          <span className="font-sans flex items-center gap-2 text-[8px] font-black text-primary-600 bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-primary-50 shadow-sm">
                            <GoogleIcon className="w-3.5 h-3.5" /> {t("reviews.googleBadge.label")}
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
                    <p className="font-sans text-sm md:text-lg text-slate-600 font-medium leading-relaxed">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-500 shadow-xl overflow-hidden bg-slate-950 text-white h-12 w-full px-6 rounded-2xl md:h-auto md:w-fit md:px-12 md:py-6 md:rounded-[2rem]"
              >
                <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <div className="relative z-10 flex items-center gap-3 md:gap-4">
                  <GoogleIcon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-sans font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    {t("reviews.googleBadge.viewAll")}
                  </span>
                  <ExternalLink size={14} className="opacity-70 group-hover:translate-x-1 transition-transform md:size-4" />
                </div>
              </a>
            </div>
          </div>
          <aside className="hidden lg:block lg:sticky lg:top-32 self-start order-1 lg:order-2">
            <div className="relative p-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 rounded-[1.8rem] p-7 text-center space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                    <GoogleIcon className="w-6 h-6" />
                  </div>
                  <span className="font-sans text-[8px] font-black text-primary-600 uppercase tracking-[0.4em] block">
                    {t("reviews.googleBadge.status")}
                  </span>
                </div>
                <div className="relative py-2">
                  <div className="font-display text-6xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none">
                    {rating.toFixed(1)}
                  </div>
                  <div className="flex justify-center gap-1 text-yellow-400 mt-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} className="fill-current" stroke="none" />
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200/60">
                  <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] leading-tight mb-5">
                    {t("reviews.googleBadge.basedOn")} <span className="text-slate-950 font-black">{t("reviews.googleBadge.count")}</span>
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">
                    <MapPin size={9} className="text-primary-600" />
                    <span className="font-sans text-[7px] font-black text-slate-950 uppercase tracking-widest">
                      {t("reviews.googleBadge.location")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}