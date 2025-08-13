"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, Calendar, TrendingUp, Users, Home } from "lucide-react"

export function ReportsManagement() {
  const [period, setPeriod] = useState("this-month")
  const [metric, setMetric] = useState("leads")

  const reportData = {
    leads: { value: 47, change: "+12%", color: "text-valia-info" },
    bookings: { value: 23, change: "+8%", color: "text-valia-warning" },
    properties: { value: 156, change: "+3%", color: "text-valia-primary" },
    revenue: { value: "$125,000", change: "+15%", color: "text-valia-success" },
  }

  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-valia-ink">Period</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-valia-ink">Metric</label>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-valia-primary hover:bg-valia-primary-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-valia-muted">Total Leads</p>
                <p className="text-2xl font-bold text-valia-ink">{reportData.leads.value}</p>
                <p className={`text-sm ${reportData.leads.color}`}>{reportData.leads.change} from last period</p>
              </div>
              <Users className="h-8 w-8 text-valia-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-valia-muted">Bookings</p>
                <p className="text-2xl font-bold text-valia-ink">{reportData.bookings.value}</p>
                <p className={`text-sm ${reportData.bookings.color}`}>{reportData.bookings.change} from last period</p>
              </div>
              <Calendar className="h-8 w-8 text-valia-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-valia-muted">Properties</p>
                <p className="text-2xl font-bold text-valia-ink">{reportData.properties.value}</p>
                <p className={`text-sm ${reportData.properties.color}`}>
                  {reportData.properties.change} from last period
                </p>
              </div>
              <Home className="h-8 w-8 text-valia-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-valia-muted">Revenue</p>
                <p className="text-2xl font-bold text-valia-ink">{reportData.revenue.value}</p>
                <p className={`text-sm ${reportData.revenue.color}`}>{reportData.revenue.change} from last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-valia-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-valia-chip rounded-lg flex items-center justify-center">
            <div className="text-center text-valia-muted">
              <BarChart3 className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-semibold">Chart Visualization</p>
              <p className="text-sm">Performance data for {period}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
