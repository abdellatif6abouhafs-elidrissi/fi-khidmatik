import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectDB from '@/lib/db/mongodb';
import Booking from '@/models/Booking';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const role = session.user.role;

    await connectDB();

    let bookings;
    if (role === 'customer') {
      bookings = await Booking.find({ customerId: session.user.id }).sort({ createdAt: -1 });
    } else if (role === 'craftsman') {
      // Find craftsman profile
      const Craftsman = (await import('@/models/Craftsman')).default;
      const craftsman = await Craftsman.findOne({ userId: session.user.id });
      if (!craftsman) {
        return NextResponse.json({ bookings: [] });
      }
      bookings = await Booking.find({ craftsmanId: craftsman._id.toString() }).sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      craftsmanId,
      service,
      description,
      scheduledDate,
      scheduledTime,
      duration,
      location,
      price,
    } = body;

    if (!craftsmanId || !service || !scheduledDate || !scheduledTime || !duration || !location || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const booking = await Booking.create({
      customerId: session.user.id,
      craftsmanId,
      service,
      description: description || '',
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      duration,
      location,
      price,
      status: 'pending',
      paymentStatus: 'pending',
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
