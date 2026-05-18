import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://hettrivediself.dpdns.org/sitemap.xml",
    host: "https://hettrivediself.dpdns.org",
  }
}
