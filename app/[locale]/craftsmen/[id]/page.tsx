'use client';

import { useState, useEffect, use } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Star,
  MapPin,
  DollarSign,
  Shield,
  Calendar,
  Clock,
  Award,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

export default function CraftsmanDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = use(params);
  const { data: session } = useSession();
  const t = useTranslations();
  const [craftsman, setCraftsman] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchCraftsmanDetails();
  }, [id]);

  const fetchCraftsmanDetails = async () => {
    try {
      const res = await fetch(`/api/craftsmen/${id}`);
      const data = await res.json();
      setCraftsman(data.craftsman);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>{locale === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!craftsman) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>{locale === 'ar' ? 'حرفي غير موجود' : 'Artisan non trouvé'}</p>
        </div>
        <Footer />
      </>
    );
  }

  const specialtyLabels: Record<string, any> = {
    plumber: { ar: 'سباك', fr: 'Plombier' },
    electrician: { ar: 'كهربائي', fr: 'Électricien' },
    carpenter: { ar: 'نجار', fr: 'Menuisier' },
    painter: { ar: 'دهان', fr: 'Peintre' },
    mason: { ar: 'بناء', fr: 'Maçon' },
    gardener: { ar: 'بستاني', fr: 'Jardinier' },
    cleaner: { ar: 'عامل نظافة', fr: 'Agent de nettoyage' },
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            href={`/${locale}/craftsmen`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === 'ar' ? 'رجوع' : 'Retour'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                    {craftsman.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{craftsman.user?.name}</h1>
                      {craftsman.verified && (
                        <Shield className="w-6 h-6 text-blue-600" fill="currentColor" />
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-3">
                      {specialtyLabels[craftsman.specialty]?.[locale]}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                        <span className="font-bold text-lg">{craftsman.rating.toFixed(1)}</span>
                        <span className="text-gray-600">({craftsman.reviewCount} {locale === 'ar' ? 'تقييم' : 'avis'})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{craftsman.location.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{craftsman.experience} {locale === 'ar' ? 'سنوات خبرة' : 'ans d\'expérience'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold text-lg mb-3">
                    {locale === 'ar' ? 'نبذة عني' : 'À propos'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{craftsman.bio}</p>
                </div>
              </div>

              {/* Portfolio */}
              {craftsman.portfolio && craftsman.portfolio.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="font-bold text-xl mb-6">
                    {locale === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {craftsman.portfolio.map((item: any, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden border">
                        <div className="aspect-video bg-gray-200"></div>
                        <div className="p-4">
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {craftsman.certifications && craftsman.certifications.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    {locale === 'ar' ? 'الشهادات' : 'Certifications'}
                  </h3>
                  <div className="space-y-2">
                    {craftsman.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="font-bold text-xl mb-6">
                  {locale === 'ar' ? 'التقييمات' : 'Avis'} ({reviews.length})
                </h3>
                {reviews.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    {locale === 'ar' ? 'لا توجد تقييمات بعد' : 'Pas d\'avis encore'}
                  </p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review: any) => (
                      <div key={review._id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                            {review.customer?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold">{review.customer?.name}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString(locale)}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            {review.response && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">{locale === 'ar' ? 'رد الحرفي:' : 'Réponse :'}</span> {review.response}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 mb-2">
                    <DollarSign className="w-8 h-8" />
                    <span>{craftsman.hourlyRate} DH</span>
                  </div>
                  <p className="text-gray-600">{locale === 'ar' ? 'بالساعة' : 'par heure'}</p>
                </div>

                {session ? (
                  <>
                    <Link
                      href={`/${locale}/bookings/create?craftsmanId=${id}`}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-3"
                    >
                      <Calendar className="w-5 h-5" />
                      {locale === 'ar' ? 'احجز الآن' : 'Réserver maintenant'}
                    </Link>
                    <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      {locale === 'ar' ? 'مراسلة' : 'Message'}
                    </button>
                  </>
                ) : (
                  <Link
                    href={`/${locale}/auth/login`}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center block"
                  >
                    {locale === 'ar' ? 'سجل دخولك للحجز' : 'Connectez-vous pour réserver'}
                  </Link>
                )}

                {/* Availability */}
                {craftsman.availability && craftsman.availability.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">
                      {locale === 'ar' ? 'الأوقات المتاحة' : 'Disponibilité'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {craftsman.availability.map((slot: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span className="capitalize">{slot.day}</span>
                          <span className="text-gray-600">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
