"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MessageSquare, Phone, Mail } from "lucide-react"

// Extended mock inquiry data
const mockInquiries = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-809-555-0101",
    property: "Luxury Villa with Ocean View",
    propertyId: "1",
    type: "viewing",
    status: "new",
    message: "I'm interested in scheduling a viewing for this beautiful villa.",
    date: "2024-01-15",
    agent: "Maria Rodriguez",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+1-809-555-0102",
    property: "Modern Downtown Apartment",
    propertyId: "2",
    type: "info",
    status: "contacted",
    message: "Can you provide more information about the amenities and monthly fees?",
    date: "2024-01-14",
    agent: "Carlos Mendez",
  },
  {
    id: "3",
    name: "David Johnson",
    email: "david@example.com",
    phone: "+1-809-555-0103",
    property: "Beachfront Condo Paradise",
    propertyId: "3",
    type: "offer",
    status: "new",
    message: "I would like to make an offer on this property. Please contact me.",
    date: "2024-01-13",
    agent: "Maria Rodriguez",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1-809-555-0104",
    property: "Luxury Villa with Ocean View",
    propertyId: "1",
    type: "info",
    status: "scheduled",
    message: "Looking for investment properties in this area.",
    date: "2024-01-12",
    agent: "Maria Rodriguez",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1-809-555-0105",
    property: "Modern Downtown Apartment",
    propertyId: "2",
    type: "viewing",
    status: "closed",
    message: "Interested in renting this apartment for my family.",
    date: "2024-01-11",
    agent: "Carlos Mendez",
  },
]

export function InquiryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [inquiries] = useState(mockInquiries)

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.property.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesType = typeFilter === "all" || inquiry.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "viewing":
        return "bg-purple-100 text-purple-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Inquiries ({filteredInquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="viewing">Viewing</SelectItem>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-secondary text-lg">{inquiry.name}</h3>
                    <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    <Badge className={getTypeColor(inquiry.type)}>{inquiry.type}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Contact Information</p>
                      <p className="text-sm font-medium">{inquiry.email}</p>
                      <p className="text-sm font-medium">{inquiry.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Property & Agent</p>
                      <p className="text-sm font-medium">{inquiry.property}</p>
                      <p className="text-sm text-gray-600">Agent: {inquiry.agent}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Message</p>
                    <p className="text-sm text-gray-800">{inquiry.message}</p>
                  </div>

                  <p className="text-xs text-gray-500">Received: {inquiry.date}</p>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Client
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
