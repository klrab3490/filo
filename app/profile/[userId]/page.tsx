import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/custom/navbar";
import { PostCard } from "@/components/custom/post-card";
import { posts, users, currentUser } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const user = users.find((u) => u.id === userId)

  if (!user) {
    notFound()
  }

  const isOwnProfile = user.id === currentUser.id
  const userPosts = posts.filter((p) => p.userId === user.id)
  const likedPosts = posts.filter((p) => p.isLiked) // Simple mock of liked posts

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-2xl py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{user.followers} followers</span>
                <span>•</span>
                <span>{userPosts.length} posts</span>
              </div>
            </div>
            {!isOwnProfile && <Button className="rounded-full px-8">Follow</Button>}
          </div>

          {/* Profile Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/30 p-1">
              <TabsTrigger value="posts" className="rounded-md">
                Posts
              </TabsTrigger>
              <TabsTrigger value="liked" className="rounded-md">
                Liked Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6 space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="py-12 text-center text-muted-foreground bg-secondary/10 rounded-xl border border-dashed">
                  No posts yet.
                </div>
              )}
            </TabsContent>
            <TabsContent value="liked" className="mt-6 space-y-6">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="py-12 text-center text-muted-foreground bg-secondary/10 rounded-xl border border-dashed">
                  No liked posts yet.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
