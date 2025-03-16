import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the DATABASE_URL environment variable');
}

const cached = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
    socketTimeoutMS: 20000, // Timeout after 20 seconds
    connectTimeoutMS: 20000, // Timeout after 20 seconds
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 10,
    minPoolSize: 1,
  } as const;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    const connection = await cached.promise;
    cached.conn = connection;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default connectDB; 