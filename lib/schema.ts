import { siteConfig } from "./config";

// Nœuds schema.org partagés entre les gabarits. L'éditeur est redéclaré sur
// chaque page plutôt que référencé dans le vide : un `@id` qui ne résout nulle
// part sur la page ne relie rien.

export const ORG_ID = `${siteConfig.url}/#organization`;
export const FOUNDER_ID = `${siteConfig.url}/#founder`;

const FOUNDER_NAME = "Camille Vingere";
const youtubeUrl = "https://www.youtube.com/@camilleroydev";

export const ref = (id: string) => ({ "@id": id });

function founderNode() {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER_NAME,
    jobTitle: `Fondateur de ${siteConfig.name}`,
    worksFor: ref(ORG_ID),
    sameAs: [siteConfig.links.linkedinUrl, youtubeUrl],
  };
}

export function organizationNode(description?: string) {
  const { office } = siteConfig.company;

  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    ...(description && { description }),
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
    founder: founderNode(),
    sameAs: [youtubeUrl],
  };
}

/**
 * L'auteur affiché sous le titre. Quand c'est le fondateur, il porte son `@id`
 * et ses profils : c'est ce qui relie l'article à une personne identifiable.
 */
export function authorNode(author?: string) {
  if (!author || author === FOUNDER_NAME) return ref(FOUNDER_ID);
  return { "@type": "Person", name: author };
}
