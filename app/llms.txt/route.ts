import { getBlogPosts, getCustomerCasePosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

/**
 * `llms.txt` : la carte du site pour les agents et les moteurs génératifs
 * (ChatGPT, Perplexity, Claude). Les pages d'offre sont une sélection
 * éditoriale ; les cas clients et articles sont lus en base, pour qu'un
 * contenu publié y apparaisse sans redéploiement.
 */

export const revalidate = 3600;

const intro = `# ${siteConfig.name}

> Fyliz est une équipe IA externalisée pour les PME françaises : des experts n8n et IA
> conçoivent, déploient et maintiennent les agents IA et automatisations de l'entreprise,
> sur abonnement à 3 000 € HT par mois, sans engagement. Bureaux à Marseille, clients
> partout en France.

Le site présente l'offre, les projets livrés (cas clients avec contexte et résultat) et un
blog qui documente l'automatisation IA et n8n à partir de projets réels.

## Offre
- [Équipe IA externalisée](${siteConfig.url}): L'offre, la méthode, le tarif de 3 000 € HT/mois et la FAQ.
- [Agence n8n en France](${siteConfig.url}/agence-n8n): Création, hébergement et maintenance de workflows n8n et d'agents IA pour les PME, démarrage sous 48 h.
- [Ce qu'on automatise](${siteConfig.url}/solutions-automatisation-ia): Ventes, admin et finance, opérations, support : les automatisations et agents IA que Fyliz conçoit et maintient.
`;

type Entry = { slug: string; title: string; description?: string };

const section = (title: string, basePath: string, posts: Entry[]) =>
  posts.length === 0
    ? ""
    : `\n## ${title}\n${posts
        .map(
          (post) =>
            `- [${post.title}](${siteConfig.url}${basePath}/${post.slug})${
              post.description ? `: ${post.description.replace(/\s+/g, " ").trim()}` : ""
            }`,
        )
        .join("\n")}\n`;

export async function GET() {
  const [cases, posts] = await Promise.all([getCustomerCasePosts("fr"), getBlogPosts("fr")]);

  const body =
    intro +
    section("Cas clients", "/cas-clients", cases) +
    section("Blog", "/blog", posts) +
    `\n## Optional\n- [Tous les cas clients](${siteConfig.url}/cas-clients)\n- [Le blog](${siteConfig.url}/blog)\n- [Mentions légales](${siteConfig.url}/legal/mentions-legales)\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
