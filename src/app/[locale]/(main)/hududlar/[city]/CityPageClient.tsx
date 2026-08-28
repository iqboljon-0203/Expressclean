"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  CheckCircle2,
  Star,
  Truck,
  Clock,
  Shield,
  ArrowRight,
  Quote,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";
import type { CityData } from "@/data/cities";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

interface CityPageClientProps {
  city: CityData;
  locale: "uz" | "ru";
}

export function CityPageClient({ city, locale }: CityPageClientProps) {
  const otherCities = cities.filter((c) => c.slug !== city.slug);
  const topServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — Geo-targeted */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-blue-900 text-white">
        {/* Decorative map pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        {/* Decorative circles */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full mb-8 border border-white/20"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              {city.region[locale]}
            </span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
            >
              {city.heroHeadline[locale]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
            >
              {city.heroSubtitle[locale]}
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="tel:+998950094859"
                className="inline-flex items-center gap-3 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-black/10 transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                +998 95 009 48 59
              </a>
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-contact-modal"))
                }
                className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/25 transition-all hover:-translate-y-0.5"
              >
                {locale === "uz" ? "Bepul konsultatsiya" : "Бесплатная консультация"}
              </button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  icon: <Users className="w-5 h-5" />,
                  value: city.population,
                  label: locale === "uz" ? "Aholi" : "Население",
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  value: "4.9/5",
                  label: locale === "uz" ? "Reyting" : "Рейтинг",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  value: "24/7",
                  label: locale === "uz" ? "Ish vaqti" : "Режим работы",
                },
                {
                  icon: <Truck className="w-5 h-5" />,
                  value: locale === "uz" ? "Bepul" : "Бесплатно",
                  label: locale === "uz" ? "Yetkazish" : "Доставка",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-1 text-white/70">
                    {stat.icon}
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* City Description Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Main content — 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {locale === "uz"
                  ? `${city.name[locale]}da Express Clean`
                  : `Express Clean в ${city.name[locale]}е`}
              </h2>
              <div className="w-16 h-1.5 bg-primary rounded-full mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {city.longDescription[locale]}
              </p>

              {/* Landmark callout */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">
                    {locale === "uz" ? "Mashhur joylar" : "Известные места"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {city.landmark[locale]}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar — highlights — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {locale === "uz"
                    ? `${city.name[locale]} uchun maxsus`
                    : `Специально для ${city.name[locale]}а`}
                </h3>

                <ul className="space-y-4">
                  {city.serviceHighlights[locale].map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm font-medium">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href="tel:+998950094859"
                    className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-hover text-white font-bold px-6 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Phone className="w-5 h-5" />
                    {locale === "uz" ? "Qo'ng'iroq qilish" : "Позвонить"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Available in this City */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === "uz"
                ? `${city.name[locale]}da mavjud xizmatlar`
                : `Доступные услуги в ${city.name[locale]}е`}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "uz"
                ? `${city.name[locale]} shahri va atrofidagi barcha hududlarga xizmat ko'rsatamiz`
                : `Обслуживаем город ${city.name[locale]} и все прилегающие территории`}
            </p>
            <div className="w-16 h-1.5 bg-primary rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topServices.map((svc, index) => (
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
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title[locale]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {svc.title[locale]}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {svc.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {svc.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-8">
              <Quote className="w-8 h-8" />
            </div>

            <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 italic">
              &ldquo;{city.testimonial.text[locale]}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {city.testimonial.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">
                  {city.testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {city.testimonial.district[locale]}
                </p>
              </div>
              <div className="flex gap-0.5 ml-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Truck className="w-7 h-7 text-primary" />,
                title:
                  locale === "uz"
                    ? `${city.name[locale]} bo'ylab bepul yetkazish`
                    : `Бесплатная доставка по ${city.name[locale]}у`,
                desc:
                  locale === "uz"
                    ? "Shahar va atrofdagi hududlarga bepul olib ketish va yetkazib berish"
                    : "Бесплатный вывоз и доставка по городу и окрестностям",
              },
              {
                icon: <Shield className="w-7 h-7 text-primary" />,
                title:
                  locale === "uz" ? "100% sifat kafolati" : "100% гарантия качества",
                desc:
                  locale === "uz"
                    ? "Natijadan qoniqmasangiz — bepul qayta tozalaymiz"
                    : "Если результат не устроит — бесплатная повторная чистка",
              },
              {
                icon: <Clock className="w-7 h-7 text-primary" />,
                title: locale === "uz" ? "24/7 ishlаymiz" : "Работаем 24/7",
                desc:
                  locale === "uz"
                    ? "Istalgan vaqtda qo'ng'iroq qiling — doimo aloqadamiz"
                    : "Звоните в любое время — мы всегда на связи",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{city.name[locale]}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === "uz"
                ? `${city.name[locale]}da gilam yuvish kerakmi?`
                : `Нужна стирка ковров в ${city.name[locale]}е?`}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              {locale === "uz"
                ? "Hoziroq qo'ng'iroq qiling — 15 daqiqa ichida bog'lanamiz va gilamingizni olib ketamiz!"
                : "Позвоните прямо сейчас — свяжемся в течение 15 минут и заберём ваш ковёр!"}
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

      {/* Other Cities */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === "uz"
                ? "Boshqa shaharlarda ham xizmat ko'rsatamiz"
                : "Работаем и в других городах"}
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherCities.map((c, index) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/hududlar/${c.slug}`}
                  className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all group text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {c.name[locale]}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {c.region[locale]}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {locale === "uz" ? "Batafsil" : "Подробнее"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
