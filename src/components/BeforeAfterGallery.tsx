"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { 
  X, 
  MapPin, 
  MoveHorizontal,
  ChevronRight,
  Sparkles
} from "lucide-react";
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

  const galleryData: GalleryItem[] = useMemo(() => {
    const heroImages = [
      "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
      "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
      "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp"
    ];

    return Array.from({ length: 8 }).map((_, index) => {
      const id = index + 1;
      const imagePath = heroImages[index % heroImages.length]; 
      const title = t(`gallery.projects.${id}.title`);
      const location = t(`gallery.projects.${id}.location`);
      const description = t(`gallery.projects.${id}.description`);

      return {
        id,
        title: title.includes("gallery.") ? `Luxury Paint Project ${id}` : title,
        location: location.includes("gallery.") ? "Orlando, FL" : location,
        service: t(`gallery.projects.${id}.service`) || (index % 2 === 0 ? "interior" : "exterior"),
        beforeImage: imagePath,
        afterImage: imagePath,
        description: description.includes("gallery.") ? "Transformación completa de espacios con acabados de alta durabilidad." : description,
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

  useEffect(() => {
    if (isPaused || showAllPhotos) return;
    const interval = setInterval(() => {
      const currentIndex = filteredGallery.findIndex(item => item.id === activeId);
      const nextIndex = (currentIndex + 1) % filteredGallery.length;
      if (filteredGallery.length > 0) {
        const nextItem = filteredGallery[nextIndex];
        setActiveId(nextItem.id);
        setComparePosition(50);
        if (carouselRef.current) {
          const container = carouselRef.current;
          const activeThumb = container.children[nextIndex] as HTMLElement;
          if (activeThumb) {
            container.scrollTo({
              left: activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2,
              behavior: "smooth"
            });
          }
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [activeId, filteredGallery, isPaused, showAllPhotos]);

  useEffect(() => {
    if (!isManualControl) return;
    const handleWindowMouseMove = (e: MouseEvent) => updateComparePosition(e.clientX);
    const handleWindowTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateComparePosition(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);
    window.addEventListener("touchcancel", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
      window.removeEventListener("touchcancel", handleDragEnd);
    };
  }, [isManualControl, updateComparePosition, handleDragEnd]);

  const handleSelectProject = (id: number) => {
    setActiveId(id);
    setShowAllPhotos(false);
    setTimeout(() => {
      const viewer = document.getElementById('main-viewer');
      if (viewer) {
        const y = viewer.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <section id="gallery" className="relative py-16 lg:py-24 bg-white overflow-hidden antialiased selection:bg-none">
      
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[130px] rounded-full -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col mb-16 md:mb-24 text-left max-w-5xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 mb-8 shadow-xl shadow-blue-100 w-fit">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {t("gallery.badge") || "PORTAFOLIO DE EXCELENCIA"}
            </span>
          </div>
          
          <h2 className="flex flex-col mb-10">
            <span className="text-4xl md:text-6xl font-extrabold text-slate-950 uppercase tracking-tighter leading-[0.9]">
              {t("gallery.title") || "RESULTADOS DE"}
            </span>
            <span className="text-4xl md:text-6xl font-serif italic font-semibold text-blue-600 block lowercase md:mt-2 tracking-tight relative w-fit">
              {t("gallery.titleHighlight") || "Luisbety Impecables"}
            </span>
          </h2>

          <div className="flex gap-4 md:gap-6 items-stretch max-w-2xl">
            <div className="w-[2px] bg-blue-600 rounded-full flex-shrink-0" />
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg pl-2 italic">
              {t("gallery.subtitle") || "No solo pintamos paredes, devolvemos la vida a sus espacios."}
            </p>
          </div>
        </div>

        {/* Visor Principal */}
        {activeItem && (
          <div className="flex flex-col gap-8 mb-12">
            <div 
              id="main-viewer"
              className="relative w-full aspect-[4/5] lg:aspect-[21/9] rounded-[3rem] overflow-hidden bg-white border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transform-gpu"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !isManualControl && setIsPaused(false)}
            >
              <div ref={sliderRef} className="w-full h-full relative touch-none">
                <div className="absolute inset-0 select-none pointer-events-none">
                  <img src={activeItem.beforeImage} className="w-full h-full object-cover" alt="Antes" />
                  <div className="absolute top-8 right-8 px-5 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest z-10">
                    {t("gallery.before") || "ANTES"}
                  </div>
                </div>

                <div 
                  className="absolute inset-0 transform-gpu z-10 select-none pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                >
                  <img src={activeItem.afterImage} className="w-full h-full object-cover" alt="Después" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none hidden lg:block" />
                  <div className="absolute top-8 left-8 px-5 py-2 bg-blue-600 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {t("gallery.after") || "DESPUÉS"}
                  </div>

                  <div className="hidden lg:block absolute bottom-12 left-12 max-w-xl text-left">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{activeItem.location}</span>
                    </div>
                    <h3 className="text-5xl font-serif italic text-white leading-none mb-4 drop-shadow-xl font-semibold">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm lg:text-base text-slate-100 font-medium line-clamp-2 pl-1">
                      {activeItem.description}
                    </p>
                  </div>
                </div>

                <div 
                  className="absolute inset-y-0 w-[2px] bg-white pointer-events-auto transform-gpu z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]" 
                  style={{ left: `${comparePosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div
                      className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-slate-100 cursor-ew-resize hover:scale-110 transition-transform duration-300"
                      onMouseDown={() => { setIsManualControl(true); setIsPaused(true); }}
                      onTouchStart={() => { setIsManualControl(true); setIsPaused(true); }}
                    >
                      <MoveHorizontal className="text-blue-600 w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block lg:hidden text-left px-4">
              <div className="inline-flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{activeItem.location}</span>
              </div>
              <h3 className="text-3xl font-serif italic font-semibold text-slate-900 leading-tight mb-2 uppercase lowercase-first">
                {activeItem.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                {activeItem.description}
              </p>
            </div>
          </div>
        )}

        {/* Carrusel Inferior */}
        <div className="flex items-center justify-between gap-6 pt-8 border-t border-slate-200/60 mb-12">
          <div 
            ref={carouselRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 scrollbar-hide flex-1 snap-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectProject(item.id)}
                className={`relative flex-[0_0_160px] lg:flex-[0_0_280px] aspect-[4/3] rounded-[2rem] p-2 border overflow-hidden snap-start transition-all duration-700 transform ${
                  activeId === item.id 
                    ? "bg-white border-blue-100 shadow-xl scale-105" 
                    : "bg-transparent border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[1.5rem]">
                   <img src={item.afterImage} className="w-full h-full object-cover" alt={item.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest truncate">{item.title}</span>
                   </div>
                </div>
              </button>
            ))}
          </div>

          {/* Botón Ver Todo con efecto Slide-Up */}
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="group relative overflow-hidden hidden lg:flex flex-col items-center justify-center flex-[0_0_120px] aspect-[4/3] bg-slate-950 text-white rounded-[2.5rem] shadow-xl transition-all"
          >
            {/* Fondo que sube en hover */}
            <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
            
            <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <span className="relative z-10 text-[9px] font-black uppercase tracking-tighter text-center px-1">Ver Todo</span>
          </button>
        </div>

        {/* Filtros Suavizados con efecto Slide-Up y colores Negro/Azul */}
        <div className="flex flex-wrap justify-center gap-3 py-3">
          {["all", "interior", "exterior", "cabinet", "commercial"].map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`group relative overflow-hidden px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-sm ${
                  isActive ? "bg-blue-600 text-white scale-105 shadow-blue-100" : "bg-slate-950 text-white"
                }`}
              >
                {/* Capa de efecto (solo visible si no está activo, para simular la transición a azul) */}
                {!isActive && (
                  <div className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
                )}
                
                <span className="relative z-10">
                  {t(`gallery.filters.${f}`) || (f === "all" ? "Todos" : f)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Galería Completa */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-500">
          <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 w-full px-6 md:px-12 py-6">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center text-left gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif italic text-slate-950 lowercase tracking-tight leading-none font-semibold">
                   {t("gallery.fullGallery") || "Galería Completa"}
                </h2>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-2">
                  {galleryData.length} {t("gallery.completedProjects") || "Proyectos Finalizados"}
                </p>
              </div>
              <button 
                onClick={() => setShowAllPhotos(false)} 
                className="p-3 bg-slate-100 text-slate-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {galleryData.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleSelectProject(item.id)}
                  className="group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer bg-slate-50 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <img src={item.afterImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-fit">
                      <MapPin className="w-3 h-3 text-white" />
                      <span className="text-[9px] lg:text-[10px] text-white font-black uppercase tracking-widest truncate">{item.location}</span>
                    </div>
                    <h5 className="text-2xl lg:text-3xl font-serif italic text-white leading-tight mb-1 font-semibold">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEPARADOR FLOTANTE CON LÍNEA INTEGRADA */}
      <div className="absolute bottom-4 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-5xl mx-auto px-4 relative flex items-center justify-center">
          
          {/* La Línea (ahora es visible y no llega a los bordes) */}
          <div className="absolute w-full h-px bg-slate-200" />
          
          {/* El Badge (con fondo blanco para tapar la línea justo detrás del texto) */}
          <div className="relative flex items-center gap-3 bg-white px-7 py-3 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
            
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.4em] whitespace-nowrap">
              Flawless Results
            </span>
            
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] animate-pulse" />
          </div>
          
        </div>
      </div>
 

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}