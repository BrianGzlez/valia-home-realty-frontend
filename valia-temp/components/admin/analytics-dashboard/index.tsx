"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { TrendingUp, TrendingDown, Users, Home, MessageSquare, Calendar, DollarSign, Eye } from "lucide-react"
import { propertiesClient } from "../../../lib/data/clients"
import { agentsClient } from "../../../lib/data/clients"
import { inquiriesClient } from "../../../lib/data/clients"

interface AnalyticsData {
  totalViews: number
  totalInquiries: number
  totalBookings: number
  conversionRate: number
  avgPropertyPrice: number
  topPerformingAgent: string
  monthlyTrends: Array<{ month: string; inquiries: number; bookings: number }>
  propertyTypeDistribution: Array<{ type: string; count: number; percentage: number }>
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateAnalytics = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const properties = await propertiesClient.getAll()
      const agents = await agentsClient.getAll()
      const inquiries = await inquiriesClient.getAll()

      const mockAnalytics: AnalyticsData = {
        totalViews: Math.floor(Math.random() * 10000) + 5000,
        totalInquiries: inquiries.length,
        totalBookings: Math.floor(inquiries.length * 0.3),
        conversionRate: Math.random() * 15 + 5,
        avgPropertyPrice: properties.reduce((sum, p) => sum + p.price, 0) / properties.length,
        topPerformingAgent: agents[0]?.name || "N/A",
        monthlyTrends: [
          { month: "Ene", inquiries: 45, bookings: 12 },
          { month: "Feb", inquiries: 52, bookings: 18 },
          { month: "Mar", inquiries: 38, bookings: 15 },
          { month: "Abr", inquiries: 61, bookings: 22 },
          { month: "May", inquiries: 55, bookings: 19 },
          { month: "Jun", inquiries: 67, bookings: 25 },
        ],
        propertyTypeDistribution: [
          { type: "Apartamento", count: 45, percentage: 35 },
          { type: "Casa", count: 38, percentage: 30 },
          { type: "Villa", count: 25, percentage: 20 },
          { type: "Penthouse", count: 19, percentage: 15 },
        ],
      }

      setAnalytics(mockAnalytics)
      setLoading(false)
    }

    generateAnalytics()
  }, [timeRange])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-valia-chip rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-valia-chip rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-valia-ink">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? "bg-valia-primary text-white" : ""}
            >
              {range === "7d" ? "7 días" : range === "30d" ? "30 días" : "90 días"}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Vistas Totales</p>
                <p className="text-3xl font-bold text-blue-900">{analytics.totalViews.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Consultas</p>
                <p className="text-3xl font-bold text-green-900">{analytics.totalInquiries}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Citas Agendadas</p>
                <p className="text-3xl font-bold text-purple-900">{analytics.totalBookings}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.3%</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Tasa de Conversión</p>
                <p className="text-3xl font-bold text-orange-900">{analytics.conversionRate.toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-valia-ink">Tendencias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((trend, index) => (
                <div key={trend.month} className="flex items-center justify-between p-3 bg-valia-bg rounded-lg">
                  <span className="font-medium text-valia-ink">{trend.month}</span>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-valia-muted">Consultas</p>
                      <p className="font-semibold text-valia-primary">{trend.inquiries}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-valia-muted">Citas</p>
                      <p className="font-semibold text-valia-success">{trend.bookings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-valia-ink">Distribución por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.propertyTypeDistribution.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-valia-ink">{item.type}</span>
                    <span className="text-sm text-valia-muted">{item.count} propiedades</span>
                  </div>
                  <div className="w-full bg-valia-chip rounded-full h-2">
                    <div
                      className="bg-valia-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-valia-primary">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-valia-ink">Métricas Destacadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-valia-bg rounded-lg">
              <DollarSign className="h-8 w-8 text-valia-primary mx-auto mb-2" />
              <p className="text-sm text-valia-muted">Precio Promedio</p>
              <p className="text-2xl font-bold text-valia-ink">
                ${analytics.avgPropertyPrice.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-center p-4 bg-valia-bg rounded-lg">
              <Users className="h-8 w-8 text-valia-primary mx-auto mb-2" />
              <p className="text-sm text-valia-muted">Agente Top</p>
              <p className="text-lg font-semibold text-valia-ink">{analytics.topPerformingAgent}</p>
              <Badge className="mt-1 bg-valia-success text-white">⭐ Mejor del mes</Badge>
            </div>
            <div className="text-center p-4 bg-valia-bg rounded-lg">
              <Home className="h-8 w-8 text-valia-primary mx-auto mb-2" />
              <p className="text-sm text-valia-muted">Propiedades Activas</p>
              <p className="text-2xl font-bold text-valia-ink">127</p>
              <p className="text-sm text-valia-success">+5 esta semana</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
