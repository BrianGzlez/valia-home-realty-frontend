"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import {
  Bed,
  Bath,
  Car,
  Square,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Wifi,
  ParkingMeterIcon as ParkingIcon,
  Shield,
  Waves,
  Trees,
  Dumbbell,
  Users,
  Utensils,
  Wind,
  Sun,
  Home,
  ArrowLeft,
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { BadgeStatus } from "../../../components/ui/badge-status"
import { BookingModal } from "../../../components/booking-modal"
import { PropertiesClient, AgentsClient } from "../../../lib/data"
import type { Property, Agent } from "../../../lib/types"
import Link from "next/link"

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  internet: Wifi,
  parking: ParkingIcon,
  parqueo: ParkingIcon,
  seguridad: Shield,
  security: Shield,
  piscina: Waves,
  pool: Waves,
  jardin: Trees,
  garden: Trees,
  gimnasio: Dumbbell,
  gym: Dumbbell,
  salon: Users,
  social: Users,
  cocina: Utensils,
  kitchen: Utensils,
  aire: Wind,
  ac: Wind,
  balcon: Sun,
  balcony: Sun,
  terraza: Sun,
  terrace: Sun,
}

const getAmenityIcon = (amenity: string) => {
  const key = amenity.toLowerCase()
  for (const [iconKey, IconComponent] of Object.entries(amenityIcons)) {
    if (key.includes(iconKey)) {
      return IconComponent
    }
  }
  return Home // Default icon
}

export default function PropertyDetailPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const slug = params.slug as string
        const propertyData = await PropertiesClient.get(slug)

        if (!propertyData) {
          notFound()
          return
        }

        setProperty(propertyData)

        if (propertyData.agentId) {
          const agents = await AgentsClient.list()
          const agentData = agents.find((a) => a.id === propertyData.agentId)
          setAgent(agentData || null)
        }
      } catch (error) {
        console.error("Error loading property:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-valia-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valia-primary mx-auto mb-4"></div>
          <p className="text-valia-muted">Cargando propiedad...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "DOP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const images = property.media?.map((m) => m.url) || ["/placeholder.svg?height=600&width=800"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleWhatsApp = () => {
    const phone = agent?.whatsapp || agent?.phone || "18098166766"
    const message = `Hola! Me interesa la propiedad: ${property.title}. ¿Podrías darme más información?`
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCall = () => {
    const phone = agent?.phone || "18098166766"
    window.location.href = `tel:${phone}`
  }

  const handleEmail = () => {
    const email = agent?.email || "info@valiahome.com"
    const subject = `Consulta sobre ${property.title}`
    const body = `Hola ${agent?.name || "Agente"},\n\nMe interesa la propiedad: ${property.title}\n\n¿Podrías proporcionarme más información?\n\nGracias.`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="min-h-screen bg-valia-bg">
      <div className="bg-valia-surface border-b border-valia-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/properties">
            <Button variant="ghost" className="text-valia-ink hover:text-valia-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Propiedades
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative">
                <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <BadgeStatus status={property.status} />
                  </div>
                </div>

                {/* Thumbnail navigation */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-valia-primary"
                            : "border-valia-border hover:border-valia-primary/50"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Property Info */}
            <Card className="bg-valia-surface border-valia-border mb-8">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h1 className="font-serif text-4xl font-bold text-valia-ink mb-4">{property.title}</h1>
                  <div className="flex items-center space-x-2 text-valia-muted mb-4">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">
                      {property.zone}, {property.city}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-valia-primary mb-2">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  {property.operation === "alquiler" && <span className="text-valia-muted text-lg">/mes</span>}
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-valia-bg rounded-lg">
                  {property.bedrooms && (
                    <div className="text-center">
                      <Bed className="h-8 w-8 text-valia-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-valia-ink">{property.bedrooms}</div>
                      <div className="text-sm text-valia-muted">Habitaciones</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <Bath className="h-8 w-8 text-valia-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-valia-ink">{property.bathrooms}</div>
                      <div className="text-sm text-valia-muted">Baños</div>
                    </div>
                  )}
                  {property.parking && (
                    <div className="text-center">
                      <Car className="h-8 w-8 text-valia-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-valia-ink">{property.parking}</div>
                      <div className="text-sm text-valia-muted">Parqueos</div>
                    </div>
                  )}
                  {property.areaBuilt && (
                    <div className="text-center">
                      <Square className="h-8 w-8 text-valia-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-valia-ink">{property.areaBuilt}</div>
                      <div className="text-sm text-valia-muted">m² construidos</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {property.description && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-valia-ink mb-4">Descripción</h3>
                    <p className="text-valia-muted leading-relaxed text-lg">{property.description}</p>
                  </div>
                )}

                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-valia-ink mb-4">Comodidades</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => {
                        const IconComponent = getAmenityIcon(amenity)
                        return (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-valia-bg rounded-lg">
                            <IconComponent className="h-5 w-5 text-valia-primary flex-shrink-0" />
                            <span className="text-valia-ink">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {agent?.bio && (
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-valia-ink mb-4">Observaciones del Agente</h3>
                    <div className="bg-valia-bg p-6 rounded-lg border-l-4 border-valia-primary">
                      <p className="text-valia-muted leading-relaxed italic">"{agent.bio}"</p>
                      {agent.name && <p className="text-valia-ink font-semibold mt-3">- {agent.name}</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {agent && (
              <Card className="bg-valia-surface border-valia-border mb-6 sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-valia-ink mb-6">Contactar Agente</h3>

                  <div className="text-center mb-6">
                    <Image
                      src={agent.photoUrl || "/placeholder.svg?height=100&width=100"}
                      alt={agent.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto mb-4 object-cover"
                    />
                    <div className="font-semibold text-valia-ink text-lg">{agent.name}</div>
                    {agent.licenseNumber && <div className="text-sm text-valia-muted">Lic. {agent.licenseNumber}</div>}
                    {agent.specialties && agent.specialties.length > 0 && (
                      <div className="text-sm text-valia-primary mt-1">{agent.specialties.join(", ")}</div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleCall}
                      className="w-full bg-valia-primary hover:bg-valia-primary-600 text-white"
                      size="lg"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Llamar Ahora
                    </Button>

                    <Button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      onClick={handleEmail}
                      variant="outline"
                      className="w-full border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
                      size="lg"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Enviar Email
                    </Button>

                    <Button
                      onClick={() => setShowBookingModal(true)}
                      variant="outline"
                      className="w-full border-valia-border text-valia-ink hover:bg-valia-chip"
                      size="lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Agendar Visita
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card className="bg-valia-surface border-valia-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-valia-ink mb-4">Detalles de la Propiedad</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-valia-border">
                    <span className="text-valia-muted">Tipo:</span>
                    <span className="text-valia-ink font-medium capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-valia-border">
                    <span className="text-valia-muted">Operación:</span>
                    <span className="text-valia-ink font-medium capitalize">{property.operation}</span>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex justify-between py-2 border-b border-valia-border">
                      <span className="text-valia-muted">Año de construcción:</span>
                      <span className="text-valia-ink font-medium">{property.yearBuilt}</span>
                    </div>
                  )}
                  {property.floor && (
                    <div className="flex justify-between py-2 border-b border-valia-border">
                      <span className="text-valia-muted">Piso:</span>
                      <span className="text-valia-ink font-medium">{property.floor}</span>
                    </div>
                  )}
                  {property.furnished !== undefined && (
                    <div className="flex justify-between py-2 border-b border-valia-border">
                      <span className="text-valia-muted">Amueblado:</span>
                      <span className="text-valia-ink font-medium">{property.furnished ? "Sí" : "No"}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-valia-muted">ID de propiedad:</span>
                    <span className="text-valia-ink font-medium">#{property.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          property={property}
          agent={agent}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false)
            // Show success message
          }}
        />
      )}
    </div>
  )
}
