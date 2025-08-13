"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
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
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Get in Touch</CardTitle>
        <p className="text-gray-600">Reach out to us through any of these channels</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Methods */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-secondary">Phone</p>
              <p className="text-gray-600">+1-809-816-6766</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-secondary">Email</p>
              <p className="text-gray-600">info@valiahome.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-secondary">Office</p>
              <p className="text-gray-600">Santo Domingo, Dominican Republic</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-secondary">Business Hours</p>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <Button onClick={handleCall} className="w-full bg-primary hover:bg-primary-dark text-white">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={handleWhatsApp}
            variant="outline"
            className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-transparent"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            onClick={handleEmail}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
