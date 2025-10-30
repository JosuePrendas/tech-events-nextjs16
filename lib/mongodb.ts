import mongoose from 'mongoose';

// Define the MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Define the structure of the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include mongoose cache
// This prevents TypeScript errors when accessing global.mongoose
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use global variable to cache the connection across hot reloads in development
// In production, this will be initialized once
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Caches the connection to prevent multiple connections during development hot reloads
 * @returns Promise that resolves to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Return pending connection promise if connection is in progress
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering to fail fast on connection issues
    };

    // Create new connection promise
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for connection to establish and cache it
    cached.conn = await cached.promise;
  } catch (e) {
    // Clear the promise on error so next call can retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
