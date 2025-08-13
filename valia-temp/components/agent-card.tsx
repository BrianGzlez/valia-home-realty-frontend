import type { Agent } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Mail, Star } from "lucide-react"
import Link from "next/link"

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Agent Photo */}
        <div className="relative">
          <img
            src={agent.photo || "/placeholder.svg?height=200&width=300&query=professional agent"}
            alt={agent.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-white">{agent.experience} years exp.</Badge>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Agent Info */}
          <div className="text-center">
            <Link href={`/agents/${agent.id}`}>
              <h3 className="font-serif text-xl font-semibold text-secondary hover:text-primary cursor-pointer mb-1">
                {agent.name}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3">Real Estate Professional</p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-secondary">{agent.rating}</span>
              <span className="text-gray-600 text-sm">({agent.reviews} reviews)</span>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-1">
              {agent.specialties.slice(0, 2).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {specialty}
                </Badge>
              ))}
              {agent.specialties.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{agent.specialties.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-2">Languages</h4>
            <p className="text-sm text-gray-600">{agent.languages.join(", ")}</p>
          </div>

          {/* Properties Count */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <div className="font-semibold text-secondary">{agent.properties.length}</div>
              <div>Properties</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-secondary">{agent.experience}</div>
              <div>Years Exp.</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary-dark text-white">
              <Phone className="h-4 w-4 mr-2" />
              Call {agent.phone}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
            </div>
          </div>

          {/* View Profile */}
          <Link href={`/agents/${agent.id}`}>
            <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
              View Full Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
