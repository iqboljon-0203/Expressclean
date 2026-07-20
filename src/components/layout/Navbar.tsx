"use client";

import { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Biz haqimizda", href: "/about" },
    { name: "Xizmatlar", href: "/#services" },
    { name: "Sharhlar", href: "/#reviews" },
    { name: "Aloqa", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Express Clean" width={180} height={50} className="object-contain h-10 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-hover transition-colors shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }}
          >
            <PhoneCall className="w-4 h-4" />
            Buyurtma berish
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-muted bg-white overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-foreground p-2 rounded-md hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors shadow-sm mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-contact-modal'));
                }}
              >
                <PhoneCall className="w-5 h-5" />
                Buyurtma berish
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
