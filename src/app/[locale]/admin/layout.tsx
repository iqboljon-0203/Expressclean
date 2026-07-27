import type { Metadata } from 'next';
import { AdminLayoutClient } from './AdminLayoutClient';

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
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
