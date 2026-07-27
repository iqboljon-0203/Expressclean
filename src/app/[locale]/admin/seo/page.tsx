"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2 } from 'lucide-react';

export default function AdminSEO() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title_uz: '',
    title_ru: '',
    description_uz: '',
    description_ru: '',
    keywords_uz: '',
    keywords_ru: ''
  });

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setFormData({
          title_uz: data.title_uz || '',
          title_ru: data.title_ru || '',
          description_uz: data.description_uz || '',
          description_ru: data.description_ru || '',
          keywords_uz: data.keywords_uz || '',
          keywords_ru: data.keywords_ru || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching SEO:', error.message);
      alert('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('seo_settings')
        .upsert({ id: 1, ...formData });

      if (error) throw error;
      alert('Muvaqqiyatli saqlandi!');
    } catch (error: any) {
      console.error('Error saving SEO:', error.message);
      alert('Xatolik yuz berdi');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold">SEO (Google qidiruv) sozlamalari</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Saqlash
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">O'zbek tili (UZ)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sayt nomi (Title)</label>
            <input
              type="text"
              value={formData.title_uz}
              onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Express Clean - Toshkentda professional tozalash xizmati"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif (Description)</label>
            <textarea
              value={formData.description_uz}
              onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px]"
              placeholder="Qisqacha sayt haqida (Google da chiqadi)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kalit so'zlar (Keywords)</label>
            <textarea
              value={formData.keywords_uz}
              onChange={(e) => setFormData({ ...formData, keywords_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px]"
              placeholder="gilam yuvish, tozalash, ximchistka..."
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Rus tili (RU)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sayt nomi (Title) RU</label>
            <input
              type="text"
              value={formData.title_ru}
              onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Express Clean - Профессиональная клининговая компания..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif (Description) RU</label>
            <textarea
              value={formData.description_ru}
              onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px]"
              placeholder="Краткое описание сайта"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kalit so'zlar (Keywords) RU</label>
            <textarea
              value={formData.keywords_ru}
              onChange={(e) => setFormData({ ...formData, keywords_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px]"
              placeholder="чистка ковров, химчистка, ташкент..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
