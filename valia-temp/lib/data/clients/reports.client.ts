import type { KPIs } from "../../types"
import { PropertiesClient } from "./properties.client"
import { AgentsClient } from "./agents.client"
import { InquiriesClient } from "./inquiries.client"
import { BookingsClient } from "./bookings.client"

export class ReportsClient {
  static async getKPIs(period?: string): Promise<KPIs> {
    const [properties, agents, inquiries, bookings] = await Promise.all([
      PropertiesClient.list(),
      AgentsClient.list(),
      InquiriesClient.list(),
      BookingsClient.list(),
    ])

    const now = new Date()
    let startDate: Date

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case "this-week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "this-month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case "last-month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        break
      case "ytd":
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(0) // All time
    }

    const filteredInquiries = inquiries.items.filter((i) => new Date(i.createdAt) >= startDate)

    const filteredBookings = bookings.items.filter((b) => new Date(b.createdAt) >= startDate)

    const forSaleProperties = properties.items.filter((p) => p.operation === "venta" && p.status === "activa")

    const activeAgents = agents.filter((a) => a.status === "active")

    // Calculate monthly revenue (mock calculation)
    const monthlyRevenue = forSaleProperties.reduce((sum, p) => sum + p.price * 0.03, 0)

    return {
      totalProperties: properties.items.length,
      activeAgents: activeAgents.length,
      newInquiries: filteredInquiries.length,
      scheduledViewings: filteredBookings.length,
      forSale: forSaleProperties.length,
      monthlyRevenue,
    }
  }

  static async getChartData(period: string, metric: string): Promise<Array<{ label: string; value: number }>> {
    // Mock chart data - in real app this would be calculated from actual data
    const mockData = {
      leads: [
        { label: "Ene", value: 12 },
        { label: "Feb", value: 19 },
        { label: "Mar", value: 15 },
        { label: "Abr", value: 22 },
        { label: "May", value: 18 },
        { label: "Jun", value: 25 },
      ],
      bookings: [
        { label: "Ene", value: 8 },
        { label: "Feb", value: 12 },
        { label: "Mar", value: 10 },
        { label: "Abr", value: 15 },
        { label: "May", value: 11 },
        { label: "Jun", value: 18 },
      ],
      properties: [
        { label: "Ene", value: 45 },
        { label: "Feb", value: 48 },
        { label: "Mar", value: 52 },
        { label: "Abr", value: 55 },
        { label: "May", value: 58 },
        { label: "Jun", value: 62 },
      ],
      revenue: [
        { label: "Ene", value: 125000 },
        { label: "Feb", value: 145000 },
        { label: "Mar", value: 135000 },
        { label: "Abr", value: 165000 },
        { label: "May", value: 155000 },
        { label: "Jun", value: 185000 },
      ],
    }

    return mockData[metric as keyof typeof mockData] || []
  }
}
