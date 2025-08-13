import { AgentManagement } from "@/components/admin/agent-management"

export default function AdminAgentsPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Gestión de Agentes</h1>
          <p className="text-valia-muted">Administra tu equipo de agentes inmobiliarios</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <AgentManagement />
      </div>
    </div>
  )
}
