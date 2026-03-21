import { MetadataRoute } from "next";
import { AREA_SLUGS } from "@/lib/areaPages";
import { SERVICE_SLUGS } from "@/lib/servicePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luisbety.com";
  const now = new Date();

  const rootEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const areaEntries: MetadataRoute.Sitemap = AREA_SLUGS.map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: slug === "orlando" ? 0.85 : 0.8,
  }));

  const comboEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.flatMap((service) =>
    AREA_SLUGS.map((area) => ({
      url: `${baseUrl}/servicios/${service}/${area}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: area === "orlando" ? 0.82 : 0.75,
    }))
  );

  return [...rootEntries, ...serviceEntries, ...areaEntries, ...comboEntries];
}
