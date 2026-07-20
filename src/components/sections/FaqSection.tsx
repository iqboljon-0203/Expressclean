"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      question: "Jarayon qancha vaqt oladi?",
      answer: "Odatda gilamlarni olib ketganimizdan so'ng 1-3 kun ichida toza va quruq holatda yetkazib beramiz. Yumshoq mebellarni esa uyingizning o'zida 1-2 soatda tozalab beramiz.",
    },
    {
      question: "Olib ketish va yetkazib berish bepulmi?",
      answer: "Ha, Toshkent shahri ichida olib ketish va yetkazib berish xizmatimiz mutlaqo bepul.",
    },
    {
      question: "Qanday vositalardan foydalanasiz?",
      answer: "Biz faqat yuqori sifatli, ekologik toza va inson salomatligi (hamda uy hayvonlari) uchun zararsiz bo'lgan maxsus gipoallergen vositalardan foydalanamiz.",
    },
    {
      question: "Qanday to'lov usullari mavjud?",
      answer: "Naqd pul, Click, Payme va boshqa qulay usullar orqali to'lov qilishingiz mumkin.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ko'p beriladigan savollar</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden border border-muted/50 shadow-sm"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-foreground">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
