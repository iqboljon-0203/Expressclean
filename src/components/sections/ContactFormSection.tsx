"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, CheckCircle2 } from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export function ContactFormSection() {
  const t = useTranslations("ContactForm");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect for custom event to open modal
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);

    return () => {
      window.removeEventListener("open-contact-modal", handleOpenModal);
    };
  }, []);

  const closeForm = () => {
    setIsOpen(false);
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone: phone.startsWith("+998") ? phone : `+998 ${phone}` }),
      });

      if (!res.ok) throw new Error("Tarmoq xatosi");
      
      setName("");
      setPhone("");
      closeForm();
      
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        let callbackFired = false;
        const callback = () => {
          if (!callbackFired) {
            callbackFired = true;
            router.push("/success");
          }
        };

        (window as any).gtag("event", "conversion_event_submit_lead_form", {
          event_callback: callback,
          event_timeout: 2000,
        });

        // Fallback in case gtag fails to execute the callback
        setTimeout(callback, 2100);
      } else {
        router.push("/success");
      }
    } catch (error) {
      console.error(error);
      alert(t("errorMsg"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Form Modal (Rolls up like a carpet on mobile, scales on desktop) */}
          <motion.div
            initial={{ y: "100%", opacity: 0, rotateX: 20 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: "100%", opacity: 0, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Header */}
            <div className="bg-primary px-6 py-6 text-white relative">
              <button 
                onClick={closeForm}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
              <p className="text-white/80 text-sm">
                {t("subtitle")}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="text-sm font-semibold text-foreground mb-2 block">{t("nameLabel")}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className="w-full px-5 py-4 rounded-xl border-2 border-muted bg-muted/20 focus:bg-white focus:border-primary focus:outline-none transition-colors text-foreground font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground mb-2 block">{t("phoneLabel")}</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-5 text-foreground font-medium">+998</span>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder=" 90 123 45 67"
                        className="w-full pl-16 pr-5 py-4 rounded-xl border-2 border-muted bg-muted/20 focus:bg-white focus:border-primary focus:outline-none transition-colors text-foreground font-medium"
                      />
                    </div>
                  </div>
                  
                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover shadow-premium hover:shadow-premium-hover transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        {t("submitBtn")}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </RippleButton>
                  
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    {t("policyText")}
                  </p>
                </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
