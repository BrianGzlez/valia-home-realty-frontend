"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"
import type { PropertyFilters as FilterType } from "@/lib/types"

interface PropertyFiltersProps {
  onFiltersChange?: (filters: FilterType) => void
}

export function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterType>({})
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [areaRange, setAreaRange] = useState([0, 500])

  const updateFilters = (newFilters: Partial<FilterType>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange?.(updated)
  }

  const clearFilters = () => {
    setFilters({})
    setPriceRange([0, 1000000])
    setAreaRange([0, 500])
    onFiltersChange?.({})
  }

  const activeFiltersCount = Object.keys(filters).filter((key) => filters[key as keyof FilterType]).length

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif">Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary-dark">
              <X className="h-4 w-4 mr-1" />
              Clear ({activeFiltersCount})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by location, title..."
              className="pl-10"
              onChange={(e) => updateFilters({ location: e.target.value || undefined })}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select
            value={filters.type || "all"}
            onValueChange={(value) => updateFilters({ type: value === "all" ? undefined : (value as "sale" | "rent") })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              updateFilters({
                category:
                  value === "all"
                    ? undefined
                    : (value as
                        | "apartamento"
                        | "casa"
                        | "villa"
                        | "penthouse"
                        | "oficina"
                        | "local"
                        | "nave"
                        | "solar"),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
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

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range (USD)</Label>
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              updateFilters({ minPrice: value[0], maxPrice: value[1] })
            }}
            max={1000000}
            step={10000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant={filters.bedrooms === num ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ bedrooms: filters.bedrooms === num ? undefined : num })}
                className={
                  filters.bedrooms === num
                    ? "bg-primary hover:bg-primary-dark"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }
              >
                {num}+
              </Button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label>Bathrooms</Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                variant={filters.bathrooms === num ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ bathrooms: filters.bathrooms === num ? undefined : num })}
                className={
                  filters.bathrooms === num
                    ? "bg-primary hover:bg-primary-dark"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }
              >
                {num}+
              </Button>
            ))}
          </div>
        </div>

        {/* Area Range */}
        <div className="space-y-3">
          <Label>Area (m²)</Label>
          <Slider
            value={areaRange}
            onValueChange={(value) => {
              setAreaRange(value)
              updateFilters({ minArea: value[0], maxArea: value[1] })
            }}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{areaRange[0]} m²</span>
            <span>{areaRange[1]} m²</span>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.type && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {filters.type === "sale" ? "For Sale" : "For Rent"}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ type: undefined })} />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {filters.category}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ category: undefined })} />
                </Badge>
              )}
              {filters.bedrooms && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {filters.bedrooms}+ beds
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ bedrooms: undefined })} />
                </Badge>
              )}
              {filters.bathrooms && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {filters.bathrooms}+ baths
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ bathrooms: undefined })} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
