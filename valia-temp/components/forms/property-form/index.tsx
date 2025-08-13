"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Checkbox } from "../../ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { PropertySchema, type PropertyFormData } from "../../../lib/validation"
import type { Property, Agent } from "../../../lib/types"

interface PropertyFormProps {
  property?: Property
  agents: Agent[]
  onSubmit: (data: PropertyFormData) => Promise<void>
  onCancel: () => void
}

export function PropertyForm({ property, agents, onSubmit, onCancel }: PropertyFormProps) {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: property
      ? {
          title: property.title,
          description: property.description || "",
          operation: property.operation,
          propertyType: property.propertyType,
          status: property.status,
          price: property.price,
          currency: property.currency,
          maintenanceFee: property.maintenanceFee || undefined,
          bedrooms: property.bedrooms || undefined,
          bathrooms: property.bathrooms || undefined,
          parking: property.parking || undefined,
          areaBuilt: property.areaBuilt || undefined,
          areaLot: property.areaLot || undefined,
          floor: property.floor || undefined,
          yearBuilt: property.yearBuilt || undefined,
          furnished: property.furnished || false,
          amenities: property.amenities || [],
          city: property.city,
          zone: property.zone || "",
          address: property.address || "",
          agentId: property.agentId || "",
          featured: property.featured || false,
        }
      : {
          operation: "venta",
          propertyType: "apartamento",
          status: "activa",
          currency: "USD",
          furnished: false,
          featured: false,
        },
  })

  const onFormSubmit = async (data: PropertyFormData) => {
    setLoading(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep
                  ? "bg-valia-primary text-white"
                  : step < currentStep
                    ? "bg-valia-success text-white"
                    : "bg-valia-chip text-valia-muted"
              }`}
            >
              {step}
            </div>
            {step < 3 && <div className="w-12 h-0.5 bg-valia-border mx-2" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="bg-valia-surface border-valia-border">
          <CardHeader>
            <CardTitle className="text-valia-ink">Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-valia-ink">
                Título *
              </Label>
              <Input id="title" {...register("title")} className="border-valia-border focus:ring-valia-primary" />
              {errors.title && <p className="text-valia-danger text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-valia-ink">
                Descripción
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={4}
                className="border-valia-border focus:ring-valia-primary"
              />
              {errors.description && <p className="text-valia-danger text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="operation" className="text-valia-ink">
                  Operación *
                </Label>
                <Select
                  value={watch("operation")}
                  onValueChange={(value: "venta" | "alquiler") => setValue("operation", value)}
                >
                  <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
                {errors.operation && <p className="text-valia-danger text-sm mt-1">{errors.operation.message}</p>}
              </div>

              <div>
                <Label htmlFor="propertyType" className="text-valia-ink">
                  Tipo de Propiedad *
                </Label>
                <Select value={watch("propertyType")} onValueChange={(value: any) => setValue("propertyType", value)}>
                  <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nave">Nave</SelectItem>
                    <SelectItem value="solar">Solar</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && <p className="text-valia-danger text-sm mt-1">{errors.propertyType.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price" className="text-valia-ink">
                  Precio *
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.price && <p className="text-valia-danger text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <Label htmlFor="currency" className="text-valia-ink">
                  Moneda *
                </Label>
                <Select value={watch("currency")} onValueChange={(value: "USD" | "DOP") => setValue("currency", value)}>
                  <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="DOP">DOP</SelectItem>
                  </SelectContent>
                </Select>
                {errors.currency && <p className="text-valia-danger text-sm mt-1">{errors.currency.message}</p>}
              </div>

              <div>
                <Label htmlFor="status" className="text-valia-ink">
                  Estado
                </Label>
                <Select value={watch("status")} onValueChange={(value: any) => setValue("status", value)}>
                  <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activa">Activa</SelectItem>
                    <SelectItem value="reservada">Reservada</SelectItem>
                    <SelectItem value="vendida">Vendida</SelectItem>
                    <SelectItem value="pausada">Pausada</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-valia-danger text-sm mt-1">{errors.status.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Property Details */}
      {currentStep === 2 && (
        <Card className="bg-valia-surface border-valia-border">
          <CardHeader>
            <CardTitle className="text-valia-ink">Detalles de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="text-valia-ink">
                  Habitaciones
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  {...register("bedrooms", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.bedrooms && <p className="text-valia-danger text-sm mt-1">{errors.bedrooms.message}</p>}
              </div>

              <div>
                <Label htmlFor="bathrooms" className="text-valia-ink">
                  Baños
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  {...register("bathrooms", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.bathrooms && <p className="text-valia-danger text-sm mt-1">{errors.bathrooms.message}</p>}
              </div>

              <div>
                <Label htmlFor="parking" className="text-valia-ink">
                  Parqueos
                </Label>
                <Input
                  id="parking"
                  type="number"
                  min="0"
                  {...register("parking", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.parking && <p className="text-valia-danger text-sm mt-1">{errors.parking.message}</p>}
              </div>

              <div>
                <Label htmlFor="floor" className="text-valia-ink">
                  Piso
                </Label>
                <Input
                  id="floor"
                  type="number"
                  min="0"
                  {...register("floor", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.floor && <p className="text-valia-danger text-sm mt-1">{errors.floor.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="areaBuilt" className="text-valia-ink">
                  Área Construida (m²)
                </Label>
                <Input
                  id="areaBuilt"
                  type="number"
                  min="0"
                  {...register("areaBuilt", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.areaBuilt && <p className="text-valia-danger text-sm mt-1">{errors.areaBuilt.message}</p>}
              </div>

              <div>
                <Label htmlFor="areaLot" className="text-valia-ink">
                  Área del Terreno (m²)
                </Label>
                <Input
                  id="areaLot"
                  type="number"
                  min="0"
                  {...register("areaLot", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.areaLot && <p className="text-valia-danger text-sm mt-1">{errors.areaLot.message}</p>}
              </div>

              <div>
                <Label htmlFor="yearBuilt" className="text-valia-ink">
                  Año de Construcción
                </Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  {...register("yearBuilt", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.yearBuilt && <p className="text-valia-danger text-sm mt-1">{errors.yearBuilt.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maintenanceFee" className="text-valia-ink">
                  Cuota de Mantenimiento
                </Label>
                <Input
                  id="maintenanceFee"
                  type="number"
                  min="0"
                  {...register("maintenanceFee", { valueAsNumber: true })}
                  className="border-valia-border focus:ring-valia-primary"
                />
                {errors.maintenanceFee && (
                  <p className="text-valia-danger text-sm mt-1">{errors.maintenanceFee.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="agentId" className="text-valia-ink">
                  Agente Asignado
                </Label>
                <Select value={watch("agentId") || ""} onValueChange={(value) => setValue("agentId", value || "")}>
                  <SelectTrigger className="border-valia-border focus:ring-valia-primary">
                    <SelectValue placeholder="Seleccionar agente..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin asignar</SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.agentId && <p className="text-valia-danger text-sm mt-1">{errors.agentId.message}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furnished"
                  checked={watch("furnished")}
                  onCheckedChange={(checked) => setValue("furnished", !!checked)}
                />
                <Label htmlFor="furnished" className="text-valia-ink">
                  Amueblado
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={watch("featured")}
                  onCheckedChange={(checked) => setValue("featured", !!checked)}
                />
                <Label htmlFor="featured" className="text-valia-ink">
                  Destacado
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Location */}
      {currentStep === 3 && (
        <Card className="bg-valia-surface border-valia-border">
          <CardHeader>
            <CardTitle className="text-valia-ink">Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-valia-ink">
                  Ciudad *
                </Label>
                <Input id="city" {...register("city")} className="border-valia-border focus:ring-valia-primary" />
                {errors.city && <p className="text-valia-danger text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <Label htmlFor="zone" className="text-valia-ink">
                  Zona/Sector
                </Label>
                <Input id="zone" {...register("zone")} className="border-valia-border focus:ring-valia-primary" />
                {errors.zone && <p className="text-valia-danger text-sm mt-1">{errors.zone.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-valia-ink">
                Dirección Completa
              </Label>
              <Textarea
                id="address"
                {...register("address")}
                rows={3}
                className="border-valia-border focus:ring-valia-primary"
              />
              {errors.address && <p className="text-valia-danger text-sm mt-1">{errors.address.message}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-valia-border text-valia-ink hover:bg-valia-chip bg-transparent"
            >
              Anterior
            </Button>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-valia-border text-valia-muted hover:bg-valia-chip bg-transparent"
          >
            Cancelar
          </Button>

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} className="bg-valia-primary hover:bg-valia-primary-600 text-white">
              Siguiente
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="bg-valia-primary hover:bg-valia-primary-600 text-white">
              {loading ? "Guardando..." : property ? "Actualizar" : "Crear"} Propiedad
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
