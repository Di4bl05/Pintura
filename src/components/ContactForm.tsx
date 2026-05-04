"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Star, Plus, Check, ChevronDown, X, Loader2 } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getStaticGalleryImageUrl } from "@/lib/galleryImageSources";
import { useSmartLink } from "@/hooks/useSmartLink";
interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { handlePhoneClick } = useSmartLink();
  const luisPhone = "+1 (786) 350-6367";

  const [contactData, setContactData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    colors: "",
    service_type: "",
    specifics: [],
    paint_type: "",
    status: "",
    upload: null,
    special: "",
    budget: "",
    comments: "",
    vip: false,
  });

  type Errors = {
  submit?: string;
  [key: string]: string | undefined;
};

  const [errors, setErrors] = useState<Errors>({});

  const validateStepTwo = () => {
  let newErrors: any = {};
  const today = new Date().toISOString().split('T')[0];
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  const phoneRegex = /^[0-9\s\+\-\(\)]+$/;
  // Regex para validar email estándar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validación Nombre
  if (!contactData.name?.trim()) {
    newErrors.name = t("contact.errors.required");
  } else if (!nameRegex.test(contactData.name)) {
    newErrors.name = t("contact.errors.name_special");
  } else if (contactData.name.trim().length < 3) {
    newErrors.name = t("contact.errors.name");
  }

  // Validación Email (Gmail)
  if (!contactData.email?.trim()) {
    newErrors.email = t("contact.errors.required");
  } else if (!emailRegex.test(contactData.email)) {
    newErrors.email = t("contact.errors.gmail");
  }

  // Validación Teléfono
  if (!contactData.phone?.trim()) {
    newErrors.phone = t("contact.errors.required");
  } else if (!phoneRegex.test(contactData.phone)) {
    newErrors.phone = t("contact.errors.phone_numbers");
  }

  // Validación Dirección
  if (!contactData.address?.trim() || contactData.address.length < 10) {
    newErrors.address = t("contact.errors.address");
  }

  // Validación Fecha
  if (!contactData.date) {
    newErrors.date = t("contact.errors.required");
  } else if (contactData.date < today) {
    newErrors.date = t("contact.errors.date");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const validateStepThree = () => {
  let newErrors: any = {};

  if (!contactData.colors) {
    newErrors.colors = t("contact.errors.colors_required");
  }

  if (!contactData.service_type || contactData.service_type.length === 0) {
    newErrors.service_type = t("contact.errors.services_required");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

 const validateStepFor = () => {
  let newErrors: any = {};

  if (!contactData.status?.trim()) {
    newErrors.status = t("contact.errors.status_required");
  } else if (contactData.status.trim().length < 10) {
    newErrors.status = t("contact.errors.status_too_short");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const submitForm = async (data: any) => {
  try {
    setLoading(true);

    const formData = new FormData();
    
    // 1. Agregamos los campos de texto simples
    // Filtramos 'upload', 'service_type' y 'specifics' porque se manejan diferente
    Object.keys(data).forEach(key => {
      if (key !== 'upload' && key !== 'service_type' && key !== 'specifics') {
        // Aseguramos que si es null o undefined mande un string vacío
        formData.append(key, data[key] ?? "");
      }
    });

    // 2. Metemos los arrays de servicios y áreas específicas como JSON strings
    // Esto es para que el Router pueda hacer el JSON.parse correctamente
    formData.append('service_type', JSON.stringify(data.service_type || []));
    formData.append('specifics', JSON.stringify(data.specifics || []));

    // 3. ¡AQUÍ ESTÁ EL CAMBIO CLAVE PARA LAS FOTOS!
    // Como data.upload es un Array de Files, los recorremos uno por uno
    if (Array.isArray(data.upload)) {
      data.upload.forEach((file: File) => {
        // IMPORTANTE: La llave debe ser 'files' (en plural) para que el Router 
        // use formData.getAll("files") y pesque todas las fotos
        formData.append('files', file);
      });
    }

    // 4. Enviamos la petición
    const res = await fetch("/api/send", {
      method: "POST",
      body: formData, // El navegador configura el Content-Type: multipart/form-data automáticamente
    });

    const result = await res.json();
    
    if (!res.ok || !result.ok) {
      throw new Error(result.error || "Error al enviar el formulario");
    }

    return true;
  } catch (error) {
    console.error("Error en submitForm:", error);
    return false;
  } finally {
    setLoading(false);
  }
};

const handleSubmit = async () => {
  // Ejecutamos el envío
  const success = await submitForm(contactData);

  if (success) {
    // Solo si el servidor respondió ok, pasamos al mensaje de éxito
    setStep(6);
    
    // Opcional: Podrías hacer un scroll hacia arriba para que el mensaje de éxito se vea bien
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Si falló, el error ya se guarda en setErrors dentro de submitForm
    // podrías mostrar un toast o alert aquí
    alert("Hubo un problema al enviar. Por favor revisa los campos.");
  }
};

  const currentImage = getStaticGalleryImageUrl("exteriorAfter");
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
    
    <div className="absolute top-24 left-0 w-full flex justify-center z-50 pointer-events-none px-8">
      <div className="flex items-center w-full max-w-xl justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 md:w-9 md:h-9 rounded-full border transition-all duration-700 ease-in-out relative flex items-center justify-center overflow-hidden pointer-events-auto ${
                  step > i 
                    ? "bg-slate-950 border-slate-950 shadow-lg shadow-slate-200" 
                    : step === i
                    ? "border-primary-600 bg-white" 
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="relative h-full w-full flex items-center justify-center">
         
                  <span
                    className={`absolute font-sans font-black text-[10px] tracking-tighter transition-all duration-500 ${
                      step > i ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"
                    } ${step === i ? "text-primary-600" : "text-slate-300"}`}
                  >
                    0{i}
                  </span>

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
              <div className="flex-grow h-[1px] bg-slate-100 relative mx-2">
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
  
  <div className="fixed inset-0 w-full h-screen lg:relative lg:h-full flex items-center justify-between px-8 lg:px-20 animate-in fade-in duration-700 overflow-hidden bg-white">
    
    <div className="w-full lg:w-1/2 flex flex-col h-full pt-44 lg:pt-28 pb-12 px-1 lg:px-6 transition-all">
  
      <div className="max-w-[550px] mx-auto lg:mx-0 w-full">   
        
        <h1 className="font-display font-black text-4xl sm:text-4xl lg:text-5xl text-slate-950 leading-[0.95] uppercase tracking-tighter mb-9">
          {t("contact.header.title").split("preciso")[0]}
          <span className="text-primary-600 block">
            preciso.
          </span>
        </h1>
        
        <p className="font-sans text-sm lg:text-lg font-medium text-slate-600 leading-relaxed mb-8 md:mb-10">
          {t("contact.header.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="
              group relative overflow-hidden inline-flex items-center justify-center gap-3 
              bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] 
              shadow-xl shadow-slate-200 active:scale-95
              w-full sm:flex-[1.2] 
              h-[48px] px-6 text-[9px] rounded-2xl
              md:min-h-15 md:px-12 md:py-5 md:text-[10px] md:rounded-xl
            "
          >
            <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10">{t("contact.buttons.submit_btn")}</span>
            <ChevronRight className="relative z-10 transition-transform group-hover:translate-x-1" size={16} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex items-center justify-center
              bg-white border-2 border-slate-100 text-slate-400
              transition-all duration-300 font-black uppercase tracking-[0.2em] 
              active:scale-95
              w-full sm:flex-1
              h-[48px] px-6 text-[9px] rounded-2xl
              md:min-h-15 md:px-5 md:py-5 md:text-[10px] md:rounded-xl
              hover:text-slate-950 hover:border-slate-300
            "
          >
            {t("contact.buttons.close")}
          </button>
        </div>
      </div>
    </div>

    {/* Sección PC: Intacta */}
    <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-8">
      <div className="relative w-full max-w-[700px] aspect-[16/10] group">
        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-[0_35px_80px_-15px_rgba(0,0,0,0.15)] ring-1 ring-slate-100">
          <Image 
            src={currentImage}
            alt="Luisbety Exterior Portfolio" 
            fill 
            className="object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/5" />
        </div>
      </div>
    </div>
    
  </div>
)}

{step === 2 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent px-6 animate-in slide-in-from-bottom-6 duration-700">
    <div className="w-full max-w-[800px] flex flex-col items-center">
      
      {/* Título: oculto en móvil y visible en PC */}
      <div className="text-center mb-10 hidden lg:block">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_1.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
        {/* Array actualizado para incluir email */}
        {["name", "email", "phone", "address", "date"].map((field) => (
          <div 
            key={field} 
            className={`w-full space-y-1.5 ${
              field === "address" || field === "date" ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
              {/* Buscamos 'gmail' en el i18n si el campo es 'email' */}
              {t(`contact.steps.step_1.fields.${field === "email" ? "gmail" : field}`)}
            </label>
            
            <input
              type={field === "date" ? "date" : field === "email" ? "email" : "text"}
              name={field}
              value={contactData[field]}
              onChange={(e) => {
                const { value } = e.target;
                const cleanValue = field === "phone" ? value.replace(/[a-zA-Z]/g, "") : value;
                setContactData((prev: any) => ({ ...prev, [field]: cleanValue }));
                if (errors[field]) setErrors((prev: any) => {
                  const newErrs = {...prev};
                  delete newErrs[field];
                  return newErrs;
                });
              }}
              placeholder={
                field === "name" ? "Ej: Juan Pérez" :
                field === "email" ? "Ej: cliente@correo.com" :
                field === "phone" ? "Ej: +1 407 123 4567" :
                field === "address" ? "Ej: 123 Main St, Orlando" : ""
              }
              className={`w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 font-sans font-medium text-slate-900 text-[12px] lg:text-[15px] placeholder:text-slate-400 transition-all duration-500 ease-in-out outline-none ring-0 focus:ring-0 focus:outline-none ${
                errors[field] ? "border-red-500" : "border-slate-100 focus:border-primary-600"
              } ${
                field === "date" 
                  ? "min-h-[42px] cursor-pointer" 
                  : "appearance-none"
              }`}
              style={{ 
                boxShadow: 'none',
                WebkitAppearance: 'none'
              }}
            />

            {errors[field] && (
              <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pt-1 pl-1 animate-in fade-in slide-in-from-top-1 duration-300">
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-6 md:pt-10 justify-center items-center">
        <button
          type="button"
          onClick={() => {
            if (validateStepTwo()) setStep(3);
          }}
          className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-[1.5] md:min-h-15 md:px-12 md:py-5 md:text-[10px] md:rounded-xl"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10">{t("contact.buttons.next")}</span>
          <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="inline-flex items-center justify-center bg-white border-2 border-slate-100 text-slate-400 transition-all duration-300 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-1 md:min-h-15 md:px-5 md:py-5 md:text-[10px] md:rounded-xl hover:text-slate-950 hover:border-slate-300"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

{step === 3 && (
  <div className="w-full h-full flex flex-col items-center bg-transparent animate-in fade-in slide-in-from-bottom-6 duration-700">
    
    {/* Niebla Superior Adaptativa */}
    <div className="fixed top-[65px] left-0 w-full h-24 lg:h-28 bg-gradient-to-b from-white via-white to-transparent z-[40] pointer-events-none" />

    <div className="w-full max-w-[800px] px-6 pt-96 pb-10 lg:pt-44 overflow-y-auto scrollbar-hide flex flex-col items-center">
      
      <div className="text-center mb-10 hidden lg:block">
        <h2 className="font-display font-black text-3xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_2.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-y-10 w-full">
        
        {/* Campo: Colores (Validación añadida) */}
        <div className="w-full space-y-1.5 relative">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.colors")}
          </label>
          
          <div 
            onClick={() => setOpenSelect(openSelect === "colors" ? null : "colors")}
            className={`w-full p-2.5 bg-transparent border-b-2 flex items-center justify-between cursor-pointer group transition-all duration-300 ${
              errors.colors ? "border-red-500 bg-red-50/10" : "border-slate-100 hover:border-primary-600"
            }`}
          >
            <span className={`font-sans font-medium text-[12px] transition-colors ${contactData.colors ? "text-slate-900" : "text-slate-400"}`}>
              {contactData.colors || "Seleccionar..."}
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 ${openSelect === "colors" ? "rotate-180" : ""}`} />
          </div>
          {/* Texto de Error */}
          {errors.colors && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1 animate-in fade-in slide-in-from-left-1">{errors.colors}</p>}

          {openSelect === "colors" && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl z-[100] py-2">
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {(colorOptions || []).map((color) => (
                  <div 
                    key={color}
                    onClick={() => {
                      setContactData((prev: any) => ({ ...prev, colors: color }));
                      if (errors.colors) setErrors((prev: any) => ({ ...prev, colors: null }));
                      setOpenSelect(null);
                    }}
                    className="px-4 py-2.5 font-sans text-[12px] font-bold uppercase text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

       {/* Campo: Tipo de Servicio (Corregido a service_type) */}
<div className="w-full space-y-3">
  <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
    {t("contact.steps.step_2.fields.service_type")}
  </label>
  <div className={`flex flex-wrap items-center justify-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
    errors.service_type ? "border-red-500 bg-red-50/10" : "bg-slate-50/50 border-slate-100"
  }`}>
    {(t("contact.steps.step_2.options.services", { returnObjects: true }) as any[] || []).map((service) => (
      <label key={service.id} className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={(contactData.service_type || []).includes(service.id)} // <--- Corregido
          onChange={(e) => {
            const checked = e.target.checked;
            setContactData((prev: any) => {
              const current = prev.service_type || []; // <--- Corregido
              const updated = checked 
                ? [...current, service.id] 
                : current.filter((id: string) => id !== service.id);
              return { ...prev, service_type: updated }; // <--- Corregido
            });
            if (errors.service_type) setErrors((prev: any) => ({ ...prev, service_type: null }));
          }}
          className="w-4 h-4 rounded border-slate-300 text-primary-600 accent-primary-600 focus:ring-0"
        />
        <span className="font-sans font-bold text-[10px] lg:text-[11px] text-slate-400 uppercase tracking-tight group-hover:text-slate-600 transition-colors">
          {service.label}
        </span>
      </label>
    ))}
  </div>
  {errors.service_type && (
    <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">
      {errors.service_type}
    </p>
  )}
</div>

        {/* Campo: Específicos (Validación añadida) */}
        <div className="w-full space-y-3">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.specifics")}
          </label>
          
          <div className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
            errors.specifics ? "border-red-500 bg-red-50/10" : "bg-slate-50/50 border-slate-100"
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
              {Object.values(t("contact.steps.step_2.options.specifics", { returnObjects: true }) || {})
                .flat()
                .map((service: any) => (
                  <label key={service} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(contactData.specifics || []).includes(service)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setContactData((prev: any) => {
                          const current = prev.specifics || [];
                          const updated = checked ? [...current, service] : current.filter((v: string) => v !== service);
                          return { ...prev, specifics: updated };
                        });
                        if (errors.specifics) setErrors((prev: any) => ({ ...prev, specifics: null }));
                      }}
                      className="w-4 h-4 rounded border-slate-300 text-primary-600 accent-primary-600 focus:ring-0 transition-all group-hover:scale-110"
                    />
                    <span className="font-sans font-bold text-slate-400 text-[10px] lg:text-[11px] uppercase tracking-tight transition-colors group-hover:text-slate-600">
                      {service}
                    </span>
                  </label>
                ))}
            </div>
          </div>
          {errors.specifics && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">{errors.specifics}</p>}
        </div>

        {/* Campo: Tipo de Pintura */}
        <div className="w-full space-y-1.5">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.paint_type")}
          </label>
          <input
            type="text"
            name="paint_type"
            value={contactData.paint_type || ""}
            onChange={(e) => {
              setContactData((prev: any) => ({ ...prev, paint_type: e.target.value }));
              if (errors.paint_type) setErrors((prev: any) => ({ ...prev, paint_type: null }));
            }}
            placeholder="Ej: Mate, Satinado..."
            className={`w-full p-2.5 bg-transparent border-b-2 font-sans font-medium text-slate-900 text-[12px] lg:text-[15px] outline-none focus:border-primary-600 appearance-none shadow-none transition-all ${
              errors.paint_type ? "border-red-500" : "border-slate-100"
            }`}
          />
          {errors.paint_type && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">{errors.paint_type}</p>}
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button
          type="button"
          onClick={() => { if (validateStepThree()) setStep(4); }}
          className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-[1.5] md:px-12 md:py-5 md:text-[10px] md:rounded-xl"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10">{t("contact.buttons.next")}</span>
          <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="inline-flex items-center justify-center bg-white border-2 border-slate-100 text-slate-400 transition-all duration-300 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-1 md:px-5 md:py-5 md:text-[10px] md:rounded-xl hover:text-slate-950 hover:border-slate-300"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

{step === 4 && (
  <div className="w-full h-full flex flex-col items-center justify-center bg-transparent animate-in fade-in slide-in-from-bottom-6 duration-700 relative">
    
    {/* Contenedor Principal: Sin scroll y centrado */}
    <div className="w-full max-w-[800px] px-6 flex flex-col items-center justify-center">
      
      {/* Título: PC */}
      <div className="text-center mb-10 hidden lg:block">
        <h2 className="font-display font-black text-3xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_3.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-8 w-full">

        {/* Campo: Estado actual */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.status")}
          </label>
          <textarea
            name="status"
            value={contactData.status || ""}
            onChange={(e) => {
              setContactData((prev: any) => ({ ...prev, status: e.target.value }));
              if (errors.status) setErrors((prevErr: any) => ({ ...prevErr, status: null }));
            }}
            placeholder={t("contact.steps.step_3.placeholders.status")}
            className={`w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 font-sans font-medium text-slate-900 text-[12px] lg:text-[15px] transition-all duration-500 !outline-none !ring-0 resize-none h-[60px] placeholder:text-slate-400 ${
              errors.status ? "border-red-500" : "border-slate-100 focus:border-primary-600"
            }`}
          />
          {errors.status && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">{errors.status}</p>}
        </div>

     {/* Campo: Subir Fotos - Adaptado para envío múltiple por FormData */}
<div className="flex flex-col gap-1.5 h-auto min-h-[140px]">
  <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
    {t("contact.steps.step_3.fields.upload")}
  </label>
  
  <div className={`relative flex flex-col gap-3 border-2 border-dashed rounded-2xl p-4 transition-all bg-slate-50/30 ${
    errors.upload ? "border-red-500" : "border-slate-100 hover:border-primary-600"
  }`}>
    
    <div className="relative shrink-0">
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          const validImages = files.filter(file => file.type.startsWith('image/'));

          if (validImages.length !== files.length) {
            setErrors((prev: any) => ({ ...prev, upload: t("contact.errors.only_images") }));
          } else {
            setErrors((prev: any) => ({ ...prev, upload: null }));
            setContactData((prev: any) => {
              // IMPORTANTE: Aseguramos que 'upload' siempre sea un array
              const currentFiles = Array.isArray(prev.upload) ? prev.upload : [];
              return { 
                ...prev, 
                upload: [...currentFiles, ...validImages] 
              };
            });
          }
          // Limpiar el valor del input para permitir subir la misma foto si se borró
          e.target.value = "";
        }} 
        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
      />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50 shrink-0">
          <Plus size={16} className="text-primary-600" />
        </div>
        <p className="font-sans font-medium text-slate-400 text-[9px] uppercase tracking-widest text-left leading-tight">
          {contactData.upload?.length > 0 
            ? `${contactData.upload.length} fotos seleccionadas` 
            : "Arrastra o haz clic aquí"}
        </p>
      </div>
    </div>

    {/* Lista de archivos con Miniatura Real */}
    {contactData.upload && contactData.upload.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2 max-h-[120px] overflow-y-auto scrollbar-hide pt-2 border-t border-slate-100/50">
        {contactData.upload.map((file: File, index: number) => {
          // Crear URL temporal para la miniatura
          const previewUrl = URL.createObjectURL(file);
          
          return (
            <div key={`${file.name}-${index}`} className="group relative flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-100 shadow-sm transition-all hover:border-primary-200">
              {/* Miniatura */}
              <div className="w-6 h-6 rounded bg-slate-100 overflow-hidden shrink-0">
                <img 
                  src={previewUrl} 
                  alt="preview" 
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(previewUrl)} // Liberar memoria
                />
              </div>
              
              <span className="font-sans text-[8px] font-bold text-slate-600 uppercase truncate max-w-[70px]">
                {file.name}
              </span>

              <button
                type="button"
                onClick={() => {
                  setContactData((prev: any) => ({
                    ...prev,
                    upload: prev.upload.filter((_: any, i: number) => i !== index)
                  }));
                }}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                <X size={8} />
              </button>
            </div>
          );
        })}
      </div>
    )}
  </div>
  {errors.upload && (
    <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">
      {errors.upload}
    </p>
  )}
</div>
        {/* Campo: Notas especiales */}
        <div className="flex flex-col gap-1.5 pb-4">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.special")}
          </label>
          <input
            type="text"
            name="special"
            value={contactData.special || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, special: e.target.value }))}
            placeholder={t("contact.steps.step_3.placeholders.special")}
            className="w-full p-2.5 bg-transparent border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-[12px] lg:text-[15px] outline-none focus:outline-none focus:ring-0 focus:border-primary-600"
          />
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-6 justify-center items-center">
        <button
          type="button"
          onClick={() => { if (validateStepFor()) setStep(5); }}
          className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[45px] lg:h-[50px] px-6 text-[9px] rounded-2xl md:flex-[1.5] md:text-[10px] md:rounded-xl"
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10">{t("contact.buttons.next")}</span>
          <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className="inline-flex items-center justify-center bg-white border-2 border-slate-100 text-slate-400 transition-all duration-300 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[45px] lg:h-[50px] px-6 text-[9px] rounded-2xl md:flex-1 md:text-[10px] md:rounded-xl hover:text-slate-950 hover:border-slate-300"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}

{step === 5 && (
  <div className="w-full flex flex-col items-center bg-transparent animate-in fade-in slide-in-from-bottom-6 duration-700">
    
    {/* Contenedor SIN Scroll: Eliminamos h-full y overflow-y-auto */}
    <div className="w-full max-w-[800px] px-6 pt-16 pb-10 lg:pt-0 flex flex-col items-center">
      
      {/* TÍTULO: Solo visible en PC */}
      <div className="text-center mb-10 hidden lg:block">
        <h2 className="font-display font-black text-3xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_4.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6 w-full">

        {/* CUSTOM SELECT: RANGO DE INVERSIÓN */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.budget")}
          </label>

          <div
            onClick={() => setOpenSelect(openSelect === "budget" ? null : "budget")}
            className="w-full p-2.5 bg-transparent border-b-2 border-slate-100 flex items-center justify-between cursor-pointer group transition-all duration-300 hover:border-primary-600"
          >
            <span className={`font-sans font-medium text-[13px] transition-colors ${contactData.budget ? "text-slate-900" : "text-slate-400"}`}>
              {contactData.budget || "Seleccionar rango..."}
            </span>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-500 ease-out ${openSelect === "budget" ? "rotate-180 text-primary-600" : "rotate-0"}`}
            />
          </div>

          {openSelect === "budget" && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {(() => {
                  const raw = t("contact.steps.step_4.ranges", { returnObjects: true });
                  const ranges = typeof raw === "object" && raw !== null ? (raw as Record<string, { label: string }>) : {};

                  return Object.entries(ranges).map(([key, value]) => (
                    <div
                      key={key}
                      onClick={() => {
                        setContactData((prev: any) => ({ ...prev, budget: value.label }));
                        setOpenSelect(null);
                      }}
                      className="px-4 py-2.5 font-sans text-[11px] lg:text-[13px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      {value.label}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_4.fields.comments")}
          </label>

          <textarea
            name="comments"
            value={contactData.comments || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, comments: e.target.value }))}
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-[12px] lg:text-[13px] transition-all duration-500 !outline-none !ring-0 focus:border-primary-600 resize-none h-[70px] placeholder:text-slate-400 shadow-none appearance-none"
            placeholder="¿Algo más que debamos saber?"
          />
        </div>

        {/* VIP CHECKBOX */}
        <div className="pt-2">
          <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer group hover:border-yellow-400 transition-all">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={contactData.vip || false}
                onChange={(e) => setContactData((prev: any) => ({ ...prev, vip: e.target.checked }))}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-yellow-400 checked:bg-yellow-400 transition-all"
              />
              <Star size={10} className="absolute text-white opacity-0 peer-checked:opacity-100" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans font-black text-[9px] lg:text-[10px]  uppercase tracking-widest text-slate-950 group-hover:text-yellow-400 transition-colors">
                {t("contact.steps.step_4.fields.vip_label")}
              </span>
              <p className="font-sans font-medium text-slate-500 text-[9px] lg:text-[10px] leading-relaxed uppercase tracking-tight">
                {t("contact.steps.step_4.fields.vip_text")}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* NAV: Con pt-6 para que quepa bien sin scroll en pantallas pequeñas */}
      <div className="flex flex-col md:flex-row gap-4 w-full pt-6 md:pt-10 justify-center items-center">
       <button
  type="button"
  disabled={loading} // Evita múltiples clics mientras envía
  onClick={handleSubmit} // <--- Llamamos a la lógica de envío
  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-[1.5] md:min-h-15 md:px-12 md:py-5 md:text-[10px] md:rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
>
  <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
  
  {loading ? (
    <span className="relative z-10 flex items-center gap-2">
      <Loader2 size={14} className="animate-spin" /> {/* Necesitas importar Loader2 de lucide-react */}
      Enviando...
    </span>
  ) : (
    <>
      <span className="relative z-10">Finalizar estimado</span>
      <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
    </>
  )}
</button>

        <button
          type="button"
          onClick={() => setStep(4)}
          className="inline-flex items-center justify-center bg-white border-2 border-slate-100 text-slate-400 transition-all duration-300 font-black uppercase tracking-[0.2em] active:scale-95 w-full h-[40px] lg:h-[48px] px-6 text-[9px] rounded-2xl md:flex-1 md:min-h-15 md:px-5 md:py-5 md:text-[10px] md:rounded-xl hover:text-slate-950 hover:border-slate-300"
        >
          {t("contact.buttons.prev")}
        </button>
      </div>
    </div>
  </div>
)}  

{step === 6 && (
  /* Mantenemos el fixed inset-0 y h-screen para asegurar el área total */
  <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center bg-white px-8 animate-in fade-in zoom-in-95 duration-700 overflow-hidden text-center">
    
    {/* 
      Ajuste: Eliminamos el pt-44 en pantallas grandes (lg:pt-0) 
      y nos aseguramos de que el contenedor fluya desde el centro (justify-center)
    */}
    <div className="w-full max-w-[800px] flex flex-col items-center justify-center pt-44 lg:scroll-pt-48">

      {/* BLOQUE DE TEXTO */}
      <div className="space-y-6 mb-12">
        <h2 className="font-display font-black text-4xl lg:text-5xl leading-[0.95] uppercase tracking-tighter text-slate-950">
          {t("contact.success.title")}
        </h2>
        
        <div className="h-[3px] w-12 bg-primary-600 mx-auto rounded-full" />
        
        <p className="font-sans text-sm lg:text-lg font-medium text-slate-600 leading-relaxed max-w-[460px] mx-auto">
          {t("contact.success.message")}
        </p>
      </div>

      {/* ACCIONES */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[460px]">
        
        <button 
          type="button" 
          onClick={onClose} 
          className="
            group relative overflow-hidden inline-flex items-center justify-center gap-3 
            bg-slate-950 text-white transition-all duration-500 font-black uppercase tracking-[0.2em] 
            shadow-xl shadow-slate-200 active:scale-95
            w-full h-[48px] px-6 text-[9px] rounded-2xl
            md:flex-[1.2] md:h-[54px] md:px-12 md:text-[10px] md:rounded-xl
          "
        >
          <div className="absolute inset-0 translate-y-full bg-primary-600 transition-transform duration-500 group-hover:translate-y-0" />
          <span className="relative z-10">
            {t("contact.success.close")}
          </span>
          <ChevronRight className="relative z-10 transition-transform group-hover:translate-x-1" size={16} />
        </button>

        <a 
          href={`tel:${luisPhone.replace(/\D/g, "")}`}
          onClick={handlePhoneClick(luisPhone)}
          className="
            inline-flex items-center justify-center
            bg-primary-600 border-primary-600 text-slate-100 transition-all duration-300 font-black uppercase tracking-[0.2em] 
            active:scale-95 text-center
            w-full h-[48px] px-6 text-[9px] rounded-2xl
            md:flex-1 md:h-[54px] md:px-5 md:text-[10px] md:rounded-xl
          hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] active:scale-95 focus:outline-none group 
          "
        >
          <span>{luisPhone}</span>
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