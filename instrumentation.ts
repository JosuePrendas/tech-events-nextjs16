/**
 * Next.js Instrumentation Hook
 * This file runs once when the server starts, before any requests are handled
 * Perfect place to initialize database connections
 */

export async function register() {
  // Only run on server-side (not in edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { connectDB } = await import('./lib/mongodb');
    
    try {
      console.log('🔄 Initializing MongoDB connection...');
      await connectDB();
      console.log('✅ MongoDB connection initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize MongoDB connection:', error);
      // Log but don't throw - allow the app to start and handle errors gracefully per-request
      console.error('⚠️  Application will start, but database operations will fail until connection is established');
    }
  }
}
