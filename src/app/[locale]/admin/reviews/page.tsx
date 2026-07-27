"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";

interface ReviewData {
  id: string;
  name: string;
  text_uz: string;
  text_ru: string;
  rating: number;
  is_verified: boolean;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState<Partial<ReviewData>>({});

  const [headerId, setHeaderId] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState({
    title_uz: "", title_ru: "",
    subtitle_uz: "", subtitle_ru: ""
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  useEffect(() => {
    fetchReviews();
    fetchHeader();
  }, []);

  async function fetchHeader() {
    const { data, error } = await supabase.from("reviews_header").select("*").limit(1).single();
    if (data && !error) {
      setHeaderId(data.id);
      setHeaderData({
        title_uz: data.title_uz || "", title_ru: data.title_ru || "",
        subtitle_uz: data.subtitle_uz || "", subtitle_ru: data.subtitle_ru || ""
      });
    }
  }

  async function fetchReviews() {
    setIsLoading(true);
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data && !error) {
      setReviews(data);
    }
    setIsLoading(false);
  }

  async function handleSaveHeader(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingHeader(true);
    try {
      if (headerId) {
        await supabase.from("reviews_header").update(headerData).eq("id", headerId);
      } else {
        const { data } = await supabase.from("reviews_header").insert([headerData]).select();
        if (data && data.length > 0) setHeaderId(data[0].id);
      }
      alert("Sarlavha saqlandi!");
    } catch (err) {
      alert("Xato yuz berdi.");
    }
    setIsSavingHeader(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (currentReview.id) {
      // Update
      const { error } = await supabase.from("reviews").update(currentReview).eq("id", currentReview.id);
      if (!error) {
        setIsEditing(false);
        fetchReviews();
      } else {
        alert("Xatolik yuz berdi");
      }
    } else {
      // Insert
      const { error } = await supabase.from("reviews").insert([currentReview]);
      if (!error) {
        setIsEditing(false);
        fetchReviews();
      } else {
        alert("Xatolik yuz berdi");
      }
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (!error) fetchReviews();
    }
  }

  return (
    <div className="space-y-8">
      {/* --- HEADER EDIT SECTION --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Sarlavha va Kichik matn</h3>
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
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kichik matn (UZ)</label>
              <textarea required className="w-full border rounded p-2 h-20" value={headerData.subtitle_uz} onChange={e => setHeaderData({...headerData, subtitle_uz: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Kichik matn (RU)</label>
              <textarea required className="w-full border rounded p-2 h-20" value={headerData.subtitle_ru} onChange={e => setHeaderData({...headerData, subtitle_ru: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isSavingHeader} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
              {isSavingHeader ? "Saqlanmoqda..." : "Sarlavhani saqlash"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Sharhlar</h2>
        <button 
          onClick={() => {
            setCurrentReview({ rating: 5, is_verified: true });
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">{currentReview.id ? "Tahrirlash" : "Yangi sharh qo'shish"}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Mijoz ismi</label>
                <input required type="text" className="w-full border rounded p-2" value={currentReview.name || ""} onChange={e => setCurrentReview({...currentReview, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sharh (UZ)</label>
                <textarea required className="w-full border rounded p-2" value={currentReview.text_uz || ""} onChange={e => setCurrentReview({...currentReview, text_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sharh (RU)</label>
                <textarea required className="w-full border rounded p-2" value={currentReview.text_ru || ""} onChange={e => setCurrentReview({...currentReview, text_ru: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Reyting (1-5)</label>
                <input required type="number" min="1" max="5" className="w-full border rounded p-2" value={currentReview.rating || 5} onChange={e => setCurrentReview({...currentReview, rating: Number(e.target.value)})} />
              </div>
              <div className="flex items-center mt-6">
                <input type="checkbox" id="verified" className="mr-2" checked={currentReview.is_verified || false} onChange={e => setCurrentReview({...currentReview, is_verified: e.target.checked})} />
                <label htmlFor="verified" className="text-sm text-gray-600">Tasdiqlangan mijoz</label>
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
                  <th className="p-4 border-b border-gray-100">Mijoz</th>
                  <th className="p-4 border-b border-gray-100">Reyting</th>
                  <th className="p-4 border-b border-gray-100">Sharh</th>
                  <th className="p-4 border-b border-gray-100">Amallar</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-4 text-center">Yuklanmoqda...</td></tr>
                ) : reviews.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">Sharhlar topilmadi.</td></tr>
                ) : reviews.map(review => (
                  <tr key={review.id} className="hover:bg-gray-50 border-b border-gray-50">
                    <td className="p-4 font-medium">{review.name}</td>
                    <td className="p-4">{review.rating} ⭐</td>
                    <td className="p-4 truncate max-w-[200px]">{review.text_uz}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => { setCurrentReview(review); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(review.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
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
