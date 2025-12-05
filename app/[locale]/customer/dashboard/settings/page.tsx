import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Bell, Globe, Mail, Shield, Trash2 } from 'lucide-react';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await requireCustomer();
  const { locale } = await params;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الإعدادات' : 'Paramètres'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'تخصيص تجربتك'
            : 'Personnalisez votre expérience'}
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <Card variant="elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {locale === 'ar' ? 'الإشعارات' : 'Notifications'}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                {locale === 'ar'
                  ? 'إدارة تفضيلات الإشعارات'
                  : 'Gérez vos préférences de notifications'}
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: locale === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Notifications email',
                    desc: locale === 'ar' ? 'تلقي التحديثات عبر البريد' : 'Recevoir les mises à jour par email',
                  },
                  {
                    title: locale === 'ar' ? 'إشعارات الحجوزات' : 'Notifications de réservation',
                    desc: locale === 'ar' ? 'عند تأكيد أو إلغاء الحجز' : 'Lors de la confirmation ou annulation',
                  },
                  {
                    title: locale === 'ar' ? 'إشعارات الرسائل' : 'Notifications de messages',
                    desc: locale === 'ar' ? 'عند استلام رسالة جديدة' : 'Lors de la réception d\'un message',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600 font-medium">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Language */}
        <Card variant="elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {locale === 'ar' ? 'اللغة' : 'Langue'}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                {locale === 'ar'
                  ? 'اختر لغتك المفضلة'
                  : 'Choisissez votre langue préférée'}
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium text-gray-900 bg-white">
                <option value="ar">{locale === 'ar' ? 'العربية' : 'Arabe'}</option>
                <option value="fr">{locale === 'ar' ? 'الفرنسية' : 'Français'}</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card variant="elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {locale === 'ar' ? 'الخصوصية والأمان' : 'Confidentialité et sécurité'}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                {locale === 'ar'
                  ? 'إدارة خصوصيتك وأمانك'
                  : 'Gérez votre confidentialité et sécurité'}
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  {locale === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  {locale === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  {locale === 'ar' ? 'تحميل بياناتي' : 'Télécharger mes données'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card variant="elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {locale === 'ar' ? 'منطقة الخطر' : 'Zone de danger'}
              </h2>
              <p className="text-gray-600 font-medium mb-4">
                {locale === 'ar'
                  ? 'إجراءات لا يمكن التراجع عنها'
                  : 'Actions irréversibles'}
              </p>
              <Button variant="danger">
                {locale === 'ar' ? 'حذف الحساب' : 'Supprimer le compte'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
