import { GalleryImageKind, GalleryImageMeta, GalleryProject } from "@/types/gallery";

type DbProjectRow = {
  id: number;
  slug: string | null;
  service: GalleryProject["service"];
  location: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  intro_es: string | null;
  intro_en: string | null;
  is_active: boolean;
  display_order: number;
};

type DbImageRow = {
  id: number;
  project_id: number;
  kind: GalleryImageKind;
  public_url: string | null;
  path: string;
  alt_es: string | null;
  alt_en: string | null;
  caption_es: string | null;
  caption_en: string | null;
};

function toImageMeta(image: DbImageRow): GalleryImageMeta {
  return {
    kind: image.kind,
    url: image.public_url || image.path,
    alt_es: image.alt_es ?? "",
    alt_en: image.alt_en ?? "",
    caption_es: image.caption_es ?? "",
    caption_en: image.caption_en ?? "",
  };
}

export function mapProjectsWithImages(projects: DbProjectRow[], images: DbImageRow[]): GalleryProject[] {
  return projects.map((project) => {
    const projectImages = images.filter((image) => image.project_id === project.id).map(toImageMeta);

    return {
      id: project.id,
      slug: project.slug ?? `project-${project.id}`,
      service: project.service,
      location: project.location,
      title_es: project.title_es,
      title_en: project.title_en,
      description_es: project.description_es,
      description_en: project.description_en,
      intro_es: project.intro_es ?? "",
      intro_en: project.intro_en ?? "",
      is_active: project.is_active,
      display_order: project.display_order,
      images: projectImages,
    };
  });
}
