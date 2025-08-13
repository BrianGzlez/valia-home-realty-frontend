import type { DataClient } from "../../../types"
import { createRestPropertyService } from "./properties"
import { createRestAgentService } from "./agents"
import { createRestInquiryService } from "./inquiries"
import { createRestBookingService } from "./bookings"

export function createRestDataClient(): DataClient {
  return {
    properties: createRestPropertyService(),
    agents: createRestAgentService(),
    inquiries: createRestInquiryService(),
    bookings: createRestBookingService(),
  }
}
