"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

// Datos de ejemplo - reemplazar con imágenes reales
const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Proyecto de Pintura Exterior",
    location: "Florida",
    service: "Pintura Exterior",
    beforeImage: "/images/gallery/IMG-20260225-WA0001.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0002.jpg",
    description: "Transformación completa de exterior con colores modernos y acabados resistentes al clima de Florida"
  },
  {
    id: 2,
    title: "Pintura Interior Residencial",
    location: "Florida",
    service: "Pintura Interior",
    beforeImage: "/images/gallery/IMG-20260225-WA0003.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0004.jpg",
    description: "Renovación completa de interiores con pintura premium de alta calidad"
  },
  {
    id: 3,
    title: "Deck Staining Profesional",
    location: "Florida",
    service: "Deck Staining",
    beforeImage: "/images/gallery/IMG-20260225-WA0005.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0006.jpg",
    description: "Staining y sellado completo de deck exterior con protección duradera"
  },
  {
    id: 4,
    title: "Proyecto Comercial",
    location: "Florida",
    service: "Pintura Comercial",
    beforeImage: "/images/gallery/IMG-20260225-WA0007.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0008.jpg",
    description: "Pintura comercial profesional con acabados de alta calidad"
  },
  {
    id: 5,
    title: "Pintura de Paredes",
    location: "Florida",
    service: "Pintura Interior",
    beforeImage: "/images/gallery/IMG-20260225-WA0009.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0010.jpg",
    description: "Transformación de interiores con preparación completa de superficies"
  },
  {
    id: 6,
    title: "Exterior Painting",
    location: "Florida",
    service: "Pintura Exterior",
    beforeImage: "/images/gallery/IMG-20260225-WA0011.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0012.jpg",
    description: "Pintura exterior con materiales resistentes al clima de Florida"
  },
  {
    id: 7,
    title: "Proyecto Residencial",
    location: "Florida",
    service: "Pintura Interior",
    beforeImage: "/images/gallery/IMG-20260225-WA0013.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0014.jpg",
    description: "Renovación completa con acabados profesionales y limpieza incluida"
  },
  {
    id: 8,
    title: "Pressure Washing",
    location: "Florida",
    service: "Pressure Washing",
    beforeImage: "/images/gallery/IMG-20260225-WA0015.jpg",
    afterImage: "/images/gallery/IMG-20260225-WA0016.jpg",
    description: "Limpieza profunda con pressure washing profesional"
  }
];

export default function BeforeAfterGallery() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const filters = [
    { id: "all", label: t("gallery.filters.all") },
    { id: "interior", label: t("gallery.filters.interior") },
    { id: "exterior", label: t("gallery.filters.exterior") },
    { id: "comercial", label: t("gallery.filters.commercial") },
    { id: "deck", label: t("gallery.filters.deck") },
    { id: "pressure", label: t("gallery.filters.pressure") }
  ];

  const filteredGallery = filter === "all" 
    ? galleryData 
    : galleryData.filter(item => item.service.toLowerCase().includes(filter));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setComparePosition(Math.max(0, Math.min(100, percentage)));
  };

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setComparePosition(50);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateGallery = (direction: "prev" | "next") => {
    if (!selectedItem) return;
    const currentIndex = galleryData.findIndex(item => item.id === selectedItem.id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? galleryData.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryData.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedItem(galleryData[newIndex]);
    setComparePosition(50);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full">
            {t("gallery.badge")}
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {t("gallery.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">{t("gallery.titleHighlight")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === filterItem.id
                  ? "bg-gradient-to-r from-primary-800 to-accent-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="relative">
          {/* Botón flotante "Ver todas" - visible solo en móvil */}
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all rounded-full shadow-lg md:hidden top-4 right-4 bg-gradient-to-r from-primary-800 to-accent-600 hover:shadow-xl"
          >
            <Maximize2 className="w-4 h-4" />
            Ver Todas
          </button>

          {/* Carrusel en móvil, Grid en desktop */}
          <div className="mb-12 overflow-x-auto md:overflow-visible hide-scrollbar md:grid md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-6 pb-4 pl-4 pr-4 md:pl-0 md:pr-0 md:contents">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-auto overflow-hidden transition-all bg-white shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl"
                  onClick={() => openModal(item)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.beforeImage}
                        alt={`${item.title} - Antes`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    {/* After Image with clip */}
                    <div 
                      className="absolute inset-0 transition-opacity group-hover:opacity-0"
                      style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                    >
                      <img
                        src={item.afterImage}
                        alt={`${item.title} - Después`}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Labels */}
                    <div className="absolute px-3 py-1 text-sm font-semibold text-gray-700 rounded-full top-4 left-4 bg-white/90 backdrop-blur-sm">
                      {t("gallery.before")}
                    </div>
                    <div className="absolute px-3 py-1 text-sm font-semibold text-gray-700 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm">
                      {t("gallery.after")}
                    </div>

                    {/* Divider Line */}
                    <div className="absolute inset-y-0 w-1 transform -translate-x-1/2 bg-white shadow-lg left-1/2">
                      <div className="absolute flex items-center justify-center w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 left-1/2">
                        <ChevronLeft className="w-4 h-4 -ml-1 text-gray-700" />
                        <ChevronRight className="w-4 h-4 -mr-1 text-gray-700" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100">
                      <div className="absolute text-white bottom-4 left-4 right-4">
                        <Maximize2 className="w-6 h-6 mb-2" />
                        <p className="text-sm font-semibold">{t("gallery.clickDetails")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>📍 {item.location}</span>
                      <span className="px-3 py-1 font-semibold rounded-full bg-primary-100 text-primary-700">
                        {item.service}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl overflow-hidden bg-white rounded-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute z-10 flex items-center justify-center w-12 h-12 transition-colors bg-white rounded-full shadow-lg top-4 right-4 hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateGallery("prev")}
                className="absolute z-10 flex items-center justify-center w-12 h-12 transition-colors -translate-y-1/2 bg-white rounded-full shadow-lg left-4 top-1/2 hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={() => navigateGallery("next")}
                className="absolute z-10 flex items-center justify-center w-12 h-12 transition-colors -translate-y-1/2 bg-white rounded-full shadow-lg right-4 top-1/2 hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <div className="grid gap-8 p-8 lg:grid-cols-2">
                {/* Image Comparison */}
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setComparePosition(Math.max(0, Math.min(100, percentage)));
                  }}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img
                      src={selectedItem.beforeImage}
                      alt="Antes"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute px-4 py-2 font-bold text-white rounded-lg top-4 left-4 bg-black/70">
                      ANTES
                    </div>
                  </div>

                  {/* After Image */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: `polygon(0 0, ${comparePosition}% 0, ${comparePosition}% 100%, 0 100%)` }}
                  >
                    <img
                      src={selectedItem.afterImage}
                      alt="Después"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute px-4 py-2 font-bold text-white rounded-lg top-4 left-4 bg-black/70">
                      DESPUÉS
                    </div>
                  </div>

                  {/* Slider */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white shadow-2xl"
                    style={{ left: `${comparePosition}%` }}
                  >
                    <div className="absolute flex items-center justify-center w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-2xl top-1/2 left-1/2">
                      <ChevronLeft className="w-5 h-5 text-gray-700 -ml-0.5" />
                      <ChevronRight className="w-5 h-5 text-gray-700 -mr-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
                        {selectedItem.service}
                      </span>
                      <h3 className="mb-2 text-3xl font-bold text-gray-900">{selectedItem.title}</h3>
                      <p className="flex items-center gap-2 text-gray-600">
                        📍 {selectedItem.location}
                      </p>
                    </div>

                    <div className="h-px bg-gray-200"></div>

                    <p className="text-lg leading-relaxed text-gray-700">
                      {selectedItem.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 text-center rounded-lg bg-gray-50">
                        <div className="mb-1 text-2xl font-bold text-primary-600">✓</div>
                        <div className="text-sm text-gray-600">Preparación</div>
                      </div>
                      <div className="p-4 text-center rounded-lg bg-gray-50">
                        <div className="mb-1 text-2xl font-bold text-primary-600">🎨</div>
                        <div className="text-sm text-gray-600">Pintura Premium</div>
                      </div>
                      <div className="p-4 text-center rounded-lg bg-gray-50">
                        <div className="mb-1 text-2xl font-bold text-primary-600">⭐</div>
                        <div className="text-sm text-gray-600">Garantizado</div>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="inline-block w-full px-8 py-4 font-bold text-center text-white transition-all rounded-lg bg-gradient-to-r from-primary-800 to-accent-600 hover:from-primary-900 hover:to-accent-700"
                    >
                      Obtén un Proyecto Como Este
                    </a>

                    <p className="text-sm text-center text-gray-500">
                      💡 Arrasta el control deslizante para comparar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal "Ver Todas las Fotos" */}
        {showAllPhotos && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8">
              {/* Header del modal */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 mb-6 bg-black/50 backdrop-blur-md rounded-xl">
                <div>
                  <h2 className="text-2xl font-bold text-white">Galería Completa</h2>
                  <p className="text-sm text-gray-300">{galleryData.length} proyectos completados</p>
                </div>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Grid de todas las fotos */}
              <div className="grid max-w-6xl gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                {galleryData.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden transition-all bg-white cursor-pointer group rounded-xl hover:scale-105"
                    onClick={() => {
                      setShowAllPhotos(false);
                      openModal(item);
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Before Image */}
                      <div className="absolute inset-0">
                        <img
                          src={item.beforeImage}
                          alt={`${item.title} - Antes`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      {/* After Image with clip */}
                      <div 
                        className="absolute inset-0"
                        style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                      >
                        <img
                          src={item.afterImage}
                          alt={`${item.title} - Después`}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Labels */}
                      <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 rounded-full top-2 left-2 bg-white/90 backdrop-blur-sm">
                        ANTES
                      </div>
                      <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 rounded-full top-2 right-2 bg-white/90 backdrop-blur-sm">
                        DESPUÉS
                      </div>

                      {/* Center divider */}
                      <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg left-1/2 transform -translate-x-1/2"></div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                        <div className="flex items-center justify-center w-full h-full text-white">
                          <Maximize2 className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="mb-1 text-sm font-bold text-gray-900">{item.title}</h3>
                      <p className="text-xs text-gray-600">📍 {item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-lg font-bold text-white transition-all rounded-lg shadow-lg bg-gradient-to-r from-primary-800 to-accent-600 hover:from-primary-900 hover:to-accent-700 hover:shadow-xl"
          >
            {t("gallery.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
