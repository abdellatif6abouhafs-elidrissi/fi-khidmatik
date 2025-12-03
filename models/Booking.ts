import mongoose, { Schema, Model } from 'mongoose';
import { IBooking } from '@/types';

const BookingSchema = new Schema<IBooking>(
  {
    customerId: {
      type: String,
      required: true,
      ref: 'User',
    },
    craftsmanId: {
      type: String,
      required: true,
      ref: 'Craftsman',
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    scheduledDate: {
      type: Date,
      required: [true, 'Scheduled date is required'],
    },
    scheduledTime: {
      type: String,
      required: [true, 'Scheduled time is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: 1,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentIntent: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
