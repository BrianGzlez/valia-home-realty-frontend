import { Shield, Award, Users, Clock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description: "Over 10 years of experience in Dominican Republic real estate market",
  },
  {
    icon: Award,
    title: "Premium Properties",
    description: "Carefully curated selection of luxury and investment properties",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Dedicated agents providing tailored solutions for your needs",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always available to assist you throughout your property journey",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4">
            Why Choose Valía Home Realty
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            We're committed to making your real estate dreams come true with exceptional service and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-secondary mb-3">{feature.title}</h3>
              <p className="text-text-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
