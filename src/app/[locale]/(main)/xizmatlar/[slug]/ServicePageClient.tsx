"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  Clock,
  Truck,
  Shield,
  SplitSquareHorizontal,
  Home,
  Sofa,
  Layers,
  BedDouble,
  Sparkles,
} from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";
import type { ServiceData } from "@/data/services";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  SplitSquareHorizontal: <SplitSquareHorizontal className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Sofa: <Sofa className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  BedDouble: <BedDouble className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
};

interface ServicePageClientProps {
  service: ServiceData;
  locale: "uz" | "ru";
}

export function ServicePageClient({ service, locale }: ServicePageClientProps) {
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50/50 to-white" />
        
        <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/#xizmatlar"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">
                {locale === "uz" ? "Barcha xizmatlar" : "Все услуги"}
              </span>
            </Link>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              {/* Icon badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6"
              >
                {iconMap[service.icon] || <Sparkles className="w-8 h-8" />}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight"
              >
                {service.title[locale]}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
              >
                {service.description[locale]}
              </motion.p>

              {/* Price tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <div className="bg-primary/10 text-primary font-bold text-xl px-6 py-3 rounded-2xl">
                  {service.price}
                </div>
                <span className="text-sm text-muted-foreground max-w-xs">
                  {service.priceNote[locale]}
                </span>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="tel:+998950094859"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  {locale === "uz" ? "Qo'ng'iroq qilish" : "Позвонить"}
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                  className="inline-flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-primary text-foreground font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  {locale === "uz" ? "Buyurtma berish" : "Оставить заявку"}
                </button>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                  src={service.image}
                  alt={service.title[locale]}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Floating stats badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -left-4 bottom-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === "uz" ? "Kafolat" : "Гарантия"}
                  </p>
                  <p className="text-sm font-bold text-foreground">100%</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {locale === "uz" ? "Ish vaqti" : "Режим работы"}
                  </p>
                  <p className="text-sm font-bold text-foreground">24/7</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === "uz" ? "Xizmat afzalliklari" : "Преимущества услуги"}
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features[locale].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium pt-1.5">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                {locale === "uz"
                  ? `${service.title[locale]} xizmati haqida batafsil`
                  : `Подробнее об услуге: ${service.title[locale]}`}
              </h2>
              <div className="w-16 h-1.5 bg-primary rounded-full mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.longDescription[locale]}
              </p>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-3 gap-6 mt-12"
            >
              {[
                {
                  icon: <Truck className="w-6 h-6 text-primary" />,
                  title: locale === "uz" ? "Bepul yetkazish" : "Бесплатная доставка",
                  desc:
                    locale === "uz"
                      ? "Toshkent bo'ylab bepul olib ketish va yetkazib berish"
                      : "Бесплатная доставка по всему Ташкенту",
                },
                {
                  icon: <Shield className="w-6 h-6 text-primary" />,
                  title: locale === "uz" ? "Sifat kafolati" : "Гарантия качества",
                  desc:
                    locale === "uz"
                      ? "Natijadan qoniqmasangiz bepul qayta tozalaymiz"
                      : "Бесплатная повторная чистка при неудовлетворительном результате",
                },
                {
                  icon: <Clock className="w-6 h-6 text-primary" />,
                  title: locale === "uz" ? "Tez xizmat" : "Быстрый сервис",
                  desc:
                    locale === "uz"
                      ? "1-2 ish kuni ichida tayyor"
                      : "Готовность за 1-2 рабочих дня",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === "uz"
                ? "Hoziroq buyurtma bering!"
                : "Закажите прямо сейчас!"}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              {locale === "uz"
                ? "Qo'ng'iroq qiling yoki ariza qoldiring — biz 15 daqiqa ichida bog'lanamiz"
                : "Позвоните или оставьте заявку — мы свяжемся с вами в течение 15 минут"}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+998950094859"
                className="inline-flex items-center gap-3 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                +998 95 009 48 59
              </a>
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-contact-modal"))
                }
                className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm text-white border-2 border-white/30 font-bold px-8 py-4 rounded-2xl hover:bg-white/25 transition-all hover:-translate-y-0.5"
              >
                {locale === "uz" ? "Ariza qoldirish" : "Оставить заявку"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === "uz" ? "Boshqa xizmatlarimiz" : "Другие наши услуги"}
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherServices.map((svc, index) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/xizmatlar/${svc.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all group h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title[locale]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-primary">
                      {iconMap[svc.icon] ? (
                        <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                          {iconMap[svc.icon]}
                        </div>
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {svc.title[locale]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {svc.description[locale]}
                    </p>
                    <span className="inline-block text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {svc.price}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
