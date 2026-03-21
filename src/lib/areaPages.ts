import esTranslations from "@/translations/es.json";

export const AREA_SLUGS = [
  "longwood",
  "orlando",
  "winter-park",
  "altamonte-springs",
  "lake-mary",
  "sanford",
  "florida-central",
  "florida",
] as const;

export type AreaSlug = (typeof AREA_SLUGS)[number];

const AREA_INDEX_MAP: Record<AreaSlug, number> = {
  longwood: 0,
  orlando: 1,
  "winter-park": 2,
  "altamonte-springs": 3,
  "lake-mary": 4,
  sanford: 5,
  "florida-central": 6,
  florida: 7,
};

const AREA_INTRO: Record<AreaSlug, string> = {
  longwood: "Atendemos proyectos residenciales y comerciales en Longwood con preparacion detallada y acabados premium.",
  orlando: "Brindamos pintura profesional en Orlando para interiores, exteriores y renovaciones completas.",
  "winter-park": "Trabajamos en Winter Park con procesos de alto nivel y resultados duraderos para clima de Florida.",
  "altamonte-springs": "Ofrecemos servicio confiable en Altamonte Springs para casas, condominios y propiedades de inversion.",
  "lake-mary": "En Lake Mary ejecutamos proyectos con enfoque en calidad, limpieza y cumplimiento de tiempos.",
  sanford: "En Sanford desarrollamos proyectos de pintura con preparacion tecnica y acabados listos para mudanza.",
  "florida-central": "Cubrimos Florida Central con equipos especializados para proyectos de diferentes escalas.",
  florida: "Atendemos diferentes zonas de Florida con estandares profesionales y atencion personalizada.",
};

const AREA_FAQS: Record<AreaSlug, { question: string; answer: string }[]> = {
  longwood: [
    { question: "Trabajan en HOA en Longwood?", answer: "Si, seguimos lineamientos de color y procesos requeridos por cada comunidad." },
    { question: "Ofrecen presupuesto gratis?", answer: "Si, realizamos visitas y cotizacion sin costo." },
  ],
  orlando: [
    { question: "Cubren toda el area de Orlando?", answer: "Si, atendemos gran parte del area metropolitana de Orlando." },
    { question: "Cuanto tarda un proyecto promedio?", answer: "Depende del alcance, pero entregamos cronograma claro antes de iniciar." },
  ],
  "winter-park": [
    { question: "Pueden trabajar casas antiguas en Winter Park?", answer: "Si, adaptamos la preparacion segun el estado de cada superficie." },
    { question: "Incluyen limpieza final?", answer: "Si, entregamos el espacio limpio y listo para uso." },
  ],
  "altamonte-springs": [
    { question: "Atienden condominios?", answer: "Si, tenemos experiencia en condominios y propiedades multifamiliares." },
    { question: "Que tipos de pintura usan?", answer: "Usamos sistemas premium segun interior, exterior y condicion de la superficie." },
  ],
  "lake-mary": [
    { question: "Pintan interiores y exteriores?", answer: "Si, ofrecemos ambos servicios y planes combinados." },
    { question: "Manejan reparaciones previas?", answer: "Si, corregimos detalles de drywall y superficies antes de pintar." },
  ],
  sanford: [
    { question: "Hacen lavado a presion en Sanford?", answer: "Si, realizamos lavado profesional para preparacion o mantenimiento." },
    { question: "Trabajan fines de semana?", answer: "Podemos coordinar segun disponibilidad y tipo de proyecto." },
  ],
  "florida-central": [
    { question: "Que ciudades cubren en Florida Central?", answer: "Longwood, Orlando, Winter Park, Altamonte Springs, Lake Mary, Sanford y mas." },
    { question: "Ofrecen servicio comercial?", answer: "Si, atendemos proyectos residenciales y comerciales." },
  ],
  florida: [
    { question: "Pueden desplazarse fuera de Orlando?", answer: "Si, evaluamos proyectos en diferentes zonas de Florida." },
    { question: "Dan garantia de trabajo?", answer: "Si, nuestros procesos y materiales estan enfocados en resultados duraderos." },
  ],
};

export function getAreaPageData(slug: string) {
  if (!AREA_SLUGS.includes(slug as AreaSlug)) return null;

  const typedSlug = slug as AreaSlug;
  const idx = AREA_INDEX_MAP[typedSlug];
  const areaInfo = (esTranslations as any).serviceAreas.areas[idx];

  return {
    slug: typedSlug,
    name: areaInfo?.name as string,
    shortDescription: areaInfo?.description as string,
    intro: AREA_INTRO[typedSlug],
    faqs: AREA_FAQS[typedSlug],
  };
}
