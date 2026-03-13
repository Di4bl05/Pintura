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

      <div className="container mx-auto px-6 lg:px-16">
        {/* Header Unificado */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            {t("contact.title")}{" "}
            <span className="text-blue-600 italic">{t("contact.titleHighlight")}</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información de Contacto - Estilo Premium */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                {t("contact.info.title")}
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t("contact.info.phone")}</p>
                    <a href="tel:+17863506367" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      (786) 350-6367
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:contact@luisbety.com" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      contact@luisbety.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t("contact.info.address")}</p>
                    <p className="text-lg font-bold text-slate-900 leading-snug">
                      2381 Westwood Dr<br />
                      Longwood, FL 32779
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t("contact.info.hours")}</p>
                    <p className="text-lg font-bold text-slate-900">
                      {t("contact.info.hoursText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits - Estilo Dark Premium */}
            <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-blue-500">{t("contact.benefits.title")}</h3>
              <ul className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black italic">
                      ✓
                    </div>
                    <span className="font-bold text-slate-200">{t(`contact.benefits.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulario - Estilo Limpio y Robusto */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs con estilo unificado */}
                {[
                  { id: "name", label: t("contact.form.name"), type: "text", placeholder: t("contact.form.namePlaceholder") },
                  { id: "email", label: t("contact.form.email"), type: "email", placeholder: t("contact.form.emailPlaceholder") },
                  { id: "phone", label: t("contact.form.phone"), type: "tel", placeholder: t("contact.form.phonePlaceholder") }
                ].map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                      {input.label} *
                    </label>
                    <input
                      type={input.type}
                      id={input.id}
                      name={input.id}
                      required
                      value={(formData as any)[input.id]}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-medium"
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="serviceType" className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                    {t("contact.form.serviceType")} *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-medium appearance-none"
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
                  <label htmlFor="address" className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                    {t("contact.form.address")} *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-medium"
                    placeholder={t("contact.form.addressPlaceholder")}
                  />
                </div>

                {/* Grid secundario para selects pequeños */}
                <div>
                  <label htmlFor="projectSize" className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                    {t("contact.form.projectSize")}
                  </label>
                  <select id="projectSize" name="projectSize" value={formData.projectSize} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 transition-all outline-none font-medium">
                    <option value="">{t("contact.form.select")}</option>
                    <option value="small">{t("contact.form.size.small")}</option>
                    <option value="medium">{t("contact.form.size.medium")}</option>
                    <option value="large">{t("contact.form.size.large")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                    {t("contact.form.budget")}
                  </label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 transition-all outline-none font-medium">
                    <option value="">{t("contact.form.select")}</option>
                    <option value="under-1k">{t("contact.form.budgetRange.under1k")}</option>
                    <option value="1k-3k">{t("contact.form.budgetRange.1k3k")}</option>
                    <option value="3k-5k">{t("contact.form.budgetRange.3k5k")}</option>
                    <option value="over-5k">{t("contact.form.budgetRange.over10k")}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-1">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none font-medium resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>
              </div>

              {/* Submit Button - Estilo Heavy Premium */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-slate-950 transition-all disabled:opacity-50 flex items-center justify-center gap-4 group shadow-xl shadow-blue-200"
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

              <p className="text-[10px] text-slate-400 mt-6 text-center font-bold uppercase tracking-widest">
                {t("contact.form.disclaimer")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}