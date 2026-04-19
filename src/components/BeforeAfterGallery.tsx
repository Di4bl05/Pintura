"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { X, MapPin, MoveHorizontal, ChevronRight, Construction } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import { GalleryProject, GalleryService } from "@/types/gallery";

interface ViewerItem {
  id: number;
  title: string;
  location: string;
  service: GalleryService;
  beforeImageDesktop: string;
  beforeImageMobile: string;
  afterImageDesktop: string;
  afterImageMobile: string;
  description: string;
  intro: string;
  beforeCaption: string;
  afterCaption: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600"><rect width="1200" height="1600" fill="#0f172a"/><rect x="80" y="80" width="1040" height="1440" rx="64" fill="#1e293b" stroke="#334155" stroke-width="8"/><text x="50%" y="48%" fill="#cbd5e1" font-size="54" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">Imagen no disponible</text><text x="50%" y="55%" fill="#94a3b8" font-size="28" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">Revisa el archivo en storage</text></svg>`
  );

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

function toViewerItem(project: GalleryProject, language: "es" | "en"): ViewerItem {
  const findImage = (kind: "before_desktop" | "before_mobile" | "after_desktop" | "after_mobile") =>
    project.images.find((image) => image.kind === kind);

  const beforeDesktop = findImage("before_desktop")?.url ?? FALLBACK_IMAGE;
  const beforeMobile = findImage("before_mobile")?.url ?? beforeDesktop;
  const afterDesktop = findImage("after_desktop")?.url ?? FALLBACK_IMAGE;
  const afterMobile = findImage("after_mobile")?.url ?? afterDesktop;

  const beforeCaption =
    language === "es"
      ? findImage("before_desktop")?.caption_es || "Antes"
      : findImage("before_desktop")?.caption_en || "Before";

  const afterCaption =
    language === "es"
      ? findImage("after_desktop")?.caption_es || "Despues"
      : findImage("after_desktop")?.caption_en || "After";

  return {
    id: project.id,
    title: language === "es" ? project.title_es : project.title_en,
    location: project.location,
    service: project.service,
    description: language === "es" ? project.description_es : project.description_en,
    intro: language === "es" ? project.intro_es : project.intro_en,
    beforeImageDesktop: beforeDesktop,
    beforeImageMobile: beforeMobile,
    afterImageDesktop: afterDesktop,
    afterImageMobile: afterMobile,
    beforeCaption,
    afterCaption,
  };
}

export default function BeforeAfterGallery() {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeId, setActiveId] = useState<number>(1);
  const [comparePosition, setComparePosition] = useState(50);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        const payload = await response.json();
        const loaded = (payload.projects ?? []) as GalleryProject[];
        setProjects(loaded);
        if (loaded.length > 0) {
          setActiveId(loaded[0].id);
        }
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showAllPhotos && target.closest("a")) {
        setShowAllPhotos(false);
      }
    };

    if (showAllPhotos) {
      window.addEventListener("click", handleGlobalClick);
    }

    return () => {
      window.removeEventListener("click", handleGlobalClick);
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

  const galleryData = useMemo(() => {
    return projects.map((project) => toViewerItem(project, language));
  }, [projects, language]);

  const filteredGallery = useMemo(() => {
    return filter === "all" ? galleryData : galleryData.filter((item) => item.service === filter);
  }, [galleryData, filter]);

  const activeItem = useMemo(() => {
    return filteredGallery.find((item) => item.id === activeId) || filteredGallery[0] || null;
  }, [filteredGallery, activeId]);

  useEffect(() => {
    if (filteredGallery.length === 0) return;
    if (!filteredGallery.some((item) => item.id === activeId)) {
      setActiveId(filteredGallery[0].id);
      setComparePosition(50);
    }
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
    <section id="gallery" className="relative overflow-hidden bg-white py-20 antialiased selection:bg-primary-100 lg:py-32">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 text-left lg:px-16">
        <div className="mb-16 max-w-5xl md:mb-24">
          <h2 className="mb-10 flex flex-col gap-1">
            <span className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-slate-950 md:text-6xl">
              {t("gallery.title") || (language === "es" ? "Resultados" : "Results")}
            </span>
            <span className="font-serif text-3xl italic font-normal leading-none text-primary-600 md:text-6xl">
              {t("gallery.titleHighlight") || (language === "es" ? "impecables" : "impeccable")}
            </span>
          </h2>

          <div className="mb-12 flex items-stretch gap-6">
            <div className="w-[2px] flex-shrink-0 rounded-full bg-primary-600" />
            <p className="max-w-xl font-sans text-lg font-medium leading-relaxed text-slate-500 opacity-90">
              {t("gallery.subtitle") ||
                (language === "es"
                  ? "Explora nuestras transformaciones recientes con imagenes optimizadas para movil y escritorio."
                  : "Explore our recent transformations with optimized images for mobile and desktop.")}
            </p>
          </div>
        </div>

        {loading && <p className="mb-10 text-sm text-slate-500">{language === "es" ? "Cargando galeria..." : "Loading gallery..."}</p>}

        {!loading && filteredGallery.length === 0 && (
          <p className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {language === "es"
              ? "No hay proyectos activos aun. Agregalos desde /admin/dashboard."
              : "There are no active projects yet. Add them from /admin/dashboard."}
          </p>
        )}

        {activeItem && (
          <div id="main-viewer" className="relative mb-16 scroll-mt-28">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-100 shadow-2xl transform-gpu md:aspect-[16/10] lg:aspect-[21/10]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !isManualControl && setIsPaused(false)}
            >
              <div key={activeId} ref={sliderRef} className="relative h-full w-full touch-none select-none cursor-ew-resize animate-gallery-swap">
                <div className="absolute inset-0 z-0">
                  <ResponsiveGalleryImage
                    desktopSrc={activeItem.beforeImageDesktop}
                    mobileSrc={activeItem.beforeImageMobile}
                    alt={`${activeItem.title} before`}
                    priority
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="font-sans absolute right-8 top-8 z-20 rounded-full border border-white/10 bg-slate-950/80 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    {activeItem.beforeCaption}
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 z-10 transform-gpu"
                  style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                >
                  <ResponsiveGalleryImage
                    desktopSrc={activeItem.afterImageDesktop}
                    mobileSrc={activeItem.afterImageMobile}
                    alt={`${activeItem.title} after`}
                    priority
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  <div className="font-sans absolute left-8 top-8 z-20 rounded-full bg-primary-600 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-xl">
                    {activeItem.afterCaption}
                  </div>

                  <div className="absolute bottom-12 left-12 right-12 hidden items-end justify-between lg:flex">
                    <div className="max-w-2xl">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xl">
                        <MapPin className="h-3 w-3 text-primary-400" />
                        <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-white">{activeItem.location}</span>
                      </div>
                      <h3 className="font-display mb-3 text-5xl font-bold uppercase leading-none tracking-tighter text-white">{activeItem.title}</h3>
                      <p className="max-w-lg font-sans text-base italic font-light leading-relaxed text-slate-100 opacity-90 line-clamp-2">
                        {activeItem.description}
                      </p>
                      <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-white/85 line-clamp-2">{activeItem.intro}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="pointer-events-auto absolute inset-y-0 z-40 w-1 transform-gpu bg-white/50 backdrop-blur-sm"
                  style={{ left: `${comparePosition}%`, transform: "translateX(-50%)" }}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                      <MoveHorizontal className="h-6 w-6 text-primary-600 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 border-t border-slate-100 pt-10 md:flex-row md:items-stretch">
          <div ref={carouselRef} className="no-scrollbar scrollbar-hide snap-x flex flex-1 gap-4 overflow-x-auto pb-4">
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                  setComparePosition(50);
                  scrollToViewer();
                }}
                className={`relative aspect-video flex-[0_0_160px] snap-start overflow-hidden rounded-[2rem] border-2 transition-all duration-500 md:flex-[0_0_260px] ${
                  activeId === item.id ? "scale-95 border-primary-600 shadow-xl" : "border-transparent"
                }`}
              >
                <ResponsiveGalleryImage
                  desktopSrc={item.afterImageDesktop}
                  mobileSrc={item.afterImageMobile}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="260px"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 to-transparent p-5">
                  <span className="truncate font-sans text-[9px] font-black uppercase tracking-widest text-white">{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 py-10 text-white shadow-xl transition-all duration-500 md:w-52 md:py-0"
          >
            <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em]">
                {t("gallery.viewAll") || (language === "es" ? "Ver todas" : "Full gallery")}
              </span>
            </div>
          </button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {(["all", "interior", "exterior", "cabinet", "commercial", "deck", "pressure"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setComparePosition(50);
              }}
              className={`group relative overflow-hidden rounded-xl border px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                filter === f
                  ? "border-primary-600 bg-primary-600 text-white shadow-xl"
                  : "border-slate-100 bg-white text-slate-500 hover:text-white"
              }`}
            >
              {filter !== f && <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />}
              <span className="relative z-10">{t(`gallery.filters.${f}`) || f}</span>
            </button>
          ))}
        </div>
      </div>

      {showAllPhotos && (
        <div className="animate-in fade-in fixed inset-0 z-[40] overflow-y-auto bg-white duration-500">
          <Header forceSolid />
          <div className="px-6 pb-20 pt-32 md:pt-48 lg:px-16">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-white shadow-xl">
                    <Construction className="h-3.5 w-3.5 text-primary-400" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
                      {t("gallery.fullGallery") || (language === "es" ? "Galeria completa" : "Full gallery")}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl font-black uppercase tracking-tightest text-slate-950 md:text-6xl">
                    {language === "es" ? "Portafolio de proyectos" : "Project portfolio"}
                  </h2>
                </div>

                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="group inline-flex self-start rounded-2xl bg-slate-950 px-8 py-4 text-white shadow-2xl transition-all hover:bg-primary-600 active:scale-95"
                >
                  <X size={16} />
                  <span className="ml-3 font-sans text-[10px] font-black uppercase tracking-widest">
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
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="50vw"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                          {item.beforeCaption}
                        </div>
                      </div>
                      <div className="relative">
                        <ResponsiveGalleryImage
                          desktopSrc={item.afterImageDesktop}
                          mobileSrc={item.afterImageMobile}
                          alt={`${item.title} after`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="50vw"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-primary-600 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                          {item.afterCaption}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-primary-700">{item.service}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">{item.location}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-950">{item.title}</h3>
                      <p className="line-clamp-3 font-sans text-sm leading-relaxed text-slate-500">{item.description}</p>
                      <p className="line-clamp-2 font-sans text-xs leading-relaxed text-slate-600">{item.intro}</p>
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
