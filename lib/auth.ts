/**
 * Authentication Module
 *
 * Provides JWT-based authentication and password hashing utilities.
 * Implements secure token management and session handling.
 *
 * Security Practices:
 * - Passwords hashed with bcrypt (salt rounds: 12)
 * - JWT tokens stored in httpOnly cookies to prevent XSS
 * - Token expiration enforced
 * - No sensitive data in JWT payload
 * - Secure cookie attributes in production
 */

import bcrypt from 'bcryptjs'
import jwt, { type Secret } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { JWTPayload, Session } from '@/types'

if (!process.env.JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local')
}

const JWT_SECRET: Secret = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const COOKIE_NAME = 'auth_token'
const SALT_ROUNDS = 12

/**
 * Hash a plain text password using bcrypt
 *
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 * @throws {Error} If hashing fails
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    return hash
  } catch (error) {
    console.error('Password hashing error:', error)
    throw new Error('Failed to hash password')
  }
}

/**
 * Compare a plain text password with a hashed password
 *
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if passwords match
 * @throws {Error} If comparison fails
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    if (!password || !hash) {
      return false
    }

    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
  } catch (error) {
    console.error('Password comparison error:', error)
    return false
  }
}

/**
 * Generate a JWT token for a user
 *
 * @param {JWTPayload} payload - User data to encode in token
 * @returns {string} JWT token
 * @throws {Error} If token generation fails
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  try {
    // @ts-expect-error - JWT types have issues with expiresIn string type
    const token = jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'flux-app',
        audience: 'flux-users',
      }
    )

    return token
  } catch (error) {
    console.error('Token generation error:', error)
    throw new Error('Failed to generate token')
  }
}

/**
 * Verify and decode a JWT token
 *
 * @param {string} token - JWT token to verify
 * @returns {JWTPayload | null} Decoded payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'flux-app',
      audience: 'flux-users',
    }) as JWTPayload

    return decoded
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn('Token expired:', error.expiredAt)
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Invalid token:', error.message)
    } else {
      console.error('Token verification error:', error)
    }
    return null
  }
}

/**
 * Set authentication cookie with JWT token
 *
 * @param {string} token - JWT token
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === 'production'

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, // Prevent XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: 'lax', // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/', // Available across entire site
  })
}

/**
 * Clear authentication cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * Get authentication token from cookie
 *
 * @returns {Promise<string | null>} JWT token or null
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)
    return token?.value || null
  } catch (error) {
    console.error('Error reading auth cookie:', error)
    return null
  }
}

/**
 * Get current server-side session from cookie
 *
 * This function should be used in:
 * - Server Components
 * - Server Actions
 * - API Route Handlers
 * - Middleware
 *
 * @returns {Promise<Session | null>} User session or null if not authenticated
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const token = await getAuthToken()

    if (!token) {
      return null
    }

    const payload = verifyToken(token)

    if (!payload) {
      return null
    }

    const session: Session = {
      userId: payload.userId,
      email: payload.email,
      username: payload.username,
      isAdmin: payload.isAdmin,
    }

    return session
  } catch (error) {
    console.error('Error getting server session:', error)
    return null
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use this in API routes and server actions that require auth
 *
 * @returns {Promise<Session>} User session
 * @throws {Error} If not authenticated
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession()

  if (!session) {
    throw new Error('Authentication required')
  }

  return session
}

/**
 * Require admin authentication - throws if not admin
 * Use this in admin-only routes and actions
 *
 * @returns {Promise<Session>} Admin session
 * @throws {Error} If not authenticated or not admin
 */
export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth()

  if (!session.isAdmin) {
    throw new Error('Admin access required')
  }

  return session
}

/**
 * Validate password strength
 *
 * @param {string} password - Password to validate
 * @returns {{ valid: boolean; errors: string[] }} Validation result
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!password) {
    errors.push('Password is required')
    return { valid: false, errors }
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters')
  }

  // Optional: Add more complex validation rules
  // Keeping it simple for academic project as per requirements

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Sanitize user object by removing sensitive fields
 *
 * @param {any} user - User object from database
 * @returns {any} Sanitized user object
 */
export function sanitizeUser(user: any): any {
  if (!user) return null

  const sanitized = { ...user }
  delete sanitized.password
  delete sanitized.__v

  // Convert _id to id if using MongoDB
  if (sanitized._id) {
    sanitized.id = sanitized._id.toString()
    delete sanitized._id
  }

  return sanitized
}
