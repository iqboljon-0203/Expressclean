"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Ruler, Calculator } from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";
import { useTranslations } from "next-intl";

export function CalculatorSection() {
  const t = useTranslations("Calculator");
  const [width, setWidth] = useState(2);
  const [length, setLength] = useState(3);
  const pricePerSqm = 12000;

  // Calculate actual total price
  const total = width * length * pricePerSqm;

  // Use Framer Motion spring for odometer effect
  const springTotal = useSpring(total, {
    stiffness: 50,
    damping: 15,
  });

  // Whenever total changes, update the spring target
  useEffect(() => {
    springTotal.set(total);
  }, [total, springTotal]);

  // Format the spring value to a rounded string
  const displayTotal = useTransform(springTotal, (value) => {
    const num = Math.round(value);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white -z-10" />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3"
          >
            <Calculator className="w-8 h-8 text-primary" />
            {t("title")}
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Controls */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-muted/50 z-10 relative">
            
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-primary" />
                  {t("width")}
                </label>
                <span className="text-2xl font-bold text-primary">{width} m</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-primary rotate-90" />
                  {t("length")}
                </label>
                <span className="text-2xl font-bold text-primary">{length} m</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <p className="text-sm text-muted-foreground mb-1">{t("estimateLabel")}</p>
              <div className="flex items-baseline gap-2">
                <motion.span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                  {displayTotal}
                </motion.span>
                <span className="text-xl font-bold text-muted-foreground">{t("currency")}</span>
              </div>
              <p className="text-xs text-primary mt-2 font-medium">
                {t("note")}
              </p>
            </div>

            <a href="#contact" className="block mt-8">
              <RippleButton className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold shadow-premium hover:shadow-premium-hover">
                {t("orderBtn")}
              </RippleButton>
            </a>
          </div>

          {/* Visual Carpet Representation */}
          <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px] bg-muted/20 rounded-3xl relative border border-muted/50 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-px opacity-10 pointer-events-none">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="bg-primary/30 w-full h-full" />
              ))}
            </div>
            
            <motion.div
              layout
              // Base size 40px per meter
              animate={{ 
                width: width * 40, 
                height: length * 40 
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-primary rounded-xl relative shadow-2xl flex items-center justify-center overflow-hidden border-2 border-primary-hover"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/woven-light.png")', // subtle texture
                backgroundSize: '100px 100px'
              }}
            >
              <div className="absolute inset-2 border-2 border-white/20 rounded-lg pointer-events-none" />
              <motion.span 
                layout
                className="bg-white/90 text-primary font-bold px-3 py-1 rounded-full text-sm backdrop-blur-sm whitespace-nowrap shadow-sm"
              >
                {width * length} m²
              </motion.span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
