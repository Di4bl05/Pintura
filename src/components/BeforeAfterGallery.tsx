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
  const [animationKey, setAnimationKey] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [filter]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isPaused) return;
    const pauseDuration = 3000;
    const scrollDuration = 500;
    let intervalId: NodeJS.Timeout;
    const slideToNext = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const currentScroll = carousel.scrollLeft;
      if (currentScroll >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const firstCard = carousel.querySelector('div[class*="flex-shrink-0"]');
        if (firstCard) {
          const cardWidth = (firstCard as HTMLElement).offsetWidth + 24;
          carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    };
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
    if (!isManualControl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setComparePosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleClick = () => setIsManualControl(prev => !prev);
  const openModal = (item: GalleryItem) => { setSelectedItem(item); setComparePosition(50); setIsManualControl(false); };
  const closeModal = () => { setSelectedItem(null); setIsManualControl(false); };
  const navigateGallery = (direction: "prev" | "next") => {
    if (!selectedItem) return;
    const currentIndex = galleryData.findIndex(item => item.id === selectedItem.id);
    let newIndex = direction === "prev" 
      ? (currentIndex === 0 ? galleryData.length - 1 : currentIndex - 1)
      : (currentIndex === galleryData.length - 1 ? 0 : currentIndex + 1);
    setSelectedItem(galleryData[newIndex]);
    setComparePosition(50);
    setIsManualControl(false);
  };

  return (
    <section id="gallery" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header con el nuevo estilo */}
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            {t("gallery.title")}{" "}
            <span className="text-blue-600 italic">{t("gallery.titleHighlight")}</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Filters - Estilo Unificado */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                filter === filterItem.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white text-slate-500 hover:text-blue-600 border border-slate-200 hover:bg-blue-50"
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        {/* Botón Ver todas */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl"
          >
            <Maximize2 className="w-4 h-4" />
            {t('gallery.viewAll')}
          </button>
        </div>

        {/* Gallery Carrusel Principal */}
        <div className="relative group/carousel">
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
            className="absolute z-10 -left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={24} />
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
            className="absolute z-10 -right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-6 mb-6 overflow-x-auto hide-scrollbar scroll-smooth pb-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {filteredGallery.map((item, index) => (
              <div
                key={`${item.id}-${index}-${animationKey}`}
                className="relative flex-shrink-0 w-[85vw] md:w-[450px] bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] cursor-pointer group"
                onClick={() => openModal(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0">
                    <img src={item.beforeImage} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div 
                    className="absolute inset-0 border-r-2 border-white"
                    style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                  >
                    <img src={item.afterImage} alt="" className="object-cover w-full h-full" />
                  </div>
                  {/* Labels Carrusel */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 text-white text-[10px] font-black uppercase rounded-lg">
                    {t("gallery.before")}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/90 text-white text-[10px] font-black uppercase rounded-lg">
                    {t("gallery.after")}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">📍 {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MODAL PANTALLA COMPLETA (DISEÑO ORIGINAL RESTAURADO) --- */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black">
            <div className="absolute top-0 left-0 right-0 z-20 p-4 transition-opacity bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-start justify-between max-w-7xl mx-auto">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedItem.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">📍 {selectedItem.location}</p>
                </div>
                <button onClick={closeModal} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-colors bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
            </div>

            <button onClick={() => navigateGallery("prev")} className="absolute z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 transition-all transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full left-2 md:left-4 top-1/2 hover:bg-white/20">
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </button>
            <button onClick={() => navigateGallery("next")} className="absolute z-20 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 transition-all transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full right-2 md:right-4 top-1/2 hover:bg-white/20">
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </button>

            <div className="absolute inset-0 select-none" style={{ cursor: isManualControl ? 'ew-resize' : 'pointer' }} onMouseMove={handleMouseMove} onClick={handleClick}>
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <img src={selectedItem.beforeImage} alt={t("gallery.beforeAlt")} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black" style={{ clipPath: `polygon(0 0, ${comparePosition}% 0, ${comparePosition}% 100%, 0 100%)` }}>
                <img src={selectedItem.afterImage} alt={t("gallery.afterAlt")} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold text-white rounded-full bg-black/80 backdrop-blur-sm z-10">
                {comparePosition < 50 ? t("gallery.after") : t("gallery.before")}
              </div>
              <div className="absolute inset-y-0 w-0.5 md:w-1 bg-white shadow-2xl" style={{ left: `${comparePosition}%` }}>
                <div className="absolute flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-2xl top-1/2 left-1/2">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 -ml-0.5" /><ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700 -mr-0.5" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-opacity bg-gradient-to-t from-black/80 to-transparent text-center">
              <p className="text-xs md:text-sm text-gray-300 max-w-xl mx-auto">
                {isManualControl ? t("gallery.dragSlider") : t("gallery.clickToActivate")}
              </p>
            </div>
          </div>
        )}

        {/* --- MODAL VER TODAS (DISEÑO ORIGINAL RESTAURADO) --- */}
        {showAllPhotos && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white/30 backdrop-blur-md">
            <div className="min-h-screen px-4 py-8">
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 mb-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('gallery.fullGallery')}</h2>
                  <p className="text-xs md:text-sm text-gray-600">{galleryData.length} {t('gallery.completedProjects')}</p>
                </div>
                <button onClick={() => setShowAllPhotos(false)} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-colors bg-gray-200/50 backdrop-blur-md rounded-full hover:bg-gray-300/70">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                </button>
              </div>
              <div className="grid max-w-7xl gap-3 md:gap-4 mx-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleryData.map((item) => (
                  <div key={item.id} className="relative overflow-hidden transition-all bg-white shadow-lg cursor-pointer group rounded-lg" onClick={() => { setShowAllPhotos(false); openModal(item); }}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0">
                        <img src={item.beforeImage} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
                        <img src={item.afterImage} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center">
                         <Maximize2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}