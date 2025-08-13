import { Button } from "@/components/ui/button"
import { Search, Phone, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />

      {/* Overlay más oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-6 drop-shadow-[3px_3px_6px_rgba(0,0,0,0.9)]">
          Valía Home Realty
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-95 drop-shadow-[2px_2px_5px_rgba(0,0,0,0.85)]">
          Discover Premium Properties in the Dominican Republic
        </p>
        <p className="text-lg mb-12 opacity-90 max-w-2xl mx-auto drop-shadow-[2px_2px_5px_rgba(0,0,0,0.85)]">
          Your trusted partner in finding luxury homes, beachfront properties, and investment opportunities in paradise.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/properties">
            <Button size="lg" className="bg-valia-surface hover:bg-valia-chip text-valia-ink px-8 py-3">
              <Search className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>
          </Link>
          <Link href="/agents">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-valia-primary px-8 py-3 bg-transparent"
            >
              <Users className="mr-2 h-5 w-5" />
              Meet Our Agents
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-lg drop-shadow-[2px_2px_5px_rgba(0,0,0,0.85)]">
          <Phone className="h-5 w-5 text-valia-surface" />
          <span>Call us: </span>
          <a href="tel:+18098166766" className="text-valia-surface hover:underline font-semibold">
            +1-809-816-6766
          </a>
        </div>
      </div>
    </section>
  )
}




