import { AdminSiteImage, SiteImageKey } from "@/types/gallery";

const SUPABASE_GALLERY_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery`
  : "";

const SITE_IMAGE_CONFIG: Record<SiteImageKey, { label: string; localPath: string; storagePath: string }> = {
  logoOriginal: {
    label: "Logo principal (Header y Footer)",
    localPath: "/images/logo/logo-original.webp",
    storagePath: "branding/logo-original.webp",
  },
  logoPng: {
    label: "Logo PNG secundario",
    localPath: "/images/logo/logo.png",
    storagePath: "branding/logo.png",
  },
  exteriorBefore: {
    label: "Soporte visual - Exterior Antes",
    localPath: "/images/gallery/exterior-antes.webp",
    storagePath: "shared/exterior-antes.webp",
  },
  exteriorAfter: {
    label: "Soporte visual - Exterior Despues",
    localPath: "/images/gallery/exterior-despues.webp",
    storagePath: "shared/exterior-despues.webp",
  },
  exterior2After: {
    label: "Soporte visual - Exterior 2 Despues",
    localPath: "/images/gallery/exterior2-despues.webp",
    storagePath: "shared/exterior2-despues.webp",
  },
  pressureWash: {
    label: "Soporte visual - Lavado a Presion",
    localPath: "/images/gallery/lavado-presion-pro.webp",
    storagePath: "shared/lavado-presion-pro.webp",
  },
  luisBety: {
    label: "Soporte visual - Luis y Bety",
    localPath: "/images/gallery/luis-y-bety.webp",
    storagePath: "shared/luis-y-bety.webp",
  },
};

const SITE_IMAGE_KEYS: SiteImageKey[] = [
  "logoOriginal",
  "logoPng",
  "exteriorBefore",
  "exteriorAfter",
  "exterior2After",
  "pressureWash",
  "luisBety",
];

export function getSiteImageStoragePath(key: SiteImageKey): string {
  return SITE_IMAGE_CONFIG[key].storagePath;
}

export function getSiteImageUrl(key: SiteImageKey): string {
  const entry = SITE_IMAGE_CONFIG[key];

  if (!SUPABASE_GALLERY_BASE) {
    return entry.localPath;
  }

  return `${SUPABASE_GALLERY_BASE}/${entry.storagePath}`;
}

export function getSiteImageLocalUrl(key: SiteImageKey): string {
  return SITE_IMAGE_CONFIG[key].localPath;
}

export function getSiteImageOptions(): Array<{ key: SiteImageKey; label: string }> {
  return SITE_IMAGE_KEYS.map((key) => ({ key, label: SITE_IMAGE_CONFIG[key].label }));
}

export function getAdminSiteImages(): AdminSiteImage[] {
  return SITE_IMAGE_KEYS.map((key) => ({
    key,
    label: SITE_IMAGE_CONFIG[key].label,
    localUrl: SITE_IMAGE_CONFIG[key].localPath,
    storagePath: SITE_IMAGE_CONFIG[key].storagePath,
    url: getSiteImageUrl(key),
  }));
}
