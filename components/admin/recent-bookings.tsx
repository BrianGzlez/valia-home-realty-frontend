import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: "1",
    clientName: "Sarah Wilson",
    property: "Luxury Villa with Ocean View",
    date: "2024-01-20",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: "2",
    clientName: "Michael Brown",
    property: "Modern Downtown Apartment",
    date: "2024-01-18",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: "3",
    clientName: "Lisa Davis",
    property: "Beachfront Condo Paradise",
    date: "2024-01-17",
    time: "3:00 PM",
    status: "completed",
  },
]

export function RecentBookings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Recent Bookings</CardTitle>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-secondary">{booking.clientName}</h4>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-1">{booking.property}</p>
                <p className="text-sm text-gray-600">
                  {booking.date} at {booking.time}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
