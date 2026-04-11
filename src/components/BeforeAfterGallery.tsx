"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image"; 
import { 
  X, 
  MapPin, 
  MoveHorizontal,
  ChevronRight,
  Sparkles,
  Quote,
  Star
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

const GoogleIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 48 48" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

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

  // --- 1. LÓGICA DE CIERRE POR NAVEGACIÓN Y OVERLAYS ---
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

  // --- 2. BLOQUEO DE SCROLL ---
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
      const serviceType = index % 2 === 0 ? "interior" : "exterior";
      return {
        id,
        title: t(`gallery.projects.${id}.title`) || `Premier Project ${id}`,
        location: t(`gallery.projects.${id}.location`) || "Orlando, FL",
        service: t(`gallery.projects.${id}.service`) || serviceType,
        beforeImage: imagesBefore[index % imagesBefore.length],
        afterImage: imagesAfter[index % imagesAfter.length],
        description: t(`gallery.projects.${id}.description`) || "Precision coating and restoration for high-end properties with premium finish.",
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

  // --- EFECTOS DE AUTOPLAY Y EVENTOS DE MOUSE/TOUCH ---
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
          <div id="main-viewer" className="relative mb-16 scroll-mt-28 group/viewer">
            <div 
              className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[21/10] rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-2xl transform-gpu"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !isManualControl && setIsPaused(false)}
            >
              <div ref={sliderRef} className="w-full h-full relative cursor-ew-resize touch-none select-none">
                {/* LADO AFTER */}
                <div className="absolute inset-0 z-0">
                  <Image src={activeItem.afterImage} alt="After" fill priority quality={95} className="object-cover" />
                  <div className="font-sans absolute top-8 right-8 px-5 py-2 bg-slate-950/80 backdrop-blur-md rounded-full text-white text-[9px] font-bold uppercase tracking-[0.2em] z-20 border border-white/10">
                    {t("gallery.after") || "AFTER"}
                  </div>
                </div>

                {/* LADO BEFORE CON CLIP PATH */}
                <div 
                  className="absolute inset-0 transform-gpu z-10 pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                >
                  <Image src={activeItem.beforeImage} alt="Before" fill priority quality={95} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90 lg:block hidden" />
                  <div className="font-sans absolute top-8 left-8 px-5 py-2 bg-primary-600 rounded-full text-white text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl z-20">
                    {t("gallery.before") || "BEFORE"}
                  </div>

                  {/* INFO DESKTOP (Solo visible en pantallas grandes como overlay) */}
                  <div className="hidden lg:flex absolute bottom-12 left-12 right-12 items-end justify-between pointer-events-none">
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

                {/* TIRADOR / SLIDER HANDLE */}
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

            {/* INFO MÓVIL (Aparece debajo de la foto en pantallas pequeñas) */}
            <div className="mt-8 lg:hidden space-y-4 px-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                  <MapPin size={12} className="text-primary-600" />
                  <span className="font-sans text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    {activeItem.location}
                  </span>
                </div>
                <div className="h-[1px] flex-1 bg-slate-100" />
              </div>
              <h3 className="font-display text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">
                {activeItem.title}
              </h3>
              <p className="font-sans text-base text-slate-500 font-medium leading-relaxed italic border-l-2 border-primary-600 pl-4">
                {activeItem.description}
              </p>
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
                  activeId === item.id ? "border-primary-600 scale-95 shadow-xl" : "border-transparent opacity-70 hover:opacity-100"
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
              onClick={() => { setFilter(f); setActiveId(galleryData.find(i => f === 'all' || i.service === f)?.id || 1); }}
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
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Header forceSolid />
          
          <div className="pt-32 md:pt-40 pb-20 px-6 lg:px-16">
            <div className="max-w-[1440px] mx-auto">
              
              <div className="flex flex-col mb-12">
                  <span className="font-sans text-primary-600 font-black text-[10px] tracking-[0.4em] uppercase mb-2">
                    Luisbety Impecables • Gallery Selection
                  </span>
                  <div className="h-[1px] w-12 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setActiveId(item.id);
                      setComparePosition(50);
                      setShowAllPhotos(false);
                      setTimeout(scrollToViewer, 100);
                    }}
                    className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 cursor-pointer border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    <Image 
                      src={item.afterImage} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={10} className="text-primary-500" />
                          <span className="text-primary-500 font-sans font-black text-[9px] tracking-[0.2em] uppercase">
                            {item.location}
                          </span>
                        </div>
                        <h3 className="text-white font-display text-2xl font-black uppercase tracking-tighter leading-none mt-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-4 text-white/60">
                          <div className="h-[1px] w-8 bg-primary-600" />
                          <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-primary-400">
                            Ver antes y después
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 flex justify-center">
                 <button 
                  onClick={() => setShowAllPhotos(false)}
                  className="px-10 py-5 bg-slate-950 text-white font-sans font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary-600 transition-colors"
                 >
                   Cerrar Galería
                 </button>
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