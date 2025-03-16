import { NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '@/models/User';
import connectDB from '@/lib/db/mongodb';
import mongoose from 'mongoose';

// Input validation schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    // Parse and validate input first
    const body = await req.json();
    const validatedData = signUpSchema.parse(body);

    // Connect to database
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { message: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }

    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return NextResponse.json(
        { message: 'Error checking user existence. Please try again.' },
        { status: 500 }
      );
    }

    // Create new user
    try {
      const user = await User.create({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user.toObject();

      return NextResponse.json(
        { message: 'User created successfully', user: userWithoutPassword },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(
          { message: 'Invalid user data', errors: error.errors },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: 'Error creating user. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
} 