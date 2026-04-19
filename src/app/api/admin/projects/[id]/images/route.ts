import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { GalleryImageKind } from "@/types/gallery";

const metaSchema = z.object({
  kind: z.enum(["before_desktop", "before_mobile", "after_desktop", "after_mobile"]),
  alt_es: z.string().min(1).max(160),
  alt_en: z.string().min(1).max(160),
  caption_es: z.string().min(1).max(220),
  caption_en: z.string().min(1).max(220),
});

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);

function parseId(value: string) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function extensionFromMime(mime: string) {
  if (mime === "image/webp") return "webp";
  if (mime === "image/png") return "png";
  return "jpg";
}

function toStorageFilename(kind: GalleryImageKind, ext: string) {
  const baseByKind: Record<GalleryImageKind, string> = {
    before_desktop: "before-desktop",
    before_mobile: "before-mobile",
    after_desktop: "after-desktop",
    after_mobile: "after-mobile",
  };

  return `${baseByKind[kind]}.${ext}`;
}

export async function POST(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const projectId = parseId(context.params.id);
  if (!projectId) {
    return NextResponse.json({ error: "ID invalido" }, { status: 400 });
  }

  const formData = await request.formData();

  const kind = String(formData.get("kind") ?? "");
  const alt_es = String(formData.get("alt_es") ?? "");
  const alt_en = String(formData.get("alt_en") ?? "");
  const caption_es = String(formData.get("caption_es") ?? "");
  const caption_en = String(formData.get("caption_en") ?? "");
  const file = formData.get("file");

  const parsed = metaSchema.safeParse({ kind, alt_es, alt_en, caption_es, caption_en });

  if (!parsed.success) {
    return NextResponse.json({ error: "Metadata invalida", details: parsed.error.flatten() }, { status: 400 });
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

  const ext = extensionFromMime(file.type);
  const filename = toStorageFilename(parsed.data.kind, ext);
  const storagePath = `projects/${projectId}/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createSupabaseAdminClient();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(storagePath, buffer, {
      upsert: true,
      contentType: file.type,
      cacheControl: "3600",
    });

  if (uploadError || !uploadData) {
    return NextResponse.json({ error: "No se pudo subir la imagen", details: uploadError?.message }, { status: 500 });
  }

  const { data: publicData } = supabase.storage.from("gallery").getPublicUrl(uploadData.path);

  const rowPayload = {
    project_id: projectId,
    kind: parsed.data.kind,
    path: uploadData.path,
    public_url: publicData.publicUrl,
    alt_es: parsed.data.alt_es,
    alt_en: parsed.data.alt_en,
    caption_es: parsed.data.caption_es,
    caption_en: parsed.data.caption_en,
  };

  const { data: rowData, error: rowError } = await supabase
    .from("gallery_images")
    .upsert(rowPayload, { onConflict: "project_id,kind" })
    .select("id, project_id, kind, path, public_url, alt_es, alt_en, caption_es, caption_en")
    .single();

  if (rowError || !rowData) {
    return NextResponse.json({ error: "No se pudo guardar metadata", details: rowError?.message }, { status: 500 });
  }

  return NextResponse.json({ image: rowData });
}
