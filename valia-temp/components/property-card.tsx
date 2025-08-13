import type { Property } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PropertyInquiryModal } from "@/components/property-inquiry-modal"
import { Bed, Bath, Square, MapPin, Phone } from "lucide-react"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
  viewMode?: "grid" | "list"
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const primaryImage = property.media?.[0]?.url || property.images?.[0] || "/diverse-property-showcase.png"
  const agentPhoto = property.agent?.photo || property.agent?.photoUrl || "/business-agent.png"
  const agentName = property.agent?.name || "Agent"

  const isForSale = property.operation === "venta" || property.type === "sale"
  const propertyCategory = property.propertyType || property.category || "property"
  const propertyArea = property.areaBuilt || property.area || 0

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-80 h-48 md:h-auto">
            <Link href={`/properties/${property.slug || property.id}`}>
              <img
                src={primaryImage || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="absolute top-4 left-4">
              <Badge className={`${isForSale ? "bg-valia-primary" : "bg-valia-info"} text-white`}>
                {isForSale ? "Venta" : "Alquiler"}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-valia-surface/90 text-valia-ink">
                {propertyCategory}
              </Badge>
            </div>
          </div>

          <CardContent className="flex-1 p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <Link href={`/properties/${property.slug || property.id}`}>
                  <h3 className="font-serif text-xl font-semibold text-valia-ink mb-2 hover:text-valia-primary cursor-pointer">
                    {property.title}
                  </h3>
                </Link>
                <div className="flex items-center text-valia-muted mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {property.city || property.location?.city}, {property.zone || property.location?.province}
                  </span>
                </div>
                <p className="text-2xl font-bold text-valia-primary mb-3">
                  {formatPrice(property.price, property.currency)}
                  {!isForSale && <span className="text-sm font-normal">/month</span>}
                </p>

                <div className="flex items-center gap-4 mb-3 text-sm text-valia-muted">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{propertyArea} m²</span>
                  </div>
                </div>

                <p className="text-valia-muted text-sm line-clamp-2">{property.description}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={agentPhoto || "/placeholder.svg"}
                    alt={agentName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
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
                      Contact
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/properties/${property.slug || property.id}`}>
          <img
            src={primaryImage || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
          />
        </Link>
        <div className="absolute top-4 left-4">
          <Badge className={`${isForSale ? "bg-valia-primary" : "bg-valia-info"} text-white`}>
            {isForSale ? "Venta" : "Alquiler"}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-valia-surface/90 text-valia-ink">
            {propertyCategory}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={`/properties/${property.slug || property.id}`}>
            <h3 className="font-serif text-xl font-semibold text-valia-ink mb-2 hover:text-valia-primary cursor-pointer">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center text-valia-muted mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.city || property.location?.city}, {property.zone || property.location?.province}
            </span>
          </div>
          <p className="text-2xl font-bold text-valia-primary">
            {formatPrice(property.price, property.currency)}
            {!isForSale && <span className="text-sm font-normal">/month</span>}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-valia-muted">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} bath</span>
            </div>
          )}
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{propertyArea} m²</span>
          </div>
        </div>

        <p className="text-valia-muted text-sm mb-4 line-clamp-2">{property.description}</p>

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
                Contact
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
