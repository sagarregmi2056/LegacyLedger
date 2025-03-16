import { NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '@/models/User';
import connectDB from '@/lib/db/mongodb';

// Input validation schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    // Add request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    const body = await req.json();
    
    // Validate input
    const validatedData = signUpSchema.parse(body);

    // Connect to database with error handling
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection error:', error);
      clearTimeout(timeoutId);
      return NextResponse.json(
        { message: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email }).maxTimeMS(5000);
    if (existingUser) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user with timeout
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();

    clearTimeout(timeoutId);
    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      );
    }

    if (error.name === 'AbortError') {
      return NextResponse.json(
        { message: 'Request timeout. Please try again.' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
} 