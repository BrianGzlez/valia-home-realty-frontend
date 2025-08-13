"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createDataClient } from "@/lib/data-client"
import type { Property } from "@/lib/types"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export function PropertyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const dataClient = createDataClient("mock")
        const propertyData = await dataClient.properties.list()
        setProperties(propertyData)
      } catch (error) {
        console.error("Error loading properties:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-valia-success/10 text-valia-success"
      case "pendiente":
        return "bg-valia-warning/10 text-valia-warning"
      case "vendida":
        return "bg-valia-info/10 text-valia-info"
      case "alquilada":
        return "bg-valia-primary/10 text-valia-primary"
      default:
        return "bg-valia-chip text-valia-ink"
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-valia-muted">Cargando propiedades...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="font-serif text-xl text-valia-ink">
              Propiedades ({filteredProperties.length})
            </CardTitle>
            <Button className="bg-valia-primary hover:bg-valia-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Propiedad
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-valia-muted" />
            <Input
              placeholder="Buscar propiedades..."
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
              <thead className="bg-valia-chip border-b border-valia-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-valia-ink">Propiedad</th>
                  <th className="text-left p-4 font-semibold text-valia-ink">Ubicación</th>
                  <th className="text-left p-4 font-semibold text-valia-ink">Precio</th>
                  <th className="text-left p-4 font-semibold text-valia-ink">Tipo</th>
                  <th className="text-left p-4 font-semibold text-valia-ink">Estado</th>
                  <th className="text-left p-4 font-semibold text-valia-ink">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="border-b border-valia-border hover:bg-valia-chip/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/diverse-property-showcase.png"
                          alt={property.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-valia-ink">{property.title}</h4>
                          <p className="text-sm text-valia-muted">
                            {property.bedrooms}hab • {property.bathrooms}baños • {property.areaBuilt}m²
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-valia-ink">{property.city}</p>
                        <p className="text-sm text-valia-muted">{property.zone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-valia-primary">
                        {formatPrice(property.price, property.currency)}
                      </p>
                      <p className="text-sm text-valia-muted">{property.operation === "alquiler" ? "/mes" : ""}</p>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-valia-primary/10 text-valia-primary">
                        {property.operation} • {property.propertyType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-valia-danger hover:text-valia-danger">
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

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-valia-muted mb-4">No se encontraron propiedades</div>
            <p className="text-valia-muted">Intenta ajustar tu búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
