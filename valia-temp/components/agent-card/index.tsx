import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { WhatsAppButton } from "../ui/whatsapp-button"
import type { Agent } from "../../lib/types"

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-valia-surface border-valia-border">
      <div className="relative">
        <Image
          src={agent.photoUrl || "/placeholder.svg?height=300&width=300"}
          alt={agent.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-valia-ink text-xl mb-1">
            <Link href={`/agents/${agent.slug}`} className="hover:text-valia-primary transition-colors">
              {agent.name}
            </Link>
          </h3>
          {agent.licenseNumber && <p className="text-valia-muted text-sm">Lic. {agent.licenseNumber}</p>}
        </div>

        {agent.bio && <p className="text-valia-muted text-sm mb-4 line-clamp-3 leading-relaxed">{agent.bio}</p>}

        <div className="space-y-2 mb-4">
          {agent.email && (
            <div className="flex items-center space-x-2 text-valia-muted text-sm">
              <Mail className="h-4 w-4" />
              <span>{agent.email}</span>
            </div>
          )}
          {agent.phone && (
            <div className="flex items-center space-x-2 text-valia-muted text-sm">
              <Phone className="h-4 w-4" />
              <span>{agent.phone}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
          >
            <Link href={`/agents/${agent.slug}`}>Ver Perfil</Link>
          </Button>
          {agent.whatsapp && (
            <WhatsAppButton
              phone={agent.whatsapp}
              message={`Hola ${agent.name}, me gustaría obtener información sobre propiedades disponibles.`}
              className="text-sm"
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
