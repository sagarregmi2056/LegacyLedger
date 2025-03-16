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
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000, // Reduced from 10s to 5s
    socketTimeoutMS: 10000, // Reduced from 20s to 10s
    connectTimeoutMS: 10000, // Reduced from 20s to 10s
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 5, // Reduced from 10 to 5 for Vercel serverless
    minPoolSize: 1,
    family: 4, // Use IPv4, skip trying IPv6
    autoIndex: true, // Build indexes
    maxConnecting: 2, // Maximum number of connections being established at once
    heartbeatFrequencyMS: 5000, // How often to check connection health
    keepAlive: true, // Keep connections alive
    keepAliveInitialDelay: 300000, // 5 minutes
  } as const;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, opts).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    });
  }

  try {
    const connection = await Promise.race([
      cached.promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000)
      )
    ]);
    
    cached.conn = connection as typeof mongoose;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default connectDB; 