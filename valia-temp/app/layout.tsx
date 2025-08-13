import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Open_Sans } from "next/font/google"
import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"
import { Toaster } from "../components/ui/toaster"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Valía Home Realty - Premium Real Estate in Dominican Republic",
  description:
    "Find your dream home with Valía Home Realty. Premium properties for sale and rent in the Dominican Republic.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans bg-valia-bg text-valia-ink">
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
