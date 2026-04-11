"use client";


import React, { useEffect, useState } from "react";
import { ChevronRight, Star, Plus, Check, ChevronDown, X } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";


interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);

  const [contactData, setContactData] = useState<any>({
    name: "",
    phone: "",
    address: "",
    date: "",
    service_type: "",
    specifics: [],
    colors: "",
    paint_type: "",
    status: "",
    upload: null,
    special: "",
    budget: "",
    comments: "",
    vip: false,
  });

  const currentImage = "/images/gallery/pintores-exteriores-residenciales-orlando.webp";
    const [openSelect, setOpenSelect] = useState<string | null>(null);

  const colorOptions = React.useMemo(() => {
    const value = t("contact.steps.step_2.options.colors");
    if (Array.isArray(value)) {
      return value.map((option) => String(option));
    }
    return ["1", "2", "3+"];
  }, [t]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && target.closest("a")) onClose();
    };
    const handleCloseOverlays = () => { if (isOpen) onClose(); };
    if (isOpen) {
      window.addEventListener("click", handleGlobalClick);
      window.addEventListener("app:close-overlays", handleCloseOverlays as EventListener);
      document.body.style.overflow = "hidden";
    }
  
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("app:close-overlays", handleCloseOverlays as EventListener);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("app:overlay-state", { detail: { open: isOpen } }));
    return () => {
      window.dispatchEvent(new CustomEvent("app:overlay-state", { detail: { open: false } }));
    };
  }, [isOpen]);

  useEffect(() => { if (isOpen) onClose(); }, [pathname, onClose]);

  if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-[40] bg-white overflow-hidden antialiased flex flex-col">
    
    {/* --- STEPPER PREMIUM (LÍNEA DE TIEMPO) --- */}
    <div className="absolute top-28 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full border transition-all duration-700 ease-in-out relative flex items-center justify-center overflow-hidden pointer-events-auto ${
                  step > i 
                    ? "bg-slate-950 border-slate-950 shadow-lg shadow-slate-200" 
                    : step === i
                    ? "border-primary-600 bg-white" 
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="relative h-full w-full flex items-center justify-center">
                  {/* El número sube y desaparece */}
                  <span
                    className={`absolute font-sans font-black text-[10px] tracking-tighter transition-all duration-500 ${
                      step > i ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"
                    } ${step === i ? "text-primary-600" : "text-slate-300"}`}
                  >
                    0{i}
                  </span>

                  {/* La palomita sube y aparece */}
                  <Check
                    size={14}
                    className={`absolute text-white transition-all duration-500 ease-out ${
                      step > i ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50"
                    }`}
                  />
                </div>
              </div>
            </div>

            {i < 6 && (
              <div className="w-10 lg:w-20 h-[1px] bg-slate-100 relative mx-1">
                <div
                  className={`absolute inset-0 bg-slate-950 transition-all duration-1000 ease-in-out ${
                    step > i ? "scale-x-100 origin-left" : "scale-x-0 origin-left"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

  <div className="flex h-full w-full pt-32 bg-white justify-center items-center overflow-y-auto">
   <div className="w-full flex flex-col items-center">
     <div className="w-full animate-in slide-in-from-left-6 duration-700 flex flex-col justify-center items-center">

{step === 1 && (
  <div className="flex w-full h-full items-center justify-between px-8 lg:px-20 animate-in fade-in duration-700">
    
    {/* Información a la izquierda - Espacio respetado */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <div className="max-w-[500px]"> 
        
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6">
          <Star className="text-primary-600 fill-primary-600" size={8} />
          <span className="font-sans font-black text-[8px] tracking-[0.15em] text-slate-900 uppercase">
            {t("contact.header.subtitle")}
          </span>
        </div>
        
        {/* TÍTULO */}
        <h1 className="font-display font-black text-4xl lg:text-5xl text-slate-950 leading-[0.95] uppercase tracking-tighter mb-6">
          {t("contact.header.title").split("preciso")[0]}
          <span className="text-primary-600 block">
            preciso.
          </span>
        </h1>
        
        {/* DESCRIPCIÓN */}
        <p className="font-sans text-sm lg:text-base font-medium text-slate-500 leading-relaxed mb-10 max-w-[450px] border-l-2 border-primary-600 pl-6">
          {t("contact.header.description")}
        </p>
        
        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="group relative flex-[1.2] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg shadow-slate-100"
          >
            <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.15em] uppercase text-left">
              {t("contact.buttons.submit_btn")}
            </span>
            <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 p-4 rounded-xl border border-slate-200 bg-white text-slate-400 font-sans font-black text-[9px] tracking-[0.2em] uppercase hover:text-slate-950 hover:border-slate-300 transition-all"
          >
            {t("contact.buttons.close")}
          </button>
        </div>
      </div>
    </div>

    {/* LADO DERECHO: Foto completa con marco editorial */}
    <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-8">
      {/* Usamos aspect-[16/10] para que la foto se vea ancha y completa sin ser excesivamente alta */}
      <div className="relative w-full max-w-[700px] aspect-[16/10] group">
        
        {/* Marco Blanco Refinado */}
        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-[0_35px_80px_-15px_rgba(0,0,0,0.15)] ring-1 ring-slate-100">
          <Image 
            src="/images/gallery/Exterior2 Despues.webp" 
            alt="Luisbety Exterior Portfolio" 
            fill 
            className="object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
            priority
          />
          
          {/* Capa de acabado profesional */}
          <div className="absolute inset-0 bg-slate-950/5" />
        </div>

        {/* Detalle decorativo opcional (Label de ubicación) */}
        <div className="absolute -bottom-4 right-8 bg-white py-2 px-5 rounded-xl shadow-xl border border-slate-50 transition-transform group-hover:-translate-y-1">
          <p className="font-sans font-black text-[7px] tracking-[0.3em] text-slate-950 uppercase">
            Exterior Service • FL
          </p>
        </div>
      </div>
    </div>
    
  </div>
)}

{step === 2 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_1.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* FORMULARIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        {["name", "phone", "address", "date"].map((field) => (
          <div key={field} className={`w-full space-y-1.5 ${field === "address" || field === "date" ? "md:col-span-2" : ""}`}>
            <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
              {t(`contact.steps.step_1.fields.${field}`)}
            </label>
            <input
              type={field === "date" ? "date" : "text"}
              name={field}
              value={contactData[field]}
              onChange={(e) => setContactData((prev: any) => ({ ...prev, [field]: e.target.value }))}
              placeholder={
                field === "name" ? "Ej: Juan Pérez" :
                field === "phone" ? "Ej: +1 555 123 4567" :
                field === "address" ? "Ej: 123 Main St, Orlando" : ""
              }
              /* RESET TOTAL DEL NAVEGADOR + ANIMACIÓN SUTIL DE LA LÍNEA */
              className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-500 ease-in-out appearance-none outline-none ring-0 ring-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:border-primary-600 focus:shadow-none"
              style={{ boxShadow: 'none' }} // Refuerzo extra por si el CSS falla
            />
          </div>
        ))}
      </div>

      {/* NAVEGACIÓN */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">
            {t("contact.buttons.next")}
          </span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>

    </div>
  </div>
)}

{step === 3 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_2.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        
        {/* SELECTS PERSONALIZADOS: TIPO DE SERVICIO Y COLORES */}
        {["service_type", "colors"].map((field) => (
          <div key={field} className="w-full space-y-1.5 relative">
            <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
              {t(`contact.steps.step_2.fields.${field}`)}
            </label>
            
            {/* Campo "Fake Input" con flechita */}
            <div 
              onClick={() => setOpenSelect(openSelect === field ? null : field)}
              className="w-full p-2.5 bg-transparent border-b-2 border-slate-100 flex items-center justify-between cursor-pointer group transition-all duration-300 hover:border-primary-600"
            >
              <span className={`font-sans font-medium text-sm transition-colors ${contactData[field] ? "text-slate-900" : "text-slate-400"}`}>
                {contactData[field] || "Seleccionar..."}
              </span>
              <ChevronDown 
                size={14} 
                className={`text-slate-400 transition-transform duration-500 ease-out ${openSelect === field ? "rotate-180 text-primary-600" : "rotate-0"}`} 
              />
            </div>

            {/* Menú Minimalista con Animación */}
            {openSelect === field && (
              <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  {field === "service_type" 
                    ? Object.entries(t("contact.steps.step_2.options.service_type")).map(([key, label]) => (
                        <div 
                          key={key}
                          onClick={() => {
                            setContactData((prev: any) => ({ ...prev, [field]: label }));
                            setOpenSelect(null);
                          }}
                          className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          {label as string}
                        </div>
                      ))
                    : colorOptions.map((color) => (
                        <div 
                          key={color}
                          onClick={() => {
                            setContactData((prev: any) => ({ ...prev, [field]: color }));
                            setOpenSelect(null);
                          }}
                          className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          {color}
                        </div>
                      ))
                  }
                </div>
              </div>
            )}
          </div>
        ))}

        {/* MENÚ DE OPCIONES DE SERVICIOS (Checkboxes) */}
        <div className="md:col-span-2 space-y-3 mt-4">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.specifics")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              t("contact.steps.step_2.options.specifics.exterior"),
              t("contact.steps.step_2.options.specifics.interior"),
              t("contact.steps.step_2.options.specifics.pro"),
            ].map((service: string) => (
              <label key={service} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(contactData.specifics || []).includes(service)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setContactData((prev: any) => {
                      const current = prev.specifics || [];
                      return { ...prev, specifics: checked ? [...current, service] : current.filter((v: string) => v !== service) };
                    });
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 accent-primary-600 focus:ring-0"
                />
                <span className="font-sans font-bold text-slate-400 text-[10px] group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* TIPO DE PINTURA */}
        <div className="md:col-span-2 w-full space-y-1.5 mt-2">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.paint_type")}
          </label>
          <input
            type="text"
            name="paint_type"
            value={contactData.paint_type || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, paint_type: e.target.value }))}
            placeholder="Ej: Mate, Satinado, Sherwin-Williams..."
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-500 outline-none focus:border-primary-600 shadow-none"
          />
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button
          type="button"
          onClick={() => setStep(4)}
          className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">
            {t("contact.buttons.next")}
          </span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

{step === 4 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_3.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6 w-full">
        {/* TEXTAREA: ESTADO DE LAS PAREDES - TAMAÑO REDUCIDO */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.status")}
          </label>
          <textarea
            name="status"
            value={contactData.status || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, status: e.target.value }))}
            placeholder={t("contact.steps.step_3.placeholders.status")}
            /* h-[60px] para un tamaño más discreto */
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm transition-all duration-500 !outline-none !ring-0 focus:!ring-0 focus:!outline-none focus:border-primary-600 focus:shadow-none resize-none h-[60px] placeholder:text-slate-400"
            style={{ boxShadow: 'none', WebkitAppearance: 'none', outline: 'none' }}
          />
        </div>

       {/* UPLOAD: FOTOS */}
<div className="flex flex-col gap-1.5 h-[160px]"> {/* Altura fija para que no empuje el resto del form */}
  <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
    {t("contact.steps.step_3.fields.upload")}
  </label>
  
  <div className="relative flex flex-col gap-3 h-full overflow-hidden border-2 border-dashed border-slate-100 rounded-2xl p-4 transition-all hover:border-primary-600 bg-slate-50/30">
    
    {/* ZONA DE INPUT (Siempre visible si hay pocos archivos o scroll si hay muchos) */}
    <div className="relative shrink-0">
      <input 
        type="file" 
        multiple 
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          setContactData((prev: any) => ({ 
            ...prev, 
            upload: prev.upload ? [...prev.upload, ...files] : files 
          }));
        }} 
        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
      />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50 shrink-0">
          <Plus size={16} className="text-primary-600" />
        </div>
        <p className="font-sans font-medium text-slate-400 text-[9px] uppercase tracking-widest text-left leading-tight">
          {contactData.upload?.length > 0 ? "Añadir más fotos" : "Arrastra o haz clic aquí"}
        </p>
      </div>
    </div>

    {/* LISTA DE ARCHIVOS CON SCROLL (Evita que el form crezca) */}
    {contactData.upload && contactData.upload.length > 0 && (
      <div className="flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide">
        {Array.from(contactData.upload as File[]).map((file, index) => (
          <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-white/80 p-2 rounded-xl border border-slate-100">
            <span className="font-sans text-[9px] font-bold text-slate-600 uppercase truncate max-w-[150px]">
              {file.name}
            </span>
            <button
              type="button"
              onClick={() => {
                const newFiles = Array.from(contactData.upload as File[]).filter((_, i) => i !== index);
                setContactData((prev: any) => ({ ...prev, upload: newFiles }));
              }}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
            >
              <X size={12} /> {/* Asegúrate de importar X de lucide-react */}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

        {/* INPUT: REQUERIMIENTOS ESPECIALES */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.special")}
          </label>
          <input
            type="text"
            name="special"
            value={contactData.special || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, special: e.target.value }))}
            placeholder={t("contact.steps.step_3.placeholders.special")}
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-500 !outline-none !ring-0 focus:!ring-0 focus:!outline-none focus:border-primary-600 focus:shadow-none"
            style={{ boxShadow: 'none', WebkitAppearance: 'none', outline: 'none' }}
          />
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button type="button" onClick={() => setStep(5)} className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">
            {t("contact.buttons.next")}
          </span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button type="button" onClick={() => setStep(3)} className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-400 transition-all">
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

{step === 5 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_4.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6 w-full">
        
        {/* CUSTOM SELECT: RANGO DE INVERSIÓN */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.budget")}
          </label>
          
          {/* Gatillo del Select */}
          <div 
            onClick={() => setOpenSelect(openSelect === "budget" ? null : "budget")}
            className="w-full p-2.5 bg-transparent border-b-2 border-slate-100 flex items-center justify-between cursor-pointer group transition-all duration-300 hover:border-primary-600"
          >
            <span className={`font-sans font-medium text-sm transition-colors ${contactData.budget ? "text-slate-900" : "text-slate-400"}`}>
              {contactData.budget || "Seleccionar rango..."}
            </span>
            <ChevronDown 
              size={14} 
              className={`text-slate-400 transition-transform duration-500 ease-out ${openSelect === "budget" ? "rotate-180 text-primary-600" : "rotate-0"}`} 
            />
          </div>

          {/* Menú Desplegable Minimalista */}
          {openSelect === "budget" && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {Object.entries(t("contact.steps.step_4.ranges")).map(([key, value]) => (
                  <div 
                    key={key}
                    onClick={() => {
                      setContactData((prev: any) => ({ ...prev, budget: value as string }));
                      setOpenSelect(null);
                    }}
                    className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {value as string}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* TEXTAREA: COMENTARIOS ADICIONALES */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.comments")}
          </label>
          <textarea
            name="comments"
            value={contactData.comments || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, comments: e.target.value }))}
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm transition-all duration-500 !outline-none !ring-0 focus:!ring-0 focus:border-primary-600 resize-none h-[70px] placeholder:text-slate-400 shadow-none"
            placeholder="¿Algo más que debamos saber?"
          />
        </div>

        {/* TARJETA VIP */}
        <div className="pt-2">
          <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer group hover:border-primary-600 transition-all">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={contactData.vip || false}
                onChange={(e) => setContactData((prev: any) => ({ ...prev, vip: e.target.checked }))}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-primary-600 checked:bg-primary-600 transition-all !outline-none !ring-0 !ring-offset-0"
              />
              <Star size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-black text-[10px] uppercase tracking-widest text-slate-950 group-hover:text-primary-600 transition-colors">
                {t("contact.steps.step_4.fields.vip_label")}
              </span>
              <p className="font-sans font-medium text-slate-500 text-[10px] leading-relaxed uppercase tracking-tight">
                {t("contact.steps.step_4.fields.vip_text")}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button 
          type="button" 
          onClick={() => setStep(6)} 
          className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg shadow-slate-200/50"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">Finalizar estimado</span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          type="button" 
          onClick={() => setStep(4)} 
          className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-400 transition-all"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

   {step === 6 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in zoom-in-95 duration-700 overflow-hidden text-center">
    <div className="w-full max-w-[550px] flex flex-col items-center">


      {/* BLOQUE DE TEXTO */}
      <div className="space-y-6 mb-14">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.success.title")}
        </h2>
        
        <div className="h-[2px] w-10 bg-primary-600 mx-auto rounded-full" />
        
        {/* DESCRIPCIÓN ESTIRADA */}
        <p className="font-sans text-[13px] sm:text-sm font-medium text-slate-500 leading-[1.8] max-w-[460px] mx-auto uppercase tracking-wide pt-2">
          {t("contact.success.message")}
        </p>
      </div>

      {/* ACCIONES FINALIZAR */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[460px]">
        {/* VOLVER AL INICIO */}
        <button 
          onClick={onClose} 
          className="group relative flex-[1.5] overflow-hidden flex items-center justify-center p-5 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg shadow-slate-200"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.25em] uppercase">
            {t("contact.success.close")}
          </span>
        </button>

        {/* LLAMAR DIRECTAMENTE */}
        <a 
          href="tel:+14070000000" 
          className="flex-1 p-5 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all text-center flex items-center justify-center"
        >
          {t("contact.success.call_btn")}
        </a>
      </div>
      
    </div>
  </div>
)} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;