"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";

interface FaqData {
  id: string;
  question_uz: string;
  question_ru: string;
  answer_uz: string;
  answer_ru: string;
}

export function FaqSection() {
  const t = useTranslations("Faq");
  const locale = useLocale();

  const fallbackFaqs = useMemo(() => [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
  ], [t]);

  const [dbFaqs, setDbFaqs] = useState<FaqData[]>([]);
  const [headerData, setHeaderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setIsLoading(false);
        return;
      }
      try {
        const [faqsRes, headerRes] = await Promise.all([
          supabase.from('faqs').select('*').order('created_at', { ascending: true }),
          supabase.from('faqs_header').select('*').limit(1).single()
        ]);
        if (faqsRes.data && !faqsRes.error && faqsRes.data.length > 0) {
          setDbFaqs(faqsRes.data);
        }
        if (headerRes.data && !headerRes.error) {
          setHeaderData(headerRes.data);
        }
      } catch (err) {
        console.error("Error fetching faqs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const faqs = useMemo(() => {
    if (dbFaqs.length > 0) {
      return dbFaqs.map(f => ({
        question: locale === 'ru' ? f.question_ru : f.question_uz,
        answer: locale === 'ru' ? f.answer_ru : f.answer_uz,
      }));
    }
    return fallbackFaqs;
  }, [dbFaqs, fallbackFaqs, locale]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const headerTitle = headerData ? headerData[`title_${locale}`] : t("title");

  return (
    <section id="faq" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{headerTitle}</h2>
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
