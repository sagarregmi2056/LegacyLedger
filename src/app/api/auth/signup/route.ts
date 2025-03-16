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

export const runtime = 'nodejs'; // Force Node.js runtime
export const maxDuration = 10; // Set max duration to 10 seconds

export async function POST(req: Request) {
  try {
    // Add request timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );

    const result = await Promise.race([
      handleSignup(req),
      timeoutPromise
    ]);

    return result;
  } catch (error: unknown) {
    console.error('Signup error:', error);
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json(
        { message: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

async function handleSignup(req: Request) {
  try {
    // Parse and validate input first
    const body = await req.json();
    console.log('Received signup request:', { ...body, password: '[REDACTED]' });
    const validatedData = signUpSchema.parse(body);

    // Connect to database with timeout
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
      const existingUser = await User.findOne({ email: validatedData.email.toLowerCase() });
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
        email: validatedData.email.toLowerCase(),
        password: validatedData.password,
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user.toObject();

      console.log('User created successfully:', { id: user._id, email: user.email });
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
    console.error('Signup handler error:', error);

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