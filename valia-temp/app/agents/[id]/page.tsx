import { mockAgents, mockProperties } from "@/lib/mock-data"
import { AgentProfile } from "@/components/agent-profile"
import { notFound } from "next/navigation"

interface AgentPageProps {
  params: {
    id: string
  }
}

export default function AgentPage({ params }: AgentPageProps) {
  const agent = mockAgents.find((a) => a.id === params.id)

  if (!agent) {
    notFound()
  }

  // Get agent's properties
  const agentProperties = mockProperties.filter((property) => agent.properties.includes(property.id))

  return <AgentProfile agent={agent} properties={agentProperties} />
}

export function generateStaticParams() {
  return mockAgents.map((agent) => ({
    id: agent.id,
  }))
}
