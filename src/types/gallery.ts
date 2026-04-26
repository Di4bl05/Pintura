export type GalleryService = "interior" | "exterior" | "cabinet" | "commercial" | "deck" | "pressure";

export type GalleryImageKind = "before_desktop" | "before_mobile" | "after_desktop" | "after_mobile";

export interface GalleryImageMeta {
  kind: GalleryImageKind;
  url: string;
  alt_es: string;
  alt_en: string;
  caption_es: string;
  caption_en: string;
}

export interface GalleryProject {
  id: number;
  slug: string;
  service: GalleryService;
  location: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  intro_es: string;
  intro_en: string;
  is_active: boolean;
  display_order: number;
  images: GalleryImageMeta[];
}

export interface GalleryProjectPayload {
  slug: string;
  service: GalleryService;
  location: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  intro_es: string;
  intro_en: string;
  is_active: boolean;
  display_order: number;
}

export type SiteImageKey =
  | "logoOriginal"
  | "logoPng"
  | "exteriorBefore"
  | "exteriorAfter"
  | "exterior2After"
  | "pressureWash"
  | "luisBety";

export interface AdminSiteImage {
  key: SiteImageKey;
  label: string;
  url: string;
  localUrl: string;
  storagePath: string;
}
