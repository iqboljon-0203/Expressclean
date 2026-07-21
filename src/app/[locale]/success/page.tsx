"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { RippleButton } from "@/components/ui/RippleButton";
import { useState, useEffect } from "react";

export default function SuccessPage() {
  const t = useTranslations("SuccessPage");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-white p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-muted/30 text-center relative overflow-hidden z-10"
      >
        {/* Decorative inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-400/20 blur-[60px] -z-10 rounded-full" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.7, delay: 0.2 }}
          className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <CheckCircle2 className="w-14 h-14 text-green-500 relative z-10" />
          
          {/* Confetti particles - Client only to avoid hydration mismatch */}
          {mounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 250, 
                y: (Math.random() - 0.5) * 250,
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className={`absolute w-3 h-3 rounded-sm ${["bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-pink-400"][Math.floor(Math.random() * 4)]}`}
            />
          ))}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg mb-10 leading-relaxed font-medium"
        >
          {t("message")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <RippleButton className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover shadow-premium hover:shadow-premium-hover transition-all text-lg">
              <ArrowLeft className="w-5 h-5" />
              {t("button")}
            </RippleButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
