import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expressclean.uz"),
  title: "Express Clean | Toshkentda Gilam va Mebel Tozalash",
  description: "Toshkentda gilam, yumshoq mebel, parda va adiyollarni chuqur tozalash va yuvish xizmati. 1-3 kunda bepul olib ketib, toza qilib yetkazamiz. Sifat kafolati 100%.",
  keywords: [
    "gilam yuvish toshkent",
    "mebel tozalash",
    "divan yuvish",
    "parda tozalash",
    "express clean",
    "gilam tozalash narxlari",
    "toshkent tozalash xizmati"
  ],
  authors: [{ name: "Express Clean" }],
  creator: "Express Clean",
  publisher: "Express Clean",
  robots: "index, follow",
  alternates: {
    canonical: "https://expressclean.uz",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://expressclean.uz",
    title: "Express Clean | Toshkentda Gilam va Mebel Tozalash",
    description: "Toshkentda gilam va yumshoq mebellarni chuqur tozalash xizmati. Sifatga kafolat beramiz!",
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
    title: "Express Clean | Toshkentda Gilam va Mebel Tozalash",
    description: "Toshkentda gilam va yumshoq mebellarni chuqur tozalash xizmati. Sifatga kafolat beramiz!",
    images: ["/logo.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${poppins.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
