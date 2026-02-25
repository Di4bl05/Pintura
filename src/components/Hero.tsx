import Link from "next/link";
import { Phone, ArrowRight, Award, Sparkles, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Diagonal Background Split con gradientes dinámicos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-accent-50"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
        </div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Floating Shapes - Elementos decorativos de v3 */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent-400 rounded-full opacity-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent-300 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border-4 border-accent-300 rotate-45 opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Main Content - Center con estilo híbrido */}
          <div className="space-y-10">
            {/* Badge dinámico de v3 */}
            <div className="inline-block animate-fade-in">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-700 to-accent-600 text-white rounded-full shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">CALIDAD PREMIUM GARANTIZADA</span>
              </div>
            </div>

            {/* Título híbrido: tipografía de v4, colores de v3 */}
            <div className="space-y-6">
              <h1 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-black leading-[0.9] tracking-tight">
                <span className="block text-gray-900">COLOR</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-accent-500 to-primary-700 italic font-serif">
                  tu Mundo
                </span>
              </h1>

              <div className="h-1 w-24 bg-gradient-to-r from-accent-600 to-accent-400 rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg font-light">
              No solo pintamos paredes — transformamos espacios en obras maestras.
              <span className="font-semibold text-gray-900"> Tu visión, nuestra experiencia.</span>
            </p>

            {/* Botones mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#contact"
                className="group relative px-8 py-5 bg-gradient-to-r from-primary-800 to-accent-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  CONSULTA GRATUITA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>

              <a
                href="tel:+15555555555"
                className="px-8 py-5 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-2xl hover:bg-gray-900 hover:text-white transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (555) 555-5555
              </a>
            </div>
          </div>

          {/* Right Side - Card híbrido de v3 y v4 */}
          <div className="lg:mt-20">
            <div className="relative group">
              {/* Efecto glow de v3 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
              
              {/* Card principal */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 group-hover:shadow-3xl transition-all">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 via-accent-50 to-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎨</div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">Transforma</p>
                    <p className="text-2xl italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">
                      tu Espacio
                    </p>
                    <p className="text-gray-600 mt-4 text-sm">Resultados Profesionales</p>
                  </div>
                </div>
              </div>

              {/* Badge flotante mejorado */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-accent-600 to-accent-700 text-white px-8 py-6 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <Award className="w-10 h-10 mx-auto mb-2" />
                  <div className="font-black text-lg">Licenciado &</div>
                  <div className="font-black text-lg">Asegurado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator de v4 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* Bottom Wave de v3 */}
      <div className="absolute bottom-0 left-0 right-0 -z-5">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#wave-gradient)"/>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fff7ed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
