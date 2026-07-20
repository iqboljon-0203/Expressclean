"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Shahnoza R.",
    review: "Gilamimizdagi eski dog'larni ketkizishdi, raxmat! Juda tez va sifatli ishlasharkan.",
  },
  {
    name: "Aziz T.",
    review: "Yumshoq mebellarim yangidek bo'lib qoldi. Hidlari ham juda yoqimli. Tavsiya qilaman!",
  },
  {
    name: "Malika K.",
    review: "Servis a'lo darajada. O'zlari olib ketib, 2 kunda top-toza qilib qaytarib kelishdi.",
  },
  {
    name: "Rustam B.",
    review: "Ofisimizdagi barcha stullardagi dog'larni tozalashdi. Narxlari ham hamyonbop ekan.",
  },
  {
    name: "Nargiza A.",
    review: "Matraslarimizni tozalashga bergan edik, xuddi yangi sotib olgandek bo'lib qaytdi. Kattakon rahmat!",
  },
];

// Duplicate reviews to create a longer track to prevent blank spaces when sliding
const extendedReviews = [...reviews, ...reviews, ...reviews];

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const maxIndex = reviews.length; // Limit loop to the original length to simulate infinity

  const paginate = (dir: number) => {
    setIndex((prev) => {
      let next = prev + dir;
      if (next < 0) return maxIndex - 1;
      if (next >= maxIndex * 2) return 0;
      return next;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white to-blue-50/30 overflow-hidden relative">
      <style>{`
        .review-track-container {
          --slide-shift: 100%;
        }
        @media (min-width: 768px) {
          .review-track-container {
            --slide-shift: 33.333333%;
          }
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Mijozlarimiz fikrlari</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Bizning eng katta yutug'imiz - mamnun mijozlarimiz.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Controls */}
          <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20">
            <button
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20">
            <button
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Track */}
          <div className="overflow-hidden review-track-container -mx-4 px-4 py-8">
            <motion.div
              className="flex"
              animate={{ x: `calc(-${index} * var(--slide-shift))` }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
            >
              {extendedReviews.map((item, i) => {
                // Determine if this card is currently in view to give it a slight pop effect
                // On mobile (1 card), it's active if i === index
                // On desktop (3 cards), it's active if i >= index && i < index + 3
                return (
                  <div key={i} className="w-full md:w-1/3 shrink-0 px-4">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden h-full flex flex-col"
                    >
                      {/* Decorative blob */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                      
                      <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 rotate-12" />
                      
                      <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                        ))}
                      </div>
                      
                      <p className="text-foreground/80 text-lg mb-8 leading-relaxed font-medium relative z-10 italic flex-grow">
                        "{item.review}"
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground">Tasdiqlangan mijoz</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === (index % reviews.length) ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
