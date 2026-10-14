import ListPage from "@/components/site/ListPage";
import { getN8nWorkflowPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import { constructMetadata } from "@/lib/utils";
import AutomatisationsN8nClient from "./page-client";

export const revalidate = 432000; // 5 days — regenerate before presigned URLs expire (7 days)

export const metadata = constructMetadata({
  title: "Automatisations n8n",
  description: `Automatisations n8n | ${siteConfig.name}.`,
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Automatisations n8n",
      item: `${siteConfig.url}/automatisations-n8n`,
    },
  ],
};

export default async function AutomatisationsN8n() {
  const allPosts = await getN8nWorkflowPosts("fr");

  const workflows = await Promise.all(
    allPosts
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(async (workflow) => {
        const signedImage =
          (await getSignedImageUrl(workflow.image || null)) ||
          "/images/default-blog.webp";
        return {
          ...workflow,
          image: signedImage,
        };
      }),
  );

  // JSON-LD avec les workflows récents
  const jsonLdWithPosts = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} - Automatisations n8n`,
    headline: `Automatisations n8n - ${siteConfig.name}`,
    description: `Automatisations n8n en français.`,
    image: siteConfig.logo,
    inLanguage: "fr",
    url: `${siteConfig.url}/automatisations-n8n`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    blogPost: workflows.slice(0, 5).map((workflow) => ({
      "@type": "BlogPosting",
      headline: workflow.title,
      url: `${siteConfig.url}/automatisations-n8n/${workflow.slug}`,
      datePublished: workflow.publishedAt,
      author: {
        "@type": "Person",
        name: workflow.author || `Équipe ${siteConfig.name}`,
      },
      image: workflow.image || siteConfig.logo,
      description: workflow.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWithPosts) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ListPage
        crumb="Automatisations n8n"
        title="Automatisations"
        accent="n8n"
        intro="Des workflows n8n en français, expliqués pas à pas et prêts à importer dans ton instance."
      >
        <AutomatisationsN8nClient workflows={workflows} />
      </ListPage>
    </>
  );
}
