import type { Settings } from "../../types"

const STORAGE_KEYS = {
  PROPERTIES: "valia_properties",
  AGENTS: "valia_agents",
  INQUIRIES: "valia_inquiries",
  BOOKINGS: "valia_bookings",
  SETTINGS: "valia_settings",
} as const

export class LocalStorageStore {
  static get<T>(key: string): T[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  static set<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  static getSettings(): Settings {
    if (typeof window === "undefined") {
      return {
        defaultCurrency: "USD",
        timezone: "America/Santo_Domingo",
        company: { phone: "", address: "" },
      }
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      return data
        ? JSON.parse(data)
        : {
            defaultCurrency: "USD",
            timezone: "America/Santo_Domingo",
            company: { phone: "", address: "" },
          }
    } catch {
      return {
        defaultCurrency: "USD",
        timezone: "America/Santo_Domingo",
        company: { phone: "", address: "" },
      }
    }
  }

  static setSettings(settings: Settings): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }
}

export const STORAGE = STORAGE_KEYS
