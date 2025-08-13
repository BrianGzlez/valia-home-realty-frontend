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
  specialties?: string[]
  experience?: number
  languages?: string[]
  properties?: string[]
  rating?: number
  reviews?: number
  createdAt?: string
  updatedAt?: string
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
  operation: Operation
  propertyType: PropertyType
  status: Status
  price: number
  currency: Currency
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
  lat?: number
  lng?: number
  agentId?: string
  media?: Media[]
  createdAt?: string
  updatedAt?: string
  featured?: boolean
  description?: string
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

export interface PropertyFilters {
  operation?: Operation
  propertyType?: PropertyType
  status?: Status
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  parking?: number
  minAreaBuilt?: number
  maxAreaBuilt?: number
  city?: string
  zone?: string
  furnished?: boolean
  amenities?: string[]
  featured?: boolean
}

export interface KPIs {
  totalProperties: number
  totalAgents: number
  totalInquiries: number
  totalBookings: number
  monthlyInquiries: number
  monthlyBookings: number
  averagePropertyPrice: number
  propertiesByStatus: Record<Status, number>
  propertiesByType: Record<PropertyType, number>
  inquiriesByMonth: Array<{ month: string; count: number }>
  bookingsByMonth: Array<{ month: string; count: number }>
}

export interface Settings {
  id: string
  companyName: string
  companyEmail: string
  companyPhone: string
  companyWhatsapp: string
  companyAddress: string
  websiteUrl: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  emailNotifications: boolean
  whatsappNotifications: boolean
  autoResponder: boolean
  maintenanceMode: boolean
  featuredPropertiesLimit: number
  propertiesPerPage: number
  currency: Currency
  language: string
  timezone: string
  updatedAt: string
}

export interface DataClient {
  properties: PropertyService
  agents: AgentService
  inquiries: InquiryService
  bookings: BookingService
}

export interface PropertyService {
  list(filters?: PropertyFilters): Promise<Property[]>
  get(id: string): Promise<Property | null>
  create(property: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property>
  update(id: string, updates: Partial<Property>): Promise<Property>
  remove(id: string): Promise<void>
}

export interface AgentService {
  list(): Promise<Agent[]>
  get(id: string): Promise<Agent | null>
  create(agent: Omit<Agent, "id" | "createdAt" | "updatedAt">): Promise<Agent>
  update(id: string, updates: Partial<Agent>): Promise<Agent>
  remove(id: string): Promise<void>
}

export interface InquiryService {
  list(): Promise<Inquiry[]>
  get(id: string): Promise<Inquiry | null>
  create(inquiry: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry>
  update(id: string, updates: Partial<Inquiry>): Promise<Inquiry>
  remove(id: string): Promise<void>
}

export interface BookingService {
  list(): Promise<Booking[]>
  get(id: string): Promise<Booking | null>
  create(booking: Omit<Booking, "id" | "createdAt">): Promise<Booking>
  update(id: string, updates: Partial<Booking>): Promise<Booking>
  remove(id: string): Promise<void>
}
