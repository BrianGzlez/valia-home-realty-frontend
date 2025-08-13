import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Eye } from "lucide-react"

// Mock inquiry data
const mockInquiries = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    property: "Luxury Villa with Ocean View",
    type: "viewing",
    status: "new",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    property: "Modern Downtown Apartment",
    type: "info",
    status: "contacted",
    date: "2024-01-14",
  },
  {
    id: "3",
    name: "David Johnson",
    email: "david@example.com",
    property: "Beachfront Condo Paradise",
    type: "offer",
    status: "new",
    date: "2024-01-13",
  },
]

export function RecentInquiries() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "viewing":
        return "bg-purple-100 text-purple-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Recent Inquiries</CardTitle>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInquiries.map((inquiry) => (
            <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-secondary">{inquiry.name}</h4>
                  <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                  <Badge className={getTypeColor(inquiry.type)}>{inquiry.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{inquiry.email}</p>
                <p className="text-sm text-gray-800 font-medium">{inquiry.property}</p>
                <p className="text-xs text-gray-500">{inquiry.date}</p>
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
