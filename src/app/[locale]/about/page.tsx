"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Settings, ThumbsUp, Shield, Truck, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <main className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 font-outfit">{t("title")}</h1>
          <div className="w-20 h-1.5 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-foreground/80 leading-relaxed text-lg"
          >
            <p dangerouslySetInnerHTML={{ __html: t.raw("p1") }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw("p2") }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw("p3") }} />

            <ul className="space-y-4 pt-4 border-t border-muted/50">
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{t("li1")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{t("li2")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{t("li3")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{t("li4")}</span>
              </li>
            </ul>
          </motion.div>

          {/* Banner Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-muted/30 sticky top-24 flex flex-col"
          >
            {/* Top Area (White Background) */}
            <div className="relative bg-white p-6 md:p-8 flex-grow">
              {/* Decorative circles to mimic water/bubbles */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 right-0 w-20 h-20 bg-blue-50 rounded-l-full translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                {/* Left Side: Logo & Text */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <div className="w-[80%] md:w-full h-32 md:h-52 relative mb-2 md:mb-6">
                    <Image src="/logo.png" alt="Express Clean" fill className="object-contain md:object-left drop-shadow-xl" />
                  </div>
                  
                  {/* Badges */}
                  <div className="grid grid-cols-2 gap-2 md:gap-4 w-full mt-auto pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 md:mb-2 shadow-sm border border-blue-100/50">
                        <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#0f3460] leading-tight" dangerouslySetInnerHTML={{ __html: t.raw("badge1") }} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-1 md:mb-2 shadow-sm border border-green-100/50">
                        <Shield className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#0f3460] leading-tight" dangerouslySetInnerHTML={{ __html: t.raw("badge2") }} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-1 md:mb-2 shadow-sm border border-orange-100/50">
                        <Clock className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#0f3460] leading-tight" dangerouslySetInnerHTML={{ __html: t.raw("badge3") }} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1 md:mb-2 shadow-sm border border-purple-100/50">
                        <ThumbsUp className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#0f3460] leading-tight" dangerouslySetInnerHTML={{ __html: t.raw("badge4") }} />
                    </div>
                  </div>
                </div>

                {/* Right Side: Title & Image */}
                <div className="flex-1 flex flex-col mt-4 md:mt-0">
                  <h3 className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.3rem] font-black text-[#0f3460] leading-tight mb-3 md:mb-4 uppercase text-center md:text-left">
                    <span dangerouslySetInnerHTML={{ __html: t.raw("cardTitle1") }} />
                    <span dangerouslySetInnerHTML={{ __html: t.raw("cardTitle2") }} />
                    <span dangerouslySetInnerHTML={{ __html: t.raw("cardTitle3") }} />
                  </h3>
                  <div className="relative flex-grow min-h-[140px] sm:min-h-[160px] md:min-h-[200px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 mt-2">
                    <Image src="/hero-bg-v3.png" alt="Cleaning process" fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Blue Contact Area */}
            <div className="bg-[#0f3460] text-white p-5 md:p-6 grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-4 items-center relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 skew-x-12 translate-x-8"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-blue-200 uppercase tracking-widest mb-0.5 font-bold">{t("contactLabel")}</div>
                  <div className="text-lg md:text-2xl font-black tracking-wide">+998 94 850 00 06</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10 md:justify-end">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-white/70 uppercase font-bold tracking-wider">{t("locationLabel1")}</div>
                  <div className="text-sm font-black text-blue-300">{t("locationLabel2")}</div>
                </div>
              </div>
            </div>
            
            {/* Light Blue Bottom Strip */}
            <div className="bg-[#0088cc] px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-white text-[9px] md:text-[10px] font-bold leading-tight">
               <div className="flex items-center gap-2 justify-center text-center">
                 <Settings className="w-4 h-4 flex-shrink-0 opacity-80" />
                 <span dangerouslySetInnerHTML={{ __html: t.raw("strip1") }} />
               </div>
               <div className="flex items-center gap-2 justify-center text-center">
                 <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 <span dangerouslySetInnerHTML={{ __html: t.raw("strip2") }} />
               </div>
               <div className="flex items-center gap-2 justify-center text-center">
                 <Shield className="w-4 h-4 flex-shrink-0 opacity-80" />
                 <span dangerouslySetInnerHTML={{ __html: t.raw("strip3") }} />
               </div>
               <div className="flex items-center gap-2 justify-center text-center">
                 <Truck className="w-4 h-4 flex-shrink-0 opacity-80" />
                 <span dangerouslySetInnerHTML={{ __html: t.raw("strip4") }} />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Features Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#e6f6f9] p-8 rounded-3xl text-center border border-[#ccebf0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm border border-primary/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0f3460] mb-4">{t("box1Title")}</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {t("box1Desc")}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#e6f6f9] p-8 rounded-3xl text-center border border-[#ccebf0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm border border-primary/10">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0f3460] mb-4">{t("box2Title")}</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {t("box2Desc")}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#e6f6f9] p-8 rounded-3xl text-center border border-[#ccebf0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm border border-primary/10">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0f3460] mb-4">{t("box3Title")}</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              {t("box3Desc")}
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
