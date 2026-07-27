"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import dynamic from "next/dynamic";

const PromoSection = dynamic(() => import("@/components/sections/PromoSection").then(m => m.PromoSection));
const HowItWorksSection = dynamic(() => import("@/components/sections/HowItWorksSection").then(m => m.HowItWorksSection));
const BeforeAfterSlider = dynamic(() => import("@/components/sections/BeforeAfterSlider").then(m => m.BeforeAfterSlider));
const ReviewsSection = dynamic(() => import("@/components/sections/ReviewsSection").then(m => m.ReviewsSection));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => m.FaqSection));
const CalculatorSection = dynamic(() => import("@/components/sections/CalculatorSection").then(m => m.CalculatorSection));
const ContactFormSection = dynamic(() => import("@/components/sections/ContactFormSection").then(m => m.ContactFormSection));

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background gradient transformation (Warm drying effect towards the end)
  const bgOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const dustOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative">
      
      {/* Scroll Journey Effects Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Phase 1: Dust Particles (Top sections) */}
        {mounted && (
          <motion.div 
            style={{ opacity: dustOpacity }}
            className="absolute inset-0"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                animate={{
                  y: [0, -100 - Math.random() * 200],
                  x: Math.random() * 100 - 50,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-gray-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 30}%`,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Phase 2: Floating Bubbles (Middle sections) */}
        {mounted && (
          <motion.div 
            style={{ opacity: bubbleOpacity }}
            className="absolute inset-0"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                animate={{
                  y: [100, -500],
                  x: Math.sin(i) * 50,
                  scale: [0.5, 1.5, 0.8],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
                className="absolute w-8 h-8 rounded-full border border-blue-300/50 bg-blue-100/20 backdrop-blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "-10%",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Phase 3: Warm Drying Gradient (Bottom sections) */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-orange-50/40 via-transparent to-transparent mix-blend-multiply"
        />
      </div>

      {/* Page Content (Layered above effects) */}
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <PromoSection />
        <HowItWorksSection />
        <CalculatorSection />
        <BeforeAfterSlider />
        <ReviewsSection />
        <FaqSection />
        <ContactFormSection />
      </div>
    </div>
  );
}
