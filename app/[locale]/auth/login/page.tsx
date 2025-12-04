'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const t = useTranslations('auth');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(locale === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Fetch the session to get user role
      const response = await fetch('/api/auth/session');
      const session = await response.json();

      // Redirect based on user role
      let redirectPath = `/${locale}`;
      if (session?.user?.role === 'admin') {
        redirectPath = `/${locale}/admin`;
      } else if (session?.user?.role === 'craftsman') {
        redirectPath = `/${locale}/craftsman/dashboard`;
      } else if (session?.user?.role === 'customer') {
        redirectPath = `/${locale}/customer/dashboard`;
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      setError(locale === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'Une erreur s\'est produite');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2 text-gray-900">
            {t('login')}
          </h1>
          <p className="text-gray-700 font-medium">
            {locale === 'ar' ? 'مرحباً بعودتك!' : 'Bon retour !'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  placeholder={locale === 'ar' ? 'البريد الإلكتروني' : 'Votre email'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  placeholder={locale === 'ar' ? 'كلمة المرور' : 'Votre mot de passe'}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-800 font-medium">
                  {locale === 'ar' ? 'تذكرني' : 'Se souvenir de moi'}
                </span>
              </label>
              <Link href={`/${locale}/auth/forgot-password`} className="text-sm text-blue-600 hover:underline font-bold">
                {t('forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? (
                <span>{locale === 'ar' ? 'جاري تسجيل الدخول...' : 'Connexion...'}</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  {t('login')}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-800 font-medium">
              {t('dontHaveAccount')}{' '}
              <Link href={`/${locale}/auth/register`} className="text-blue-600 hover:underline font-bold">
                {t('register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
