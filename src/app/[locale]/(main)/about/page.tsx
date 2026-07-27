import { getLocale } from "next-intl/server";
import { supabase } from "@/lib/supabase";
import { AboutClient } from "./AboutClient";

export default async function AboutPage() {
  const locale = await getLocale();

  // Baza ma'lumotlarini olish
  const { data: aboutData } = await supabase
    .from("about_content")
    .select("*")
    .eq("id", 1)
    .single();

  let currentData = null;
  if (aboutData) {
    currentData = typeof aboutData[`data_${locale}`] === 'string' 
      ? JSON.parse(aboutData[`data_${locale}`]) 
      : aboutData[`data_${locale}`] || {};
      
    currentData.image_url = aboutData.image_url;
  }

  return <AboutClient initialData={currentData} />;
}
