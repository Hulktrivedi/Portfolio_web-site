import { createClient } from "@sanity/client"

export type PortfolioProject = {
  slug: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  status: "wip" | "completed"
  href?: string
}

const fallbackProjects: PortfolioProject[] = [
  {
    slug: "chimeraos",
    title: "ChimeraOS",
    description:
      "A next-gen open-source operating system concept focused on performance, security, and extensibility.",
    image: "/chiameraostmplogo.png",
    status: "wip",
  },
  {
    slug: "jukemate",
    title: "JukeMate",
    description:
      "An offline-first music workflow tool for converting and preserving playlists in high-quality formats.",
    image: "/JukeMateLogo.svg",
    status: "wip",
  },
  {
    slug: "netbox-deployment",
    title: "NetBox Deployment Project",
    description: "Network automation and asset lifecycle tracking powered by NetBox.",
    image: "/NetBoxLogo.svg",
    status: "completed",
  },
  {
    slug: "windows-update-automation",
    title: "Windows Update Automation System",
    description: "Virtualized pre-deployment testing pipeline for staged enterprise rollouts.",
    image: "/OSUPDATELogo.svg",
    status: "completed",
  },
  {
    slug: "food-delicacy-app",
    title: "Food-Delicacy App",
    description: "Product concept for scaling regional Indian delicacies across nationwide delivery.",
    image: "/FoodSaaSLogo.svg",
    status: "wip",
  },
  {
    slug: "logistics-tracking",
    title: "Logistics Tracking Website",
    description: "Multi-carrier tracking portal with AWB integration.",
    image: "/LogisticsTrackingLogo.svg",
    status: "completed",
  },
]

const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    process.env.NEXT_PUBLIC_SANITY_API_VERSION,
)

const sanityClient = hasSanityConfig
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
      useCdn: true,
      perspective: "published",
    })
  : null

const PROJECTS_QUERY = `*[_type == "project"] | order(orderRank asc, _createdAt desc){
  "slug": slug.current,
  title,
  description,
  "image": image.asset->url,
  "imageAlt": image.alt,
  status,
  href
}`

export async function getProjects(): Promise<PortfolioProject[]> {
  if (!sanityClient) return fallbackProjects

  try {
    const projects = await sanityClient.fetch<PortfolioProject[]>(PROJECTS_QUERY, {}, { next: { revalidate: 300 } })
    return projects?.length ? projects : fallbackProjects
  } catch {
    return fallbackProjects
  }
}
