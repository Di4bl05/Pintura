import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mapProjectsWithImages } from "@/lib/galleryMapper";
import { requireAdminFromRequest } from "@/lib/supabase/auth";

const projectSchema = z.object({
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

export async function GET(request: Request) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const supabase = createSupabaseAdminClient();

  const { data: projects, error: projectError } = await supabase
    .from("gallery_projects")
    .select("id, slug, service, location, title_es, title_en, description_es, description_en, intro_es, intro_en, is_active, display_order")
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (projectError || !projects) {
    return NextResponse.json({ error: "No se pudieron cargar los proyectos" }, { status: 500 });
  }

  if (projects.length === 0) {
    return NextResponse.json({ projects: [] });
  }

  const ids = projects.map((project: { id: number }) => project.id);

  const { data: images, error: imageError } = await supabase
    .from("gallery_images")
    .select("id, project_id, kind, public_url, path, alt_es, alt_en, caption_es, caption_en")
    .in("project_id", ids)
    .order("id", { ascending: true });

  if (imageError || !images) {
    return NextResponse.json({ error: "No se pudieron cargar las imagenes" }, { status: 500 });
  }

  return NextResponse.json({ projects: mapProjectsWithImages(projects as any, images as any) });
}

export async function POST(request: Request) {
  const auth = await requireAdminFromRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalido", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("gallery_projects")
    .insert(parsed.data)
    .select("id, slug, service, location, title_es, title_en, description_es, description_en, intro_es, intro_en, is_active, display_order")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No se pudo crear el proyecto", details: error?.message }, { status: 500 });
  }

  return NextResponse.json({ project: { ...data, images: [] } }, { status: 201 });
}

