import type { Booking, BookingService } from "@/lib/types"

export function createRestBookingService(): BookingService {
  return {
    async list(): Promise<Booking[]> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/bookings')
      // if (!response.ok) throw new Error('Failed to fetch bookings')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async get(id: string): Promise<Booking | null> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/bookings/${id}`)
      // if (response.status === 404) return null
      // if (!response.ok) throw new Error('Failed to fetch booking')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async create(bookingData: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData),
      // })
      // if (!response.ok) throw new Error('Failed to create booking')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async update(id: string, updates: Partial<Booking>): Promise<Booking> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/bookings/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // })
      // if (!response.ok) throw new Error('Failed to update booking')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async remove(id: string): Promise<void> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/bookings/${id}`, {
      //   method: 'DELETE',
      // })
      // if (!response.ok) throw new Error('Failed to delete booking')

      throw new Error("REST API not implemented yet")
    },
  }
}
