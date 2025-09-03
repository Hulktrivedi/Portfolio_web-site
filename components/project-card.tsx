"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ProjectCardProps = {
  title: string
  description: string
  imageAlt: string
  href?: string
  status?: "wip" | "done"
}

export function ProjectCard({ title, description, imageAlt, href = "#", status }: ProjectCardProps) {
  return (
    <Card className="transition-colors hover:border-sky-300/40 hover:shadow-sm hover:shadow-sky-200/30 dark:hover:shadow-sky-900/40">
      <CardHeader>
        <CardTitle className="text-balance">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <img src="/placeholder-1u5uy.png" alt={imageAlt} className="h-40 w-full rounded-md object-cover" />
        <p className="text-sm text-muted-foreground text-pretty">{description}</p>
        {status === "wip" && (
          <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-950/30 dark:text-teal-300">
            Work in progress
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="hover:border-sky-300 hover:bg-secondary">
          <a href={href} aria-disabled={href === "#"} onClick={(e) => href === "#" && e.preventDefault()}>
            Details
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
