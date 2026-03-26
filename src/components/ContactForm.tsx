"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    projectSize: "",
    preferredDate: "",
    timeframe: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío mantenida íntegra
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "", email: "", phone: "", address: "", serviceType: "",
        projectSize: "", preferredDate: "", timeframe: "", budget: "", message: "",
      });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Elemento Decorativo de Fondo */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full -z-10" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
        {/* Header Unificado */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.05]">
            {t("contact.title")}{" "}
            <span className="text-blue-600 italic font-bold">{t("contact.titleHighlight")}</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <a href="tel:+17863506367" className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 tracking-wide">{t("contact.info.phone")}</p>
                  <p className="text-sm md:text-base font-semibold text-slate-900">(786) 350-6367</p>
                </div>
              </div>
            </a>

            <a href="mailto:contact@luisbety.com" className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 tracking-wide">Email</p>
                  <p className="text-sm md:text-base font-semibold text-slate-900">contact@luisbety.com</p>
                </div>
              </div>
            </a>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 tracking-wide">{t("contact.info.address")}</p>
                  <p className="text-sm md:text-base font-semibold text-slate-900 leading-tight">Longwood, FL</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 tracking-wide">{t("contact.info.hours")}</p>
                  <p className="text-sm md:text-base font-semibold text-slate-900 leading-tight">{t("contact.info.hoursText")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario - Estilo Limpio y Robusto */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs con estilo unificado */}
                {[
                  { id: "name", label: t("contact.form.name"), type: "text", placeholder: t("contact.form.namePlaceholder") },
                  { id: "email", label: t("contact.form.email"), type: "email", placeholder: t("contact.form.emailPlaceholder") },
                  { id: "phone", label: t("contact.form.phone"), type: "tel", placeholder: t("contact.form.phonePlaceholder") }
                ].map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                      {input.label} *
                    </label>
                    <input
                      type={input.type}
                      id={input.id}
                      name={input.id}
                      required
                      value={(formData as any)[input.id]}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-normal text-slate-800"
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                    {t("contact.form.serviceType")} *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-normal text-slate-800 appearance-none"
                  >
                    <option value="">{t("contact.form.selectService")}</option>
                    <option value="interior">{t("contact.form.services.interior")}</option>
                    <option value="exterior">{t("contact.form.services.exterior")}</option>
                    <option value="commercial">{t("contact.form.services.commercial")}</option>
                    <option value="cabinet">{t("contact.form.services.cabinet")}</option>
                    <option value="deck">{t("contact.form.services.deck")}</option>
                    <option value="other">{t("contact.form.services.other")}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                    {t("contact.form.address")} *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-normal text-slate-800"
                    placeholder={t("contact.form.addressPlaceholder")}
                  />
                </div>

                {/* Grid secundario para selects pequeños */}
                <div>
                  <label htmlFor="projectSize" className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                    {t("contact.form.projectSize")}
                  </label>
                  <select id="projectSize" name="projectSize" value={formData.projectSize} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 transition-all outline-none font-normal text-slate-800">
                    <option value="">{t("contact.form.select")}</option>
                    <option value="small">{t("contact.form.size.small")}</option>
                    <option value="medium">{t("contact.form.size.medium")}</option>
                    <option value="large">{t("contact.form.size.large")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                    {t("contact.form.budget")}
                  </label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 transition-all outline-none font-normal text-slate-800">
                    <option value="">{t("contact.form.select")}</option>
                    <option value="under-1k">{t("contact.form.budgetRange.under1k")}</option>
                    <option value="1k-3k">{t("contact.form.budgetRange.1k3k")}</option>
                    <option value="3k-5k">{t("contact.form.budgetRange.3k5k")}</option>
                    <option value="over-5k">{t("contact.form.budgetRange.over10k")}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-2.5 ml-1">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-normal text-slate-800 resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>
              </div>

              {/* Submit Button - Estilo Heavy Premium */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-5 rounded-[1.5rem] font-bold text-sm md:text-base tracking-wide hover:bg-slate-950 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group shadow-xl shadow-blue-200"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700 font-bold text-center animate-bounce">
                    {t("contact.form.success")}
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-6 text-center font-medium">
                {t("contact.form.disclaimer")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}