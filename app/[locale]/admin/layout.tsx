import { requireAdmin } from '@/lib/auth-helpers';
import Sidebar, { SidebarItem } from '@/components/layout/Sidebar';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await requireAdmin();
  const { locale } = await params;

  const sidebarItems: SidebarItem[] = [
    {
      icon: 'LayoutDashboard',
      label: locale === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      href: `/${locale}/admin`,
    },
    {
      icon: 'Users',
      label: locale === 'ar' ? 'المستخدمون' : 'Utilisateurs',
      href: `/${locale}/admin/users`,
    },
    {
      icon: 'Wrench',
      label: locale === 'ar' ? 'الحرفيون' : 'Artisans',
      href: `/${locale}/admin/craftsmen`,
    },
    {
      icon: 'Calendar',
      label: locale === 'ar' ? 'الحجوزات' : 'Réservations',
      href: `/${locale}/admin/bookings`,
    },
    {
      icon: 'Star',
      label: locale === 'ar' ? 'التقييمات' : 'Avis',
      href: `/${locale}/admin/reviews`,
    },
    {
      icon: 'FileText',
      label: locale === 'ar' ? 'التقارير' : 'Rapports',
      href: `/${locale}/admin/reports`,
    },
    {
      icon: 'Shield',
      label: locale === 'ar' ? 'التحقق' : 'Vérification',
      href: `/${locale}/admin/verification`,
    },
    {
      icon: 'Settings',
      label: locale === 'ar' ? 'الإعدادات' : 'Paramètres',
      href: `/${locale}/admin/settings`,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar items={sidebarItems} locale={locale} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
