"use client";

import * as React from "react";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate registration logic
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Welcome to Flux! Your account is ready.")
            router.push("/feed")
        }, 1500)
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                                id="first-name"
                                placeholder="John"
                                disabled={isLoading}
                                required
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                id="last-name"
                                placeholder="Doe"
                                disabled={isLoading}
                                required
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
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
                        <Label htmlFor="password">Password</Label>
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
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all mt-2"
                    >
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or register with</span>
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
