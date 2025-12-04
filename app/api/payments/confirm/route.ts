import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import Notification from '@/models/Notification';
import Craftsman from '@/models/Craftsman';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sendNotification } from '@/lib/socket';

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
    const { paymentIntentId } = body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Update booking
    const booking = await Booking.findOne({ paymentIntent: paymentIntentId });
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    await booking.save();

    // Get craftsman info
    const craftsman = await Craftsman.findById(booking.craftsmanId).populate(
      'userId',
      'name'
    );

    // Send notification to craftsman
    if (craftsman) {
      const notification = await Notification.create({
        userId: craftsman.userId,
        type: 'booking',
        title: 'حجز جديد مؤكد',
        message: `تم تأكيد حجز جديد لخدمة ${booking.service}`,
        link: `/craftsman/dashboard/bookings/${booking._id}`,
        data: { bookingId: booking._id },
      });

      // Send real-time notification
      try {
        sendNotification(craftsman.userId.toString(), notification);
      } catch (error) {
        console.error('Error sending real-time notification:', error);
      }
    }

    // Send notification to customer
    const customerNotification = await Notification.create({
      userId: user.id,
      type: 'payment',
      title: 'تم الدفع بنجاح',
      message: `تم تأكيد دفع الحجز بنجاح`,
      link: `/customer/dashboard/bookings/${booking._id}`,
      data: { bookingId: booking._id },
    });

    try {
      sendNotification(user.id, customerNotification);
    } catch (error) {
      console.error('Error sending real-time notification:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
      booking,
    });
  } catch (error: any) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
