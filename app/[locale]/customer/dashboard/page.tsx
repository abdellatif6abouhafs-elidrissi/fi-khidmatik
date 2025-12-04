import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, DollarSign, Plus } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import Craftsman from '@/models/Craftsman';
import User from '@/models/User';

export default async function CustomerDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await requireCustomer();
  const { locale } = await params;

  await connectDB();

  const [recentBookings, stats] = await Promise.all([
    Booking.find({ customerId: session.user.id })
      .populate({
        path: 'craftsmanId',
        populate: { path: 'userId', select: 'name avatar' },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Booking.aggregate([
      { $match: { customerId: session.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const statsMap = stats.reduce((acc: any, stat: any) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {});

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {locale === 'ar' ? 'مرحباً' : 'Bienvenue'}, {session.user.name}
          </h1>
          <p className="text-gray-600 font-medium">
            {locale === 'ar'
              ? 'إليك ملخص حجوزاتك'
              : 'Voici un résumé de vos réservations'}
          </p>
        </div>
        <Link href={`/${locale}/craftsmen`}>
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            {locale === 'ar' ? 'حجز جديد' : 'Nouvelle réservation'}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card variant="elevated">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">
                {locale === 'ar' ? 'قيد الانتظار' : 'En attente'}
              </p>
              <p className="text-2xl font-black text-gray-900">
                {statsMap.pending || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">
                {locale === 'ar' ? 'مؤكد' : 'Confirmé'}
              </p>
              <p className="text-2xl font-black text-gray-900">
                {statsMap.confirmed || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">
                {locale === 'ar' ? 'جاري التنفيذ' : 'En cours'}
              </p>
              <p className="text-2xl font-black text-gray-900">
                {statsMap['in-progress'] || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">
                {locale === 'ar' ? 'مكتمل' : 'Terminé'}
              </p>
              <p className="text-2xl font-black text-gray-900">
                {statsMap.completed || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card variant="elevated">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            {locale === 'ar' ? 'الحجوزات الأخيرة' : 'Réservations récentes'}
          </h2>
          <Link href={`/${locale}/customer/dashboard/bookings`}>
            <Button variant="ghost" size="sm">
              {locale === 'ar' ? 'عرض الكل' : 'Voir tout'}
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentBookings.map((booking: any) => {
            const statusBadge = getStatusBadge(booking.status);
            return (
              <div
                key={booking._id.toString()}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {booking.craftsmanId?.userId?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">
                        {booking.service}
                      </h3>
                      <Badge variant={statusBadge.variant} size="sm">
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      {booking.craftsmanId?.userId?.name || 'حرفي'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.scheduledDate).toLocaleDateString(
                        locale === 'ar' ? 'ar-MA' : 'fr-FR'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span>{booking.price} DH</span>
                  </div>
                </div>
              </div>
            );
          })}

          {recentBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium mb-4">
                {locale === 'ar'
                  ? 'ليس لديك أي حجوزات بعد'
                  : "Vous n'avez pas encore de réservations"}
              </p>
              <Link href={`/${locale}/craftsmen`}>
                <Button variant="primary">
                  {locale === 'ar' ? 'احجز الآن' : 'Réserver maintenant'}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
