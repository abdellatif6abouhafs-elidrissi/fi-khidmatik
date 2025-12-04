import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  phone: z.string().min(10, 'رقم الهاتف غير صالح'),
  role: z.enum(['customer', 'craftsman']),
});

export const craftsmanProfileSchema = z.object({
  specialty: z.enum(['plumber', 'electrician', 'carpenter', 'painter', 'mason', 'gardener', 'cleaner', 'other']),
  bio: z.string().min(50, 'السيرة الذاتية يجب أن تكون 50 حرف على الأقل').max(500, 'السيرة الذاتية طويلة جداً'),
  experience: z.number().min(0, 'الخبرة يجب أن تكون رقماً موجباً'),
  hourlyRate: z.number().min(0, 'السعر بالساعة يجب أن يكون رقماً موجباً'),
  city: z.string().min(2, 'المدينة مطلوبة'),
  address: z.string().min(5, 'العنوان مطلوب'),
});

export const bookingSchema = z.object({
  craftsmanId: z.string(),
  service: z.string().min(3, 'الخدمة مطلوبة'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  scheduledDate: z.date(),
  scheduledTime: z.string(),
  duration: z.number().min(1, 'المدة يجب أن تكون ساعة واحدة على الأقل'),
  address: z.string().min(5, 'العنوان مطلوب'),
  city: z.string().min(2, 'المدينة مطلوبة'),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'التعليق يجب أن يكون 10 أحرف على الأقل'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CraftsmanProfileInput = z.infer<typeof craftsmanProfileSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
