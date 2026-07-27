"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2 } from 'lucide-react';

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dataUz, setDataUz] = useState<any>({});
  const [dataRu, setDataRu] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data, error } = await supabase.from('about_content').select('*').eq('id', 1).single();
      console.log('fetchAbout response:', { data, error });
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        let parsedUz = data.data_uz;
        let parsedRu = data.data_ru;
        if (typeof parsedUz === 'string') parsedUz = JSON.parse(parsedUz);
        if (typeof parsedRu === 'string') parsedRu = JSON.parse(parsedRu);
        
        setDataUz(parsedUz || {});
        setDataRu(parsedRu || {});
        setImageUrl(data.image_url || "");
      }
    } catch (e: any) {
      console.error('fetchAbout error:', e);
      alert('Xatolik yuz berdi: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('about_content').upsert({ id: 1, data_uz: dataUz, data_ru: dataRu, image_url: imageUrl });
      if (error) throw error;
      alert('Muvaqqiyatli saqlandi!');
    } catch (e: any) {
      alert('Xatolik yuz berdi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUzChange = (key: string, value: string) => {
    setDataUz({ ...dataUz, [key]: value });
  };

  const handleRuChange = (key: string, value: string) => {
    setDataRu({ ...dataRu, [key]: value });
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `about_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `about/${fileName}`;

    setIsUploading(true);

    if (imageUrl) {
      try {
        const urlParts = imageUrl.split('/public/images/');
        if (urlParts.length === 2) {
          await supabase.storage.from('images').remove([urlParts[1]]);
        }
      } catch (err) {
        console.error("Old image deletion failed:", err);
      }
    }

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

    if (uploadError) {
      alert('Rasm yuklashda xatolik: ' + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
    setIsUploading(false);
  };
  
  if (loading) return <div className="flex justify-center h-64 items-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  const groups = [
    {
      title: "Sarlavha va Asosiy matn",
      keys: ["title", "p1", "p2", "p3", "li1", "li2", "li3", "li4"]
    },
    {
      title: "Afzalliklar (Pastdagi 3 karta)",
      keys: ["box1Title", "box1Desc", "box2Title", "box2Desc", "box3Title", "box3Desc"]
    }
  ];

  return (
     <div className="space-y-6 max-w-6xl pb-10">
       <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
         <h1 className="text-2xl font-bold">Biz haqimizda (About)</h1>
         <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
           {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
           Saqlash
         </button>
       </div>
       
       <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
         <h3 className="text-lg font-semibold border-b pb-2 text-gray-800 mb-4">Banner Rasmi</h3>
         <div className="flex items-center gap-4">
           {imageUrl && (
             <img src={imageUrl} alt="Banner" className="w-32 h-32 object-cover rounded shadow-sm border" />
           )}
           <div className="flex-1 max-w-sm">
             <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border rounded-md bg-white" disabled={isUploading} />
             {isUploading && <p className="text-sm text-blue-500 mt-2">Yuklanmoqda...</p>}
           </div>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-primary bg-white p-4 rounded-lg shadow-sm border-b-4 border-primary">O'zbek tili (UZ)</h2>
             {groups.map((group, idx) => (
               <div key={`uz-group-${idx}`} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                 <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">{group.title}</h3>
                 {group.keys.map(key => (
                   <div key={key}>
                     <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                     <textarea 
                       value={dataUz[key] || ''} 
                       onChange={(e) => handleUzChange(key, e.target.value)} 
                       className="w-full p-2 border rounded-md min-h-[80px] focus:ring-2 focus:ring-primary/20 outline-none" 
                     />
                   </div>
                 ))}
               </div>
             ))}
          </div>
          <div className="space-y-6">
             <h2 className="text-xl font-bold text-primary bg-white p-4 rounded-lg shadow-sm border-b-4 border-primary">Rus tili (RU)</h2>
             {groups.map((group, idx) => (
               <div key={`ru-group-${idx}`} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                 <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">{group.title}</h3>
                 {group.keys.map(key => (
                   <div key={key}>
                     <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                     <textarea 
                       value={dataRu[key] || ''} 
                       onChange={(e) => handleRuChange(key, e.target.value)} 
                       className="w-full p-2 border rounded-md min-h-[80px] focus:ring-2 focus:ring-primary/20 outline-none" 
                     />
                   </div>
                 ))}
               </div>
             ))}
          </div>
       </div>
     </div>
  );
}
