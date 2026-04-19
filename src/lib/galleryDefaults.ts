import { GalleryProject, GalleryService } from "@/types/gallery";

const SERVICE_SEQUENCE: GalleryService[] = ["interior", "exterior", "cabinet", "commercial"];

const LOCATION_SEQUENCE = [
  "Orlando",
  "Winter Park",
  "Lake Nona",
  "Kissimmee",
  "Windermere",
  "Dr. Phillips",
  "Altamonte Springs",
  "Hunters Creek",
  "Maitland",
  "Oviedo",
  "Apopka",
  "Sanford",
  "Longwood",
  "Clermont",
  "Celebration",
  "Casselberry",
  "Baldwin Park",
  "College Park",
  "Lake Mary",
  "Pine Hills",
];

const serviceCopy = {
  es: {
    interior: "Renovacion interior con acabados limpios y detalles finos.",
    exterior: "Lavado, preparacion y pintura exterior para clima de Florida.",
    cabinet: "Restauracion y lacado de gabinetes para acabado uniforme.",
    commercial: "Pintura comercial coordinada para minimizar interrupciones.",
    deck: "Restauracion y sellado de deck para mayor durabilidad.",
    pressure: "Lavado a presion profesional para exteriores.",
  },
  en: {
    interior: "Interior repaint with clean finishes and fine details.",
    exterior: "Washing, prep, and exterior paint for Florida weather.",
    cabinet: "Cabinet restoration and refinishing for a smooth finish.",
    commercial: "Commercial painting planned to reduce downtime.",
    deck: "Deck restoration and sealing for better durability.",
    pressure: "Professional pressure washing for outdoor surfaces.",
  },
} as const;

const getImageSrc = (id: number, side: "antes" | "despues", size: "600" | "1600") => {
  return `/images/gallery/${id}_${side}-${size}.webp`;
};

export function getFallbackGalleryProjects(): GalleryProject[] {
  return Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    const service = SERVICE_SEQUENCE[index % SERVICE_SEQUENCE.length];
    const location = LOCATION_SEQUENCE[index] ?? "Orlando";

    return {
      id,
      slug: `project-${id}`,
      service,
      location,
      title_es: `Proyecto ${id}`,
      title_en: `Project ${id}`,
      description_es: serviceCopy.es[service],
      description_en: serviceCopy.en[service],
      intro_es: "Introduccion agregada por el dueno desde el panel admin.",
      intro_en: "Owner introduction added from the admin panel.",
      is_active: true,
      display_order: id,
      images: [
        {
          kind: "before_desktop",
          url: getImageSrc(id, "antes", "1600"),
          alt_es: `Antes ${id}`,
          alt_en: `Before ${id}`,
          caption_es: "Estado inicial",
          caption_en: "Initial condition",
        },
        {
          kind: "before_mobile",
          url: getImageSrc(id, "antes", "600"),
          alt_es: `Antes movil ${id}`,
          alt_en: `Before mobile ${id}`,
          caption_es: "Antes movil",
          caption_en: "Before mobile",
        },
        {
          kind: "after_desktop",
          url: getImageSrc(id, "despues", "1600"),
          alt_es: `Despues ${id}`,
          alt_en: `After ${id}`,
          caption_es: "Resultado final",
          caption_en: "Final result",
        },
        {
          kind: "after_mobile",
          url: getImageSrc(id, "despues", "600"),
          alt_es: `Despues movil ${id}`,
          alt_en: `After mobile ${id}`,
          caption_es: "Despues movil",
          caption_en: "After mobile",
        },
      ],
    };
  });
}
