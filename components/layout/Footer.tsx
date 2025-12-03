'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {locale === 'ar' ? 'في خدمتك' : 'À votre service'}
            </h3>
            <p className="text-sm">
              {locale === 'ar'
                ? 'منصة تربط الحرفيين المهرة بالعملاء في جميع أنحاء المغرب'
                : 'Plateforme connectant artisans qualifiés et clients dans tout le Maroc'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {locale === 'ar' ? 'روابط سريعة' : 'Liens rapides'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/craftsmen`} className="hover:text-white transition">
                  {t('craftsmen')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {locale === 'ar' ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                {locale === 'ar' ? 'سباكة' : 'Plomberie'}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {locale === 'ar' ? 'كهرباء' : 'Électricité'}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {locale === 'ar' ? 'نجارة' : 'Menuiserie'}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {locale === 'ar' ? 'دهان' : 'Peinture'}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@fikhidmatik.ma</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+212 6 00 00 00 00</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            {locale === 'ar'
              ? '© 2025 في خدمتك. جميع الحقوق محفوظة.'
              : '© 2025 À votre service. Tous droits réservés.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
