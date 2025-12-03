import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Craftsman from '@/models/Craftsman';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Filters
    const specialty = searchParams.get('specialty');
    const city = searchParams.get('city');
    const minRating = searchParams.get('minRating');
    const maxRate = searchParams.get('maxRate');
    const verified = searchParams.get('verified');
    const search = searchParams.get('search');

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    await connectDB();

    // Build query
    const query: any = {};

    if (specialty) query.specialty = specialty;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (maxRate) query.hourlyRate = { $lte: parseFloat(maxRate) };
    if (verified === 'true') query.verified = true;

    // Get craftsmen
    const craftsmen = await Craftsman.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ rating: -1, reviewCount: -1 });

    // Get user details for each craftsman
    const craftsmenWithUsers = await Promise.all(
      craftsmen.map(async (craftsman) => {
        const user = await User.findById(craftsman.userId).select('-password');
        return {
          ...craftsman.toObject(),
          user: user?.toObject(),
        };
      })
    );

    // Filter by search if provided
    let results = craftsmenWithUsers;
    if (search) {
      results = craftsmenWithUsers.filter(c =>
        c.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        c.bio.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = await Craftsman.countDocuments(query);

    return NextResponse.json({
      craftsmen: results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching craftsmen:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
