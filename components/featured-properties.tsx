import { PropertyCard } from "@/components/property-card"
import { mockProperties } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedProperties() {
  const featuredProperties = mockProperties.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4"> Featured Properties </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/properties">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-3">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
