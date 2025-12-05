'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Shield,
  ChevronDown,
} from 'lucide-react';

interface Craftsman {
  _id: string;
  specialty: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  location: {
    city: string;
    address: string;
  };
  rating: number;
  reviewCount: number;
  verified: boolean;
  user: {
    name: string;
    avatar?: string;
  };
}

export default function CraftsmenPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
    city: '',
    minRating: '',
    maxRate: '',
    verified: false,
  });

  const specialties = [
    { value: 'plumber', label: locale === 'ar' ? 'سباك' : 'Plombier' },
    { value: 'electrician', label: locale === 'ar' ? 'كهربائي' : 'Électricien' },
    { value: 'carpenter', label: locale === 'ar' ? 'نجار' : 'Menuisier' },
    { value: 'painter', label: locale === 'ar' ? 'دهان' : 'Peintre' },
    { value: 'mason', label: locale === 'ar' ? 'بناء' : 'Maçon' },
    { value: 'gardener', label: locale === 'ar' ? 'بستاني' : 'Jardinier' },
    { value: 'cleaner', label: locale === 'ar' ? 'عامل نظافة' : 'Agent de nettoyage' },
  ];

  useEffect(() => {
    fetchCraftsmen();
  }, [filters]);

  const fetchCraftsmen = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.city) params.append('city', filters.city);
      if (filters.minRating) params.append('minRating', filters.minRating);
      if (filters.maxRate) params.append('maxRate', filters.maxRate);
      if (filters.verified) params.append('verified', 'true');

      const res = await fetch(`/api/craftsmen?${params.toString()}`);
      const data = await res.json();
      setCraftsmen(data.craftsmen || []);
    } catch (error) {
      console.error('Error fetching craftsmen:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">
              {locale === 'ar' ? 'ابحث عن حرفي' : 'Trouver un artisan'}
            </h1>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'ابحث بالاسم أو التخصص...' : 'Rechercher par nom ou spécialité...'}
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2 justify-center"
              >
                <Filter className="w-5 h-5" />
                {locale === 'ar' ? 'فلاتر' : 'Filtres'}
                <ChevronDown className={`w-4 h-4 transition ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'ar' ? 'التخصص' : 'Spécialité'}
                  </label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">{locale === 'ar' ? 'الكل' : 'Tous'}</option>
                    {specialties.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'ar' ? 'المدينة' : 'Ville'}
                  </label>
                  <input
                    type="text"
                    placeholder={locale === 'ar' ? 'المدينة' : 'Ville'}
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'ar' ? 'التقييم الأدنى' : 'Note minimale'}
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">{locale === 'ar' ? 'الكل' : 'Tous'}</option>
                    <option value="4">4+ ⭐</option>
                    <option value="4.5">4.5+ ⭐</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {locale === 'ar' ? 'السعر الأقصى (DH/ساعة)' : 'Prix max (DH/h)'}
                  </label>
                  <input
                    type="number"
                    placeholder={locale === 'ar' ? 'السعر' : 'Prix'}
                    value={filters.maxRate}
                    onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {locale === 'ar' ? 'حرفيون موثقون فقط' : 'Artisans vérifiés uniquement'}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{locale === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
            </div>
          ) : craftsmen.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {locale === 'ar' ? 'لم يتم العثور على حرفيين' : 'Aucun artisan trouvé'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {craftsmen.length} {locale === 'ar' ? 'حرفي متاح' : 'artisan(s) disponible(s)'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {craftsmen.map((craftsman) => (
                  <Link
                    key={craftsman._id}
                    href={`/${locale}/craftsmen/${craftsman._id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                          {craftsman.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{craftsman.user?.name}</h3>
                            {craftsman.verified && (
                              <Shield className="w-4 h-4 text-blue-600" fill="currentColor" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {specialties.find((s) => s.value === craftsman.specialty)?.label}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {craftsman.bio}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          <span className="font-semibold">{craftsman.rating.toFixed(1)}</span>
                          <span>({craftsman.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{craftsman.location.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-1 text-blue-600 font-bold">
                          <DollarSign className="w-5 h-5" />
                          <span>{craftsman.hourlyRate} DH/h</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {craftsman.experience} {locale === 'ar' ? 'سنوات خبرة' : 'ans d\'exp.'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
