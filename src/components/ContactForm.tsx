"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, User } from "lucide-react";
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
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
            {t("contact.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("contact.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-700">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">{t("contact.info.title")}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t("contact.info.phone")}</p>
                    <a href="tel:+17863506367" className="text-accent-600 hover:text-accent-700">
                      (786) 350-6367
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:contact@luisbety.com" className="text-accent-600 hover:text-accent-700">
                      contact@luisbety.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t("contact.info.address")}</p>
                    <p className="text-gray-600">
                      2381 Westwood Dr<br />
                      Longwood, FL 32779
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t("contact.info.hours")}</p>
                    <p className="text-gray-600">
                      {t("contact.info.hoursText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="bg-gradient-to-br from-primary-800 to-accent-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{t("contact.benefits.title")}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>{t("contact.benefits.items.0")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>{t("contact.benefits.items.1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>{t("contact.benefits.items.2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>{t("contact.benefits.items.3")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.phone")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.serviceType")} *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.address")} *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder={t("contact.form.addressPlaceholder")}
                  />
                </div>

                {/* Project Size */}
                <div>
                  <label htmlFor="projectSize" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.projectSize")}
                  </label>
                  <select
                    id="projectSize"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t("contact.form.select")}</option>
                    <option value="small">{t("contact.form.size.small")}</option>
                    <option value="medium">{t("contact.form.size.medium")}</option>
                    <option value="large">{t("contact.form.size.large")}</option>
                    <option value="commercial">{t("contact.form.size.commercial")}</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.budget")}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t("contact.form.select")}</option>
                    <option value="under-1k">{t("contact.form.budgetRange.under1k")}</option>
                    <option value="1k-3k">{t("contact.form.budgetRange.1k3k")}</option>
                    <option value="3k-5k">{t("contact.form.budgetRange.3k5k")}</option>
                    <option value="5k-10k">{t("contact.form.budgetRange.5k10k")}</option>
                    <option value="over-10k">{t("contact.form.budgetRange.over10k")}</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.preferredDate")}
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Timeframe */}
                <div>
                  <label htmlFor="timeframe" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.timeframe")}
                  </label>
                  <select
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t("contact.form.select")}</option>
                    <option value="urgent">{t("contact.form.urgency.urgent")}</option>
                    <option value="soon">{t("contact.form.urgency.soon")}</option>
                    <option value="flexible">{t("contact.form.urgency.flexible")}</option>
                    <option value="planning">{t("contact.form.urgency.planning")}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-800 to-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-900 hover:to-accent-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      {t("contact.form.submitting")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                    {t("contact.form.success")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                    {t("contact.form.error")}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                {t("contact.form.disclaimer")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
