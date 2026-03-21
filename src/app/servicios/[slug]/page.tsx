import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AREA_SLUGS, getAreaPageData } from "@/lib/areaPages";
import { getServicePageData, SERVICE_SLUGS } from "@/lib/servicePages";

const BASE_URL = "https://luisbety.com";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServicePageData(params.slug, "es");

  if (!service) {
    return {
      title: "Servicio no encontrado",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${service.title} en Orlando, FL`,
    description: service.description,
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Luisbety Inc`,
      description: service.description,
      url: `${BASE_URL}/servicios/${service.slug}`,
      type: "article",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getServicePageData(params.slug, "es");

  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: "LUISBETY INC",
      telephone: "+1-786-350-6367",
      areaServed: "Orlando, Florida",
      url: BASE_URL,
    },
    areaServed: "Orlando, Florida Central",
    description: service.description,
    url: `${BASE_URL}/servicios/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative h-[46vh] min-h-[360px] overflow-hidden">
        <Image src={service.image} alt={service.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-10">
          <div>
            <p className="text-blue-200 text-xs md:text-sm font-black uppercase tracking-[0.25em] mb-3">Servicio en Orlando, FL</p>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl">{service.title}</h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-14 max-w-5xl">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/servicios" className="hover:text-blue-600">Servicios</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-semibold">{service.title}</span>
        </nav>

        <p className="text-lg leading-relaxed text-slate-700 mb-10">{service.description}</p>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-6">Que incluye este servicio</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-12">
          {service.features.map((feature, index) => (
            <li key={index} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 font-semibold text-sm uppercase tracking-[0.04em]">
              {feature}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-6">Proceso profesional</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed mb-12">
          <p>{service.experience?.intro}</p>
          <p>{service.experience?.process}</p>
          <p>{service.experience?.climax}</p>
          <p>{service.experience?.footer}</p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-6">Preguntas frecuentes</h2>
        <div className="space-y-4 mb-12">
          {service.faqs.map((faq, index) => (
            <article key={index} className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-black text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-6">Cobertura por ciudad</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {AREA_SLUGS.slice(0, 6).map((areaSlug) => {
            const area = getAreaPageData(areaSlug);
            if (!area) return null;

            return (
              <Link
                key={areaSlug}
                href={`/servicios/${service.slug}/${area.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {service.title} en {area.name}
              </Link>
            );
          })}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-1">Solicita tu presupuesto gratis</h2>
            <p className="text-slate-600">Respuesta rapida para proyectos en Orlando y Florida Central.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
