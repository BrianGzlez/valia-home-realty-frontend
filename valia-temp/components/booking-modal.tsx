"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import type { Property } from "@/lib/types"
import { CalendarIcon, Clock, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface BookingModalProps {
  property: Property
  trigger?: React.ReactNode
}

export function BookingModal({ property, trigger }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const { toast } = useToast()

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time are required for booking.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast({
      title: "Viewing scheduled successfully!",
      description: `Your viewing is confirmed for ${format(selectedDate, "PPP")} at ${selectedTime}.`,
    })

    // Reset and close modal after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      setSelectedDate(undefined)
      setSelectedTime("")
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Viewing
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Schedule Property Viewing</DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Viewing Scheduled!</h3>
            <p className="text-gray-600">
              Your viewing is confirmed for {selectedDate && format(selectedDate, "PPP")} at {selectedTime}.
            </p>
            <p className="text-sm text-gray-500 mt-2">{property.agent.name} will contact you to confirm details.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Property Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary mb-1">{property.title}</h4>
              <p className="text-sm text-gray-600">
                {property.location.address}, {property.location.city}
              </p>
              <p className="text-primary font-semibold">
                ${property.price.toLocaleString()} {property.currency}
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
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
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1-809-XXX-XXXX" required />
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={
                        selectedTime === time
                          ? "bg-primary hover:bg-primary-dark"
                          : "border-primary text-primary hover:bg-primary hover:text-white"
                      }
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder="Any specific requirements or questions..." />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Viewing
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
