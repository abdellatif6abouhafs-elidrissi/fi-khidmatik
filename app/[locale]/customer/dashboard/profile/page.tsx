import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import connectDB from '@/lib/db/mongodb';
import UserModel from '@/models/User';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await requireCustomer();
  const { locale } = await params;

  await connectDB();
  const user = await UserModel.findById(session.user.id).lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الملف الشخصي' : 'Mon profil'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'إدارة معلوماتك الشخصية'
            : 'Gérez vos informations personnelles'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card variant="elevated">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-5xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600 font-medium mb-4">{user?.email}</p>
            <Button variant="outline" className="w-full">
              {locale === 'ar' ? 'تغيير الصورة' : 'Changer la photo'}
            </Button>
          </div>
        </Card>

        {/* Profile Form */}
        <Card variant="elevated" className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'ar' ? 'المعلومات الشخصية' : 'Informations personnelles'}
          </h2>
          <form className="space-y-4">
            <Input
              label={locale === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
              icon={<User />}
              defaultValue={user?.name || ''}
              placeholder={locale === 'ar' ? 'أدخل اسمك' : 'Entrez votre nom'}
            />
            <Input
              label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              icon={<Mail />}
              type="email"
              defaultValue={user?.email || ''}
              placeholder={locale === 'ar' ? 'أدخل بريدك' : 'Entrez votre email'}
            />
            <Input
              label={locale === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
              icon={<Phone />}
              type="tel"
              defaultValue={user?.phone || ''}
              placeholder={locale === 'ar' ? 'أدخل رقم هاتفك' : 'Entrez votre téléphone'}
            />
            <Input
              label={locale === 'ar' ? 'العنوان' : 'Adresse'}
              icon={<MapPin />}
              defaultValue={user?.address || ''}
              placeholder={locale === 'ar' ? 'أدخل عنوانك' : 'Entrez votre adresse'}
            />

            <div className="flex gap-3 pt-4">
              <Button variant="primary" className="flex-1">
                {locale === 'ar' ? 'حفظ التغييرات' : 'Enregistrer les modifications'}
              </Button>
              <Button variant="outline" className="flex-1">
                {locale === 'ar' ? 'إلغاء' : 'Annuler'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Security Settings */}
      <Card variant="elevated" className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'ar' ? 'الأمان' : 'Sécurité'}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                {locale === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {locale === 'ar'
                  ? 'آخر تغيير منذ 3 أشهر'
                  : 'Dernière modification il y a 3 mois'}
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
              <p className="text-sm text-gray-600 font-medium">
                {locale === 'ar'
                  ? 'غير مفعل'
                  : 'Non activée'}
              </p>
            </div>
            <Button variant="outline" size="sm">
              {locale === 'ar' ? 'تفعيل' : 'Activer'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
