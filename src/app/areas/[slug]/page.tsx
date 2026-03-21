import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AREA_SLUGS, getAreaPageData } from "@/lib/areaPages";
import { SERVICE_SLUGS, getServicePageData } from "@/lib/servicePages";

const BASE_URL = "https://luisbety.com";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return AREA_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = getAreaPageData(params.slug);

  if (!area) {
    return {
      title: "Area no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Pintores en ${area.name} | Luisbety Inc`,
    description: `Servicio de pintura profesional en ${area.name}. ${area.intro}`,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/areas/${area.slug}`,
      title: `Pintores en ${area.name}`,
      description: area.intro,
    },
  };
}

export default function AreaDetailPage({ params }: PageProps) {
  const area = getAreaPageData(params.slug);
  if (!area) notFound();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LUISBETY INC",
    url: `${BASE_URL}/areas/${area.slug}`,
    telephone: "+1-786-350-6367",
    areaServed: area.name,
    image: `${BASE_URL}/images/logo/logo.png`,
    description: area.intro,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/areas" className="hover:text-blue-600">Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-semibold">{area.name}</span>
        </nav>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-4">
          Pintura Profesional en {area.name}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">{area.intro}</p>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Por que clientes nos eligen en {area.name}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Preparacion detallada de superficies</li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Materiales premium para clima de Florida</li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Equipo licenciado y asegurado</li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm">Limpieza final y entrega profesional</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {area.faqs.map((faq, index) => (
              <article key={index} className="border border-slate-200 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Servicios destacados en {area.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {SERVICE_SLUGS.map((serviceSlug) => {
              const service = getServicePageData(serviceSlug, "es");
              if (!service) return null;

              return (
                <Link
                  key={serviceSlug}
                  href={`/servicios/${service.slug}/${area.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {service.title} en {area.name}
                </Link>
              );
            })}
          </div>
        </section>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-1">Solicita una cotizacion gratis</h2>
            <p className="text-slate-600">Atendemos proyectos en {area.name} y zonas cercanas.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}
