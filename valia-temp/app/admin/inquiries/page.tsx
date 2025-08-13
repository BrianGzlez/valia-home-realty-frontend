import { InquiryManagement } from "@/components/admin/inquiry-management"

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Gestión de Consultas</h1>
          <p className="text-valia-muted">Rastrea y administra las consultas de clientes</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <InquiryManagement />
      </div>
    </div>
  )
}
