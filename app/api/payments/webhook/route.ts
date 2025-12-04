import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';
import Notification from '@/models/Notification';
import Craftsman from '@/models/Craftsman';
import { sendNotification } from '@/lib/socket';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    await connectDB();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        if (bookingId) {
          const booking = await Booking.findById(bookingId);
          if (booking) {
            booking.paymentStatus = 'paid';
            booking.status = 'confirmed';
            await booking.save();

            // Notify craftsman
            const craftsman = await Craftsman.findById(
              booking.craftsmanId
            ).populate('userId');

            if (craftsman) {
              const notification = await Notification.create({
                userId: craftsman.userId,
                type: 'booking',
                title: 'حجز جديد مؤكد',
                message: `تم تأكيد حجز جديد لخدمة ${booking.service}`,
                link: `/craftsman/dashboard/bookings/${booking._id}`,
                data: { bookingId: booking._id },
              });

              try {
                sendNotification(craftsman.userId.toString(), notification);
              } catch (error) {
                console.error('Error sending notification:', error);
              }
            }
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        if (bookingId) {
          const booking = await Booking.findById(bookingId);
          if (booking) {
            // Notify customer of failed payment
            await Notification.create({
              userId: booking.customerId,
              type: 'payment',
              title: 'فشل الدفع',
              message: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى',
              link: `/customer/dashboard/bookings/${booking._id}`,
              data: { bookingId: booking._id },
            });
          }
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;

        const booking = await Booking.findOne({
          paymentIntent: paymentIntentId,
        });

        if (booking) {
          booking.paymentStatus = 'refunded';
          booking.status = 'cancelled';
          await booking.save();

          // Notify customer
          await Notification.create({
            userId: booking.customerId,
            type: 'payment',
            title: 'تم استرداد المبلغ',
            message: 'تم استرداد مبلغ الحجز بنجاح',
            link: `/customer/dashboard/bookings/${booking._id}`,
            data: { bookingId: booking._id },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
