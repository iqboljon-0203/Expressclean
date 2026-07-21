import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz haqimizda | Express Clean",
  description: "Express Clean - Toshkentdagi professional tozalash kompaniyasi haqida ma'lumot. Bizning xizmatlar, kafolatlar va mijozlar ishonchi haqida batafsil.",
  openGraph: {
    title: "Biz haqimizda | Express Clean",
    description: "Express Clean - Toshkentdagi professional tozalash kompaniyasi haqida ma'lumot.",
    url: "https://expressclean.uz/about",
  },
  alternates: {
    canonical: "https://expressclean.uz/about",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
