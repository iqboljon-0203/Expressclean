"use client";

import { motion } from "framer-motion";
import { Sparkles, Home, Sofa, SplitSquareHorizontal, ArrowRight, BedDouble, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RippleButton } from "@/components/ui/RippleButton";

export function ServicesSection() {
  const services = [
    {
      title: "Gilam yuvish",
      price: "12,000 so'm / m²",
      description: "Maxsus sexlarda chuqur yuvish, quritish va maxsus o'rab yetkazib berish xizmati.",
      icon: <SplitSquareHorizontal className="w-6 h-6 text-primary" />,
      image: "/service1_v3.png",
    },
    {
      title: "Joyida gilam yuvish",
      price: "16,000 so'm / m²",
      description: "Gilamlaringizni o'z joyidan jildirmay maxsus uskunalar yordamida tozalab beramiz.",
      icon: <Home className="w-6 h-6 text-primary" />,
      image: "/service2.png",
    },
    {
      title: "Yumshoq mebel",
      price: "50,000 - 80,000 so'm",
      description: "Narx 1 joy (o'tiradigan o'rin) uchun. Divan va kreslolarni chuqur tozalash.",
      icon: <Sofa className="w-6 h-6 text-primary" />,
      image: "/service3.png",
    },
    {
      title: "Ko'rpachalar tozalash",
      price: "15,000 so'm / 1 metr",
      description: "Ko'rpachalarni chang, kir va hidlardan to'liq tozalab, yangidek holatga keltiramiz.",
      icon: <Layers className="w-6 h-6 text-primary" />,
      image: "/service4.png",
    },
    {
      title: "Adiyol yuvish",
      price: "50,000 so'm dan",
      description: "1 kishilik adiyol - 50,000 so'm. 2 kishilik adiyol - 80,000 so'm.",
      icon: <BedDouble className="w-6 h-6 text-primary" />,
      image: "/service5.png",
    },
    {
      title: "Pardalar yuvish",
      price: "25,000 so'm / 1 metr",
      description: "Nafis matolarga zarar yetkazmagan holda ehtiyotkorlik bilan tozalash va dazmollash.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      image: "/service6.png",
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gray-50/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            Bizning Xizmatlarimiz va Narxlar
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Har bir xizmatimiz uchun eng yuqori sifat va tozalikni kafolatlaymiz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1 
              }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full overflow-hidden border border-gray-100"
            >
              {/* Image Header */}
              <div className="relative w-full h-56 md:h-48 overflow-hidden bg-gray-100">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  priority={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Floating Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                {/* Gradient Overlay for smooth transition to content */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              {/* Content Area */}
              <div className="p-8 pt-2 flex flex-col flex-grow relative bg-white">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                
                <div className="inline-block bg-blue-50 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-4 w-max">
                  {service.price}
                </div>
                
                <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                
                <a 
                  href="#contact" 
                  className="mt-auto block"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-contact-modal'));
                  }}
                >
                  <RippleButton className="w-full bg-gray-50 text-foreground py-3 rounded-xl hover:bg-primary hover:text-white transition-colors border border-gray-100 shadow-sm flex items-center justify-center group/btn">
                    <span className="font-semibold">Buyurtma berish</span> 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </RippleButton>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
