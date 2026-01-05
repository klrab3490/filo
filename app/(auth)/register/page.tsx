import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/custom/auth/register-form";

export const metadata: Metadata = {
  title: "Create an Account | Flux",
  description: "Join Flux and start sharing your ideas",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center gap-2 mb-8 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl transition-transform group-hover:scale-110">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">Flux</span>
          </Link>
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Enter your information to join the flow</p>
        </div>

        <RegisterForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
