import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Star, MapPin, DollarSign, Heart } from 'lucide-react';

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await requireCustomer();
  const { locale } = await params;

  // This will be populated later with actual favorites from database
  const favorites: any[] = [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'المفضلة' : 'Mes favoris'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'الحرفيون المفضلون لديك'
            : 'Vos artisans préférés'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <Card variant="elevated">
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-4">
              {locale === 'ar'
                ? 'ليس لديك أي حرفيين مفضلين بعد'
                : "Vous n'avez pas encore d'artisans favoris"}
            </p>
            <Button variant="primary">
              {locale === 'ar' ? 'تصفح الحرفيين' : 'Parcourir les artisans'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((craftsman: any) => (
            <Card key={craftsman._id} variant="elevated" hover>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">
                    {craftsman.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {craftsman.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {craftsman.specialty}
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">
                    {craftsman.rating}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    ({craftsman.reviewCount})
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 font-medium mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{craftsman.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{craftsman.hourlyRate} DH/h</span>
                  </div>
                </div>
                <Button variant="primary" className="w-full">
                  {locale === 'ar' ? 'احجز الآن' : 'Réserver'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
