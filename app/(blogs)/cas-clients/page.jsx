import ListPage from "@/components/site/ListPage";
import PostCards from "@/components/site/PostCards";
import { toPostCards } from "@/components/site/toPostCards";
import { getCustomerCasePosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Nos cas clients",
  description: `Nos cas clients | ${siteConfig.name}.`,
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
      name: "Nos cas clients",
      item: `${siteConfig.url}/cas-clients`,
    },
  ],
};

export default async function CasClients() {
  const allPosts = await getCustomerCasePosts("fr");

  const articles = await Promise.all(
    allPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  );

  // JSON-LD avec les articles récents
  const jsonLdWithPosts = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} - Nos cas clients`,
    headline: `Nos cas clients - ${siteConfig.name}`,
    description: `Derniers cas clients d'automatisation IA de ${siteConfig.name}.`,
    image: siteConfig.logo,
    inLanguage: "fr",
    url: `${siteConfig.url}/cas-clients`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    blogPost: articles.slice(0, 5).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.url}/cas-clients/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author || `Équipe ${siteConfig.name}`,
      },
      image: post.image || siteConfig.logo,
      description: post.description,
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
        crumb="Cas clients"
        title="Nos cas"
        accent="clients"
        intro="Workflows n8n et agents IA en production chez nos clients : le problème de départ, ce qu'on a construit, les résultats."
      >
        <PostCards posts={await toPostCards(articles, "/cas-clients", { defaultCategory: "Cas client" })} />
      </ListPage>
    </>
  );
}
