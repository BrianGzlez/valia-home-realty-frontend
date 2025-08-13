"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { ContactSchema, type ContactFormData } from "../../../lib/validation"
import { InquiriesClient } from "../../../lib/data"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      inquiryType: "general",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      // Convert contact form to inquiry
      await InquiriesClient.create({
        propertyId: "", // General inquiry
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: `${data.subject}\n\n${data.message}`,
      })

      setSuccess(true)
      reset()
    } catch (error) {
      console.error("Error submitting contact form:", error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="bg-valia-surface border-valia-border">
        <CardContent className="p-8 text-center">
          <div className="text-valia-success text-5xl mb-4">✓</div>
          <h3 className="text-xl font-semibold text-valia-ink mb-2">¡Mensaje Enviado!</h3>
          <p className="text-valia-muted mb-4">Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
          <Button onClick={() => setSuccess(false)} className="bg-valia-primary hover:bg-valia-primary-600 text-white">
            Enviar Otro Mensaje
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-valia-surface border-valia-border">
      <CardHeader>
        <CardTitle className="text-valia-ink">Contáctanos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-valia-ink">
                Nombre completo *
              </Label>
              <Input id="name" {...register("name")} className="border-valia-border focus:ring-valia-primary" />
              {errors.name && <p className="text-valia-danger text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-valia-ink">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="border-valia-border focus:ring-valia-primary"
              />
              {errors.email && <p className="text-valia-danger text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-valia-ink">
                Teléfono
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="border-valia-border focus:ring-valia-primary"
              />
              {errors.phone && <p className="text-valia-danger text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="inquiryType" className="text-valia-ink">
                Tipo de Consulta
              </Label>
              <Select value={watch("inquiryType")} onValueChange={(value: any) => setValue("inquiryType", value)}>
                <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Consulta General</SelectItem>
                  <SelectItem value="property">Sobre una Propiedad</SelectItem>
                  <SelectItem value="agent">Contactar Agente</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
              {errors.inquiryType && <p className="text-valia-danger text-sm mt-1">{errors.inquiryType.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="subject" className="text-valia-ink">
              Asunto *
            </Label>
            <Input id="subject" {...register("subject")} className="border-valia-border focus:ring-valia-primary" />
            {errors.subject && <p className="text-valia-danger text-sm mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <Label htmlFor="message" className="text-valia-ink">
              Mensaje *
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              rows={5}
              className="border-valia-border focus:ring-valia-primary"
            />
            {errors.message && <p className="text-valia-danger text-sm mt-1">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-valia-primary hover:bg-valia-primary-600 text-white"
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
