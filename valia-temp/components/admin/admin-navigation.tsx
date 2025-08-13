"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Building, Users, MessageSquare, Calendar, BarChart3, Settings, Menu, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Properties", href: "/admin/properties", icon: Building },
    { name: "Agents", href: "/admin/agents", icon: Users },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Back to Site */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Site</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link href="/admin" className="flex items-center">
              <h1 className="font-serif text-xl font-bold text-secondary">Admin Panel</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={
                    pathname === item.href
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "text-gray-700 hover:text-primary"
                  }
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-4 mt-8">
                <h2 className="font-serif text-xl font-bold text-secondary mb-6">Admin Panel</h2>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        pathname === item.href
                          ? "bg-primary hover:bg-primary-dark text-white"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
