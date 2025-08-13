import type { Inquiry, InquiryService } from "../../../types"

export function createRestInquiryService(): InquiryService {
  return {
    async list(): Promise<Inquiry[]> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/inquiries')
      // if (!response.ok) throw new Error('Failed to fetch inquiries')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async get(id: string): Promise<Inquiry | null> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/inquiries/${id}`)
      // if (response.status === 404) return null
      // if (!response.ok) throw new Error('Failed to fetch inquiry')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async create(inquiryData: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/inquiries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(inquiryData),
      // })
      // if (!response.ok) throw new Error('Failed to create inquiry')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async update(id: string, updates: Partial<Inquiry>): Promise<Inquiry> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/inquiries/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // })
      // if (!response.ok) throw new Error('Failed to update inquiry')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async remove(id: string): Promise<void> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/inquiries/${id}`, {
      //   method: 'DELETE',
      // })
      // if (!response.ok) throw new Error('Failed to delete inquiry')

      throw new Error("REST API not implemented yet")
    },
  }
}
