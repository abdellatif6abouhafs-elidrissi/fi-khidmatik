import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, DollarSign, Phone, Mail } from 'lucide-react';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';

export default async function BookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await requireCustomer();
  const { locale } = await params;

  await connectDB();

  const bookings = await Booking.find({ customerId: session.user.id })
    .populate({
      path: 'craftsmanId',
      populate: { path: 'userId', select: 'name avatar email phone' },
    })
    .sort({ createdAt: -1 })
    .lean();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'warning',
      confirmed: 'info',
      'in-progress': 'info',
      completed: 'success',
      cancelled: 'danger',
    };
    const labels: Record<string, string> = {
      pending: locale === 'ar' ? 'قيد الانتظار' : 'En attente',
      confirmed: locale === 'ar' ? 'مؤكد' : 'Confirmé',
      'in-progress': locale === 'ar' ? 'جاري التنفيذ' : 'En cours',
      completed: locale === 'ar' ? 'مكتمل' : 'Terminé',
      cancelled: locale === 'ar' ? 'ملغي' : 'Annulé',
    };
    return { variant: variants[status], label: labels[status] };
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'حجوزاتي' : 'Mes réservations'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'إدارة جميع حجوزاتك'
            : 'Gérez toutes vos réservations'}
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking: any) => {
          const statusBadge = getStatusBadge(booking.status);
          return (
            <Card key={booking._id.toString()} variant="elevated">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {booking.craftsmanId?.userId?.name?.charAt(0).toUpperCase() || 'C'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.service}
                      </h3>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <p className="text-gray-700 font-semibold mb-3">
                      {booking.craftsmanId?.userId?.name || (locale === 'ar' ? 'حرفي' : 'Artisan')}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(booking.scheduledDate).toLocaleDateString(
                            locale === 'ar' ? 'ar-MA' : 'fr-FR'
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{booking.scheduledTime || '09:00'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location || (locale === 'ar' ? 'العنوان' : 'Adresse')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold">{booking.price} DH</span>
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="mt-3 text-sm text-gray-600 font-medium">
                        <strong>{locale === 'ar' ? 'ملاحظات:' : 'Notes:'}</strong> {booking.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <Button variant="danger" size="sm">
                      {locale === 'ar' ? 'إلغاء' : 'Annuler'}
                    </Button>
                  )}
                  {booking.status === 'completed' && (
                    <Button variant="primary" size="sm">
                      {locale === 'ar' ? 'تقييم' : 'Évaluer'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        {bookings.length === 0 && (
          <Card variant="elevated">
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium mb-4">
                {locale === 'ar'
                  ? 'ليس لديك أي حجوزات بعد'
                  : "Vous n'avez pas encore de réservations"}
              </p>
              <Button variant="primary">
                {locale === 'ar' ? 'احجز الآن' : 'Réserver maintenant'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
