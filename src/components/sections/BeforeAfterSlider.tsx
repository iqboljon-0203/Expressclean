"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";

export function BeforeAfterSlider() {
  const t = useTranslations("BeforeAfter");
  const locale = useLocale();
  const [data, setData] = useState<any>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    async function fetchData() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      const { data: dbData } = await supabase.from('before_after_header').select('*').limit(1).single();
      if (dbData) {
        setData(dbData);
      }
    }
    fetchData();
  }, []);

  const headerTitle = data ? data[`title_${locale}`] : t("title");
  const headerSubtitle = data ? data[`subtitle_${locale}`] : t("subtitle");
  const labelBefore = data ? data[`label_before_${locale}`] : t("before");
  const labelAfter = data ? data[`label_after_${locale}`] : t("after");
  const imageBefore = data?.image_before || "/before.png";
  const imageAfter = data?.image_after || "/after.png";

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
    <section id="natijalar" className="py-24 bg-foreground relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headerTitle}</h2>
          {headerSubtitle && (
            <p className="text-white/80 max-w-2xl mx-auto">
              {headerSubtitle}
            </p>
          )}
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
                src={imageAfter} 
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
                src={imageBefore} 
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
              {labelBefore}
            </div>
            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-20">
              {labelAfter}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
