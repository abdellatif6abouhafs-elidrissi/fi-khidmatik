import { requireCraftsman } from '@/lib/auth-helpers';
import Sidebar, { SidebarItem } from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default async function CraftsmanDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await requireCraftsman();
  const { locale } = await params;

  const sidebarItems: SidebarItem[] = [
    {
      icon: 'LayoutDashboard',
      label: locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord',
      href: `/${locale}/craftsman/dashboard`,
    },
    {
      icon: 'Calendar',
      label: locale === 'ar' ? 'الحجوزات' : 'Réservations',
      href: `/${locale}/craftsman/dashboard/bookings`,
    },
    {
      icon: 'DollarSign',
      label: locale === 'ar' ? 'الأرباح' : 'Revenus',
      href: `/${locale}/craftsman/dashboard/earnings`,
    },
    {
      icon: 'Clock',
      label: locale === 'ar' ? 'الجدول الزمني' : 'Horaires',
      href: `/${locale}/craftsman/dashboard/schedule`,
    },
    {
      icon: 'Star',
      label: locale === 'ar' ? 'التقييمات' : 'Avis',
      href: `/${locale}/craftsman/dashboard/reviews`,
    },
    {
      icon: 'Briefcase',
      label: locale === 'ar' ? 'معرض الأعمال' : 'Portfolio',
      href: `/${locale}/craftsman/dashboard/portfolio`,
    },
    {
      icon: 'MessageSquare',
      label: locale === 'ar' ? 'الرسائل' : 'Messages',
      href: `/${locale}/craftsman/dashboard/messages`,
    },
    {
      icon: 'Settings',
      label: locale === 'ar' ? 'الإعدادات' : 'Paramètres',
      href: `/${locale}/craftsman/dashboard/settings`,
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
