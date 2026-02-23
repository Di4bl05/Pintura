import Link from "next/link";
import { Phone, ArrowRight, Award, Star, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Diagonal Background Split */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}>
        </div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-orange-100 to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-400 rounded-full opacity-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border-4 border-primary-300 rotate-45 opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Diagonal Layout */}
          <div className="space-y-8 lg:-mt-20">
            <div className="inline-block animate-fade-in">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white rounded-full shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">PREMIUM QUALITY GUARANTEED</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black leading-none animate-slide-up">
              <span className="block text-gray-900">COLOR</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 mt-2">
                YOUR
              </span>
              <span className="block text-gray-900 mt-2">WORLD</span>
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-orange-500 rounded-full"></div>
            
            <p className="text-2xl text-gray-600 leading-relaxed max-w-lg font-light">
              We don't just paint walls — we transform spaces into masterpieces. 
              <span className="font-semibold text-gray-900"> Your vision, our expertise.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="#contact" 
                className="group relative px-8 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  FREE CONSULTATION
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
              
              <a 
                href="tel:+15555555555" 
                className="px-8 py-5 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-2xl hover:bg-gray-900 hover:text-white transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (555) 555-5555
              </a>
            </div>
            
            {/* Stats - Horizontal */}
            <div className="flex gap-8 pt-8">
              <div className="relative">
                <div className="text-4xl font-black text-gray-900">500+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></div>
              </div>
              <div className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">4.9</span>
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Rating</div>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <div className="relative">
                <div className="text-4xl font-black text-gray-900">15</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Years</div>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Creative Grid */}
          <div className="relative lg:mt-20">
            {/* Large Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-orange-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 group-hover:shadow-3xl transition-all">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 via-orange-50 to-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎨</div>
                    <p className="text-xl font-bold text-gray-800">Transform Your Space</p>
                    <p className="text-gray-600 mt-2">Professional Results</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white px-8 py-6 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-center">
                <Award className="w-10 h-10 mx-auto mb-2" />
                <div className="font-black text-lg">Licensed &</div>
                <div className="font-black text-lg">Insured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>
  );
}
