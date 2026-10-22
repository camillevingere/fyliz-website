import {
  getBlogPosts,
  getCustomerCasePosts,
} from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { MetadataRoute } from "next";

// Régénéré toutes les heures : un nouvel article ou cas client publié en base y apparaît sans redéploiement.
export const revalidate = 3600;

/**
 * La vraie date d'une collection : la dernière modification de ce qu'elle liste.
 * `new Date()` sur chaque page dit au crawler que tout change à chaque build ;
 * au bout de quelques builds, Google cesse de se fier à la balise.
 */
function latestUpdate(...collections: { updatedAt?: string | Date; publishedAt: string | Date }[][]) {
  const times = collections
    .flat()
    .map((post) => new Date(post.updatedAt || post.publishedAt).getTime())
    .filter((time) => !Number.isNaN(time));
  return times.length > 0 ? new Date(Math.max(...times)) : new Date();
}

// Pages codées en dur : date de leur dernière évolution éditoriale, à mettre à jour avec elles.
const editedAt = {
  home: new Date("2026-10-22"),
  agenceN8n: new Date("2026-10-14"),
  solutions: new Date("2026-10-22"),
  legal: new Date("2025-12-30"),
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getBlogPosts("fr");
  const customerCases = await getCustomerCasePosts("fr");
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: editedAt.home,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestUpdate(allPosts),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cas-clients`,
      lastModified: latestUpdate(customerCases),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agence-n8n`,
      lastModified: editedAt.agenceN8n,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions-automatisation-ia`,
      lastModified: editedAt.solutions,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal/conditions-generales-de-vente`,
      lastModified: editedAt.legal,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/mentions-legales`,
      lastModified: editedAt.legal,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/politique-de-confidentialite`,
      lastModified: editedAt.legal,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  const blogPosts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic customer case posts
  const customerCasePosts = customerCases.map((post) => ({
    url: `${baseUrl}/cas-clients/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));


  return [
    ...staticPages,
    ...blogPosts,
    ...customerCasePosts,
  ];
}
