"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Agents", href: "/agents" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-valia-surface shadow-sm border-b border-valia-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="font-serif text-2xl font-bold text-valia-ink">Valía Home</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-valia-ink hover:text-valia-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+18098166766"
              className="hidden sm:flex items-center gap-2 text-valia-primary hover:text-valia-primary-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+1-809-816-6766</span>
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-xl font-bold text-valia-ink">Valía Home</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-lg font-medium text-valia-ink hover:text-valia-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="pt-6 border-t border-valia-border">
                    <a
                      href="tel:+18098166766"
                      className="flex items-center gap-2 text-valia-primary hover:text-valia-primary-600 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-semibold">+1-809-816-6766</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
