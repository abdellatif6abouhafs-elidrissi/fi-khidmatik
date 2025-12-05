'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, MapPin, FileText } from 'lucide-react';

function CreateBookingForm() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const craftsmanId = searchParams.get('craftsmanId');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [loading, setLoading] = useState(false);
  const [craftsman, setCraftsman] = useState<any>(null);
  const [formData, setFormData] = useState({
    service: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 2,
    location: {
      address: '',
      city: '',
    },
  });

  useEffect(() => {
    if (craftsmanId) {
      fetchCraftsman();
    }
  }, [craftsmanId]);

  const fetchCraftsman = async () => {
    try {
      const res = await fetch(`/api/craftsmen/${craftsmanId}`);
      const data = await res.json();
      setCraftsman(data.craftsman);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculatePrice = () => {
    return craftsman ? craftsman.hourlyRate * formData.duration : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          craftsmanId,
          price: calculatePrice(),
        }),
      });

      if (!res.ok) throw new Error('Failed to create booking');

      const data = await res.json();
      router.push(`/${locale}/profile/bookings?success=true`);
    } catch (error) {
      alert(locale === 'ar' ? 'حدث خطأ' : 'Une erreur s\'est produite');
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!session) {
    router.push(`/${locale}/auth/login`);
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              {locale === 'ar' ? 'حجز موعد' : 'Réserver un rendez-vous'}
            </h1>

            {craftsman && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">{craftsman.user?.name}</h3>
                <p className="text-gray-600">{craftsman.location.city}</p>
                <p className="text-blue-600 font-bold mt-2">{craftsman.hourlyRate} DH/h</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'الخدمة' : 'Service'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                  placeholder={locale === 'ar' ? 'مثال: إصلاح صنبور' : 'Ex: Réparation robinet'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'الوصف' : 'Description'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                  rows={4}
                  placeholder={locale === 'ar' ? 'صف المشكلة...' : 'Décrivez le problème...'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {locale === 'ar' ? 'التاريخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {locale === 'ar' ? 'الوقت' : 'Heure'}
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'المدة (ساعات)' : 'Durée (heures)'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {locale === 'ar' ? 'المدينة' : 'Ville'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {locale === 'ar' ? 'العنوان' : 'Adresse'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.location.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value }
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                  placeholder={locale === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}
                />
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">{locale === 'ar' ? 'المجموع:' : 'Total :'}</span>
                  <span className="text-2xl font-bold text-blue-600">{calculatePrice()} DH</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {loading
                  ? (locale === 'ar' ? 'جاري الحجز...' : 'Réservation...')
                  : (locale === 'ar' ? 'تأكيد الحجز' : 'Confirmer la réservation')
                }
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CreateBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CreateBookingForm />
    </Suspense>
  );
}
