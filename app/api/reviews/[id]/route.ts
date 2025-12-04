import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Review from '@/models/Review';
import Craftsman from '@/models/Craftsman';
import { getCurrentUser } from '@/lib/auth-helpers';

// Update review (for craftsman response)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { response } = body;

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Check if user is the craftsman of this review
    const craftsman = await Craftsman.findOne({
      _id: review.craftsmanId,
      userId: user.id,
    });

    if (!craftsman) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to respond to this review' },
        { status: 403 }
      );
    }

    review.response = response;
    await review.save();

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner or admin
    if (review.customerId !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to delete this review' },
        { status: 403 }
      );
    }

    await Review.findByIdAndDelete(id);

    // Update craftsman rating
    const reviews = await Review.find({ craftsmanId: review.craftsmanId });
    const avgRating = reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    await Craftsman.findByIdAndUpdate(review.craftsmanId, {
      rating: avgRating,
      reviewCount: reviews.length,
    });

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
