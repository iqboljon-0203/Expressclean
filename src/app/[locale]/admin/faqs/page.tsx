"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";

interface FaqData {
  id: string;
  question_uz: string;
  question_ru: string;
  answer_uz: string;
  answer_ru: string;
}

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FaqData>>({});

  const [headerId, setHeaderId] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState({
    title_uz: "", title_ru: ""
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  useEffect(() => {
    fetchFaqs();
    fetchHeader();
  }, []);

  async function fetchHeader() {
    const { data, error } = await supabase.from("faqs_header").select("*").limit(1).single();
    if (data && !error) {
      setHeaderId(data.id);
      setHeaderData({
        title_uz: data.title_uz || "", title_ru: data.title_ru || ""
      });
    }
  }

  async function fetchFaqs() {
    setIsLoading(true);
    const { data, error } = await supabase.from("faqs").select("*").order("created_at", { ascending: true });
    if (data && !error) {
      setFaqs(data);
    }
    setIsLoading(false);
  }

  async function handleSaveHeader(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingHeader(true);
    try {
      if (headerId) {
        await supabase.from("faqs_header").update(headerData).eq("id", headerId);
      } else {
        const { data } = await supabase.from("faqs_header").insert([headerData]).select();
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
    if (currentFaq.id) {
      // Update
      const { error } = await supabase.from("faqs").update(currentFaq).eq("id", currentFaq.id);
      if (!error) {
        setIsEditing(false);
        fetchFaqs();
      } else {
        alert("Xatolik yuz berdi");
      }
    } else {
      // Insert
      const { error } = await supabase.from("faqs").insert([currentFaq]);
      if (!error) {
        setIsEditing(false);
        fetchFaqs();
      } else {
        alert("Xatolik yuz berdi");
      }
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (!error) fetchFaqs();
    }
  }

  return (
    <div className="space-y-8">
      {/* --- HEADER EDIT SECTION --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Bo'lim Sarlavhasi</h3>
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
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isSavingHeader} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
              {isSavingHeader ? "Saqlanmoqda..." : "Sarlavhani saqlash"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ko'p beriladigan savollar (FAQ)</h2>
        <button 
          onClick={() => {
            setCurrentFaq({});
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">{currentFaq.id ? "Tahrirlash" : "Yangi savol qo'shish"}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Savol (UZ)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentFaq.question_uz || ""} onChange={e => setCurrentFaq({...currentFaq, question_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Savol (RU)</label>
                <input required type="text" className="w-full border rounded p-2" value={currentFaq.question_ru || ""} onChange={e => setCurrentFaq({...currentFaq, question_ru: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Javob (UZ)</label>
                <textarea required className="w-full border rounded p-2" value={currentFaq.answer_uz || ""} onChange={e => setCurrentFaq({...currentFaq, answer_uz: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Javob (RU)</label>
                <textarea required className="w-full border rounded p-2" value={currentFaq.answer_ru || ""} onChange={e => setCurrentFaq({...currentFaq, answer_ru: e.target.value})} />
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
                  <th className="p-4 border-b border-gray-100">Savol (UZ)</th>
                  <th className="p-4 border-b border-gray-100">Amallar</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr><td colSpan={2} className="p-4 text-center">Yuklanmoqda...</td></tr>
                ) : faqs.length === 0 ? (
                  <tr><td colSpan={2} className="p-4 text-center">Savollar topilmadi.</td></tr>
                ) : faqs.map(faq => (
                  <tr key={faq.id} className="hover:bg-gray-50 border-b border-gray-50">
                    <td className="p-4 font-medium max-w-[300px] truncate">{faq.question_uz}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => { setCurrentFaq(faq); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(faq.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
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
