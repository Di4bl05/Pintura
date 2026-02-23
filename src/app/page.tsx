import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Star, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600 w-6 h-6" />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600 w-6 h-6" />
              <span className="font-semibold">15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-6 h-6 fill-yellow-500" />
              <span className="font-semibold">4.9/5 Rating (127 reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <Services />

      {/* About Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our Painting Services?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                With over 15 years of experience serving the [Your City] area, we deliver 
                exceptional painting results for both residential and commercial properties.
              </p>
              <ul className="space-y-4">
                {[
                  "Free, no-obligation estimates",
                  "Licensed and fully insured",
                  "Quality materials and expert craftsmanship",
                  "On-time completion guarantee",
                  "Competitive pricing",
                  "100% satisfaction guarantee"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-600 w-6 h-6 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/about"
                className="inline-block mt-8 text-primary-600 font-semibold hover:text-primary-700"
              >
                Learn More About Us →
              </Link>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/team-working.jpg"
                alt="Professional painters at work"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
