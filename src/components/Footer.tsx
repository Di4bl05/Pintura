"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteImageUrl } from "@/lib/siteImageSources";

export default function Footer() {
  const { t } = useLanguage();
  const logoUrl = getSiteImageUrl("logoOriginal");

  const services = (t("footer.services.items", { returnObjects: true }) || []) as any[];
  const areaItems = (t("footer.areas.items", { returnObjects: true }) || []) as string[];

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans selection:bg-primary-500/30 border-t border-white/5">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-15">
          <div className="flex flex-col space-y-6">
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0 group active:scale-95 transition-transform md:ml-0"
            >
              <div className="relative shrink-0 flex items-center"> 
                <img
                  src={logoUrl}
                  alt="LUISBETY INC"
                  className="h-10 md:h-12 w-auto object-contain transition-all duration-500"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="flex flex-col border-l border-white/20 leading-none py-1 ml-4 pl-4">
                <span className="font-display font-black text-xl text-white tracking-tighter">
                  LUISBETY 
                  <span className="font-serif italic font-normal text-primary-500">
                    Inc.</span>
                </span>
                <span className="font-sans font-bold uppercase text-primary-200/50 text-[8px] md:text-[9px] mt-1 md:mt-2 tracking-[0.3em] md:tracking-[3px] whitespace-nowrap">
                  Painting and Remodeling
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs opacity-70 font-sans">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a 
                href={t("footer.socials.tiktok")}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 md:ml-5">
              {t("footer.services.title")}
            </h3>
            <ul className="space-y-4">
              {services.map((s, i) => (
                <li key={i}>
                  <Link href={s.href} className="text-sm font-sans hover:text-primary-500 transition-colors opacity-80 hover:opacity-100 md:ml-5">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8">
              {t("footer.areas.title")}
            </h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {areaItems.map((area, i) => (
                <li key={i} className="flex items-center gap-3 text-sm opacity-80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4">
                <Phone size={18} className="text-primary-600 shrink-0" />
                <a href={t("footer.contact.phone_href")} className="hover:text-white transition-colors">
                  {t("footer.contact.phone")}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail size={18} className="text-primary-600 shrink-0" />
                <a href={`mailto:${t("footer.contact.email")}`} className="hover:text-white transition-colors">
                  {t("footer.contact.email")}
                </a>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} className="text-primary-600 shrink-0" />
                <span className="text-[13px] leading-relaxed">
                  {t("footer.contact.address")}
                </span>
              </li>
              <li className="flex gap-4 border-t border-white/5 pt-3">
                <Clock size={18} className="text-primary-600 shrink-0" />
                <div>
                  <p className="text-[13px] leading-relaxed">
                    {t("footer.contact.hours")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p className="text-slate-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} LUISBETY INC. {t("footer.copyright")} | <span className="text-primary-600/60">{t("footer.licenseInfo")}</span>
          </p>
          <div className="flex gap-8 text-slate-500">
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