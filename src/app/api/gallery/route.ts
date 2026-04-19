import { NextResponse } from "next/server";
import { getFallbackGalleryProjects } from "@/lib/galleryDefaults";
import { mapProjectsWithImages } from "@/lib/galleryMapper";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseClientConfig } from "@/lib/supabase/client";

export const revalidate = 120;

export async function GET() {
  if (!hasSupabaseClientConfig || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ projects: getFallbackGalleryProjects(), source: "fallback" });
  }

  try {
    const supabase = createSupabaseAdminClient();

    const { data: projects, error: projectError } = await supabase
      .from("gallery_projects")
      .select("id, slug, service, location, title_es, title_en, description_es, description_en, intro_es, intro_en, is_active, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("id", { ascending: true });

    if (projectError || !projects) {
      return NextResponse.json({ projects: getFallbackGalleryProjects(), source: "fallback" });
    }

    if (projects.length === 0) {
      return NextResponse.json({ projects: [], source: "supabase" });
    }

    const ids = projects.map((project) => project.id);

    const { data: images, error: imageError } = await supabase
      .from("gallery_images")
      .select("id, project_id, kind, public_url, path, alt_es, alt_en, caption_es, caption_en")
      .in("project_id", ids)
      .order("id", { ascending: true });

    if (imageError || !images) {
      return NextResponse.json({ projects: getFallbackGalleryProjects(), source: "fallback" });
    }

    const mapped = mapProjectsWithImages(projects as any, images as any);
    return NextResponse.json({ projects: mapped, source: "supabase" });
  } catch {
    return NextResponse.json({ projects: getFallbackGalleryProjects(), source: "fallback" });
  }
}
