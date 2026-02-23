import Link from "next/link";
import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-primary-50 max-w-3xl mx-auto">
          Get your free, no-obligation estimate today. Our team is ready to bring your vision to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
          >
            Request Free Estimate
          </Link>
          <a
            href="tel:+15555555555"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg border-2 border-white"
          >
            <Phone className="w-5 h-5" />
            (555) 555-5555
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-primary-100">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-primary-100">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <div className="text-primary-100">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
