import type { DataClient } from "../types"
import { createMockDataClient } from "./adapters/mock"
import { createRestDataClient } from "./adapters/rest"

type Mode = "mock" | "rest"

export function createDataClient(mode: Mode): DataClient {
  switch (mode) {
    case "mock":
      return createMockDataClient()
    case "rest":
      return createRestDataClient()
    default:
      throw new Error(`Unsupported data client mode: ${mode}`)
  }
}

// Export for convenience
export { createMockDataClient } from "./adapters/mock"
export { createRestDataClient } from "./adapters/rest"
