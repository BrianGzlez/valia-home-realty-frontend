import type { Settings } from "../../types"
import { LocalStorageStore } from "../store"

export class SettingsClient {
  static async get(): Promise<Settings> {
    return LocalStorageStore.getSettings()
  }

  static async update(settings: Settings): Promise<Settings> {
    LocalStorageStore.setSettings(settings)
    return settings
  }
}
