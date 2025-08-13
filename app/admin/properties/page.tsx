import { PropertyManagement } from "@/components/admin/property-management"

export default function AdminPropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-secondary">Property Management</h1>
          <p className="text-gray-600">Manage all properties in your portfolio</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <PropertyManagement />
      </div>
    </div>
  )
}
