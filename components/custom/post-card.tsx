'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { HeartIcon, MessageCircleIcon, Trash2Icon } from 'lucide-react'
import { Post } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface PostCardProps {
    post: Post
    showActions?: boolean
    showDelete?: boolean
    onDelete?: (postId: string) => void
}

export function PostCard({ post, showActions = true, showDelete = false, onDelete }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likes, setLikes] = useState(post.likes)

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1)
            setIsLiked(false)
        } else {
            setLikes(likes + 1)
            setIsLiked(true)
        }
    }

    const getSentimentColor = (sentiment: Post['sentiment']) => {
        switch (sentiment) {
            case 'Positive':
                return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'Negative':
                return 'bg-red-500/10 text-red-500 border-red-500/20'
            case 'Neutral':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                    <Link href={`/profile/${post.userId}`}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
                            <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link href={`/profile/${post.userId}`} className="font-semibold hover:underline">
                                    {post.userName}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                                </p>
                            </div>
                            <Badge variant="outline" className={getSentimentColor(post.sentiment)}>
                                {post.sentiment}
                            </Badge>
                        </div>
                        <p className="text-sm leading-relaxed">{post.content}</p>
                    </div>
                </div>
            </CardContent>
            {(showActions || showDelete) && (
                <CardFooter className="border-t pt-4 flex items-center justify-between">
                    {showActions && (
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                                onClick={handleLike}
                            >
                                <HeartIcon
                                    className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                                />
                                <span className="text-sm">{likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <MessageCircleIcon className="h-4 w-4" />
                                <span className="text-sm">Comment</span>
                            </Button>
                        </div>
                    )}
                    {showDelete && onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive"
                            onClick={() => onDelete(post.id)}
                        >
                            <Trash2Icon className="h-4 w-4" />
                            Delete
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    )
}
