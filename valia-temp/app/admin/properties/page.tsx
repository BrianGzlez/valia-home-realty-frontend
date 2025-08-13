import { PropertyManagement } from "@/components/admin/property-management"

export default function AdminPropertiesPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Gestión de Propiedades</h1>
          <p className="text-valia-muted">Administra todas las propiedades de tu portafolio</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <PropertyManagement />
      </div>
    </div>
  )
}
