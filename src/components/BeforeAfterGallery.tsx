"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image"; 
import { 
  X, 
  MapPin, 
  MoveHorizontal,
  ChevronRight,
  Sparkles,
  Construction
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header"; 

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export default function CleanEpicLightBeforeAfterGallery() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [filter, setFilter] = useState("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeId, setActiveId] = useState<number>(1);
  const [comparePosition, setComparePosition] = useState(50);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // --- 1. LÓGICA DE CIERRE POR NAVEGACIÓN ---
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showAllPhotos && target.closest('a')) {
        setShowAllPhotos(false);
      }
    };

    const handleCloseOverlays = () => {
      if (showAllPhotos) setShowAllPhotos(false);
    };

    if (showAllPhotos) {
      window.addEventListener('click', handleGlobalClick);
      window.addEventListener('app:close-overlays', handleCloseOverlays as EventListener);
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('app:close-overlays', handleCloseOverlays as EventListener);
    };
  }, [showAllPhotos]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: showAllPhotos } }));

    return () => {
      window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: false } }));
    };
  }, [showAllPhotos]);

  // --- 2. BLOQUEO DE SCROLL EN EL BODY (AGREGADO) ---
  useEffect(() => {
    if (showAllPhotos) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAllPhotos]);

  // --- MÉTODOS DE CONTROL Y SCROLL ---
  const scrollToViewer = () => {
    const viewer = document.getElementById("main-viewer");
    if (viewer) {
      viewer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const updateComparePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    window.requestAnimationFrame(() => {
      setComparePosition(Math.max(0, Math.min(100, position)));
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsManualControl(false);
    setIsPaused(false);
  }, []);

  // --- DATOS DE LA GALERÍA ---
  const galleryData: GalleryItem[] = useMemo(() => {
    const imagesBefore = [
      "/images/gallery/pintura-interiores-casas-orlando-fl.webp", 
      "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
      "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp"
    ];
    
    const imagesAfter = [
      "/images/gallery/pintores-exteriores-residenciales-orlando.webp", 
      "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
      "/images/gallery/pintura-interiores-casas-orlando-fl.webp"
    ];

    return Array.from({ length: 8 }).map((_, index) => {
      const id = index + 1;
      return {
        id,
        title: t(`gallery.projects.${id}.title`) || `Premier Project ${id}`,
        location: t(`gallery.projects.${id}.location`) || "Orlando, FL",
        service: t(`gallery.projects.${id}.service`) || (index % 2 === 0 ? "interior" : "exterior"),
        beforeImage: imagesBefore[index % imagesBefore.length],
        afterImage: imagesAfter[index % imagesAfter.length],
        description: t(`gallery.projects.${id}.description`) || "Precision coating and restoration for high-end properties.",
      };
    });
  }, [t]);

  const filteredGallery = useMemo(() => {
    return filter === "all" 
      ? galleryData 
      : galleryData.filter(item => item.service.toLowerCase() === filter.toLowerCase());
  }, [galleryData, filter]);

  const activeItem = useMemo(() => {
    return filteredGallery.find(item => item.id === activeId) || filteredGallery[0];
  }, [filteredGallery, activeId]);

  // --- EFECTOS DE AUTOPLAY Y EVENTOS ---
  useEffect(() => {
    if (isPaused || showAllPhotos || isManualControl) return;
    const interval = setInterval(() => {
      const currentIndex = filteredGallery.findIndex(item => item.id === activeId);
      const nextIndex = (currentIndex + 1) % filteredGallery.length;
      setActiveId(filteredGallery[nextIndex].id);
      setComparePosition(50);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeId, filteredGallery, isPaused, showAllPhotos, isManualControl]);

  useEffect(() => {
    if (!isManualControl) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateComparePosition(x);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isManualControl, updateComparePosition, handleDragEnd]);

  return (
    <section id="gallery" className="relative py-20 lg:py-32 bg-white overflow-hidden antialiased selection:bg-primary-100">
      
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-16 text-left">
        
        {/* HEADER DE SECCIÓN */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-600 mb-8 shadow-xl shadow-primary-100 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-sans text-[10px] font-bold text-white uppercase tracking-[0.3em]">
              {t("gallery.badge") || "QUALITY ASSURANCE"}
            </span>
          </div>
          
          <h2 className="flex flex-col gap-1 mb-10">
            <span className="font-display text-4xl md:text-6xl font-bold text-slate-950 uppercase tracking-tightest leading-[0.95]">
              {t("gallery.title") || "STUNNING"}
            </span>
            <span className="font-serif text-3xl md:text-6xl italic font-normal text-primary-600 leading-none">
              {t("gallery.titleHighlight") || "transformations"}
            </span>
          </h2>

          <div className="flex gap-6 items-stretch mb-12">
            <div className="w-[2px] bg-primary-600 rounded-full flex-shrink-0" />
            <p className="font-sans text-lg text-slate-500 font-medium leading-relaxed max-w-xl opacity-90">
              {t("gallery.subtitle") || "Witness the power of precision. Every brushstroke is a commitment to perfection."}
            </p>
          </div>
        </div>

        {/* MAIN VIEWER (BEFORE/AFTER) */}
        {activeItem && (
          <div id="main-viewer" className="relative mb-16 scroll-mt-28">
            <div 
              className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[21/10] rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-2xl transform-gpu"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !isManualControl && setIsPaused(false)}
            >
              <div ref={sliderRef} className="w-full h-full relative cursor-ew-resize touch-none select-none">
                <div className="absolute inset-0 z-0">
                  <Image src={activeItem.beforeImage} alt="Before" fill priority quality={95} className="object-cover" />
                  <div className="font-sans absolute top-8 right-8 px-5 py-2 bg-slate-950/80 backdrop-blur-md rounded-full text-white text-[9px] font-bold uppercase tracking-[0.2em] z-20 border border-white/10">
                    {t("gallery.before") || "Before"}
                  </div>
                </div>

                <div 
                  className="absolute inset-0 transform-gpu z-10 pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                >
                  <Image src={activeItem.afterImage} alt="After" fill priority quality={95} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  <div className="font-sans absolute top-8 left-8 px-5 py-2 bg-primary-600 rounded-full text-white text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl z-20">
                    {t("gallery.after") || "After"}
                  </div>

                  <div className="hidden lg:flex absolute bottom-12 left-12 right-12 items-end justify-between">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                        <MapPin className="w-3 h-3 text-primary-400" />
                        <span className="font-sans text-[9px] font-bold text-white uppercase tracking-widest">{activeItem.location}</span>
                      </div>
                      <h3 className="font-display text-5xl text-white font-bold leading-none mb-4 uppercase tracking-tighter">
                        {activeItem.title}
                      </h3>
                      <p className="font-sans text-base text-slate-100 font-light line-clamp-2 max-w-lg opacity-90 italic">
                        {activeItem.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="absolute inset-y-0 w-1 bg-white/50 backdrop-blur-sm pointer-events-auto z-40 transform-gpu" 
                  style={{ left: `${comparePosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div
                      className="w-14 h-14 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-[6px] border-white/30 cursor-ew-resize hover:scale-110 active:scale-95 transition-transform"
                      onMouseDown={() => { setIsManualControl(true); setIsPaused(true); }}
                      onTouchStart={() => { setIsManualControl(true); setIsPaused(true); }}
                    >
                      <MoveHorizontal className="text-primary-600 w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAROUSEL Y BOTÓN "VER TODAS" */}
        <div className="flex flex-col md:flex-row items-stretch gap-6 pt-10 border-t border-slate-100">
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide flex-1 snap-x no-scrollbar">
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveId(item.id); setComparePosition(50); scrollToViewer(); }}
                className={`relative flex-[0_0_160px] md:flex-[0_0_260px] aspect-video rounded-[2rem] overflow-hidden snap-start transition-all duration-500 border-2 ${
                  activeId === item.id ? "border-primary-600 scale-95 shadow-xl" : "border-transparent"
                }`}
              >
                <Image src={item.afterImage} alt="" fill className="object-cover" sizes="260px" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-5">
                   <span className="font-sans text-[9px] font-black text-white uppercase tracking-widest truncate">{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowAllPhotos(true)}
            className="group relative flex flex-col items-center justify-center w-full md:w-52 bg-slate-950 text-white rounded-[2rem] overflow-hidden py-10 md:py-0 transition-all duration-500 shadow-xl"
          >
            <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em]">{t("gallery.viewAll") || "Full Gallery"}</span>
            </div>
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {["all", "interior", "exterior", "cabinet", "commercial"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`group relative overflow-hidden px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
                filter === f 
                ? "bg-primary-600 text-white border-primary-600 shadow-xl" 
                : "bg-white text-slate-500 border-slate-100 hover:text-white"
              }`}
            >
              {filter !== f && (
                <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              )}
              <span className="relative z-10">{t(`gallery.filters.${f}`) || f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEPARADOR DE SECCIÓN */}
      <div className="absolute bottom-6 left-0 w-full translate-y-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-6 w-full max-w-[1440px] px-6 lg:px-16 mx-auto">
          <div className="h-[2px] flex-grow bg-slate-200" />
          <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-slate-200 flex-shrink-0 shadow-md">
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
            <span className="font-sans text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Section Portfolio</span>
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
          </div>
          <div className="h-[2px] flex-grow bg-slate-200" />
        </div>
      </div>

      {/* --- MODAL FULL GALLERY --- */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[40] bg-white overflow-y-auto animate-in fade-in duration-500">
          <Header forceSolid />
          <div className="pt-32 md:pt-48 pb-20 px-6 lg:px-16">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center shadow-sm">
                  <Construction className="w-10 h-10 text-primary-600 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tightest text-slate-950">
                    PORTAFOLIO DE PROYECTOS
                  </h2>
                  <div className="flex justify-center">
                    <div className="h-1 w-24 bg-primary-600 rounded-full" />
                  </div>
                  <p className="font-sans text-slate-400 font-black uppercase tracking-[0.6em] text-[10px] md:text-xs">
                    TRABAJANDO EN ELLO...
                  </p>
                </div>
                <div className="pt-10">
                  <button 
                    onClick={() => setShowAllPhotos(false)} 
                    className="group flex items-center gap-4 px-12 py-5 bg-slate-950 text-white rounded-2xl transition-all hover:bg-primary-600 active:scale-95 shadow-2xl"
                  >
                    <X size={16} />
                    <span className="font-sans text-[10px] font-black uppercase tracking-widest">
                      Cerrar Portafolio
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}