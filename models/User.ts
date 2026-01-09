/**
 * User Model
 *
 * Mongoose schema for user authentication and profile data.
 *
 * Design Decisions:
 * - Email is unique and indexed for fast lookups
 * - Username is unique and indexed for profile URLs
 * - Password is never returned in queries (select: false)
 * - Timestamps automatically managed by Mongoose
 * - Virtual fields for computed properties
 */

import mongoose, { Schema, Model, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

// User Schema Definition
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
      index: true, // Index for fast email lookups during login
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Never return password in queries by default
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username must be less than 30 characters'],
      match: [
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores, and hyphens',
      ],
      index: true, // Index for fast username lookups
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name must be less than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name must be less than 50 characters'],
    },
    avatar: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, 'Bio must be less than 200 characters'],
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
        delete ret.password // Extra safety: never expose password
        return ret
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.password
        return ret
      },
    },
  }
)

// Virtual property for full name
UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`
})

// Compound index for admin queries
UserSchema.index({ isAdmin: 1, createdAt: -1 })

// Pre-save middleware can be added here if needed
// Example: hash password before saving (if not done in auth.ts)
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next()
//   // Hash password logic
//   next()
// })

// Create and export model
// Use mongoose.models to prevent model recompilation in Next.js hot reloading
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
