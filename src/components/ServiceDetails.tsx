"use client";

import React, { useEffect, useCallback } from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Trophy, 
  Target, 
  Info,
  Layers,
  Search,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: {
    title: string;
    img: string;
    description?: string;
    [key: string]: any;
  } | null; 
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ isOpen, onClose, serviceData }) => {
  
  // Manejo de escape para cerrar
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !serviceData) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-white overflow-y-auto antialiased">
      
      {/* NAVEGACIÓN DE PROTOCOLO */}
      <nav className="sticky top-0 z-[300] bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-display font-black uppercase tracking-tightest text-slate-950 text-base md:text-xl">
            Luisbety <span className="text-primary-600">Protocol</span>
          </span>
          <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-6">
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
            <span className="font-sans text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">
              High-Performance Standards v2.6
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="group flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-all"
        >
          <span className="hidden sm:block">Close Specification</span>
          <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
            <X className="w-5 h-5" />
          </div>
        </button>
      </nav>

      {/* HERO SECTION: INGENIERÍA VISUAL */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center bg-slate-950 overflow-hidden">
        <img 
          src={serviceData.img} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105" 
          alt={serviceData.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-primary-400 mb-8 font-sans text-[10px] font-black uppercase tracking-[0.4em] bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Target className="w-4 h-4" />
              Technical Specification Sheet
            </div>
            <h1 className="font-display text-6xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tightest text-white mb-10">
              {serviceData.title}
            </h1>
            <p className="font-sans text-slate-300 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium opacity-90">
              Advanced chemical diagnostics and precision execution for high-value structures in Central Florida. Focused on UV resilience and molecular integrity.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN TÉCNICA: EL DIFERENCIAL */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary-600 mb-4 font-sans">
                <Info className="w-6 h-6" />
                <span className="font-black uppercase tracking-[0.3em] text-[11px]">Substrate Analysis</span>
              </div>
              <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tightest text-slate-950 leading-[0.95]">
                Surface Engineering & <br />
                <span className="text-primary-600 font-serif italic lowercase tracking-normal font-normal">Climate Shielding</span>
              </h2>
            </div>

            <div className="space-y-8 text-slate-600 text-xl leading-relaxed font-sans font-medium">
              <p>
                Painting in **Orlando** isn't just about color; it's about moisture management. Our protocol addresses the high porosity of Florida stucco and the thermal stress caused by 95°F+ exposure.
              </p>
              <div className="border-l-[6px] border-primary-600 pl-10 py-10 bg-slate-50/50 rounded-r-[3rem] text-slate-900 shadow-sm">
                <p className="font-serif italic text-2xl md:text-3xl leading-snug">
                  "We implement pure resin elastomeric systems that facilitate molecular breathability while creating an impenetrable barrier against liquid humidity."
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-slate-950 p-12 md:p-16 rounded-[4rem] text-white shadow-3xl sticky top-40">
              <h4 className="font-sans font-black uppercase text-[11px] tracking-[0.4em] text-primary-400 mb-12">Compliance Standards</h4>
              <ul className="space-y-10">
                {[
                  { t: "ASTM D16", d: "Standard terminology for industrial paint coatings." },
                  { t: "SSPC-SP 1", d: "Chemical and high-pressure decontamination protocols." },
                  { t: "PDCA P1", d: "Professional finish levels and visual audit criteria." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-8 group">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-primary-400 text-lg transition-colors group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600">
                      {i+1}
                    </div>
                    <div className="pt-1">
                      <p className="font-display text-sm font-bold uppercase tracking-widest text-white mb-2">{item.t}</p>
                      <p className="text-base text-slate-400 font-sans leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tightest mb-20 text-center">
            The <span className="text-primary-600">Step-by-Step</span> Protocol
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
            {[
              { id: '01', title: 'Decontamination', desc: 'Deep cleaning to eliminate salt deposits and microorganisms common in Florida humidity.', img: '/images/services/ext-1.webp' },
              { id: '02', title: 'Pathology Correction', desc: 'Thermal stress crack treatment using high-build elastomeric compounds with memory.', img: '/images/services/ext-2.webp' },
              { id: '03', title: 'Layer Stratification', desc: 'Controlled application with real-time substrate temperature and moisture monitoring.', img: '/images/services/ext-3.webp' },
              { id: '04', title: 'Quality Audit', desc: '360° inspection using low-angle lighting to verify dry film thickness and uniformity.', img: '/images/services/ext-4.webp' }
            ].map((step, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start gap-10 group">
                <div className="relative shrink-0">
                  <div className="w-32 h-32 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl">
                    <img src={step.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={step.title} />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-display font-black text-sm shadow-xl">
                    {step.id}
                  </div>
                </div>
                <div className="pt-4 flex-1">
                   <h4 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tightest text-slate-950 mb-4">{step.title}</h4>
                   <p className="font-sans text-slate-500 text-lg leading-relaxed font-medium">
                     {step.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA FOOTER */}
      <footer className="py-44 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary-600/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
          <div className="w-20 h-20 bg-primary-600/10 rounded-3xl flex items-center justify-center mx-auto border border-primary-600/30">
            <Trophy className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="font-display text-5xl md:text-9xl font-black uppercase tracking-tightest leading-[0.85]">
            World Class <br /><span className="text-primary-600">Results Only</span>
          </h2>
          <p className="font-sans text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
            Elevate your property's lifecycle with the most rigorous execution protocol in Orlando.
          </p>
          
          <div className="pt-10">
            <button className="font-sans bg-primary-600 hover:bg-white hover:text-slate-950 text-white px-16 py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-3xl active:scale-95 group flex items-center gap-4 mx-auto">
              Request Technical Assessment
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetail;