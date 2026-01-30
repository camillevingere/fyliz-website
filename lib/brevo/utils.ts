// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Get the env and the feature flag from configuration.
export const sendinblueEnabled = process.env.NEXT_PUBLIC_BREVO_ENABLED === "1";

export enum EventName {
  // add here your application events
  EXAMPLE_CREATED = "exampleCreated",
  FORMATION_WORDPRESS_GRATUITE = "formation-wordpress-gratuite",
  FORMATION_WORDPRESS_GRATUITE_V3 = "formation-wordpress-gratuite-v3",
  FORMATION_FREELANCE_GRATUITE = "formation-freelance-gratuite",
  FORMATION_FREELANCE_GRATUITE_V3 = "formation-freelance-gratuite-v3",
  FORMATION_WORDPRESS_CLIENT = "formation-wordpress-client",
  FORMATION_FREELANCE_CLIENT = "formation-freelance-client",
  FORMATION_USINE_SEO_CLIENT = "formation-usine-seo-client",
  FORMATION_AUTOMATISATION_GRATUITE = "formation-automatisation-gratuite",
  DOWNLOAD_WORKFLOW_N8N = "download-workflow-n8n",
}

export enum PageName {
  // add here page names that you track explicitly
  EXAMPLE_PAGE = "examplePage",
}

// Contact properties, like FIRSTNAME, LASTNAME and custom ones
// Once you know, define those keys and their expected values instead of using `any`
export type VisitorProperties = {
  [property: string]: string;
};

/**
 * Identifies the visitor user with an email address
 */
export function identify(email: string, visitorProperties?: VisitorProperties) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[sendinblue.identify]", email, visitorProperties);
    }
    window.sendinblue.identify(email, visitorProperties);
  }
}

/**
 * Tracks explicitly a page view
 */
export function page(
  eventName: PageName,
  visitorProperties?: VisitorProperties,
) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[sendinblue.page]", eventName, visitorProperties);
    }
    window.sendinblue.page(eventName, visitorProperties);
  }
}
