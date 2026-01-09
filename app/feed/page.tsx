import { Navbar } from "@/components/custom/navbar"
import { PostCard } from "@/components/custom/post-card"
import { posts } from "@/lib/dummy-data"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-2xl py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold tracking-tight">Your Feed</h1>
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-6 pb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  )
}
