import Link from "next/link";
import { Phone, ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-sky-50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-transparent via-white to-transparent opacity-60"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-2 space-y-8 lg:mt-32">
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Years</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Projects</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-gray-900 mb-1">★</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Premium</div>
            </div>
          </div>
          
          {/* Main Content - Center */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 border border-gray-900 text-gray-900 text-xs uppercase tracking-[0.3em] font-semibold">
                Est. 2010
              </div>
              
              <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-light leading-[0.85] tracking-tight text-gray-900">
                Paint<br/>
                <span className="italic font-serif">Studio</span>
              </h1>
              
              <div className="w-20 h-[2px] bg-gray-900"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md font-light">
              Where craftsmanship meets artistry. We create living spaces that inspire, comfort, and elevate everyday moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a 
                href="tel:+15555555555" 
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 text-gray-900 text-sm uppercase tracking-widest hover:border-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
          
          {/* Right Side - Large Image Card */}
          <div className="lg:col-span-4 lg:mt-20">
            <div className="relative">
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 aspect-[3/4] shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-[8rem] mb-4">🎨</div>
                    <div className="text-2xl font-light text-gray-900">Crafted</div>
                    <div className="text-2xl italic font-serif text-gray-900">with Precision</div>
                  </div>
                </div>
              </div>
              
              {/* Overlapping badge */}
              <div className="absolute -bottom-6 -left-6 bg-white border-2 border-gray-900 px-6 py-4 shadow-xl">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Certified</div>
                <div className="text-lg font-bold text-gray-900">Licensed & Insured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
