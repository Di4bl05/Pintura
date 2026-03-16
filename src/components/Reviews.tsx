"use client";

import { useState, useEffect } from "react";
import { Star, Quote, MapPin, ThumbsUp, ExternalLink, ChevronLeft, ChevronRight, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// --- DATOS RESTAURADOS COMPLETAMENTE ---
const reviewsData = [
  {
    id: 1,
    author: "María González",
    rating: 5,
    date: "reviews.timeAgo.twoWeeks",
    text: "Excelente trabajo! Pintaron mi casa completa y quedó impecable. El equipo fue muy profesional, llegaron a tiempo todos los días y se aseguraron de proteger todos nuestros muebles. Los precios fueron muy razonables y la calidad del trabajo superó nuestras expectativas.",
    avatar: "MG",
    verified: true,
    location: "Miami, FL"
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    rating: 5,
    date: "reviews.timeAgo.oneMonth",
    text: "He contratado varios pintores en el pasado, pero estos chicos son los mejores. Muy detallistas y limpios. Recomiendo 100%. La atención al cliente fue excepcional desde el primer contacto.",
    avatar: "CR",
    verified: true,
    location: "Coral Gables, FL"
  },
  {
    id: 3,
    author: "Ana Martínez",
    rating: 5,
    date: "reviews.timeAgo.oneMonth",
    text: "Transformaron completamente mi oficina. El color que elegimos quedó perfecto y el acabado es impecable. Muy profesionales y terminaron antes del tiempo estimado. Sin duda los volveré a contratar.",
    avatar: "AM",
    verified: true,
    location: "Homestead, FL"
  },
  {
    id: 4,
    author: "Roberto Silva",
    rating: 5,
    date: "reviews.timeAgo.twoMonths",
    text: "Pintaron el exterior de mi casa y quedó como nueva. Soportó perfectamente el huracán que pasó después. Materiales de primera calidad y mano de obra excelente. Vale cada centavo.",
    avatar: "RS",
    verified: true,
    location: "Kendall, FL"
  },
  {
    id: 5,
    author: "Laura Fernández",
    rating: 5,
    date: "reviews.timeAgo.twoMonths",
    text: "Me encantó el resultado! Son muy profesionales, dan buenos consejos sobre colores y acabados. El presupuesto fue detallado sin sorpresas. Totalmente recomendados para cualquier proyecto de pintura.",
    avatar: "LF",
    verified: true,
    location: "Doral, FL"
  },
  {
    id: 6,
    author: "Jorge Pérez",
    rating: 5,
    date: "reviews.timeAgo.threeMonths",
    text: "Contraté sus servicios para pintar mi restaurante y el trabajo fue impecable. Trabajaron en horarios que no afectaron mi negocio. Muy organizados y el equipo siempre fue respetuoso con mis empleados y clientes.",
    avatar: "JP",
    verified: true,
    location: "Brickell, FL"
  }
];

export default function Reviews() {
  const { t } = useLanguage();
  
  // --- LÓGICA RESTAURADA ---
  const [currentMobileReview, setCurrentMobileReview] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentModalReview, setCurrentModalReview] = useState(0);
  
  const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;
  const totalReviews = reviewsData.length;

  const nextMobileReview = () => setCurrentMobileReview(prev => (prev + 1) % reviewsData.length);
  const prevMobileReview = () => setCurrentMobileReview(prev => (prev - 1 + reviewsData.length) % reviewsData.length);
  const nextModalReview = () => setCurrentModalReview(prev => (prev + 1) % reviewsData.length);
  const prevModalReview = () => setCurrentModalReview(prev => (prev - 1 + reviewsData.length) % reviewsData.length);

  // Manejo de ESC para cerrar modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAllReviews(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Bloqueo de scroll al abrir modal
  useEffect(() => {
    document.body.style.overflow = showAllReviews ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAllReviews]);

  const ratingDistribution = [
    { stars: 5, count: reviewsData.filter(r => r.rating === 5).length },
    { stars: 4, count: reviewsData.filter(r => r.rating === 4).length },
    { stars: 3, count: reviewsData.filter(r => r.rating === 3).length },
    { stars: 2, count: reviewsData.filter(r => r.rating === 2).length },
    { stars: 1, count: reviewsData.filter(r => r.rating === 1).length },
  ];

  return (
    <section id="reviews" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Decoración Azul de Fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 lg:px-16">
        {/* Header Unificado con Servicios */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            {t("reviews.title")}{" "}
            <span className="text-blue-600 italic">
                {t("reviews.titleHighlight")}
            </span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Resumen de Rating */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="p-10 border border-white bg-white/70 backdrop-blur-xl shadow-xl rounded-[2.5rem]">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="text-center md:border-r border-slate-100 md:pr-12">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-7xl font-black text-slate-900">{averageRating.toFixed(1)}</span>
                    <span className="text-2xl font-bold text-slate-400">/ 5.0</span>
                </div>
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-slate-600 mb-6">{t("reviews.basedOn")} {totalReviews} {t("reviews.reviews")}</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center gap-2.5 py-4 px-8 font-black text-xs uppercase tracking-[0.2em] text-white transition-all bg-slate-950 rounded-2xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200"
                >
                  <MapPin className="w-5 h-5" />
                  {t("reviews.viewGoogle")}
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </a>
              </div>

              <div className="space-y-4">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4 text-sm font-medium">
                    <span className="w-12 text-slate-600 font-bold">{item.stars} ★</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${(item.count / totalReviews) * 100}%` }} />
                    </div>
                    <span className="w-12 text-right text-slate-400 font-bold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Reseñas (Desktop) */}
        <div className="hidden md:grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {reviewsData.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="group relative p-8 border border-slate-200 bg-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover-neon-blue-shadow"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-50 transition-colors group-hover:text-blue-50" />
              <div className="pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{review.author}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{review.date ? t(review.date) : ""}</span>
                </div>
                <p className="text-slate-600 italic line-clamp-4">"{review.text}"</p>
                <div className="pt-5 border-t border-slate-50">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{t("reviews.helpful")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver Todas */}
        <div className="text-center">
          <button
            onClick={() => { setShowAllReviews(true); setCurrentModalReview(0); }}
            className="inline-flex items-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl"
          >
            {t("reviews.viewAll")} ({reviewsData.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL RESTAURADO */}
        {showAllReviews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-lg p-4" onClick={() => setShowAllReviews(false)}>
            <button className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full transition-all">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-3xl bg-white rounded-[2.5rem] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-10 border-b border-slate-100 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-xl font-bold">
                  {reviewsData[currentModalReview].avatar}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-2xl">{reviewsData[currentModalReview].author}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
              <div className="p-10">
                <p className="text-xl text-slate-700 leading-relaxed italic mb-6">"{reviewsData[currentModalReview].text}"</p>
                <div className="flex items-center justify-between text-slate-400 font-bold uppercase text-sm">
                  <div className="flex items-center gap-2"><MapPin size={18} className="text-blue-600" /> {reviewsData[currentModalReview].location}</div>
                  <div>{t(reviewsData[currentModalReview].date)}</div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 flex items-center justify-between">
                <button onClick={prevModalReview} className="p-3 hover:bg-blue-100 rounded-full transition-all text-blue-600"><ChevronLeft size={32}/></button>
                <span className="font-black text-slate-900">{currentModalReview + 1} / {reviewsData.length}</span>
                <button onClick={nextModalReview} className="p-3 hover:bg-blue-100 rounded-full transition-all text-blue-600"><ChevronRight size={32}/></button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .hover-neon-blue-shadow:hover {
          box-shadow: 0 0 25px rgba(37, 99, 235, 0.4);
          border-color: rgba(37, 99, 235, 0.4);
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .md\:grid > div { animation: fade-up 0.6s ease-out forwards; }
      `}</style>
    </section>
  );
}