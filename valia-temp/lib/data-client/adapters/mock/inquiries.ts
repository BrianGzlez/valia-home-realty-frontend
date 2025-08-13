import type { Inquiry, InquiryService } from "@/lib/types"

const mockInquiries: Inquiry[] = [
  {
    id: "1",
    propertyId: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+1-809-555-0101",
    message: "Estoy interesado en programar una visita para esta hermosa villa.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    propertyId: "2",
    name: "María García",
    email: "maria@example.com",
    phone: "+1-809-555-0102",
    message: "¿Pueden proporcionar más información sobre las amenidades y tarifas mensuales?",
    createdAt: "2024-01-14T14:20:00Z",
  },
]

const STORAGE_KEY = "valia_inquiries"

function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return mockInquiries

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockInquiries
}

function setStoredInquiries(inquiries: Inquiry[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
}

export function createMockInquiryService(): InquiryService {
  return {
    async list(): Promise<Inquiry[]> {
      return getStoredInquiries()
    },

    async get(id: string): Promise<Inquiry | null> {
      const inquiries = getStoredInquiries()
      return inquiries.find((i) => i.id === id) || null
    },

    async create(inquiryData: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> {
      const inquiries = getStoredInquiries()

      const inquiry: Inquiry = {
        ...inquiryData,
        id: `inq_${Date.now()}`,
        createdAt: new Date().toISOString(),
      }

      inquiries.push(inquiry)
      setStoredInquiries(inquiries)

      return inquiry
    },

    async update(id: string, updates: Partial<Inquiry>): Promise<Inquiry> {
      const inquiries = getStoredInquiries()
      const index = inquiries.findIndex((i) => i.id === id)

      if (index === -1) {
        throw new Error(`Inquiry with id ${id} not found`)
      }

      const updatedInquiry = {
        ...inquiries[index],
        ...updates,
      }

      inquiries[index] = updatedInquiry
      setStoredInquiries(inquiries)

      return updatedInquiry
    },

    async remove(id: string): Promise<void> {
      const inquiries = getStoredInquiries()
      const filtered = inquiries.filter((i) => i.id !== id)
      setStoredInquiries(filtered)
    },
  }
}
