import type { DataClient } from "@/lib/types"
import { createMockPropertyService } from "./properties"
import { createMockAgentService } from "./agents"
import { createMockInquiryService } from "./inquiries"
import { createMockBookingService } from "./bookings"

export function createMockDataClient(): DataClient {
  return {
    properties: createMockPropertyService(),
    agents: createMockAgentService(),
    inquiries: createMockInquiryService(),
    bookings: createMockBookingService(),
  }
}
