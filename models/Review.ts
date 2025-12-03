import mongoose, { Schema, Model } from 'mongoose';
import { IReview } from '@/types';

const ReviewSchema = new Schema<IReview>(
  {
    bookingId: {
      type: String,
      required: true,
      ref: 'Booking',
    },
    craftsmanId: {
      type: String,
      required: true,
      ref: 'Craftsman',
    },
    customerId: {
      type: String,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      maxlength: 500,
    },
    response: {
      type: String,
      default: '',
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
