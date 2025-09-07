import { Button } from "@/components/ui/button"
import  ProjectCard  from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Page() {
  return (
    <div id="home" className="relative">
      {/* Subtle technical background: faint grid + trace-like divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,theme(colors.slate.200/25)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.200/25)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,theme(colors.slate.800/35)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.800/35)_1px,transparent_1px)]"
      />
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:pt-20">
        <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">Het Trivedi</h1>
        <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
          Computer Networking Professional | Aspiring AI/ML Specialist
        </p>
        <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
          India Based, comfortable to move to another place (Europe, USA, Japan preferred if the employer is providing
          support).
        </p>
        <p className="mt-4 max-w-3xl text-pretty leading-relaxed">
          Blending expertise in IT infrastructure, automation, and software with a passion for innovation and artificial
          intelligence.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
            <a href="#resume">View Resume</a>
          </Button>
          <Button asChild variant="outline" className="hover:border-sky-300 hover:text-sky-700 bg-transparent">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-balance">About Me</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>India-based professional with a B.C.A (Bachelor in Computer Applications).</li>
          <li>
            Experienced in computer networking — supervised ~420 PCs, handled diagnostics, troubleshooting, and
            enterprise-scale maintenance.
          </li>
          <li>
            Specialized in automation workflows, including testing Windows updates in virtual environments before
            large-scale deployments.
          </li>
          <li>
            Skilled in web development, SaaS hosting, and app deployment, with projects covering logistics systems and
            regional e-commerce.
          </li>
          <li>Exploring AI/ML with long-term goal of pursuing a Master’s degree and entrepreneurship.</li>
        </ul>
      </section>

      {/* Resume */}
      <section id="resume" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-balance">Resume</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Education</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>B.C.A (Bachelor of Computer Applications)</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Key Skills</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Computer Networking, IT Automation, Ubuntu/Linux, Windows System Management, SaaS Hosting, GitHub,
              Next.js, TailwindCSS, NetBox, Vercel Deployment
            </p>
          </div>
          <div className="rounded-lg border p-4 md:col-span-2">
            <h3 className="text-lg font-medium">Tools & Technologies</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Virtual Machines, Automation Scripts, Networking Tools, Web Frameworks
            </p>
            <div className="mt-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                title="Place your resume at public/resume.pdf"
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold text-balance">Projects</h2>
          {/* Future-ready: filters placeholder */}
          <div className="text-xs text-muted-foreground" aria-live="polite">
            Filters (Networking | Software) — coming soon
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="ChimeraOS"
            description="ChimaeraOS is a next-gen, open-source operating system focused on speed, security, and adaptability. Its sleek interface and robust architecture make it perfect for both developers and everyday users."
            image="/chiameraostmplogo.png"
            imageAlt="ChimeraOS placeholder"
            status="wip"
          />
          <ProjectCard
            title="JukeMate"
            description="JukeMate is a powerful tool for offline music lovers, converting and storing playlists from multiple streaming platforms in lossless formats like FLAC."
            image="/JukeMateLogo.svg"
            imageAlt="JukeMate placeholder"
            status="wip"
          />
          <ProjectCard
            title="NetBox Deployment Project"
            description="Network automation & management leveraging NetBox for inventory and change tracking."
            image="/NetBoxLogo.svg"
            imageAlt="NetBox Deployment placeholder"
          />
          <ProjectCard
            title="Windows Update Automation System"
            description="Virtual machine testing pipeline prior to deploying updates to ~420 PCs."
            image="/OSUPDATELogo.svg"
            imageAlt="Windows Update Automation placeholder"
          />
          <ProjectCard
            title="Food-Delicacy App"
            description="Concept to make regional Indian delicacies available nationwide."
            image="/FoodSaaSLogo.svg"
            imageAlt="Food-Delicacy App placeholder"
          />
          <ProjectCard
            title="Logistics Tracking Website"
            description="Multi-carrier tracking with AWB integration."
            image="/LogisticsTrackingLogo.svg"
            imageAlt="Logistics Tracking placeholder"
          />
        </div>

        {/* Future-ready: blog placeholder */}
        <div className="mt-10 rounded-lg border border-dashed p-4">
          <p className="text-sm text-muted-foreground">Blog / Writings — coming soon</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-balance">Contact</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <div>
            <ContactForm />
            <p className="mt-3 text-sm">
              Or email directly:{" "}
              <a
                className="text-sky-700 underline underline-offset-4 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                href="mailto:hettrivedi63@gmail.com"
              >
                hettrivedi63@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Social</h3>
            <p className="mt-2 text-sm text-muted-foreground">Links</p>
            <div className="mt-3 flex gap-3">
              <a
                href="https://github.com/Hulktrivedi"
                aria-label="GitHub"
                className="group inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors hover:border-sky-300 hover:bg-secondary"
              >
                <Github className="size-5 text-foreground/80 group-hover:text-sky-700 dark:group-hover:text-sky-400" />
              </a>
              <a
                href="www.linkedin.com/in/hettrivedi2904"
                aria-label="LinkedIn"
                className="group inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors hover:border-sky-300 hover:bg-secondary"
              >
                <Linkedin className="size-5 text-foreground/80 group-hover:text-sky-700 dark:group-hover:text-sky-400" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="group inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors hover:border-sky-300 hover:bg-secondary"
              >
                <Twitter className="size-5 text-foreground/80 group-hover:text-sky-700 dark:group-hover:text-sky-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <p className="text-sm text-muted-foreground">© Het Trivedi {new Date().getFullYear()}</p>
          <div className="flex gap-3">
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs text-muted-foreground">
              GitHub
            </span>
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs text-muted-foreground">
              LinkedIn
            </span>
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs text-muted-foreground">
              Twitter
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
