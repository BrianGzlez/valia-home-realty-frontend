"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockAgents } from "@/lib/mock-data"
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react"

export function AgentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [agents] = useState(mockAgents)

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="font-serif text-xl">Agents ({filteredAgents.length})</CardTitle>
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents..."
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
                  src={agent.photo || "/placeholder.svg?height=80&width=80&query=agent"}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />

                <div>
                  <h3 className="font-serif text-lg font-semibold text-secondary">{agent.name}</h3>
                  <p className="text-sm text-gray-600">{agent.email}</p>
                  <p className="text-sm text-gray-600">{agent.phone}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-secondary">{agent.rating}</span>
                  <span className="text-gray-600 text-sm">({agent.reviews} reviews)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-secondary">{agent.properties.length}</div>
                    <div className="text-gray-600">Properties</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-secondary">{agent.experience}</div>
                    <div className="text-gray-600">Years Exp.</div>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {agent.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {specialty}
                      </Badge>
                    ))}
                    {agent.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{agent.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-xs text-gray-600">Languages: {agent.languages.join(", ")}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
