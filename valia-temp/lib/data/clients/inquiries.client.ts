import type { Inquiry } from "../../types"
import { LocalStorageStore, STORAGE } from "../store"

export class InquiriesClient {
  private static seedData: Inquiry[] | null = null

  private static async getSeedData(): Promise<Inquiry[]> {
    if (this.seedData) return this.seedData

    try {
      const response = await fetch("/data/inquiries.json")
      this.seedData = await response.json()
      return this.seedData || []
    } catch {
      return []
    }
  }

  static async list(filters?: {
    propertyId?: string
    page?: number
    pageSize?: number
  }): Promise<{ items: Inquiry[]; total: number; page: number; pageSize: number }> {
    let inquiries = LocalStorageStore.get<Inquiry>(STORAGE.INQUIRIES)

    if (inquiries.length === 0) {
      inquiries = await this.getSeedData()
      LocalStorageStore.set(STORAGE.INQUIRIES, inquiries)
    }

    let filtered = inquiries

    if (filters?.propertyId) {
      filtered = filtered.filter((i) => i.propertyId === filters.propertyId)
    }

    // Sort by most recent
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

  static async create(inquiry: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> {
    const inquiries = LocalStorageStore.get<Inquiry>(STORAGE.INQUIRIES)
    const newInquiry: Inquiry = {
      ...inquiry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    inquiries.push(newInquiry)
    LocalStorageStore.set(STORAGE.INQUIRIES, inquiries)
    return newInquiry
  }

  static async remove(id: string): Promise<boolean> {
    const inquiries = LocalStorageStore.get<Inquiry>(STORAGE.INQUIRIES)
    const filtered = inquiries.filter((i) => i.id !== id)

    if (filtered.length === inquiries.length) return false

    LocalStorageStore.set(STORAGE.INQUIRIES, filtered)
    return true
  }
}
