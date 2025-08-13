"use client"

import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PropertyInquiryModal } from "@/components/property-inquiry-modal"
import { BookingModal } from "@/components/booking-modal"
import { Bed, Bath, Square, MapPin, Phone, MessageCircle, Mail, ArrowLeft, Share, Heart } from "lucide-react"
import Link from "next/link"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the property: ${property.title} (ID: ${property.id}). Can you provide more information?`
    const whatsappUrl = `https://wa.me/18098166766?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCall = () => {
    window.location.href = `tel:${property.agent.phone}`
  }

  const handleEmail = () => {
    window.location.href = `mailto:${property.agent.email}?subject=Inquiry about ${property.title}&body=Hi ${property.agent.name}, I'm interested in the property: ${property.title} (ID: ${property.id}). Can you provide more information?`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/properties">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`${property.type === "sale" ? "bg-primary" : "bg-secondary"} text-white`}>
                    For {property.type === "sale" ? "Sale" : "Rent"}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 text-secondary">
                    {property.category}
                  </Badge>
                </div>
              </div>

              {property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {property.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h1 className="font-serif text-3xl font-bold text-secondary mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>
                        {property.location.address}, {property.location.city}, {property.location.province}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(property.price, property.currency)}
                      {property.type === "rent" && <span className="text-lg font-normal">/month</span>}
                    </div>
                  </div>

                  <Separator />

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {property.bedrooms && (
                      <div className="text-center">
                        <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-secondary">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="text-center">
                        <Bath className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-secondary">{property.bathrooms}</div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                      </div>
                    )}
                    <div className="text-center">
                      <Square className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-secondary">{property.area}</div>
                      <div className="text-sm text-gray-600">m²</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-secondary mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  {/* Features */}
                  {property.features.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-secondary mb-3">Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <img
                    src={property.agent.photo || "/placeholder.svg?height=80&width=80&query=agent"}
                    alt={property.agent.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-secondary">{property.agent.name}</h3>
                    <p className="text-gray-600">Real Estate Agent</p>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleCall} className="w-full bg-primary hover:bg-primary-dark text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {property.agent.phone}
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      variant="outline"
                      className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={handleEmail}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Viewing */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-secondary mb-4">Schedule a Viewing</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Book a private viewing of this property at your convenience
                </p>
                <BookingModal property={property} />
              </CardContent>
            </Card>

            {/* Property Inquiry */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-secondary mb-4">Property Inquiry</h3>
                <p className="text-gray-600 text-sm mb-4">Get more information about this property</p>
                <PropertyInquiryModal property={property} />
              </CardContent>
            </Card>

            {/* Property Status */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-secondary mb-4">Property Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge
                      className={
                        property.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="text-secondary">{property.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="text-secondary">#{property.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
