import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Car, Square } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { BadgeStatus } from "../ui/badge-status"
import { WhatsAppButton } from "../ui/whatsapp-button"
import type { Property, Agent } from "../../lib/types"

interface PropertyCardProps {
  property: Property
  agent?: Agent
}

export function PropertyCard({ property, agent }: PropertyCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "DOP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const mainImage = property.media?.[0]?.url || "/placeholder.svg?height=300&width=400"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-valia-surface border-valia-border">
      <div className="relative">
        <Link href={`/properties/${property.slug}`}>
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <BadgeStatus status={property.status} />
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-valia-primary text-white px-2 py-1 rounded text-sm font-medium">
            {property.operation === "venta" ? "Venta" : "Alquiler"}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-valia-ink text-lg mb-1">
            <Link href={`/properties/${property.slug}`} className="hover:text-valia-primary transition-colors">
              {property.title}
            </Link>
          </h3>
          <p className="text-valia-muted text-sm">
            {property.zone}, {property.city}
          </p>
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-valia-primary">{formatPrice(property.price, property.currency)}</div>
          {property.operation === "alquiler" && <span className="text-valia-muted text-sm">/mes</span>}
        </div>

        <div className="flex items-center space-x-4 text-valia-muted text-sm mb-4">
          {property.bedrooms && (
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.parking && (
            <div className="flex items-center space-x-1">
              <Car className="h-4 w-4" />
              <span>{property.parking}</span>
            </div>
          )}
          {property.areaBuilt && (
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{property.areaBuilt}m²</span>
            </div>
          )}
        </div>

        {agent?.whatsapp && (
          <WhatsAppButton
            phone={agent.whatsapp}
            message={`Hola, me interesa la propiedad: ${property.title}`}
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}
