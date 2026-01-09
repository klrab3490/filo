import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Shield, TrendingUp, Users, ArrowRight, CheckCircle2, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container relative py-20 md:py-28 lg:py-36">
          {/* Floating Elements */}
          <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative flex flex-col items-center gap-8 text-center">
            <Badge variant="secondary" className="px-5 py-2 text-sm font-medium border border-primary/20 shadow-sm">
              <Zap className="mr-2 h-3.5 w-3.5 inline" />
              AI-Powered Social Platform
            </Badge>

            <h1 className="max-w-8xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Share Your Voice with{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Confidence
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-primary rounded-full blur-sm" />
              </span>
            </h1>

            <p className="max-w-2xl text-xl text-muted-foreground/90 md:text-2xl leading-relaxed">
              Experience the future of social media with real-time AI moderation, sentiment analysis,
              and a community that values authenticity.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-2xl shadow-primary/25 px-8 text-base h-12">
                <Link href="/register">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 hover:bg-primary/5 px-8 text-base h-12">
                <Link href="/feed">Explore Feed</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>AI-Powered Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Private & Secure</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-20 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform uses cutting-edge technology to ensure your social experience is safe, meaningful, and authentic.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Content Moderation</CardTitle>
                <CardDescription className="text-base">
                  AI-powered moderation ensures your posts meet community standards before they go live.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-purple-500/5">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Sentiment Analysis</CardTitle>
                <CardDescription className="text-base">
                  Get instant feedback on the tone of your posts with real-time sentiment detection technology.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Suggestions</CardTitle>
                <CardDescription className="text-base">
                  Receive AI-generated caption ideas to help you express yourself more effectively.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-purple-500/5">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Safe Community</CardTitle>
                <CardDescription className="text-base">
                  Connect with others in a moderated environment that prioritizes respectful conversations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container py-20">
          <div className="rounded-3xl border-2 bg-gradient-to-br from-primary/10 via-background to-purple-600/10 p-12 md:p-16">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-lg font-medium text-muted-foreground">
                  Content Safety Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  &lt;100ms
                </div>
                <div className="text-lg font-medium text-muted-foreground">
                  Analysis Speed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-lg font-medium text-muted-foreground">
                  Active Moderation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <Card className="relative overflow-hidden border-2 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-600/10" />
            <CardContent className="relative flex flex-col items-center gap-8 p-12 md:p-16 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
                  Ready to Join Flux?
                </h2>
                <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                  Sign up today and start sharing your thoughts with a community that values safety,
                  authenticity, and meaningful connections.
                </p>
              </div>

              <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-2xl shadow-primary/25 px-10 text-lg h-14">
                <Link href="/register">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground">
                No credit card required • Free to join • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-primary-foreground font-bold text-base">
                  F
                </div>
                <span className="text-lg font-bold">Flux</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                An AI-assisted social media platform that prioritizes content safety,
                sentiment analysis, and authentic community connections.
              </p>
              <p className="text-xs text-muted-foreground">
                © 2025 Flux. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/feed" className="hover:text-foreground transition-colors">Feed</Link></li>
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link href="/guidelines" className="hover:text-foreground transition-colors">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
