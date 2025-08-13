"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createDataClient } from "@/lib/data-client"
import type { Inquiry } from "@/lib/types"
import { Search, Eye, MessageSquare, Phone, Mail } from "lucide-react"

export function InquiryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const dataClient = createDataClient("mock")
        const inquiryData = await dataClient.inquiries.list()
        setInquiries(inquiryData)
      } catch (error) {
        console.error("Error loading inquiries:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInquiries()
  }, [])

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesType = typeFilter === "all" || inquiry.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-valia-info/10 text-valia-info"
      case "contacted":
        return "bg-valia-warning/10 text-valia-warning"
      case "scheduled":
        return "bg-valia-primary/10 text-valia-primary"
      case "closed":
        return "bg-valia-success/10 text-valia-success"
      default:
        return "bg-valia-chip text-valia-ink"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "viewing":
        return "bg-valia-primary/10 text-valia-primary"
      case "info":
        return "bg-valia-info/10 text-valia-info"
      case "offer":
        return "bg-valia-success/10 text-valia-success"
      default:
        return "bg-valia-chip text-valia-ink"
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-valia-muted">Cargando consultas...</div>
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Consultas ({filteredInquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-valia-muted" />
              <Input
                placeholder="Buscar consultas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="contacted">Contactado</SelectItem>
                <SelectItem value="scheduled">Programado</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="viewing">Visita</SelectItem>
                <SelectItem value="info">Información</SelectItem>
                <SelectItem value="offer">Oferta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-valia-ink text-lg">{inquiry.name}</h3>
                    <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    <Badge className={getTypeColor(inquiry.type)}>{inquiry.type}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-valia-muted">Información de Contacto</p>
                      <p className="text-sm font-medium text-valia-ink">{inquiry.email}</p>
                      {inquiry.phone && <p className="text-sm font-medium text-valia-ink">{inquiry.phone}</p>}
                    </div>
                    <div>
                      <p className="text-sm text-valia-muted">Propiedad</p>
                      <p className="text-sm font-medium text-valia-ink">ID: {inquiry.propertyId}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-valia-muted">Mensaje</p>
                    <p className="text-sm text-valia-ink">{inquiry.message}</p>
                  </div>

                  <p className="text-xs text-valia-muted">
                    Recibido: {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar Cliente
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-valia-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-valia-ink mb-2">No se encontraron consultas</h3>
            <p className="text-valia-muted">Intenta ajustar tu búsqueda o filtros</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
