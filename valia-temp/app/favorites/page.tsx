"use client"
import { useFavorites } from "../../components/favorites/favorites-provider"
import { PropertyCard } from "../../components/property-card"
import { Button } from "../../components/ui/button"
import { Heart, Trash2 } from "lucide-react"

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-valia-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-valia-muted mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-valia-ink mb-2">Sin Favoritos</h1>
            <p className="text-valia-muted mb-6">Aún no has guardado ninguna propiedad en tus favoritos.</p>
            <Button
              onClick={() => (window.location.href = "/properties")}
              className="bg-valia-primary hover:bg-valia-primary-600 text-white"
            >
              Explorar Propiedades
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-valia-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-valia-ink mb-2">Mis Favoritos</h1>
            <p className="text-valia-muted">
              {favorites.length} {favorites.length === 1 ? "propiedad guardada" : "propiedades guardadas"}
            </p>
          </div>
          <Button
            onClick={clearFavorites}
            variant="outline"
            className="border-valia-danger text-valia-danger hover:bg-valia-danger hover:text-white bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar Todo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
