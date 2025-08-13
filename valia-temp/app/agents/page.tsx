import { AgentGrid } from "@/components/agent-grid"

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <section className="bg-valia-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nuestros Agentes Expertos</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Conoce a nuestro equipo profesional de bienes raíces dedicado a ayudarte a encontrar tu propiedad perfecta
            en República Dominicana
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
