import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default async function BookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mock data - replace with actual API call
  const bookings = [
    {
      id: '1',
      customerName: 'Ahmed Bennani',
      service: locale === 'ar' ? 'صيانة كهربائية' : 'Maintenance électrique',
      date: '2025-12-10',
      time: '14:00',
      location: 'Casablanca',
      status: 'pending',
      price: 350,
    },
    {
      id: '2',
      customerName: 'Fatima Zahra',
      service: locale === 'ar' ? 'تركيب مصابيح' : 'Installation de luminaires',
      date: '2025-12-12',
      time: '10:00',
      location: 'Rabat',
      status: 'confirmed',
      price: 200,
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    if (locale === 'ar') {
      switch (status) {
        case 'pending':
          return 'قيد الانتظار';
        case 'confirmed':
          return 'مؤكد';
        case 'completed':
          return 'مكتمل';
        case 'cancelled':
          return 'ملغى';
        default:
          return status;
      }
    } else {
      switch (status) {
        case 'pending':
          return 'En attente';
        case 'confirmed':
          return 'Confirmé';
        case 'completed':
          return 'Terminé';
        case 'cancelled':
          return 'Annulé';
        default:
          return status;
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الحجوزات' : 'Réservations'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar' ? 'إدارة جميع حجوزاتك' : 'Gérez toutes vos réservations'}
        </p>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} variant="elevated">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{booking.customerName}</h3>
                    <p className="text-gray-600 font-medium">{booking.service}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Badge variant={getStatusVariant(booking.status)}>
                  {getStatusLabel(booking.status)}
                </Badge>
                <div className="text-2xl font-bold text-blue-600">
                  {booking.price} DH
                </div>
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="primary">
                      {locale === 'ar' ? 'قبول' : 'Accepter'}
                    </Button>
                    <Button size="sm" variant="outline">
                      {locale === 'ar' ? 'رفض' : 'Refuser'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {bookings.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 font-medium">
            {locale === 'ar' ? 'لا توجد حجوزات' : 'Aucune réservation'}
          </p>
        </Card>
      )}
    </div>
  );
}
