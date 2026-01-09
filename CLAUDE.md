# Project: Flux – AI-Assisted Social Media Platform

## Overview
Flux is a full-stack AI-assisted social media platform built using Next.js.
The platform focuses on content safety, sentiment analysis, and AI-assisted
caption suggestions using rule-based NLP techniques.

This project is developed as an academic + practical implementation to
demonstrate modern full-stack architecture and basic AI-assisted moderation.

---

## Tech Stack
- Framework: Next.js 16.1.1 (App Router with Turbopack)
- Language: TypeScript 5+
- UI: Tailwind CSS 4 + shadcn/ui v4
- Database: MongoDB Atlas (Mongoose)
- Authentication: JWT with bcryptjs (HTTP-only cookies)
- Backend: Next.js Route Handlers
- AI Logic: Rule-based NLP (keyword filtering, sentiment scoring)
- Additional: date-fns for date formatting, sonner for toast notifications

---

## Application Features
### User Features
- User registration and login
- Create, view, like, and comment on posts
- AI content moderation before posting
- Sentiment analysis (Positive / Neutral / Negative)
- AI-assisted caption suggestions
- User profiles

### Admin Features
- Admin-only dashboard
- View all posts
- Identify flagged or negative sentiment posts
- Delete inappropriate content

---

## Folder Structure (High-Level)
- app/ → UI pages and API routes
  - app/(auth)/ → Authentication pages (login, register)
  - app/api/ → Backend API route handlers
  - app/admin/ → Admin dashboard
  - app/feed/ → Main feed page
  - app/profile/[userId]/ → User profile pages
  - app/create-post/ → Post creation page
- components/ → React components
  - components/ui/ → shadcn/ui components
  - components/custom/ → Custom application components
  - components/custom/auth/ → Authentication forms
  - components/custom/admin/ → Admin dashboard components
- lib/ → Shared utilities
  - lib/auth.ts → Authentication utilities (JWT, bcrypt)
  - lib/db.ts → MongoDB connection with caching
  - lib/dummy-data.ts → Mock data for development
  - lib/ai/ → AI logic (moderation, sentiment, suggestions)
- models/ → Mongoose schemas
  - models/User.ts → User model
  - models/Post.ts → Post model
  - models/Comment.ts → Comment model
- types/ → TypeScript type definitions
- middleware.ts → Route protection using JWT

---

## AI Methodology
- Content moderation is performed using keyword matching against a banned words list
- Sentiment analysis uses positive and negative word scoring
- Caption suggestions are template-based and keyword-driven
- No external AI APIs or ML models are used

---

## Development Rules for Claude
When assisting with this project, Claude should:

1. Follow Next.js App Router conventions
2. Use TypeScript for all examples
3. Prefer server components unless client components are required
4. Use shadcn/ui components for UI examples
5. Keep AI logic rule-based (no OpenAI, Gemini, or ML libraries)
6. Avoid overengineering or unnecessary abstractions
7. Ensure all solutions are academic-review friendly
8. Do not introduce features outside the defined scope
9. Keep explanations concise and implementation-focused
10. Assume MongoDB + JWT authentication is already in use

---

## Code Style Guidelines
- Clean, readable TypeScript
- Explicit naming over clever shortcuts
- Small, reusable functions
- No magic constants (use config files where needed)
- Proper error handling for API routes

---

## Out of Scope
- Deep learning models
- External AI APIs
- Real-time chat
- Push notifications
- Recommendation systems

---

## Environment Setup

### Required Environment Variables
Create a `.env` file in the root directory with:
```
MONGODB_URI=mongodb+srv://filo:fNpu3YmAY8LeWdH1@filo.ejmglue.mongodb.net/?appName=filo
JWT_SECRET=flux-super-secret-jwt-key-for-development-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

---

## Build Status
✅ All build errors resolved
✅ TypeScript compilation passing
✅ All dependencies installed:
  - bcryptjs, @types/bcryptjs (password hashing)
  - jsonwebtoken, @types/jsonwebtoken (JWT authentication)
  - mongoose (MongoDB ODM)
  - shadcn/ui components (UI library)
  - date-fns (date formatting)
  - sonner (toast notifications)

---

## Known Issues & Workarounds
1. **JWT Type Issues**: Using `@ts-expect-error` for jwt.sign due to expiresIn type mismatch
2. **Mongoose Transform Types**: Using `any` type for transform function parameters
3. **Multiple Lockfiles Warning**: Ignore the workspace root warning (cosmetic only)

---

## Goal
The primary goal of this project is to demonstrate:
- Full-stack development using Next.js
- Practical use of AI concepts in moderation
- Clean architecture and maintainability
- Readiness for academic evaluation and viva explanation
