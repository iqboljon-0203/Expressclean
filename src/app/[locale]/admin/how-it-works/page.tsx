"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminHowItWorks() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [dataId, setDataId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title_uz: "", title_ru: "",
    subtitle_uz: "", subtitle_ru: "",
    step1_title_uz: "", step1_title_ru: "",
    step1_desc_uz: "", step1_desc_ru: "",
    step2_title_uz: "", step2_title_ru: "",
    step2_desc_uz: "", step2_desc_ru: "",
    step3_title_uz: "", step3_title_ru: "",
    step3_desc_uz: "", step3_desc_ru: "",
    step4_title_uz: "", step4_title_ru: "",
    step4_desc_uz: "", step4_desc_ru: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("how_it_works").select("*").limit(1).single();
    if (data) {
      setDataId(data.id);
      setFormData({
        title_uz: data.title_uz || "", title_ru: data.title_ru || "",
        subtitle_uz: data.subtitle_uz || "", subtitle_ru: data.subtitle_ru || "",
        step1_title_uz: data.step1_title_uz || "", step1_title_ru: data.step1_title_ru || "",
        step1_desc_uz: data.step1_desc_uz || "", step1_desc_ru: data.step1_desc_ru || "",
        step2_title_uz: data.step2_title_uz || "", step2_title_ru: data.step2_title_ru || "",
        step2_desc_uz: data.step2_desc_uz || "", step2_desc_ru: data.step2_desc_ru || "",
        step3_title_uz: data.step3_title_uz || "", step3_title_ru: data.step3_title_ru || "",
        step3_desc_uz: data.step3_desc_uz || "", step3_desc_ru: data.step3_desc_ru || "",
        step4_title_uz: data.step4_title_uz || "", step4_title_ru: data.step4_title_ru || "",
        step4_desc_uz: data.step4_desc_uz || "", step4_desc_ru: data.step4_desc_ru || "",
      });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      if (dataId) {
        const { error } = await supabase.from("how_it_works").update(formData).eq("id", dataId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("how_it_works").insert([formData]).select();
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
        <h2 className="text-2xl font-bold text-gray-800">Qanday ishlaymiz?</h2>
        <p className="text-gray-500 text-sm mt-1">Saytdagi qadamlarni tahrirlash</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Sarlavha */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Asosiy Sarlavha va Kichik matn</h3>
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

        {/* Qadamlar */}
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">{step}-qadam</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nomi (UZ)</label>
                <input type="text" name={`step${step}_title_uz`} value={(formData as any)[`step${step}_title_uz`]} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nomi (RU)</label>
                <input type="text" name={`step${step}_title_ru`} value={(formData as any)[`step${step}_title_ru`]} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tavsif (UZ)</label>
                <textarea name={`step${step}_desc_uz`} value={(formData as any)[`step${step}_desc_uz`]} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tavsif (RU)</label>
                <textarea name={`step${step}_desc_ru`} value={(formData as any)[`step${step}_desc_ru`]} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-20" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
