import type { Property, PropertyService, PropertyFilters } from "../../../types"

export function createRestPropertyService(): PropertyService {
  return {
    async list(filters?: PropertyFilters): Promise<Property[]> {
      // TODO(back): Implement REST API call
      // const params = new URLSearchParams()
      // if (filters?.operation) params.append('operation', filters.operation)
      // if (filters?.propertyType) params.append('propertyType', filters.propertyType)
      // if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
      // if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      //
      // const response = await fetch(`/api/properties?${params}`)
      // if (!response.ok) throw new Error('Failed to fetch properties')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async get(id: string): Promise<Property | null> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/properties/${id}`)
      // if (response.status === 404) return null
      // if (!response.ok) throw new Error('Failed to fetch property')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async create(propertyData: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/properties', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(propertyData),
      // })
      // if (!response.ok) throw new Error('Failed to create property')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async update(id: string, updates: Partial<Property>): Promise<Property> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/properties/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // })
      // if (!response.ok) throw new Error('Failed to update property')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async remove(id: string): Promise<void> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/properties/${id}`, {
      //   method: 'DELETE',
      // })
      // if (!response.ok) throw new Error('Failed to delete property')

      throw new Error("REST API not implemented yet")
    },
  }
}
