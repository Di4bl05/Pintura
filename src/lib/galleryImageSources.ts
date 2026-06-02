const LOCAL_GALLERY_BASE = "/images/gallery";

const SUPABASE_GALLERY_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery`
  : "";

const STATIC_GALLERY_FILENAMES = {
  cabinet: "Gabinetes.png",
  interior: "Interior.webp",
  repair: "Superfice1.png",
  pressure1: "Pressure.png",
  exterior: "Exterior.png",
  luisBety: "luis-y-bety.webp",
  exteriorCTA: "exteriorCTA.png"
} as const;

export type StaticGalleryImageKey = keyof typeof STATIC_GALLERY_FILENAMES;

function toLocalPath(fileName: string): string {
  return `${LOCAL_GALLERY_BASE}/${fileName}`;
}

export function getStaticGalleryImageUrl(key: StaticGalleryImageKey): string {
  const fileName = STATIC_GALLERY_FILENAMES[key];
  if (!SUPABASE_GALLERY_BASE) {
    return toLocalPath(fileName);
  }

  return `${SUPABASE_GALLERY_BASE}/shared/${fileName}`;
}
