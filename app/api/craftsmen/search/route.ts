import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Craftsman from '@/models/Craftsman';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Get query parameters
    const query = searchParams.get('q') || '';
    const specialty = searchParams.get('specialty');
    const city = searchParams.get('city');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const maxRate = parseFloat(searchParams.get('maxRate') || '999999');
    const minRate = parseFloat(searchParams.get('minRate') || '0');
    const minExperience = parseInt(searchParams.get('minExperience') || '0');
    const verified = searchParams.get('verified');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Build filter object
    const filter: any = { verified: true };

    // Text search on bio
    if (query) {
      filter.$or = [
        { bio: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } },
      ];
    }

    // Specialty filter
    if (specialty && specialty !== 'all') {
      filter.specialty = specialty;
    }

    // City filter
    if (city && city !== 'all') {
      filter['location.city'] = city;
    }

    // Rating filter
    if (minRating > 0) {
      filter.rating = { $gte: minRating };
    }

    // Hourly rate filter
    if (minRate > 0 || maxRate < 999999) {
      filter.hourlyRate = {
        $gte: minRate,
        $lte: maxRate,
      };
    }

    // Experience filter
    if (minExperience > 0) {
      filter.experience = { $gte: minExperience };
    }

    // Verified filter
    if (verified === 'true') {
      filter.verified = true;
    }

    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'price-low':
        sort = { hourlyRate: 1 };
        break;
      case 'price-high':
        sort = { hourlyRate: -1 };
        break;
      case 'experience':
        sort = { experience: -1 };
        break;
      case 'reviews':
        sort = { reviewCount: -1 };
        break;
      default:
        sort = { rating: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [craftsmen, total] = await Promise.all([
      Craftsman.find(filter)
        .populate('userId', 'name avatar email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Craftsman.countDocuments(filter),
    ]);

    // Get unique cities for filter options
    const cities = await Craftsman.distinct('location.city', { verified: true });

    return NextResponse.json({
      success: true,
      craftsmen,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      filters: {
        cities: cities.sort(),
      },
    });
  } catch (error) {
    console.error('Error searching craftsmen:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search craftsmen' },
      { status: 500 }
    );
  }
}
