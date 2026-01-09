import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Comment from '@/models/Comment'
import Post from '@/models/Post'
import User from '@/models/User'
import { requireAuth } from '@/lib/auth'
import type { CreateCommentRequest } from '@/types'

// GET /api/comments?postId=xxx - Get comments for a post
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName username avatar')
      .lean()

    const transformedComments = comments.map((comment: any) => ({
      id: comment._id.toString(),
      postId: comment.postId.toString(),
      userId: comment.userId._id.toString(),
      userName: `${comment.userId.firstName} ${comment.userId.lastName}`,
      userAvatar: comment.userId.avatar,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }))

    return NextResponse.json(
      { success: true, comments: transformedComments, total: transformedComments.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()
    const body: CreateCommentRequest = await request.json()
    const { postId, content } = body

    if (!postId || !content) {
      return NextResponse.json(
        { success: false, error: 'Post ID and content are required' },
        { status: 400 }
      )
    }

    if (content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Content cannot be empty' },
        { status: 400 }
      )
    }

    if (content.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Content must be less than 500 characters' },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if post exists
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    // Create comment
    const comment = await Comment.create({
      postId,
      userId: session.userId,
      content,
    })

    // Add comment to post's comments array
    await (post as any).addComment(comment._id.toString())

    // Fetch user details for response
    const user = await User.findById(session.userId).select(
      'firstName lastName username avatar'
    )

    const transformedComment = {
      id: comment._id.toString(),
      postId: comment.postId.toString(),
      userId: session.userId,
      userName: `${user?.firstName} ${user?.lastName}`,
      userAvatar: user?.avatar,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    return NextResponse.json(
      {
        success: true,
        comment: transformedComment,
        message: 'Comment created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create comment error:', error)

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
