/**
 * Comment Model
 *
 * Mongoose schema for post comments.
 *
 * Design Decisions:
 * - postId indexed for fast comment lookup by post
 * - userId indexed for user comment history
 * - Compound index for efficient post comment queries
 * - Virtual population for user details
 * - Keep comments simple - no nested replies for MVP
 * - timestamps for sorting and display
 */

import mongoose, { Schema, Model, Document, Types } from 'mongoose'

export interface IComment extends Document {
  postId: Types.ObjectId | string
  userId: Types.ObjectId | string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Comment Schema Definition
const CommentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post ID is required'],
      index: true, // Index for fast post comment queries
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true, // Index for user comment history
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [1, 'Content cannot be empty'],
      maxlength: [500, 'Content must be less than 500 characters'],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Virtual populate user details
CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})

// Compound index for efficient post comment queries sorted by date
CommentSchema.index({ postId: 1, createdAt: -1 })

// Index for user's comments sorted by date
CommentSchema.index({ userId: 1, createdAt: -1 })

// Pre-find middleware to populate user details
CommentSchema.pre(/^find/, function (this: any, next: any) {
  // Only populate if explicitly requested to avoid overhead
  if (this.options._populateUser) {
    this.populate({
      path: 'userId',
      select: 'firstName lastName username avatar',
    })
  }
  next()
})

// Static method to get comments for a post
CommentSchema.statics.getPostComments = function (postId: string, limit: number = 50) {
  return this.find({ postId })
    .populate('userId', 'firstName lastName username avatar')
    .sort({ createdAt: -1 })
    .limit(limit)
}

// Static method to get user's comments
CommentSchema.statics.getUserComments = function (userId: string, limit: number = 50) {
  return this.find({ userId })
    .populate('postId', 'content')
    .sort({ createdAt: -1 })
    .limit(limit)
}

// Static method to count comments for a post
CommentSchema.statics.countPostComments = function (postId: string) {
  return this.countDocuments({ postId })
}

// Instance method to check if user is the comment author
CommentSchema.methods.isAuthor = function (userId: string): boolean {
  return this.userId.toString() === userId.toString()
}

// Pre-remove middleware to update post's comment array
// This ensures referential integrity when a comment is deleted
CommentSchema.pre('deleteOne', { document: true, query: false }, async function (next: any) {
  try {
    // Update the post by removing this comment's ID from its comments array
    const Post = mongoose.model('Post')
    await Post.updateOne({ _id: this.postId }, { $pull: { comments: this._id } })
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Create and export model
// Use mongoose.models to prevent model recompilation in Next.js hot reloading
const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export default Comment
