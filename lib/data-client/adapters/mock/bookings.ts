import type { Booking, BookingService } from "../../../types"

const mockBookings: Booking[] = [
  {
    id: "1",
    propertyId: "1",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "+1-809-555-0201",
    datetime: "2025-08-15T14:00:00Z",
    notes: "Interesado en la villa, disponible por las tardes",
    status: "confirmed",
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "2",
    propertyId: "2",
    name: "Ana Martínez",
    email: "ana@example.com",
    phone: "+1-809-555-0202",
    datetime: "2025-08-16T10:30:00Z",
    status: "pending",
    createdAt: "2024-01-12T16:45:00Z",
  },
]

const STORAGE_KEY = "valia_bookings"

function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return mockBookings

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockBookings
}

function setStoredBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export function createMockBookingService(): BookingService {
  return {
    async list(): Promise<Booking[]> {
      return getStoredBookings()
    },

    async get(id: string): Promise<Booking | null> {
      const bookings = getStoredBookings()
      return bookings.find((b) => b.id === id) || null
    },

    async create(bookingData: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
      const bookings = getStoredBookings()

      const booking: Booking = {
        ...bookingData,
        id: `book_${Date.now()}`,
        createdAt: new Date().toISOString(),
      }

      bookings.push(booking)
      setStoredBookings(bookings)

      return booking
    },

    async update(id: string, updates: Partial<Booking>): Promise<Booking> {
      const bookings = getStoredBookings()
      const index = bookings.findIndex((b) => b.id === id)

      if (index === -1) {
        throw new Error(`Booking with id ${id} not found`)
      }

      const updatedBooking = {
        ...bookings[index],
        ...updates,
      }

      bookings[index] = updatedBooking
      setStoredBookings(bookings)

      return updatedBooking
    },

    async remove(id: string): Promise<void> {
      const bookings = getStoredBookings()
      const filtered = bookings.filter((b) => b.id !== id)
      setStoredBookings(filtered)
    },
  }
}
