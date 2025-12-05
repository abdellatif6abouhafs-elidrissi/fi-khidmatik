'use client';

import React, { useState } from 'react';
import Button from './Button';
import Textarea from './Textarea';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  bookingId: string;
  craftsmanId: string;
  locale: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  bookingId,
  craftsmanId,
  locale,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError(locale === 'ar' ? 'يرجى اختيار تقييم' : 'Veuillez sélectionner une note');
      return;
    }

    if (comment.trim().length < 10) {
      setError(
        locale === 'ar'
          ? 'يجب أن يكون التعليق 10 أحرف على الأقل'
          : 'Le commentaire doit contenir au moins 10 caractères'
      );
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          craftsmanId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      // Reset form
      setRating(0);
      setComment('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      setError(error.message || (locale === 'ar' ? 'حدث خطأ' : 'Une erreur est survenue'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {locale === 'ar' ? 'التقييم' : 'Note'}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="mr-2 font-semibold text-gray-700">
              {rating} / 5
            </span>
          )}
        </div>
      </div>

      <Textarea
        label={locale === 'ar' ? 'التعليق' : 'Commentaire'}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={
          locale === 'ar'
            ? 'شارك تجربتك مع هذا الحرفي...'
            : 'Partagez votre expérience avec cet artisan...'
        }
        rows={4}
        required
        error={error}
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={rating === 0 || comment.trim().length < 10}
      >
        {locale === 'ar' ? 'إرسال التقييم' : 'Envoyer l\'avis'}
      </Button>
    </form>
  );
};

export default ReviewForm;
