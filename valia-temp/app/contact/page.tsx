import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-valia-bg">
      {/* Header */}
      <section className="bg-valia-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Ponte en contacto con nuestro equipo experto. Estamos aquí para ayudarte a encontrar tu propiedad perfecta
            en República Dominicana.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
