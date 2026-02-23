import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-32">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Painting Services in <span className="text-primary-200">[Your City]</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-50">
            Transform your home or business with expert painting services. 
            Licensed, insured, and trusted by hundreds of satisfied customers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+15555555555"
              className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-colors font-bold text-lg border-2 border-white/20"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Stars</span>
            </div>
            <div>✓ Licensed & Insured</div>
            <div>✓ 15+ Years Experience</div>
            <div>✓ Same Day Quotes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
