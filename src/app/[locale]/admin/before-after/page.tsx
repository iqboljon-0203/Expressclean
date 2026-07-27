"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminBeforeAfter() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [dataId, setDataId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title_uz: "", title_ru: "",
    subtitle_uz: "", subtitle_ru: "",
    label_before_uz: "", label_before_ru: "",
    label_after_uz: "", label_after_ru: "",
    image_before: "", image_after: ""
  });
  const [isUploading, setIsUploading] = useState({ before: false, after: false });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("before_after_header").select("*").limit(1).single();
    if (data) {
      setDataId(data.id);
      setFormData({
        title_uz: data.title_uz || "", title_ru: data.title_ru || "",
        subtitle_uz: data.subtitle_uz || "", subtitle_ru: data.subtitle_ru || "",
        label_before_uz: data.label_before_uz || "", label_before_ru: data.label_before_ru || "",
        label_after_uz: data.label_after_uz || "", label_after_ru: data.label_after_ru || "",
        image_before: data.image_before || "", image_after: data.image_after || ""
      });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `before_after_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    setIsUploading(prev => ({ ...prev, [type]: true }));

    const currentImageUrl = formData[`image_${type}` as keyof typeof formData];
    if (typeof currentImageUrl === 'string' && currentImageUrl !== '') {
      try {
        const urlParts = currentImageUrl.split('/public/images/');
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
      setIsUploading(prev => ({ ...prev, [type]: false }));
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setFormData(prev => ({ ...prev, [`image_${type}`]: data.publicUrl }));
    setIsUploading(prev => ({ ...prev, [type]: false }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      if (dataId) {
        const { error } = await supabase.from("before_after_header").update(formData).eq("id", dataId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("before_after_header").insert([formData]).select();
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
        <h2 className="text-2xl font-bold text-gray-800">Do / Posle (Oldin/Keyin)</h2>
        <p className="text-gray-500 text-sm mt-1">Slayder sarlavhalari va "Oldin/Keyin" yozuvlarini tahrirlash</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Sarlavhalar */}
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
              <textarea name="subtitle_uz" value={formData.subtitle_uz} onChange={handleChange} className="w-full px-3 py-2 border rounded-md h-20" placeholder="Ixtiyoriy" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Kichik matn (RU)</label>
              <textarea name="subtitle_ru" value={formData.subtitle_ru} onChange={handleChange} className="w-full px-3 py-2 border rounded-md h-20" placeholder="Ixtiyoriy" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Rasm ustidagi yozuvlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Oldin (UZ)</label>
              <input type="text" name="label_before_uz" value={formData.label_before_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Oldin (RU)</label>
              <input type="text" name="label_before_ru" value={formData.label_before_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Keyin (UZ)</label>
              <input type="text" name="label_after_uz" value={formData.label_after_uz} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Keyin (RU)</label>
              <input type="text" name="label_after_ru" value={formData.label_after_ru} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Rasmlar */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Rasmlar (Oldin / Keyin)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">"Oldin" rasmi (Kir)</label>
              <div className="flex items-center gap-4">
                {formData.image_before && (
                  <img src={formData.image_before} alt="Before" className="w-16 h-16 object-cover rounded" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'before')} className="w-full px-3 py-2 border rounded-md bg-white" disabled={isUploading.before} />
                {isUploading.before && <span className="text-sm text-blue-500">Yuklanmoqda...</span>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">"Keyin" rasmi (Toza)</label>
              <div className="flex items-center gap-4">
                {formData.image_after && (
                  <img src={formData.image_after} alt="After" className="w-16 h-16 object-cover rounded" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'after')} className="w-full px-3 py-2 border rounded-md bg-white" disabled={isUploading.after} />
                {isUploading.after && <span className="text-sm text-blue-500">Yuklanmoqda...</span>}
              </div>
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
