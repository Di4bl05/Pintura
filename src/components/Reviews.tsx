"use client";

import { useState } from "react";
import { Star, Quote, MapPin, ThumbsUp, ExternalLink } from "lucide-react";

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
  const [visibleReviews, setVisibleReviews] = useState(3);
  
  const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;
  const totalReviews = reviewsData.length;

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, reviewsData.length));
  };

  const ratingDistribution = [
    { stars: 5, count: reviewsData.filter(r => r.rating === 5).length },
    { stars: 4, count: reviewsData.filter(r => r.rating === 4).length },
    { stars: 3, count: reviewsData.filter(r => r.rating === 3).length },
    { stars: 2, count: reviewsData.filter(r => r.rating === 2).length },
    { stars: 1, count: reviewsData.filter(r => r.rating === 1).length },
  ];

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
            ⭐ RESEÑAS DE CLIENTES
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Lo que dicen nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">clientes</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        {/* Rating Summary */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="p-8 border border-gray-100 shadow-lg bg-gradient-to-br from-gray-50 to-white rounded-2xl">
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
                <p className="font-semibold text-gray-600">Basado en {totalReviews} reseñas</p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent-600 hover:text-accent-700 font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  Ver en Google Maps
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

        {/* Reviews Grid */}
        <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {reviewsData.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="relative p-8 transition-shadow bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-100">
                <Quote className="w-12 h-12" />
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 text-lg font-bold text-white rounded-full w-14 h-14 bg-gradient-to-br from-primary-600 to-orange-600">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{review.author}</h3>
                    {review.verified && (
                      <span className="text-accent-600" title="Reseña Verificada">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="leading-relaxed text-gray-700">{review.text}</p>

              {/* Helpful Button */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleReviews < reviewsData.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-8 py-4 font-bold transition-all border-2 rounded-lg border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              Ver Más Reseñas
            </button>
          </div>
        )}

        {/* CTA Box */}
        <div className="p-8 mt-16 text-center text-white shadow-xl bg-gradient-to-r from-primary-600 to-orange-600 rounded-2xl md:p-12">
          <h3 className="mb-4 text-3xl font-bold">¿Listo para transformar tu espacio?</h3>
          <p className="mb-8 text-xl opacity-90">
            Únete a nuestros cientos de clientes satisfechos
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-lg font-bold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
          >
            Solicita tu Presupuesto Gratuito
          </a>
        </div>

        {/* Google Integration Note */}
        <div className="mt-8 text-sm text-center text-gray-500">
          <p>
            💡 <strong>Nota para el desarrollador:</strong> Para conectar con Google Places API en tiempo real:
          </p>
          <ol className="max-w-2xl mx-auto mt-4 space-y-2 text-left">
            <li>1. Obtén una API key de Google Places API</li>
            <li>2. Agrega <code className="px-2 py-1 bg-gray-100 rounded">NEXT_PUBLIC_GOOGLE_PLACES_API_KEY</code> en tu archivo .env.local</li>
            <li>3. Usa el Place ID de tu negocio para obtener reseñas en tiempo real</li>
            <li>4. Referencia: <a href="https://developers.google.com/maps/documentation/places/web-service/reviews" className="text-accent-600 hover:underline">Google Places Reviews API</a></li>
          </ol>
        </div>
      </div>
    </section>
  );
}
