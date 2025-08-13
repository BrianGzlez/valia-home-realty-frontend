import { AgentManagement } from "@/components/admin/agent-management"

export default function AdminAgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-secondary">Agent Management</h1>
          <p className="text-gray-600">Manage your real estate agents</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <AgentManagement />
      </div>
    </div>
  )
}
