'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Button from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onToggleFilters?: () => void;
  placeholder?: string;
  locale?: string;
  showFilterButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onToggleFilters,
  placeholder,
  locale = 'ar',
  showFilterButton = true,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const defaultPlaceholder =
    locale === 'ar'
      ? 'ابحث عن حرفي أو خدمة...'
      : 'Rechercher un artisan ou un service...';

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
      {showFilterButton && onToggleFilters && (
        <Button type="button" variant="outline" onClick={onToggleFilters}>
          <SlidersHorizontal className="w-5 h-5" />
          {locale === 'ar' ? 'فلاتر' : 'Filtres'}
        </Button>
      )}
      <Button type="submit" variant="primary">
        {locale === 'ar' ? 'بحث' : 'Rechercher'}
      </Button>
    </form>
  );
};

export default SearchBar;
