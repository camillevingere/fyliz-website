import Breadcumb3 from "@/components/blog/Breadcumb3";
import CustomerCaseSidebarRight from "@/components/blog/CustomerCaseSidebarRight";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
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
    description: `Derniers cas clients et témoignages sur ${siteConfig.name}.`,
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
      <div className="theme-5 theme-5-light">
        <div
          className="bp-xs page-wrapper bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 dark:bg-black dark:text-gray-200"
          style={{ overflowX: "clip" }}
        >
          <Header8 />
          <div id="wrapper" className="wrap">
            <Breadcumb3 pageName="Nos cas clients" />
            <CustomerCaseSidebarRight articles={articles} />
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
