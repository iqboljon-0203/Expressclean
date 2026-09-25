import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPostBySlug,
  getAllPostSlugs,
  blogPosts,
} from "@/data/blog";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Phone,
  ArrowRight,
  BookOpen,
  User,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Static rendering: Pre-generate all blog post paths at build time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic SEO metadata per blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Maqola topilmadi",
      description: "So'ralgan maqola mavjud emas.",
    };
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";
  const canonicalUrl =
    locale === "uz"
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: post.metaTitle[lang],
    description: post.metaDescription[lang],
    keywords: post.keywords[lang],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uz-UZ": `${baseUrl}/blog/${slug}`,
        "ru-RU": `${baseUrl}/ru/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      tags: post.tags[lang],
      url: canonicalUrl,
      title: post.metaTitle[lang],
      description: post.metaDescription[lang],
      siteName: "Express Clean",
      images: [
        {
          url: `${baseUrl}${post.coverImage}`,
          width: 800,
          height: 600,
          alt: post.coverImageAlt[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle[lang],
      description: post.metaDescription[lang],
      images: [`${baseUrl}${post.coverImage}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const baseUrl = "https://expressclean.uz";
  const content = post.content[lang];
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Article (BlogPosting) JSON-LD schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/blog/${slug}#article`,
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: `${baseUrl}${post.coverImage}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: lang === "uz" ? "uz-UZ" : "ru-RU",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale === "uz" ? "" : locale + "/"}blog/${slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role[lang],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://expressclean.uz/#organization",
      name: "Express Clean",
      logo: {
        "@type": "ImageObject",
        url: "https://expressclean.uz/logo.png",
      },
    },
    keywords: post.tags[lang].join(", "),
    articleSection: post.category[lang],
  };

  // BreadcrumbList JSON-LD schema
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
        name: lang === "uz" ? "Blog" : "Блог",
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title[lang],
        item: `${baseUrl}/${locale === "uz" ? "" : locale + "/"}blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>

      <div className="min-h-screen bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Blog */}
          <nav aria-label="Breadcrumbs" className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === "uz" ? "Barcha maqolalar" : "Все статьи"}</span>
            </Link>
          </nav>

          {/* Main Article */}
          <article className="prose-headings:font-bold">
            {/* Article Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4">
                <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
                  {post.category[lang]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime[lang]}
                </span>
                <span>•</span>
                <time dateTime={post.datePublished} className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.datePublished).toLocaleDateString(
                    lang === "uz" ? "uz-UZ" : "ru-RU",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </time>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                {post.title[lang]}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium mb-6">
                {post.excerpt[lang]}
              </p>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground text-base">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.author.role[lang]}
                  </div>
                </div>
              </div>
            </header>

            {/* Featured Image with Figcaption */}
            <figure className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt[lang]}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
              <figcaption className="p-4 bg-gray-50 text-xs text-muted-foreground text-center italic">
                {post.coverImageAlt[lang]}
              </figcaption>
            </figure>

            {/* Article Body Content */}
            <div className="space-y-8 text-foreground/90 text-base md:text-lg leading-relaxed">
              {/* Intro */}
              <p className="font-medium text-lg md:text-xl text-foreground leading-relaxed bg-blue-50/50 p-6 rounded-2xl border-l-4 border-primary">
                {content.intro}
              </p>

              {/* Sections */}
              {content.sections.map((sec, idx) => (
                <section key={idx} className="pt-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    {sec.heading}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {sec.text}
                  </p>

                  {/* Tips list if any */}
                  {sec.tips && sec.tips.length > 0 && (
                    <aside className="bg-green-50/70 rounded-2xl p-6 border border-green-200/50">
                      <h3 className="font-bold text-green-900 text-base mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{lang === "uz" ? "Foydali tavsiyalar:" : "Полезные советы:"}</span>
                      </h3>
                      <ul className="space-y-2">
                        {sec.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2.5 text-sm md:text-base text-green-950">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}

                  {/* Warning if any */}
                  {sec.warning && (
                    <aside className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex items-start gap-3.5">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-amber-950 font-medium leading-relaxed">
                        {sec.warning}
                      </p>
                    </aside>
                  )}
                </section>
              ))}

              {/* Conclusion */}
              <section className="pt-6 border-t border-gray-100">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                  {lang === "uz" ? "Xulosa" : "Заключение"}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {content.conclusion}
                </p>
              </section>
            </div>

            {/* Tags */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground mr-2">
                  {lang === "uz" ? "Teglar:" : "Теги:"}
                </span>
                {post.tags[lang].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>

          {/* In-Article Promotion Callout */}
          <div className="mt-16 bg-gradient-to-br from-primary via-primary-hover to-blue-900 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Express Clean</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                {lang === "uz"
                  ? "Dog'lar ketmadimi? Xavotir olmang!"
                  : "Не удалось вывести пятно самостоятельно?"}
              </h2>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6">
                {lang === "uz"
                  ? "Professional ekstraktorlar va organik gipoallergen eko shampunlar yordamida gilamingizni tozalab beramiz. Toshkent bo'ylab bepul yetkazish!"
                  : "Наши мастера бережно очистят ваш ковёр на профессиональном оборудовании Karcher. Бесплатный вывоз и доставка по Ташкенту!"}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+998334060006"
                  className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3.5 rounded-xl hover:shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>+998 33 406 00 06</span>
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/30 transition-all"
                >
                  <span>{lang === "uz" ? "Ariza qoldirish" : "Оставить заявку"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-gray-100" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                {lang === "uz" ? "O'xshash maqolalar" : "Похожие статьи"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <article
                    key={rel.slug}
                    className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200/70 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-3">
                        {rel.category[lang]}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                        <Link href={`/blog/${rel.slug}`}>
                          {rel.title[lang]}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-4 leading-relaxed">
                        {rel.excerpt[lang]}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-xs font-bold mt-auto group-hover:translate-x-1 transition-transform"
                    >
                      <span>{lang === "uz" ? "O'qish" : "Читать"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
