import { ReportsManagement } from "@/components/admin/reports-management"

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Reports & Analytics</h1>
          <p className="text-valia-muted">View business performance and generate reports</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <ReportsManagement />
      </div>
    </div>
  )
}
