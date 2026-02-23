"use client";

import { useRef } from "react";

const works = [
  {
    title: "Residential",
    subtitle: "Modern Living",
    number: "01",
    color: "from-orange-500 to-rose-500",
    description: "Transforming houses into homes with carefully curated color palettes"
  },
  {
    title: "Commercial",
    subtitle: "Workspace Design",
    number: "02", 
    color: "from-purple-500 to-blue-500",
    description: "Creating productive environments that inspire creativity and focus"
  },
  {
    title: "Exterior",
    subtitle: "Curb Appeal",
    number: "03",
    color: "from-green-500 to-teal-500",
    description: "Weather-resistant finishes that protect and beautify for years"
  },
  {
    title: "Specialty",
    subtitle: "Custom Finish",
    number: "04",
    color: "from-pink-500 to-red-500",
    description: "Unique textures and techniques for one-of-a-kind spaces"
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="relative bg-black py-32 overflow-hidden">
      {/* Section Title - Fixed */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-16">
        <h2 className="text-7xl md:text-9xl font-black text-white/10 uppercase">
          Our Work
        </h2>
        <p className="text-white/60 text-xl mt-4 tracking-wide">
          Scroll to explore →
        </p>
      </div>

      {/* Horizontal Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-8 px-8 lg:px-16 overflow-x-auto scrollbar-hide pb-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {works.map((work, index) => (
          <div 
            key={index}
            className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] group cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative h-[70vh] bg-gradient-to-br {work.color} overflow-hidden">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div>
                  <div className="text-white/50 text-9xl font-black mb-4">
                    {work.number}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-6xl font-black text-white mb-2 group-hover:translate-x-4 transition-transform">
                    {work.title}
                  </h3>
                  <p className="text-2xl text-white/80 mb-6 font-light">
                    {work.subtitle}
                  </p>
                  <p className="text-white/60 text-lg max-w-md mb-8">
                    {work.description}
                  </p>
                  <button className="border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-all">
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>
        ))}

        {/* CTA Card */}
        <div className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw]">
          <div className="h-[70vh] bg-white flex items-center justify-center p-12 text-center">
            <div>
              <h3 className="text-7xl font-black mb-8">Ready to<br/>Start?</h3>
              <p className="text-2xl text-gray-600 mb-12 max-w-md mx-auto">
                Let's bring your vision to life
              </p>
              <a 
                href="tel:+15555555555"
                className="inline-block bg-black text-white px-12 py-6 text-xl font-bold hover:bg-gray-800 transition-colors"
              >
                CALL (555) 555-5555
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="w-full h-1 bg-white/10 mt-8">
        <div className="h-full bg-white w-1/4"></div>
      </div>
    </section>
  );
}
