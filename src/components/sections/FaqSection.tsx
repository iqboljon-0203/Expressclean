"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  className?: string;
  defaultOpenIndex?: number | null;
}

export const defaultSampleFAQs: FAQItem[] = [
  {
    question: "Gilam yuvish 1 kv metr narxi qancha?",
    answer:
      "Gilam yuvish narxlari 1 kvadrat metr uchun 12,000 so'mdan boshlanadi. Joyida (uyda) tozalash 16,000 so'm/m². Narx gilamning turi (ipak, jun, sintetika) va qalinligiga qarab belgilanadi. Aniq narxni bilish uchun saytimizdagi Narx Kalkulyatoridan foydalanishingiz mumkin.",
  },
  {
    question: "Gilamlarni olib ketish va yetkazib berish bepulmi?",
    answer:
      "Ha, Toshkent shahri (barcha 11 ta tuman: Yunusobod, Chilonzor, Sergeli, Mirzo Ulug'bek va b.) hamda viloyat markazlarimiz bo'ylab gilamlarni uyingizdan bepul olib ketamiz va tozalab, qadoqlangan holda bepul yetkazib beramiz.",
  },
  {
    question: "Gilam necha kunda quriydi va yetkazib beriladi?",
    answer:
      "Gilamlar maxsus quvursimon sentrifugada 95% suvi siqib olingach, harorat va namlik nazorat qilinadigan maxsus quritish kamerasida 24-48 soat ichida to'liq quritiladi. Buyurtma berilgan kundan boshlab 1-3 kun ichida toza va quruq holatda qaytariladi.",
  },
  {
    question: "Gilamdagi kofe, yog' va boshqa qiyin dog'larni ketkazish mumkinmi?",
    answer:
      "Biz Germaniya va Turkiyaning professional fermentli organik dog' ketkazuvchi vositalaridan foydalanamiz. Kofe, choy, sharbat, yog' va bo'yoq kabi o'tirib qolgan qiyin dog'lar 98% gacha samaradorlik bilan xavfsiz yo'qotiladi.",
  },
  {
    question: "Gilamdagi zax va noxush hidlarni qanday yo'qotasiz?",
    answer:
      "Zax va namlik hidi gilam tolalari orasidagi mog'or va bakteriyalardan kelib chiqadi. Biz maxsus antibakterial ishlov va ozonli dezinfeksiya yordamida hid manbaini butunlay yo'q qilamiz, so'ngra xushbo'ylashtiruvchi konditsioner bilan chayqaymiz.",
  },
  {
    question: "Gilamga yopishgan saqich va plastilinni qanday ketkazasiz?",
    answer:
      "Saqich va plastilin kabi yopishqoq moddalar mato tolalariga zarar yetkazmaslik uchun krio-muzlatish va maxsus erituvchilar yordamida gilam tuklarini uzib yubormasdan to'liq tozalab olinadi.",
  },
  {
    question: "Chang kanalariga (kleshlarga) qarshi qanday tozalash amalga oshiriladi?",
    answer:
      "Kuchli vakuumli chang qoqish uskunasi va Karcher chuqur ekstraksiyasi orqali gilamning eng tubidagi chang, kleshlar va ularning allergenlari 100% chiqarib tashlanadi hamda antibakterial eko shampun bilan yuviladi.",
  },
];

export function FaqSection({
  title = "Ko'p beriladigan savollar",
  subtitle = "Gilam yuvish, dog'larni ketkazish, narxlar va yetkazib berish bo'yicha eng ko'p so'raladigan savollarga javoblar",
  items = defaultSampleFAQs,
  className = "",
  defaultOpenIndex = 0,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  // Generate Google Rich Snippet JSON-LD schema for FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby={`${baseId}-heading`}
      className={`py-20 md:py-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden ${className}`}
    >
      {/* FAQPage JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>

          <h2
            id={`${baseId}-heading`}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight"
          >
            {title}
          </h2>

          {subtitle && (
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4" role="region" aria-label="Tez-tez so'raladigan savollar">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-btn-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-primary/30 shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                    : "bg-white/80 hover:bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors cursor-pointer group"
                >
                  <span
                    className={`font-bold text-base md:text-lg transition-colors pr-4 ${
                      isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-gray-100 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const FAQSection = FaqSection;
export default FaqSection;
