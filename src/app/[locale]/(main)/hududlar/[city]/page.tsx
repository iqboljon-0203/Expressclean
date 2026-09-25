import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { services } from "@/data/services";
import { CityPageClient } from "./CityPageClient";

type Props = {
  params: Promise<{ locale: string; city: string }>;
};

// Pre-generate all city pages at build time
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

// Dynamic SEO metadata per city
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: "Hudud topilmadi",
      description: "So'ralgan hudud topilmadi.",
    };
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";
  const canonicalUrl =
    locale === "uz"
      ? `${baseUrl}/hududlar/${city}`
      : `${baseUrl}/${locale}/hududlar/${city}`;

  return {
    title: cityData.metaTitle[lang],
    description: cityData.metaDescription[lang],
    keywords: cityData.keywords[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uz-UZ": `${baseUrl}/hududlar/${city}`,
        "ru-RU": `${baseUrl}/ru/hududlar/${city}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      alternateLocale: locale === "uz" ? "ru_RU" : "uz_UZ",
      url: canonicalUrl,
      title: cityData.metaTitle[lang],
      description: cityData.metaDescription[lang],
      siteName: "Express Clean",
      countryName: "Uzbekistan",
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 800,
          height: 600,
          alt: `Express Clean — ${cityData.name[lang]}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cityData.metaTitle[lang],
      description: cityData.metaDescription[lang],
      images: [`${baseUrl}/logo.png`],
    },
    other: {
      "geo.region": "UZ",
      "geo.placename": cityData.name.uz,
      "geo.position": `${cityData.geo.latitude};${cityData.geo.longitude}`,
      ICBM: `${cityData.geo.latitude}, ${cityData.geo.longitude}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";

  // LocalBusiness JSON-LD with city-specific data
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": `${baseUrl}/hududlar/${city}#localbusiness`,
    name: `Express Clean — ${cityData.name[lang]}`,
    description: cityData.longDescription[lang],
    image: `${baseUrl}/logo.png`,
    url: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}hududlar/${city}`,
    telephone: "+998334060006",
    email: "info@expressclean.uz",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityData.name.uz,
      addressRegion: cityData.region.uz,
      addressCountry: {
        "@type": "Country",
        name: "UZ",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cityData.geo.latitude,
      longitude: cityData.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: cityData.name.uz,
      sameAs: `https://en.wikipedia.org/wiki/${encodeURIComponent(cityData.name.uz)}`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    isOpen24Hours: true,
    priceRange: "$$",
    currenciesAccepted: "UZS",
    paymentAccepted: "Cash, Credit Card, Payme, Click, Uzum",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "uz"
        ? `${cityData.name[lang]}da tozalash xizmatlari`
        : `Услуги чистки в ${cityData.name[lang]}е`,
      itemListElement: services.slice(0, 3).map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.title[lang],
          description: svc.description[lang],
        },
      })),
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: cityData.testimonial.name,
      },
      reviewBody: cityData.testimonial.text[lang],
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "uz" ? "Bosh sahifa" : "Главная",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "uz" ? "Hududlar" : "Регионы",
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}hududlar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityData.name[lang],
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}hududlar/${city}`,
      },
    ],
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <CityPageClient city={cityData} locale={lang} />
    </>
  );
}
