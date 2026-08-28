import type { Metadata, ResolvingMetadata } from "next";
import "../globals.css";

import { getTranslations } from "next-intl/server";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { supabase } from "@/lib/supabase";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const baseUrl = "https://expressclean.uz";
  const canonicalUrl = locale === 'uz' ? baseUrl : `${baseUrl}/${locale}`;

  const { data: seoData } = await supabase
    .from('seo_settings')
    .select('*')
    .eq('id', 1)
    .single();

  const title = seoData?.[`title_${locale}`] || t('title');
  const description = seoData?.[`description_${locale}`] || t('description');
  const keywords = seoData?.[`keywords_${locale}`]?.split(',').map((k: string) => k.trim()) || [
      // 1. Asosiy va eng ko'p qidiriladigan (Core Keywords)
      "gilam yuvish", "gilam tozalash", "gilam yuvish xizmati", "gilam yuvish fabrikasi",
      "ximchistka xizmati", "kover yuvish", "gilam tozalash korxonasi",

      // 2. Xizmat turiga aniqlik kiritilgan (Long-tail Keywords)
      "joyiga borib gilam yuvish", "uydan chiqmay gilam yuvish", "joyida gilam tozalash",
      "yumshoq mebel yuvish", "yumshoq mebel tozalash", "divan yuvish", "divan tozalash",
      "parda yuvish xizmati", "adyol va ko'rpachalarni yuvish", "ko'rpacha tozalash",
      "gilamlarni quruq tozalash", "ipak gilamlarni yuvish", "turk gilamlarini tozalash",
      "ofis gilamlarini tozalash", "kovrolin yuvish toshkent",

      // 3. Tijorat va xaridga undovchi (Commercial Intent)
      "gilam yuvish narxlari", "gilam yuvish 1 kv metr narxi", "arzon gilam yuvish",
      "sifatli gilam yuvish", "gilam yuvish aksiyasi", "bepul olib ketish va yetkazib berish gilam yuvish",
      "kafolatli gilam tozalash", "express clean narxlari",

      // 4. Hududiy qidiruvlar (Local SEO)
      "toshkentda gilam yuvish", "andijonda gilam yuvish", "samarqandda gilam yuvish", "namanganda gilam yuvish",
      "gilam yuvish toshkent narxlari", "menga eng yaqin gilam yuvish", "gilam yuvish korxonasi manzili",
      "yunusobod gilam yuvish", "chilonzor gilam yuvish", "sergeli gilam yuvish",
      "mirzo ulug'bek gilam yuvish", "olmazor gilam yuvish", "uchtepa gilam yuvish",
      "yashnobod gilam yuvish", "shayxontohur gilam yuvish", "mirobod gilam yuvish", "jalaquduq gilam yuvish",

      // 5. Odamlarni qiynaydigan muammolar (Blog va FAQ)
      "gilamdagi dog'ni qanday ketkazish mumkin", "gilamdagi kofe dog'ini tozalash",
      "gilamdagi zax hidini yo'qotish", "gilamga yopishgan saqichni ketkazish",
      "chang kanalariga qarshi gilam yuvish", "kleshlarga qarshi tozalash",
      "gilam necha kunda quriydi", "gilamni uy sharoitida tozalash",

      // 6. Rus tilidagi qidiruvlar (Russian SEO for Uzbekistan)
      "химчистка ковров", "стирка ковров", "чистка ковров с вывозом",
      "мойка ковров Ташкент", "мойка ковров Андижан", "мойка ковров Самарканд",
      "химчистка мягкой мебели", "чистка диванов", "почистить ковер недорого",
      "цена стирки ковров за квадратный метр", "профессиональная стирка ковров",
      "удаление пятен с ковра", "стирка ковров чиланзар", "стирка ковров юнусабад",
      "фабрика стирки ковров", "стирка ковров с бесплатной доставкой",

      // English International
      "carpet cleaning tashkent", "carpet cleaning uzbekistan", "rug cleaning tashkent",
      "sofa cleaning tashkent", "professional cleaning service tashkent"
    ];

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Express Clean — ${locale === 'uz' ? 'Gilam Yuvish Xizmati' : 'Чистка Ковров'}`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: "Express Clean", url: baseUrl }],
    creator: "Express Clean",
    publisher: "Express Clean",
    category: locale === 'uz' ? 'Tozalash xizmatlari' : 'Клининговые услуги',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'uz-UZ': baseUrl,
        'ru-RU': `${baseUrl}/ru`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
      alternateLocale: locale === 'uz' ? 'ru_RU' : 'uz_UZ',
      url: canonicalUrl,
      title: title,
      description: description,
      siteName: "Express Clean",
      countryName: "Uzbekistan",
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 800,
          height: 600,
          alt: locale === 'uz'
            ? "Express Clean — Toshkentda professional gilam yuvish xizmati"
            : "Express Clean — Профессиональная чистка ковров в Ташкенте",
          type: "image/png",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        {
          url: `${baseUrl}/logo.png`,
          alt: "Express Clean Logo",
        }
      ],
      site: "@expresscleanuz",
      creator: "@expresscleanuz",
    },
    other: {
      'geo.region': 'UZ-TK',
      'geo.placename': 'Tashkent',
      'geo.position': '41.2995;69.2401',
      'ICBM': '41.2995, 69.2401',
    },
  };
}
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Highly detailed LocalBusiness + CleaningService JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": "https://expressclean.uz/#organization",
    "name": "Express Clean",
    "alternateName": locale === 'uz' ? "Express Clean Gilam Yuvish" : "Экспресс Клин Чистка Ковров",
    "description": locale === 'uz'
      ? "Toshkentda professional gilam yuvish, mebel tozalash, parda yuvish va adyol tozalash xizmati. 24/7 bepul olib ketish va yetkazib berish."
      : "Профессиональная чистка ковров, химчистка мебели, стирка штор и одеял в Ташкенте. Бесплатная доставка 24/7.",
    "image": [
      "https://expressclean.uz/logo.png",
      "https://expressclean.uz/og-image.jpg"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://expressclean.uz/logo.png",
      "width": 800,
      "height": 600
    },
    "url": "https://expressclean.uz",
    "telephone": "+998950094859",
    "email": "info@expressclean.uz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chilonzor tumani",
      "addressLocality": "Toshkent",
      "addressRegion": "Toshkent shahri",
      "postalCode": "100000",
      "addressCountry": {
        "@type": "Country",
        "name": "UZ"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2995,
      "longitude": 69.2401
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Tashkent",
        "sameAs": "https://en.wikipedia.org/wiki/Tashkent"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Tashkent Region"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "isOpen24Hours": true,
    "priceRange": "$$",
    "currenciesAccepted": "UZS",
    "paymentAccepted": "Cash, Credit Card, Payme, Click, Uzum",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'uz' ? "Tozalash xizmatlari" : "Услуги чистки",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": locale === 'uz' ? "Gilam yuvish" : "Стирка ковров",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Gilam yuvish (standart)" : "Стирка ковров (стандарт)",
                "description": locale === 'uz'
                  ? "Professional usulda gilam yuvish, quritish va yetkazib berish"
                  : "Профессиональная стирка, сушка и доставка ковров"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Gilam kimyoviy tozalash" : "Химчистка ковров",
                "description": locale === 'uz'
                  ? "Nozik va qimmatbaho gilamlar uchun kimyoviy tozalash"
                  : "Химчистка деликатных и дорогих ковров"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": locale === 'uz' ? "Mebel tozalash" : "Чистка мебели",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Divan yuvish" : "Чистка диванов",
                "description": locale === 'uz'
                  ? "Uyda divan va yumshoq mebel kimyoviy tozalash"
                  : "Химчистка диванов и мягкой мебели на дому"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Matras tozalash" : "Чистка матрасов",
                "description": locale === 'uz'
                  ? "Matraslarni chuqur tozalash va dezinfeksiya qilish"
                  : "Глубокая чистка и дезинфекция матрасов"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": locale === 'uz' ? "Parda va adyol yuvish" : "Стирка штор и одеял",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Parda yuvish" : "Стирка штор",
                "description": locale === 'uz'
                  ? "Har xil turdagi pardalarni professional yuvish"
                  : "Профессиональная стирка штор всех видов"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": locale === 'uz' ? "Adyol yuvish" : "Стирка одеял",
                "description": locale === 'uz'
                  ? "Adyollarni chuqur yuvish va tozalash"
                  : "Глубокая стирка и чистка одеял"
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "1200",
      "reviewCount": "850"
    },
    "sameAs": [
      "https://www.instagram.com/expressclean.uz",
      "https://t.me/expresscleanuz",
      "https://www.facebook.com/expressclean.uz"
    ],
    "founder": {
      "@type": "Person",
      "name": "Express Clean Team"
    },
    "foundingDate": "2020",
    "knowsLanguage": ["uz", "ru", "en"],
    "slogan": locale === 'uz'
      ? "Toza gilam — baxtli oila!"
      : "Чистый ковёр — счастливый дом!",
    "hasMap": "https://maps.google.com/?q=Express+Clean+Tashkent"
  };

  // WebSite schema for sitelinks search box
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://expressclean.uz/#website",
    "url": "https://expressclean.uz",
    "name": "Express Clean",
    "description": locale === 'uz'
      ? "Toshkentda #1 gilam yuvish xizmati"
      : "Чистка ковров №1 в Ташкенте",
    "publisher": {
      "@id": "https://expressclean.uz/#organization"
    },
    "inLanguage": locale === 'uz' ? "uz-UZ" : "ru-RU"
  };

  return (
    <html lang={locale} className="antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
        <GoogleTagManager gtmId="GTM-K72PRCRF" />
        <GoogleAnalytics gaId="G-BE6Y6N2KQP" />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
