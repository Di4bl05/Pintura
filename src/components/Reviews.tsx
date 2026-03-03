"use client";

import { useState, useEffect } from "react";
import { Star, Quote, MapPin, ThumbsUp, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


// Estas reseñas pueden venir de una API de Google Maps
// Para conectar con Google Places API, necesitarás configurar NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
const reviewsData = [
  {
    id: 1,
    author: "María González",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Excelente trabajo! Pintaron mi casa completa y quedó impecable. El equipo fue muy profesional, llegaron a tiempo todos los días y se aseguraron de proteger todos nuestros muebles. Los precios fueron muy razonables y la calidad del trabajo superó nuestras expectativas.",
    avatar: "MG",
    verified: true,
    location: "Miami, FL"
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    rating: 5,
    date: "Hace 1 mes",
    text: "He contratado varios pintores en el pasado, pero estos chicos son los mejores. Muy detallistas y limpios. Recomiendo 100%. La atención al cliente fue excepcional desde el primer contacto.",
    avatar: "CR",
    verified: true,
    location: "Coral Gables, FL"
  },
  {
    id: 3,
    author: "Ana Martínez",
    rating: 5,
    date: "Hace 1 mes",
    text: "Transformaron completamente mi oficina. El color que elegimos quedó perfecto y el acabado es impecable. Muy profesionales y terminaron antes del tiempo estimado. Sin duda los volveré a contratar.",
    avatar: "AM",
    verified: true,
    location: "Homestead, FL"
  },
  {
    id: 4,
    author: "Roberto Silva",
    rating: 5,
    date: "Hace 2 meses",
    text: "Pintaron el exterior de mi casa y quedó como nueva. Soportó perfectamente el huracán que pasó después. Materiales de primera calidad y mano de obra excelente. Vale cada centavo.",
    avatar: "RS",
    verified: true,
    location: "Kendall, FL"
  },
  {
    id: 5,
    author: "Laura Fernández",
    rating: 5,
    date: "Hace 2 meses",
    text: "Me encantó el resultado! Son muy profesionales, dan buenos consejos sobre colores y acabados. El presupuesto fue detallado sin sorpresas. Totalmente recomendados para cualquier proyecto de pintura.",
    avatar: "LF",
    verified: true,
    location: "Doral, FL"
  },
  {
    id: 6,
    author: "Jorge Pérez",
    rating: 5,
    date: "Hace 3 meses",
    text: "Contraté sus servicios para pintar mi restaurante y el trabajo fue impecable. Trabajaron en horarios que no afectaron mi negocio. Muy organizados y el equipo siempre fue respetuoso con mis empleados y clientes.",
    avatar: "JP",
    verified: true,
    location: "Brickell, FL"
  }
];

export default function Reviews() {
  const { t } = useLanguage();
  const [currentMobileReview, setCurrentMobileReview] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentModalReview, setCurrentModalReview] = useState(0);
  
  const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;
  const totalReviews = reviewsData.length;

  const nextMobileReview = () => {
    setCurrentMobileReview(prev => (prev + 1) % reviewsData.length);
  };

  const prevMobileReview = () => {
    setCurrentMobileReview(prev => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const nextModalReview = () => {
    setCurrentModalReview(prev => (prev + 1) % reviewsData.length);
  };

  const prevModalReview = () => {
    setCurrentModalReview(prev => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAllReviews) {
        setShowAllReviews(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showAllReviews]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (showAllReviews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAllReviews]);

  const ratingDistribution = [
    { stars: 5, count: reviewsData.filter(r => r.rating === 5).length },
    { stars: 4, count: reviewsData.filter(r => r.rating === 4).length },
    { stars: 3, count: reviewsData.filter(r => r.rating === 3).length },
    { stars: 2, count: reviewsData.filter(r => r.rating === 2).length },
    { stars: 1, count: reviewsData.filter(r => r.rating === 1).length },
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-blue-50 via-white to-red-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
            {t("reviews.badge")}
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {t("reviews.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">{t("reviews.titleHighlight")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Rating Summary */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="p-8 border-2 border-gray-200 shadow-xl bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Overall Rating */}
              <div className="text-center border-gray-200 md:border-r">
                <div className="mb-2 text-6xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${
                        star <= averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-600">{t("reviews.basedOn")} {totalReviews} {t("reviews.reviews")}</p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent-600 hover:text-accent-700 font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  {t("reviews.viewGoogle")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <span className="w-12 text-sm font-semibold text-gray-700">{item.stars} ★</span>
                    <div className="flex-1 h-3 overflow-hidden bg-gray-200 rounded-full">
                      <div
                        className="h-full transition-all rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        style={{ width: `${(item.count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-right text-gray-600">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews - Mobile: Carousel */}
        <div className="mb-12 md:hidden">
          <div className="relative">
            {/* Current Review Card */}
            <div className="relative bg-white border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 text-sm font-bold text-white rounded-full w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600">
                    {reviewsData[currentMobileReview].avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-sm">{reviewsData[currentMobileReview].author}</h3>
                      {reviewsData[currentMobileReview].verified && (
                        <span className="text-accent-600" title={t("reviews.verified")}>✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= reviewsData[currentMobileReview].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Location and Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{reviewsData[currentMobileReview].location}</span>
                  <span>•</span>
                  <span>{reviewsData[currentMobileReview].date}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-gray-700">{reviewsData[currentMobileReview].text}</p>

                {/* Helpful Button */}
                <div className="pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-xs text-gray-600 transition-colors hover:text-primary-600">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{t("reviews.helpful")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevMobileReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all z-10"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextMobileReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all z-10"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMobileReview(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentMobileReview 
                    ? 'bg-primary-600 w-6' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Reviews Grid - Desktop */}
        <div className="hidden md:grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {reviewsData.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="relative bg-white border-2 border-gray-200 shadow-xl rounded-2xl hover:shadow-2xl hover:border-accent-200 transition-all overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-100">
                <Quote className="w-12 h-12" />
              </div>

              {/* Header */}
              <div className="p-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 text-base font-bold text-white rounded-full w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-base">{review.author}</h3>
                      {review.verified && (
                        <span className="text-accent-600" title={t("reviews.verified")}>✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Location and Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-base leading-relaxed text-gray-700">{review.text}</p>

                {/* Helpful Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{t("reviews.helpful")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver Todas Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setShowAllReviews(true);
              setCurrentModalReview(0);
            }}
            className="px-8 py-4 font-bold transition-all border-2 rounded-lg border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
          >
            {t("reviews.viewAll")} ({reviewsData.length})
          </button>
        </div>

        {/* Modal de Todas las Reseñas */}
        {showAllReviews && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setShowAllReviews(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAllReviews(false)}
              className="absolute top-4 right-4 z-50 p-2 text-white transition-colors bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevModalReview();
              }}
              className="absolute left-4 z-50 p-3 text-white transition-all bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextModalReview();
              }}
              className="absolute right-4 z-50 p-3 text-white transition-all bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Review Card */}
            <div className="w-full max-w-3xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary-100">
                  <Quote className="w-16 h-16" />
                </div>

                {/* Header */}
                <div className="p-6 md:p-8 border-b-2 border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 text-xl font-bold text-white rounded-full w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600">
                      {reviewsData[currentModalReview].avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-xl">{reviewsData[currentModalReview].author}</h3>
                        {reviewsData[currentModalReview].verified && (
                          <span className="text-accent-600 text-xl" title={t("reviews.verified")}>✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= reviewsData[currentModalReview].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  {/* Location and Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{reviewsData[currentModalReview].location}</span>
                    <span>•</span>
                    <span>{reviewsData[currentModalReview].date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-lg leading-relaxed text-gray-700">{reviewsData[currentModalReview].text}</p>

                  {/* Helpful Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{t("reviews.helpful")}</span>
                    </button>
                  </div>
                </div>

                {/* Counter */}
                <div className="px-6 py-4 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-100">
                  {currentModalReview + 1} / {reviewsData.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
