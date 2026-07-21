"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function BeforeAfterSlider() {
  const t = useTranslations("BeforeAfter");
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="relative w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden cursor-ew-resize shadow-premium"
            onMouseMove={handleDrag}
            onTouchMove={handleDrag}
          >
            {/* "After" Image (Clean) - Full width background */}
            <div className="absolute inset-0 select-none">
              <Image 
                src="/after.png" 
                alt="Toza gilam" 
                fill 
                className="object-cover pointer-events-none" 
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>

            {/* "Before" Image (Dirty) - Clipped by slider */}
            <div 
              className="absolute inset-0 select-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image 
                src="/before.png" 
                alt="Kir gilam" 
                fill 
                className="object-cover pointer-events-none" 
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-muted">
                <MoveHorizontal className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-20">
              {t("before")}
            </div>
            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-20">
              {t("after")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
