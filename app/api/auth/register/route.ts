import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { hashPassword, generateToken, setAuthCookie, validatePassword } from '@/lib/auth'
import type { RegisterRequest, AuthResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()
    const { email, password, firstName, lastName, username } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !username) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.errors.join(', ') },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    })

    if (existingUser) {
      const field = existingUser.email === email.toLowerCase() ? 'Email' : 'Username'
      return NextResponse.json(
        { success: false, error: `${field} already exists` },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      username: username.toLowerCase(),
      firstName,
      lastName,
      isAdmin: false,
    })

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
      message: 'Account created successfully',
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
