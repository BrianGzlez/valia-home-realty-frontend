import type { Agent, Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import {
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Award,
  Users,
  Home,
  ArrowLeft,
  Globe,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

function digits(s?: string) {
  return (s || "").replace(/[^0-9]/g, "")
}

interface AgentProfileProps {
  agent: Agent
  properties: Property[]
}

export function AgentProfile({ agent, properties }: AgentProfileProps) {
  // Foto con fallbacks comunes
  const photo =
    (agent as any).photo ||
    (agent as any).photoUrl ||
    (agent as any).image ||
    (agent as any).imageUrl ||
    "/business-agent.png"

  // Datos base
  const yearsExp = (agent as any).experience ?? 0
  const languages = Array.isArray(agent.languages) ? agent.languages : []
  const specialties = Array.isArray(agent.specialties) ? agent.specialties : []

  // Filtros según tu mock: operation = 'venta' | 'alquiler'
  const saleProperties = properties.filter((p: any) => p.operation === "venta")
  const rentProperties = properties.filter((p: any) => p.operation === "alquiler")

  // Contacto
  const telHref = `tel:${digits(agent.phone)}`
  const waNumber = digits((agent as any).whatsapp || agent.phone)
  const waText = encodeURIComponent("Hola, me interesa asesoría inmobiliaria con Valía Home.")
  const waHref = `https://wa.me/${waNumber}?text=${waText}`
  const mailHref = `mailto:${agent.email || "info@valiahome.com"}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/agents">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agents
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lado izquierdo */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card principal del agente */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <img
                    src={photo}
                    alt={agent.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover bg-gray-100"
                    loading="lazy"
                  />

                  <div>
                    <h1 className="font-serif text-2xl font-bold text-primary">{agent.name}</h1>
                    <p className="text-gray-600">Real Estate Professional</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">Verified Agent</span>
                    </div>
                  </div>

                  {/* Botones de contacto */}
                  <div className="space-y-3">
                    <a href={telHref} className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Call {agent.phone}
                      </Button>
                    </a>

                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-valia-success text-valia-success hover:bg-valia-success hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>

                    <a href={mailHref} className="block">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email {agent.email}
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats (sin reviews) */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Professional Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-primary">{yearsExp}</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>

                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Home className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-primary">{properties.length}</div>
                    <div className="text-xs text-gray-600">Active Properties</div>
                  </div>

                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-primary">{languages.length}</div>
                    <div className="text-xs text-gray-600">Languages</div>
                  </div>

                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-primary">≤ 24h</div>
                    <div className="text-xs text-gray-600">Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                {specialties.length ? (
                  <div className="space-y-2">
                    {specialties.map((s, i) => (
                      <div key={i} className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        <span className="text-gray-700">{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No specialties listed.</p>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                {languages.length ? (
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                        <Globe className="h-3 w-3 mr-1" />
                        {l}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No languages listed.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">About {agent.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {agent.bio ||
                    "Experienced real estate professional in the Dominican Republic focused on client-first service and high-value opportunities."}
                </p>
              </CardContent>
            </Card>

            {/* Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
                    <TabsTrigger value="sale">For Sale ({saleProperties.length})</TabsTrigger>
                    <TabsTrigger value="rent">For Rent ({rentProperties.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    {properties.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No properties available at the moment.</div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {properties.map((p) => (
                          <PropertyCard key={p.id} property={p} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="sale" className="mt-6">
                    {saleProperties.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No properties for sale at the moment.</div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {saleProperties.map((p) => (
                          <PropertyCard key={p.id} property={p} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="rent" className="mt-6">
                    {rentProperties.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No properties for rent at the moment.</div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {rentProperties.map((p) => (
                          <PropertyCard key={p.id} property={p} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-accent rounded-lg p-6 text-center">
                  <h3 className="font-serif text-lg font-semibold text-secondary mb-2">
                    Ready to work with {agent.name}?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Contact our expert agent today to discuss your real estate needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={telHref}>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </a>
                    <a href={mailHref}>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </a>
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
