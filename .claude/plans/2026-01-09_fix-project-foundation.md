# Plan: Fix Project Foundation

**Date Created:** 2026-01-09
**Status:** Draft

## Goal
Fix the Flux social media platform by implementing all missing core functionality including type system, database models, authentication, AI logic, and UI components. Transform the 30-40% complete project into a fully functional application.

## Current State

### What Works
- ✅ Next.js 16.1.1 with React 19.2.3 setup
- ✅ Tailwind CSS 4 + 16 shadcn/ui components (1762 lines)
- ✅ Page structure: login, register, feed, admin, create-post, profile
- ✅ UI components: Navbar, PostCard, LoginForm, RegisterForm, CreatePostForm, AdminDashboard
- ✅ Dark mode support via next-themes

### Critical Issues
1. **Type System**: `/types/` directory is empty - Components import `Post` type that doesn't exist
2. **Database Models**: All files in `/models/` are empty (User.ts, Post.ts, Comment.ts)
3. **MongoDB Connection**: `lib/db.ts` is empty - no database integration
4. **Authentication**: `lib/auth.ts` is empty - forms exist but no JWT or password hashing
5. **AI Logic**: All files in `lib/ai/` are empty (sentiment.ts, bannedWords.ts, captionSuggestions.ts)
6. **API Routes**: All routes are stubs with identical placeholder code checking only "banned_word"
7. **Missing UI Components**: Tabs and ScrollArea imported but not implemented
8. **Dummy Data Mismatch**: Exports `DUMMY_POSTS` but imports expect `posts`, `users`, `currentUser`
9. **Home Page**: Still shows Create Next App boilerplate
10. **Missing Dependencies**: mongoose, jsonwebtoken, bcryptjs not installed

## Proposed Changes

### Phase 1: Core Infrastructure (Priority 1)

#### Step 1.1: Install Missing Dependencies
**Files:** `package.json`
**Why:** Need mongoose for MongoDB, jsonwebtoken for auth, bcryptjs for password hashing
**What:**
```bash
npm install mongoose jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

#### Step 1.2: Create Type System
**File:** `types/index.ts`
**Why:** All components import types from @/types but the file doesn't exist
**What:**
- Define `User` type (id, email, firstName, lastName, username, isAdmin, createdAt)
- Define `Post` type (id, userId, user, content, sentiment, flagged, likes, comments, createdAt)
- Define `Comment` type (id, postId, userId, user, content, createdAt)
- Define `SentimentType` union ('Positive' | 'Neutral' | 'Negative')
- Define `PostProps` interface for components
- Use branded types for IDs where appropriate

#### Step 1.3: Environment Configuration
**File:** `.env.example` and `.env.local`
**Why:** Need MongoDB URI and JWT secret for database and authentication
**What:**
```env
MONGODB_URI=mongodb://localhost:27017/flux
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

#### Step 1.4: Database Connection
**File:** `lib/db.ts`
**Why:** Required to connect to MongoDB
**What:**
- Create `connectDB()` function using mongoose
- Implement connection caching for serverless
- Add error handling and retry logic
- Export connection function

### Phase 2: Database Models (Priority 1)

#### Step 2.1: User Model
**File:** `models/User.ts`
**Why:** Foundation for authentication and user management
**What:**
- Mongoose schema: email (unique, required), password (hashed), firstName, lastName, username, isAdmin, createdAt, updatedAt
- Add index on email
- Add methods for password comparison
- Export model with proper TypeScript typing

#### Step 2.2: Post Model
**File:** `models/Post.ts`
**Why:** Core feature - posts are central to the social platform
**What:**
- Mongoose schema: userId (ref User), content, sentiment ('Positive'|'Neutral'|'Negative'), flagged, likes (array of userIds), comments (array), createdAt, updatedAt
- Add indexes on userId and createdAt
- Virtual populate for user details
- Export model with proper TypeScript typing

#### Step 2.3: Comment Model
**File:** `models/Comment.ts`
**Why:** Enable commenting feature
**What:**
- Mongoose schema: postId (ref Post), userId (ref User), content, createdAt, updatedAt
- Add indexes on postId and userId
- Virtual populate for user details
- Export model with proper TypeScript typing

### Phase 3: Authentication System (Priority 1)

#### Step 3.1: Auth Utilities
**File:** `lib/auth.ts`
**Why:** Central authentication logic for JWT and password handling
**What:**
- `hashPassword(password: string): Promise<string>` - bcrypt hashing
- `comparePassword(password: string, hash: string): Promise<boolean>` - bcrypt compare
- `generateToken(userId: string): string` - JWT sign
- `verifyToken(token: string): {userId: string} | null` - JWT verify
- `getServerSession(): Promise<{userId: string} | null>` - extract JWT from cookies
- Export all functions with proper error handling

#### Step 3.2: Update Login API
**File:** `app/api/auth/login/route.ts`
**Why:** Current implementation is a stub - need real authentication
**What:**
- Validate email/password from request body
- Query User model from MongoDB
- Compare passwords using bcrypt
- Generate JWT token
- Set HTTP-only cookie
- Return user data (without password)
- Proper error handling (401 for invalid credentials)

#### Step 3.3: Update Register API
**File:** `app/api/auth/register/route.ts`
**Why:** Current implementation is a stub - need user registration
**What:**
- Validate email, password, firstName, lastName from request body
- Check if user already exists
- Hash password with bcrypt
- Create new User in MongoDB
- Generate JWT token
- Set HTTP-only cookie
- Return user data (without password)
- Proper error handling (409 for duplicate email)

#### Step 3.4: Add Logout API
**File:** `app/api/auth/logout/route.ts`
**Why:** Missing logout functionality
**What:**
- Clear HTTP-only cookie
- Return success message

### Phase 4: AI Logic Implementation (Priority 2)

#### Step 4.1: Banned Words List
**File:** `lib/ai/bannedWords.ts`
**Why:** Content moderation requires keyword filtering
**What:**
- Export array of banned words (profanity, hate speech, violence)
- Categorize by severity if needed
- Keep academic-appropriate for evaluation

#### Step 4.2: Sentiment Analysis
**File:** `lib/ai/sentiment.ts`
**Why:** Core feature - analyze post sentiment
**What:**
- `analyzeSentiment(text: string): 'Positive' | 'Neutral' | 'Negative'`
- Define positive words array (happy, great, love, excellent, etc.)
- Define negative words array (sad, hate, terrible, awful, etc.)
- Score based on word frequency
- Return sentiment based on score thresholds
- Handle edge cases (empty text, no matches)

#### Step 4.3: Caption Suggestions
**File:** `lib/ai/captionSuggestions.ts`
**Why:** AI-assisted caption generation feature
**What:**
- `generateCaptions(context?: string): string[]`
- Template-based suggestions using keywords
- 5-7 caption templates
- If context provided, analyze keywords and suggest relevant captions
- Return array of 3-5 suggestions

#### Step 4.4: Content Moderation
**File:** `lib/ai/moderation.ts` (new file)
**Why:** Centralize moderation logic
**What:**
- `moderateContent(text: string): {flagged: boolean, reason?: string}`
- Check against banned words list
- Return flagged status with reason if flagged
- Case-insensitive matching

### Phase 5: API Routes Implementation (Priority 2)

#### Step 5.1: AI Moderate API
**File:** `app/api/ai/moderate/route.ts`
**Why:** Replace stub with real moderation
**What:**
- Import `moderateContent` from lib/ai
- Validate request body (text field)
- Call moderation logic
- Return {flagged, reason}

#### Step 5.2: AI Sentiment API
**File:** `app/api/ai/sentiment/route.ts`
**Why:** Replace stub with real sentiment analysis
**What:**
- Import `analyzeSentiment` from lib/ai
- Validate request body (text field)
- Call sentiment analysis
- Return {sentiment: 'Positive' | 'Neutral' | 'Negative'}

#### Step 5.3: AI Suggest API
**File:** `app/api/ai/suggest/route.ts`
**Why:** Replace stub with real caption suggestions
**What:**
- Import `generateCaptions` from lib/ai
- Optional context from request body
- Call caption generation
- Return {suggestions: string[]}

#### Step 5.4: Posts API - GET
**File:** `app/api/posts/route.ts`
**Why:** Fetch posts from database instead of dummy data
**What:**
- GET handler: fetch all posts from MongoDB, populate user details, sort by createdAt desc
- POST handler: create new post (authenticate, moderate, analyze sentiment, save to DB)
- Proper error handling

#### Step 5.5: Posts API - Individual Post
**File:** `app/api/posts/[postId]/route.ts` (new file)
**Why:** Get, update, delete individual posts
**What:**
- GET: fetch single post by ID
- DELETE: delete post (admin or owner only)
- Authentication required

#### Step 5.6: Likes API
**File:** `app/api/likes/route.ts`
**Why:** Replace stub with real like/unlike functionality
**What:**
- POST: add userId to post.likes array
- DELETE: remove userId from post.likes array
- Authentication required
- Return updated like count

#### Step 5.7: Comments API
**File:** `app/api/comments/route.ts`
**Why:** Replace stub with real commenting
**What:**
- GET: fetch comments for a postId (query param)
- POST: create new comment (authenticate, save to DB, update post.comments)
- Authentication required

### Phase 6: UI Components (Priority 2)

#### Step 6.1: Add Tabs Component
**File:** `components/ui/tabs.tsx`
**Why:** Profile page imports Tabs but component doesn't exist
**What:**
- Install shadcn/ui tabs: `npx shadcn@latest add tabs`
- Verify imports work in profile page

#### Step 6.2: Add ScrollArea Component
**File:** `components/ui/scroll-area.tsx`
**Why:** Feed page imports ScrollArea but component doesn't exist
**What:**
- Install shadcn/ui scroll-area: `npx shadcn@latest add scroll-area`
- Verify imports work in feed page

### Phase 7: Data Layer Fixes (Priority 2)

#### Step 7.1: Fix Dummy Data Exports
**File:** `lib/data.ts`
**Why:** Export names don't match imports across components
**What:**
- Export `posts` (instead of or in addition to DUMMY_POSTS)
- Export `users` array with dummy users
- Export `currentUser` with dummy current user
- Ensure all exports match component imports
- Update types to match Post interface

#### Step 7.2: Update Components to Use API
**Files:** `app/feed/page.tsx`, `app/profile/[userId]/page.tsx`, `app/admin/page.tsx`
**Why:** Currently using dummy data, should fetch from API
**What:**
- Convert to async server components
- Fetch data from API routes
- Handle loading states
- Handle errors
- Remove dummy data imports

### Phase 8: Middleware & Route Protection (Priority 3)

#### Step 8.1: Create Middleware
**File:** `middleware.ts` (root level)
**Why:** Protect routes that require authentication
**What:**
- Use `getServerSession()` from lib/auth
- Protect routes: /feed, /create-post, /profile, /admin
- Redirect to /login if not authenticated
- For /admin, check isAdmin flag
- Allow public routes: /, /login, /register

### Phase 9: Home Page & Polish (Priority 3)

#### Step 9.1: Update Home Page
**File:** `app/page.tsx`
**Why:** Still shows Create Next App boilerplate
**What:**
- Create landing page for Flux
- Hero section with app description
- Features showcase (AI moderation, sentiment analysis, caption suggestions)
- CTA buttons: "Get Started" → /register, "Sign In" → /login
- Use shadcn/ui components for consistent styling

#### Step 9.2: Update Navbar Auth State
**File:** `components/navbar.tsx`
**Why:** Should show actual user state from session
**What:**
- Use `getServerSession()` to check auth state
- Show user menu if authenticated
- Show login/register buttons if not authenticated
- Display actual user name from session

## State Management Changes
- [ ] No global state management needed yet (using server components + API)
- [ ] Consider adding UserContext later if client-side state needed
- [ ] Cookie-based auth is sufficient for current scope

## Type Changes
- [x] Create `/types/index.ts` with User, Post, Comment types
- [x] Define SentimentType union type
- [x] Define PostProps interface
- [x] Use branded types for IDs (UserId, PostId, CommentId)
- [x] Ensure all API routes return properly typed responses

## Testing Strategy

### Manual Testing Checklist
- [ ] Register new user → verify in MongoDB
- [ ] Login with credentials → verify JWT cookie set
- [ ] Create post with clean content → should save
- [ ] Create post with banned word → should be flagged
- [ ] Verify sentiment analysis (positive/neutral/negative)
- [ ] Test caption suggestions
- [ ] Like/unlike posts
- [ ] Add comments
- [ ] Access admin dashboard (admin user only)
- [ ] Delete post as admin
- [ ] Logout → verify cookie cleared
- [ ] Protected routes redirect when not authenticated

### Integration Testing
- [ ] API routes return correct status codes
- [ ] MongoDB queries execute successfully
- [ ] JWT tokens are valid and expire correctly
- [ ] Password hashing works
- [ ] Content moderation catches banned words
- [ ] Sentiment analysis produces consistent results

### Component Testing
- [ ] Forms submit correctly
- [ ] Error messages display
- [ ] Loading states work
- [ ] Tabs component renders
- [ ] ScrollArea component works
- [ ] Dark mode toggles correctly

## Risks & Considerations

### Risk 1: MongoDB Connection in Serverless
**Mitigation:** Implement connection caching to avoid exhausting connections in Next.js serverless functions

### Risk 2: JWT Cookie Security
**Mitigation:** Use HTTP-only, secure (in production), sameSite cookies. Store only userId in JWT payload.

### Risk 3: Password Security
**Mitigation:** Use bcrypt with proper salt rounds (10-12). Never log or expose passwords.

### Risk 4: Content Moderation Accuracy
**Mitigation:** Academic project with simple keyword matching is sufficient. Document limitations.

### Risk 5: Breaking Changes During Refactor
**Mitigation:** Work in phases, test each phase before moving to next.

### Risk 6: Type Errors from Missing Definitions
**Mitigation:** Create type system first before other changes.

## Rollback Plan

### If Critical Failure
1. Git status to see uncommitted changes
2. `git checkout -- <file>` to revert specific files
3. `git reset --hard HEAD` to revert all changes (if needed)
4. Restore dummy data if API integration fails

### Incremental Rollback
- Each phase is independent
- Can revert individual files without affecting others
- Keep dummy data exports until API integration is verified

## Dependencies

### Prerequisites
- MongoDB running locally or connection string available
- Node.js 18+ installed
- Git working directory clean (currently only Claude.md untracked)

### Execution Order
1. **Must complete Phase 1 first** (infrastructure, types, env, db connection)
2. **Then Phase 2** (database models) - depends on types and db connection
3. **Then Phase 3** (authentication) - depends on User model
4. **Then Phase 4 + 5** (AI logic + API routes) - can run in parallel
5. **Then Phase 6 + 7** (UI components + data fixes)
6. **Finally Phase 8 + 9** (middleware + polish)

### External Dependencies
- MongoDB instance (local or Atlas)
- npm packages: mongoose, jsonwebtoken, bcryptjs

## Success Criteria

### Definition of Done
- ✅ All TypeScript errors resolved
- ✅ All imports working correctly
- ✅ User can register and login
- ✅ User can create posts with AI moderation
- ✅ Sentiment analysis works on posts
- ✅ Caption suggestions generated
- ✅ Users can like and comment on posts
- ✅ Admin can view all posts and delete flagged content
- ✅ Protected routes redirect properly
- ✅ Home page displays landing content
- ✅ No console errors in browser
- ✅ Dark mode works throughout

### Performance Targets
- Page load < 2 seconds
- API responses < 500ms
- No memory leaks from DB connections

## Timeline Notes
**No timeline estimates** - work will be completed in phases as described above. Each phase builds on previous phases.
