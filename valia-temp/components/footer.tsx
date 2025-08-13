"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/18098166766", "_blank")
  }

  return (
    <footer className="bg-valia-ink text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Valía Home Realty</h3>
            <p className="text-gray-300">
              Your trusted partner in finding luxury homes, beachfront properties, and investment opportunities in the
              Dominican Republic.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-valia-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-valia-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-valia-primary">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/properties" className="block text-gray-300 hover:text-white transition-colors">
                Properties
              </Link>
              <Link href="/agents" className="block text-gray-300 hover:text-white transition-colors">
                Our Agents
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Property Sales</p>
              <p className="text-gray-300">Property Rentals</p>
              <p className="text-gray-300">Investment Consulting</p>
              <p className="text-gray-300">Property Management</p>
              <p className="text-gray-300">Market Analysis</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-valia-primary" />
                <div>
                  <p className="font-medium">+1-809-816-6766</p>
                  <p className="text-sm text-gray-300">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-valia-primary" />
                <div>
                  <p className="font-medium">info@valiahome.com</p>
                  <p className="text-sm text-gray-300">Email us anytime</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-valia-primary" />
                <div>
                  <p className="font-medium">Santo Domingo</p>
                  <p className="text-sm text-gray-300">Dominican Republic</p>
                </div>
              </div>

              <Button
                onClick={handleWhatsApp}
                className="w-full bg-valia-success hover:bg-valia-success/90 text-white mt-4"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Valía Home Realty. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
