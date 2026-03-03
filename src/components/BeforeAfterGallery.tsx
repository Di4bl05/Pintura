"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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

export default function BeforeAfterGallery() {
  const { t } = useLanguage();
  
  // Datos de galería traducidos dinámicamente
  const galleryData: GalleryItem[] = useMemo(() => [
    {
      id: 1,
      title: t("gallery.projects.1.title"),
      location: t("gallery.projects.1.location"),
      service: t("gallery.projects.1.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0001.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0002.jpg",
      description: t("gallery.projects.1.description")
    },
    {
      id: 2,
      title: t("gallery.projects.2.title"),
      location: t("gallery.projects.2.location"),
      service: t("gallery.projects.2.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0003.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0004.jpg",
      description: t("gallery.projects.2.description")
    },
    {
      id: 3,
      title: t("gallery.projects.3.title"),
      location: t("gallery.projects.3.location"),
      service: t("gallery.projects.3.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0005.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0006.jpg",
      description: t("gallery.projects.3.description")
    },
    {
      id: 4,
      title: t("gallery.projects.4.title"),
      location: t("gallery.projects.4.location"),
      service: t("gallery.projects.4.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0007.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0008.jpg",
      description: t("gallery.projects.4.description")
    },
    {
      id: 5,
      title: t("gallery.projects.5.title"),
      location: t("gallery.projects.5.location"),
      service: t("gallery.projects.5.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0009.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0010.jpg",
      description: t("gallery.projects.5.description")
    },
    {
      id: 6,
      title: t("gallery.projects.6.title"),
      location: t("gallery.projects.6.location"),
      service: t("gallery.projects.6.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0011.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0012.jpg",
      description: t("gallery.projects.6.description")
    },
    {
      id: 7,
      title: t("gallery.projects.7.title"),
      location: t("gallery.projects.7.location"),
      service: t("gallery.projects.7.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0013.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0014.jpg",
      description: t("gallery.projects.7.description")
    },
    {
      id: 8,
      title: t("gallery.projects.8.title"),
      location: t("gallery.projects.8.location"),
      service: t("gallery.projects.8.service"),
      beforeImage: "/images/gallery/IMG-20260225-WA0015.jpg",
      afterImage: "/images/gallery/IMG-20260225-WA0016.jpg",
      description: t("gallery.projects.8.description")
    }
  ], [t]);
  
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const [isManualControl, setIsManualControl] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation with pauses
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isPaused) return;

    const pauseDuration = 3000; // Pausa de 3 segundos
    const scrollDuration = 500; // Duración del deslizamiento
    let intervalId: NodeJS.Timeout;

    const slideToNext = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const currentScroll = carousel.scrollLeft;
      
      // Si llegamos al final, volver al inicio
      if (currentScroll >= maxScroll - 10) { // -10 para margen de error
        carousel.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll a la siguiente tarjeta visible
        const firstCard = carousel.querySelector('div[class*="flex-shrink-0"]');
        if (firstCard) {
          const cardWidth = (firstCard as HTMLElement).offsetWidth + 24; // ancho + gap
          carousel.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
          });
        }
      }
    };

    // Configurar el intervalo para las slides
    intervalId = setInterval(slideToNext, pauseDuration + scrollDuration);

    return () => clearInterval(intervalId);
  }, [isPaused, filter]);


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
    // Solo mover si está en control manual
    if (!isManualControl) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setComparePosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleClick = () => {
    // Activar/desactivar control manual con clic
    setIsManualControl(prev => !prev);
  };

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setComparePosition(50);
    setIsManualControl(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsManualControl(false);
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
    setIsManualControl(false);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-red-50 via-white to-blue-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-16 text-center">
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 text-xs md:text-sm font-semibold text-primary-700 bg-primary-100 rounded-full">
            {t("gallery.badge")}
          </div>
          <h2 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t("gallery.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-600">{t("gallery.titleHighlight")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-600">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-3 py-1.5 md:px-6 md:py-3 rounded-full text-xs md:text-base font-semibold transition-all ${
                filter === filterItem.id
                  ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        {/* Botón "Ver todas" - visible en todos los dispositivos */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-secondary-600 to-secondary-700 hover:shadow-xl"
          >
            <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
            {t('gallery.viewAll')}
          </button>
        </div>

        {/* Gallery Carrusel */}
        <div className="relative">
          {/* Carrusel en todos los dispositivos */}
          <div className="relative overflow-hidden">
            {/* Flechas de navegación */}
            <button
              onClick={() => {
                if (carouselRef.current) {
                  const firstCard = carouselRef.current.querySelector('div[class*="flex-shrink-0"]');
                  if (firstCard) {
                    const cardWidth = (firstCard as HTMLElement).offsetWidth + 24;
                    carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                  }
                }
              }}
              className="absolute z-10 flex items-center justify-center w-12 h-12 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-lg left-2 top-1/2 hover:bg-gray-100 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => {
                if (carouselRef.current) {
                  const firstCard = carouselRef.current.querySelector('div[class*="flex-shrink-0"]');
                  if (firstCard) {
                    const cardWidth = (firstCard as HTMLElement).offsetWidth + 24;
                    carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                  }
                }
              }}
              className="absolute z-10 flex items-center justify-center w-12 h-12 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-lg right-2 top-1/2 hover:bg-gray-100 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            <div 
              ref={carouselRef}
              className="flex gap-6 mb-6 overflow-x-auto md:mb-12 hide-scrollbar scroll-smooth"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {filteredGallery.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="relative flex-shrink-0 w-[95vw] sm:w-[85vw] md:w-[70vw] lg:w-[45vw] xl:w-[35vw] overflow-hidden transition-all bg-white shadow-xl cursor-pointer group rounded-2xl hover:shadow-2xl border-2 border-gray-200 hover:border-primary-300"
                  onClick={() => openModal(item)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.beforeImage}
                        alt={`${item.title} - ${t("gallery.beforeAlt")}`}
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
                        alt={`${item.title} - ${t("gallery.afterAlt")}`}
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
                  <div className="p-4 md:p-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>📍 {item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal - Vista de Pantalla Completa */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black">
            {/* Controles superpuestos */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 transition-opacity bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-start justify-between max-w-7xl mx-auto">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedItem.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">📍 {selectedItem.location}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-colors bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateGallery("prev")}
              className="absolute z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 transition-all transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full left-2 md:left-4 top-1/2 hover:bg-white/20 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </button>
            <button
              onClick={() => navigateGallery("next")}
              className="absolute z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 transition-all transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full right-2 md:right-4 top-1/2 hover:bg-white/20 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </button>

            {/* Image Comparison - Pantalla Completa */}
            <div 
              className="absolute inset-0 select-none"
              style={{
                cursor: isManualControl ? 'ew-resize' : 'pointer'
              }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
              onTouchMove={(e) => {
                if (!isManualControl) return;
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                setComparePosition(Math.max(0, Math.min(100, percentage)));
              }}
              onTouchStart={() => {
                setIsManualControl(true);
              }}
            >
              {/* Before Image */}
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <img
                  src={selectedItem.beforeImage}
                  alt={t("gallery.beforeAlt")}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-white rounded-lg top-20 md:top-24 left-4 bg-black/70 backdrop-blur-sm">
                  {t("gallery.before")}
                </div>
              </div>

              {/* After Image */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black"
                style={{ clipPath: `polygon(0 0, ${comparePosition}% 0, ${comparePosition}% 100%, 0 100%)` }}
              >
                <img
                  src={selectedItem.afterImage}
                  alt={t("gallery.afterAlt")}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-white rounded-lg top-20 md:top-24 left-4 bg-black/70 backdrop-blur-sm">
                  {t("gallery.after")}
                </div>
              </div>

              {/* Slider */}
              <div 
                className="absolute inset-y-0 w-0.5 md:w-1 bg-white shadow-2xl"
                style={{ left: `${comparePosition}%` }}
              >
                <div className="absolute flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-2xl top-1/2 left-1/2">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 -ml-0.5" />
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700 -mr-0.5" />
                </div>
              </div>
            </div>

            {/* Instrucción en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-xs md:text-sm text-center text-gray-300 max-w-xl mx-auto">
                {isManualControl 
                  ? t("gallery.dragSlider") 
                  : t("gallery.clickToActivate")}
              </p>
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
                  <h2 className="text-xl md:text-2xl font-bold text-white">{t('gallery.fullGallery')}</h2>
                  <p className="text-xs md:text-sm text-gray-300">{galleryData.length} {t('gallery.completedProjects')}</p>
                </div>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-colors bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Grid de todas las fotos */}
              <div className="grid max-w-7xl gap-3 md:gap-4 mx-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleryData.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden transition-all bg-black cursor-pointer group rounded-lg hover:scale-105"
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
                          alt={`${item.title} - ${t("gallery.beforeAlt")}`}
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
                          alt={`${item.title} - ${t("gallery.afterAlt")}`}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Labels - solo en hover */}
                      <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 bg-black/30">
                        <div className="absolute px-2 py-1 text-xs font-semibold text-white rounded top-2 left-2 bg-black/50 backdrop-blur-sm">
                          {t("gallery.before")}
                        </div>
                        <div className="absolute px-2 py-1 text-xs font-semibold text-white rounded top-2 right-2 bg-black/50 backdrop-blur-sm">
                          {t("gallery.after")}
                        </div>
                        <div className="absolute inset-y-0 w-0.5 bg-white/50 left-1/2 transform -translate-x-1/2"></div>
                        <div className="flex items-center justify-center w-full h-full">
                          <Maximize2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
