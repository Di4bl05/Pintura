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
  const [loading, setLoading] = useState(false);

  const [contactData, setContactData] = useState<any>({
    name: "",
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

    if (!contactData.name?.trim()) {
      newErrors.name = t("contact.errors.required");
    } else if (!nameRegex.test(contactData.name)) {
      newErrors.name = t("contact.errors.name_special");
    } else if (contactData.name.trim().length < 3) {
      newErrors.name = t("contact.errors.name");
    }

    if (!contactData.phone?.trim()) {
      newErrors.phone = t("contact.errors.required");
    } else if (!phoneRegex.test(contactData.phone)) {
      newErrors.phone = t("contact.errors.phone_numbers");
    }

    if (!contactData.address?.trim() || contactData.address.length < 10) {
      newErrors.address = t("contact.errors.address");
    }

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

  if (!contactData.main_services || contactData.main_services.length === 0) {
    newErrors.main_services = t("contact.errors.services_required");
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

 const submitForm = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "Error sending form");
    }

    return true; 
  } catch (error) {
    console.error(error);

    setErrors((prev) => ({
      ...prev,
      submit: "Error enviando el formulario",
    }));

    return false; 
  } finally {
    setLoading(false);
  }
};

const handleSubmit = async () => {
  const success = await submitForm();

  if (success) {
    setStep(6); 
  }
};

  const currentImage = "/images/gallery/exterior-despues.webp";
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
    
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <div className="max-w-[500px]"> 
        
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6">
          <Star className="text-primary-600 fill-primary-600" size={8} />
          <span className="font-sans font-black text-[8px] tracking-[0.15em] text-slate-900 uppercase">
            {t("contact.header.subtitle")}
          </span>
        </div>
        
        <h1 className="font-display font-black text-4xl lg:text-5xl text-slate-950 leading-[0.95] uppercase tracking-tighter mb-6">
          {t("contact.header.title").split("preciso")[0]}
          <span className="text-primary-600 block">
            preciso.
          </span>
        </h1>
        
        <p className="font-sans text-sm lg:text-base font-medium text-slate-500 leading-relaxed mb-10 max-w-[450px] border-l-2 border-primary-600 pl-6">
          {t("contact.header.description")}
        </p>

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
                <div className="text-center mb-10">
                  <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
                    {t("contact.steps.step_1.title")}
                  </h2>
                  <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
                </div>

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
                          field === "phone" ? "Ej: +1 555 123 4567" :
                          field === "address" ? "Ej: 123 Main St, Orlando" : ""
                        }
                        className={`w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-500 ease-in-out appearance-none outline-none ring-0 focus:outline-none focus:shadow-none ${
                          errors[field] ? "border-red-500" : "border-slate-100 focus:border-primary-600"
                        }`}
                        style={{ boxShadow: 'none' }}
                      />
                      {errors[field] && (
                        <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pt-1 pl-1 animate-in fade-in slide-in-from-top-1 duration-300">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStepTwo()) setStep(3);
                    }}
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
  
      <div className="text-center mb-3">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl leading-[1.1] uppercase tracking-tighter text-slate-950">
          {t("contact.steps.step_2.title")}
        </h2>
        <div className="h-1 w-12 bg-primary-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-y-4 w-full">
        
        <div className="w-full space-y-1.5 relative">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.colors")}
          </label>
          
          <div 
            onClick={() => setOpenSelect(openSelect === "colors" ? null : "colors")}
            className={`w-full p-2.5 bg-transparent border-b-2 flex items-center justify-between cursor-pointer group transition-all duration-300 ${
              errors.colors ? "border-red-500" : "border-slate-100 hover:border-primary-600"
            }`}
          >
            <span className={`font-sans font-medium text-sm transition-colors ${contactData.colors ? "text-slate-900" : "text-slate-400"}`}>
              {contactData.colors || "Seleccionar..."}
            </span>
            <ChevronDown 
              size={14} 
              className={`text-slate-400 transition-transform duration-500 ease-out ${openSelect === "colors" ? "rotate-180 text-primary-600" : "rotate-0"}`} 
            />
          </div>

          {errors.colors && (
            <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1 animate-in fade-in duration-300">
              {errors.colors}
            </p>
          )}

          {openSelect === "colors" && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {(colorOptions || []).map((color) => (
                  <div 
                    key={color}
                    onClick={() => {
                      setContactData((prev: any) => ({ ...prev, colors: color }));
                      setOpenSelect(null);
                    
                      if (errors.colors) setErrors((prev: any) => {
                        const newErrs = {...prev};
                        delete newErrs.colors;
                        return newErrs;
                      });
                    }}
                    className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.service_type")}
          </label>
          <div className={`flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-300 ${
            errors.main_services ? "border-red-500 bg-red-50/10" : "bg-slate-50/50 border-slate-100"
          }`}>
            {(t("contact.steps.step_2.options.services", { returnObjects: true }) as any[] || []).map((service) => (
              <label key={service.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(contactData.main_services || []).includes(service.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setContactData((prev: any) => {
                      const current = prev.main_services || [];
                      const updated = checked 
                        ? [...current, service.id] 
                        : current.filter((id: string) => id !== service.id);
 
                      if (updated.length > 0 && errors.main_services) {
                        setErrors((prevErr: any) => {
                          const newErrs = {...prevErr};
                          delete newErrs.main_services;
                          return newErrs;
                        });
                      }
                      return { ...prev, main_services: updated };
                    });
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 accent-primary-600 focus:ring-0 cursor-pointer"
                />
                <span className="font-sans font-black text-[9px] text-slate-400 group-hover:text-slate-950 transition-colors uppercase tracking-widest whitespace-nowrap">
                  {service.label}
                </span>
              </label>
            ))}
          </div>
         
          {errors.main_services && (
            <p className="text-[10px] text-red-500 font-black uppercase pl-1 animate-in fade-in duration-300">
              {errors.main_services}
            </p>
          )}
        </div>

        <div className="w-full space-y-3">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.specifics")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        return { 
                          ...prev, 
                          specifics: checked 
                            ? [...current, service] 
                            : current.filter((v: string) => v !== service) 
                        };
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

        <div className="w-full space-y-1">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_2.fields.paint_type")}
          </label>
          <input
            type="text"
            name="paint_type"
            value={contactData.paint_type || ""}
            onChange={(e) => setContactData((prev: any) => ({ ...prev, paint_type: e.target.value }))}
            placeholder="Ej: Mate, Satinado, Sherwin-Williams..."
            className="w-full p-2 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-300 outline-none focus:outline-none focus:ring-0 focus:border-primary-600 shadow-none"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button
          type="button"
          onClick={() => {
            
            if (validateStepThree()) setStep(4);
          }}
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
            onChange={(e) => {
              setContactData((prev: any) => ({ ...prev, status: e.target.value }));
              if (errors.status) setErrors((prevErr: any) => ({ ...prevErr, status: null }));
            }}
            placeholder={t("contact.steps.step_3.placeholders.status")}
            className={`w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 font-sans font-medium text-slate-900 text-sm transition-all duration-500 !outline-none !ring-0 resize-none h-[60px] placeholder:text-slate-400 ${
              errors.status ? "border-red-500" : "border-slate-100 focus:border-primary-600"
            }`}
          />
          {errors.status && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">{errors.status}</p>}
        </div>

          <div className="flex flex-col gap-1.5 h-[160px]">
          <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
            {t("contact.steps.step_3.fields.upload")}
          </label>
          
          <div className={`relative flex flex-col gap-3 h-full overflow-hidden border-2 border-dashed rounded-2xl p-4 transition-all bg-slate-50/30 ${
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
                    setContactData((prev: any) => ({ 
                      ...prev, 
                      upload: prev.upload ? [...prev.upload, ...validImages] : validImages 
                    }));
                  }
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

            {contactData.upload && contactData.upload.length > 0 && (
              <div className="flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide">
                {Array.from(contactData.upload as File[]).map((file, index) => (
                  <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-white/80 p-2 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-left-2">
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
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.upload && <p className="text-[10px] text-red-500 font-black uppercase pt-1 pl-1">{errors.upload}</p>}
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
            className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-500 !outline-none !ring-0 focus:border-primary-600 shadow-none"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
        <button 
          type="button" 
          onClick={() => {
            if (validateStepFor()) setStep(5);
          }} 
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
          onClick={() => setStep(3)} 
          className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 hover:border-slate-400 transition-all"
        >
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

        {openSelect === "budget" && (
          <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">

              {/* 🔥 FIX REAL: validación runtime */}
              {(() => {
                const raw = t("contact.steps.step_4.ranges", { returnObjects: true });

                const ranges =
                  typeof raw === "object" && raw !== null
                    ? (raw as Record<string, { label: string }>)
                    : {};

                return Object.entries(ranges).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => {
                      setContactData((prev: any) => ({
                        ...prev,
                        budget: value.label
                      }));
                      setOpenSelect(null);
                    }}
                    className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-tight text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
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
        <label className="font-sans text-[9px] font-black tracking-[0.15em] uppercase text-slate-950 pl-1">
          {t("contact.steps.step_4.fields.comments")}
        </label>

        <textarea
          name="comments"
          value={contactData.comments || ""}
          onChange={(e) =>
            setContactData((prev: any) => ({ ...prev, comments: e.target.value }))
          }
          className="w-full p-2.5 bg-transparent border-t-0 border-x-0 border-b-2 border-slate-100 font-sans font-medium text-slate-900 text-sm transition-all duration-500 !outline-none !ring-0 focus:border-primary-600 resize-none h-[70px] placeholder:text-slate-400 shadow-none"
          placeholder="¿Algo más que debamos saber?"
        />
      </div>

      {/* VIP */}
      <div className="pt-2">
        <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer group hover:border-primary-600 transition-all">
          <div className="relative flex items-center justify-center mt-1">
            <input
              type="checkbox"
              checked={contactData.vip || false}
              onChange={(e) =>
                setContactData((prev: any) => ({
                  ...prev,
                  vip: e.target.checked
                }))
              }
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-primary-600 checked:bg-primary-600 transition-all"
            />
            <Star size={10} className="absolute text-white opacity-0 peer-checked:opacity-100" />
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

    {/* NAV */}
    <div className="flex flex-col md:flex-row gap-4 w-full pt-10 justify-center items-center">
      <button
        type="button"
        onClick={() => setStep(6)}
        className="group relative w-full md:flex-[1.5] overflow-hidden flex items-center justify-between p-4 rounded-xl bg-slate-950 text-white"
      >
        <span className="relative z-10 font-sans font-black text-[10px] uppercase">
          Finalizar estimado
        </span>
      </button>

      <button
        type="button"
        onClick={() => setStep(4)}
        className="w-full md:flex-1 p-4 rounded-xl border border-slate-200 font-sans text-[9px] font-black uppercase text-slate-400"
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