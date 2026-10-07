/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Article déplacé sur le site sœur (intention DIY)
      {
        source: "/blog/installer-n8n-sur-un-vps-hostinger-coolify",
        destination: "https://n8n-france.com/installer-n8n/",
        permanent: true,
      },
      { source: "/newsletter", destination: "/", permanent: true },
      // Pages catégorie supprimées
      { source: "/category/:slug*", destination: "/blog", permanent: true },
      {
        source: "/cas-clients/category/:slug*",
        destination: "/cas-clients",
        permanent: true,
      },
      {
        source: "/automatisations-n8n/category/:slug*",
        destination: "/automatisations-n8n",
        permanent: true,
      },
      {
        source: "/blog/myskillfactory-agents-ia-pour-organisme-de-formation",
        destination:
          "/cas-clients/myskillfactory-agents-ia-pour-organisme-de-formation",
        permanent: true,
      },
      { source: "/blog/:page(\\d+)", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
