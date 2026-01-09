import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Shield, TrendingUp, Users, Target, Heart, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground font-bold text-lg shadow-lg group-hover:shadow-xl transition-all">
              F
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Flux
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-purple-600">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">About Flux</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Building a Safer{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Social Future
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flux is an AI-assisted social media platform designed to create meaningful connections
              while prioritizing user safety and content quality.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-12 border-2">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                At Flux, we believe social media should be a force for good. Our mission is to create
                a platform where people can express themselves freely while maintaining a safe,
                respectful community. By leveraging AI technology for content moderation and sentiment
                analysis, we ensure that every interaction contributes to a positive online experience.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Safety First</CardTitle>
                  <CardDescription>
                    We prioritize user safety with AI-powered moderation that keeps our community
                    respectful and secure.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 mb-4">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Authenticity</CardTitle>
                  <CardDescription>
                    We encourage genuine connections and meaningful conversations that bring people
                    together.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                  <CardDescription>
                    We continuously improve our AI technology to provide the best social media
                    experience possible.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Technology */}
          <Card className="mb-12 border-2 bg-gradient-to-br from-primary/5 to-purple-600/5">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Our Technology</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Content Moderation</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes posts in real-time using rule-based NLP techniques to identify
                  inappropriate content before it reaches the community.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-muted-foreground">
                  We provide instant feedback on the emotional tone of posts, helping users
                  communicate more effectively and thoughtfully.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Smart Suggestions</h3>
                <p className="text-muted-foreground">
                  Our AI offers caption suggestions to help users express themselves better,
                  fostering more engaging and meaningful interactions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Built for the Community</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Flux is an academic project demonstrating modern full-stack development and AI
              integration. Built with Next.js, TypeScript, MongoDB, and powered by rule-based AI.
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600">
              <Link href="/register">Join Flux Today</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Flux. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
