export const dynamic = 'force-dynamic';

import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { uz } from "date-fns/locale";

export default async function AdminDashboard() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Dashboard yuklashda xato:", error);
  }

  const allOrders = orders || [];
  const pendingOrders = allOrders.filter((o: any) => o.status === 'Yangi');
  
  // Hozirgi oy buyurtmalari soni (daromad o'rniga faqat statistika qo'yamiz, chunki narx hozircha bazada yo'q)
  const currentMonth = new Date().getMonth();
  const currentMonthOrders = allOrders.filter((o: any) => new Date(o.created_at).getMonth() === currentMonth);

  return (
    <div className="space-y-6 pb-10">
      <h2 className="text-2xl font-bold text-gray-800">Boshqaruv Paneli</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Jami Buyurtmalar</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{allOrders.length}</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Kutayotgan Buyurtmalar (Yangi)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{pendingOrders.length}</p>
          <div className="mt-4 text-sm text-yellow-600 font-medium">
            Zudlik bilan aloqaga chiqish kerak
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Joriy oyda tushgan</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{currentMonthOrders.length} ta</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">So'nggi buyurtmalar</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-medium border-b border-gray-100">Mijoz / Telefon</th>
                <th className="p-4 font-medium border-b border-gray-100">Xizmat</th>
                <th className="p-4 font-medium border-b border-gray-100">Holati</th>
                <th className="p-4 font-medium border-b border-gray-100">Sana</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {allOrders.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b border-gray-50">
                    <div className="font-medium">{order.name}</div>
                    <div className="text-gray-500 text-xs mt-1">{order.phone}</div>
                  </td>
                  <td className="p-4 border-b border-gray-50">{order.service_type || '-'}</td>
                  <td className="p-4 border-b border-gray-50">
                    <span className={`py-1 px-3 rounded-full text-xs font-medium ${
                      order.status === 'Yangi' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Jarayonda' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Yakunlangan' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 border-b border-gray-50 text-gray-500">
                    {format(new Date(order.created_at), "d MMM, HH:mm", { locale: uz })}
                  </td>
                </tr>
              ))}
              {allOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
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
