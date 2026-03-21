import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AREA_SLUGS, getAreaPageData } from "@/lib/areaPages";
import { getServicePageData, SERVICE_SLUGS } from "@/lib/servicePages";

const BASE_URL = "https://luisbety.com";

type PageProps = {
  params: {
    slug: string;
    area: string;
  };
};

export function generateStaticParams() {
  return SERVICE_SLUGS.flatMap((slug) => AREA_SLUGS.map((area) => ({ slug, area })));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServicePageData(params.slug, "es");
  const area = getAreaPageData(params.area);

  if (!service || !area) {
    return {
      title: "Pagina no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} en ${area.name}`;
  const description = `Servicio de ${service.title.toLowerCase()} en ${area.name}. ${area.intro}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/servicios/${service.slug}/${area.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/servicios/${service.slug}/${area.slug}`,
      title,
      description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} en ${area.name}`,
        },
      ],
    },
  };
}

export default function ServiceAreaPage({ params }: PageProps) {
  const service = getServicePageData(params.slug, "es");
  const area = getAreaPageData(params.area);

  if (!service || !area) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    areaServed: area.name,
    provider: {
      "@type": "LocalBusiness",
      name: "LUISBETY INC",
      url: BASE_URL,
      telephone: "+1-786-350-6367",
    },
    description: `${service.description} Cobertura activa en ${area.name}.`,
    url: `${BASE_URL}/servicios/${service.slug}/${area.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Ofrecen ${service.title.toLowerCase()} en ${area.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Si, ofrecemos ${service.title.toLowerCase()} en ${area.name} con preparacion profesional y acabados duraderos.`,
        },
      },
      {
        "@type": "Question",
        name: "Incluyen presupuesto gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Realizamos cotizacion gratuita para proyectos residenciales y comerciales.",
        },
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/servicios" className="hover:text-blue-600">Servicios</Link>
          <span className="mx-2">/</span>
          <Link href={`/servicios/${service.slug}`} className="hover:text-blue-600">{service.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-semibold">{area.name}</span>
        </nav>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-4">
          {service.title} en {area.name}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          {service.description} Nuestro equipo atiende proyectos en {area.name} con procesos de preparacion completos,
          materiales premium y limpieza final incluida.
        </p>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-5">
          Beneficios para clientes en {area.name}
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-10">
          <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Visita y presupuesto sin costo</li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Preparacion profesional de superficies</li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Materiales resistentes al clima de Florida</li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Entrega limpia y soporte post-servicio</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-5">Que incluye el servicio</h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-10">
          {service.features.map((feature, index) => (
            <li key={index} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm uppercase tracking-[0.04em]">
              {feature}
            </li>
          ))}
        </ul>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-1">Agenda tu estimate hoy</h2>
            <p className="text-slate-600">Atencion rapida para proyectos de {service.title.toLowerCase()} en {area.name}.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors"
          >
            Solicitar cotizacion
          </Link>
        </div>
      </section>
    </main>
  );
}
