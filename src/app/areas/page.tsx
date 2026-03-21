import type { Metadata } from "next";
import Link from "next/link";
import { AREA_SLUGS, getAreaPageData } from "@/lib/areaPages";

export const metadata: Metadata = {
  title: "Areas de Servicio de Pintura en Florida Central",
  description:
    "Conoce nuestras areas de servicio para pintura residencial y comercial en Orlando, Longwood, Winter Park y mas.",
  alternates: { canonical: "/areas" },
};

export default function AreasIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <section className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">
          Areas de Servicio
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl mb-10">
          Atendemos proyectos de pintura en ciudades clave de Florida Central con estandares profesionales y respuesta rapida.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREA_SLUGS.map((slug) => {
            const area = getAreaPageData(slug);
            if (!area) return null;

            return (
              <article key={slug} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{area.name}</h2>
                <p className="text-slate-600 text-sm mb-4">{area.intro}</p>
                <Link
                  href={`/areas/${slug}`}
                  className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 hover:text-slate-900"
                >
                  Ver pagina local
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
