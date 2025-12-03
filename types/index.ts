// User Types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'customer' | 'craftsman' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Craftsman Types
export interface ICraftsman {
  _id: string;
  userId: string;
  specialty: string; // plumber, electrician, carpenter, etc.
  bio: string;
  experience: number; // years
  hourlyRate: number;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  portfolio: {
    title: string;
    description: string;
    images: string[];
  }[];
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  certifications: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export interface IBooking {
  _id: string;
  customerId: string;
  craftsmanId: string;
  service: string;
  description: string;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // hours
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentIntent?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface IReview {
  _id: string;
  bookingId: string;
  craftsmanId: string;
  customerId: string;
  rating: number; // 1-5
  comment: string;
  response?: string; // craftsman response
  createdAt: Date;
  updatedAt: Date;
}

// Chat Types
export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  read: boolean;
  createdAt: Date;
}

export interface IConversation {
  _id: string;
  participants: string[]; // user IDs
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Search & Filter Types
export interface SearchFilters {
  specialty?: string;
  city?: string;
  minRating?: number;
  maxRate?: number;
  available?: boolean;
  verified?: boolean;
}

// Locale Types
export type Locale = 'ar' | 'fr';

export interface LocaleParams {
  locale: Locale;
}
