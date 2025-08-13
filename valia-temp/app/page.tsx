import { Hero } from "../components/hero"
import { FeaturedProperties } from "../components/featured-properties"
import { WhyChooseUs } from "../components/why-choose-us"
import { ContactCTA } from "../components/contact-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <ContactCTA />
    </main>
  )
}
