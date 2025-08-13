import type { Property } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PropertyInquiryModal } from "@/components/property-inquiry-modal"
import { Bed, Bath, Square, MapPin, Phone } from "lucide-react"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
  viewMode?: "grid" | "list"
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0)

  const formatArea = (area: number) =>
    `${new Intl.NumberFormat("es-DO", { maximumFractionDigits: 0 }).format(area || 0)} m²`

  const primaryImage = property.media?.[0]?.url || property.images?.[0] || "/diverse-property-showcase.png"
  const agentPhoto = property.agent?.photo || property.agent?.photoUrl || "/business-agent.png"
  const agentName = property.agent?.name || "Agent"

  const isForSale = property.operation === "venta" || property.type === "sale"
  const propertyCategory = (property.propertyType || property.category || "Property")
    .toString()
    .replace(/\b\w/g, (m) => m.toUpperCase())
  const propertyArea = property.areaBuilt || property.area || 0

  const Price = () => (
    <p className="text-2xl font-bold text-valia-primary">
      {formatPrice(property.price as number, property.currency as string)}
      {!isForSale && <span className="text-sm font-normal">/mes</span>}
    </p>
  )

  // ===== LIST VIEW =====
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="relative md:w-80 h-48 md:h-auto">
            <Link href={`/properties/${property.slug || property.id}`}>
              <img
                src={primaryImage || "/placeholder.svg"}
                alt={property.title}
                loading="lazy"
                className="w-full h-full object-cover cursor-pointer"
              />
            </Link>

            {/* Overlay para legibilidad */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent z-0" />

            {/* Estado: Venta/Alquiler */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white shadow ${
                  isForSale ? "bg-valia-primary" : "bg-valia-info"
                }`}
              >
                {isForSale ? "Venta" : "Alquiler"}
              </span>
            </div>

            {/* Categoría */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block rounded-full bg-valia-surface/90 text-valia-ink px-3 py-1 text-xs font-medium shadow ring-1 ring-black/10">
                {propertyCategory}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <CardContent className="flex-1 p-6">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Link href={`/properties/${property.slug || property.id}`}>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-valia-ink mb-2 hover:text-valia-primary transition-colors">
                    {property.title}
                  </h3>
                </Link>

                <div className="flex items-center text-valia-muted mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {property.city || property.location?.city}, {property.zone || property.location?.province}
                  </span>
                </div>

                <Price />

                <div className="mt-3 flex items-center gap-4 text-sm text-valia-muted">
                  {property.bedrooms ? (
                    <span className="flex items-center"><Bed className="h-4 w-4 mr-1" />{property.bedrooms} hab</span>
                  ) : null}
                  {property.bathrooms ? (
                    <span className="flex items-center"><Bath className="h-4 w-4 mr-1" />{property.bathrooms} baños</span>
                  ) : null}
                  <span className="flex items-center"><Square className="h-4 w-4 mr-1" />{formatArea(propertyArea)}</span>
                </div>

                <p className="mt-3 text-sm text-valia-muted line-clamp-2">{property.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={agentPhoto || "/placeholder.svg"} alt={agentName} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm text-valia-muted">{agentName}</span>
                </div>

                <PropertyInquiryModal
                  property={property}
                  trigger={
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contactar
                    </Button>
                  }
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  // ===== GRID VIEW =====
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Imagen */}
      <div className="relative">
        <Link href={`/properties/${property.slug || property.id}`}>
          <img
            src={primaryImage || "/placeholder.svg"}
            alt={property.title}
            loading="lazy"
            className="w-full h-64 object-cover cursor-pointer"
          />
        </Link>

        {/* Overlay para legibilidad */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent z-0" />

        {/* Estado: Venta/Alquiler */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white shadow ${
              isForSale ? "bg-valia-primary" : "bg-valia-info"
            }`}
          >
            {isForSale ? "Venta" : "Alquiler"}
          </span>
        </div>

        {/* Categoría */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-block rounded-full bg-valia-surface/90 text-valia-ink px-3 py-1 text-xs font-medium shadow ring-1 ring-black/10">
            {propertyCategory}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={`/properties/${property.slug || property.id}`}>
            <h3 className="font-serif text-xl font-semibold text-valia-ink mb-2 hover:text-valia-primary transition-colors">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center text-valia-muted mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.city || property.location?.city}, {property.zone || property.location?.province}
            </span>
          </div>

          <Price />
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-valia-muted">
          {property.bedrooms ? (
            <span className="flex items-center"><Bed className="h-4 w-4 mr-1" />{property.bedrooms} hab</span>
          ) : null}
          {property.bathrooms ? (
            <span className="flex items-center"><Bath className="h-4 w-4 mr-1" />{property.bathrooms} baños</span>
          ) : null}
          <span className="flex items-center"><Square className="h-4 w-4 mr-1" />{formatArea(propertyArea)}</span>
        </div>

        <p className="mb-4 text-sm text-valia-muted line-clamp-2">{property.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={agentPhoto || "/placeholder.svg"} alt={agentName} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm text-valia-muted">{agentName}</span>
          </div>

          <PropertyInquiryModal
            property={property}
            trigger={
              <Button
                size="sm"
                variant="outline"
                className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
              >
                <Phone className="h-4 w-4 mr-1" />
                Contactar
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
