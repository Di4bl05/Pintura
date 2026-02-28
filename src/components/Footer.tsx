"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">LUISBETY INC.</h3>
            <p className="mb-4 text-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@luisenriquecardenas86" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.services.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/interior" className="hover:text-primary-400 transition-colors">{t("footer.services.interior")}</Link></li>
              <li><Link href="/services/exterior" className="hover:text-primary-400 transition-colors">{t("footer.services.exterior")}</Link></li>
              <li><Link href="/services/commercial" className="hover:text-primary-400 transition-colors">{t("footer.services.commercial")}</Link></li>
              <li><Link href="/services/deck" className="hover:text-primary-400 transition-colors">{t("footer.services.deck")}</Link></li>
              <li><Link href="/services/pressure-washing" className="hover:text-primary-400 transition-colors">{t("footer.services.pressure")}</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.areas.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/areas/longwood" className="hover:text-primary-400 transition-colors">{t("footer.areas.longwood")}</Link></li>
              <li><Link href="/areas/orlando" className="hover:text-primary-400 transition-colors">{t("footer.areas.orlando")}</Link></li>
              <li><Link href="/areas/central-florida" className="hover:text-primary-400 transition-colors">{t("footer.areas.central")}</Link></li>
              <li className="text-gray-400">{t("footer.areas.all")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.contact.title")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="tel:+17863506367" className="hover:text-primary-400 transition-colors">
                  (786) 350-6367
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@luisbety.com" className="hover:text-primary-400 transition-colors">
                  contact@luisbety.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>2381 Westwood Dr<br />Longwood, FL 32779</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{t("footer.contact.hours")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LUISBETY INC. {t("footer.copyright")}</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
