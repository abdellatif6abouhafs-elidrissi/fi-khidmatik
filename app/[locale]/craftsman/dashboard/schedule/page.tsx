import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Clock, Plus, Edit, Trash2 } from 'lucide-react';

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const daysOfWeek = [
    { en: 'Monday', fr: 'Lundi', ar: 'الإثنين' },
    { en: 'Tuesday', fr: 'Mardi', ar: 'الثلاثاء' },
    { en: 'Wednesday', fr: 'Mercredi', ar: 'الأربعاء' },
    { en: 'Thursday', fr: 'Jeudi', ar: 'الخميس' },
    { en: 'Friday', fr: 'Vendredi', ar: 'الجمعة' },
    { en: 'Saturday', fr: 'Samedi', ar: 'السبت' },
    { en: 'Sunday', fr: 'Dimanche', ar: 'الأحد' },
  ];

  // Mock schedule data
  const schedule = [
    { day: 'Monday', startTime: '09:00', endTime: '18:00', available: true },
    { day: 'Tuesday', startTime: '09:00', endTime: '18:00', available: true },
    { day: 'Wednesday', startTime: '09:00', endTime: '18:00', available: true },
    { day: 'Thursday', startTime: '09:00', endTime: '18:00', available: true },
    { day: 'Friday', startTime: '09:00', endTime: '15:00', available: true },
    { day: 'Saturday', startTime: '', endTime: '', available: false },
    { day: 'Sunday', startTime: '', endTime: '', available: false },
  ];

  const getDayLabel = (day: string) => {
    const dayObj = daysOfWeek.find((d) => d.en === day);
    if (!dayObj) return day;
    return locale === 'ar' ? dayObj.ar : dayObj.fr;
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {locale === 'ar' ? 'الجدول الزمني' : 'Horaires'}
          </h1>
          <p className="text-gray-600 font-medium">
            {locale === 'ar'
              ? 'إدارة أوقات العمل والتوفر'
              : 'Gérez vos heures de travail et disponibilité'}
          </p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          {locale === 'ar' ? 'إضافة وقت' : 'Ajouter un horaire'}
        </Button>
      </div>

      <Card variant="elevated" padding="none">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? 'جدول الأسبوع' : 'Horaires hebdomadaires'}
            </h2>
          </div>
        </div>

        <div className="divide-y">
          {schedule.map((slot) => (
            <div
              key={slot.day}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {getDayLabel(slot.day)}
                </h3>
                {slot.available ? (
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500 font-medium">
                    {locale === 'ar' ? 'غير متاح' : 'Non disponible'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    slot.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {slot.available
                    ? locale === 'ar'
                      ? 'متاح'
                      : 'Disponible'
                    : locale === 'ar'
                    ? 'مغلق'
                    : 'Fermé'}
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                {slot.available && (
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card variant="elevated">
          <h3 className="text-gray-600 font-medium mb-2">
            {locale === 'ar' ? 'إجمالي ساعات العمل' : 'Total heures de travail'}
          </h3>
          <div className="text-3xl font-black text-blue-600">47h</div>
          <p className="text-sm text-gray-500 mt-1">
            {locale === 'ar' ? 'في الأسبوع' : 'par semaine'}
          </p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-gray-600 font-medium mb-2">
            {locale === 'ar' ? 'أيام العمل' : 'Jours travaillés'}
          </h3>
          <div className="text-3xl font-black text-green-600">5</div>
          <p className="text-sm text-gray-500 mt-1">
            {locale === 'ar' ? 'من 7 أيام' : 'sur 7 jours'}
          </p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-gray-600 font-medium mb-2">
            {locale === 'ar' ? 'متوسط الحجوزات' : 'Réservations moyennes'}
          </h3>
          <div className="text-3xl font-black text-purple-600">12</div>
          <p className="text-sm text-gray-500 mt-1">
            {locale === 'ar' ? 'في الأسبوع' : 'par semaine'}
          </p>
        </Card>
      </div>
    </div>
  );
}
