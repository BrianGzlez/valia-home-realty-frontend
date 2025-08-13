"use client"

import { useEffect, useState } from "react"
import { PropertyCard } from "../property-card"
import { PropertiesClient, AgentsClient } from "../../lib/data"
import type { Property, Agent } from "../../lib/types"

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propertiesData, agentsData] = await Promise.all([
          PropertiesClient.list({ pageSize: 6 }),
          AgentsClient.list(),
        ])

        const featuredProperties = propertiesData.items.filter((p) => p.featured)
        setProperties(featuredProperties)
        setAgents(agentsData)
      } catch (error) {
        console.error("Error loading featured properties:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-valia-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-valia-ink">Propiedades Destacadas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-valia-chip animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-valia-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-valia-ink mb-4">Propiedades Destacadas</h2>
          <p className="text-valia-muted max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades premium en las mejores ubicaciones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const agent = agents.find((a) => a.id === property.agentId)
            return <PropertyCard key={property.id} property={property} agent={agent} />
          })}
        </div>
      </div>
    </section>
  )
}
