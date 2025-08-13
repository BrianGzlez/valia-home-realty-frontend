import Link from "next/link"
import { Button } from "../ui/button"

export function ContactCTA() {
  return (
    <section className="py-16 bg-valia-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Listo para encontrar tu hogar ideal?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Nuestro equipo de expertos está aquí para ayudarte en cada paso del camino. Contáctanos hoy mismo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white text-valia-primary hover:bg-white/90">
            <Link href="/contact">Contactar Ahora</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-valia-primary bg-transparent"
          >
            <Link href="/properties">Ver Propiedades</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
