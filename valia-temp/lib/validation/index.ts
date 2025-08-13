import { z } from "zod"

// Property validation schema
export const PropertySchema = z.object({
  title: z.string().min(1, "El título es requerido").max(200, "El título es muy largo"),
  description: z.string().optional(),
  operation: z.enum(["venta", "alquiler"], {
    required_error: "La operación es requerida",
  }),
  propertyType: z.enum(["apartamento", "casa", "villa", "penthouse", "oficina", "local", "nave", "solar"], {
    required_error: "El tipo de propiedad es requerido",
  }),
  status: z.enum(["activa", "reservada", "vendida", "pausada"]).default("activa"),
  price: z.number().min(1, "El precio debe ser mayor a 0"),
  currency: z.enum(["USD", "DOP"]).default("USD"),
  maintenanceFee: z.number().optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  parking: z.number().min(0).optional(),
  areaBuilt: z.number().min(0).optional(),
  areaLot: z.number().min(0).optional(),
  floor: z.number().min(0).optional(),
  yearBuilt: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 5)
    .optional(),
  furnished: z.boolean().optional(),
  amenities: z.array(z.string()).optional(),
  city: z.string().min(1, "La ciudad es requerida"),
  zone: z.string().optional(),
  address: z.string().optional(),
  agentId: z.string().optional(),
  featured: z.boolean().default(false),
})

export type PropertyFormData = z.infer<typeof PropertySchema>

// Agent validation schema
export const AgentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre es muy largo"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  photoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  bio: z.string().max(500, "La biografía es muy larga").optional(),
  licenseNumber: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
})

export type AgentFormData = z.infer<typeof AgentSchema>

// Inquiry validation schema
export const InquirySchema = z.object({
  propertyId: z.string().min(1, "La propiedad es requerida"),
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre es muy largo"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().max(1000, "El mensaje es muy largo").optional(),
})

export type InquiryFormData = z.infer<typeof InquirySchema>

// Booking validation schema
export const BookingSchema = z.object({
  propertyId: z.string().min(1, "La propiedad es requerida"),
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre es muy largo"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  datetime: z.string().min(1, "La fecha y hora son requeridas"),
  notes: z.string().max(500, "Las notas son muy largas").optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).default("pending"),
})

export type BookingFormData = z.infer<typeof BookingSchema>

// Contact form validation schema
export const ContactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre es muy largo"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "El asunto es requerido").max(200, "El asunto es muy largo"),
  message: z.string().min(1, "El mensaje es requerido").max(1000, "El mensaje es muy largo"),
  inquiryType: z.enum(["general", "property", "agent", "other"]).default("general"),
})

export type ContactFormData = z.infer<typeof ContactSchema>

// Settings validation schema
export const SettingsSchema = z.object({
  defaultCurrency: z.enum(["USD", "DOP"]).default("USD"),
  timezone: z.string().default("America/Santo_Domingo"),
  company: z.object({
    phone: z.string().min(1, "El teléfono de la empresa es requerido"),
    address: z.string().min(1, "La dirección de la empresa es requerida"),
  }),
})

export type SettingsFormData = z.infer<typeof SettingsSchema>

// Property filters validation schema
export const PropertyFiltersSchema = z.object({
  operation: z.string().default("all"),
  propertyType: z.string().default("all"),
  city: z.string().default(""),
  zone: z.string().default(""),
  minPrice: z.string().default(""),
  maxPrice: z.string().default(""),
  bedrooms: z.string().default("all"),
  bathrooms: z.string().default("all"),
  parking: z.string().default("all"),
  furnished: z.string().default("all"),
  status: z.string().default("all"),
  order: z.string().default("newest"),
  page: z.string().default("1"),
  pageSize: z.string().default("12"),
})

export type PropertyFiltersData = z.infer<typeof PropertyFiltersSchema>
