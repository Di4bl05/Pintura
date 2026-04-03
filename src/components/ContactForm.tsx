"use client";

import React, { useEffect, useState } from 'react';
import { X, Camera, Send, Paintbrush, Droplets, Hammer, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Phone, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [step, setStep] = useState(1);

  // SIMULACIÓN DEL JSON DE TRADUCCIÓN
  const t = {
    contact: {
      header: {
        subtitle: "Soluciones reales para paredes reales."
      },
      form: {
        labels: {
          full_name: "Nombre",
          phone_whatsapp: "Teléfono",
          property_address: "Ciudad",
          photos_upload: "Subir 3 fotos (Opcional)",
        },
        placeholders: {
          name: "JUAN PÉREZ",
          phone: "407-XXX-XXXX",
          address: "EJ. ORLANDO, FL",
        },
        options: {
          services: [
            { id: 'ext', label: "Exterior Total", sub: "+ Pressure Wash", icon: <Droplets size={16}/> },
            { id: 'int', label: "Interior", sub: "Paredes y molduras", icon: <Paintbrush size={16}/> },
            { id: 'wash', label: "Lavado", sub: "Driveway y aceras", icon: <Droplets size={16}/> },
            { id: 'rep', label: "Reparación", sub: "Drywall y madera", icon: <Hammer size={16}/> }
          ],
          surface_status: [
            { id: 'exc', title: "Excelente", desc: "Cambio de color" },
            { id: 'reg', title: "Regular", desc: "Huecos pequeños" },
            { id: 'att', title: "Crítico", desc: "Daños fuertes" }
          ]
        },
        tooltips: {
          repairs_bonus: "Pequeñas reparaciones de huecos van por nuestra cuenta."
        },
        submit_btn: "SOLICITAR ESTIMADO"
      }
    }
  };

  // --- LÓGICA DE EVENTOS (INTACTA Y SEGURA) ---
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.closest('a')) onClose();
    };
    const handleCloseOverlays = () => { if (isOpen) onClose(); };

    if (isOpen) {
      window.addEventListener('click', handleGlobalClick);
      window.addEventListener('app:close-overlays', handleCloseOverlays as EventListener);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('app:close-overlays', handleCloseOverlays as EventListener);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: isOpen } }));
    return () => window.dispatchEvent(new CustomEvent('app:overlay-state', { detail: { open: false } }));
  }, [isOpen]);

  useEffect(() => { if (isOpen) onClose(); }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[40] bg-white overflow-y-auto antialiased">
      {/* Redujimos un poco el padding superior para pantallas pequeñas, manteniendo seguridad */}
      <div className="pt-28 md:pt-36 pb-10"> 
        <div className="max-w-[800px] mx-auto px-6">
          
          {/* STEPPER VISUAL (CÍRCULOS GRANDES) */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-display font-black text-lg transition-all duration-300 ${
                  step === num ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-110' : 
                  step > num ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-300'
                }`}>
                  {step > num ? <CheckCircle2 size={24} /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-12 md:w-20 h-1 rounded-full transition-all duration-300 ${step > num ? 'bg-slate-900' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CONTENEDOR MÁS COMPACTO */}
          <div className="min-h-[350px] flex flex-col">
            <form className="space-y-6 flex-grow">
              
              {/* --- VISTA 1: CONTACTO --- */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={16} />
                    {/* Inputs más pequeños: p-4 en vez de p-6 */}
                    <input type="text" placeholder={t.contact.form.placeholders.name} className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary-600 p-4 pl-12 rounded-xl font-sans text-xs font-black uppercase tracking-widest outline-none transition-all text-slate-950" />
                    <label className="absolute -top-2 left-4 bg-white px-1 font-sans font-black text-[8px] tracking-widest text-slate-400 uppercase">{t.contact.form.labels.full_name}</label>
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={16} />
                    <input type="tel" placeholder={t.contact.form.placeholders.phone} className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary-600 p-4 pl-12 rounded-xl font-sans text-xs font-black uppercase tracking-widest outline-none transition-all text-slate-950" />
                    <label className="absolute -top-2 left-4 bg-white px-1 font-sans font-black text-[8px] tracking-widest text-slate-400 uppercase">{t.contact.form.labels.phone_whatsapp}</label>
                  </div>

                  <div className="md:col-span-2 relative group mt-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={16} />
                    <input type="text" placeholder={t.contact.form.placeholders.address} className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary-600 p-4 pl-12 rounded-xl font-sans text-xs font-black uppercase tracking-widest outline-none transition-all text-slate-950" />
                    <label className="absolute -top-2 left-4 bg-white px-1 font-sans font-black text-[8px] tracking-widest text-slate-400 uppercase">{t.contact.form.labels.property_address}</label>
                  </div>
                </div>
              )}

              {/* --- VISTA 2: SERVICIOS --- */}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
                  {t.contact.form.options.services.map((item) => (
                    <label key={item.id} className="relative cursor-pointer group">
                      <input type="checkbox" className="peer sr-only" />
                      {/* Cajas más compactas (p-4) */}
                      <div className="p-4 rounded-xl border-2 border-slate-100 bg-white peer-checked:border-primary-600 peer-checked:bg-primary-50/50 transition-all flex flex-col md:flex-row items-center md:items-start gap-3 hover:border-slate-300 text-center md:text-left">
                        <div className="text-slate-300 peer-checked:text-primary-600 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <span className="block font-sans font-black uppercase tracking-widest text-[10px] text-slate-950">{item.label}</span>
                          <span className="hidden md:block font-sans font-bold uppercase tracking-widest text-[8px] text-slate-400 mt-0.5">{item.sub}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* --- VISTA 3: ESTADO Y FOTOS --- */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-3 gap-3">
                    {t.contact.form.options.surface_status.map((status) => (
                      <label key={status.id} className="cursor-pointer group">
                        <input type="radio" name="status" className="peer sr-only" />
                        <div className="p-4 rounded-xl border-2 border-slate-100 bg-white peer-checked:border-slate-950 peer-checked:bg-slate-950 transition-all flex flex-col justify-center text-center hover:border-slate-300">
                          <span className="font-sans font-black uppercase tracking-widest text-[9px] text-slate-950 peer-checked:text-white mb-1">{status.title}</span>
                          <span className="hidden md:block font-sans font-bold uppercase text-[7px] tracking-widest text-slate-400 peer-checked:text-slate-300">{status.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-primary-50 border border-primary-200 p-4 rounded-xl flex items-center gap-4">
                    <CheckCircle2 className="shrink-0 text-primary-600" size={18} />
                    <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-primary-950">
                      {t.contact.form.tooltips.repairs_bonus}
                    </p>
                  </div>

                  <button type="button" className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50/30 transition-all font-sans font-black text-[9px] tracking-widest uppercase">
                    <Camera size={16} /> {t.contact.form.labels.photos_upload}
                  </button>
                </div>
              )}
            </form>

            {/* --- NAVEGACIÓN Y CIERRE (ALTURA REDUCIDA) --- */}
            <div className="pt-8">
              <div className="flex gap-3">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="w-1/3 flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-100 text-slate-500 font-sans font-black text-[9px] tracking-widest uppercase hover:bg-slate-200 transition-all">
                    <ChevronLeft size={14} /> VOLVER
                  </button>
                )}
                
                {step < 3 ? (
                  <button type="button" onClick={() => setStep(step + 1)} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-950 text-white font-sans font-black text-[9px] tracking-[0.2em] uppercase hover:bg-primary-600 transition-all shadow-md">
                    SIGUIENTE <ChevronRight size={14} />
                  </button>
                ) : (
                  <button type="submit" className="flex-1 bg-primary-600 text-white p-4 rounded-xl font-sans font-black text-[9px] tracking-[0.2em] uppercase hover:bg-slate-950 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-200/50">
                    <Send size={14} /> {t.contact.form.submit_btn}
                  </button>
                )}
              </div>

              <div className="flex justify-center pt-4">
                <button type="button" onClick={onClose} className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent text-slate-300 font-sans font-black uppercase tracking-[0.3em] text-[8px] hover:text-slate-950 transition-all">
                  <X size={12} /> CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;