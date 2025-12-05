import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Save, Bell, Shield, Globe } from 'lucide-react';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الإعدادات' : 'Paramètres'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar' ? 'إدارة إعدادات حسابك' : 'Gérez les paramètres de votre compte'}
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card variant="elevated">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? 'معلومات الملف الشخصي' : 'Informations du profil'}
            </h2>
          </div>
          <div className="space-y-4">
            <Input
              label={locale === 'ar' ? 'اسم النشاط التجاري' : 'Nom commercial'}
              defaultValue="Électricien Professionnel"
            />
            <Input
              label={locale === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
              defaultValue="+212 6 12 34 56 78"
              type="tel"
            />
            <Input
              label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              defaultValue="electricien@example.com"
              type="email"
            />
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {locale === 'ar' ? 'نبذة تعريفية' : 'Bio'}
              </label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white placeholder:text-gray-400"
                rows={4}
                defaultValue={locale === 'ar'
                  ? 'كهربائي محترف مع 10 سنوات خبرة'
                  : 'Électricien professionnel avec 10 ans d\'expérience'}
              />
            </div>
            <Button variant="primary">
              <Save className="w-4 h-4" />
              {locale === 'ar' ? 'حفظ التغييرات' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card variant="elevated">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? 'الإشعارات' : 'Notifications'}
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: locale === 'ar' ? 'حجوزات جديدة' : 'Nouvelles réservations',
                desc: locale === 'ar' ? 'تلقي إشعارات عند الحجوزات الجديدة' : 'Recevoir des notifications pour nouvelles réservations',
              },
              {
                title: locale === 'ar' ? 'الرسائل' : 'Messages',
                desc: locale === 'ar' ? 'تلقي إشعارات الرسائل الجديدة' : 'Recevoir des notifications pour nouveaux messages',
              },
              {
                title: locale === 'ar' ? 'التقييمات' : 'Avis',
                desc: locale === 'ar' ? 'تلقي إشعارات التقييمات الجديدة' : 'Recevoir des notifications pour nouveaux avis',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Security */}
        <Card variant="elevated">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? 'الأمان' : 'Sécurité'}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {locale === 'ar' ? 'تغيير كلمة المرور' : 'Changer le mot de passe'}
                </h3>
                <p className="text-sm text-gray-600">
                  {locale === 'ar' ? 'آخر تغيير منذ 3 أشهر' : 'Dernier changement il y a 3 mois'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {locale === 'ar' ? 'تغيير' : 'Modifier'}
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {locale === 'ar' ? 'المصادقة الثنائية' : 'Authentification à deux facteurs'}
                </h3>
                <p className="text-sm text-gray-600">
                  {locale === 'ar' ? 'غير مفعل' : 'Non activée'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {locale === 'ar' ? 'تفعيل' : 'Activer'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
