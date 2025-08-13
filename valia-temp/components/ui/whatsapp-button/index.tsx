"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "../button"

interface WhatsAppButtonProps {
  phone: string
  message?: string
  className?: string
}

export function WhatsAppButton({
  phone,
  message = "Hola, me interesa esta propiedad",
  className,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleClick} className={`bg-green-500 hover:bg-green-600 text-white ${className}`}>
      <MessageCircle className="h-4 w-4 mr-2" />
      WhatsApp
    </Button>
  )
}
