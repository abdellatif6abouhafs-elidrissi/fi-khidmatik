'use client';

import React from 'react';
import Card from './Card';
import Select from './Select';
import Button from './Button';
import { Star, X } from 'lucide-react';

export interface FilterOptions {
  specialty?: string;
  city?: string;
  minRating?: number;
  minRate?: number;
  maxRate?: number;
  minExperience?: number;
  sortBy?: string;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  cities?: string[];
  locale?: string;
  isMobile?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onClose,
  cities = [],
  locale = 'ar',
  isMobile = false,
}) => {
  const specialties = [
    { value: 'all', label: locale === 'ar' ? 'الكل' : 'Tous' },
    { value: 'plumber', label: locale === 'ar' ? 'سباك' : 'Plombier' },
    { value: 'electrician', label: locale === 'ar' ? 'كهربائي' : 'Électricien' },
    { value: 'carpenter', label: locale === 'ar' ? 'نجار' : 'Menuisier' },
    { value: 'painter', label: locale === 'ar' ? 'دهان' : 'Peintre' },
    { value: 'mason', label: locale === 'ar' ? 'بناء' : 'Maçon' },
    { value: 'gardener', label: locale === 'ar' ? 'بستاني' : 'Jardinier' },
    { value: 'cleaner', label: locale === 'ar' ? 'عامل نظافة' : 'Agent de nettoyage' },
  ];

  const sortOptions = [
    { value: 'rating', label: locale === 'ar' ? 'الأعلى تقييماً' : 'Mieux notés' },
    { value: 'price-low', label: locale === 'ar' ? 'السعر: من الأقل' : 'Prix: croissant' },
    { value: 'price-high', label: locale === 'ar' ? 'السعر: من الأعلى' : 'Prix: décroissant' },
    { value: 'experience', label: locale === 'ar' ? 'الأكثر خبرة' : 'Plus expérimentés' },
    { value: 'reviews', label: locale === 'ar' ? 'الأكثر تقييماً' : 'Plus évalués' },
  ];

  const cityOptions = [
    { value: 'all', label: locale === 'ar' ? 'كل المدن' : 'Toutes les villes' },
    ...cities.map((city) => ({ value: city, label: city })),
  ];

  const handleChange = (key: keyof FilterOptions, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onChange({
      specialty: 'all',
      city: 'all',
      minRating: 0,
      minRate: 0,
      maxRate: 999999,
      minExperience: 0,
      sortBy: 'rating',
    });
  };

  return (
    <Card variant="outlined" padding="lg" className={isMobile ? 'h-full' : ''}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900">
          {locale === 'ar' ? 'فلترة البحث' : 'Filtrer la recherche'}
        </h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Specialty */}
        <Select
          label={locale === 'ar' ? 'التخصص' : 'Spécialité'}
          options={specialties}
          value={filters.specialty || 'all'}
          onChange={(e) => handleChange('specialty', e.target.value)}
        />

        {/* City */}
        <Select
          label={locale === 'ar' ? 'المدينة' : 'Ville'}
          options={cityOptions}
          value={filters.city || 'all'}
          onChange={(e) => handleChange('city', e.target.value)}
        />

        {/* Sort By */}
        <Select
          label={locale === 'ar' ? 'ترتيب حسب' : 'Trier par'}
          options={sortOptions}
          value={filters.sortBy || 'rating'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        />

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'ar' ? 'التقييم الأدنى' : 'Note minimale'}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleChange('minRating', rating)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all ${
                  filters.minRating === rating
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${
                    filters.minRating === rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
                <span className="font-semibold text-sm">{rating}+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'ar' ? 'نطاق السعر (DH/ساعة)' : 'Fourchette de prix (DH/h)'}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={locale === 'ar' ? 'من' : 'De'}
              value={filters.minRate || ''}
              onChange={(e) => handleChange('minRate', parseFloat(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="number"
              placeholder={locale === 'ar' ? 'إلى' : 'À'}
              value={filters.maxRate === 999999 ? '' : filters.maxRate}
              onChange={(e) =>
                handleChange('maxRate', parseFloat(e.target.value) || 999999)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Minimum Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'ar' ? 'الخبرة الأدنى (سنوات)' : 'Expérience minimale (années)'}
          </label>
          <input
            type="number"
            min="0"
            value={filters.minExperience || ''}
            onChange={(e) =>
              handleChange('minExperience', parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          {locale === 'ar' ? 'إعادة تعيين' : 'Réinitialiser'}
        </Button>
      </div>
    </Card>
  );
};

export default FilterPanel;
