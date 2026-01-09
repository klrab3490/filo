/**
 * MongoDB Connection Module
 *
 * Implements connection caching for Next.js serverless environment.
 * Prevents connection exhaustion by reusing existing connections.
 *
 * Design Decisions:
 * - Global caching to persist across serverless function invocations
 * - Retry logic with exponential backoff for transient failures
 * - Connection state monitoring to prevent duplicate connections
 * - Proper error handling and logging for debugging
 */

import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

/**
 * Global cache to maintain connection across serverless invocations
 * TypeScript requires explicit typing for global augmentation
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

/**
 * Connect to MongoDB with retry logic and connection caching
 *
 * @returns {Promise<typeof mongoose>} Mongoose instance
 * @throws {Error} If connection fails after retries
 */
export async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    console.log('✓ Using cached MongoDB connection')
    return cached.conn
  }

  // Return pending connection promise if one exists
  if (cached.promise) {
    console.log('⏳ Waiting for pending MongoDB connection...')
    cached.conn = await cached.promise
    return cached.conn
  }

  // Configure mongoose connection options
  const opts: mongoose.ConnectOptions = {
    bufferCommands: false, // Disable buffering for better error handling in serverless
    maxPoolSize: 10, // Limit connection pool size
    minPoolSize: 2, // Maintain minimum connections
    serverSelectionTimeoutMS: 5000, // Timeout for server selection
    socketTimeoutMS: 45000, // Socket timeout
  }

  console.log('⚡ Establishing new MongoDB connection...')

  // Create new connection promise with retry logic
  cached.promise = connectWithRetry(MONGODB_URI, opts, 3)

  try {
    cached.conn = await cached.promise
    console.log('✓ MongoDB connected successfully')
    return cached.conn
  } catch (error) {
    cached.promise = null // Clear failed promise
    console.error('✗ MongoDB connection failed:', error)
    throw error
  }
}

/**
 * Connect to MongoDB with retry logic
 *
 * @param {string} uri - MongoDB connection string
 * @param {mongoose.ConnectOptions} opts - Connection options
 * @param {number} retries - Number of retry attempts
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise<typeof mongoose>} Mongoose instance
 */
async function connectWithRetry(
  uri: string,
  opts: mongoose.ConnectOptions,
  retries: number = 3,
  delay: number = 1000
): Promise<typeof mongoose> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, opts)

      // Set up connection event listeners
      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
      })

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected')
      })

      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected')
      })

      return conn
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, error)

      if (attempt === retries) {
        throw new Error(
          `Failed to connect to MongoDB after ${retries} attempts: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }

      // Exponential backoff with jitter
      const backoffDelay = delay * Math.pow(2, attempt - 1) + Math.random() * 1000
      console.log(`⏳ Retrying in ${Math.round(backoffDelay)}ms...`)
      await new Promise((resolve) => setTimeout(resolve, backoffDelay))
    }
  }

  throw new Error('Unexpected error in connectWithRetry')
}

/**
 * Check if database is connected
 *
 * @returns {boolean} Connection status
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1
}

/**
 * Gracefully disconnect from MongoDB
 * Use this in application shutdown handlers
 *
 * @returns {Promise<void>}
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect()
    cached.conn = null
    cached.promise = null
    console.log('MongoDB disconnected')
  }
}

/**
 * Get current connection state as string
 *
 * @returns {string} Connection state
 */
export function getConnectionState(): string {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  return states[mongoose.connection.readyState] || 'unknown'
}
