import { PropertyFilters } from "@/components/property-filters"
import { PropertyGrid } from "@/components/property-grid"
import { Suspense } from "react"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">All Properties</h1>
          <p className="text-xl opacity-90">
            Discover your perfect home from our extensive collection of premium properties
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
            <Suspense fallback={<div>Loading properties...</div>}>
              <PropertyGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
