import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Review from '@/models/Review';
import Craftsman from '@/models/Craftsman';
import Booking from '@/models/Booking';
import { getCurrentUser } from '@/lib/auth-helpers';

// Get reviews for a craftsman
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const craftsmanId = searchParams.get('craftsmanId');
    const customerId = searchParams.get('customerId');

    let query: any = {};
    if (craftsmanId) query.craftsmanId = craftsmanId;
    if (customerId) query.customerId = customerId;

    const reviews = await Review.find(query)
      .populate('customerId', 'name avatar')
      .populate('craftsmanId', 'specialty')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// Create a new review
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { bookingId, craftsmanId, rating, comment } = body;

    // Check if booking exists and is completed
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'completed') {
      return NextResponse.json(
        { success: false, error: 'Booking not found or not completed' },
        { status: 400 }
      );
    }

    // Check if customer already reviewed this booking
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this booking' },
        { status: 400 }
      );
    }

    // Create review
    const review = await Review.create({
      bookingId,
      craftsmanId,
      customerId: user.id,
      rating,
      comment,
    });

    // Update craftsman rating
    const reviews = await Review.find({ craftsmanId });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Craftsman.findByIdAndUpdate(craftsmanId, {
      rating: avgRating,
      reviewCount: reviews.length,
    });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
