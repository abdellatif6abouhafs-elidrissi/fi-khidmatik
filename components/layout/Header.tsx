'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Menu, X, User, Globe, LogOut, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('craftsmen'), href: `/${locale}/craftsmen` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'fr' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-2xl font-black text-blue-600">
            {locale === 'ar' ? 'في خدمتك' : 'À votre service'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 font-semibold hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title={locale === 'ar' ? 'Français' : 'العربية'}
            >
              <Globe className="w-5 h-5" />
            </button>

            {session ? (
              // Logged in - Show Dashboard and Logout
              <>
                <Link
                  href={`/${locale}/${session.user.role === 'admin' ? 'admin' : session.user.role === 'craftsman' ? 'craftsman/dashboard' : 'customer/dashboard'}`}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-800 font-semibold hover:text-blue-600 transition"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}` })}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-red-600 font-semibold hover:text-red-700 transition"
                >
                  <LogOut className="w-5 h-5" />
                  {locale === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                </button>
              </>
            ) : (
              // Not logged in - Show Login and Register
              <>
                <Link
                  href={`/${locale}/auth/login`}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-800 font-semibold hover:text-blue-600 transition"
                >
                  <User className="w-5 h-5" />
                  {t('login')}
                </Link>

                <Link
                  href={`/${locale}/auth/register`}
                  className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-md"
                >
                  {t('register')}
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {session ? (
              // Logged in - Show Dashboard and Logout for mobile
              <>
                <Link
                  href={`/${locale}/${session.user.role === 'admin' ? 'admin' : session.user.role === 'craftsman' ? 'craftsman/dashboard' : 'customer/dashboard'}`}
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: `/${locale}` });
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  {locale === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                </button>
              </>
            ) : (
              // Not logged in - Show Login and Register for mobile
              <>
                <Link
                  href={`/${locale}/auth/login`}
                  className="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-bold shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
