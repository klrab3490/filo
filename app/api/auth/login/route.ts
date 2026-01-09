import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth'
import type { LoginRequest, AuthResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Find user by email (include password field)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    })

    // Set auth cookie
    await setAuthCookie(token)

    // Return success response
    const response: AuthResponse = {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      message: 'Login successful',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
