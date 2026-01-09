import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import User from '@/models/User'
import { requireAuth } from '@/lib/auth'
import type { CreatePostRequest, Post as PostType } from '@/types'

// GET /api/posts - Fetch all posts
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const sentiment = searchParams.get('sentiment')
    const flagged = searchParams.get('flagged')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build query
    const query: any = {}
    if (userId) query.userId = userId
    if (sentiment) query.sentiment = sentiment
    if (flagged !== null && flagged !== undefined) {
      query.flagged = flagged === 'true'
    }

    // Fetch posts with user details
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'firstName lastName username avatar')
      .lean()

    // Transform posts to match frontend expectations
    const transformedPosts = posts.map((post: any) => ({
      id: post._id.toString(),
      userId: post.userId._id.toString(),
      userName: `${post.userId.firstName} ${post.userId.lastName}`,
      userAvatar: post.userId.avatar,
      content: post.content,
      sentiment: post.sentiment,
      flagged: post.flagged,
      isFlagged: post.flagged,
      flagReason: post.flagReason,
      likes: post.likes.length,
      isLiked: false, // Will be determined by client
      comments: post.comments.length,
      commentsCount: post.comments.length,
      timestamp: post.createdAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }))

    return NextResponse.json(
      { success: true, posts: transformedPosts, total: transformedPosts.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await requireAuth()

    const body: CreatePostRequest = await request.json()
    const { content } = body

    // Validate content
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Content must be less than 2000 characters' },
        { status: 400 }
      )
    }

    await connectDB()

    // Simple sentiment analysis (you can enhance this with lib/ai/sentiment.ts)
    let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral'
    const positiveWords = ['great', 'awesome', 'amazing', 'love', 'excellent', 'fantastic']
    const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'horrible', 'worst']

    const lowerContent = content.toLowerCase()
    const hasPositive = positiveWords.some((word) => lowerContent.includes(word))
    const hasNegative = negativeWords.some((word) => lowerContent.includes(word))

    if (hasPositive && !hasNegative) sentiment = 'Positive'
    else if (hasNegative && !hasPositive) sentiment = 'Negative'

    // Simple moderation (you can enhance this with lib/ai/bannedWords.ts)
    const bannedWords = ['spam', 'scam', 'banned_word']
    const flagged = bannedWords.some((word) => lowerContent.includes(word))
    const flagReason = flagged ? 'Contains inappropriate content' : undefined

    // Create post
    const post = await Post.create({
      userId: session.userId,
      content,
      sentiment,
      flagged,
      flagReason,
      likes: [],
      comments: [],
    })

    // Fetch user details for response
    const user = await User.findById(session.userId).select(
      'firstName lastName username avatar'
    )

    const transformedPost: PostType = {
      id: post._id.toString(),
      userId: session.userId,
      userName: `${user?.firstName} ${user?.lastName}`,
      userAvatar: user?.avatar,
      content: post.content,
      sentiment: post.sentiment,
      flagged: post.flagged,
      isFlagged: post.flagged,
      flagReason: post.flagReason,
      likes: 0,
      isLiked: false,
      comments: 0,
      commentsCount: 0,
      timestamp: post.createdAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }

    return NextResponse.json(
      {
        success: true,
        post: transformedPost,
        message: 'Post created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create post error:', error)

    // Handle authentication errors
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
