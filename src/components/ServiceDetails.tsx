"use client";

import React, { useEffect } from 'react';
import { X, Construction } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ServiceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: any;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ isOpen, onClose, serviceData }) => {
  const pathname = usePathname();

  // 1. CIERRE TOTAL: Si el modal está abierto y el usuario hace clic 
  // en CUALQUIER enlace (como los del Header), cerramos el modal.
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Si el clic fue en un enlace (<a>) o dentro de uno, cerramos.
      if (isOpen && target.closest('a')) {
        onClose();
      }
    };

    const handleCloseOverlays = () => {
      if (isOpen) onClose();
    };

    if (isOpen) {
      window.addEventListener('click', handleGlobalClick);
      window.addEventListener('app:close-overlays', handleCloseOverlays as EventListener);
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('app:close-overlays', handleCloseOverlays as EventListener);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: isOpen } }));

    return () => {
      window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: false } }));
    };
  }, [isOpen]);

  // 2. Respaldo por si cambia la ruta (Next.js Navigation)
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  if (!isOpen) return null;

  return (
    /* Z-40 para que el Header (50) siempre esté por encima y reciba los clics */
    <div className="fixed inset-0 z-[40] bg-white overflow-y-auto antialiased">
      
      {/* Padding superior para que el Header flote sobre el blanco */}
      <div className="pt-32 md:pt-40"> 

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
          
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 shadow-sm border border-slate-100">
            <Construction className="w-10 h-10 text-primary-600 animate-bounce" />
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tightest text-slate-950 mb-4">
             {serviceData?.title || "Service Details"}
          </h1>
          
          <div className="h-1 w-20 bg-primary-600 mb-8" />

          <p className="font-sans text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
            Trabajando en esta sección...
          </p>

          <button 
            onClick={onClose}
            className="mt-16 group flex items-center gap-4 px-10 py-5 rounded-2xl bg-slate-950 text-white font-sans font-black uppercase tracking-widest text-[9px] hover:bg-primary-600 transition-all shadow-xl active:scale-95"
          >
            <X size={14} />
            Cerrar Ficha Técnica
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;