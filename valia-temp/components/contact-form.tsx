"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
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
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-semibold text-secondary mb-2">Thank You!</h3>
          <p className="text-gray-600">Your message has been sent successfully. We'll contact you soon.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Send us a Message</CardTitle>
        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1-809-XXX-XXXX" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select name="inquiryType" defaultValue="general">
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Information</SelectItem>
                <SelectItem value="buying">Buying Property</SelectItem>
                <SelectItem value="selling">Selling Property</SelectItem>
                <SelectItem value="renting">Renting Property</SelectItem>
                <SelectItem value="investment">Investment Opportunities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your real estate needs..."
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
