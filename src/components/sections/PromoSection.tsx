"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RippleButton } from "@/components/ui/RippleButton";
import { useTranslations } from "next-intl";

export function PromoSection() {
  const t = useTranslations("Promo");

  const promos = [
    { text: t("card1_text"), highlight: t("card1_highlight"), image: "/promo_star.png" },
    { text: t("card2_text"), highlight: t("card2_highlight"), image: "/promo_wallet.png" },
    { text: t("card3_text"), highlight: t("card3_highlight"), image: "/promo_crown.png" },
    { text: t("card4_text"), highlight: t("card4_highlight"), image: "/promo_gift.png" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            {t("headline")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium"
          >
            {t("subheadline")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {promos.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              className="bg-white h-full rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform shrink-0">
                <Image src={promo.image} alt="Icon" fill className="object-contain drop-shadow-md" />
              </div>
              <h3 className="text-gray-600 font-bold mb-4 text-sm uppercase tracking-wider leading-relaxed">{promo.text}</h3>
              <div className="mt-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold px-3 py-2 rounded-xl text-[17px] w-full shadow-md hover:shadow-lg transition-shadow min-h-[4.5rem] flex items-center justify-center leading-tight">
                {promo.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }}
          >
            <RippleButton className="px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xl font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite]">
              {t("cta")}
            </RippleButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
