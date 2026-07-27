"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [heroId, setHeroId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    interactive_uz: "",
    interactive_ru: "",
    title_line1_uz: "",
    title_line1_ru: "",
    title_line2_uz: "",
    title_line2_ru: "",
    subtitle_uz: "",
    subtitle_ru: "",
    cta_uz: "",
    cta_ru: "",
    badge1_uz: "",
    badge1_ru: "",
    badge2_uz: "",
    badge2_ru: "",
    badge3_uz: "",
    badge3_ru: "",
  });

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    const { data, error } = await supabase.from("hero_content").select("*").limit(1).single();
    if (data) {
      setHeroId(data.id);
      setFormData({
        interactive_uz: data.interactive_uz || "",
        interactive_ru: data.interactive_ru || "",
        title_line1_uz: data.title_line1_uz || "",
        title_line1_ru: data.title_line1_ru || "",
        title_line2_uz: data.title_line2_uz || "",
        title_line2_ru: data.title_line2_ru || "",
        subtitle_uz: data.subtitle_uz || "",
        subtitle_ru: data.subtitle_ru || "",
        cta_uz: data.cta_uz || "",
        cta_ru: data.cta_ru || "",
        badge1_uz: data.badge1_uz || "",
        badge1_ru: data.badge1_ru || "",
        badge2_uz: data.badge2_uz || "",
        badge2_ru: data.badge2_ru || "",
        badge3_uz: data.badge3_uz || "",
        badge3_ru: data.badge3_ru || "",
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
      if (heroId) {
        const { error } = await supabase.from("hero_content").update(formData).eq("id", heroId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("hero_content").insert([formData]).select();
        if (error) throw error;
        if (data && data.length > 0) {
          setHeroId(data[0].id);
        }
      }
      setMessage({ text: "Muaffaqiyatli saqlandi!", type: "success" });
    } catch (error: any) {
      setMessage({ text: "Xato yuz berdi: " + error.message, type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Yuklanmoqda...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Asosiy Qism (Hero)</h2>
          <p className="text-gray-500 text-sm mt-1">Saytning bosh sahifasidagi birinchi ko'rinish matnlarini tahrirlash</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Interactive Badge */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Miltillovchi kichik yozuv (Tepada)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">O'zbekcha</label>
              <input type="text" name="interactive_uz" value={formData.interactive_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ruscha</label>
              <input type="text" name="interactive_ru" value={formData.interactive_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Title Line 1 */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Asosiy Sarlavha (1-qism oddiy rangda)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">O'zbekcha</label>
              <input type="text" name="title_line1_uz" value={formData.title_line1_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ruscha</label>
              <input type="text" name="title_line1_ru" value={formData.title_line1_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Title Line 2 */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Asosiy Sarlavha (2-qism Oltin/Moviy rangda)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">O'zbekcha</label>
              <input type="text" name="title_line2_uz" value={formData.title_line2_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ruscha</label>
              <input type="text" name="title_line2_ru" value={formData.title_line2_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Kichik Tavsif (Sarlavha ostida)</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">O'zbekcha</label>
              <textarea name="subtitle_uz" value={formData.subtitle_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-24" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ruscha</label>
              <textarea name="subtitle_ru" value={formData.subtitle_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md h-24" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Tugma Yozuvi (Buyurtma berish)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">O'zbekcha</label>
              <input type="text" name="cta_uz" value={formData.cta_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ruscha</label>
              <input type="text" name="cta_ru" value={formData.cta_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Kichik Ustunliklar (Badges - 3 ta)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 1 (O'zbekcha)</label>
              <input type="text" name="badge1_uz" value={formData.badge1_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 1 (Ruscha)</label>
              <input type="text" name="badge1_ru" value={formData.badge1_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 2 (O'zbekcha)</label>
              <input type="text" name="badge2_uz" value={formData.badge2_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 2 (Ruscha)</label>
              <input type="text" name="badge2_ru" value={formData.badge2_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 3 (O'zbekcha)</label>
              <input type="text" name="badge3_uz" value={formData.badge3_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Badge 3 (Ruscha)</label>
              <input type="text" name="badge3_ru" value={formData.badge3_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
