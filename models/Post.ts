/**
 * Post Model
 *
 * Mongoose schema for user posts with sentiment analysis and moderation.
 *
 * Design Decisions:
 * - likes stored as array of userId strings for tracking who liked
 * - comments stored as array of commentId references
 * - userId indexed for fast user post queries
 * - createdAt indexed for chronological sorting
 * - Virtual population for user details to avoid denormalization
 * - Compound indexes for common query patterns (flagged posts, sentiment filtering)
 */

import mongoose, { Schema, Model, Document, Types } from 'mongoose'

export interface IPost extends Document {
  userId: Types.ObjectId | string
  content: string
  sentiment: 'Positive' | 'Neutral' | 'Negative'
  flagged: boolean
  flagReason?: string
  likes: Types.ObjectId[] | string[] // Array of user IDs who liked the post
  comments: Types.ObjectId[] | string[] // Array of comment IDs
  createdAt: Date
  updatedAt: Date
}

// Post Schema Definition
const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true, // Index for fast user post queries
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [1, 'Content cannot be empty'],
      maxlength: [2000, 'Content must be less than 2000 characters'],
    },
    sentiment: {
      type: String,
      enum: {
        values: ['Positive', 'Neutral', 'Negative'],
        message: 'Sentiment must be Positive, Neutral, or Negative',
      },
      required: [true, 'Sentiment is required'],
      default: 'Neutral',
    },
    flagged: {
      type: Boolean,
      default: false,
      index: true, // Index for admin dashboard queries
    },
    flagReason: {
      type: String,
      trim: true,
      maxlength: [200, 'Flag reason must be less than 200 characters'],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      default: [],
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

// Virtual field for like count
PostSchema.virtual('likesCount').get(function (this: IPost) {
  return this.likes.length
})

// Virtual field for comment count
PostSchema.virtual('commentsCount').get(function (this: IPost) {
  return this.comments.length
})

// Virtual populate user details
PostSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})

// Compound indexes for common query patterns
PostSchema.index({ userId: 1, createdAt: -1 }) // User's posts sorted by date
PostSchema.index({ flagged: 1, createdAt: -1 }) // Flagged posts sorted by date (admin)
PostSchema.index({ sentiment: 1, createdAt: -1 }) // Posts by sentiment sorted by date
PostSchema.index({ createdAt: -1 }) // All posts sorted by date (feed)

// Index for admin dashboard queries
PostSchema.index({ flagged: 1, sentiment: 1 })

// Pre-find middleware to populate user details
PostSchema.pre(/^find/, function (this: any, next: any) {
  // Only populate if explicitly requested to avoid overhead
  if (this.options._populateUser) {
    this.populate({
      path: 'userId',
      select: 'firstName lastName username avatar',
    })
  }
  next()
})

// Instance method to check if user has liked the post
PostSchema.methods.isLikedByUser = function (userId: string): boolean {
  return this.likes.some((likeId: any) => likeId.toString() === userId.toString())
}

// Instance method to add a like
PostSchema.methods.addLike = async function (userId: string): Promise<any> {
  if (!this.isLikedByUser(userId)) {
    this.likes.push(new Types.ObjectId(userId))
    await this.save()
  }
  return this
}

// Instance method to remove a like
PostSchema.methods.removeLike = async function (userId: string): Promise<any> {
  this.likes = this.likes.filter((likeId: any) => likeId.toString() !== userId.toString())
  await this.save()
  return this
}

// Instance method to add a comment
PostSchema.methods.addComment = async function (commentId: string): Promise<any> {
  this.comments.push(new Types.ObjectId(commentId))
  await this.save()
  return this
}

// Static method to get flagged posts
PostSchema.statics.getFlaggedPosts = function () {
  return this.find({ flagged: true })
    .populate('userId', 'firstName lastName username avatar')
    .sort({ createdAt: -1 })
}

// Static method to get posts by sentiment
PostSchema.statics.getPostsBySentiment = function (sentiment: 'Positive' | 'Neutral' | 'Negative') {
  return this.find({ sentiment })
    .populate('userId', 'firstName lastName username avatar')
    .sort({ createdAt: -1 })
}

// Static method to get user's posts
PostSchema.statics.getUserPosts = function (userId: string) {
  return this.find({ userId })
    .populate('userId', 'firstName lastName username avatar')
    .sort({ createdAt: -1 })
}

// Create and export model
// Use mongoose.models to prevent model recompilation in Next.js hot reloading
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

export default Post
