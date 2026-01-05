"use client";

import * as React from "react";
import { toast } from "sonner";
import type { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { posts as initialPosts } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterIcon, MoreHorizontalIcon, Trash2Icon, FlagIcon, CheckCircleIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AdminDashboard() {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts)
  const [sentimentFilter, setSentimentFilter] = React.useState<string>("All")
  const [flaggedFilter, setFlaggedFilter] = React.useState<boolean | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesSentiment = sentimentFilter === "All" || post.sentiment === sentimentFilter
    const matchesFlagged = flaggedFilter === null || post.isFlagged === flaggedFilter
    const matchesSearch =
      post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSentiment && matchesFlagged && matchesSearch
  })

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
    toast("Post deleted", {
      description: "The post has been removed from the platform.",
    })
  }

  const toggleFlag = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, isFlagged: !p.isFlagged } : p)))
    const post = posts.find((p) => p.id === id)
    toast(post?.isFlagged ? "Flag removed" : "Post flagged", {
      description: post?.isFlagged ? "The post is now marked as normal." : "The post has been flagged for review.",
    })
  }

  const getSentimentColor = (sentiment: Post["sentiment"]) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Negative":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Neutral":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Search users or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <FilterIcon className="h-4 w-4" />
                Sentiment: {sentimentFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSentimentFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSentimentFilter("Positive")}>Positive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSentimentFilter("Neutral")}>Neutral</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSentimentFilter("Negative")}>Negative</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <FlagIcon className="h-4 w-4" />
                Status: {flaggedFilter === null ? "All" : flaggedFilter ? "Flagged" : "Normal"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFlaggedFilter(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlaggedFilter(true)}>Flagged</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFlaggedFilter(false)}>Normal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">User</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[120px]">{post.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-[300px] truncate text-muted-foreground">{post.content}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSentimentColor(post.sentiment)}>
                      {post.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.isFlagged ? (
                      <Badge variant="destructive" className="gap-1 px-1.5 h-6">
                        <FlagIcon className="h-3 w-3 fill-current" />
                        Flagged
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1 px-1.5 h-6">
                        <CheckCircleIcon className="h-3 w-3" />
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleFlag(post.id)}>
                          <FlagIcon className="mr-2 h-4 w-4" />
                          {post.isFlagged ? "Unflag Post" : "Flag Post"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(post.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No posts found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
