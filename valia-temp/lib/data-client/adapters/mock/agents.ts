import type { Agent, AgentService } from "@/lib/types"

const mockAgents: Agent[] = [
  {
    id: "agent1",
    slug: "maria-rodriguez",
    name: "María Rodríguez",
    email: "maria@valiahome.com",
    phone: "+1-809-816-6766",
    whatsapp: "+18098166766",
    photoUrl: "/professional-woman-realtor.png",
    bio: "Especialista en propiedades de lujo con más de 8 años en el mercado dominicano. Fluente en español, inglés y francés.",
    specialties: ["Propiedades de Lujo", "Casas Frente al Mar", "Propiedades de Inversión"],
    experience: 8,
    languages: ["Español", "Inglés", "Francés"],
    properties: ["1", "3"],
    rating: 4.9,
    reviews: 47,
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "agent2",
    slug: "carlos-mendez",
    name: "Carlos Méndez",
    email: "carlos@valiahome.com",
    phone: "+1-809-816-6766",
    whatsapp: "+18098166766",
    photoUrl: "/professional-realtor.png",
    bio: "Experto en bienes raíces comerciales y residenciales especializado en propiedades de Santo Domingo. Conocido por su servicio excepcional al cliente.",
    specialties: ["Propiedades Comerciales", "Apartamentos Urbanos", "Compradores Primerizos"],
    experience: 6,
    languages: ["Español", "Inglés"],
    properties: ["2"],
    rating: 4.8,
    reviews: 32,
    createdAt: "2021-03-15T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "agent3",
    slug: "ana-garcia",
    name: "Ana García",
    email: "ana@valiahome.com",
    phone: "+1-809-816-6766",
    whatsapp: "+18098166766",
    photoUrl: "/professional-woman-realtor.png",
    bio: "Agente especializada en propiedades vacacionales y de inversión en la costa este. Más de 5 años ayudando a clientes internacionales.",
    specialties: ["Propiedades Vacacionales", "Inversión Extranjera", "Condominios"],
    experience: 5,
    languages: ["Español", "Inglés", "Italiano"],
    properties: [],
    rating: 4.7,
    reviews: 28,
    createdAt: "2022-06-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const STORAGE_KEY = "valia_agents"

function getStoredAgents(): Agent[] {
  if (typeof window === "undefined") return mockAgents

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockAgents
}

function setStoredAgents(agents: Agent[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents))
}

export function createMockAgentService(): AgentService {
  return {
    async list(): Promise<Agent[]> {
      return getStoredAgents()
    },

    async get(id: string): Promise<Agent | null> {
      const agents = getStoredAgents()
      return agents.find((a) => a.id === id) || null
    },

    async create(agentData: Omit<Agent, "id" | "createdAt" | "updatedAt">): Promise<Agent> {
      const agents = getStoredAgents()
      const now = new Date().toISOString()

      const agent: Agent = {
        ...agentData,
        id: `agent_${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      }

      agents.push(agent)
      setStoredAgents(agents)

      return agent
    },

    async update(id: string, updates: Partial<Agent>): Promise<Agent> {
      const agents = getStoredAgents()
      const index = agents.findIndex((a) => a.id === id)

      if (index === -1) {
        throw new Error(`Agent with id ${id} not found`)
      }

      const updatedAgent = {
        ...agents[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      agents[index] = updatedAgent
      setStoredAgents(agents)

      return updatedAgent
    },

    async remove(id: string): Promise<void> {
      const agents = getStoredAgents()
      const filtered = agents.filter((a) => a.id !== id)
      setStoredAgents(filtered)
    },
  }
}
