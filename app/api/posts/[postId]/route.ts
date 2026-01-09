import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import { requireAuth, requireAdmin } from '@/lib/auth'

// GET /api/posts/[postId] - Get a single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params
    await connectDB()

    const post = await Post.findById(postId)
      .populate('userId', 'firstName lastName username avatar')
      .lean()

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    const transformedPost = {
      id: (post as any)._id.toString(),
      userId: (post as any).userId._id.toString(),
      userName: `${(post as any).userId.firstName} ${(post as any).userId.lastName}`,
      userAvatar: (post as any).userId.avatar,
      content: (post as any).content,
      sentiment: (post as any).sentiment,
      flagged: (post as any).flagged,
      isFlagged: (post as any).flagged,
      flagReason: (post as any).flagReason,
      likes: (post as any).likes.length,
      isLiked: false,
      comments: (post as any).comments.length,
      commentsCount: (post as any).comments.length,
      timestamp: (post as any).createdAt,
      createdAt: (post as any).createdAt,
      updatedAt: (post as any).updatedAt,
    }

    return NextResponse.json({ success: true, post: transformedPost }, { status: 200 })
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch post' }, { status: 500 })
  }
}

// DELETE /api/posts/[postId] - Delete a post (user or admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await requireAuth()
    const { postId } = await params

    await connectDB()

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    // Check if user is the post owner or admin
    if (post.userId.toString() !== session.userId && !session.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this post' },
        { status: 403 }
      )
    }

    await Post.findByIdAndDelete(postId)

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Delete post error:', error)

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 })
  }
}
