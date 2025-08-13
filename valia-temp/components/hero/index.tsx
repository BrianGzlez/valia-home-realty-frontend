import { Button } from "../ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-valia-bg py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-valia-ink mb-6">
            Encuentra tu hogar ideal en <span className="text-valia-primary">República Dominicana</span>
          </h1>
          <p className="text-xl text-valia-muted mb-8 max-w-3xl mx-auto">
            Descubre propiedades exclusivas con Valía Home Realty. Tu socio de confianza en bienes raíces de lujo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-valia-primary hover:bg-valia-primary-600 text-white">
              <Link href="/properties">Ver Propiedades</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
            >
              <Link href="/contact">Agendar Visita</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
