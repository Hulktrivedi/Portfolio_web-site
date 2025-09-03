"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export function SiteNavbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
      role="banner"
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="#home" className="font-semibold tracking-tight">
          Het Trivedi
          <span className="sr-only">Go to home</span>
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
