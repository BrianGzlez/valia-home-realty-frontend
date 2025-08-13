import { BookingManagement } from "@/components/admin/booking-management"

export default function AdminBookingsPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-serif text-3xl font-bold text-valia-ink">Booking Management</h1>
          <p className="text-valia-muted">Manage property viewings and appointments</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <BookingManagement />
      </div>
    </div>
  )
}
