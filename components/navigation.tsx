"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "Properties", href: "/properties" },
      { name: "Agents", href: "/agents" },
      { name: "Contact", href: "/contact" },
    ],
    []
  )

  const phone = process.env.NEXT_PUBLIC_WA_PHONE || "+1-809-816-6766"
  const linkBase = "relative transition-colors font-medium"
  const linkUnderline =
    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-[width] hover:after:w-full"

  return (
    <nav className="sticky top-0 z-50 border-b bg-valia-surface text-valia-ink border-valia-border shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-xl md:text-2xl text-valia-ink font-semibold tracking-tight">
              Valía Home
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={[
                    linkBase,
                    linkUnderline,
                    active ? "text-valia-primary" : "text-valia-ink/80 hover:text-valia-ink",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Teléfono */}
            <a
              href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
              className="hidden lg:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-valia-border text-valia-ink hover:bg-valia-card/60 transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{phone}</span>
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-valia-ink">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="p-5 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-semibold">Valía Home</span>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "block rounded-xl px-4 py-3 text-base transition-colors",
                          active ? "bg-valia-primary/10 text-valia-primary" : "hover:bg-muted/40",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    )
                  })}

                  <div className="pt-4">
                    <a
                      href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
                      className="flex items-center gap-2 rounded-xl border border-valia-border px-4 py-3 text-valia-ink hover:bg-muted/40 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">{phone}</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
