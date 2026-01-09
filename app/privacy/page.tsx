import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PrivacyPage() {
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
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 9, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to Flux. We respect your privacy and are committed to protecting your personal
                data. This privacy policy explains how we collect, use, and safeguard your information
                when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Account Information</h3>
              <p className="text-muted-foreground mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Email address</li>
                <li>Username</li>
                <li>First and last name</li>
                <li>Password (encrypted)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Content Data</h3>
              <p className="text-muted-foreground mb-4">
                We store the content you create on our platform, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Posts and comments</li>
                <li>Likes and interactions</li>
                <li>Sentiment analysis results</li>
                <li>Content moderation flags</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Usage Data</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information when you use Flux:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Login timestamps</li>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide and maintain our service</li>
                <li>Authenticate your account and verify your identity</li>
                <li>Analyze and moderate content for safety</li>
                <li>Improve our AI algorithms</li>
                <li>Communicate with you about service updates</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">AI Processing</h2>
              <p className="text-muted-foreground mb-4">
                Our AI systems process your content to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Detect inappropriate content using rule-based keyword matching</li>
                <li>Analyze sentiment (positive, neutral, negative)</li>
                <li>Generate caption suggestions</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                All AI processing happens on our secure servers. We do not share your content with
                third-party AI services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Password encryption using bcrypt</li>
                <li>JWT-based authentication with HTTP-only cookies</li>
                <li>Secure HTTPS connections</li>
                <li>MongoDB Atlas with encryption at rest and in transit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of certain data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                We use HTTP-only cookies for authentication purposes. These cookies are essential
                for the platform to function and cannot be disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Flux is not intended for users under the age of 13. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy, please contact us at:
                privacy@flux.com
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-lg border-2 bg-gradient-to-br from-primary/5 to-purple-600/5">
            <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
            <p className="text-muted-foreground mb-6">
              Your privacy is protected. Join Flux today.
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600">
              <Link href="/register">Create Account</Link>
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
