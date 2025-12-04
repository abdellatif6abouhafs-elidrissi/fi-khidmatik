import { requireCraftsman } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import Craftsman from '@/models/Craftsman';
import Review from '@/models/Review';

export default async function CraftsmanDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await requireCraftsman();
  const { locale } = await params;

  await connectDB();

  const craftsman = await Craftsman.findOne({ userId: session.user.id })
    .select('_id rating reviewCount verified')
    .lean();

  if (!craftsman) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'لم يتم العثور على ملف الحرفي'
            : 'Profil artisan non trouvé'}
        </p>
      </div>
    );
  }

  const [bookings, earnings, recentBookings] = await Promise.all([
    Booking.aggregate([
      { $match: { craftsmanId: craftsman._id.toString() } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]),
    Booking.aggregate([
      {
        $match: {
          craftsmanId: craftsman._id.toString(),
          status: 'completed',
          paymentStatus: 'paid',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
          count: { $sum: 1 },
        },
      },
    ]),
    Booking.find({ craftsmanId: craftsman._id.toString() })
      .populate('customerId', 'name email phone')
      .sort({ scheduledDate: -1 })
      .limit(5)
      .lean(),
  ]);

  const statsMap = bookings.reduce((acc: any, booking: any) => {
    acc[booking._id] = booking.count;
    return acc;
  }, {});

  const totalEarnings = earnings[0]?.total || 0;
  const completedBookings = earnings[0]?.count || 0;

  const stats = [
    {
      title: locale === 'ar' ? 'الطلبات الجديدة' : 'Nouvelles demandes',
      value: statsMap.pending || 0,
      icon: Clock,
      color: 'yellow',
      trend: '+12%',
    },
    {
      title: locale === 'ar' ? 'الأرباح الإجمالية' : 'Revenus totaux',
      value: `${totalEarnings.toLocaleString()} DH`,
      icon: DollarSign,
      color: 'green',
      trend: '+23%',
    },
    {
      title: locale === 'ar' ? 'التقييم' : 'Note',
      value: craftsman.rating.toFixed(1),
      icon: Star,
      color: 'orange',
      trend: `${craftsman.reviewCount} ${locale === 'ar' ? 'تقييم' : 'avis'}`,
    },
    {
      title: locale === 'ar' ? 'الحجوزات المكتملة' : 'Terminées',
      value: completedBookings,
      icon: CheckCircle,
      color: 'blue',
      trend: '+18%',
    },
  ];

  const colorClasses: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'warning',
      confirmed: 'info',
      'in-progress': 'info',
      completed: 'success',
      cancelled: 'danger',
    };
    const labels: Record<string, string> = {
      pending: locale === 'ar' ? 'جديد' : 'Nouveau',
      confirmed: locale === 'ar' ? 'مؤكد' : 'Confirmé',
      'in-progress': locale === 'ar' ? 'جاري' : 'En cours',
      completed: locale === 'ar' ? 'مكتمل' : 'Terminé',
      cancelled: locale === 'ar' ? 'ملغي' : 'Annulé',
    };
    return { variant: variants[status], label: labels[status] };
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'مرحباً' : 'Bienvenue'}, {session.user.name}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'إليك ملخص نشاطك'
            : 'Voici un résumé de votre activité'}
        </p>
        {!craftsman.verified && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-semibold">
              {locale === 'ar'
                ? '⚠️ حسابك قيد المراجعة من قبل الإدارة'
                : '⚠️ Votre compte est en cours de vérification par l\'administration'}
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} variant="elevated" hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-black text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <Card variant="elevated">
        <h2 className="text-2xl font-black text-gray-900 mb-6">
          {locale === 'ar' ? 'الحجوزات القادمة' : 'Réservations à venir'}
        </h2>

        <div className="space-y-4">
          {recentBookings.map((booking: any) => {
            const statusBadge = getStatusBadge(booking.status);
            return (
              <div
                key={booking._id.toString()}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {booking.customerId?.name?.charAt(0).toUpperCase() || 'C'}
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
                      {booking.customerId?.name || 'Client'}
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
              <p className="text-gray-500 font-medium">
                {locale === 'ar'
                  ? 'لا توجد حجوزات حالياً'
                  : 'Aucune réservation pour le moment'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
