/**
 * Flux Social Media Platform - TypeScript Type Definitions
 *
 * This file contains all core type definitions for the Flux application.
 * It uses advanced TypeScript features including branded types for type safety,
 * discriminated unions, and utility types for consistent API contracts.
 */

// ============================================================================
// Branded Types for Type-Safe IDs
// ============================================================================

/**
 * Branded type pattern provides compile-time type safety for IDs.
 * This prevents accidentally mixing up user IDs, post IDs, and comment IDs.
 */
declare const __brand: unique symbol;
type Brand<T, TBrand extends string> = T & { [__brand]: TBrand };

/**
 * User identifier - branded string type
 * Compatible with MongoDB ObjectId string representation
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Post identifier - branded string type
 * Compatible with MongoDB ObjectId string representation
 */
export type PostId = Brand<string, 'PostId'>;

/**
 * Comment identifier - branded string type
 * Compatible with MongoDB ObjectId string representation
 */
export type CommentId = Brand<string, 'CommentId'>;

/**
 * Helper function to create branded UserId from string
 * Use this when receiving ID from database or API
 */
export function toUserId(id: string): UserId {
  return id as UserId;
}

/**
 * Helper function to create branded PostId from string
 * Use this when receiving ID from database or API
 */
export function toPostId(id: string): PostId {
  return id as PostId;
}

/**
 * Helper function to create branded CommentId from string
 * Use this when receiving ID from database or API
 */
export function toCommentId(id: string): CommentId {
  return id as CommentId;
}

// ============================================================================
// Sentiment Analysis Types
// ============================================================================

/**
 * Sentiment classification for posts
 * Result of rule-based NLP sentiment analysis
 */
export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

/**
 * Content moderation result
 */
export interface ModerationResult {
  flagged: boolean;
  reason?: string;
  confidence?: number;
}

/**
 * Sentiment analysis result from AI service
 */
export interface SentimentAnalysisResult {
  sentiment: SentimentType;
  score?: number;
  keywords?: string[];
}

// ============================================================================
// User Types
// ============================================================================

/**
 * Core user entity - matches Mongoose User model
 * This is the database representation
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Public user profile - excludes sensitive information
 * Used for displaying user information to other users
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
  createdAt: Date;
}

/**
 * Compact user representation for embedding in posts/comments
 */
export interface UserSummary {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

/**
 * Current authenticated user session data
 */
export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  avatar?: string;
}

// ============================================================================
// Post Types
// ============================================================================

/**
 * Core post entity - matches Mongoose Post model
 * This is the database representation
 */
export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  sentiment: SentimentType;
  flagged: boolean;
  isFlagged?: boolean; // Alias for compatibility
  flagReason?: string;
  likes: number;
  isLiked?: boolean;
  comments?: number;
  commentsCount?: number; // Alias for compatibility
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Post with detailed user information
 * Used when fetching posts with populated user data
 */
export interface PostWithUser extends Omit<Post, 'userName' | 'userAvatar'> {
  user: UserSummary;
}

/**
 * Post with client-side interaction state
 * Used in React components for rendering posts
 */
export interface PostWithInteraction extends Post {
  canDelete: boolean;
  canEdit: boolean;
}

// ============================================================================
// Comment Types
// ============================================================================

/**
 * Core comment entity - matches Mongoose Comment model
 * This is the database representation
 */
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Comment with detailed user information
 * Used when fetching comments with populated user data
 */
export interface CommentWithUser extends Omit<Comment, 'userName' | 'userAvatar'> {
  user: UserSummary;
}

/**
 * Comment with interaction state
 * Used in React components
 */
export interface CommentWithInteraction extends Comment {
  canDelete: boolean;
  canEdit: boolean;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for PostCard component
 * Supports both full Post and simplified post formats
 */
export interface PostCardProps {
  post: Post;
  showActions?: boolean;
  showDelete?: boolean;
  onDelete?: (postId: string) => void | Promise<void>;
}

// ============================================================================
// API Response Wrapper Types
// ============================================================================

/**
 * Standard API response wrapper
 * Provides consistent response structure across all endpoints
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

/**
 * Error Response Type
 */
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

// ============================================================================
// Authentication API Types
// ============================================================================

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: CurrentUser;
  token?: string;
  message?: string;
  error?: string;
}

/**
 * Session Type for server-side authentication
 */
export interface Session {
  userId: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

/**
 * JWT Payload Type
 */
export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

// ============================================================================
// Post API Types
// ============================================================================

export interface CreatePostRequest {
  content: string;
  skipModeration?: boolean;
}

export interface CreatePostResponse extends ApiResponse<Post> {
  moderation?: ModerationResult;
  sentiment?: SentimentType;
}

export interface UpdatePostRequest {
  content?: string;
  flagged?: boolean;
}

export interface GetPostsQuery {
  userId?: string;
  sentiment?: SentimentType;
  flagged?: boolean;
  limit?: number;
  skip?: number;
  sortBy?: 'createdAt' | 'likes' | 'comments';
  order?: 'asc' | 'desc';
}

export interface PostsResponse extends ApiResponse {
  posts: Post[];
  total?: number;
}

// ============================================================================
// Like API Types
// ============================================================================

export interface LikeRequest {
  postId: string;
}

export interface LikeResponse {
  success: boolean;
  likes: number;
  isLiked: boolean;
  message?: string;
  error?: string;
}

// ============================================================================
// Comment API Types
// ============================================================================

export interface CreateCommentRequest {
  postId: string;
  content: string;
}

export interface GetCommentsQuery {
  postId: string;
  limit?: number;
  skip?: number;
}

export interface CommentsResponse extends ApiResponse {
  comments: Comment[];
  total?: number;
}

// ============================================================================
// AI Service API Types
// ============================================================================

export interface ModerateContentRequest {
  text: string;
}

export interface ModerateContentResponse {
  success?: boolean;
  flagged: boolean;
  reason?: string;
}

export interface AnalyzeSentimentRequest {
  text: string;
}

export interface AnalyzeSentimentResponse {
  success?: boolean;
  sentiment: SentimentType;
  score?: number;
}

export interface GenerateCaptionsRequest {
  context?: string;
  count?: number;
}

export interface GenerateCaptionsResponse {
  success?: boolean;
  suggestions: string[];
}

// ============================================================================
// Form Types
// ============================================================================

/**
 * Login form field values
 */
export interface LoginFormValues {
  email: string;
  password: string;
}

/**
 * Registration form field values
 */
export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}

/**
 * Create post form field values
 */
export interface CreatePostFormValues {
  content: string;
}

/**
 * Comment form field values
 */
export interface CommentFormValues {
  content: string;
}

// ============================================================================
// Admin Dashboard Types
// ============================================================================

/**
 * Admin dashboard filter options
 */
export interface AdminDashboardFilters {
  sentiment: SentimentType | 'All';
  flagged: boolean | null;
  searchQuery: string;
}

/**
 * Admin statistics
 */
export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  flaggedPosts: number;
  positivePosts: number;
  negativePosts: number;
  neutralPosts: number;
}

// ============================================================================
// Utility Types for Database Models
// ============================================================================

/**
 * Base timestamp fields for all database models
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose document type helper
 * Adds _id field for MongoDB documents
 */
export interface MongoDocument {
  _id: string;
}

/**
 * User document as stored in MongoDB (with password hash)
 */
export interface UserDocument extends Omit<User, 'id'>, MongoDocument {
  password: string;
}

/**
 * Post document as stored in MongoDB (with array of user IDs for likes)
 */
export interface PostDocument extends Omit<Post, 'id' | 'userName' | 'userAvatar' | 'likes' | 'comments' | 'commentsCount' | 'isLiked' | 'timestamp'>, MongoDocument {
  likes: string[]; // Array of user IDs
  comments: string[]; // Array of comment IDs
}

/**
 * Comment document as stored in MongoDB
 */
export interface CommentDocument extends Omit<Comment, 'id' | 'userName' | 'userAvatar'>, MongoDocument { }

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if a value is a valid SentimentType
 */
export function isSentimentType(value: unknown): value is SentimentType {
  return value === 'Positive' || value === 'Neutral' || value === 'Negative';
}

/**
 * Type guard to check if an object has User shape
 */
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'firstName' in obj &&
    'lastName' in obj &&
    'username' in obj &&
    'isAdmin' in obj
  );
}

/**
 * Type guard to check if an object has Post shape
 */
export function isPost(obj: unknown): obj is Post {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'userId' in obj &&
    'content' in obj &&
    'sentiment' in obj &&
    'flagged' in obj
  );
}

// ============================================================================
// Constants
// ============================================================================

/**
 * All sentiment types as array for iteration
 */
export const SENTIMENT_TYPES: readonly SentimentType[] = ['Positive', 'Neutral', 'Negative'] as const;

/**
 * Default pagination limits
 */
export const PAGINATION_DEFAULTS = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;
