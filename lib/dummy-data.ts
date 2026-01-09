/**
 * Dummy data for development and testing
 *
 * This file contains mock data for users, posts, and comments.
 * Used throughout the application for UI development before backend integration.
 */

import type { Post, User, CurrentUser } from '@/types'

/**
 * Mock current authenticated user
 */
export const currentUser: CurrentUser = {
  id: '1',
  email: 'admin@flux.com',
  firstName: 'Admin',
  lastName: 'User',
  username: 'admin',
  isAdmin: true,
  avatar: '/diverse-group-avatars.png',
}

/**
 * Mock users for profiles and posts
 */
export const users: User[] = [
  {
    id: '1',
    email: 'admin@flux.com',
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    isAdmin: true,
    avatar: '/diverse-group-avatars.png',
    bio: 'Platform administrator and community manager.',
    followers: 1234,
    following: 567,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'alex@example.com',
    firstName: 'Alex',
    lastName: 'Rivers',
    username: 'arivers',
    isAdmin: false,
    avatar: '/diverse-group-avatars.png',
    bio: 'Tech enthusiast and content creator.',
    followers: 892,
    following: 234,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    email: 'sam@example.com',
    firstName: 'Sam',
    lastName: 'Chen',
    username: 'schen',
    isAdmin: false,
    avatar: '/pandoran-bioluminescent-forest.png',
    bio: 'Software developer and open source contributor.',
    followers: 456,
    following: 123,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    email: 'jordan@example.com',
    firstName: 'Jordan',
    lastName: 'Smith',
    username: 'jsmith',
    isAdmin: false,
    avatar: '/diverse-group-avatars.png',
    bio: 'UI/UX designer with a passion for great experiences.',
    followers: 678,
    following: 345,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
]

/**
 * Mock posts with various sentiments
 */
export const posts: Post[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Alex Rivers',
    userAvatar: '/diverse-group-avatars.png',
    content:
      'Just launched a new project! The community feedback has been incredible so far. Can\'t wait to see where this goes. 🚀',
    sentiment: 'Positive',
    flagged: false,
    isFlagged: false,
    likes: 124,
    isLiked: false,
    comments: 12,
    commentsCount: 12,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    userId: '3',
    userName: 'Sam Chen',
    userAvatar: '/pandoran-bioluminescent-forest.png',
    content:
      'The latest update to the framework is interesting, but I\'m finding some edge cases that are hard to debug. Anyone else seeing this?',
    sentiment: 'Neutral',
    flagged: false,
    isFlagged: false,
    likes: 45,
    isLiked: false,
    comments: 28,
    commentsCount: 28,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: '4',
    userName: 'Jordan Smith',
    userAvatar: '/diverse-group-avatars.png',
    content:
      'Honestly disappointed with the recent design changes. It feels like they removed functionality for the sake of \'minimalism\'.',
    sentiment: 'Negative',
    flagged: false,
    isFlagged: false,
    likes: 89,
    isLiked: true,
    comments: 54,
    commentsCount: 54,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: '4',
    userId: '1',
    userName: 'Admin User',
    userAvatar: '/diverse-group-avatars.png',
    content:
      'Welcome to Flux! We\'re excited to have you here. Share your thoughts, connect with others, and be respectful. Happy posting!',
    sentiment: 'Positive',
    flagged: false,
    isFlagged: false,
    likes: 234,
    isLiked: true,
    comments: 45,
    commentsCount: 45,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '5',
    userId: '2',
    userName: 'Alex Rivers',
    userAvatar: '/diverse-group-avatars.png',
    content:
      'Working on some exciting new features. The team has been amazing, and I can\'t wait to share what we\'ve been building!',
    sentiment: 'Positive',
    flagged: false,
    isFlagged: false,
    likes: 156,
    isLiked: false,
    comments: 23,
    commentsCount: 23,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '6',
    userId: '3',
    userName: 'Sam Chen',
    userAvatar: '/pandoran-bioluminescent-forest.png',
    content:
      'This is absolutely terrible! The service is broken and support has been completely unhelpful. Waste of time and money!',
    sentiment: 'Negative',
    flagged: true,
    isFlagged: true,
    flagReason: 'Aggressive language and complaints',
    likes: 12,
    isLiked: false,
    comments: 67,
    commentsCount: 67,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]
