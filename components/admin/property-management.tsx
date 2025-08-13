"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockProperties } from "@/lib/mock-data"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export function PropertyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [properties] = useState(mockProperties)

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.province.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "rented":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="font-serif text-xl">Properties ({filteredProperties.length})</CardTitle>
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-secondary">Property</th>
                  <th className="text-left p-4 font-semibold text-secondary">Location</th>
                  <th className="text-left p-4 font-semibold text-secondary">Price</th>
                  <th className="text-left p-4 font-semibold text-secondary">Type</th>
                  <th className="text-left p-4 font-semibold text-secondary">Status</th>
                  <th className="text-left p-4 font-semibold text-secondary">Agent</th>
                  <th className="text-left p-4 font-semibold text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-secondary">{property.title}</h4>
                          <p className="text-sm text-gray-600">
                            {property.bedrooms}bed • {property.bathrooms}bath • {property.area}m²
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-secondary">{property.location.city}</p>
                        <p className="text-sm text-gray-600">{property.location.province}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-primary">{formatPrice(property.price, property.currency)}</p>
                      <p className="text-sm text-gray-600">{property.type === "rent" ? "/month" : ""}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {property.type} • {property.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={property.agent.photo || "/placeholder.svg?height=24&width=24&query=agent"}
                          alt={property.agent.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700">{property.agent.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
