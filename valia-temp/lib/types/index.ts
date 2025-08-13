export type Operation = "venta" | "alquiler"
export type PropertyType = "apartamento" | "casa" | "villa" | "penthouse" | "oficina" | "local" | "nave" | "solar"
export type Status = "activa" | "reservada" | "vendida" | "pausada"
export type Currency = "USD" | "DOP"

export interface Agent {
  id: string
  slug: string
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  photoUrl?: string
  bio?: string
  licenseNumber?: string
  status: "active" | "inactive"
}

export interface Media {
  id: string
  url: string
  type: "image" | "video" | "tour"
  order?: number
}

export interface Property {
  id: string
  slug: string
  title: string
  description?: string
  operation: Operation
  propertyType: PropertyType
  status: Status
  price: number
  currency: Currency
  maintenanceFee?: number
  bedrooms?: number
  bathrooms?: number
  parking?: number
  areaBuilt?: number
  areaLot?: number
  floor?: number
  yearBuilt?: number
  furnished?: boolean
  amenities?: string[]
  city: string
  zone?: string
  address?: string
  agentId?: string
  media?: Media[]
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Inquiry {
  id: string
  propertyId: string
  name: string
  email: string
  phone?: string
  message?: string
  createdAt: string
}

export interface Booking {
  id: string
  propertyId: string
  name: string
  email: string
  phone?: string
  datetime: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface Settings {
  defaultCurrency: Currency
  timezone: string
  company: {
    phone: string
    address: string
  }
}

export interface KPIs {
  totalProperties: number
  activeAgents: number
  newInquiries: number
  scheduledViewings: number
  forSale: number
  monthlyRevenue: number
}
