import esTranslations from "@/translations/es.json";
import enTranslations from "@/translations/en.json";

export const SERVICE_SLUGS = ["exterior", "interior", "pressure", "repair"] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type ServiceLocale = "es" | "en";

const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  exterior: "/images/gallery/pintores-exteriores-residenciales-orlando.webp",
  interior: "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
  pressure: "/images/gallery/pintura-interiores-casas-orlando-fl.webp",
  repair: "/images/gallery/lacado-gabinetes-cocina-profesional-florida.webp",
};

const SERVICE_FAQS_ES: Record<ServiceSlug, { question: string; answer: string }[]> = {
  exterior: [
    {
      question: "Cuanto dura una pintura exterior en Florida?",
      answer: "Con preparacion correcta y pintura premium, un acabado exterior puede durar varios anos en clima de Florida.",
    },
    {
      question: "Incluyen lavado a presion antes de pintar?",
      answer: "Si. Realizamos limpieza y preparacion completa para asegurar adherencia y durabilidad.",
    },
  ],
  interior: [
    {
      question: "Protegen muebles y pisos durante el trabajo?",
      answer: "Si. Cubrimos superficies y cuidamos cada area para entregar la casa limpia al finalizar.",
    },
    {
      question: "Pueden trabajar con varios colores por ambiente?",
      answer: "Si. Ejecutamos combinaciones de color, acentos y acabados segun cada espacio.",
    },
  ],
  pressure: [
    {
      question: "El lavado danara mi superficie?",
      answer: "No. Ajustamos presion y tecnica segun el material para una limpieza profunda sin danos.",
    },
    {
      question: "Limpian driveways, techos y area de piscina?",
      answer: "Si. Atendemos concreto, techos y zonas exteriores con protocolos seguros.",
    },
  ],
  repair: [
    {
      question: "Reparan huecos y grietas antes de pintar?",
      answer: "Si. Reparamos drywall, imperfecciones y sellamos para dejar la superficie lista para acabado profesional.",
    },
    {
      question: "Tambien trabajan gabinetes y madera?",
      answer: "Si. Restauramos y preparamos superficies de madera y sinteticas para un resultado uniforme.",
    },
  ],
};

export function getServicePageData(slug: string, locale: ServiceLocale = "es") {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return null;

  const selectedTranslations = locale === "es" ? esTranslations : enTranslations;
  const service = (selectedTranslations as any).services[slug];

  if (!service) return null;

  return {
    slug: slug as ServiceSlug,
    title: service.title as string,
    description: service.description as string,
    features: (service.features as string[]) || [],
    experience: service.experience as
      | {
          intro?: string;
          process?: string;
          climax?: string;
          footer?: string;
        }
      | undefined,
    image: SERVICE_IMAGES[slug as ServiceSlug],
    faqs: SERVICE_FAQS_ES[slug as ServiceSlug],
  };
}
