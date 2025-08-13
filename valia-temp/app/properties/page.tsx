import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Suspense } from "react"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <section className="bg-valia-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Todas las Propiedades</h1>
          <p className="text-xl opacity-90">
            Descubre tu hogar perfecto en nuestra extensa colección de propiedades premium
          </p>
        </div>
      </section>

      {/* Filters and Properties */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <PropertyFilters />
          </aside>

          {/* Properties Grid */}
          <main className="lg:w-3/4">
            <Suspense fallback={<div className="text-valia-ink">Cargando propiedades...</div>}>
              <PropertyGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
