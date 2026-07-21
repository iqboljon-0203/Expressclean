export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Boshqaruv Paneli</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Jami Buyurtmalar</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">124</p>
          <div className="mt-4 text-sm text-green-600 font-medium">
            +12% o'tgan oydan
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Kutayotgan Buyurtmalar</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
          <div className="mt-4 text-sm text-yellow-600 font-medium">
            Zudlik bilan ko'rib chiqish kerak
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Daromad (Joriy oy)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">4,250,000 so'm</p>
          <div className="mt-4 text-sm text-green-600 font-medium">
            +5% o'tgan oydan
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">So'nggi buyurtmalar</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-medium border-b border-gray-100">ID</th>
                <th className="p-4 font-medium border-b border-gray-100">Mijoz</th>
                <th className="p-4 font-medium border-b border-gray-100">Xizmat</th>
                <th className="p-4 font-medium border-b border-gray-100">Holati</th>
                <th className="p-4 font-medium border-b border-gray-100">Sana</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-50">#001</td>
                <td className="p-4 border-b border-gray-50 font-medium">Azizbek T.</td>
                <td className="p-4 border-b border-gray-50">Gilam yuvish (20 kv.m)</td>
                <td className="p-4 border-b border-gray-50">
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs font-medium">Kutmoqda</span>
                </td>
                <td className="p-4 border-b border-gray-50 text-gray-500">Bugun, 14:30</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-50">#002</td>
                <td className="p-4 border-b border-gray-50 font-medium">Nargiza M.</td>
                <td className="p-4 border-b border-gray-50">Yumshoq mebel tozalash</td>
                <td className="p-4 border-b border-gray-50">
                  <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-medium">Jarayonda</span>
                </td>
                <td className="p-4 border-b border-gray-50 text-gray-500">Kecha, 09:15</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-50">#003</td>
                <td className="p-4 border-b border-gray-50 font-medium">Umid R.</td>
                <td className="p-4 border-b border-gray-50">Parda tozalash</td>
                <td className="p-4 border-b border-gray-50">
                  <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-medium">Yakunlangan</span>
                </td>
                <td className="p-4 border-b border-gray-50 text-gray-500">20 Okt, 11:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
