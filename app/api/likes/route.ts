import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import { requireAuth } from '@/lib/auth'
import type { LikeRequest, LikeResponse } from '@/types'

// POST /api/likes - Toggle like on a post
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()
    const body: LikeRequest = await request.json()
    const { postId } = body

    if (!postId) {
      return NextResponse.json({ success: false, error: 'Post ID is required' }, { status: 400 })
    }

    await connectDB()

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    // Check if user already liked the post
    const userIdStr = session.userId
    const isLiked = (post as any).isLikedByUser(userIdStr)

    if (isLiked) {
      // Unlike the post
      await (post as any).removeLike(userIdStr)
    } else {
      // Like the post
      await (post as any).addLike(userIdStr)
    }

    // Fetch updated post
    const updatedPost = await Post.findById(postId)

    const response: LikeResponse = {
      success: true,
      likes: updatedPost!.likes.length,
      isLiked: !isLiked,
      message: isLiked ? 'Post unliked' : 'Post liked',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error('Like toggle error:', error)

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}
