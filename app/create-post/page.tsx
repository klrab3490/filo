import { Navbar } from "@/components/custom/navbar"
import { CreatePostForm } from "@/components/custom/create-post-form"

export default function CreatePostPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-2xl py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold tracking-tight">Create a Post</h1>
          <CreatePostForm />
        </div>
      </main>
    </div>
  )
}
