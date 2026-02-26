import Link from "next/link";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {t("cta.title")}
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-primary-50 max-w-3xl mx-auto">
          {t("cta.subtitle")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
          >
            {t("cta.btnQuote")}
          </Link>
          <a
            href="tel:+17863506367"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg border-2 border-white"
          >
            <Phone className="w-5 h-5" />
            (786) 350-6367
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">3+</div>
            <div className="text-primary-100">{t("cta.stats.experience")}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$2K-10K</div>
            <div className="text-primary-100">{t("cta.stats.projects")}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-primary-100">{t("cta.stats.satisfaction")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
