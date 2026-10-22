// Maillage entre contenus en base : sans ces liens, un article ou un cas client
// est un cul-de-sac pour le crawl comme pour le lecteur, qui n'a que le bouton
// « retour » pour continuer.

export type RelatedLink = { href: string; title: string; excerpt?: string };

type LinkablePost = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  keywords?: string[];
  publishedAt: string | Date;
};

const terms = (post: LinkablePost) =>
  new Set([...(post.tags ?? []), ...(post.keywords ?? [])].map((term) => term.toLowerCase()));

/**
 * Les contenus les plus proches de `current` : d'abord ceux qui partagent le
 * plus de tags et mots-clés, puis les plus récents à égalité.
 */
export function relatedLinks(
  current: Pick<LinkablePost, "slug" | "tags" | "keywords">,
  posts: LinkablePost[],
  basePath: string,
  limit = 3,
): RelatedLink[] {
  const currentTerms = terms({ ...current, title: "", publishedAt: "" });
  const time = (post: LinkablePost) => new Date(post.publishedAt).getTime();

  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score: [...terms(post)].filter((term) => currentTerms.has(term)).length,
    }))
    .sort((a, b) => b.score - a.score || time(b.post) - time(a.post))
    .slice(0, limit)
    .map(({ post }) => ({
      href: `${basePath}/${post.slug}`,
      title: post.title,
      excerpt: post.description,
    }));
}
