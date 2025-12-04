import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Craftsman from '@/models/Craftsman';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const craftsmen = await Craftsman.find({ verified: false })
      .populate('userId', 'name email phone avatar')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      craftsmen,
    });
  } catch (error) {
    console.error('Error fetching pending craftsmen:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pending craftsmen' },
      { status: 500 }
    );
  }
}
