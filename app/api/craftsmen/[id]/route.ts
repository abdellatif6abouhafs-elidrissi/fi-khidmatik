import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Craftsman from '@/models/Craftsman';
import User from '@/models/User';
import Review from '@/models/Review';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const craftsman = await Craftsman.findById(id);

    if (!craftsman) {
      return NextResponse.json(
        { error: 'Craftsman not found' },
        { status: 404 }
      );
    }

    const user = await User.findById(craftsman.userId).select('-password');

    // Get reviews
    const reviews = await Review.find({ craftsmanId: id })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get customer details for each review
    const reviewsWithCustomers = await Promise.all(
      reviews.map(async (review) => {
        const customer = await User.findById(review.customerId).select('name avatar');
        return {
          ...review.toObject(),
          customer: customer?.toObject(),
        };
      })
    );

    return NextResponse.json({
      craftsman: {
        ...craftsman.toObject(),
        user: user?.toObject(),
      },
      reviews: reviewsWithCustomers,
    });
  } catch (error) {
    console.error('Error fetching craftsman:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
