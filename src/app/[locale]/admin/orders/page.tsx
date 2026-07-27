"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error.message);
      alert('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      alert('Status yangilandi!');
    } catch (error: any) {
      console.error('Error updating status:', error.message);
      alert('Xatolik yuz berdi');
    } finally {
      setUpdating(null);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Haqiqatan ham bu buyurtmani o\'chirmoqchimisiz?')) return;
    
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setOrders(orders.filter(o => o.id !== id));
      alert('Buyurtma o\'chirildi!');
    } catch (error: any) {
      console.error('Error deleting order:', error.message);
      alert('Xatolik yuz berdi');
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
    <div className="space-y-6 max-w-5xl pb-10">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Buyurtmalar ro'yxati</h1>
        <div className="text-sm text-gray-500">Jami: {orders.length} ta</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-medium border-b">Mijoz / Telefon</th>
                <th className="p-4 font-medium border-b">Xizmat turi</th>
                <th className="p-4 font-medium border-b">Holati</th>
                <th className="p-4 font-medium border-b">Sana</th>
                <th className="p-4 font-medium border-b text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b">
                    <div className="font-bold text-gray-800">{order.name}</div>
                    <div className="text-gray-500 mt-1">{order.phone}</div>
                  </td>
                  <td className="p-4 border-b font-medium">{order.service_type || '-'}</td>
                  <td className="p-4 border-b">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      disabled={updating === order.id}
                      className={`py-1.5 px-3 rounded-full text-xs font-semibold outline-none cursor-pointer border-r-8 border-transparent ${
                        order.status === 'Yangi' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Jarayonda' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Yakunlangan' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="Yangi" className="bg-white text-black">Yangi</option>
                      <option value="Jarayonda" className="bg-white text-black">Jarayonda</option>
                      <option value="Yakunlangan" className="bg-white text-black">Yakunlangan</option>
                      <option value="Bekor qilingan" className="bg-white text-black">Bekor qilingan</option>
                    </select>
                  </td>
                  <td className="p-4 border-b text-gray-500">
                    {format(new Date(order.created_at), "d MMM yyyy, HH:mm", { locale: uz })}
                  </td>
                  <td className="p-4 border-b text-right">
                    <button 
                      onClick={() => deleteOrder(order.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Hali buyurtmalar yo'q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
