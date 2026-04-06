"use client";


import React, { useEffect, useState } from "react";
import { ChevronRight, Star, Plus, Check } from 'lucide-react';
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
    return () => window.dispatchEvent(new CustomEvent("app:overlay-state", { detail: { open: false } }));
  }, [isOpen]);

  useEffect(() => { if (isOpen) onClose(); }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[40] bg-white overflow-hidden antialiased flex flex-col">
      <div className="absolute top-28 left-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white ${
                    step >= i ? "border-primary-600" : "border-slate-100"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black ${
                      step >= i ? "text-primary-600" : "text-slate-300"
                    }`}
                  >
                    {i}
                  </span>
                </div>
              </div>
              {i < 6 && (
                <div className="w-10 lg:w-20 h-[2px] bg-slate-50 relative overflow-hidden mx-1">
                  <div
                    className={`absolute inset-0 bg-primary-600 transition-all duration-700 ${
                      step > i ? "translate-x-0" : "-translate-x-full"
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
    
    {/* Información a la izquierda - Escala Reducida */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <div className="max-w-[500px]"> {/* Bajé el max-width de 600 a 500 */}
        
        {/* BADGE - Más pequeño */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6">
          <Star className="text-primary-600 fill-primary-600" size={8} />
          <span className="font-sans font-black text-[8px] tracking-[0.15em] text-slate-900 uppercase">
            {t("contact.header.subtitle")}
          </span>
        </div>
        
        {/* TÍTULO - Bajado de 6xl a 4xl/5xl */}
        <h1 className="font-display font-black text-4xl lg:text-5xl text-slate-950 leading-[0.95] uppercase tracking-tighter mb-6">
          {t("contact.header.title").split("preciso")[0]}
          <span className="text-primary-600 block">
            preciso.
          </span>
        </h1>
        
        {/* DESCRIPCIÓN - Texto más pequeño (sm/base) y margen reducido */}
        <p className="font-sans text-sm lg:text-base font-medium text-slate-500 leading-relaxed mb-10 max-w-[450px] border-l-2 border-primary-600 pl-6">
          {t("contact.header.description")}
        </p>
        
        {/* BOTONES - Altura reducida de p-5 a p-4 y texto más pequeño */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {/* Botón Principal */}
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

          {/* Botón Secundario */}
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

    {/* LADO DERECHO: Se mantiene igual pero con px-12 para dar más aire */}
    <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-12">
      <div className="relative w-full h-[80%] max-h-[600px] group">
        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-[10px] border-white shadow-[0_30px_80px_-15px_rgba(0,0,0,0.1)] ring-1 ring-slate-100">
          <Image 
            src={currentImage} 
            alt="Luisbety Preview" 
            fill 
            className="object-cover transition-transform duration-[6s] group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/5" />
        </div>
      </div>
    </div>
    
  </div>
)}

{step === 2 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_1.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
        <p className="font-sans text-sm font-medium text-slate-500 mt-3 max-w-[350px] mx-auto leading-relaxed">
          {t("contact.steps.step_1.description")}
        </p>
      </div>

      {/* FORMULARIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
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
              className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all duration-300 placeholder:text-slate-300 focus:border-primary-600"
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
      
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_2.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
        {["service_type", "colors"].map((field) => (
          <div key={field} className="w-full space-y-1.5">
            <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
              {t(`contact.steps.step_2.fields.${field}`)}
            </label>
            <select
              name={field}
              value={contactData[field] || ""}
              onChange={(e) => setContactData((prev: any) => ({ ...prev, [field]: e.target.value }))}
              className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all appearance-none focus:border-primary-600 cursor-pointer"
            >
              <option value="">{t("contact.select_option")}</option>
              {field === "service_type" 
                ? Object.entries(t("contact.steps.step_2.options.service_type")).map(([key, label]) => (
                    <option key={key} value={key}>{label as string}</option>
                  ))
                : (t("contact.steps.step_2.options.colors") as string[]).map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))
              }
            </select>
          </div>
        ))}

        <div className="md:col-span-2 space-y-3 mt-2">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.specifics")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...t("contact.steps.step_2.options.specifics.exterior"),
              ...t("contact.steps.step_2.options.specifics.interior"),
              ...t("contact.steps.step_2.options.specifics.pro")].map((service: string) => (
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
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 accent-primary-600"
                />
                <span className="font-sans font-medium text-slate-500 text-[11px] group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 w-full space-y-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.paint_type")}
          </label>
          <input
            type="text"
            name="paint_type"
            value={contactData.paint_type || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, paint_type: e.target.value }))}
            placeholder="Ej: Mate, Satinado, Sherwin-Williams..."
            className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all focus:border-primary-600 placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button type="button" onClick={() => setStep(4)}
          className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">{t("contact.buttons.next")}</span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button type="button" onClick={() => setStep(2)}
          className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all">
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}  

{step === 4 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_3.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.status")}
          </label>
          <textarea
            name="status"
            value={contactData.status || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, status: e.target.value }))}
            placeholder={t("contact.steps.step_3.placeholders.status")}
            className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all focus:border-primary-600 resize-none h-[90px] placeholder:text-slate-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.upload")}
          </label>
          <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center transition-all hover:border-primary-600 bg-slate-50/50">
            <input 
              type="file" 
              multiple 
              onChange={(e) => setContactData((prev: any) => ({ ...prev, upload: e.target.files }))} 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
              <Plus size={18} className="text-primary-600" />
            </div>
            <p className="font-sans font-medium text-slate-500 text-[11px] uppercase tracking-widest">
              Arrastra tus fotos aquí o haz clic
            </p>
            {contactData.upload && contactData.upload.length > 0 && (
              <p className="font-sans font-black text-[9px] text-primary-600 mt-2 uppercase">
                {contactData.upload.length} Archivos listos
              </p>
            )}
          </div>
        </div>

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
            className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all focus:border-primary-600 placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button type="button" onClick={() => setStep(5)} className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">{t("contact.buttons.next")}</span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button type="button" onClick={() => setStep(3)} className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all">{t("contact.buttons.prev")}</button>
      </div>
    </div>
  </div>
)}

{step === 5 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700 overflow-hidden">
    <div className="w-full max-w-[580px] flex flex-col items-center">
      
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_4.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.budget")}
          </label>
          <select
            name="budget"
            value={contactData.budget || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, budget: e.target.value }))}
            className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all focus:border-primary-600 appearance-none cursor-pointer"
          >
            <option value="">{t("contact.select_option")}</option>
            {Object.entries(t("contact.steps.step_4.ranges")).map(([key, value]) => (
              <option key={key} value={value as string}>{value as string}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.comments")}
          </label>
          <textarea
            name="comments"
            value={contactData.comments || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, comments: e.target.value }))}
            className="w-full p-2.5 border-b-2 border-slate-200 bg-transparent outline-none font-sans font-medium text-slate-900 text-sm transition-all focus:border-primary-600 resize-none h-[90px] placeholder:text-slate-300"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer group hover:border-primary-600 transition-all">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={contactData.vip || false}
                onChange={(e) => setContactData((prev: any) => ({ ...prev, vip: e.target.checked }))}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-primary-600 checked:bg-primary-600 transition-all"
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

      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button type="button" onClick={() => setStep(6)} className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10 font-sans font-black text-[10px] tracking-[0.2em] uppercase pl-2">Finalizar estimado</span>
          <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button type="button" onClick={() => setStep(4)} className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all">{t("contact.buttons.prev")}</button>
      </div>
    </div>
  </div>
)}

       {step === 6 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/30 px-6 pt-20 animate-in zoom-in-95 duration-700">
    <div className="w-full max-w-[550px] bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-10 lg:p-16 text-center relative overflow-hidden">
      
      {/* DECORACIÓN DE FONDO SUTIL */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-primary-600 rounded-b-full" />
      
      {/* ICONO DE ÉXITO ANIMADO */}
      <div className="mb-8 relative inline-flex">
        <div className="absolute inset-0 bg-primary-600/20 blur-2xl rounded-full animate-pulse" />
        <div className="relative w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-xl shadow-primary-600/30">
          <Check size={40} className="text-white stroke-[3px]" />
        </div>
      </div>

      {/* TÍTULO - Usando font-display */}
      <h2 className="font-display font-black text-3xl lg:text-4xl text-slate-950 leading-tight uppercase tracking-tighter mb-4">
        {t("contact.steps.step_5.title")}
      </h2>

      {/* DESCRIPCIÓN - Con estilo de párrafo de la web */}
      <p className="font-sans text-sm lg:text-base font-medium text-slate-500 leading-relaxed mb-10 max-w-[320px] mx-auto">
        {t("contact.steps.step_5.description")}
      </p>

      {/* BOTÓN FINAL - Estilo igual al botón de inicio pero en azul */}
      <button 
        onClick={onClose} 
        className="group relative w-full overflow-hidden flex items-center justify-center p-5 rounded-2xl bg-slate-950 text-white transition-all duration-500 shadow-xl hover:scale-[1.02]"
      >
        <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
        <span className="relative z-10 font-sans font-black text-[11px] tracking-[0.25em] uppercase">
          {t("contact.steps.step_5.finish_btn")}
        </span>
      </button>

      {/* DETALLE INFERIOR */}
      <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
        Luisbety Painting • Florida
      </p>
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