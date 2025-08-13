"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"

export function ContactCTA() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/18098166766", "_blank")
  }

  const handleCall = () => {
    window.location.href = "tel:+18098166766"
  }

  const handleEmail = () => {
    window.location.href = "mailto:info@valiahome.com"
  }

  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
        <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
          Contact our expert team today and let us help you discover the perfect property in paradise
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button onClick={handleCall} size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-3">
            <Phone className="mr-2 h-5 w-5" />
            Call +1-809-816-6766
          </Button>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-secondary px-8 py-3 bg-transparent"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp Us
          </Button>
          <Button
            onClick={handleEmail}
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-secondary px-8 py-3 bg-transparent"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email Us
          </Button>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 bg-white"
            >
              Visit Contact Page
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
