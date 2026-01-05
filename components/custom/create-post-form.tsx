"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparklesIcon, AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SUGGESTED_CAPTIONS = [
    "Feeling inspired by today's flow! 🌊",
    "Where ideas become reality. #FluxApp",
    "Just another day in the stream of thoughts. ✨",
]

export function CreatePostForm() {
    const [content, setContent] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const router = useRouter()

    const handlePost = async () => {
        if (!content.trim()) return

        // Simple simulation of moderation (e.g., blocking "spam")
        if (content.toLowerCase().includes("spam")) {
            setShowError(true)
            return
        }

        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            toast("Post created",{
                description: "Your idea is now flowing in the feed.",
            })
            router.push("/feed")
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">What's on your mind?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Share your ideas with the world..."
                        className="min-h-[150px] resize-none text-base"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                            if (showError) setShowError(false)
                        }}
                    />

                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <SparklesIcon className="h-4 w-4" />
                            Suggested Captions
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {SUGGESTED_CAPTIONS.map((caption, i) => (
                                <button
                                    key={i}
                                    onClick={() => setContent(caption)}
                                    className="text-left p-3 rounded-lg border bg-secondary/50 hover:bg-secondary transition-colors text-xs leading-relaxed"
                                >
                                    {caption}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                    <Button className="ml-auto" disabled={isSubmitting || !content.trim()} onClick={handlePost}>
                        {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Post
                    </Button>
                </CardFooter>
            </Card>

            {showError && (
                <Alert variant="destructive">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>Content Moderation</AlertTitle>
                    <AlertDescription>Your post contains restricted language. Please revise your content.</AlertDescription>
                </Alert>
            )}
        </div>
    )
}
