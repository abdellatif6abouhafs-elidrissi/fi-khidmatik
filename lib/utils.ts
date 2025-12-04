import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'MAD') {
  return new Intl.NumberFormat('ar-MA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date | string, locale: string = 'ar') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function calculateRating(reviews: { rating: number }[]) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return +(sum / reviews.length).toFixed(1);
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: 'warning',
    confirmed: 'info',
    'in-progress': 'info',
    completed: 'success',
    cancelled: 'danger',
    paid: 'success',
    refunded: 'warning',
  };
  return colors[status] || 'default';
}
