import { getSignedImageUrl } from "@/lib/image-utils";
import type { PostCard } from "./PostCards";

type Post = {
  slug?: string;
  id?: string;
  link?: string;
  title: string;
  description?: string;
  image?: string | null;
  tags?: string[];
};

// Signe les images S3 et prépare les cartes de liste.
export async function toPostCards(
  posts: Post[],
  basePath: string,
  { external = false, defaultCategory }: { external?: boolean; defaultCategory?: string } = {},
): Promise<PostCard[]> {
  return Promise.all(
    posts.map(async (post) => ({
      key: post.slug || post.id || post.title,
      href: external && post.link ? post.link : `${basePath}/${post.slug || post.id}`,
      external: external && Boolean(post.link),
      image: (await getSignedImageUrl(post.image || null)) || "/images/default-blog.webp",
      title: post.title,
      category: post.tags?.[0] || defaultCategory,
      excerpt: post.description,
    })),
  );
}
