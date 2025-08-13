"use client"

import { useState, useMemo } from "react"
import { PropertyCard } from "@/components/property-card"
import { mockProperties } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import type { PropertyFilters } from "@/lib/types"

export function PropertyGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState<PropertyFilters>({})

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = mockProperties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false
      if (filters.category && property.category !== filters.category) return false
      if (filters.minPrice && property.price < filters.minPrice) return false
      if (filters.maxPrice && property.price > filters.maxPrice) return false
      if (filters.bedrooms && (!property.bedrooms || property.bedrooms < filters.bedrooms)) return false
      if (filters.bathrooms && (!property.bathrooms || property.bathrooms < filters.bathrooms)) return false
      if (filters.minArea && property.area < filters.minArea) return false
      if (filters.maxArea && property.area > filters.maxArea) return false
      if (
        filters.location &&
        !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) &&
        !property.location.province.toLowerCase().includes(filters.location.toLowerCase()) &&
        !property.title.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false

      return true
    })

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "area-large":
        filtered.sort((a, b) => b.area - a.area)
        break
      case "area-small":
        filtered.sort((a, b) => a.area - b.area)
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-secondary">
            {filteredAndSortedProperties.length} Properties Found
          </h2>
          <p className="text-sm text-gray-600">Showing all available properties</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="area-large">Area: Large to Small</SelectItem>
              <SelectItem value="area-small">Area: Small to Large</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary hover:bg-primary-dark" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary hover:bg-primary-dark" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredAndSortedProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <SlidersHorizontal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredAndSortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
