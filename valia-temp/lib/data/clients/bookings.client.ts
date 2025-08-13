import type { Booking } from "../../types"
import { LocalStorageStore, STORAGE } from "../store"

export class BookingsClient {
  private static seedData: Booking[] | null = null

  private static async getSeedData(): Promise<Booking[]> {
    if (this.seedData) return this.seedData

    try {
      const response = await fetch("/data/bookings.json")
      this.seedData = await response.json()
      return this.seedData || []
    } catch {
      return []
    }
  }

  static async list(filters?: {
    from?: string
    to?: string
    status?: string
    page?: number
    pageSize?: number
  }): Promise<{ items: Booking[]; total: number; page: number; pageSize: number }> {
    let bookings = LocalStorageStore.get<Booking>(STORAGE.BOOKINGS)

    if (bookings.length === 0) {
      bookings = await this.getSeedData()
      LocalStorageStore.set(STORAGE.BOOKINGS, bookings)
    }

    let filtered = bookings

    if (filters) {
      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter((b) => b.status === filters.status)
      }
      if (filters.from) {
        filtered = filtered.filter((b) => new Date(b.datetime) >= new Date(filters.from!))
      }
      if (filters.to) {
        filtered = filtered.filter((b) => new Date(b.datetime) <= new Date(filters.to!))
      }
    }

    // Sort by datetime
    filtered.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())

    const page = filters?.page || 1
    const pageSize = filters?.pageSize || 20
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)

    return {
      items,
      total: filtered.length,
      page,
      pageSize,
    }
  }

  static async create(booking: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
    const bookings = LocalStorageStore.get<Booking>(STORAGE.BOOKINGS)
    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    bookings.push(newBooking)
    LocalStorageStore.set(STORAGE.BOOKINGS, bookings)
    return newBooking
  }

  static async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    const bookings = LocalStorageStore.get<Booking>(STORAGE.BOOKINGS)
    const index = bookings.findIndex((b) => b.id === id)

    if (index === -1) return null

    bookings[index] = { ...bookings[index], ...updates }
    LocalStorageStore.set(STORAGE.BOOKINGS, bookings)
    return bookings[index]
  }

  static async remove(id: string): Promise<boolean> {
    const bookings = LocalStorageStore.get<Booking>(STORAGE.BOOKINGS)
    const filtered = bookings.filter((b) => b.id !== id)

    if (filtered.length === bookings.length) return false

    LocalStorageStore.set(STORAGE.BOOKINGS, filtered)
    return true
  }
}
