import { AgentCard } from "@/components/agent-card"
import { mockAgents } from "@/lib/mock-data"

export function AgentGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-secondary mb-4">{mockAgents.length} Professional Agents</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our experienced team of real estate professionals is here to guide you through every step of your property
          journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
