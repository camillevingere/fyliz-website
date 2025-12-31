import { getBlogPosts } from "@/lib/blog";
import { GetTemplates } from "@/lib/templates/templates.action";
import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { Template } from "@prisma/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getBlogPosts();
  const templates = await GetTemplates();
  const headersList = headers();
  let domain = headersList.get("host") as string;
  let protocol = "https";

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${protocol}://${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    {
      url: `${protocol}://${domain}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    ...allPosts.map(
      (post) =>
        ({
          url: `${protocol}://${domain}/blog/${post.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
        }) as const
    ),
    ...templates.map(
      (template: Partial<Template>) =>
        ({
          url: `${protocol}://${domain}/templates/${template.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
        }) as const
    ),
  ];
}
