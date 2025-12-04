import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Craftsman from '@/models/Craftsman';
import { requireAdmin } from '@/lib/auth-helpers';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { verified } = body;

    const craftsman = await Craftsman.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );

    if (!craftsman) {
      return NextResponse.json(
        { success: false, error: 'Craftsman not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      craftsman,
      message: verified
        ? 'Craftsman verified successfully'
        : 'Craftsman verification denied',
    });
  } catch (error) {
    console.error('Error verifying craftsman:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify craftsman' },
      { status: 500 }
    );
  }
}
