import type { WithContext, Person } from "schema-dts"
import { Github, Linkedin, Mail, ArrowUpRight, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProjects } from "@/lib/cms/projects"
import { PcbCanvas } from "@/components/pcb-canvas"

const skills = [
  "Network Operations",
  "Systems Automation",
  "Linux & Windows Administration",
  "Next.js / TypeScript",
  "Deployment & Hosting",
]

export default async function Page() {
  const projects = await getProjects()

  const personJsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Het Trivedi",
    url: "https://hettrivediself.dpdns.org",
    sameAs: ["https://github.com/Hulktrivedi", "https://www.linkedin.com/in/hettrivedi2904"],
    jobTitle: "Computer Networking Professional",
  }

  return (
    <div id="home" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,theme(colors.slate.200/30)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.200/30)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,theme(colors.slate.800/35)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.800/35)_1px,transparent_1px)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-background/22 dark:bg-background/20" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <PcbCanvas />
      </div>

      <section className="reveal-up mx-auto max-w-6xl px-4 pb-10 pt-20 sm:pt-28">
        <div className="glass max-w-4xl rounded-lg p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.12em] text-foreground/70">Portfolio</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">Het Trivedi</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/92">
            I build dependable systems across infrastructure, networking, and software. This site is a focused
            snapshot of practical work, engineering judgment, and outcomes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-background/62 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="reveal-up mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <article className="glass space-y-4 rounded-lg p-6">
            <h2 className="text-2xl font-semibold tracking-tight">About</h2>
            <p className="leading-relaxed text-foreground/85">
              India-based professional with a background in enterprise IT support and network operations. I’ve handled
              diagnostics, maintenance, and rollout workflows at scale, including staged Windows update testing across
              virtualized environments.
            </p>
            <p className="leading-relaxed text-foreground/85">
              My long-term direction is at the intersection of resilient systems and intelligent software. I care
              about reliability, delivery speed, and clear technical trade-offs.
            </p>
          </article>
          <aside className="glass rounded-lg p-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">Core Skills</h3>
            <ul className="mt-4 space-y-3">
              {skills.map((skill) => (
                <li key={skill} className="text-sm text-foreground/90">
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="resume" className="reveal-up mx-auto max-w-6xl px-4 py-12">
        <div className="glass rounded-lg p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Resume</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Experience in networking operations, systems administration, automation workflows, and product-facing web
            builds. Resume is available as PDF.
          </p>
          <div className="mt-5">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <Download className="size-4" />
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="reveal-up mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-muted-foreground">Powered by CMS content with fallback data</p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="h-full">
              <article className="glass project-card fx-border-glow flex h-full flex-col rounded-lg p-4 transition-colors hover:border-sky-300/50 dark:hover:border-sky-700/50">
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md bg-secondary">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.imageAlt || `${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-3"
                  />
                </div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 grow text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                  {project.href ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition-colors hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Visit
                      <ArrowUpRight className="size-4" />
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="reveal-up mx-auto max-w-6xl px-4 py-12">
        <div className="glass grid gap-8 rounded-lg p-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              I am currently focused on building and shipping, but I’m always open to meaningful conversations around
              systems, product, and collaboration.
            </p>
            <a
              href="mailto:hettrivedi63@gmail.com"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <Mail className="size-4" />
              Email Me
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">Social</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/Hulktrivedi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-sky-700 dark:hover:text-sky-300"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hettrivedi2904"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-sky-700 dark:hover:text-sky-300"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
