"use client"

import { PropertyCard } from "../property-card"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Property, Agent } from "../../lib/types"

interface PropertyGridProps {
  properties: Property[]
  agents: Agent[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PropertyGrid({
  properties,
  agents,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}: PropertyGridProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-valia-chip animate-pulse rounded-lg h-96"></div>
          ))}
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-valia-muted text-lg mb-4">No se encontraron propiedades</div>
        <p className="text-valia-muted">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-valia-muted">
          Mostrando {properties.length} propiedades (Página {currentPage} de {totalPages})
        </p>
      </div>

      {/* Properties grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => {
          const agent = agents.find((a) => a.id === property.agentId)
          return <PropertyCard key={property.id} property={property} agent={agent} />
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-valia-border text-valia-ink hover:bg-valia-chip"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1
            if (page === currentPage) {
              return (
                <Button key={page} size="sm" className="bg-valia-primary hover:bg-valia-primary-600 text-white">
                  {page}
                </Button>
              )
            }
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="border-valia-border text-valia-ink hover:bg-valia-chip"
                >
                  {page}
                </Button>
              )
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="text-valia-muted">
                  ...
                </span>
              )
            }
            return null
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-valia-border text-valia-ink hover:bg-valia-chip"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
