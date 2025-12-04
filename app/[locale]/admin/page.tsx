import { requireAdmin } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import { Users, Wrench, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';
import Craftsman from '@/models/Craftsman';
import Booking from '@/models/Booking';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await requireAdmin();
  const { locale } = await params;

  // Fetch statistics
  await connectDB();

  const [
    totalUsers,
    totalCraftsmen,
    totalBookings,
    pendingBookings,
    completedBookings,
    totalRevenue,
  ] = await Promise.all([
    User.countDocuments({ role: { $in: ['customer', 'craftsman'] } }),
    Craftsman.countDocuments(),
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'completed' }),
    Booking.aggregate([
      { $match: { status: 'completed', paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]),
  ]);

  const revenue = totalRevenue[0]?.total || 0;

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي المستخدمين' : 'Total Utilisateurs',
      value: totalUsers,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      color: 'blue',
    },
    {
      title: locale === 'ar' ? 'الحرفيون' : 'Artisans',
      value: totalCraftsmen,
      icon: Wrench,
      trend: '+8%',
      trendUp: true,
      color: 'green',
    },
    {
      title: locale === 'ar' ? 'الحجوزات' : 'Réservations',
      value: totalBookings,
      icon: Calendar,
      trend: '+23%',
      trendUp: true,
      color: 'purple',
    },
    {
      title: locale === 'ar' ? 'الإيرادات' : 'Revenus',
      value: `${revenue.toLocaleString()} DH`,
      icon: DollarSign,
      trend: '+15%',
      trendUp: true,
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'مرحباً بك في لوحة تحكم المشرف'
            : 'Bienvenue sur le tableau de bord administrateur'}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
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
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <TrendIcon className="w-4 h-4" />
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            {locale === 'ar' ? 'الحجوزات المعلقة' : 'Réservations en attente'}
          </h2>
          <div className="space-y-3">
            {pendingBookings > 0 ? (
              <p className="text-gray-600 font-medium">
                {locale === 'ar'
                  ? `${pendingBookings} حجوزات بانتظار المراجعة`
                  : `${pendingBookings} réservations en attente de révision`}
              </p>
            ) : (
              <p className="text-gray-500 font-medium">
                {locale === 'ar'
                  ? 'لا توجد حجوزات معلقة'
                  : 'Aucune réservation en attente'}
              </p>
            )}
          </div>
        </Card>

        <Card variant="elevated">
          <h2 className="text-xl font-black text-gray-900 mb-4">
            {locale === 'ar' ? 'الحجوزات المكتملة' : 'Réservations terminées'}
          </h2>
          <div className="space-y-3">
            <p className="text-gray-600 font-medium">
              {locale === 'ar'
                ? `${completedBookings} حجوزات مكتملة`
                : `${completedBookings} réservations terminées`}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
