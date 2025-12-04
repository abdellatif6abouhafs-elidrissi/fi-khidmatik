'use client';

import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import Textarea from './Textarea';
import { Star, MessageCircle, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ReviewCardProps {
  review: {
    _id: string;
    customerId: {
      name: string;
      avatar?: string;
    };
    rating: number;
    comment: string;
    response?: string;
    createdAt: string;
  };
  locale: string;
  canRespond?: boolean;
  canDelete?: boolean;
  onRespond?: (reviewId: string, response: string) => Promise<void>;
  onDelete?: (reviewId: string) => Promise<void>;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  locale,
  canRespond = false,
  canDelete = false,
  onRespond,
  onDelete,
}) => {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [response, setResponse] = useState(review.response || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitResponse = async () => {
    if (!onRespond || !response.trim()) return;

    setIsSubmitting(true);
    try {
      await onRespond(review._id, response);
      setShowResponseForm(false);
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm(locale === 'ar' ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Êtes-vous sûr de supprimer cet avis ?')) {
      return;
    }

    try {
      await onDelete(review._id);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Card variant="outlined" padding="md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {review.customerId.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">
              {review.customerId.name}
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              {formatDate(review.createdAt, locale)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          {canDelete && (
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-gray-700 font-medium mb-4 leading-relaxed">
        {review.comment}
      </p>

      {/* Craftsman Response */}
      {review.response && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-r-4 border-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-blue-900 text-sm">
              {locale === 'ar' ? 'رد الحرفي:' : 'Réponse de l\'artisan:'}
            </span>
          </div>
          <p className="text-gray-700 font-medium">{review.response}</p>
        </div>
      )}

      {/* Response Form */}
      {canRespond && !review.response && (
        <div className="mt-4">
          {showResponseForm ? (
            <div className="space-y-3">
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder={
                  locale === 'ar'
                    ? 'اكتب ردك على هذا التقييم...'
                    : 'Écrivez votre réponse à cet avis...'
                }
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitResponse}
                  isLoading={isSubmitting}
                  disabled={!response.trim()}
                >
                  {locale === 'ar' ? 'إرسال الرد' : 'Envoyer la réponse'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResponseForm(false)}
                >
                  {locale === 'ar' ? 'إلغاء' : 'Annuler'}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResponseForm(true)}
            >
              <MessageCircle className="w-4 h-4" />
              {locale === 'ar' ? 'الرد على التقييم' : 'Répondre à l\'avis'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ReviewCard;
