"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createDataClient } from "@/lib/data-client"
import type { Booking } from "@/lib/types"
import { Search, Calendar, Eye, Check, X } from "lucide-react"

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      const dataClient = createDataClient("mock")
      const bookingData = await dataClient.bookings.list()
      setBookings(bookingData)
      setLoading(false)
    }

    loadBookings()
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-valia-warning/10 text-valia-warning"
      case "confirmed":
        return "bg-valia-success/10 text-valia-success"
      case "cancelled":
        return "bg-valia-danger/10 text-valia-danger"
      default:
        return "bg-valia-chip text-valia-ink"
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: "confirmed" | "cancelled") => {
    const dataClient = createDataClient("mock")
    await dataClient.bookings.update(bookingId, { status: newStatus })

    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  if (loading) {
    return <div className="text-center py-8 text-valia-muted">Loading bookings...</div>
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-valia-muted" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-valia-ink text-lg">{booking.name}</h3>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-valia-muted">Contact Information</p>
                      <p className="text-sm font-medium text-valia-ink">{booking.email}</p>
                      {booking.phone && <p className="text-sm font-medium text-valia-ink">{booking.phone}</p>}
                    </div>
                    <div>
                      <p className="text-sm text-valia-muted">Appointment Details</p>
                      <p className="text-sm font-medium text-valia-ink">
                        {new Date(booking.datetime).toLocaleDateString()} at{" "}
                        {new Date(booking.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-sm text-valia-muted">Property ID: {booking.propertyId}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-valia-muted">Notes</p>
                      <p className="text-sm text-valia-ink">{booking.notes}</p>
                    </div>
                  )}

                  <p className="text-xs text-valia-muted">
                    Created: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {booking.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent border-valia-success text-valia-success hover:bg-valia-success hover:text-white"
                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent border-valia-danger text-valia-danger hover:bg-valia-danger hover:text-white"
                        onClick={() => updateBookingStatus(booking.id, "cancelled")}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-valia-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-valia-ink mb-2">No bookings found</h3>
            <p className="text-valia-muted">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
