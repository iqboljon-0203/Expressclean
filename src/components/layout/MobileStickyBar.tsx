"use client";

import { Phone, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function MobileStickyBar() {
  const t = useTranslations("MobileStickyBar");
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-muted shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-safe-area">
      <div className="flex p-3 gap-2">
        <Link
          href="#contact"
          className="flex-1 bg-primary text-white rounded-xl py-3.5 flex items-center justify-center font-bold text-[15px] active:scale-[0.98] transition-transform"
        >
          <CalendarCheck className="w-5 h-5 mr-2" />
          {t("order")}
        </Link>
        <a
          href="tel:+998948500006"
          className="w-14 bg-muted text-primary rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform"
          aria-label="Qo'ng'iroq qilish"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
