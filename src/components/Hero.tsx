import Link from "next/link";
import { Phone, ArrowRight, Award, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-primary-900 to-orange-900">
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-8">
          <Award className="w-4 h-4" />
          <span>Licensed & Insured • 15+ Years Excellence</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Paint Your
          <br />
          <span className="bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
            Vision
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Premium painting services that bring your space to life.
          <br className="hidden md:block" />
          Quality you can see. Results you'll love.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link 
            href="#contact" 
            className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-bold rounded-full transition-all shadow-2xl hover:shadow-green-500/50 hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="tel:+1-555-555-5555" 
            className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-lg font-bold rounded-full border-2 border-white/30 transition-all"
          >
            <Phone className="mr-2 w-5 h-5" />
            (555) 555-5555
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">500+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Projects</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-5xl font-black text-white">4.9</span>
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">100%</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Guaranteed</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white rounded-full mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
