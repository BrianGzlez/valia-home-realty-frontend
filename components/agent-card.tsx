import type { Agent } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"

interface AgentCardProps {
  agent: Agent
}

function sanitizeDigits(s?: string) {
  return (s || "").replace(/[^0-9]/g, "")
}

export function AgentCard({ agent }: AgentCardProps) {
  const name = agent.name || "Agente"
  const slug = agent.slug || agent.id || ""
  const photo =
    (agent as any).photo ||
    (agent as any).photoUrl ||
    (agent as any).image ||
    (agent as any).imageUrl ||
    (agent as any).avatar ||
    (agent as any).avatarUrl ||
    "/business-agent.png"

  const years = (agent as any).experience ?? (agent as any).yearsExp ?? 0
  const specialties = Array.isArray(agent.specialties) ? agent.specialties : []
  const languages = Array.isArray(agent.languages) ? agent.languages : []
  const propertiesCount =
    Array.isArray((agent as any).properties) ? (agent as any).properties.length : 0

  const telHref = `tel:${sanitizeDigits(agent.phone)}`
  const waNumber = sanitizeDigits(agent.whatsapp || agent.phone)
  const waMsg = encodeURIComponent("Hola, me interesa asesoría inmobiliaria con Valía Home.")
  const waHref = `https://wa.me/${waNumber}?text=${waMsg}`
  const mailHref = `mailto:${agent.email || "info@valiahome.com"}`

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <CardContent className="p-0">
        {/* Foto */}
        <div className="relative">
          <img
            src={photo}
            alt={`${name} headshot`}
            className="w-full h-56 object-cover bg-gray-100"
            loading="lazy"
          />
          {years > 0 && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-white rounded-full px-3 py-1 text-xs shadow-sm ring-1 ring-black/5">
                {years} years exp.
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* Nombre */}
          <div className="text-center">
            <Link href={`/agents/${slug}`}>
              <h3 className="font-serif text-xl font-semibold text-primary hover:text-primary-dark cursor-pointer mb-1">
                {name}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3">Real Estate Professional</p>
          </div>

          {/* Specialties */}
          {specialties.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-primary mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-1">
                {specialties.slice(0, 2).map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 2 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{specialties.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-primary mb-2">Languages</h4>
              <p className="text-sm text-gray-600">{languages.join(", ")}</p>
            </div>
          )}

          {/* Métricas */}
          <div className="flex items-center justify-center gap-4 text-sm text-primary bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <div className="font-semibold text-primary">{propertiesCount}</div>
              <div>Properties</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{years}</div>
              <div>Years Exp.</div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-2">
            <a href={telHref} className="block">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call {agent.phone || ""}
              </Button>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              </a>
              <a href={mailHref}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </a>
            </div>
          </div>

          {/* Perfil */}
          <Link href={`/agents/${slug}`}>
            <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
              View Full Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
