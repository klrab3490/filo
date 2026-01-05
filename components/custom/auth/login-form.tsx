"use client"

import * as React from "react"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LoginForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate a login call
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Success",
                description: "Welcome back to Flux!",
            })
            router.push("/feed")
        }, 1000)
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                            className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button variant="link" size="sm" className="px-0 font-normal text-muted-foreground hover:text-primary">
                                Forgot password?
                            </Button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            disabled={isLoading}
                            required
                            className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="border-border/50 hover:bg-secondary/50 bg-transparent"
                >
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    GitHub
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="border-border/50 hover:bg-secondary/50 bg-transparent"
                >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </div>
        </div>
    )
}
