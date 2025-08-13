import { mockProperties } from "@/lib/mock-data"
import { PropertyDetails } from "@/components/property-details"
import { notFound } from "next/navigation"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = mockProperties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  return <PropertyDetails property={property} />
}

export function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }))
}
