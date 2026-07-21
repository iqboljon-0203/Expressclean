import type { Metadata, ResolvingMetadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { getTranslations } from "next-intl/server";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const baseUrl = "https://expressclean.uz";
  const canonicalUrl = locale === 'uz' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: [
      "gilam yuvish", "gilam yuvish toshkent", "gilam tozalash", "gilam yuvish narxlari", "gilam yuvish xizmati",
      "mebel tozalash", "mebel yuvish", "divan yuvish", "yumshoq mebel tozalash",
      "parda yuvish", "parda tozalash", "adyol yuvish", "toshkentda gilam yuvish",
      "express clean gilam yuvish", "tozalash xizmati toshkent",
      "чистка ковров", "чистка ковров ташкент", "стирка ковров", "стирка ковров ташкент",
      "химчистка ковров", "мойка ковров", "химчистка мягкой мебели", "чистка диванов",
      "химчистка штор", "чистка ковров цены", "клининг ташкент", "express clean ташкент"
    ],
    authors: [{ name: "Express Clean" }],
    creator: "Express Clean",
    publisher: "Express Clean",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
      title: t('title'),
      description: t('description'),
      siteName: "Express Clean",
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          alt: "Express Clean Logo",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/logo.png"],
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

  // LocalBusiness Schema for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Express Clean",
    "image": "https://expressclean.uz/logo.png",
    "@id": "https://expressclean.uz",
    "url": "https://expressclean.uz",
    "telephone": "+998948500006",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toshkent",
      "addressRegion": "Toshkent shahri",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2995, // Approximate coordinates for Tashkent
      "longitude": 69.2401
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "priceRange": "$$"
  };

  return (
    <html lang={locale} className={`${poppins.variable} antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
        <GoogleTagManager gtmId="GTM-K72PRCRF" />
        <GoogleAnalytics gaId="G-BE6Y6N2KQP" />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileStickyBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
