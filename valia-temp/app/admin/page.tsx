import { AdminStats } from "@/components/admin/admin-stats"
import { RecentInquiries } from "@/components/admin/recent-inquiries"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { QuickActions } from "@/components/admin/quick-actions"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-secondary">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your real estate business</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <AdminStats />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentInquiries />
            <RecentBookings />
          </div>
        </div>
      </div>
    </div>
  )
}
