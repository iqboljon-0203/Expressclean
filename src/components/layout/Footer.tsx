import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer id="contact" className="bg-foreground text-white py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo & Text */}
        <div className="lg:pr-4">
          <div className="mb-4">
            <Image src="/logo.png" alt="Express Clean" width={180} height={50} className="object-contain h-10 w-auto brightness-0 invert" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>
        
        {/* Column 2: Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("navTitle")}</h4>
          <ul className="space-y-3">
            <li><Link href="#about" className="text-gray-300 hover:text-white transition-colors">{t("nav_about")}</Link></li>
            <li><Link href="#services" className="text-gray-300 hover:text-white transition-colors">{t("nav_services")}</Link></li>
            <li><Link href="#faq" className="text-gray-300 hover:text-white transition-colors">{t("nav_faq")}</Link></li>
            <li><Link href="#reviews" className="text-gray-300 hover:text-white transition-colors">{t("nav_reviews")}</Link></li>
            <li><Link href="#contact" className="text-gray-300 hover:text-white transition-colors">{t("nav_contact")}</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("contactTitle")}</h4>
          <ul className="space-y-4">
            <li>
              <a href="tel:+998948500006" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-3 text-secondary" />
                +998 94 850 00 06
              </a>
            </li>
            <li className="flex items-start text-gray-300">
              <Clock className="w-5 h-5 mr-3 text-secondary shrink-0 mt-0.5" />
              <span>{t("schedule")}</span>
            </li>
            <li className="flex items-start text-gray-300">
              <MapPin className="w-5 h-5 mr-3 text-secondary shrink-0 mt-0.5" />
              <span>{t("address")}</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("socialTitle")}</h4>
          <div className="flex gap-4">
            {/* Instagram */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* Facebook */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* Telegram */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 3-9"/></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} {t("copyright")}</p>
        <p>{t.rich("developedBy", {
          link: (chunks) => <a href="https://dreamtech.uz" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors font-semibold">{chunks}</a>
        })}</p>
      </div>
    </footer>
  );
}
