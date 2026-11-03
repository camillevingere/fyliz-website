import LandingPage from "@/components/homes/abonnement/LandingPage";
import { subscription, subscriptionFaq } from "@/data/subscription";
import { siteConfig } from "@/lib/config";
import { ORG_ID, organizationNode, ref } from "@/lib/schema";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";

const title = "Agence automatisation IA : ton équipe IA externalisée | Fyliz";
const description =
  "Fyliz, agence d'automatisation IA : ton équipe IA externalisée conçoit, déploie et maintient tes agents IA, applications et automatisations sur mesure. 3 000 € HT/mois, sans engagement.";

export const metadata: Metadata = {
  ...constructMetadata({ title, description, path: "/" }),
  // `absolute` évite le suffixe « | Fyliz » du template du layout.
  title: { absolute: title },
};

const jsonLd = [
  { "@context": "https://schema.org", ...organizationNode(description) },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description,
    inLanguage: "fr",
    url: siteConfig.url,
    publisher: ref(ORG_ID),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agence d'automatisation IA",
    serviceType: "Agence d'automatisation IA : équipe IA externalisée, agents IA et automatisation des processus",
    description:
      "Une équipe d'experts n8n et IA externalisée qui conçoit, déploie et maintient les automatisations de ton entreprise, sans engagement.",
    provider: ref(ORG_ID),
    areaServed: "FR",
    offers: {
      "@type": "Offer",
      price: subscription.price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: subscription.price,
        priceCurrency: "EUR",
        unitCode: "MON",
        valueAddedTaxIncluded: false,
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: subscriptionFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <LandingPage />
    </>
  );
}
