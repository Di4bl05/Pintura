"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-rose-500/20 to-purple-500/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-8">
          {/* Main Heading - Huge */}
          <h1 className="text-[10vw] md:text-[12vw] lg:text-[15vw] font-black leading-none text-white mb-8 tracking-tighter">
            <span className="block opacity-90">WE</span>
            <span className="block bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent animate-pulse">PAINT</span>
            <span className="block opacity-90">DREAMS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl tracking-[0.5em] uppercase mb-12">
            Transform • Inspire • Create
          </p>

          {/* CTA - Different */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-12 py-6 bg-white text-gray-900 font-bold text-lg overflow-hidden">
              <span className="relative z-10">START PROJECT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 text-white font-bold">
                LET'S GO →
              </span>
            </button>
            
            <a href="#work" className="text-white border-2 border-white/30 px-12 py-6 font-bold text-lg hover:bg-white hover:text-gray-900 transition-all">
              VIEW WORK
            </a>
          </div>

          {/* Stats - Minimal */}
          <div className="flex gap-12 justify-center mt-20 text-white">
            <div>
              <div className="text-4xl font-black">500+</div>
              <div className="text-xs uppercase tracking-widest text-white/50">Projects</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <div className="text-4xl font-black">15Y</div>
              <div className="text-xs uppercase tracking-widest text-white/50">Experience</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <div className="text-4xl font-black">★★★★★</div>
              <div className="text-xs uppercase tracking-widest text-white/50">Rated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/50" />
      </div>

      {/* Version Number - Design Detail */}
      <div className="absolute bottom-8 right-8 text-white/30 text-xs font-mono">
        V5.0
      </div>
    </section>
  );
}
