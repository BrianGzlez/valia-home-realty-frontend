import type { Property, PropertyService, PropertyFilters } from "../../../types"

// Mock data with updated types
const mockProperties: Property[] = [
  {
    id: "1",
    slug: "luxury-villa-ocean-view-punta-cana",
    title: "Villa de Lujo con Vista al Océano",
    operation: "venta",
    propertyType: "villa",
    status: "activa",
    price: 850000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    areaBuilt: 350,
    areaLot: 500,
    furnished: true,
    amenities: ["Piscina", "Vista al Mar", "Jardín", "Seguridad 24/7"],
    city: "Punta Cana",
    zone: "Cap Cana",
    address: "Cap Cana Marina",
    lat: 18.5601,
    lng: -68.3725,
    agentId: "agent1",
    featured: true,
    description:
      "Espectacular villa de 4 habitaciones con vistas panorámicas al océano, piscina privada y amenidades modernas en exclusiva comunidad de Punta Cana.",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    slug: "modern-apartment-santo-domingo",
    title: "Apartamento Moderno en el Centro",
    operation: "alquiler",
    propertyType: "apartamento",
    status: "activa",
    price: 2500,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaBuilt: 120,
    furnished: false,
    amenities: ["Vista a la Ciudad", "Balcón", "Ascensor", "Seguridad"],
    city: "Santo Domingo",
    zone: "Zona Colonial",
    address: "Zona Colonial",
    lat: 18.4861,
    lng: -69.9312,
    agentId: "agent2",
    featured: false,
    description:
      "Contemporáneo apartamento de 2 habitaciones en el corazón de Santo Domingo con vistas a la ciudad y acabados premium.",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    slug: "beachfront-condo-bavaro",
    title: "Condominio Frente al Mar",
    operation: "venta",
    propertyType: "apartamento",
    status: "activa",
    price: 450000,
    currency: "USD",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    areaBuilt: 180,
    furnished: true,
    amenities: ["Acceso a Playa", "Piscina", "Gimnasio", "Concierge"],
    city: "Bávaro",
    zone: "Playa Bávaro",
    address: "Playa Bávaro",
    lat: 18.6813,
    lng: -68.409,
    agentId: "agent1",
    featured: true,
    description:
      "Espectacular condominio de 3 habitaciones frente al mar con acceso directo a la playa y amenidades tipo resort.",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
]

const STORAGE_KEY = "valia_properties"

function getStoredProperties(): Property[] {
  if (typeof window === "undefined") return mockProperties

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockProperties
}

function setStoredProperties(properties: Property[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
}

export function createMockPropertyService(): PropertyService {
  return {
    async list(filters?: PropertyFilters): Promise<Property[]> {
      const properties = getStoredProperties()

      if (!filters) return properties

      return properties.filter((property) => {
        if (filters.operation && property.operation !== filters.operation) return false
        if (filters.propertyType && property.propertyType !== filters.propertyType) return false
        if (filters.status && property.status !== filters.status) return false
        if (filters.minPrice && property.price < filters.minPrice) return false
        if (filters.maxPrice && property.price > filters.maxPrice) return false
        if (filters.bedrooms && (!property.bedrooms || property.bedrooms < filters.bedrooms)) return false
        if (filters.bathrooms && (!property.bathrooms || property.bathrooms < filters.bathrooms)) return false
        if (filters.city && !property.city.toLowerCase().includes(filters.city.toLowerCase())) return false
        if (filters.featured !== undefined && property.featured !== filters.featured) return false

        return true
      })
    },

    async get(id: string): Promise<Property | null> {
      const properties = getStoredProperties()
      return properties.find((p) => p.id === id) || null
    },

    async create(propertyData: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property> {
      const properties = getStoredProperties()
      const now = new Date().toISOString()

      const property: Property = {
        ...propertyData,
        id: `prop_${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      }

      properties.push(property)
      setStoredProperties(properties)

      return property
    },

    async update(id: string, updates: Partial<Property>): Promise<Property> {
      const properties = getStoredProperties()
      const index = properties.findIndex((p) => p.id === id)

      if (index === -1) {
        throw new Error(`Property with id ${id} not found`)
      }

      const updatedProperty = {
        ...properties[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      properties[index] = updatedProperty
      setStoredProperties(properties)

      return updatedProperty
    },

    async remove(id: string): Promise<void> {
      const properties = getStoredProperties()
      const filtered = properties.filter((p) => p.id !== id)
      setStoredProperties(filtered)
    },
  }
}
