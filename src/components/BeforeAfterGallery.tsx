"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Palette, 
  MapPin, 
  MousePointer2,
  MoveHorizontal
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

export default function BeforeAfterGallery() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [isManualControl, setIsManualControl] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // 1. GENERACIÓN DE DATOS (Mantiene los 8 slots con las 3 imágenes del Hero)
  const galleryData: GalleryItem[] = useMemo(() => {
    const heroImages = [
      "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
      "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
      "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp"
    ];

    return Array.from({ length: 8 }).map((_, index) => {
      const id = index + 1;
      const imagePath = heroImages[index % heroImages.length]; 
      return {
        id: id,
        title: t(`gallery.projects.${id}.title`) || "Project",
        location: t(`gallery.projects.${id}.location`) || "Orlando",
        service: t(`gallery.projects.${id}.service`) || "interior",
        beforeImage: imagePath,
        afterImage: imagePath,
        description: t(`gallery.projects.${id}.description`) || "",
      };
    });
  }, [t]);

  const filteredGallery = useMemo(() => {
    return filter === "all" 
      ? galleryData 
      : galleryData.filter(item => item.service.toLowerCase() === filter.toLowerCase());
  }, [galleryData, filter]);

  const compareLabel = useMemo(() => {
    if (comparePosition <= 45) return t("gallery.before");
    if (comparePosition >= 55) return t("gallery.after");
    return `${t("gallery.before")} / ${t("gallery.after")}`;
  }, [comparePosition, t]);

  // 2. NAVEGACIÓN (Funcionalidad completa restaurada)
  const navigate = useCallback((direction: "prev" | "next") => {
    const currentIndex = galleryData.findIndex(i => i.id === selectedItem?.id);
    const newIndex = direction === "prev" 
      ? (currentIndex > 0 ? currentIndex - 1 : galleryData.length - 1)
      : (currentIndex < galleryData.length - 1 ? currentIndex + 1 : 0);
    setSelectedItem(galleryData[newIndex]);
    setComparePosition(50);
  }, [galleryData, selectedItem]);

  // 3. OPTIMIZACIÓN DE MOVIMIENTO (Hardware Accelerated)
  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isManualControl && e.type !== 'touchmove') return;
    
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    // Usamos requestAnimationFrame para sincronizar con los Hz del monitor
    window.requestAnimationFrame(() => {
      setComparePosition(Math.max(0, Math.min(100, position)));
    });
  }, [isManualControl]);

  // 4. AUTO-SCROLL (Mismo intervalo que el original)
  useEffect(() => {
    if (isPaused || showAllPhotos || selectedItem) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const target = scrollLeft + clientWidth >= scrollWidth - 10 ? 0 : scrollLeft + 400;
        carouselRef.current.scrollTo({ left: target, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, showAllPhotos, selectedItem]);

  return (
    <section id="gallery" className="relative py-24 bg-[#f8fafc] overflow-hidden antialiased">
      {/* Fondo Decorativo Original */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 mb-6 shadow-xl shadow-blue-100">
            <Palette className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{t("gallery.badge")}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-8">
            {t("gallery.title")}<br/>
            <span className="relative inline-block text-blue-600 italic">
              {t("gallery.titleHighlight")}
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-600/10 rounded-full -z-10" />
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto italic">{t("gallery.subtitle")}</p>
        </div>

        {/* FILTROS COMPLETOS */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["all", "interior", "exterior", "commercial", "cabinet", "deck", "pressure"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filter === f ? "bg-slate-950 text-white shadow-xl scale-105" : "bg-white text-slate-400 border border-slate-100 hover:text-blue-600"
              }`}
            >
              {t(`gallery.filters.${f}`)}
            </button>
          ))}
        </div>

        {/* CAROUSEL */}
        <div className="relative group">
          <div 
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-4"
          >
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => {setSelectedItem(item); setComparePosition(50);}}
                className="flex-[0_0_85%] md:flex-[0_0_400px] snap-center group/card cursor-pointer"
              >
                <div className="bg-white rounded-[2rem] border border-slate-200/50 overflow-hidden transition-all duration-500 group-hover/card:-translate-y-3 group-hover/card:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transform-gpu">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={item.afterImage} loading="lazy" decoding="async" alt={`Proyecto de pintura en ${item.location}: ${item.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tighter">{item.location}</span>
                    </div>
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white p-4 rounded-full shadow-2xl scale-0 group-hover/card:scale-100 transition-transform">
                          <Maximize2 className="w-6 h-6 text-blue-600" />
                       </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter mb-1 leading-none">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-medium italic line-clamp-1 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase tracking-widest">
                      <MousePointer2 className="w-3 h-3" /> {t("gallery.clickDetails")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÓN VER TODAS */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            {t("gallery.viewAll")}
          </button>
        </div>
      </div>

      {/* MODAL DE COMPARACIÓN COMPLETO */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-6 bg-gradient-to-b from-slate-900 to-transparent relative z-20">
            <div className="text-left">
              <h4 className="text-white font-black uppercase italic text-xl leading-none">{selectedItem.title}</h4>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-1">📍 {selectedItem.location}</p>
            </div>
            <button onClick={() => setSelectedItem(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
              <X size={24} />
            </button>
          </div>

          <div 
            className="flex-1 relative cursor-ew-resize select-none overflow-hidden flex items-center justify-center touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseDown={() => setIsManualControl(true)}
            onMouseUp={() => setIsManualControl(false)}
          >
            {/* Antes */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
              <img src={selectedItem.beforeImage} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain rounded-xl opacity-40 grayscale" alt="Before" />
            </div>

            {/* Después */}
            <div 
              className="absolute inset-0 flex items-center justify-center p-4 md:p-12 pointer-events-none transform-gpu"
              style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
            >
              <img src={selectedItem.afterImage} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" alt="After" />
            </div>

            {/* Handle */}
            <div className="absolute inset-y-0 w-1 bg-white flex items-center justify-center pointer-events-none transform-gpu" style={{ left: `${comparePosition}%` }}>
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black rounded-lg border border-white/10 whitespace-nowrap">
                {compareLabel}
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-600">
                <MoveHorizontal className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Navegación dentro del Modal */}
          <div className="p-8 bg-slate-900 text-center border-t border-white/5">
             <p className="text-slate-400 text-xs font-medium italic mb-6">{t("gallery.dragSlider")}</p>
             <div className="flex justify-center gap-4">
                <button onClick={() => navigate("prev")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"><ChevronLeft /></button>
                <button onClick={() => navigate("next")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"><ChevronRight /></button>
             </div>
          </div>
        </div>
      )}

      {/* GRID VIEW MODAL (Show All) */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-6 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12 sticky top-0 bg-white py-4 z-10 border-b">
              <div className="text-left">
                <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{t("gallery.fullGallery")}</h2>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{galleryData.length} {t("gallery.completedProjects")}</p>
              </div>
              <button onClick={() => setShowAllPhotos(false)} className="p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X className="text-slate-900" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryData.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {setShowAllPhotos(false); setSelectedItem(item);}}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg transform-gpu"
                >
                  <img src={item.afterImage} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Resultado final de ${item.title} en ${item.location}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1 text-left">{item.location}</span>
                    <h5 className="text-white font-bold text-lg leading-tight uppercase italic text-left">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
