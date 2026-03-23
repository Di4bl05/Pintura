"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { 
  X, 
  MapPin, 
  MoveHorizontal,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Star,
  Zap
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

  // --- DATOS DE LA GALERÍA ---
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

  // --- LÓGICA DE AUTO-PLAY ---
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

  // --- MANEJO DEL SLIDER (BEFORE/AFTER) ---
  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isManualControl && e.type !== 'touchmove') return;
    
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
      const position = ((x - rect.left) / rect.width) * 100;
      
      window.requestAnimationFrame(() => {
        setComparePosition(Math.max(0, Math.min(100, position)));
      });
    }
  }, [isManualControl]);

  // --- SELECCIÓN Y ENFOQUE ---
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
    <section id="gallery" className="relative py-12 lg:py-24 bg-white overflow-hidden antialiased selection:bg-none">
      
      <div className="absolute top-0 left-1/4 w-[60rem] h-[60rem] bg-blue-100 rounded-full blur-[150px] pointer-events-none -z-10 opacity-60" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 mb-12 border-b border-slate-100 pb-12 items-center">
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 mb-6 shadow-xl shadow-blue-100">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                {t("gallery.badge") || "PORTAFOLIO DE EXCELENCIA"}
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
              {t("gallery.title") || "RESULTADOS DE"}<br/>
              <span className="relative inline-block text-blue-600 italic mt-2">
                {t("gallery.titleHighlight") || "LUISBETY IMPECABLES"}
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-600/10 rounded-full -z-10" />
              </span>
            </h2>

            <p className="text-lg text-slate-600 font-medium max-w-xl mt-6 italic leading-relaxed border-l-2 border-blue-600 pl-6">
              {t("gallery.subtitle") || "No solo pintamos paredes, devolvemos la vida a sus espacios. Explore nuestras transformaciones más recientes."}
            </p>
          </div>

          {/* INDICADORES DE CONFIANZA */}
          <div className="lg:col-span-5 w-full flex flex-col gap-8 pointer-events-none">
            <div className="flex items-center gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-blue-600/80" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">LICENCIADOS Y ASEGURADOS</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Estándar profesional de Florida</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-black text-orange-500 leading-none">5.0</span>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#f97316" className="text-orange-500 border-none" />)}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">LÍDERES LOCALES</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Satisfacción de clientes verificada</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <Zap className="w-8 h-8 text-slate-950" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">PRESUPUESTO GRATIS</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Respuesta en menos de 24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* VISOR PRINCIPAL (ID para enfoque) */}
        {activeItem && (
          <div 
            id="main-viewer"
            className="relative w-full aspect-[4/5] lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 group mb-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transform-gpu transition-all duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setIsManualControl(false);
            }}
          >
            <div 
              ref={sliderRef}
              className="w-full h-full relative cursor-ew-resize touch-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              onMouseDown={() => {setIsManualControl(true); setIsPaused(true);}}
              onMouseUp={() => {setIsManualControl(false); setIsPaused(false);}}
              onTouchEnd={() => setIsManualControl(false)}
            >
              {/* CAPA ANTES */}
              <div className="absolute inset-0 select-none pointer-events-none">
                <img src={activeItem.beforeImage} className="w-full h-full object-cover" alt="Antes" />
                <div className="absolute top-8 right-8 px-6 py-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest z-10 shadow-2xl">
                  {t("gallery.before") || "ANTES"}
                </div>
              </div>

              {/* CAPA DESPUÉS (ClipPath) */}
              <div 
                className="absolute inset-0 transform-gpu z-10 select-none pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <img src={activeItem.afterImage} className="w-full h-full object-cover" alt="Después" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-8 left-8 px-6 py-3 bg-blue-600 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {t("gallery.after") || "DESPUÉS"}
                </div>

                <div className="absolute bottom-10 left-10 right-12 lg:right-auto lg:max-w-xl text-left">
                  {/* PÍLDORA DE UBICACIÓN */}
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-xs font-black text-white uppercase tracking-widest drop-shadow-md">{activeItem.location}</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4 drop-shadow-md">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm lg:text-base text-slate-100 font-medium line-clamp-2">
                    {activeItem.description}
                  </p>
                </div>
              </div>

              {/* LÍNEA DIVISORIA E INSTRUCCIÓN */}
              <div 
                className="absolute inset-y-0 w-[3px] bg-white pointer-events-none transform-gpu z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]" 
                style={{ left: `${comparePosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-slate-100">
                    <MoveHorizontal className="text-slate-900 w-6 h-6" />
                  </div>
                  
                  {/* Cartel: Se va al arrastrar */}
                  <div className={`
                    px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-[9px] font-black text-white 
                    uppercase tracking-widest shadow-xl border border-white/10 whitespace-nowrap
                    transition-all duration-300 transform
                    ${isManualControl 
                      ? "opacity-0 scale-95 translate-y-2" 
                      : "opacity-100 scale-100 translate-y-0 lg:opacity-0 lg:group-hover:opacity-100"
                    }
                  `}>
                    Arrastra para comparar
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CARRUSEL INFERIOR */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t border-slate-100 mb-8">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide flex-1 snap-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                  setComparePosition(50);
                }}
                className={`relative flex-[0_0_160px] lg:flex-[0_0_240px] aspect-[4/3] rounded-[2rem] overflow-hidden snap-start transition-all duration-500 transform opacity-100 ${
                  activeId === item.id 
                    ? "ring-4 ring-blue-600 ring-offset-4 ring-offset-white scale-100 shadow-2xl" 
                    : "scale-95 hover:scale-100 border border-slate-100"
                }`}
              >
                <img src={item.afterImage} className="w-full h-full object-cover" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest truncate">{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowAllPhotos(true)}
            className="hidden lg:flex flex-col items-center justify-center flex-[0_0_140px] aspect-[4/3] bg-slate-950 text-white rounded-[2rem] hover:bg-blue-600 transition-all duration-300 group shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-center px-2">Ver Todo</span>
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-3 py-3">
          {["all", "interior", "exterior", "cabinet", "commercial"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                filter === f 
                  ? "bg-slate-950 text-white shadow-xl scale-105" 
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {t(`gallery.filters.${f}`) || (f === "all" ? "Todos" : f)}
            </button>
          ))}
        </div>

      </div>

      {/* MODAL COMPLETO (Corrección Header Sticky) */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-500 selection:bg-none">
          
          <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm w-full px-4 lg:px-12 py-6">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center text-left">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">Galería Completa</h2>
                <p className="text-blue-600 font-bold text-[10px] lg:text-xs uppercase tracking-widest mt-2">{galleryData.length} Proyectos Finalizados</p>
              </div>
              <button 
                onClick={() => setShowAllPhotos(false)} 
                className="p-3 lg:p-4 bg-slate-100 text-slate-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-8 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {galleryData.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleSelectProject(item.id)}
                  className="group relative aspect-[16/10] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden cursor-pointer bg-slate-50 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <img src={item.afterImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-left">
                    {/* Ubicación en miniatura */}
                    <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-fit">
                      <MapPin className="w-3 h-3 text-white" />
                      <span className="text-[10px] text-white font-black uppercase tracking-widest drop-shadow-md">{item.location}</span>
                    </div>
                    <h5 className="text-xl lg:text-2xl text-white font-black leading-tight uppercase italic drop-shadow-md">{item.title}</h5>
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