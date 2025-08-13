"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Property } from "../../lib/types"

interface ComparisonContextType {
  comparisonList: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: string) => void
  clearComparison: () => void
  isInComparison: (propertyId: string) => boolean
  canAddMore: boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Property[]>([])

  const addToComparison = (property: Property) => {
    if (comparisonList.length < 3 && !comparisonList.find((p) => p.id === property.id)) {
      setComparisonList((prev) => [...prev, property])
    }
  }

  const removeFromComparison = (propertyId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  const isInComparison = (propertyId: string) => {
    return comparisonList.some((p) => p.id === propertyId)
  }

  const canAddMore = comparisonList.length < 3

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddMore,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
