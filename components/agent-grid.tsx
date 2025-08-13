import { AgentCard } from "@/components/agent-card"
import { mockAgents } from "@/lib/mock-data"

export function AgentGrid() {
  const agents = mockAgents || []

  return (
    <div className="space-y-8">
      <div className="text-center">
        {/* Más contraste para el título */}
        <h2 className="font-serif text-3xl font-bold text-valia-ink mb-3">
          {agents.length} Professional Agents
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our experienced team of real estate professionals is here to guide you through every step of your property
          journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <AgentCard key={agent.id || agent.slug} agent={agent} />
        ))}
      </div>
    </div>
  )
}
