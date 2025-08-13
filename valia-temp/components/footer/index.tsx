import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-valia-surface border-t border-valia-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-serif font-bold text-valia-primary mb-4">Valía Home Realty</div>
            <p className="text-valia-muted mb-4">
              Tu socio de confianza en bienes raíces. Encontramos la propiedad perfecta para ti en República Dominicana.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-valia-muted">
                <Phone className="h-4 w-4" />
                <span>+1 (809) 555-0100</span>
              </div>
              <div className="flex items-center space-x-2 text-valia-muted">
                <Mail className="h-4 w-4" />
                <span>info@valiahome.com</span>
              </div>
              <div className="flex items-center space-x-2 text-valia-muted">
                <MapPin className="h-4 w-4" />
                <span>Santo Domingo, República Dominicana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-valia-ink mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-valia-muted hover:text-valia-primary transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-valia-muted hover:text-valia-primary transition-colors">
                  Agentes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-valia-muted hover:text-valia-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-valia-ink mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-valia-muted">Venta de Propiedades</li>
              <li className="text-valia-muted">Alquiler</li>
              <li className="text-valia-muted">Asesoría Inmobiliaria</li>
              <li className="text-valia-muted">Evaluación de Propiedades</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-valia-border mt-8 pt-8 text-center text-valia-muted">
          <p>&copy; 2024 Valía Home Realty. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
