"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Users, Truck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RippleButton } from "@/components/ui/RippleButton";

export function HeroSection() {
  const badges = [
    { icon: <Users className="w-5 h-5 text-accent" />, text: "1000+ mijozlar" },
    { icon: <Truck className="w-5 h-5 text-accent" />, text: "Bepul olib ketish" },
    { icon: <Sparkles className="w-5 h-5 text-accent" />, text: "Ekologik toza" },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Set initial position to center for mobile users to know it exists
  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 3);
  }, [mouseX, mouseY]);

  function handlePointerMove({ currentTarget, clientX, clientY }: React.PointerEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // The mask image will reveal the clean background where the pointer is
  const maskImage = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <section 
      className="relative pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center group cursor-crosshair"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      {/* Background - "Dirty" layer */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
         <Image 
           src="/hero-bg-v3.png" 
           alt="Dirty background" 
           fill 
           priority
           className="object-cover sepia-[.5] brightness-75 contrast-75 blur-sm" 
         />
         <div className="absolute inset-0 bg-[#8c7b66]/30 mix-blend-multiply" />
      </div>

      {/* Background - "Clean" layer revealed by mask */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
         <Image 
           src="/hero-bg-v3.png" 
           alt="Clean background" 
           fill 
           priority
           className="object-cover" 
         />
         <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10 pointer-events-none mt-10 md:mt-0">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1.5 px-3 md:px-4 rounded-full bg-white/70 backdrop-blur-md text-primary text-xs md:text-sm font-semibold mb-6 shadow-sm border border-white/50">
            ✨ Interaktiv Tozalash: Ekranni silab ko'ring!
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.15] md:leading-[1.1] mb-4 md:mb-6 drop-shadow-sm">
            Toshkentda gilam va yumshoq mebellarni <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              professional tozalash
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-medium mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm bg-white/40 md:bg-white/30 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/40">
            1-3 kun ichida bepul olib ketib, xuddi hozir tozalaganingizdek yangidek qilib yetkazib beramiz. Sifatga kafolat!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-14 pointer-events-auto"
        >
          <a 
            href="#contact" 
            className="inline-block"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }}
          >
            <RippleButton className="px-8 py-4 text-base font-bold text-white bg-primary rounded-full hover:bg-primary-hover shadow-premium hover:shadow-premium-hover transition-all duration-300">
              Buyurtma berish
              <ArrowRight className="ml-2 w-5 h-5" />
            </RippleButton>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10"
        >
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center justify-center gap-3 bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/50 hover:bg-white/90 transition-colors pointer-events-auto">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <span className="font-semibold text-foreground text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
