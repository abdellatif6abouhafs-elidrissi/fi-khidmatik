'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User, Mail, Lock, Phone, UserCircle, Wrench } from 'lucide-react';

export default function RegisterPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: (searchParams.get('type') === 'craftsman' ? 'craftsman' : 'customer') as 'customer' | 'craftsman',
  });

  const [craftsmanData, setCraftsmanData] = useState({
    specialty: '',
    bio: '',
    experience: 0,
    hourlyRate: 0,
    location: {
      city: '',
      address: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(locale === 'ar' ? 'كلمات المرور غير متطابقة' : 'Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.role === 'craftsman' && step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          craftsmanData: formData.role === 'craftsman' ? craftsmanData : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push(`/${locale}/auth/login?registered=true`);
    } catch (error: any) {
      setError(error.message || (locale === 'ar' ? 'حدث خطأ أثناء التسجيل' : 'Une erreur s\'est produite'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2 text-gray-900">{t('register')}</h1>
          <p className="text-gray-700 font-medium">
            {locale === 'ar' ? 'أنشئ حسابك الآن' : 'Créez votre compte maintenant'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-3 text-gray-900">{t('role')}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition ${
                  formData.role === 'customer'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300 text-gray-800'
                }`}
              >
                <UserCircle className="w-8 h-8" />
                <span className="font-bold">{t('customer')}</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'craftsman' })}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition ${
                  formData.role === 'craftsman'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300 text-gray-800'
                }`}
              >
                <Wrench className="w-8 h-8" />
                <span className="font-bold">{t('craftsman')}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('name')}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                      placeholder={locale === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                      placeholder={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('phone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                      placeholder="+212 6 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                      placeholder={locale === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
                      minLength={6}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">{t('confirmPassword')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                      placeholder={locale === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer mot de passe'}
                      minLength={6}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && formData.role === 'craftsman' && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {locale === 'ar' ? 'التخصص' : 'Spécialité'}
                  </label>
                  <select
                    required
                    value={craftsmanData.specialty}
                    onChange={(e) => setCraftsmanData({ ...craftsmanData, specialty: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  >
                    <option value="">{locale === 'ar' ? 'اختر التخصص' : 'Choisir une spécialité'}</option>
                    <option value="plumber">{locale === 'ar' ? 'سباك' : 'Plombier'}</option>
                    <option value="electrician">{locale === 'ar' ? 'كهربائي' : 'Électricien'}</option>
                    <option value="carpenter">{locale === 'ar' ? 'نجار' : 'Menuisier'}</option>
                    <option value="painter">{locale === 'ar' ? 'دهان' : 'Peintre'}</option>
                    <option value="mason">{locale === 'ar' ? 'بناء' : 'Maçon'}</option>
                    <option value="gardener">{locale === 'ar' ? 'بستاني' : 'Jardinier'}</option>
                    <option value="cleaner">{locale === 'ar' ? 'عامل نظافة' : 'Agent de nettoyage'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {locale === 'ar' ? 'نبذة عنك' : 'À propos'}
                  </label>
                  <textarea
                    required
                    value={craftsmanData.bio}
                    onChange={(e) => setCraftsmanData({ ...craftsmanData, bio: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                    rows={4}
                    placeholder={locale === 'ar' ? 'أخبرنا عن خبرتك ومهاراتك' : 'Parlez-nous de votre expérience'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {locale === 'ar' ? 'سنوات الخبرة' : 'Années d\'expérience'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={craftsmanData.experience}
                      onChange={(e) => setCraftsmanData({ ...craftsmanData, experience: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">
                      {locale === 'ar' ? 'السعر بالساعة (درهم)' : 'Tarif horaire (DH)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={craftsmanData.hourlyRate}
                      onChange={(e) => setCraftsmanData({ ...craftsmanData, hourlyRate: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {locale === 'ar' ? 'المدينة' : 'Ville'}
                  </label>
                  <input
                    type="text"
                    required
                    value={craftsmanData.location.city}
                    onChange={(e) => setCraftsmanData({
                      ...craftsmanData,
                      location: { ...craftsmanData.location, city: e.target.value }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                    placeholder={locale === 'ar' ? 'المدينة' : 'Ville'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    {locale === 'ar' ? 'العنوان' : 'Adresse'}
                  </label>
                  <input
                    type="text"
                    required
                    value={craftsmanData.location.address}
                    onChange={(e) => setCraftsmanData({
                      ...craftsmanData,
                      location: { ...craftsmanData.location, address: e.target.value }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                    placeholder={locale === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full border-2 border-gray-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-50 transition shadow-sm"
                >
                  {locale === 'ar' ? 'رجوع' : 'Retour'}
                </button>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 shadow-md"
            >
              {loading
                ? (locale === 'ar' ? 'جاري التسجيل...' : 'Inscription...')
                : (step === 1 && formData.role === 'craftsman'
                  ? (locale === 'ar' ? 'التالي' : 'Suivant')
                  : t('register')
                )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-800 font-medium">
              {t('alreadyHaveAccount')}{' '}
              <Link href={`/${locale}/auth/login`} className="text-blue-600 hover:underline font-bold">
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
