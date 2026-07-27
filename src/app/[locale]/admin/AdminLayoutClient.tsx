"use client";

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If we are on the login page, don't show the sidebar and header
  const isLoginPage = pathname.endsWith('/admin/login');

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm py-4 px-4 md:px-6 flex justify-between items-center border-b sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Image src="/logo.png" alt="Express Clean" width={120} height={32} className="object-contain md:w-[150px] md:h-[40px]" />
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Saytga qaytish</Link>
          <button onClick={handleLogout} className="text-xs md:text-sm text-red-600 hover:text-red-800 font-medium px-2 py-1 md:px-3 md:py-1.5 bg-red-50 rounded-lg">Chiqish</button>
        </div>
      </header>
      
      <div className="flex flex-1 relative">
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b md:hidden">
            <span className="font-bold text-gray-800">Menyu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-2 overflow-y-auto h-full pb-20" onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/admin" className={`p-2 rounded font-medium ${pathname === '/admin' || pathname.endsWith('/admin') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Boshqaruv Paneli</Link>
            <Link href="/admin/orders" className={`p-2 rounded font-medium ${pathname.includes('/admin/orders') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Buyurtmalar</Link>
            <Link href="/admin/seo" className={`p-2 rounded font-medium ${pathname.includes('/admin/seo') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>SEO (Google qidiruv)</Link>
            <Link href="/admin/hero" className={`p-2 rounded font-medium ${pathname.includes('/admin/hero') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Asosiy qism (Hero)</Link>
            <Link href="/admin/services" className={`p-2 rounded font-medium ${pathname.includes('/admin/services') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Xizmatlar</Link>
            <Link href="/admin/promos" className={`p-2 rounded font-medium ${pathname.includes('/admin/promos') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Aksiyalar</Link>
            <Link href="/admin/how-it-works" className={`p-2 rounded font-medium ${pathname.includes('/admin/how-it-works') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Qanday ishlaymiz</Link>
            <Link href="/admin/calculator" className={`p-2 rounded font-medium ${pathname.includes('/admin/calculator') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Narx Kalkulyatori</Link>
            <Link href="/admin/before-after" className={`p-2 rounded font-medium ${pathname.includes('/admin/before-after') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Do / Posle (Natija)</Link>
            <Link href="/admin/reviews" className={`p-2 rounded font-medium ${pathname.includes('/admin/reviews') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Sharhlar</Link>
            <Link href="/admin/faqs" className={`p-2 rounded font-medium ${pathname.includes('/admin/faqs') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>KBS (FAQ)</Link>
            <Link href="/admin/footer" className={`p-2 rounded font-medium ${pathname.includes('/admin/footer') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Footer (Pastki qism)</Link>
            <Link href="/admin/about" className={`p-2 rounded font-medium ${pathname.includes('/admin/about') ? 'text-primary bg-primary/5' : 'hover:bg-gray-100 text-gray-700'}`}>Biz haqimizda</Link>
          </nav>
        </aside>
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
