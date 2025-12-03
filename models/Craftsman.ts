import mongoose, { Schema, Model } from 'mongoose';
import { ICraftsman } from '@/types';

const CraftsmanSchema = new Schema<ICraftsman>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      enum: ['plumber', 'electrician', 'carpenter', 'painter', 'mason', 'gardener', 'cleaner', 'other'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: 500,
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: 0,
    },
    availability: [
      {
        day: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        },
        startTime: String,
        endTime: String,
      },
    ],
    portfolio: [
      {
        title: String,
        description: String,
        images: [String],
      },
    ],
    location: {
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    certifications: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Craftsman: Model<ICraftsman> =
  mongoose.models.Craftsman || mongoose.model<ICraftsman>('Craftsman', CraftsmanSchema);

export default Craftsman;
