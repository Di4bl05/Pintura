import Link from "next/link";
import { Home, Building2, Brush, Palette } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    description: "Professional interior painting for homes and offices. We handle everything from prep work to final touches.",
    link: "/services/interior"
  },
  {
    icon: Building2,
    title: "Exterior Painting",
    description: "Weather-resistant exterior painting to protect and beautify your property for years to come.",
    link: "/services/exterior"
  },
  {
    icon: Brush,
    title: "Commercial Painting",
    description: "Minimize downtime with our efficient commercial painting services. We work around your schedule.",
    link: "/services/commercial"
  },
  {
    icon: Palette,
    title: "Cabinet Refinishing",
    description: "Transform your kitchen or bathroom with professional cabinet painting and refinishing.",
    link: "/services/cabinet-refinishing"
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Painting Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive painting solutions for residential and commercial properties
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <service.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <span className="text-primary-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More 
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
