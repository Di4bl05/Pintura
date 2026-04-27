import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSiteImages, getSiteImageStoragePath, getSiteImageUrl } from "@/lib/siteImageSources";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { SiteImageKey } from "@/types/gallery";

const keySchema = z.enum([
  "logoOriginal",
  "logoPng",
  "exteriorBefore",
  "exteriorAfter",
  "exterior2After",
  "pressureWash",
  "luisBety",
]);

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);

export async function GET(request: Request) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  return NextResponse.json({ images: getAdminSiteImages() });
}

export async function POST(request: Request) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const formData = await request.formData();
  const keyValue = String(formData.get("key") ?? "");
  const file = formData.get("file");

  const parsed = keySchema.safeParse(keyValue);
  if (!parsed.success) {
    return NextResponse.json({ error: "Clave de imagen invalida" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "El archivo supera 4MB" }, { status: 400 });
  }

  const key = parsed.data as SiteImageKey;
  const storagePath = getSiteImageStoragePath(key);
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createSupabaseAdminClient();

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(storagePath, buffer, {
      upsert: true,
      contentType: file.type,
      cacheControl: "3600",
    });

  if (uploadError) {
    return NextResponse.json({ error: "No se pudo subir la imagen", details: uploadError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    image: {
      key,
      storagePath,
      url: getSiteImageUrl(key),
    },
  });
}
