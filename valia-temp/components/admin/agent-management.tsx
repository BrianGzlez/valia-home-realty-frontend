"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createDataClient } from "@/lib/data-client"
import type { Agent } from "@/lib/types"
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react"

export function AgentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const dataClient = createDataClient("mock")
        const agentData = await dataClient.agents.list()
        setAgents(agentData)
      } catch (error) {
        console.error("Error loading agents:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.specialties &&
        agent.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  if (loading) {
    return <div className="text-center py-8 text-valia-muted">Cargando agentes...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="font-serif text-xl text-valia-ink">Agentes ({filteredAgents.length})</CardTitle>
            <Button className="bg-valia-primary hover:bg-valia-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Agente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-valia-muted" />
            <Input
              placeholder="Buscar agentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <img
                  src="/business-agent.png"
                  alt={agent.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />

                <div>
                  <h3 className="font-serif text-lg font-semibold text-valia-ink">{agent.name}</h3>
                  <p className="text-sm text-valia-muted">{agent.email}</p>
                  <p className="text-sm text-valia-muted">{agent.phone}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-valia-primary text-valia-primary" />
                  <span className="font-semibold text-valia-ink">{agent.rating}</span>
                  <span className="text-valia-muted text-sm">({agent.reviews} reseñas)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-valia-chip rounded">
                    <div className="font-semibold text-valia-ink">{agent.totalSales || 0}</div>
                    <div className="text-valia-muted">Ventas</div>
                  </div>
                  <div className="text-center p-2 bg-valia-chip rounded">
                    <div className="font-semibold text-valia-ink">{agent.experience}</div>
                    <div className="text-valia-muted">Años Exp.</div>
                  </div>
                </div>

                {/* Specialties */}
                {agent.specialties && agent.specialties.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {agent.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} className="text-xs bg-valia-primary/10 text-valia-primary">
                          {specialty}
                        </Badge>
                      ))}
                      {agent.specialties.length > 2 && (
                        <Badge className="text-xs bg-valia-chip text-valia-muted">
                          +{agent.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {agent.languages && agent.languages.length > 0 && (
                  <div>
                    <p className="text-xs text-valia-muted">Idiomas: {agent.languages.join(", ")}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-valia-danger hover:text-valia-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-valia-muted mb-4">No se encontraron agentes</div>
            <p className="text-valia-muted">Intenta ajustar tu búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
