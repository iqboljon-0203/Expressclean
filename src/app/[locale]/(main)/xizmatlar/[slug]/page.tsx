import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { ServicePageClient } from "./ServicePageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Pre-generate all service slug + locale combinations at build time
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic SEO metadata per service slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Xizmat topilmadi",
      description: "So'ralgan xizmat topilmadi.",
    };
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";
  const canonicalUrl =
    locale === "uz"
      ? `${baseUrl}/xizmatlar/${slug}`
      : `${baseUrl}/${locale}/xizmatlar/${slug}`;

  return {
    title: service.metaTitle[lang],
    description: service.metaDescription[lang],
    keywords: service.keywords[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uz-UZ": `${baseUrl}/xizmatlar/${slug}`,
        "ru-RU": `${baseUrl}/ru/xizmatlar/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      alternateLocale: locale === "uz" ? "ru_RU" : "uz_UZ",
      url: canonicalUrl,
      title: service.metaTitle[lang],
      description: service.metaDescription[lang],
      siteName: "Express Clean",
      images: [
        {
          url: `${baseUrl}${service.image}`,
          width: 800,
          height: 600,
          alt: service.title[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle[lang],
      description: service.metaDescription[lang],
      images: [`${baseUrl}${service.image}`],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";

  // Service-specific JSON-LD schema
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/xizmatlar/${slug}#service`,
    name: service.title[lang],
    description: service.longDescription[lang],
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://expressclean.uz/#organization",
      name: "Express Clean",
      telephone: "+998950094859",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toshkent",
        addressRegion: "Toshkent shahri",
        addressCountry: "UZ",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Tashkent",
    },
    serviceType: service.title[lang],
    image: `${baseUrl}${service.image}`,
    url: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}xizmatlar/${slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "UZS",
      description: service.price,
      availability: "https://schema.org/InStock",
    },
  };

  // BreadcrumbList JSON-LD for rich snippet navigation
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
        name: lang === "uz" ? "Xizmatlar" : "Услуги",
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}#xizmatlar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title[lang],
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}xizmatlar/${slug}`,
      },
    ],
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <ServicePageClient service={service} locale={lang} />
    </>
  );
}
