"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createDataClient } from "@/lib/data-client"
import { Home, Users, MessageSquare, Calendar, TrendingUp, DollarSign } from "lucide-react"

export function AdminStats() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    saleProperties: 0,
    rentProperties: 0,
    totalAgents: 0,
    totalInquiries: 0,
    totalBookings: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      const dataClient = createDataClient("mock")

      const [properties, agents, inquiries, bookings] = await Promise.all([
        dataClient.properties.list(),
        dataClient.agents.list(),
        dataClient.inquiries.list(),
        dataClient.bookings.list(),
      ])

      const activeProperties = properties.filter((p) => p.status === "activa").length
      const saleProperties = properties.filter((p) => p.operation === "venta").length
      const rentProperties = properties.filter((p) => p.operation === "alquiler").length

      setStats({
        totalProperties: properties.length,
        activeProperties,
        saleProperties,
        rentProperties,
        totalAgents: agents.length,
        totalInquiries: inquiries.length,
        totalBookings: bookings.length,
      })
    }

    loadStats()
  }, [])

  const monthlyRevenue = 125000

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Home,
      description: `${stats.activeProperties} active`,
      color: "text-valia-info",
      bgColor: "bg-valia-info/10",
    },
    {
      title: "Active Agents",
      value: stats.totalAgents,
      icon: Users,
      description: "Professional agents",
      color: "text-valia-success",
      bgColor: "bg-valia-success/10",
    },
    {
      title: "New Inquiries",
      value: stats.totalInquiries,
      icon: MessageSquare,
      description: "This month",
      color: "text-valia-warning",
      bgColor: "bg-valia-warning/10",
    },
    {
      title: "Scheduled Viewings",
      value: stats.totalBookings,
      icon: Calendar,
      description: "This month",
      color: "text-valia-primary",
      bgColor: "bg-valia-primary/10",
    },
    {
      title: "Properties for Sale",
      value: stats.saleProperties,
      icon: TrendingUp,
      description: "Active listings",
      color: "text-valia-primary",
      bgColor: "bg-valia-primary/10",
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "This month",
      color: "text-valia-success",
      bgColor: "bg-valia-success/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-valia-muted">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-valia-ink">{stat.value}</div>
            <p className="text-xs text-valia-muted mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
