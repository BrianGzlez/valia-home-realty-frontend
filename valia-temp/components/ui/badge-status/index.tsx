import { cn } from "../../../lib/utils"
import type { Status } from "../../../lib/types"

interface BadgeStatusProps {
  status: Status
  className?: string
}

export function BadgeStatus({ status, className }: BadgeStatusProps) {
  const variants = {
    activa: "bg-valia-success text-white",
    reservada: "bg-valia-warning text-white",
    vendida: "bg-gray-500 text-white",
    pausada: "bg-valia-chip text-valia-muted",
  }

  const labels = {
    activa: "Activa",
    reservada: "Reservada",
    vendida: "Vendida",
    pausada: "Pausada",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  )
}
