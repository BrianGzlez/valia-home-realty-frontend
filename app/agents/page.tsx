import { AgentGrid } from "@/components/agent-grid"

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Expert Agents
          </h1>
          <p className="text-xl/7 opacity-95 max-w-2xl text-white">
            Meet our professional real estate team dedicated to helping you find your perfect property in the Dominican
            Republic
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 py-12">
        <AgentGrid />
      </div>
    </div>
  )
}
