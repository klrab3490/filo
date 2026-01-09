import { Navbar } from "@/components/custom/navbar"
import { AdminDashboard } from "@/components/custom/admin/dashboard"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage posts and monitor community sentiment.</p>
          </div>
          <AdminDashboard />
        </div>
      </main>
    </div>
  )
}
