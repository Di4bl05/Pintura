import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminFromRequest } from "@/lib/supabase/auth";

const updateSchema = z.object({
  slug: z.string().min(2).max(120),
  service: z.enum(["interior", "exterior", "cabinet", "commercial", "deck", "pressure"]),
  location: z.string().min(2).max(120),
  title_es: z.string().min(2).max(160),
  title_en: z.string().min(2).max(160),
  description_es: z.string().min(2).max(1000),
  description_en: z.string().min(2).max(1000),
  intro_es: z.string().min(2).max(1200),
  intro_en: z.string().min(2).max(1200),
  is_active: z.boolean(),
  display_order: z.number().int().min(0).max(9999),
});

function parseId(value: string) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const id = parseId(context.params.id);
  if (!id) {
    return NextResponse.json({ error: "ID invalido" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalido", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("gallery_projects")
    .update(parsed.data)
    .eq("id", id)
    .select("id, slug, service, location, title_es, title_en, description_es, description_en, intro_es, intro_en, is_active, display_order")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No se pudo actualizar", details: error?.message }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const id = parseId(context.params.id);
  if (!id) {
    return NextResponse.json({ error: "ID invalido" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data: images } = await supabase
    .from("gallery_images")
    .select("path")
    .eq("project_id", id);

  if (images?.length) {
    const paths = images.map((item: { path: string }) => item.path).filter(Boolean);
    if (paths.length) {
      await supabase.storage.from("gallery").remove(paths);
    }
  }

  const { error } = await supabase.from("gallery_projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "No se pudo eliminar", details: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
