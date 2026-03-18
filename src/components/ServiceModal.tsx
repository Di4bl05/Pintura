import React, { useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: any;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceData }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !serviceData) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8">
      {/* OVERLAY: Desenfoque cinemático */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* CONTENEDOR PRINCIPAL: Animación global de entrada */}
      <div className="relative w-full max-w-7xl h-[85vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in fade-in zoom-in-95 duration-500 ease-out fill-mode-both">
        
        {/* LADO IZQUIERDO: PORTADA CON CONTRASTE EXTREMO */}
        <div className="relative w-full lg:w-2/5 h-[35vh] lg:h-full bg-slate-900 shrink-0 overflow-hidden">
          <img 
            src={serviceData.img || "/api/placeholder/800/1200"} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 animate-in fade-in zoom-in-110 duration-1000 ease-out"
            alt={serviceData.title}
          />
          
          {/* Degradado profundo para legibilidad total del título */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 text-white z-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
            <h2 className="text-4xl lg:text-5xl font-black uppercase italic leading-[0.8] tracking-tighter mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {serviceData.title}
            </h2>
            <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] drop-shadow-md">
              <MapPin className="w-3.5 h-3.5" /> 
              <span>Orlando Professional</span>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: CUERPO EDITORIAL */}
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto relative scrollbar-hide animate-in fade-in slide-in-from-right-8 duration-700 delay-150 ease-out">
          
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-black hover:text-white text-slate-400 transition-all shadow-sm group border border-slate-100"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="max-w-2xl mx-auto w-full px-8 lg:px-16 py-16">
            
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-blue-600" />
                <span className="text-blue-600 font-light text-[10px] uppercase tracking-[0.6em]">Premium Detail</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-slate-950 leading-tight mb-8 tracking-tight">
                Desde habitaciones infantiles hasta cocinas de ensueño. Nos enfocamos en acabados perfectos en rodapiés y techos.
              </h3>
              
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] border-b border-slate-100 pb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Fully Insured
                </span>
                <span className="flex items-center gap-2 text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] border-b border-slate-100 pb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Professional
                </span>
              </div>
            </header>

            <article className="mb-12 border-l-2 border-slate-50 pl-6">
              <p className="text-[17px] text-slate-600 leading-[1.8] text-justify font-normal tracking-wide italic">
                Entendemos que tu hogar es tu santuario. Por eso, nuestra prioridad absoluta es la protección total: movemos tus muebles con cuidado y cubrimos cada centímetro de tus pisos con mantas de alta densidad. La verdadera calidad se siente al tacto. Restauramos tus paredes tapando cada agujero de drywall y reparando grietas de tensión hasta que la superficie quede suave como el cristal. Nuestros maestros pintores ejecutan recortes manuales de alta precisión en techos y rodapiés, logrando líneas tan rectas que parecen trazadas con láser. Tras una limpieza de élite, devolvemos cada mueble a su lugar. Te entregamos una casa renovada e impecable.
              </p>
            </article>

            {/* LISTA DE CARACTERÍSTICAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mb-16 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors">
                    Paredes y techos (Ceilings)
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors">
                    Baseboards y molduras finas
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors">
                    Acentos de color personalizados
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors">
                    Expertos en múltiples colores
                  </span>
                </div>
            </div>

            {/* FOOTER: Únicamente el botón centrado */}
            <footer className="relative mt-12 py-10 flex justify-center border-t border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
              <button className="group relative w-full sm:w-auto bg-blue-600 hover:bg-slate-950 text-white px-14 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95">
                Free Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;