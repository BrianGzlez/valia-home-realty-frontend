"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Property } from "../../lib/types"

interface FavoritesContextType {
  favorites: Property[]
  addToFavorites: (property: Property) => void
  removeFromFavorites: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Property[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("valia-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("valia-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (property: Property) => {
    setFavorites((prev) => [...prev.filter((p) => p.id !== property.id), property])
  }

  const removeFromFavorites = (propertyId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const isFavorite = (propertyId: string) => {
    return favorites.some((p) => p.id === propertyId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
