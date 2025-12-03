import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';
import Craftsman from '@/models/Craftsman';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone, role, craftsmanData } = body;

    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // If role is craftsman, create craftsman profile
    if (role === 'craftsman' && craftsmanData) {
      await Craftsman.create({
        userId: user._id.toString(),
        specialty: craftsmanData.specialty,
        bio: craftsmanData.bio || '',
        experience: craftsmanData.experience || 0,
        hourlyRate: craftsmanData.hourlyRate || 0,
        location: craftsmanData.location,
        availability: [],
        portfolio: [],
        certifications: [],
        rating: 0,
        reviewCount: 0,
        verified: false,
      });
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
