"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  // Toma el teléfono de .env; usa el fallback si no existe
  const rawPhone = process.env.NEXT_PUBLIC_WA_PHONE || "+1-809-816-6766"
  const telHref = `tel:${rawPhone.replace(/[^+0-9]/g, "")}`

  // wa.me requiere el número sin el "+"
  const waNumber = rawPhone.replace(/[^0-9]/g, "")
  const waText = encodeURIComponent("Hola, me interesa una propiedad de Valía Home.")
  const waHref = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <footer className="border-t border-valia-border bg-white text-valia-ink">
      <div className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-tight">Valía Home Realty</h3>
            <p className="text-valia-muted">
              Your trusted partner in finding luxury homes, beachfront properties, and investment opportunities in the
              Dominican Republic.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-valia-border hover:border-valia-primary hover:text-valia-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-valia-border hover:border-valia-primary hover:text-valia-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full border border-valia-border hover:border-valia-primary hover:text-valia-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-valia-ink/80 hover:text-valia-ink transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-valia-ink/80 hover:text-valia-ink transition-colors">
                  Our Agents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-valia-ink/80 hover:text-valia-ink transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-valia-ink/80 hover:text-valia-ink transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Services</h4>
            <ul className="space-y-2 text-valia-ink/80">
              <li>Property Sales</li>
              <li>Property Rentals</li>
              <li>Investment Consulting</li>
              <li>Property Management</li>
              <li>Market Analysis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-valia-primary" />
                <div>
                  <a href={telHref} className="font-medium hover:underline">
                    {rawPhone}
                  </a>
                  <p className="text-sm text-valia-muted">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-valia-primary" />
                <div>
                  <a href="mailto:info@valiahome.com" className="font-medium hover:underline">
                    info@valiahome.com
                  </a>
                  <p className="text-sm text-valia-muted">Email us anytime</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-valia-primary" />
                <div>
                  <p className="font-medium">Santo Domingo</p>
                  <p className="text-sm text-valia-muted">Dominican Republic</p>
                </div>
              </div>

              <a href={waHref} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="mt-4 w-full bg-[#128C7E] hover:bg-[#0f7a6e] text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-valia-border pt-6 text-sm text-valia-muted flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Valía Home Realty. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-valia-ink">Privacy Policy</Link>
            <span className="text-valia-border">|</span>
            <Link href="/terms" className="hover:text-valia-ink">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
