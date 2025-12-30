import Breadcumb3 from "@/components/blog/Breadcumb3";
import SolutionsSidebarRight from "@/components/blog/SolutionsSidebarRight";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { getSolutionsPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Solutions d'automatisation IA || Fyliz - Agence d'automatisation",
  description:
    "Fyliz - Agence d'automatisation. Découvrez nos solutions d'automatisation et d'intelligence artificielle pour optimiser vos processus métier.",
};

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
      name: "Solutions d'automatisation IA",
      item: `${siteConfig.url}/solutions-automatisation-ia`,
    },
  ],
};

export default async function SolutionsAutomatisationIA() {
  const allPosts = await getSolutionsPosts();

  // JSON-LD pour les solutions d'automatisation IA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteConfig.name} - Solutions d'automatisation IA`,
    headline: `Solutions d'automatisation IA - ${siteConfig.name}`,
    description: `Découvrez nos solutions d'automatisation et d'intelligence artificielle pour optimiser vos processus métier.`,
    image: siteConfig.logo,
    inLanguage: "fr",
    url: `${siteConfig.url}/solutions-automatisation-ia`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <Breadcumb3 pageName="Solutions d'automatisation IA" />
            <SolutionsSidebarRight articles={allPosts} />
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
