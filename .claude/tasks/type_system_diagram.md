# Flux Type System Architecture

## Type Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  BRANDED ID TYPES (Compile-time Safety)     │
├─────────────────────────────────────────────────────────────┤
│  UserId    │    PostId    │    CommentId                    │
│  (string with brand)                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     CORE ENTITY TYPES                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  USER TYPES                POST TYPES            COMMENT     │
│  ┌─────────────┐          ┌──────────────┐      TYPES       │
│  │ User        │          │ Post         │      ┌─────────┐ │
│  │ ├ id        │          │ ├ id         │      │ Comment │ │
│  │ ├ email     │          │ ├ userId     │      │ ├ id    │ │
│  │ ├ firstName │          │ ├ content    │      │ ├ post  │ │
│  │ ├ lastName  │          │ ├ sentiment  │      │ ├ user  │ │
│  │ ├ username  │          │ ├ flagged    │      │ └ text  │ │
│  │ ├ isAdmin   │          │ ├ likes      │      └─────────┘ │
│  │ └ ...       │          │ └ ...        │                   │
│  └─────────────┘          └──────────────┘                   │
│       │                        │                              │
│       ├─ UserProfile           ├─ PostWithUser               │
│       ├─ UserSummary           ├─ PostWithInteraction        │
│       └─ CurrentUser           └─ PostSummary                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  MONGODB DOCUMENT TYPES                      │
├─────────────────────────────────────────────────────────────┤
│  UserDocument        PostDocument       CommentDocument      │
│  ├ _id              ├ _id              ├ _id                │
│  ├ password (hash)  ├ userId           ├ postId             │
│  └ ...User fields   ├ likes: string[]  ├ userId             │
│                     └ comments: str[]  └ ...Comment fields  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API CONTRACT TYPES                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  AUTH API              POST API             COMMENT API      │
│  ┌───────────────┐    ┌─────────────┐      ┌─────────────┐ │
│  │ LoginRequest  │    │ CreatePost  │      │ CreateCom.  │ │
│  │ RegisterReq.  │    │ UpdatePost  │      │ GetComments │ │
│  │ AuthResponse  │    │ GetPosts    │      │ Comments    │ │
│  └───────────────┘    │ PostsResp.  │      │ Response    │ │
│                       └─────────────┘      └─────────────┘ │
│                                                               │
│  AI SERVICE API        LIKE API                              │
│  ┌───────────────┐    ┌─────────────┐                       │
│  │ ModerateReq.  │    │ LikeRequest │                       │
│  │ SentimentReq. │    │ LikeResponse│                       │
│  │ CaptionsReq.  │    └─────────────┘                       │
│  └───────────────┘                                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENT PROP TYPES                       │
├─────────────────────────────────────────────────────────────┤
│  PostCardProps  │  AdminDashboardFilters  │  Form Types     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Database to UI

```
MongoDB                 Mongoose              Application           React
Document                Model                 Logic                 Components
───────────────────────────────────────────────────────────────────────────────

UserDocument    ─────▶  User Model    ─────▶  User          ─────▶  CurrentUser
  _id                   .findById()           id                    (session)
  email                 .populate()           email
  password                                    firstName
  ...                                         ...
                                              │
                                              ├─▶ UserProfile
                                              │   (public data)
                                              │
                                              └─▶ UserSummary
                                                  (embedded)

PostDocument    ─────▶  Post Model    ─────▶  Post          ─────▶  PostCardProps
  _id                   .find()               id                    post: Post
  userId                .populate('user')     userId                showActions
  content               .lean()               userName              onDelete
  sentiment                                   content
  likes: [ids]                                likes: count
  comments: [ids]                             isLiked
  ...                                         ...

CommentDoc      ─────▶  Comment Model ─────▶  Comment       ─────▶  CommentList
  _id                   .find()               id                    comments[]
  postId                .populate('user')     postId
  userId                                      userName
  content                                     content
  ...                                         ...
```

## Type Safety Layers

```
Layer 1: Branded Types
├─ UserId, PostId, CommentId
└─ Prevents ID mixing at compile-time

Layer 2: Core Types
├─ User, Post, Comment
├─ Type variants (Profile, Summary, WithInteraction)
└─ Database document types

Layer 3: API Contracts
├─ Request types (CreatePostRequest, LoginRequest)
├─ Response types (AuthResponse, PostsResponse)
└─ Generic wrappers (ApiResponse<T>, PaginatedResponse<T>)

Layer 4: Component Props
├─ PostCardProps, FormValues
└─ Admin types (Filters, Stats)

Layer 5: Runtime Validation
├─ Type guards (isSentimentType, isUser, isPost)
└─ Constants (SENTIMENT_TYPES, PAGINATION_DEFAULTS)
```

## Type Transformation Examples

### Example 1: MongoDB → Application

```typescript
// MongoDB PostDocument
{
  _id: "507f1f77bcf86cd799439011",
  userId: "507f1f77bcf86cd799439012",
  content: "Hello world",
  sentiment: "Positive",
  flagged: false,
  likes: ["user1", "user2", "user3"],
  comments: ["comment1", "comment2"],
  createdAt: Date,
  updatedAt: Date
}

// Transform function
function documentToPost(doc, currentUserId) {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    userName: doc.user.firstName + " " + doc.user.lastName,
    userAvatar: doc.user.avatar,
    content: doc.content,
    sentiment: doc.sentiment,
    flagged: doc.flagged,
    isFlagged: doc.flagged,
    likes: doc.likes.length,
    isLiked: doc.likes.includes(currentUserId),
    comments: doc.comments.length,
    commentsCount: doc.comments.length,
    timestamp: doc.createdAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  }
}

// Application Post
{
  id: "507f1f77bcf86cd799439011",
  userId: "507f1f77bcf86cd799439012",
  userName: "John Doe",
  userAvatar: "/avatar.jpg",
  content: "Hello world",
  sentiment: "Positive",
  flagged: false,
  isFlagged: false,
  likes: 3,
  isLiked: false,
  comments: 2,
  commentsCount: 2,
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Example 2: API Request → Response

```typescript
// Client makes request
const request: CreatePostRequest = {
  content: "My first post!"
};

// API processes
const response: CreatePostResponse = {
  success: true,
  data: {
    id: "507f...",
    userId: "507f...",
    userName: "John Doe",
    content: "My first post!",
    sentiment: "Positive",
    flagged: false,
    likes: 0,
    comments: 0,
    timestamp: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  moderation: {
    flagged: false
  },
  sentiment: "Positive"
};
```

## Key Type Relationships

```
User ────────┬───────▶ Post.userId
             │
             └───────▶ Comment.userId

Post ────────────────▶ Comment.postId

Post.likes ──────────▶ Array<UserId>
Post.comments ───────▶ Array<CommentId>

SentimentType ───────▶ 'Positive' | 'Neutral' | 'Negative'
                       (used in Post.sentiment)

ApiResponse<T> ──────▶ Generic wrapper for all API responses
  ├─ AuthResponse
  ├─ PostsResponse
  ├─ CommentsResponse
  └─ CreatePostResponse
```

## Type Coverage Map

| Category | Count | File Location |
|----------|-------|---------------|
| Branded ID Types | 3 | types/index.ts:24-36 |
| Core Entity Types | 14 | types/index.ts:98-230 |
| Component Props | 5 | types/index.ts:240-245 |
| API Response Wrappers | 3 | types/index.ts:255-281 |
| Auth API Types | 4 | types/index.ts:287-327 |
| Post API Types | 6 | types/index.ts:333-361 |
| Like API Types | 2 | types/index.ts:367-377 |
| Comment API Types | 3 | types/index.ts:383-397 |
| AI Service API Types | 6 | types/index.ts:403-431 |
| Form Types | 4 | types/index.ts:440-469 |
| Admin Types | 2 | types/index.ts:478-495 |
| Database Document Types | 6 | types/index.ts:504-535 |
| Type Guards | 3 | types/index.ts:544-577 |
| Constants | 2 | types/index.ts:586-595 |
| **TOTAL** | **63** | **595 lines** |

## Usage Examples in Project

### In Mongoose Models
```typescript
// models/User.ts
import { UserDocument } from '@/types';
const userSchema = new Schema<UserDocument>({ ... });
```

### In API Routes
```typescript
// app/api/posts/route.ts
import { CreatePostRequest, CreatePostResponse } from '@/types';
export async function POST(req: NextRequest): Promise<NextResponse<CreatePostResponse>> {
  const body: CreatePostRequest = await req.json();
  // ...
}
```

### In React Components
```typescript
// components/custom/post-card.tsx
import { PostCardProps, Post } from '@/types';
export function PostCard({ post, showActions }: PostCardProps) {
  // ...
}
```

### In Server Components
```typescript
// app/feed/page.tsx
import { Post } from '@/types';
async function getPosts(): Promise<Post[]> {
  // ...
}
```

## Type System Benefits Summary

1. **Type Safety**: Compile-time error detection
2. **IntelliSense**: Auto-completion in VS Code
3. **Refactoring**: Confidence when changing code
4. **Documentation**: Self-documenting API contracts
5. **Validation**: Runtime type guards
6. **Consistency**: Standardized response formats
7. **MongoDB Integration**: Smooth DB-to-app transformation
8. **Backward Compatibility**: Aliases for existing components
