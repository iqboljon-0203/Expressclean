import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, User } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const baseUrl = "https://expressclean.uz";
  const canonicalUrl = isUz ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  const title = isUz
    ? "Foydali Maqolalar va Maslahatlar — Gilam va Mebel Tozalash Blogi | Express Clean"
    : "Полезные Статьи и Советы — Блог о Стирке Ковров и Чистке Мебели | Express Clean";

  const description = isUz
    ? "Gilam, divan va pardalarni tozalash, dog'larni ketkazish, kleshlardan himoyalanish va to'g'ri quritish bo'yicha mutaxassis maslahatlari."
    : "Экспертные советы по стирке ковров, химчистке мягкой мебели, выведению сложных пятен и правильному уходу за текстилем.";

  return {
    title,
    description,
    keywords: [
      "gilam tozalash blogi",
      "kofe dog'ini ketkazish",
      "gilam quritish usullari",
      "divan tozalash maslahatlari",
      "блог о стирке ковров",
      "как вывести пятна с ковра",
      "химчистка мебели советы",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uz-UZ": `${baseUrl}/blog`,
        "ru-RU": `${baseUrl}/ru/blog`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "Express Clean",
      images: [
        {
          url: `${baseUrl}/service1_v3.png`,
          width: 800,
          height: 600,
          alt: "Express Clean Blog",
        },
      ],
    },
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  const lang = (locale === "ru" ? "ru" : "uz") as "uz" | "ru";
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span>{lang === "uz" ? "Foydali Blog" : "Блог Экспертов"}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            {lang === "uz"
              ? "Tozalik va Parvarish Sirlari"
              : "Секреты Чистоты и Ухода за Домом"}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {lang === "uz"
              ? "Gilam, mebel va pardalarni tozalash, dog'larni ketkazish va kleshlardan himoyalanish bo'yicha mutaxassis qo'llanmalari."
              : "Профессиональные советы по выведению сложных пятен, уходу за коврами и мебели от технологов Express Clean."}
          </p>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <section aria-labelledby="featured-post-heading" className="mb-16">
            <h2 id="featured-post-heading" className="sr-only">
              {lang === "uz" ? "Tavsiya etilgan maqola" : "Рекомендуемая статья"}
            </h2>

            <article className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 grid lg:grid-cols-12 hover:shadow-xl transition-all duration-300 group">
              <div className="lg:col-span-7 relative h-72 lg:h-full min-h-[300px] overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt[lang]}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {lang === "uz" ? "Eng ommabop" : "Популярное"}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {featuredPost.category[lang]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime[lang]}
                    </span>
                    <time dateTime={featuredPost.datePublished} className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredPost.datePublished).toLocaleDateString(lang === "uz" ? "uz-UZ" : "ru-RU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title[lang]}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {featuredPost.excerpt[lang]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {featuredPost.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform"
                  >
                    <span>{lang === "uz" ? "O'qish" : "Читать"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section aria-labelledby="all-articles-heading">
          <div className="flex items-center justify-between mb-8">
            <h2 id="all-articles-heading" className="text-2xl font-bold text-foreground">
              {lang === "uz" ? "Barcha Maqolalar" : "Все Статьи"}
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full hidden sm:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {post.category[lang]}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime[lang]}
                    </span>
                    <span>•</span>
                    <time dateTime={post.datePublished}>
                      {new Date(post.datePublished).toLocaleDateString(lang === "uz" ? "uz-UZ" : "ru-RU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title[lang]}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                    {post.excerpt[lang]}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground font-medium">
                      {post.author.name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:translate-x-1 transition-transform"
                    >
                      <span>{lang === "uz" ? "Batafsil" : "Подробнее"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blog CTA Banner */}
        <section className="mt-20 bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              {lang === "uz"
                ? "Gilamingizni tozalashga vaqtingiz yo'qmi?"
                : "Нет времени чистить ковры самостоятельно?"}
            </h2>
            <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed">
              {lang === "uz"
                ? "Express Clean jamoasi bepul olib ketib, Karcher va sentrifuga uskunalarida 100% toza qilib yetkazib beradi!"
                : "Специалисты Express Clean бесплатно заберут, бережно отстирают и вернут ваши ковры идеально чистыми!"}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>{lang === "uz" ? "Xizmatga buyurtma berish" : "Заказать чистку"}</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
