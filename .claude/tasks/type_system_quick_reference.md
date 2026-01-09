# TypeScript Type System - Quick Reference Guide

## Common Type Imports

```typescript
// Core entity types
import { User, Post, Comment } from '@/types';

// Branded ID types
import { UserId, PostId, CommentId, toUserId, toPostId, toCommentId } from '@/types';

// Sentiment type
import { SentimentType, SENTIMENT_TYPES, isSentimentType } from '@/types';

// API request/response types
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CreatePostRequest,
  CreatePostResponse,
  LikeRequest,
  LikeResponse,
  CreateCommentRequest,
  CommentsResponse,
} from '@/types';

// Component props
import { PostCardProps } from '@/types';

// Admin types
import { AdminDashboardFilters, AdminStats } from '@/types';

// Form types
import { LoginFormValues, RegisterFormValues, CreatePostFormValues } from '@/types';

// Database document types
import { UserDocument, PostDocument, CommentDocument } from '@/types';

// Utility types
import { ApiResponse, PaginatedResponse, ApiError } from '@/types';
```

---

## Cheat Sheet by Use Case

### Use Case 1: Creating a Mongoose Model

```typescript
import { Schema, model } from 'mongoose';
import { UserDocument } from '@/types';

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: String,
  bio: String,
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserDocument>('User', userSchema);
```

### Use Case 2: Implementing an API Route

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { CreatePostRequest, CreatePostResponse, Post } from '@/types';

export async function POST(req: NextRequest): Promise<NextResponse<CreatePostResponse>> {
  try {
    const body: CreatePostRequest = await req.json();

    // Your logic here
    const post: Post = await createPost(body);

    const response: CreatePostResponse = {
      success: true,
      data: post,
      sentiment: post.sentiment,
      moderation: { flagged: false },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

### Use Case 3: Building a React Component

```typescript
'use client';

import { Post, SentimentType } from '@/types';

interface Props {
  post: Post;
  onLike?: (postId: string) => void;
}

export function PostItem({ post, onLike }: Props) {
  const getSentimentColor = (sentiment: SentimentType): string => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100';
      case 'Neutral': return 'bg-blue-100';
      case 'Negative': return 'bg-red-100';
    }
  };

  return (
    <div className={getSentimentColor(post.sentiment)}>
      <h3>{post.userName}</h3>
      <p>{post.content}</p>
      <button onClick={() => onLike?.(post.id)}>
        Like ({post.likes})
      </button>
    </div>
  );
}
```

### Use Case 4: Fetching Data in Server Component

```typescript
import { Post } from '@/types';

async function getPosts(): Promise<Post[]> {
  const response = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data.posts;
}

export default async function FeedPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Use Case 5: Working with Forms

```typescript
'use client';

import { useState } from 'react';
import { LoginFormValues, LoginRequest, AuthResponse } from '@/types';

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: LoginRequest = {
      email: values.email,
      password: values.password,
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.user) {
      console.log('Logged in as:', data.user.username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Use Case 6: Converting MongoDB Document to Application Type

```typescript
import { Post, PostDocument } from '@/types';

export function postDocumentToPost(
  doc: PostDocument & { user?: { firstName: string; lastName: string; avatar?: string } },
  currentUserId?: string
): Post {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    userName: doc.user ? `${doc.user.firstName} ${doc.user.lastName}` : 'Unknown',
    userAvatar: doc.user?.avatar,
    content: doc.content,
    sentiment: doc.sentiment,
    flagged: doc.flagged,
    isFlagged: doc.flagged,
    flagReason: doc.flagReason,
    likes: doc.likes.length,
    isLiked: currentUserId ? doc.likes.includes(currentUserId) : false,
    comments: doc.comments.length,
    commentsCount: doc.comments.length,
    timestamp: doc.createdAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
```

### Use Case 7: Using Type Guards

```typescript
import { isSentimentType, isPost } from '@/types';

// Validate sentiment from user input
const userInput = 'Positive';
if (isSentimentType(userInput)) {
  // TypeScript knows userInput is SentimentType here
  console.log('Valid sentiment:', userInput);
}

// Validate API response
const apiData = await fetch('/api/posts/123').then(r => r.json());
if (isPost(apiData)) {
  // TypeScript knows apiData is Post here
  console.log('Post content:', apiData.content);
}
```

### Use Case 8: Using Branded ID Types

```typescript
import { UserId, PostId, toUserId, toPostId } from '@/types';

// Convert string to branded ID
const userId: UserId = toUserId('507f1f77bcf86cd799439011');
const postId: PostId = toPostId('507f1f77bcf86cd799439012');

// This prevents accidental mistakes
function deletePost(id: PostId) {
  // Only accepts PostId, not UserId or plain string
}

// ✅ Correct
deletePost(postId);

// ❌ TypeScript error - can't pass UserId where PostId is expected
// deletePost(userId);
```

### Use Case 9: Admin Dashboard with Filters

```typescript
'use client';

import { useState } from 'react';
import { Post, AdminDashboardFilters, SentimentType } from '@/types';

export function AdminDashboard() {
  const [filters, setFilters] = useState<AdminDashboardFilters>({
    sentiment: 'All',
    flagged: null,
    searchQuery: '',
  });

  const [posts, setPosts] = useState<Post[]>([]);

  const filteredPosts = posts.filter((post) => {
    const matchesSentiment = filters.sentiment === 'All' || post.sentiment === filters.sentiment;
    const matchesFlagged = filters.flagged === null || post.flagged === filters.flagged;
    const matchesSearch = post.content.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesSentiment && matchesFlagged && matchesSearch;
  });

  return (
    <div>
      {/* Filter controls */}
      {/* Post list */}
    </div>
  );
}
```

### Use Case 10: Paginated API Response

```typescript
import { Post, PaginatedResponse } from '@/types';

async function getPostsWithPagination(page: number = 1, limit: number = 20) {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
  const data: PaginatedResponse<Post> = await response.json();

  if (data.success && data.data) {
    console.log('Posts:', data.data);
    console.log('Has more:', data.pagination.hasMore);
    console.log('Total:', data.pagination.total);
  }
}
```

---

## Common Patterns

### Pattern 1: Generic API Response Handler

```typescript
import { ApiResponse } from '@/types';

async function handleApiCall<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Usage
const result = await handleApiCall<Post>('/api/posts/123');
if (result.success && result.data) {
  console.log(result.data.content);
}
```

### Pattern 2: Sentiment Badge Component

```typescript
import { SentimentType } from '@/types';

interface SentimentBadgeProps {
  sentiment: SentimentType;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const config: Record<SentimentType, { color: string; label: string }> = {
    Positive: { color: 'bg-green-500', label: 'Positive' },
    Neutral: { color: 'bg-blue-500', label: 'Neutral' },
    Negative: { color: 'bg-red-500', label: 'Negative' },
  };

  const { color, label } = config[sentiment];

  return <span className={`badge ${color}`}>{label}</span>;
}
```

### Pattern 3: User Summary Builder

```typescript
import { User, UserSummary } from '@/types';

export function userToSummary(user: User): UserSummary {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    username: user.username,
    avatar: user.avatar,
  };
}
```

---

## Type Constants Reference

```typescript
import { SENTIMENT_TYPES, PAGINATION_DEFAULTS } from '@/types';

// All sentiment values
SENTIMENT_TYPES // ['Positive', 'Neutral', 'Negative']

// Pagination defaults
PAGINATION_DEFAULTS.DEFAULT_LIMIT // 20
PAGINATION_DEFAULTS.MAX_LIMIT     // 100
PAGINATION_DEFAULTS.DEFAULT_PAGE  // 1

// Usage in dropdown
SENTIMENT_TYPES.map(sentiment => (
  <option key={sentiment} value={sentiment}>
    {sentiment}
  </option>
))
```

---

## Error Handling Pattern

```typescript
import { ApiError } from '@/types';

async function safeApiCall<T>(
  fn: () => Promise<T>
): Promise<{ data?: T; error?: ApiError }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    const apiError: ApiError = {
      error: 'API_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500,
    };
    return { error: apiError };
  }
}

// Usage
const { data, error } = await safeApiCall(() => getPosts());
if (error) {
  console.error(error.message);
} else if (data) {
  console.log(data);
}
```

---

## Complete Example: Create Post Flow

```typescript
// Component: CreatePostForm.tsx
'use client';

import { useState } from 'react';
import {
  CreatePostFormValues,
  CreatePostRequest,
  CreatePostResponse,
  ModerateContentRequest,
  ModerateContentResponse,
  AnalyzeSentimentRequest,
  AnalyzeSentimentResponse,
} from '@/types';

export function CreatePostForm() {
  const [values, setValues] = useState<CreatePostFormValues>({ content: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Moderate content
    const moderateReq: ModerateContentRequest = { text: values.content };
    const moderateRes: ModerateContentResponse = await fetch('/api/ai/moderate', {
      method: 'POST',
      body: JSON.stringify(moderateReq),
    }).then(r => r.json());

    if (moderateRes.flagged) {
      alert('Content flagged: ' + moderateRes.reason);
      return;
    }

    // 2. Analyze sentiment
    const sentimentReq: AnalyzeSentimentRequest = { text: values.content };
    const sentimentRes: AnalyzeSentimentResponse = await fetch('/api/ai/sentiment', {
      method: 'POST',
      body: JSON.stringify(sentimentReq),
    }).then(r => r.json());

    // 3. Create post
    const createReq: CreatePostRequest = { content: values.content };
    const createRes: CreatePostResponse = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(createReq),
    }).then(r => r.json());

    if (createRes.success && createRes.data) {
      console.log('Post created:', createRes.data.id);
      console.log('Sentiment:', createRes.sentiment);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

---

## Tips & Best Practices

1. **Always use branded IDs** when working with entity identifiers
2. **Use type guards** to validate external data (API responses, user input)
3. **Leverage discriminated unions** for exhaustive checking (SentimentType)
4. **Use Document types** only in Mongoose models, not in components
5. **Transform documents** to application types before sending to frontend
6. **Import only what you need** to keep bundle size small
7. **Use generic ApiResponse** for consistent error handling
8. **Add JSDoc comments** to custom types for better documentation

---

## Troubleshooting

### Issue: "Type 'string' is not assignable to type 'UserId'"
**Solution:** Use `toUserId(yourString)` to convert

### Issue: "Property 'X' does not exist on type 'Post'"
**Solution:** Check if you need `PostDocument` (DB) vs `Post` (app)

### Issue: "Type 'X' is not assignable to type 'SentimentType'"
**Solution:** Ensure value is 'Positive', 'Neutral', or 'Negative' (exact case)

### Issue: "Cannot find module '@/types'"
**Solution:** Check tsconfig.json has `"@/*": ["*"]` in paths

---

This quick reference covers 90% of common type system usage in the Flux project.
