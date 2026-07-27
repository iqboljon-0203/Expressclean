"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";

interface ServiceData {
  id: string;
  title_uz: string;
  title_ru: string;
  price: string;
  description_uz: string;
  description_ru: string;
  image_url: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceData>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [headerId, setHeaderId] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState({
    title_uz: "",
    title_ru: "",
    subtitle_uz: "",
    subtitle_ru: ""
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchHeader();
  }, []);

  async function fetchHeader() {
    const { data, error } = await supabase.from("services_header").select("*").limit(1).single();
    if (data && !error) {
      setHeaderId(data.id);
      setHeaderData({
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        subtitle_uz: data.subtitle_uz,
        subtitle_ru: data.subtitle_ru
      });
    }
  }

  async function fetchServices() {
    setIsLoading(true);
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: true });
    console.log("Services fetched:", data, error);
    if (error) {
      alert("Error fetching services: " + error.message);
    }
    if (data && !error) {
      setServices(data);
    }
    setIsLoading(false);
  }

  async function handleSaveHeader(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingHeader(true);
    try {
      if (headerId) {
        await supabase.from("services_header").update(headerData).eq("id", headerId);
      } else {
        const { data } = await supabase.from("services_header").insert([headerData]).select();
        if (data && data.length > 0) setHeaderId(data[0].id);
      }
      alert("Sarlavha saqlandi!");
    } catch (err) {
      alert("Xato yuz berdi.");
    }
    setIsSavingHeader(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `service_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    setIsUploading(true);

    if (currentService.image_url) {
      try {
        const urlParts = currentService.image_url.split('/public/images/');
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
    setCurrentService({ ...currentService, image_url: data.publicUrl });
    setIsUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (currentService.id) {
      // Update
      const { error } = await supabase.from("services").update(currentService).eq("id", currentService.id);
      if (!error) {
        setIsEditing(false);
        fetchServices();
      } else {
        alert("Xatolik yuz berdi");
      }
    } else {
      // Insert
      const { error } = await supabase.from("services").insert([currentService]);
      if (!error) {
        setIsEditing(false);
        fetchServices();
      } else {
        alert("Xatolik yuz berdi");
      }
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      const serviceToDelete = services.find(s => s.id === id);
      if (serviceToDelete && serviceToDelete.image_url) {
        try {
          const urlParts = serviceToDelete.image_url.split('/public/images/');
          if (urlParts.length === 2) {
            await supabase.storage.from('images').remove([urlParts[1]]);
          }
        } catch (err) {
          console.error("Service image deletion failed:", err);
        }
      }

      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) fetchServices();
    }
  }

  return (
    <div className="space-y-8">
      {/* --- HEADER EDIT SECTION --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Bo'lim Sarlavhasi (Header)</h3>
        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sarlavha (UZ)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.title_uz} onChange={e => setHeaderData({...headerData, title_uz: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sarlavha (RU)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.title_ru} onChange={e => setHeaderData({...headerData, title_ru: e.target.value})} />
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kichik matn (UZ)</label>
                <textarea required className="w-full border rounded p-2" value={headerData.subtitle_uz} onChange={e => setHeaderData({...headerData, subtitle_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kichik matn (RU)</label>
                <textarea required className="w-full border rounded p-2" value={headerData.subtitle_ru} onChange={e => setHeaderData({...headerData, subtitle_ru: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isSavingHeader} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
              {isSavingHeader ? "Saqlanmoqda..." : "Sarlavhani saqlash"}
            </button>
          </div>
        </form>
      </div>

      {/* --- SERVICES LIST SECTION --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Xizmatlar</h2>
        <button 
          onClick={() => {
            setCurrentService({});
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">{currentService.id ? "Tahrirlash" : "Yangi xizmat qo'shish"}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nomi (UZ)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentService.title_uz || ""} onChange={e => setCurrentService({...currentService, title_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nomi (RU)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentService.title_ru || ""} onChange={e => setCurrentService({...currentService, title_ru: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Rasm yuklash</label>
                <div className="flex items-center gap-4">
                  {currentService.image_url && (
                    <img src={currentService.image_url} alt="Service" className="w-16 h-16 object-cover rounded" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border rounded p-2" disabled={isUploading} />
                  {isUploading && <span className="text-sm text-blue-500">Yuklanmoqda...</span>}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Narxi</label>
                <input required type="text" className="w-full border rounded p-2" value={currentService.price || ""} onChange={e => setCurrentService({...currentService, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tavsif (UZ)</label>
                <textarea required className="w-full border rounded p-2" value={currentService.description_uz || ""} onChange={e => setCurrentService({...currentService, description_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tavsif (RU)</label>
                <textarea required className="w-full border rounded p-2" value={currentService.description_ru || ""} onChange={e => setCurrentService({...currentService, description_ru: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 rounded">Bekor qilish</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Saqlash</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="p-4 border-b border-gray-100">Nomi (UZ)</th>
                  <th className="p-4 border-b border-gray-100">Narxi</th>
                  <th className="p-4 border-b border-gray-100">Amallar</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr><td colSpan={3} className="p-4 text-center">Yuklanmoqda...</td></tr>
                ) : services.length === 0 ? (
                  <tr><td colSpan={3} className="p-4 text-center">Xizmatlar topilmadi.</td></tr>
                ) : services.map(service => (
                  <tr key={service.id} className="hover:bg-gray-50 border-b border-gray-50">
                    <td className="p-4 font-medium">{service.title_uz}</td>
                    <td className="p-4">{service.price}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => { setCurrentService(service); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
