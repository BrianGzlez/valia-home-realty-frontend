import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Property",
      description: "List a new property",
      icon: Plus,
      href: "/admin/properties",
      color: "bg-primary hover:bg-primary-dark",
    },
    {
      title: "Add Agent",
      description: "Register new agent",
      icon: Users,
      href: "/admin/agents",
      color: "bg-secondary hover:bg-secondary/90",
    },
    {
      title: "View Inquiries",
      description: "Check new inquiries",
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Generate Report",
      description: "Create sales report",
      icon: BarChart3,
      href: "#",
      color: "bg-green-600 hover:bg-green-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button className={`w-full h-auto p-4 flex flex-col items-center space-y-2 ${action.color} text-white`}>
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
