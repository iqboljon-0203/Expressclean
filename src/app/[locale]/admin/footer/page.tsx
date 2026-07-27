"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2 } from 'lucide-react';

export default function AdminFooter() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    phone: '',
    schedule_uz: '',
    schedule_ru: '',
    address_uz: '',
    address_ru: '',
    instagram_url: '',
    facebook_url: '',
    telegram_url: '',
    description_uz: '',
    description_ru: ''
  });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setFormData({
          phone: data.phone || '',
          schedule_uz: data.schedule_uz || '',
          schedule_ru: data.schedule_ru || '',
          address_uz: data.address_uz || '',
          address_ru: data.address_ru || '',
          instagram_url: data.instagram_url || '',
          facebook_url: data.facebook_url || '',
          telegram_url: data.telegram_url || '',
          description_uz: data.description_uz || '',
          description_ru: data.description_ru || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching footer:', error.message);
      setMessage({ text: 'Xatolik yuz berdi: ' + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const { error } = await supabase
        .from('footer_content')
        .upsert({ id: 1, ...formData });

      if (error) throw error;
      setMessage({ text: 'Muvaqqiyatli saqlandi!', type: "success" });
    } catch (error: any) {
      console.error('Error saving footer:', error.message);
      setMessage({ text: 'Xatolik yuz berdi: ' + error.message, type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
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
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Footer Ma'lumotlari</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Saqlash
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Asosiy ma'lumotlar</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="+998 94 850 00 06"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input
              type="text"
              value={formData.instagram_url}
              onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="https://instagram.com/..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              value={formData.facebook_url}
              onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="https://facebook.com/..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telegram URL</label>
            <input
              type="text"
              value={formData.telegram_url}
              onChange={(e) => setFormData({ ...formData, telegram_url: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="https://t.me/..."
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">O'zbek tili (UZ)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ish vaqti</label>
            <input
              type="text"
              value={formData.schedule_uz}
              onChange={(e) => setFormData({ ...formData, schedule_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Dush-Yak: 09:00 - 20:00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
            <input
              type="text"
              value={formData.address_uz}
              onChange={(e) => setFormData({ ...formData, address_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Toshkent sh., Yunusobod tumani"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha matn (Logotipi tagidagi)</label>
            <textarea
              value={formData.description_uz}
              onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm md:col-start-2">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Rus tili (RU)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ish vaqti (RU)</label>
            <input
              type="text"
              value={formData.schedule_ru}
              onChange={(e) => setFormData({ ...formData, schedule_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Пн-Вс: 09:00 - 20:00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manzil (RU)</label>
            <input
              type="text"
              value={formData.address_ru}
              onChange={(e) => setFormData({ ...formData, address_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="г. Ташкент, Юнусабадский район"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha matn (RU)</label>
            <textarea
              value={formData.description_ru}
              onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
