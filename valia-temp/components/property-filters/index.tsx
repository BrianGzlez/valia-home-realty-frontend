"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"

interface PropertyFiltersProps {
  filters: {
    operation: string
    propertyType: string
    city: string
    minPrice: string
    maxPrice: string
    bedrooms: string
    bathrooms: string
    status: string
  }
  onFiltersChange: (filters: PropertyFiltersProps["filters"]) => void
}

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      operation: "all",
      propertyType: "all",
      city: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "all",
      bathrooms: "all",
      status: "all",
    })
  }

  return (
    <Card className="bg-valia-surface border-valia-border">
      <CardHeader>
        <CardTitle className="text-valia-ink">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Operation */}
        <div>
          <Label htmlFor="operation" className="text-valia-ink">
            Operación
          </Label>
          <Select value={filters.operation} onValueChange={(value) => handleFilterChange("operation", value)}>
            <SelectTrigger className="border-valia-border focus:ring-valia-primary">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="venta">Venta</SelectItem>
              <SelectItem value="alquiler">Alquiler</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <Label htmlFor="propertyType" className="text-valia-ink">
            Tipo de Propiedad
          </Label>
          <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
            <SelectTrigger className="border-valia-border focus:ring-valia-primary">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="nave">Nave</SelectItem>
              <SelectItem value="solar">Solar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" className="text-valia-ink">
            Ciudad
          </Label>
          <Input
            id="city"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            placeholder="Buscar por ciudad..."
            className="border-valia-border focus:ring-valia-primary"
          />
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-valia-ink">Rango de Precio</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Mín"
              type="number"
              className="border-valia-border focus:ring-valia-primary"
            />
            <Input
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Máx"
              type="number"
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label htmlFor="bedrooms" className="text-valia-ink">
            Habitaciones
          </Label>
          <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
            <SelectTrigger className="border-valia-border focus:ring-valia-primary">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label htmlFor="bathrooms" className="text-valia-ink">
            Baños
          </Label>
          <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange("bathrooms", value)}>
            <SelectTrigger className="border-valia-border focus:ring-valia-primary">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="text-valia-ink">
            Estado
          </Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="border-valia-border focus:ring-valia-primary">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="activa">Activa</SelectItem>
              <SelectItem value="reservada">Reservada</SelectItem>
              <SelectItem value="vendida">Vendida</SelectItem>
              <SelectItem value="pausada">Pausada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full border-valia-border text-valia-muted hover:bg-valia-chip bg-transparent"
        >
          Limpiar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}
