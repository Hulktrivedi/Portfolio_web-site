"use client"

import { useEffect, useRef } from "react"

type Point = { x: number; y: number }
type Route = { points: Point[] }
type Packet = { routeIndex: number; t: number; speed: number; bits: string; lane: 0 | 1 | 2 }
type RouteMeta = { layer: 0 | 1 | 2; group: "name" | "project"; zone: string }
type SegmentMeta = { start: Point; end: Point; length: number; cumulative: number }

const CHIP = {
  cx: 0.5,
  cy: 0.5,
  w: 0.14,
  h: 0.12,
}

function getChipPins() {
  const left = CHIP.cx - CHIP.w / 2
  const right = CHIP.cx + CHIP.w / 2
  const top = CHIP.cy - CHIP.h / 2
  const bottom = CHIP.cy + CHIP.h / 2

  const sideY = [0.18, 0.38, 0.62, 0.82].map((t) => top + CHIP.h * t)
  const sideX = [0.22, 0.4, 0.6, 0.78].map((t) => left + CHIP.w * t)

  return {
    left: sideY.map((y) => ({ x: left, y })),
    right: sideY.map((y) => ({ x: right, y })),
    top: sideX.map((x) => ({ x, y: top })),
    bottom: sideX.map((x) => ({ x, y: bottom })),
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function buildSegments(points: Point[]): { segments: SegmentMeta[]; totalLength: number } {
  const segments: SegmentMeta[] = []
  let cumulative = 0
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i]
    const end = points[i + 1]
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = Math.hypot(dx, dy)
    if (length <= 0) continue
    segments.push({ start, end, length, cumulative })
    cumulative += length
  }
  return { segments, totalLength: cumulative }
}

function sampleAtDistance(
  points: Point[],
  distance: number,
): { point: Point; angle: number } {
  const { segments, totalLength } = buildSegments(points)
  if (segments.length === 0 || totalLength === 0) return { point: points[0], angle: 0 }
  const normalized = ((distance % totalLength) + totalLength) % totalLength

  for (const seg of segments) {
    const local = normalized - seg.cumulative
    if (local <= seg.length) {
      const t = local / seg.length
      const point = {
        x: lerp(seg.start.x, seg.end.x, t),
        y: lerp(seg.start.y, seg.end.y, t),
      }
      const angle = Math.atan2(seg.end.y - seg.start.y, seg.end.x - seg.start.x)
      return { point, angle }
    }
  }

  const last = segments[segments.length - 1]
  return {
    point: last.end,
    angle: Math.atan2(last.end.y - last.start.y, last.end.x - last.start.x),
  }
}

function buildRoutes(): Route[] {
  const pins = getChipPins()
  return [
    { points: [pins.left[1], { x: 0.44, y: pins.left[1].y }, { x: 0.44, y: 0.2 }, { x: 0.14, y: 0.2 }] },
    { points: [pins.right[1], { x: 0.62, y: pins.right[1].y }, { x: 0.62, y: 0.26 }, { x: 0.82, y: 0.26 }] },
    { points: [pins.bottom[1], { x: pins.bottom[1].x, y: 0.68 }, { x: 0.28, y: 0.68 }, { x: 0.28, y: 0.86 }] },
    { points: [pins.bottom[3], { x: 0.66, y: pins.bottom[3].y }, { x: 0.66, y: 0.78 }, { x: 0.88, y: 0.78 }] },
    { points: [pins.left[2], { x: 0.36, y: pins.left[2].y }, { x: 0.36, y: 0.44 }, { x: 0.14, y: 0.44 }] },
    { points: [pins.right[2], { x: 0.56, y: pins.right[2].y }, { x: 0.56, y: 0.62 }, { x: 0.76, y: 0.62 }] },
    { points: [pins.top[2], { x: pins.top[2].x, y: 0.34 }, { x: 0.32, y: 0.34 }, { x: 0.32, y: 0.14 }] },
    { points: [pins.top[3], { x: 0.74, y: pins.top[3].y }, { x: 0.74, y: 0.12 }, { x: 0.9, y: 0.12 }] },
    { points: [pins.bottom[0], { x: 0.24, y: pins.bottom[0].y }, { x: 0.24, y: 0.74 }, { x: 0.1, y: 0.74 }] },
    { points: [pins.bottom[3], { x: 0.68, y: pins.bottom[3].y }, { x: 0.68, y: 0.9 }, { x: 0.92, y: 0.9 }] },
  ]
}

function toBinary(text: string) {
  return text
    .split("")
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ")
}

export function PcbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let tickCount = 0

    const routes = buildRoutes()
    const routeMeta: RouteMeta[] = routes.map((_, i) => ({
      layer: (i % 3) as 0 | 1 | 2,
      group: i === 0 ? "name" : "project",
      zone: i === 0 ? "Het Trivedi" : `P${i}`,
    }))
    const payloads = [
      "Het Trivedi",
      "ChimeraOS",
      "JukeMate",
      "NetBox Deployment Project",
      "Windows Update Automation System",
      "Food-Delicacy App",
      "Logistics Tracking Website",
    ].map(toBinary)
    const routeLengths = routes.map((r) => buildSegments(r.points).totalLength)

    const packets: Packet[] = routes.flatMap((_, i) =>
      Array.from({ length: 3 }, (_, lane) => ({
        routeIndex: i,
        t: (Math.random() + lane * 0.33) % 1,
        speed: 0.0012 + Math.random() * 0.0016,
        bits: payloads[(i + lane) % payloads.length],
        lane: lane as 0 | 1 | 2,
      })),
    )

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawBoard = (parallaxX: number, parallaxY: number) => {
      const bg = ctx.createLinearGradient(0, 0, width, height)
      bg.addColorStop(0, "rgba(10, 61, 38, 0.8)")
      bg.addColorStop(1, "rgba(5, 45, 28, 0.76)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = "rgba(212, 175, 55, 0.1)"
      ctx.lineWidth = 1
      for (let x = -24; x < width + 24; x += 24) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5 + parallaxX * 8, 0)
        ctx.lineTo(x + 0.5 + parallaxX * 8, height)
        ctx.stroke()
      }
      for (let y = -24; y < height + 24; y += 24) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5 + parallaxY * 8)
        ctx.lineTo(width, y + 0.5 + parallaxY * 8)
        ctx.stroke()
      }
    }

    const drawRoutes = (burst: boolean) => {
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      for (let idx = 0; idx < routes.length; idx++) {
        const route = routes[idx]
        const meta = routeMeta[idx]

        ctx.beginPath()
        route.points.forEach((p, idx) => {
          const x = p.x * width
          const y = p.y * height
          if (idx === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })

        const baseAlpha = meta.group === "name" ? 0.42 : 0.34
        const boost = burst && meta.group === "name" ? 0.18 : burst ? 0.08 : 0
        ctx.strokeStyle = `rgba(184, 115, 51, ${baseAlpha + boost})`
        ctx.lineWidth = meta.group === "name" ? 11 : 9
        ctx.stroke()

        ctx.strokeStyle = meta.group === "name" ? "rgba(244, 190, 84, 0.98)" : "rgba(210, 127, 58, 0.95)"
        ctx.lineWidth = meta.group === "name" ? 2.8 : 2.2
        ctx.stroke()
      }
    }

    const drawEndpoints = (burst: boolean) => {
      const seen = new Set<string>()
      for (let routeIdx = 0; routeIdx < routes.length; routeIdx++) {
        const route = routes[routeIdx]
        for (const p of route.points) {
          const key = `${p.x.toFixed(3)}-${p.y.toFixed(3)}`
          if (seen.has(key)) continue
          seen.add(key)
          const x = p.x * width
          const y = p.y * height

          ctx.fillStyle = "rgba(244, 216, 122, 0.98)"
          ctx.beginPath()
          ctx.arc(x, y, 2.2, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = burst ? "rgba(255, 230, 128, 0.85)" : "rgba(255, 215, 0, 0.6)"
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(x, y, 5.5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    const drawCoreChip = (burst: boolean) => {
      const cx = width * CHIP.cx
      const cy = height * CHIP.cy
      const pulse = 1 + Math.sin(tickCount * 0.06) * (burst ? 0.12 : 0.06)
      const chipW = width * CHIP.w
      const chipH = height * CHIP.h
      const left = cx - chipW / 2
      const top = cy - chipH / 2

      ctx.fillStyle = "rgba(22, 34, 28, 0.98)"
      ctx.fillRect(left, top, chipW, chipH)
      ctx.strokeStyle = "rgba(255, 215, 0, 0.85)"
      ctx.lineWidth = 1.6
      ctx.strokeRect(left, top, chipW, chipH)

      ctx.fillStyle = "rgba(18, 27, 22, 0.95)"
      ctx.fillRect(left + 8, top + 8, chipW - 16, chipH - 16)
      ctx.strokeStyle = "rgba(214, 169, 78, 0.65)"
      ctx.lineWidth = 1
      ctx.strokeRect(left + 8, top + 8, chipW - 16, chipH - 16)

      const pinLen = 8
      const pinW = 5
      const leftPins = [top + 12, top + 24, top + 36, top + 48]
      const rightPins = [top + 12, top + 24, top + 36, top + 48]
      const topPins = [left + 20, left + 36, left + 52, left + 68]
      const bottomPins = [left + 20, left + 36, left + 52, left + 68]

      ctx.fillStyle = "rgba(226, 179, 88, 0.95)"
      for (const y of leftPins) ctx.fillRect(left - pinLen, y - pinW / 2, pinLen, pinW)
      for (const y of rightPins) ctx.fillRect(left + chipW, y - pinW / 2, pinLen, pinW)
      for (const x of topPins) ctx.fillRect(x - pinW / 2, top - pinLen, pinW, pinLen)
      for (const x of bottomPins) ctx.fillRect(x - pinW / 2, top + chipH, pinW, pinLen)

      ctx.fillStyle = "rgba(248, 232, 167, 0.95)"
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("HET", cx, cy - 7)
      ctx.fillText("CORE", cx, cy + 6)

      ctx.beginPath()
      ctx.arc(cx, cy, 26 * pulse, 0, Math.PI * 2)
      ctx.strokeStyle = burst ? "rgba(255, 223, 128, 0.48)" : "rgba(255, 223, 128, 0.24)"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const drawZones = () => {
      const labels = [
        { text: "SOURCE: HET TRIVEDI", x: 0.05, y: 0.08 },
        { text: "PROJECT CLUSTER A", x: 0.74, y: 0.08 },
        { text: "PROJECT CLUSTER B", x: 0.72, y: 0.92 },
        { text: "PROJECT CLUSTER C", x: 0.06, y: 0.92 },
      ]
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      for (const label of labels) {
        ctx.fillStyle = "rgba(248, 232, 167, 0.75)"
        ctx.fillText(label.text, label.x * width, label.y * height)
      }

      ctx.strokeStyle = "rgba(255, 223, 128, 0.7)"
      ctx.lineWidth = 1.3
      ctx.beginPath()
      ctx.moveTo(width * 0.22, height * 0.1)
      ctx.lineTo(width * 0.18, height * 0.2)
      ctx.lineTo(width * 0.14, height * 0.2)
      ctx.stroke()
    }

    const drawPackets = (burst: boolean) => {
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      for (const packet of packets) {
        const route = routes[packet.routeIndex]
        const meta = routeMeta[packet.routeIndex]
        const stream = packet.bits.replaceAll(" ", "")
        const chunkSize = burst ? 16 : 12
        const start = Math.floor(packet.t * stream.length) % stream.length
        const chunk = (stream + stream).slice(start, start + chunkSize)
        const routeLengthPx = routeLengths[packet.routeIndex] * Math.min(width, height)
        const headDistance = packet.t * routeLengthPx
        const spacing = 6
        const trailSpan = chunk.length * spacing
        const parallaxLane = packet.lane === 0 ? -0.35 : packet.lane === 1 ? 0 : 0.35

        for (let i = 0; i < chunk.length; i++) {
          const ch = chunk[i]
          const d = headDistance - trailSpan + i * spacing
          const sample = sampleAtDistance(route.points, d / Math.min(width, height))
          const x = sample.point.x * width + parallaxLane
          const y = sample.point.y * height + parallaxLane

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(sample.angle)

          const alpha = 0.18 + (i / chunk.length) * 0.82
          if (meta.group === "name") {
            ctx.fillStyle = ch === "1" ? `rgba(255, 236, 170, ${alpha})` : `rgba(230, 185, 95, ${alpha * 0.95})`
          } else {
            ctx.fillStyle = ch === "1" ? `rgba(255, 223, 128, ${alpha})` : `rgba(214, 169, 78, ${alpha * 0.95})`
          }
          ctx.fillText(ch, 0, 0)
          ctx.restore()
        }

        const headSample = sampleAtDistance(route.points, headDistance / Math.min(width, height))
        const hx = headSample.point.x * width + parallaxLane
        const hy = headSample.point.y * height + parallaxLane

        ctx.beginPath()
        ctx.fillStyle = meta.group === "name" ? "rgba(255, 230, 155, 0.98)" : "rgba(255, 219, 112, 0.92)"
        ctx.arc(hx, hy, burst && meta.group === "name" ? 2.9 : 2.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      tickCount += 1
      const burst = tickCount % 420 > 320
      const parallaxX = Math.sin(tickCount * 0.01) * 0.7
      const parallaxY = Math.cos(tickCount * 0.012) * 0.5

      drawBoard(parallaxX, parallaxY)
      drawRoutes(burst)
      drawCoreChip(burst)
      drawZones()
      drawEndpoints(burst)
      drawPackets(burst)

      if (!reduceMotion) {
        for (const packet of packets) {
          const speedBoost = burst ? 1.9 : 1
          packet.t += packet.speed * speedBoost
          if (packet.t >= 1) {
            packet.t = 0
            packet.bits = payloads[(packet.routeIndex + Math.floor(Math.random() * payloads.length)) % payloads.length]
          }
        }
        raf = requestAnimationFrame(tick)
      }
    }

    resize()
    tick()

    const observer = new ResizeObserver(() => resize())
    observer.observe(canvas)
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-90 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
    />
  )
}
