import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServicePageData, SERVICE_SLUGS } from "@/lib/servicePages";

export const metadata: Metadata = {
  title: "Servicios de Pintura en Orlando, FL",
  description:
    "Servicios profesionales de pintura en Orlando y Florida Central: exterior, interior, lavado a presion y reparacion de superficies.",
  alternates: {
    canonical: "/servicios",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-20">
      <section className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase mb-4">
          Servicios Profesionales de Pintura
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl mb-12">
          Explora nuestros servicios principales en Orlando y Florida Central. Cada pagina incluye detalles del proceso,
          beneficios y preguntas frecuentes para ayudarte a tomar la mejor decision.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {SERVICE_SLUGS.map((slug) => {
            const service = getServicePageData(slug, "es");
            if (!service) return null;

            return (
              <article key={slug} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
                <div className="relative h-52">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{service.title}</h2>
                  <p className="text-slate-600 mb-5">{service.description}</p>
                  <Link
                    href={`/servicios/${slug}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.18em] hover:bg-slate-900 transition-colors"
                  >
                    Ver Servicio
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
