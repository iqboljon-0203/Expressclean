import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { supabase } from "@/lib/supabase";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: footerData } = await supabase
    .from("footer_content")
    .select("phone")
    .eq("id", 1)
    .single();
    
  const phone = footerData?.phone || "+998 95 009 48 59";

  return (
    <>
      <Navbar phone={phone} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileStickyBar phone={phone} />
    </>
  );
}
