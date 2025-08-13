import type { Agent, Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import { Phone, MessageCircle, Mail, Star, Calendar, Award, Users, Home, ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"

interface AgentProfileProps {
  agent: Agent
  properties: Property[]
}

export function AgentProfile({ agent, properties }: AgentProfileProps) {
  const saleProperties = properties.filter((p) => p.type === "sale")
  const rentProperties = properties.filter((p) => p.type === "rent")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          {/* Agent Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Agent Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <img
                    src={agent.photo || "/placeholder.svg?height=120&width=120&query=professional agent"}
                    alt={agent.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />

                  <div>
                    <h1 className="font-serif text-2xl font-bold text-secondary">{agent.name}</h1>
                    <p className="text-gray-600">Real Estate Professional</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-secondary text-lg">{agent.rating}</span>
                    <span className="text-gray-600">({agent.reviews} reviews)</span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {agent.phone}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email {agent.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Professional Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-secondary">{agent.experience}</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Home className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-secondary">{properties.length}</div>
                    <div className="text-xs text-gray-600">Active Properties</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Star className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-secondary">{agent.rating}</div>
                    <div className="text-xs text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="font-semibold text-secondary">{agent.reviews}</div>
                    <div className="text-xs text-gray-600">Client Reviews</div>
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
                <div className="space-y-2">
                  {agent.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      <Globe className="h-3 w-3 mr-1" />
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">About {agent.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{agent.bio}</p>
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
                        {properties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="sale" className="mt-6">
                    {saleProperties.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No properties for sale at the moment.</div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {saleProperties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="rent" className="mt-6">
                    {rentProperties.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No properties for rent at the moment.</div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {rentProperties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-accent rounded-lg p-6 text-center">
                  <h3 className="font-serif text-lg font-semibold text-secondary mb-2">
                    Ready to work with {agent.name}?
                  </h3>
                  <p className="text-gray-600 mb-4">Contact our expert agent today to discuss your real estate needs</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-primary hover:bg-primary-dark text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
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
