import type { Property } from "../../types"
import { LocalStorageStore, STORAGE } from "../store"

export class PropertiesClient {
  private static seedData: Property[] | null = null

  private static async getSeedData(): Promise<Property[]> {
    if (this.seedData) return this.seedData

    try {
      const response = await fetch("/data/properties.json")
      this.seedData = await response.json()
      return this.seedData || []
    } catch {
      return []
    }
  }

  static async list(filters?: {
    operation?: string
    propertyType?: string
    city?: string
    zone?: string
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    bathrooms?: number
    parking?: number
    furnished?: boolean
    amenities?: string[]
    status?: string
    order?: string
    page?: number
    pageSize?: number
  }): Promise<{ items: Property[]; total: number; page: number; pageSize: number }> {
    let properties = LocalStorageStore.get<Property>(STORAGE.PROPERTIES)

    if (properties.length === 0) {
      properties = await this.getSeedData()
      LocalStorageStore.set(STORAGE.PROPERTIES, properties)
    }

    // Apply filters
    let filtered = properties

    if (filters) {
      if (filters.operation && filters.operation !== "all") {
        filtered = filtered.filter((p) => p.operation === filters.operation)
      }
      if (filters.propertyType && filters.propertyType !== "all") {
        filtered = filtered.filter((p) => p.propertyType === filters.propertyType)
      }
      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter((p) => p.status === filters.status)
      }
      if (filters.city) {
        filtered = filtered.filter((p) => p.city.toLowerCase().includes(filters.city!.toLowerCase()))
      }
      if (filters.minPrice) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice!)
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
      }
      if (filters.bedrooms) {
        filtered = filtered.filter((p) => p.bedrooms === filters.bedrooms)
      }
      if (filters.bathrooms) {
        filtered = filtered.filter((p) => p.bathrooms === filters.bathrooms)
      }
    }

    const page = filters?.page || 1
    const pageSize = filters?.pageSize || 12
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)

    return {
      items,
      total: filtered.length,
      page,
      pageSize,
    }
  }

  static async get(slug: string): Promise<Property | null> {
    const properties = LocalStorageStore.get<Property>(STORAGE.PROPERTIES)
    return properties.find((p) => p.slug === slug) || null
  }

  static async create(property: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt">): Promise<Property> {
    const properties = LocalStorageStore.get<Property>(STORAGE.PROPERTIES)
    const newProperty: Property = {
      ...property,
      id: crypto.randomUUID(),
      slug: this.generateSlug(property.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    properties.push(newProperty)
    LocalStorageStore.set(STORAGE.PROPERTIES, properties)
    return newProperty
  }

  static async update(id: string, updates: Partial<Property>): Promise<Property | null> {
    const properties = LocalStorageStore.get<Property>(STORAGE.PROPERTIES)
    const index = properties.findIndex((p) => p.id === id)

    if (index === -1) return null

    properties[index] = {
      ...properties[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    LocalStorageStore.set(STORAGE.PROPERTIES, properties)
    return properties[index]
  }

  static async remove(id: string): Promise<boolean> {
    const properties = LocalStorageStore.get<Property>(STORAGE.PROPERTIES)
    const filtered = properties.filter((p) => p.id !== id)

    if (filtered.length === properties.length) return false

    LocalStorageStore.set(STORAGE.PROPERTIES, filtered)
    return true
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }
}
