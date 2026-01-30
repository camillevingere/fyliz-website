import Breadcumb3 from "@/components/blog/Breadcumb3";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { getN8nWorkflowPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import { constructMetadata } from "@/lib/utils";
import AutomatisationsN8nClient from "./page-client";

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
      <div className="theme-5 theme-5-light">
        <div
          className="bp-xs page-wrapper bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 dark:bg-black dark:text-gray-200"
          style={{ overflowX: "clip" }}
        >
          <Header8 />
          <div id="wrapper" className="wrap">
            <Breadcumb3 pageName="Automatisations n8n" />
            <AutomatisationsN8nClient workflows={workflows} />
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
