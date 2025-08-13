import type { DataClient } from "@/lib/types"
import { createMockDataClient } from "@/lib/data-client/adapters/mock/index"
import { createRestDataClient } from "@/lib/data-client/adapters/rest/index"

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
export { createMockDataClient } from "@/lib/data-client/adapters/mock/index"
export { createRestDataClient } from "@/lib/data-client/adapters/rest/index"
