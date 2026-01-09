/**
 * Database Seed Script
 *
 * This script populates the MongoDB database with initial data for development and testing.
 * Run with: npm run seed or ts-node scripts/seed.ts
 */

import { connectDB, disconnectDB } from '../lib/db'
import { hashPassword } from '../lib/auth'
import User from '../models/User'
import Post from '../models/Post'
import Comment from '../models/Comment'

async function seed() {
  try {
    console.log('🌱 Starting database seed...')

    // Connect to database
    await connectDB()
    console.log('✓ Connected to database')

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...')
    await User.deleteMany({})
    await Post.deleteMany({})
    await Comment.deleteMany({})
    console.log('✓ Existing data cleared')

    // Create admin user
    console.log('👤 Creating admin user...')
    const adminPassword = await hashPassword('admin123')
    const admin = await User.create({
      email: 'admin@flux.com',
      password: adminPassword,
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
    })
    console.log('✓ Admin user created:', admin.email)

    // Create regular users
    console.log('👥 Creating regular users...')
    const usersData = [
      {
        email: 'alex@example.com',
        password: await hashPassword('password123'),
        username: 'arivers',
        firstName: 'Alex',
        lastName: 'Rivers',
        isAdmin: false,
      },
      {
        email: 'sam@example.com',
        password: await hashPassword('password123'),
        username: 'schen',
        firstName: 'Sam',
        lastName: 'Chen',
        isAdmin: false,
      },
      {
        email: 'jordan@example.com',
        password: await hashPassword('password123'),
        username: 'jsmith',
        firstName: 'Jordan',
        lastName: 'Smith',
        isAdmin: false,
      },
    ]

    const users = await User.insertMany(usersData)
    console.log(`✓ Created ${users.length} regular users`)

    // Create posts
    console.log('📝 Creating posts...')
    const postsData = [
      {
        userId: users[0]._id,
        content:
          'Just launched a new project! The community feedback has been incredible so far. Can\'t wait to see where this goes. 🚀',
        sentiment: 'Positive',
        flagged: false,
        likes: [users[1]._id, users[2]._id],
        comments: [],
      },
      {
        userId: users[1]._id,
        content:
          'The latest update to the framework is interesting, but I\'m finding some edge cases that are hard to debug. Anyone else seeing this?',
        sentiment: 'Neutral',
        flagged: false,
        likes: [users[0]._id],
        comments: [],
      },
      {
        userId: users[2]._id,
        content:
          'Honestly disappointed with the recent design changes. It feels like they removed functionality for the sake of \'minimalism\'.',
        sentiment: 'Negative',
        flagged: false,
        likes: [users[0]._id, users[1]._id, admin._id],
        comments: [],
      },
      {
        userId: admin._id,
        content:
          'Welcome to Flux! We\'re excited to have you here. Share your thoughts, connect with others, and be respectful. Happy posting!',
        sentiment: 'Positive',
        flagged: false,
        likes: [users[0]._id, users[1]._id, users[2]._id],
        comments: [],
      },
      {
        userId: users[0]._id,
        content:
          'Working on some exciting new features. The team has been amazing, and I can\'t wait to share what we\'ve been building!',
        sentiment: 'Positive',
        flagged: false,
        likes: [users[1]._id, admin._id],
        comments: [],
      },
      {
        userId: users[1]._id,
        content:
          'This is absolutely terrible! The service is broken and support has been completely unhelpful. Waste of time and money!',
        sentiment: 'Negative',
        flagged: true,
        flagReason: 'Aggressive language and complaints',
        likes: [],
        comments: [],
      },
    ]

    const posts = await Post.insertMany(postsData)
    console.log(`✓ Created ${posts.length} posts`)

    // Create comments
    console.log('💬 Creating comments...')
    const commentsData = [
      {
        postId: posts[0]._id,
        userId: users[1]._id,
        content: 'Congrats on the launch! Looking forward to trying it out.',
      },
      {
        postId: posts[0]._id,
        userId: users[2]._id,
        content: 'This sounds really interesting. Where can I learn more?',
      },
      {
        postId: posts[1]._id,
        userId: users[0]._id,
        content: 'I noticed the same issue. Have you tried clearing the cache?',
      },
      {
        postId: posts[2]._id,
        userId: admin._id,
        content: 'Thanks for the feedback. We\'re always looking to improve.',
      },
      {
        postId: posts[3]._id,
        userId: users[0]._id,
        content: 'Thanks for creating this platform!',
      },
    ]

    const comments = await Comment.insertMany(commentsData)
    console.log(`✓ Created ${comments.length} comments`)

    // Update posts with comment references
    for (const comment of comments) {
      await Post.findByIdAndUpdate(comment.postId, {
        $push: { comments: comment._id },
      })
    }
    console.log('✓ Updated posts with comment references')

    console.log('\n✅ Database seed completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   • Users: ${users.length + 1} (including admin)`)
    console.log(`   • Posts: ${posts.length}`)
    console.log(`   • Comments: ${comments.length}`)
    console.log('\n🔐 Login Credentials:')
    console.log('   Admin: admin@flux.com / admin123')
    console.log('   User 1: alex@example.com / password123')
    console.log('   User 2: sam@example.com / password123')
    console.log('   User 3: jordan@example.com / password123')

    await disconnectDB()
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

// Run seed if called directly
if (require.main === module) {
  seed()
}

export default seed
