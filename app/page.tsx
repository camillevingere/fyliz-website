import Home9 from "@/components/home-9/page";
import { siteConfig } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  headline: siteConfig.title,
  description: siteConfig.description,
  image: `${siteConfig.url}/og.png`,
  inLanguage: "fr",
  url: siteConfig.url,
};

export default function page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Home9 />
    </main>

  );
}
