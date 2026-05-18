import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavbar } from "@/components/site-navbar"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://hettrivediself.dpdns.org"),
  title: {
    default: "Het Trivedi | Portfolio",
    template: "%s | Het Trivedi",
  },
  description:
    "Portfolio of Het Trivedi. Networking, systems automation, and product-minded engineering work.",
  generator: "v0.app",
  applicationName: "Het Trivedi Portfolio",
  keywords: [
    "Het Trivedi",
    "Networking",
    "Automation",
    "AI/ML",
    "Portfolio",
    "NetBox",
    "Vercel",
    "Next.js",
    "TailwindCSS",
  ],
  openGraph: {
    title: "Het Trivedi | Portfolio",
    description: "Networking, systems automation, and product-minded engineering work.",
    url: "https://hettrivediself.dpdns.org",
    siteName: "Het Trivedi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Het Trivedi | Portfolio",
    description: "Networking, systems automation, and product-minded engineering work.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg"
          >
            Skip to main content
          </a>
          {/* SVG filter for liquid-glass specular distortion — Chrome enhances, others skip */}
        <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            <filter id="liquid-glass-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.035" numOctaves="2" seed="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <Suspense fallback={<div>Loading...</div>}>
            <SiteNavbar />
            <main id="main" className="min-h-dvh">
              {children}
            </main>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
