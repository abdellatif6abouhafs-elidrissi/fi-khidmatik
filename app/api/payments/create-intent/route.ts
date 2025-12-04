import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import { getCurrentUser } from '@/lib/auth-helpers';

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
    const { bookingId } = body;

    // Get booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if user owns this booking
    if (booking.customerId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if already paid
    if (booking.paymentStatus === 'paid') {
      return NextResponse.json(
        { success: false, error: 'Booking already paid' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.price * 100), // Convert to cents
      currency: 'mad',
      metadata: {
        bookingId: booking._id.toString(),
        customerId: user.id,
      },
      description: `Payment for ${booking.service}`,
    });

    // Save payment intent ID to booking
    booking.paymentIntent = paymentIntent.id;
    await booking.save();

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
