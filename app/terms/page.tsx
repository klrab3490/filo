import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 9, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Flux, you accept and agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To use certain features of Flux, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>Be responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use Flux to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Post harmful, offensive, or illegal content</li>
                <li>Harass, bully, or threaten other users</li>
                <li>Impersonate others or misrepresent your identity</li>
                <li>Spam or send unsolicited messages</li>
                <li>Violate intellectual property rights</li>
                <li>Attempt to hack or compromise platform security</li>
                <li>Use automated scripts or bots</li>
                <li>Engage in any activity that disrupts the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Content Moderation</h2>
              <p className="text-muted-foreground mb-4">
                Flux uses AI-powered content moderation to maintain a safe community:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Posts are analyzed before publication</li>
                <li>Content violating our guidelines will be flagged or removed</li>
                <li>Repeated violations may result in account suspension</li>
                <li>We reserve the right to moderate content at our discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. User Content</h2>
              <p className="text-muted-foreground mb-4">
                You retain ownership of content you post on Flux. However, by posting content, you grant us:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>A non-exclusive license to use, display, and distribute your content</li>
                <li>The right to moderate and analyze your content using AI</li>
                <li>Permission to use aggregated, anonymized data for platform improvement</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You are solely responsible for the content you post and its consequences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Flux platform, including its design, features, and code, is owned by Flux and
                protected by copyright and other intellectual property laws. You may not copy,
                modify, or reverse engineer any part of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. AI Features</h2>
              <p className="text-muted-foreground mb-4">
                Our AI features (content moderation, sentiment analysis, suggestions) are provided
                "as is":
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AI decisions may not always be perfect</li>
                <li>We continuously improve our algorithms</li>
                <li>You can appeal moderation decisions</li>
                <li>AI suggestions are recommendations, not requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may suspend or terminate your account if you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Violate these Terms of Service</li>
                <li>Engage in prohibited conduct</li>
                <li>Harm the platform or other users</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You may delete your account at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Disclaimers</h2>
              <p className="text-muted-foreground mb-4">
                Flux is provided "as is" without warranties of any kind:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We are not responsible for user-generated content</li>
                <li>We do not guarantee the accuracy of AI analysis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, Flux shall not be liable for any indirect,
                incidental, special, or consequential damages arising from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may modify these terms at any time. We will notify users of significant changes.
                Continued use of Flux after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at: legal@flux.com
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-lg border-2 bg-gradient-to-br from-primary/5 to-purple-600/5">
            <h3 className="text-2xl font-bold mb-4">Agree to Our Terms?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users on Flux today.
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
