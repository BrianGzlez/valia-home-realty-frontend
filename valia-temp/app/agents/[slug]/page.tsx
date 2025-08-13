"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { PropertyCard } from "../../../components/property-card"
import { WhatsAppButton } from "../../../components/ui/whatsapp-button"
import { AgentsClient, PropertiesClient } from "../../../lib/data"
import type { Agent, Property } from "../../../lib/types"

export default function AgentDetailPage() {
  const params = useParams()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgent = async () => {
      try {
        const slug = params.slug as string
        const agentData = await AgentsClient.get(slug)

        if (!agentData) {
          notFound()
          return
        }

        setAgent(agentData)

        // Load agent's properties
        const propertiesData = await PropertiesClient.list({ pageSize: 50 })
        const agentProperties = propertiesData.items.filter((p) => p.agentId === agentData.id)
        setProperties(agentProperties)
      } catch (error) {
        console.error("Error loading agent:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadAgent()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-valia-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valia-primary mx-auto mb-4"></div>
          <p className="text-valia-muted">Cargando agente...</p>
        </div>
      </div>
    )
  }

  if (!agent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-valia-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Profile */}
        <Card className="bg-valia-surface border-valia-border mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Image
                  src={agent.photoUrl || "/placeholder.svg?height=300&width=300"}
                  alt={agent.name}
                  width={300}
                  height={300}
                  className="w-full max-w-sm mx-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl font-serif font-bold text-valia-ink mb-2">{agent.name}</h1>
                {agent.licenseNumber && <p className="text-valia-muted mb-4">Licencia: {agent.licenseNumber}</p>}
                {agent.bio && <p className="text-valia-muted mb-6 leading-relaxed">{agent.bio}</p>}

                <div className="space-y-3 mb-6">
                  {agent.email && (
                    <div className="flex items-center space-x-3 text-valia-muted">
                      <Mail className="h-5 w-5" />
                      <span>{agent.email}</span>
                    </div>
                  )}
                  {agent.phone && (
                    <div className="flex items-center space-x-3 text-valia-muted">
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {agent.email && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
                    >
                      <a href={`mailto:${agent.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </a>
                    </Button>
                  )}
                  {agent.whatsapp && (
                    <WhatsAppButton
                      phone={agent.whatsapp}
                      message={`Hola ${agent.name}, me gustaría obtener información sobre sus propiedades disponibles.`}
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent's Properties */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-valia-ink mb-6">
            Propiedades de {agent.name} ({properties.length})
          </h2>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-valia-muted">Este agente no tiene propiedades asignadas actualmente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
