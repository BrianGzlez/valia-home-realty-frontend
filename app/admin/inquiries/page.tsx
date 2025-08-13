import { InquiryManagement } from "@/components/admin/inquiry-management"

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-secondary">Inquiry Management</h1>
          <p className="text-gray-600">Track and manage customer inquiries</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <InquiryManagement />
      </div>
    </div>
  )
}
