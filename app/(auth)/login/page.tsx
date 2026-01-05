import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/custom/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Flux",
  description: "Securely sign in to your Flux account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center gap-2 mb-8 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl transition-transform group-hover:scale-110">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight">Flux</span>
          </Link>
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-foreground">
            Where ideas flow
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary transition-colors">
            Sign up
          </Link>
        </p>

        <p className="px-8 text-center text-xs text-muted-foreground mt-4">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
