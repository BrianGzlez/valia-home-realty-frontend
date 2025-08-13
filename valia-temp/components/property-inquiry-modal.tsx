"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Property } from "@/lib/types"
import { Phone, MessageCircle, Mail, Send, CheckCircle } from "lucide-react"

interface PropertyInquiryModalProps {
  property: Property
  trigger?: React.ReactNode
}

export function PropertyInquiryModal({ property, trigger }: PropertyInquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast({
      title: "Inquiry sent successfully!",
      description: `${property.agent?.name || "Our agent"} will contact you soon.`,
    })

    // Reset and close modal after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      ;(e.target as HTMLFormElement).reset()
    }, 2000)
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the property: ${property.title} (ID: ${property.id}). Can you provide more information?`
    const whatsappUrl = `https://wa.me/18098166766?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCall = () => {
    const phone = property.agent?.phone || "+1-809-816-6766"
    window.location.href = `tel:${phone}`
  }

  // Safe property location access
  const propertyCity = property.city || property.location?.city || "Dominican Republic"
  const propertyZone = property.zone || property.location?.province || ""
  const locationText = propertyZone ? `${propertyCity}, ${propertyZone}` : propertyCity

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-valia-primary hover:bg-valia-primary-600 text-white">
            <Mail className="h-4 w-4 mr-2" />
            Inquire Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-valia-ink">Property Inquiry</DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-valia-success mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-valia-ink">Inquiry Sent!</h3>
            <p className="text-valia-muted">{property.agent?.name || "Our agent"} will contact you soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Property Info */}
            <div className="bg-valia-chip rounded-lg p-4">
              <h4 className="font-semibold text-valia-ink mb-1">{property.title}</h4>
              <p className="text-sm text-valia-muted">{locationText}</p>
              <p className="text-valia-primary font-semibold">
                ${property.price.toLocaleString()} {property.currency}
              </p>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCall}
                variant="outline"
                className="border-valia-primary text-valia-primary hover:bg-valia-primary hover:text-white bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Agent
              </Button>
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="border-valia-success text-valia-success hover:bg-valia-success hover:text-white bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-valia-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-valia-surface px-2 text-valia-muted">Or send a message</span>
              </div>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-valia-ink">
                    First Name *
                  </Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-valia-ink">
                    Last Name *
                  </Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-valia-ink">
                  Email *
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-valia-ink">
                  Phone
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1-809-XXX-XXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="text-valia-ink">
                  Inquiry Type
                </Label>
                <Select name="inquiryType" defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Request Information</SelectItem>
                    <SelectItem value="viewing">Schedule Viewing</SelectItem>
                    <SelectItem value="offer">Make an Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-valia-ink">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your interest in this property..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-valia-primary hover:bg-valia-primary-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
