import Card from '@/components/ui/Card';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      customer: 'Ahmed Bennani',
      rating: 5,
      comment: locale === 'ar'
        ? 'عمل ممتاز وسريع. أنصح به بشدة!'
        : 'Excellent travail et rapide. Je recommande vivement!',
      date: '2025-12-01',
      helpful: 12,
    },
    {
      id: '2',
      customer: 'Fatima Zahra',
      rating: 5,
      comment: locale === 'ar'
        ? 'محترف جدا ونظيف في العمل'
        : 'Très professionnel et propre dans son travail',
      date: '2025-11-28',
      helpful: 8,
    },
    {
      id: '3',
      customer: 'Mohamed Alami',
      rating: 4,
      comment: locale === 'ar'
        ? 'جيد جدا، لكن تأخر قليلا'
        : 'Très bien, mais un peu de retard',
      date: '2025-11-25',
      helpful: 5,
    },
  ];

  const stats = {
    average: 4.8,
    total: 47,
    breakdown: {
      5: 38,
      4: 7,
      3: 1,
      2: 1,
      1: 0,
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'التقييمات' : 'Avis'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar' ? 'تقييمات عملائك وملاحظاتهم' : 'Les avis et commentaires de vos clients'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card variant="elevated" className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-12 h-12 fill-current" />
              <span className="text-6xl font-black">{stats.average}</span>
            </div>
            <p className="text-yellow-50 font-medium text-lg">
              {stats.total} {locale === 'ar' ? 'تقييم' : 'avis au total'}
            </p>
          </div>
        </Card>

        <Card variant="elevated">
          <h3 className="font-bold mb-4">{locale === 'ar' ? 'توزيع التقييمات' : 'Répartition des notes'}</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="font-semibold">{star}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(stats.breakdown[star as keyof typeof stats.breakdown] / stats.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {stats.breakdown[star as keyof typeof stats.breakdown]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Reviews List */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'ar' ? 'آخر التقييمات' : 'Derniers avis'}
        </h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {review.customer.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{review.customer}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} {locale === 'ar' ? 'مفيد' : 'utile'}</span>
                    </button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="w-4 h-4" />
                      {locale === 'ar' ? 'رد' : 'Répondre'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
