"use client";

import React, { useEffect } from 'react';
import { X, Construction } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // 1. Manejo de clics globales para cerrar al navegar
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Cerramos si el modal está abierto y el usuario hace clic en un enlace (del Header por ejemplo)
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
      // Bloqueamos el scroll del body para que no se mueva el fondo al estar abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('app:close-overlays', handleCloseOverlays as EventListener);
      // Devolvemos el scroll al cerrar
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: isOpen } }));

    return () => {
      window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: false } }));
    };
  }, [isOpen]);

  // 2. Cierre automático por cambio de ruta (Next.js Navigation)
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    /* IMPORTANTE: z-[40] es perfecto. 
       Asegúrate que tu Header tenga z-[50] para que flote encima.
    */
    <div className="fixed inset-0 z-[40] bg-white overflow-y-auto antialiased">
      
      {/* pt-32 o pt-40 para que el Header no tape el contenido del modal */}
      <div className="pt-32 md:pt-40 pb-20"> 

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
          
          {/* ICONO CON ANIMACIÓN */}
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 shadow-sm border border-slate-100">
            <Construction className="w-10 h-10 text-primary-600 animate-bounce" />
          </div>

          {/* TEXTOS PRINCIPALES */}
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tightest text-slate-950 mb-4">
             CONTACT US
          </h1>
          
          <div className="h-1 w-20 bg-primary-600 mb-8" />

          <p className="font-sans text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
            Trabajando en esta sección...
          </p>

          {/* BOTÓN DE CIERRE CON ESTILO DE BOTÓN DE ACCIÓN */}
          <button 
            type="button"
            onClick={onClose}
            className="mt-16 group flex items-center gap-4 px-10 py-5 rounded-2xl bg-slate-950 text-white font-sans font-black uppercase tracking-widest text-[9px] hover:bg-primary-600 transition-all shadow-xl active:scale-95"
          >
            <X size={14} className="group-hover:rotate-90 transition-transform" />
            CERRAR CONTACTO
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;