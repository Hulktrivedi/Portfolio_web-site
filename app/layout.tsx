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
  title: "Het Trivedi — Portfolio",
  description: "Computer Networking Professional | Aspiring AI/ML Specialist",
  generator: "v0.app",
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
    title: "Het Trivedi — Portfolio",
    description: "Blending IT infrastructure, automation, and software with a passion for AI.",
    url: "https://example.com",
    siteName: "Het Trivedi — Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
