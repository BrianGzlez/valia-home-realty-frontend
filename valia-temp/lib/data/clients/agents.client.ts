import type { Agent } from "../../types"
import { LocalStorageStore, STORAGE } from "../store"

export class AgentsClient {
  private static seedData: Agent[] | null = null

  private static async getSeedData(): Promise<Agent[]> {
    if (this.seedData) return this.seedData

    try {
      const response = await fetch("/data/agents.json")
      this.seedData = await response.json()
      return this.seedData || []
    } catch {
      return []
    }
  }

  static async list(): Promise<Agent[]> {
    let agents = LocalStorageStore.get<Agent>(STORAGE.AGENTS)

    if (agents.length === 0) {
      agents = await this.getSeedData()
      LocalStorageStore.set(STORAGE.AGENTS, agents)
    }

    return agents
  }

  static async get(slug: string): Promise<Agent | null> {
    const agents = await this.list()
    return agents.find((a) => a.slug === slug) || null
  }

  static async create(agent: Omit<Agent, "id" | "slug">): Promise<Agent> {
    const agents = await this.list()
    const newAgent: Agent = {
      ...agent,
      id: crypto.randomUUID(),
      slug: this.generateSlug(agent.name),
    }

    agents.push(newAgent)
    LocalStorageStore.set(STORAGE.AGENTS, agents)
    return newAgent
  }

  static async update(id: string, updates: Partial<Agent>): Promise<Agent | null> {
    const agents = await this.list()
    const index = agents.findIndex((a) => a.id === id)

    if (index === -1) return null

    agents[index] = { ...agents[index], ...updates }
    LocalStorageStore.set(STORAGE.AGENTS, agents)
    return agents[index]
  }

  static async remove(id: string): Promise<boolean> {
    const agents = await this.list()
    const filtered = agents.filter((a) => a.id !== id)

    if (filtered.length === agents.length) return false

    LocalStorageStore.set(STORAGE.AGENTS, filtered)
    return true
  }

  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }
}
