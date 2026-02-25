import Link from "next/link";
import { Home, Building2, Brush, Palette, Fence, Sparkles, Check } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Pintura Interior",
    description: "Transformamos tus espacios interiores con pintura profesional. Incluye preparación completa de superficies, reparaciones menores y acabados premium.",
    priceRange: "$800 - $3,500",
    priceUnit: "por habitación",
    features: [
      "Preparación de paredes",
      "2 capas de pintura premium",
      "Protección de muebles",
      "Limpieza incluida"
    ],
    link: "/services/interior"
  },
  {
    icon: Building2,
    title: "Pintura Exterior",
    description: "Protege y embellece tu propiedad con pinturas resistentes al clima. Trabajo de alta calidad que dura años.",
    priceRange: "$3,000 - $12,000",
    priceUnit: "casa completa",
    features: [
      "Lavado a presión",
      "Reparación de grietas",
      "Pintura resistente al clima",
      "Garantía de 5 años"
    ],
    link: "/services/exterior"
  },
  {
    icon: Brush,
    title: "Pintura Comercial",
    description: "Servicios comerciales eficientes con mínima interrupción. Trabajamos según tu horario y necesidades.",
    priceRange: "$2,000 - $15,000+",
    priceUnit: "según metraje",
    features: [
      "Horarios flexibles",
      "Personal certificado",
      "Secado rápido",
      "Proyectos grandes"
    ],
    link: "/services/commercial"
  },
  {
    icon: Palette,
    title: "Refinishing de Gabinetes",
    description: "Renueva tu cocina o baño sin el costo de gabinetes nuevos. Acabados profesionales que lucen como nuevos.",
    priceRange: "$1,500 - $4,500",
    priceUnit: "cocina estándar",
    features: [
      "Lijado y preparación",
      "Acabado profesional",
      "Sin residuos tóxicos",
      "Secado en 24-48h"
    ],
    link: "/services/cabinet-refinishing"
  },
  {
    icon: Fence,
    title: "Deck & Patios",
    description: "Restaura y protege tus espacios exteriores con tratamientos especializados para madera y concreto.",
    priceRange: "$600 - $2,500",
    priceUnit: "según tamaño",
    features: [
      "Limpieza profunda",
      "Sellador protector",
      "Manchas de madera",
      "Anti-moho"
    ],
    link: "/services/deck"
  },
  {
    icon: Sparkles,
    title: "Acabados Especiales",
    description: "Técnicas decorativas únicas: texturizado, faux finishes, murales y efectos especiales personalizados.",
    priceRange: "$500 - $5,000+",
    priceUnit: "según diseño",
    features: [
      "Diseño personalizado",
      "Técnicas artísticas",
      "Murales y arte",
      "Texturas únicas"
    ],
    link: "/services/specialty"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
            NUESTROS SERVICIOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">Pintura Profesional</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones completas de pintura para propiedades residenciales y comerciales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
            >
              {/* Header with Icon and Price */}
              <div className="bg-gradient-to-br from-gray-50 to-accent-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{service.priceRange}</div>
                    <div className="text-sm text-gray-600">{service.priceUnit}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-accent-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={service.link}
                  className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-all group-hover:bg-accent-600"
                >
                  Más Información →
                </Link>
              </div>

              {/* Popular Badge (for first service) */}
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-600 to-accent-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  POPULAR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-800 to-accent-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">¿No estás seguro qué servicio necesitas?</h3>
            <p className="text-xl mb-8 opacity-90">
              Contáctanos para una consulta gratuita y te ayudaremos a elegir la mejor opción
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-primary-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Consulta Gratuita
              </a>
              <a
                href="tel:+15555555555"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Llámanos Ahora
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            * Los precios son estimados y pueden variar según el tamaño, condición y ubicación del proyecto.
            <br />
            Todos los presupuestos son gratuitos y sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
}
