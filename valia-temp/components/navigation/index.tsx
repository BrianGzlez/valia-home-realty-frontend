"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "../ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-valia-surface border-b border-valia-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-valia-primary">Valía Home</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/properties" className="text-valia-ink hover:text-valia-primary transition-colors">
              Propiedades
            </Link>
            <Link href="/agents" className="text-valia-ink hover:text-valia-primary transition-colors">
              Agentes
            </Link>
            <Link href="/contact" className="text-valia-ink hover:text-valia-primary transition-colors">
              Contacto
            </Link>
            <Button className="bg-valia-primary hover:bg-valia-primary-600 text-white">Agendar Visita</Button>
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
              <Link
                href="/properties"
                className="block px-3 py-2 text-valia-ink hover:text-valia-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Propiedades
              </Link>
              <Link
                href="/agents"
                className="block px-3 py-2 text-valia-ink hover:text-valia-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Agentes
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-valia-ink hover:text-valia-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-valia-primary hover:bg-valia-primary-600 text-white">
                  Agendar Visita
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
