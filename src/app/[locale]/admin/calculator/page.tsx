"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCalculator() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [dataId, setDataId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title_uz: "", title_ru: "",
    subtitle_uz: "", subtitle_ru: "",
    price_per_sqm: 12000,
    note_uz: "", note_ru: "",
    btn_text_uz: "", btn_text_ru: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("calculator").select("*").limit(1).single();
    if (data) {
      setDataId(data.id);
      setFormData({
        title_uz: data.title_uz || "", title_ru: data.title_ru || "",
        subtitle_uz: data.subtitle_uz || "", subtitle_ru: data.subtitle_ru || "",
        price_per_sqm: data.price_per_sqm || 12000,
        note_uz: data.note_uz || "", note_ru: data.note_ru || "",
        btn_text_uz: data.btn_text_uz || "", btn_text_ru: data.btn_text_ru || ""
      });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price_per_sqm' ? Number(value) : value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      if (dataId) {
        const { error } = await supabase.from("calculator").update(formData).eq("id", dataId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("calculator").insert([formData]).select();
        if (error) throw error;
        if (data && data.length > 0) setDataId(data[0].id);
      }
      setMessage({ text: "Muaffaqiyatli saqlandi!", type: "success" });
    } catch (error: any) {
      setMessage({ text: "Xato yuz berdi: " + error.message, type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Yuklanmoqda...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Narx Kalkulyatori</h2>
        <p className="text-gray-500 text-sm mt-1">Kalkulyator matnlari va eng asosiysi narxni sozlash</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Asosiy Narx */}
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 space-y-4">
          <h3 className="font-semibold text-blue-800 border-b border-blue-200 pb-2">1 Kvadrat Metr Narxi</h3>
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">Narx (so'mda)</label>
            <input 
              type="number" 
              name="price_per_sqm" 
              value={formData.price_per_sqm} 
              onChange={handleChange} 
              required 
              className="w-full md:w-1/2 px-4 py-3 border border-blue-300 rounded-md text-lg font-bold text-blue-900 bg-white" 
            />
            <p className="text-sm text-blue-600 mt-2">Masalan: 12000 yozsangiz, saytdagi kalkulyator 1 kv.m uchun 12000 so'mdan hisoblaydi.</p>
          </div>
        </div>

        {/* Sarlavhalar */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Sarlavha va Kichik matn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sarlavha (UZ)</label>
              <input type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sarlavha (RU)</label>
              <input type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kichik matn (UZ)</label>
              <textarea name="subtitle_uz" value={formData.subtitle_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kichik matn (RU)</label>
              <textarea name="subtitle_ru" value={formData.subtitle_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-20" />
            </div>
          </div>
        </div>

        {/* Eslatma va Tugma */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Eslatma va Tugma matni</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Eslatma yozuvi (UZ)</label>
              <input type="text" name="note_uz" value={formData.note_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Eslatma yozuvi (RU)</label>
              <input type="text" name="note_ru" value={formData.note_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Buyurtma tugmasi (UZ)</label>
              <input type="text" name="btn_text_uz" value={formData.btn_text_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Buyurtma tugmasi (RU)</label>
              <input type="text" name="btn_text_ru" value={formData.btn_text_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
