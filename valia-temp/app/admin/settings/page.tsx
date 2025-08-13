import { SettingsManagement } from "@/components/admin/settings-management"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Settings</h1>
          <p className="text-valia-muted">Configure your application settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <SettingsManagement />
      </div>
    </div>
  )
}
