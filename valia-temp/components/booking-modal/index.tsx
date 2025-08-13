"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { BookingsClient } from "../../lib/data"
import type { Property, Agent } from "../../lib/types"

interface BookingModalProps {
  property: Property
  agent: Agent | null
  onClose: () => void
  onSuccess: () => void
}

export function BookingModal({ property, agent, onClose, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await BookingsClient.create({
        propertyId: property.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        datetime: formData.datetime,
        notes: formData.notes,
        status: "pending",
      })

      onSuccess()
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-valia-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-valia-border">
          <h2 className="text-xl font-semibold text-valia-ink">Agendar Visita</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-valia-muted hover:text-valia-ink">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="mb-4">
            <h3 className="font-medium text-valia-ink mb-1">{property.title}</h3>
            <p className="text-sm text-valia-muted">
              {property.zone}, {property.city}
            </p>
            {agent && <p className="text-sm text-valia-muted">Agente: {agent.name}</p>}
          </div>

          <div>
            <Label htmlFor="name" className="text-valia-ink">
              Nombre completo *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-valia-ink">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-valia-ink">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>

          <div>
            <Label htmlFor="datetime" className="text-valia-ink">
              Fecha y hora preferida *
            </Label>
            <Input
              id="datetime"
              name="datetime"
              type="datetime-local"
              value={formData.datetime}
              onChange={handleChange}
              required
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-valia-ink">
              Notas adicionales
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Comentarios o solicitudes especiales..."
              className="border-valia-border focus:ring-valia-primary"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-valia-border text-valia-muted hover:bg-valia-chip bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-valia-primary hover:bg-valia-primary-600 text-white"
            >
              {loading ? "Enviando..." : "Agendar Visita"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
