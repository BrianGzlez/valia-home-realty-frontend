import { Shield, Users, Award, Clock } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Confianza y Seguridad",
      description: "Transacciones seguras y transparentes con el respaldo de nuestra experiencia.",
    },
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Agentes certificados con amplio conocimiento del mercado inmobiliario dominicano.",
    },
    {
      icon: Award,
      title: "Propiedades Premium",
      description: "Selección exclusiva de propiedades de alta calidad en las mejores ubicaciones.",
    },
    {
      icon: Clock,
      title: "Atención 24/7",
      description: "Servicio personalizado y disponibilidad completa para atender tus necesidades.",
    },
  ]

  return (
    <section className="py-16 bg-valia-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-valia-ink mb-4">¿Por qué elegir Valía Home?</h2>
          <p className="text-valia-muted max-w-2xl mx-auto">
            Somos tu socio de confianza en bienes raíces, comprometidos con encontrar la propiedad perfecta para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-valia-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-valia-primary" />
                </div>
                <h3 className="text-xl font-semibold text-valia-ink mb-3">{feature.title}</h3>
                <p className="text-valia-muted leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
