"use client";

import { motion } from "framer-motion";
import { ClipboardEdit, Truck, Droplets, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocale } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks");
  const locale = useLocale();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      const { data: dbData } = await supabase.from('how_it_works').select('*').limit(1).single();
      if (dbData) {
        setData(dbData);
      }
    }
    fetchData();
  }, []);

  const headerTitle = data ? data[`title_${locale}`] : t("title");
  const headerSubtitle = data ? data[`subtitle_${locale}`] : t("subtitle");

  const steps = [
    {
      title: data ? data[`step1_title_${locale}`] : t("steps.step1.title"),
      description: data ? data[`step1_desc_${locale}`] : t("steps.step1.desc"),
      icon: <ClipboardEdit className="w-8 h-8 text-white" />,
    },
    {
      title: data ? data[`step2_title_${locale}`] : t("steps.step2.title"),
      description: data ? data[`step2_desc_${locale}`] : t("steps.step2.desc"),
      icon: <Truck className="w-8 h-8 text-white" />,
    },
    {
      title: data ? data[`step3_title_${locale}`] : t("steps.step3.title"),
      description: data ? data[`step3_desc_${locale}`] : t("steps.step3.desc"),
      icon: <Droplets className="w-8 h-8 text-white" />,
    },
    {
      title: data ? data[`step4_title_${locale}`] : t("steps.step4.title"),
      description: data ? data[`step4_desc_${locale}`] : t("steps.step4.desc"),
      icon: <CheckCircle className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section id="qanday-ishlaymiz" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{headerTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {headerSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-muted/50 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-premium">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{index + 1}. {step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
