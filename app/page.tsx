import LandingPage from "@/components/homes/abonnement/LandingPage";
import { subscription, subscriptionFaq } from "@/data/subscription";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";

const title = "Équipe IA externalisée : agents IA & automatisation | Fyliz";
const description =
  "Fyliz, ton équipe IA externalisée : des experts n8n et IA conçoivent, déploient et maintiennent tes agents IA et automatisations. Sans recruter, sans engagement.";

export const metadata: Metadata = {
  ...constructMetadata({ title, description, path: "/" }),
  // `absolute` évite le suffixe « | Fyliz » du template du layout.
  title: { absolute: title },
};

const organizationId = `${siteConfig.url}/#organization`;
const { office } = siteConfig.company;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    description,
    email: siteConfig.links.email,
    telephone: office.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street,
      postalCode: office.postalCode,
      addressLocality: office.city,
      addressCountry: "FR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: "FR",
    founder: {
      "@type": "Person",
      name: "Camille Vingere",
      sameAs: [siteConfig.links.linkedinUrl, "https://www.youtube.com/@camilleroydev"],
    },
    sameAs: ["https://www.youtube.com/@camilleroydev"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description,
    inLanguage: "fr",
    url: siteConfig.url,
    publisher: { "@id": organizationId },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Équipe IA externalisée",
    serviceType: "Équipe IA externalisée : agents IA et automatisation des processus",
    description:
      "Une équipe d'experts n8n et IA externalisée qui conçoit, déploie et maintient les automatisations de ton entreprise, sans engagement.",
    provider: { "@id": organizationId },
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
