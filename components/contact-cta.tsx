"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail } from "lucide-react"

export function ContactCTA() {
  // Teléfono desde .env, con fallback
  const rawPhone = process.env.NEXT_PUBLIC_WA_PHONE || "+1-809-816-6766"
  const telHref = `tel:${rawPhone.replace(/[^+0-9]/g, "")}`

  // wa.me: número sin símbolos + mensaje prellenado
  const waNumber = rawPhone.replace(/[^0-9]/g, "")
  const waText = encodeURIComponent("Hola, me interesa una propiedad de Valía Home.")
  const waHref = `https://wa.me/${waNumber}?text=${waText}`

  const mailHref = "mailto:info@valiahome.com"

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto w-full max-w-7xl px-4 text-center">
        {/* Texto con mayor contraste sobre el mismo fondo */}
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-valia-ink tracking-tight mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-lg md:text-xl text-valia-ink/80 max-w-2xl mx-auto mb-10">
          Contact our expert team today and let us help you discover the perfect property in paradise.
        </p>

        {/* Botones más legibles sobre fondo claro */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href={telHref} className="w-full sm:w-auto">
            <Button size="lg" className="w-full px-7 bg-primary hover:bg-primary/90 text-white shadow-sm">
              <Phone className="mr-2 h-5 w-5" />
              Call {rawPhone}
            </Button>
          </a>

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full px-7 border-valia-ink/30 text-valia-ink hover:bg-valia-ink hover:text-white"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </a>

          <a href={mailHref} className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full px-7 border-valia-ink/30 text-valia-ink hover:bg-valia-ink hover:text-white"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </a>
        </div>

        <Link href="/contact">
          <Button size="lg" variant="ghost" className="px-7 text-valia-ink hover:bg-valia-ink/10">
            Visit Contact Page
          </Button>
        </Link>
      </div>
    </section>
  )
}
