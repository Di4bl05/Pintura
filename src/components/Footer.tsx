"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteImageUrl } from "@/lib/siteImageSources";

export default function Footer() {
  const { t } = useLanguage();
  const logoUrl = getSiteImageUrl("logoOriginal");

  type FooterServiceItem = { name: string; href: string };

  const servicesValue = t("footer.services.items") as unknown;
  const areaItemsValue = t("footer.areas.items") as unknown;

  const services: FooterServiceItem[] = Array.isArray(servicesValue)
    ? servicesValue.filter(
        (item): item is FooterServiceItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as { name?: unknown }).name === "string" &&
          typeof (item as { href?: unknown }).href === "string"
      )
    : [];

  const areaItems: string[] = Array.isArray(areaItemsValue)
    ? areaItemsValue.filter((item): item is string => typeof item === "string")
    : [];

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans selection:bg-primary-500/30">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Columna 1: Logo (Imagen + Texto al lado) */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Imagen en Blanco y Negro (Filtros CSS) */}
              <div className="relative w-[50px] h-[50px] shrink-0">
                <Image 
                  src={logoUrl}
                  alt="Logo" 
                  fill
                  className="object-contain grayscale brightness-0 invert opacity-90 transition-opacity group-hover:opacity-100" 
                />
              </div>

              {/* Texto al lado de la imagen */}
              <div className="flex flex-col">
                <h3 className="text-white font-black text-xl leading-none tracking-tighter">
                  LUISBETY INC.
                </h3>
                <p className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.1em] mt-1">
                  PAINTING AND REMODELING
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs opacity-70">
              {t("footer.description")}
            </p>
            
            <div className="flex gap-4">
              <a 
                href="https://www.tiktok.com/@luisenriquecardenas86" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios (Letra normal) */}
          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-6">
              {t("footer.services.title")}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-sm hover:text-primary-500 transition-colors block opacity-80 hover:opacity-100"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Áreas */}
          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-6">
              {t("footer.areas.title")}
            </h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {areaItems.map((area, index) => (
                <li key={index} className="flex items-center gap-3 text-sm opacity-80 cursor-default">
                  <div className="w-1 h-1 rounded-full bg-primary-600 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
              <li className="text-[10px] font-bold text-primary-600 mt-2 uppercase tracking-widest">
                {t("footer.areas.all")}
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-6">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-4 group">
                <Phone size={16} className="text-primary-600 mt-1 flex-shrink-0" />
                <a href="tel:+17863506367" className="hover:text-white transition-colors opacity-80 hover:opacity-100">
                  (786) 350-6367
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <Mail size={16} className="text-primary-600 mt-1 flex-shrink-0" />
                <a href="mailto:contact@luisbety.com" className="hover:text-white transition-colors opacity-80 hover:opacity-100">
                  contact@luisbety.com
                </a>
              </li>
              <li className="flex items-start gap-4 text-slate-300">
                <MapPin size={16} className="text-primary-600 mt-1 flex-shrink-0" />
                <span className="leading-relaxed text-[13px]">
                  2381 Westwood Dr<br />
                  Longwood, FL 32779
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Clock size={16} className="text-primary-600 mt-1 flex-shrink-0" />
                <span className="text-[11px] uppercase font-bold text-slate-500">
                   {t("footer.contact.hours")}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium uppercase tracking-widest">
          <p className="text-slate-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} LUISBETY INC. {t("footer.copyright")}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary-500 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-primary-500 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}