"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact — ${name || "No name"}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:hettrivedi63@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can I help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
        />
      </div>
      <Button type="submit" className="bg-sky-600 text-white hover:bg-sky-700">
        Send Message
      </Button>
    </form>
  )
}
