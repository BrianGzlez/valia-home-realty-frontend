"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Users, MessageSquare, Calendar, BarChart3, Settings, Building } from "lucide-react"
import { Button } from "../../ui/button"
import { cn } from "../../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Propiedades", href: "/admin/properties", icon: Building },
  { name: "Agentes", href: "/admin/agents", icon: Users },
  { name: "Consultas", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Citas", href: "/admin/bookings", icon: Calendar },
  { name: "Reportes", href: "/admin/reports", icon: BarChart3 },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-valia-surface border-b border-valia-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="text-xl font-serif font-bold text-valia-primary">Valía Admin</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-valia-primary text-white"
                      : "text-valia-ink hover:text-valia-primary hover:bg-valia-chip",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Public Site Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-valia-border text-valia-ink hover:bg-valia-chip bg-transparent"
            >
              <Link href="/">Ver Sitio</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-valia-ink">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-valia-surface border-t border-valia-border">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-valia-primary text-white"
                        : "text-valia-ink hover:text-valia-primary hover:bg-valia-chip",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="px-3 py-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-valia-border text-valia-ink hover:bg-valia-chip bg-transparent"
                >
                  <Link href="/">Ver Sitio</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
