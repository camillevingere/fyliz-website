import BlogSidebarRight from "@/components/blog/BlogSidebarRight";
import Breadcumb3 from "@/components/blog/Breadcumb3";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog",
  description: `Dernières news sur l'automatisation IA.`,
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
      name: "Blog",
      item: `${siteConfig.url}/blog`,
    },
  ],
};

export default async function Blog() {
  const allPosts = await getBlogPosts("fr");

  const articles = await Promise.all(
    allPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  );

  // JSON-LD avec les articles récents
  const jsonLdWithPosts = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    headline: `Blog - ${siteConfig.name}`,
    description: `Dernières news sur l'automatisation IA.`,
    image: siteConfig.logo,
    inLanguage: "fr",
    url: `${siteConfig.url}/blog`,
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
      url: `${siteConfig.url}/blog/${post.slug}`,
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
            <Breadcumb3 pageName="Blog" />
            <BlogSidebarRight articles={articles} />
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
