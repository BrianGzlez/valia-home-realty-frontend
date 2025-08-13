import { mockAgents, mockProperties } from "@/lib/mock-data"
import { AgentProfile } from "@/components/agent-profile"
import { notFound } from "next/navigation"

type Params = { id: string }

export default function AgentPage({ params }: { params: Params }) {
  const key = decodeURIComponent(params.id)

  // Permite /agents/agent1 o /agents/maria-rodriguez
  const agent = mockAgents.find((a) => a.id === key || a.slug === key)
  if (!agent) return notFound()

  // Une propiedades por agentId y/o por la lista agent.properties
  const listedIds = new Set(agent.properties || [])
  const agentProperties = mockProperties.filter(
    (p) => p.agentId === agent.id || listedIds.has(p.id)
  )

  return <AgentProfile agent={agent} properties={agentProperties} />
}

export function generateStaticParams() {
  // Pre-genera páginas para id y slug (si existen)
  const vals = new Set<string>()
  for (const a of mockAgents) {
    if (a.id) vals.add(a.id)
    if (a.slug) vals.add(a.slug)
  }
  return Array.from(vals).map((v) => ({ id: v }))
}
