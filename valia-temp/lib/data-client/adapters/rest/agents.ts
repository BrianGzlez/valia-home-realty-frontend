import type { Agent, AgentService } from "@/lib/types"

export function createRestAgentService(): AgentService {
  return {
    async list(): Promise<Agent[]> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/agents')
      // if (!response.ok) throw new Error('Failed to fetch agents')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async get(id: string): Promise<Agent | null> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/agents/${id}`)
      // if (response.status === 404) return null
      // if (!response.ok) throw new Error('Failed to fetch agent')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async create(agentData: Omit<Agent, "id" | "createdAt" | "updatedAt">): Promise<Agent> {
      // TODO(back): Implement REST API call
      // const response = await fetch('/api/agents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(agentData),
      // })
      // if (!response.ok) throw new Error('Failed to create agent')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async update(id: string, updates: Partial<Agent>): Promise<Agent> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/agents/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // })
      // if (!response.ok) throw new Error('Failed to update agent')
      // return response.json()

      throw new Error("REST API not implemented yet")
    },

    async remove(id: string): Promise<void> {
      // TODO(back): Implement REST API call
      // const response = await fetch(`/api/agents/${id}`, {
      //   method: 'DELETE',
      // })
      // if (!response.ok) throw new Error('Failed to delete agent')

      throw new Error("REST API not implemented yet")
    },
  }
}
