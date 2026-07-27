"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";

interface PromoData {
  id: string;
  title_uz: string;
  title_ru: string;
  highlight_uz: string;
  highlight_ru: string;
}

export default function AdminPromos() {
  const [promos, setPromos] = useState<PromoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Partial<PromoData>>({});

  const [headerId, setHeaderId] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState({
    headline_uz: "",
    headline_ru: "",
    subheadline_uz: "",
    subheadline_ru: "",
    cta_uz: "",
    cta_ru: ""
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  useEffect(() => {
    fetchPromos();
    fetchHeader();
  }, []);

  async function fetchHeader() {
    const { data, error } = await supabase.from("promo_header").select("*").limit(1).single();
    if (data && !error) {
      setHeaderId(data.id);
      setHeaderData({
        headline_uz: data.headline_uz,
        headline_ru: data.headline_ru,
        subheadline_uz: data.subheadline_uz,
        subheadline_ru: data.subheadline_ru,
        cta_uz: data.cta_uz,
        cta_ru: data.cta_ru
      });
    }
  }

  async function fetchPromos() {
    setIsLoading(true);
    const { data, error } = await supabase.from("promos").select("*").order("created_at", { ascending: true });
    if (data && !error) {
      setPromos(data);
    }
    setIsLoading(false);
  }

  async function handleSaveHeader(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingHeader(true);
    try {
      if (headerId) {
        await supabase.from("promo_header").update(headerData).eq("id", headerId);
      } else {
        const { data } = await supabase.from("promo_header").insert([headerData]).select();
        if (data && data.length > 0) setHeaderId(data[0].id);
      }
      alert("Aksiya sarlavhasi saqlandi!");
    } catch (err) {
      alert("Xato yuz berdi.");
    }
    setIsSavingHeader(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (currentPromo.id) {
      // Update
      const { error } = await supabase.from("promos").update(currentPromo).eq("id", currentPromo.id);
      if (!error) {
        setIsEditing(false);
        fetchPromos();
      } else {
        alert("Xatolik yuz berdi");
      }
    } else {
      // Insert
      const { error } = await supabase.from("promos").insert([currentPromo]);
      if (!error) {
        setIsEditing(false);
        fetchPromos();
      } else {
        alert("Xatolik yuz berdi");
      }
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      const { error } = await supabase.from("promos").delete().eq("id", id);
      if (!error) fetchPromos();
    }
  }

  return (
    <div className="space-y-8">
      {/* --- HEADER EDIT SECTION --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Aksiya Sarlavhasi (Header)</h3>
        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Katta Sarlavha (UZ)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.headline_uz} onChange={e => setHeaderData({...headerData, headline_uz: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Katta Sarlavha (RU)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.headline_ru} onChange={e => setHeaderData({...headerData, headline_ru: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kichik matn (UZ)</label>
              <textarea required className="w-full border rounded p-2 h-20" value={headerData.subheadline_uz} onChange={e => setHeaderData({...headerData, subheadline_uz: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kichik matn (RU)</label>
              <textarea required className="w-full border rounded p-2 h-20" value={headerData.subheadline_ru} onChange={e => setHeaderData({...headerData, subheadline_ru: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tugma matni (UZ)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.cta_uz} onChange={e => setHeaderData({...headerData, cta_uz: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tugma matni (RU)</label>
              <input required type="text" className="w-full border rounded p-2" value={headerData.cta_ru} onChange={e => setHeaderData({...headerData, cta_ru: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isSavingHeader} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
              {isSavingHeader ? "Saqlanmoqda..." : "Sarlavhani saqlash"}
            </button>
          </div>
        </form>
      </div>

      {/* --- PROMOS LIST SECTION --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Aksiyalar</h2>
        <button 
          onClick={() => {
            setCurrentPromo({});
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">{currentPromo.id ? "Tahrirlash" : "Yangi aksiya qo'shish"}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nomi (UZ)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentPromo.title_uz || ""} onChange={e => setCurrentPromo({...currentPromo, title_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nomi (RU)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentPromo.title_ru || ""} onChange={e => setCurrentPromo({...currentPromo, title_ru: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Alohida matn (UZ)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentPromo.highlight_uz || ""} onChange={e => setCurrentPromo({...currentPromo, highlight_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Alohida matn (RU)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentPromo.highlight_ru || ""} onChange={e => setCurrentPromo({...currentPromo, highlight_ru: e.target.value})} />
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
                  <th className="p-4 border-b border-gray-100">Alohida matn (UZ)</th>
                  <th className="p-4 border-b border-gray-100">Amallar</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr><td colSpan={3} className="p-4 text-center">Yuklanmoqda...</td></tr>
                ) : promos.length === 0 ? (
                  <tr><td colSpan={3} className="p-4 text-center">Aksiyalar topilmadi.</td></tr>
                ) : promos.map(promo => (
                  <tr key={promo.id} className="hover:bg-gray-50 border-b border-gray-50">
                    <td className="p-4 font-medium">{promo.title_uz}</td>
                    <td className="p-4">{promo.highlight_uz}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => { setCurrentPromo(promo); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
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
