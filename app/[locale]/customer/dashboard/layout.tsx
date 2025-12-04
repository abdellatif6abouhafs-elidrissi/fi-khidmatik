import { requireCustomer } from '@/lib/auth-helpers';
import Sidebar, { SidebarItem } from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default async function CustomerDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await requireCustomer();
  const { locale } = await params;

  const sidebarItems: SidebarItem[] = [
    {
      icon: 'LayoutDashboard',
      label: locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord',
      href: `/${locale}/customer/dashboard`,
    },
    {
      icon: 'Calendar',
      label: locale === 'ar' ? 'حجوزاتي' : 'Mes réservations',
      href: `/${locale}/customer/dashboard/bookings`,
    },
    {
      icon: 'Heart',
      label: locale === 'ar' ? 'المفضلة' : 'Favoris',
      href: `/${locale}/customer/dashboard/favorites`,
    },
    {
      icon: 'MessageSquare',
      label: locale === 'ar' ? 'الرسائل' : 'Messages',
      href: `/${locale}/customer/dashboard/messages`,
    },
    {
      icon: 'User',
      label: locale === 'ar' ? 'الملف الشخصي' : 'Profil',
      href: `/${locale}/customer/dashboard/profile`,
    },
    {
      icon: 'Settings',
      label: locale === 'ar' ? 'الإعدادات' : 'Paramètres',
      href: `/${locale}/customer/dashboard/settings`,
    },
  ];

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar items={sidebarItems} locale={locale} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
