"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
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

      <div className={`flex h-full w-full pt-32 bg-white ${step >= 2 ? "justify-center" : ""}`}>
        <div
          className={`h-full flex flex-col justify-center pb-10 bg-white transition-all duration-500 ${
            step >= 2 ? "w-full max-w-[720px] px-6 lg:px-12 mx-auto" : "w-full lg:w-1/2 px-8 lg:px-24"
          }`}
        >
          <div className="max-w-[600px] animate-in slide-in-from-left-6 duration-700">
            {step === 1 && (
              <div className="flex flex-col items-start space-y-6">
                <h2 className="text-4xl font-black text-slate-950">{t("contact.steps.step_0.title")}</h2>
                <p className="text-sm text-slate-700">{t("contact.steps.step_0.description")}</p>
                <button
                  onClick={() => setStep(2)}
                  className="mt-4 p-3 rounded-2xl bg-primary-600 text-white font-black uppercase"
                >
                  {t("contact.buttons.next")}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-8 flex flex-col items-center w-full max-w-[720px] space-y-4">
                <h2 className="text-center font-display font-black text-3xl lg:text-4xl leading-[1.1] uppercase tracking-tighter mb-4">
                  <span className="text-slate-950">
                    {t("contact.steps.step_1.title").split(" ")[0]}{" "}
                  </span>
                  <span className="text-primary-600">
                    {t("contact.steps.step_1.title").split(" ").slice(1).join(" ")}
                  </span>
                </h2>
                {["name", "phone", "address", "date"].map((field) => (
                  <div key={field} className="w-full space-y-1.5">
                    <label className="font-sans text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">
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
                      className="w-full p-3 rounded-2xl border border-slate-200 outline-none font-sans text-sm transition-all duration-300 shadow-sm focus:shadow-lg focus:scale-[1.02] focus:border-primary-600"
                    />
                  </div>
                ))}
                <div className="flex gap-3 w-full pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full p-3 rounded-2xl border border-slate-200 font-sans text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 hover:bg-slate-50"
                  >
                    {t("contact.buttons.prev")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="group relative w-full overflow-hidden flex items-center justify-between p-3 rounded-2xl bg-slate-950 text-white transition-all duration-500 hover:scale-[1.02] shadow-lg"
                  >
                    <span className="font-sans font-black text-[10px] tracking-[0.15em] uppercase">{t("contact.buttons.next")}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 flex flex-col items-center w-full max-w-[720px] space-y-4">
                <h2 className="text-center font-display font-black text-3xl lg:text-4xl leading-[1.1] uppercase tracking-tighter mb-4 mt-6 lg:mt-7">
                  {t("contact.steps.step_2.title")}
                </h2>
                <div className="w-full space-y-1.5">
                  <label className="font-sans text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">
                    {t("contact.steps.step_2.fields.service_type")}
                  </label>
                  <select
                    name="service_type"
                    value={contactData.service_type || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, service_type: e.target.value }))}
                    className="w-full p-3 rounded-2xl border border-slate-200 outline-none font-sans text-sm transition-all duration-300 shadow-sm focus:shadow-lg focus:scale-[1.02] focus:border-primary-600"
                  >
                    <option value="">{t("contact.select_option")}</option>
                    {Object.entries(t("contact.steps.step_2.options.service_type")).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full space-y-1.5">
                  <label className="font-sans text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">
                    {t("contact.steps.step_2.fields.specifics")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[...t("contact.steps.step_2.options.specifics.exterior"),
                      ...t("contact.steps.step_2.options.specifics.interior"),
                      ...t("contact.steps.step_2.options.specifics.pro")].map((service: string) => (
                      <label key={service} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          value={service}
                          checked={(contactData.specifics || []).includes(service)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setContactData((prev: any) => {
                              const current = prev.specifics || [];
                              return {
                                ...prev,
                                specifics: checked ? [...current, service] : current.filter((v) => v !== service)
                              };
                            });
                          }}
                          className="accent-primary-600"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="w-full space-y-1.5">
                  <label className="font-sans text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">
                    {t("contact.steps.step_2.fields.colors")}
                  </label>
                  <select
                    name="colors"
                    value={contactData.colors || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, colors: e.target.value }))}
                    className="w-full p-3 rounded-2xl border border-slate-200 outline-none font-sans text-sm transition-all duration-300 shadow-sm focus:shadow-lg focus:scale-[1.02] focus:border-primary-600"
                  >
                    <option value="">{t("contact.select_option")}</option>
                    {t("contact.steps.step_2.options.colors").map((color: string) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full space-y-1.5">
                  <label className="font-sans text-[10px] font-black tracking-[0.1em] uppercase text-slate-400">
                    {t("contact.steps.step_2.fields.paint_type")}
                  </label>
                  <input
                    type="text"
                    name="paint_type"
                    value={contactData.paint_type || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, paint_type: e.target.value }))}
                    placeholder="Ej: Mate, Satinado, Sherwin-Williams..."
                    className="w-full p-3 rounded-2xl border border-slate-200 outline-none font-sans text-sm transition-all duration-300 shadow-sm focus:shadow-lg focus:scale-[1.02] focus:border-primary-600"
                  />
                </div>

                <div className="flex gap-3 w-full pt-3">
                  <button type="button" onClick={() => setStep(2)}
                    className="w-full p-3 rounded-2xl border border-slate-200 font-sans text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 hover:bg-slate-50">
                    {t("contact.buttons.prev")}
                  </button>
                  <button type="button" onClick={() => setStep(4)}
                    className="group relative w-full overflow-hidden flex items-center justify-between p-3 rounded-2xl bg-slate-950 text-white transition-all duration-500 hover:scale-[1.02] shadow-lg">
                    <span className="font-sans font-black text-[10px] tracking-[0.15em] uppercase">{t("contact.buttons.next")}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mt-12 w-full max-w-[720px] mx-auto flex flex-col gap-8">
                <h2 className="text-center font-display font-black text-4xl leading-tight uppercase tracking-tight">
                  {t("contact.steps.step_3.title")}
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 font-black text-[10px] uppercase tracking-wide">
                    {t("contact.steps.step_3.fields.status")}
                  </label>
                  <textarea
                    name="status"
                    value={contactData.status || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, status: e.target.value }))}
                    placeholder={t("contact.steps.step_3.placeholders.status")}
                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none text-sm shadow-sm focus:shadow-lg focus:border-primary-600 resize-none h-[120px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 font-black text-[10px] uppercase tracking-wide">
                    {t("contact.steps.step_3.fields.upload")}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setContactData((prev) => ({ ...prev, upload: e.target.files }))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center transition-colors duration-300 hover:border-primary-600 cursor-pointer">
                      <p className="text-slate-400 text-sm">Arrastra tus archivos aquí o haz clic para seleccionar</p>
                    </div>
                  </div>

                  {contactData.upload && contactData.upload.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm text-slate-700 max-h-48 overflow-y-auto">
                      {Array.from(contactData.upload).map((file: File, idx: number) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 font-black text-[10px] uppercase tracking-wide">
                    {t("contact.steps.step_3.fields.special")}
                  </label>
                  <input
                    type="text"
                    name="special"
                    value={contactData.special || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, special: e.target.value }))}
                    placeholder={t("contact.steps.step_3.placeholders.special")}
                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none text-sm shadow-sm focus:shadow-lg focus:border-primary-600"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep(3)}
                    className="w-full p-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-wide hover:bg-slate-50">
                    {t("contact.buttons.prev")}
                  </button>
                  <button type="button" onClick={() => setStep(5)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950 text-white font-black text-[10px] uppercase tracking-wide shadow-lg hover:scale-[1.02] transition-all">
                    <span>{t("contact.buttons.next")}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="mt-12 w-full max-w-[720px] mx-auto flex flex-col gap-8">
                <h2 className="text-center font-display font-black text-4xl leading-tight uppercase tracking-tight">
                  {t("contact.steps.step_4.title")}
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 font-black text-[10px] uppercase tracking-wide">
                    {t("contact.steps.step_4.fields.budget")}
                  </label>
                  <select
                    name="budget"
                    value={contactData.budget || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, budget: e.target.value }))}
                    className="w-full p-3 rounded-2xl border border-slate-200 outline-none font-sans text-sm shadow-sm focus:shadow-lg focus:border-primary-600"
                  >
                    <option value="">{t("contact.select_option")}</option>
                    <option value="low">{t("contact.steps.step_4.ranges.low")}</option>
                    <option value="mid">{t("contact.steps.step_4.ranges.mid")}</option>
                    <option value="high">{t("contact.steps.step_4.ranges.high")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 font-black text-[10px] uppercase tracking-wide">
                    {t("contact.steps.step_4.fields.comments")}
                  </label>
                  <textarea
                    name="comments"
                    value={contactData.comments || ""}
                    onChange={(e) => setContactData((prev) => ({ ...prev, comments: e.target.value }))}
                    placeholder={t("contact.steps.step_4.placeholders.comments")}
                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none text-sm shadow-sm focus:shadow-lg focus:border-primary-600 resize-none h-[120px]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={contactData.vip}
                    onChange={(e) => setContactData((prev) => ({ ...prev, vip: e.target.checked }))}
                    className="accent-primary-600"
                  />
                  <span className="text-sm text-slate-700 font-black uppercase tracking-wide">{t("contact.steps.step_4.vip")}</span>
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep(4)}
                    className="w-full p-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-wide hover:bg-slate-50">
                    {t("contact.buttons.prev")}
                  </button>
                  <button type="button" onClick={() => setStep(6)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950 text-white font-black text-[10px] uppercase tracking-wide shadow-lg hover:scale-[1.02] transition-all">
                    <span>{t("contact.buttons.submit")}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="mt-12 w-full max-w-[720px] mx-auto flex flex-col items-center gap-6 text-center">
                <h2 className="text-4xl font-black text-slate-950 uppercase">{t("contact.success.title")}</h2>
                <p className="text-sm text-slate-700">{t("contact.success.message")}</p>
                <button
                  onClick={onClose}
                  className="mt-6 p-4 w-full max-w-xs rounded-2xl bg-primary-600 text-white font-black uppercase tracking-wide shadow-lg hover:scale-[1.02] transition-all"
                >
                  {t("contact.success.close")}
                </button>
                <button
                  onClick={() => window.location.href = "tel:+15551234567"}
                  className="mt-2 p-4 w-full max-w-xs rounded-2xl bg-yellow-500 text-white font-black uppercase tracking-wide shadow-lg hover:scale-[1.02] transition-all"
                >
                  {t("contact.success.call_btn")}
                </button>
              </div>
            )}
          </div>
        </div>

        {step === 1 && (
          <div className="hidden lg:flex w-1/2 h-full bg-white items-center justify-center p-16">
            <div className="relative w-full h-[85%] max-h-[700px] group">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] ring-1 ring-slate-100">
                <Image src={currentImage} alt="Preview" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;