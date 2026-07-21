import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Express Clean - Admin Panel',
  description: 'Admin Dashboard for Express Clean',
  robots: 'noindex, nofollow', // Ensure admin is not indexed by search engines
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold text-primary">Express Clean Admin</h1>
        <div className="flex gap-4">
          <button className="text-sm text-gray-600 hover:text-gray-900">Chiqish</button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-sm hidden md:block">
          <nav className="p-4 flex flex-col gap-2">
            <a href="#" className="p-2 rounded hover:bg-gray-100 font-medium text-primary bg-primary/5">Boshqaruv Paneli</a>
            <a href="#" className="p-2 rounded hover:bg-gray-100 text-gray-700">Buyurtmalar</a>
            <a href="#" className="p-2 rounded hover:bg-gray-100 text-gray-700">Mijozlar</a>
            <a href="#" className="p-2 rounded hover:bg-gray-100 text-gray-700">Sozlamalar</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
