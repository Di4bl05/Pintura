"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { X, MapPin, MoveHorizontal, ChevronRight, Sparkles, Construction } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

type GalleryService = "interior" | "exterior" | "cabinet" | "commercial";

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  service: GalleryService;
  beforeImageDesktop: string;
  beforeImageMobile: string;
  afterImageDesktop: string;
  afterImageMobile: string;
  description: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600"><rect width="1200" height="1600" fill="#0f172a"/><rect x="80" y="80" width="1040" height="1440" rx="64" fill="#1e293b" stroke="#334155" stroke-width="8"/><text x="50%" y="48%" fill="#cbd5e1" font-size="54" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">Imagen no disponible</text><text x="50%" y="55%" fill="#94a3b8" font-size="28" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">Revisa el nombre del archivo en public/images/gallery</text></svg>`
  );

const SERVICE_SEQUENCE: GalleryService[] = ["interior", "exterior", "cabinet", "commercial"];

const LOCATION_SEQUENCE = [
  "Orlando",
  "Winter Park",
  "Lake Nona",
  "Kissimmee",
  "Windermere",
  "Dr. Phillips",
  "Altamonte Springs",
  "Hunters Creek",
  "Maitland",
  "Oviedo",
  "Apopka",
  "Sanford",
  "Longwood",
  "Clermont",
  "Celebration",
  "Casselberry",
  "Baldwin Park",
  "College Park",
  "Lake Mary",
  "Pine Hills",
];

const getImageSrc = (id: number, side: "antes" | "despues", size: "600" | "1600") => {
  return `/images/gallery/${id}_${side}-${size}.webp`;
};

const getServiceCopy = (service: GalleryService, language: "es" | "en") => {
  const copy = {
    es: {
      interior: "Renovacion interior con acabados limpios, proteccion de superficies y detalles finos.",
      exterior: "Lavado, preparacion y pintura exterior para un acabado duradero en clima de Florida.",
      cabinet: "Restauracion y lacado de gabinetes para un acabado uniforme y moderno.",
      commercial: "Pintura comercial coordinada para minimizar interrupciones y maximizar impacto visual.",
    },
    en: {
      interior: "Interior repaint with clean finishes, surface protection, and fine details.",
      exterior: "Washing, prep, and exterior paint built for Florida weather and durability.",
      cabinet: "Cabinet restoration and refinishing for a smooth, modern look.",
      commercial: "Commercial repainting planned to reduce downtime and improve curb appeal.",
    },
  } as const;

  return copy[language][service];
};

function ResponsiveGalleryImage({
  desktopSrc,
  mobileSrc,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 600px, 1600px",
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [mode, setMode] = useState<"desktop" | "mobile" | "fallback">("desktop");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMode("desktop");
    setIsLoaded(false);
  }, [desktopSrc, mobileSrc]);

  const src = mode === "mobile" ? mobileSrc : mode === "fallback" ? FALLBACK_IMAGE : desktopSrc;
  const srcSet = mode === "desktop" ? `${mobileSrc} 600w, ${desktopSrc} 1600w` : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`${className} transition-[opacity,transform,filter] duration-700 ease-out ${
        isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
      }`}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (mode === "desktop") {
          setIsLoaded(false);
          setMode("mobile");
          return;
        }
        setIsLoaded(false);
        setMode("fallback");
      }}
    />
  );
}

const resolveTranslation = (t: (key: string) => string, key: string, fallback: string) => {
  const value = t(key);
  return value === key ? fallback : value;
};

export default function BeforeAfterGallery() {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeId, setActiveId] = useState<number>(1);
  const [comparePosition, setComparePosition] = useState(50);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showAllPhotos && target.closest("a")) {
        setShowAllPhotos(false);
      }
    };

    const handleCloseOverlays = () => {
      if (showAllPhotos) setShowAllPhotos(false);
    };

    if (showAllPhotos) {
      window.addEventListener("click", handleGlobalClick);
      window.addEventListener("app:close-overlays", handleCloseOverlays as EventListener);
    }

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("app:close-overlays", handleCloseOverlays as EventListener);
    };
  }, [showAllPhotos]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("app:overlay-state", { detail: { open: showAllPhotos } }));

    return () => {
      window.dispatchEvent(new CustomEvent("app:overlay-state", { detail: { open: false } }));
    };
  }, [showAllPhotos]);

  useEffect(() => {
    document.body.style.overflow = showAllPhotos ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAllPhotos]);

  const scrollToViewer = useCallback(() => {
    const viewer = document.getElementById("main-viewer");
    if (viewer) {
      viewer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

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
    return Array.from({ length: 20 }, (_, index) => {
      const id = index + 1;
      const service = SERVICE_SEQUENCE[index % SERVICE_SEQUENCE.length];
      const location = LOCATION_SEQUENCE[index] ?? "Orlando, FL";

      return {
        id,
        title: resolveTranslation(t, `gallery.projects.${id}.title`, language === "es" ? `Proyecto ${id}` : `Project ${id}`),
        location: resolveTranslation(t, `gallery.projects.${id}.location`, location),
        service,
        beforeImageDesktop: getImageSrc(id, "antes", "1600"),
        beforeImageMobile: getImageSrc(id, "antes", "600"),
        afterImageDesktop: getImageSrc(id, "despues", "1600"),
        afterImageMobile: getImageSrc(id, "despues", "600"),
        description: resolveTranslation(t, `gallery.projects.${id}.description`, getServiceCopy(service, language)),
      };
    });
  }, [language, t]);

  const filteredGallery = useMemo(() => {
    return filter === "all" ? galleryData : galleryData.filter((item) => item.service === filter);
  }, [galleryData, filter]);

  const activeItem = useMemo(() => {
    return filteredGallery.find((item) => item.id === activeId) || filteredGallery[0] || null;
  }, [filteredGallery, activeId]);

  useEffect(() => {
    if (isPaused || showAllPhotos || isManualControl || filteredGallery.length === 0) return;

    const interval = window.setInterval(() => {
      const currentIndex = filteredGallery.findIndex((item) => item.id === activeId);
      const nextIndex = (currentIndex + 1) % filteredGallery.length;
      setActiveId(filteredGallery[nextIndex].id);
      setComparePosition(50);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [activeId, filteredGallery, isPaused, showAllPhotos, isManualControl]);

  useEffect(() => {
    if (!isManualControl) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
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
    <section id="gallery" className="relative py-20 overflow-hidden antialiased bg-white selection:bg-primary-100 lg:py-32">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 text-left lg:px-16">
        <div className="max-w-5xl mb-16 md:mb-24">

          <h2 className="flex flex-col gap-1 mb-10">
            <span className="font-display text-4xl font-bold uppercase tracking-tightest text-slate-950 leading-[0.95] md:text-6xl">
              {t("gallery.title") || (language === "es" ? "Resultados" : "Results")}
            </span>
            <span className="font-serif text-3xl italic font-normal leading-none text-primary-600 md:text-6xl">
              {t("gallery.titleHighlight") || (language === "es" ? "impecables" : "impeccable")}
            </span>
          </h2>

          <div className="flex items-stretch gap-6 mb-12">
            <div className="w-[2px] flex-shrink-0 rounded-full bg-primary-600" />
            <p className="max-w-xl font-sans text-lg font-medium leading-relaxed text-slate-500 opacity-90">
              {t("gallery.subtitle") ||
                (language === "es"
                  ? "Explora nuestras transformaciones recientes con imagenes optimizadas para movil y escritorio."
                  : "Explore our recent transformations with optimized images for mobile and desktop.")}
            </p>
          </div>
        </div>

        {activeItem && (
          <div id="main-viewer" className="relative mb-16 scroll-mt-28">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-100 shadow-2xl transform-gpu md:aspect-[16/10] lg:aspect-[21/10]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !isManualControl && setIsPaused(false)}
            >
              <div
                key={activeId}
                ref={sliderRef}
                className="relative w-full h-full select-none touch-none cursor-ew-resize animate-gallery-swap"
              >
                <div className="absolute inset-0 z-0">
                  <ResponsiveGalleryImage
                    desktopSrc={activeItem.beforeImageDesktop}
                    mobileSrc={activeItem.beforeImageMobile}
                    alt={`${activeItem.title} before`}
                    priority
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                  <div className="font-sans absolute right-8 top-8 z-20 rounded-full border border-white/10 bg-slate-950/80 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    {t("gallery.after") || (language === "es" ? "ANTES" : "AFTER")}
                  </div>
                </div>

                <div
                  className="absolute inset-0 z-10 pointer-events-none transform-gpu"
                  style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                >
                  <ResponsiveGalleryImage
                    desktopSrc={activeItem.afterImageDesktop}
                    mobileSrc={activeItem.afterImageMobile}
                    alt={`${activeItem.title} after`}
                    priority
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  <div className="font-sans absolute left-8 top-8 z-20 rounded-full bg-primary-600 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-xl">
                    {t("gallery.before") || (language === "es" ? "DESPUÉS" : "BEFORE")}
                  </div>

                  <div className="absolute items-end justify-between hidden bottom-12 left-12 right-12 lg:flex">
                    <div className="max-w-2xl">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xl">
                        <MapPin className="w-3 h-3 text-primary-400" />
                        <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-white">
                          {activeItem.location}
                        </span>
                      </div>
                      <h3 className="mb-4 text-5xl font-bold leading-none tracking-tighter text-white uppercase font-display">
                        {activeItem.title}
                      </h3>
                      <p className="max-w-lg font-sans text-base italic font-light leading-relaxed text-slate-100 opacity-90 line-clamp-2">
                        {activeItem.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-y-0 z-40 w-1 pointer-events-auto transform-gpu bg-white/50 backdrop-blur-sm"
                  style={{ left: `${comparePosition}%`, transform: "translateX(-50%)" }}
                >
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <div
                      className="flex h-14 w-14 cursor-ew-resize items-center justify-center rounded-full border-[6px] border-white/30 bg-white shadow-2xl transition-transform hover:scale-110 active:scale-95 lg:h-20 lg:w-20"
                      onMouseDown={() => {
                        setIsManualControl(true);
                        setIsPaused(true);
                      }}
                      onTouchStart={() => {
                        setIsManualControl(true);
                        setIsPaused(true);
                      }}
                    >
                      <MoveHorizontal className="w-6 h-6 text-primary-600 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 pt-10 border-t border-slate-100 md:flex-row md:items-stretch">
          <div ref={carouselRef} className="flex flex-1 gap-4 pb-4 overflow-x-auto no-scrollbar scrollbar-hide snap-x">
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                  setComparePosition(50);
                  scrollToViewer();
                }}
                className={`relative aspect-video flex-[0_0_160px] overflow-hidden rounded-[2rem] border-2 transition-all duration-500 snap-start md:flex-[0_0_260px] ${
                  activeId === item.id ? "scale-95 border-primary-600 shadow-xl" : "border-transparent"
                }`}
              >
                <ResponsiveGalleryImage
                  desktopSrc={item.afterImageDesktop}
                  mobileSrc={item.afterImageMobile}
                  alt={item.title}
                  className="absolute inset-0 object-cover w-full h-full"
                  sizes="260px"
                />
                <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-slate-950/80 to-transparent">
                  <span className="truncate font-sans text-[9px] font-black uppercase tracking-widest text-white">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 py-10 text-white shadow-xl transition-all duration-500 md:w-52 md:py-0"
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-out translate-y-full bg-primary-600 group-hover:translate-y-0" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em]">
                {t("gallery.viewAll") || (language === "es" ? "Ver todas" : "Full gallery")}
              </span>
            </div>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {(["all", "interior", "exterior", "cabinet", "commercial"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setActiveId(1);
                setComparePosition(50);
              }}
              className={`group relative overflow-hidden rounded-xl border px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                filter === f
                  ? "border-primary-600 bg-primary-600 text-white shadow-xl"
                  : "border-slate-100 bg-white text-slate-500 hover:text-white"
              }`}
            >
              {filter !== f && <div className="absolute inset-0 transition-transform duration-500 translate-y-full bg-primary-600 group-hover:translate-y-0" />}
              <span className="relative z-10">{t(`gallery.filters.${f}`) || f}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-0 z-30 w-full translate-y-1/2 pointer-events-none bottom-6">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-6 lg:px-16">
          <div className="h-[2px] flex-grow bg-slate-200" />
          <div className="flex items-center flex-shrink-0 gap-4 px-8 py-3 bg-white border rounded-full shadow-md border-slate-200">
            <div className="w-2 h-2 rounded-full animate-pulse bg-primary-600" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
              Section Portfolio
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-primary-600" />
          </div>
          <div className="h-[2px] flex-grow bg-slate-200" />
        </div>
      </div>

      {showAllPhotos && (
        <div className="fixed inset-0 z-[40] overflow-y-auto bg-white animate-in fade-in duration-500">
          <Header forceSolid />
          <div className="px-6 pt-32 pb-20 md:pt-48 lg:px-16">
            <div className="mx-auto max-w-[1440px]">
              <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 text-white rounded-full shadow-xl bg-slate-950">
                    <Construction className="h-3.5 w-3.5 text-primary-400" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
                      {t("gallery.fullGallery") || (language === "es" ? "Galeria completa" : "Full gallery")}
                    </span>
                  </div>
                  <h2 className="text-4xl font-black uppercase font-display tracking-tightest text-slate-950 md:text-6xl">
                    {language === "es" ? "Portafolio de proyectos" : "Project portfolio"}
                  </h2>
                </div>

                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="inline-flex items-center self-start gap-4 px-8 py-4 text-white transition-all shadow-2xl group rounded-2xl bg-slate-950 hover:bg-primary-600 active:scale-95"
                >
                  <X size={16} />
                  <span className="font-sans text-[10px] font-black uppercase tracking-widest">
                    {language === "es" ? "Cerrar portafolio" : "Close portfolio"}
                  </span>
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredGallery.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveId(item.id);
                      setComparePosition(50);
                      setShowAllPhotos(false);
                      window.setTimeout(() => scrollToViewer(), 120);
                    }}
                    className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white text-left shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="grid aspect-[4/5] grid-cols-2 overflow-hidden bg-slate-100">
                      <div className="relative">
                        <ResponsiveGalleryImage
                          desktopSrc={item.beforeImageDesktop}
                          mobileSrc={item.beforeImageMobile}
                          alt={`${item.title} before`}
                          className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          sizes="50vw"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                          {t("gallery.before") || (language === "es" ? "Antes" : "Before")}
                        </div>
                      </div>
                      <div className="relative">
                        <ResponsiveGalleryImage
                          desktopSrc={item.afterImageDesktop}
                          mobileSrc={item.afterImageMobile}
                          alt={`${item.title} after`}
                          className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          sizes="50vw"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-primary-600 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                          {t("gallery.after") || (language === "es" ? "Despues" : "After")}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-primary-700">
                          {item.service}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                          {item.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight uppercase font-display text-slate-950">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm leading-relaxed line-clamp-3 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
