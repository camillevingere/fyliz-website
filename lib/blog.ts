import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { siteConfig } from "./config";
import { preprocessMarkdown } from "./mdx-utils";
import { supabase } from "./supabase";

export type Post = {
  id: string;
  title: string;
  publishedAt: string;
  description: string;
  author: string;
  slug: string;
  keywords: string[];
  tags: string[];
  authorImage: string;
  authorUsername: string;
  image?: string;
  content?: string;
  status: string;
};

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse) // Parse le Markdown
    .use(remarkGfm) // Ajoute le support des extensions GFM (tableaux, checkboxes, etc.)
    .use(remarkRehype, { allowDangerousHtml: true }) // Transforme Markdown en arbre HTML, autorisant le HTML brut
    .use(rehypeRaw) // Traite le HTML brut dans le Markdown
    .use(rehypeSlug) // Ajoute des IDs aux en-têtes
    .use(rehypePrettyCode, {
      // Configuration pour rehype-pretty-code
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify) // Convertit l'arbre HTML en string
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string, type = "articles") {
  // Essayer d'abord de chercher par slug exact (si la colonne slug existe dans la DB)
  let { data: article } = await supabase
    .from(type)
    .select("*")
    .eq("status", "published")
    .eq("slug", slug) // Utilise la colonne slug si elle existe
    .maybeSingle();

  // Si pas trouvé par slug exact, rechercher par titre et générer le slug
  if (!article) {
    const { data: articles, error: articlesError } = await supabase
      .from(type)
      .select("*")
      .eq("status", "published");

    if (articlesError || !articles) {
      return { metadata: null, source: null };
    }

    // Trouver l'article qui correspond au slug généré
    article = articles.find((article) => {
      const generatedSlug = generateSlugFromTitle(article.title);
      return generatedSlug === slug;
    });
  }

  if (!article) {
    return { metadata: null, source: null };
  }

  // Vérifier si l'article est publié dans le futur
  if (article.published_at && new Date(article.published_at) > new Date()) {
    return { metadata: null, source: null };
  }

  // Preprocess markdown to convert S3 keys to presigned URLs before HTML conversion
  const preprocessedMarkdown = await preprocessMarkdown(article.content);
  const content = await markdownToHTML(preprocessedMarkdown);
  const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    article.title
  )}`;

  const postSlug = generateSlugFromTitle(article.title);

  return {
    source: content,
    metadata: {
      id: article.id,
      title: article.title,
      description: article.description || "",
      publishedAt: article.published_at || article.created_at,
      author: article.author || "",
      keywords: article.keywords || [],
      tags: article.tags || [],
      authorImage: article.author_image || "",
      authorUsername: article.author_username || "",
      image: article.image || defaultImage,
      status: article.status,
      slug: postSlug,
    } as Post,
    slug: postSlug,
  };
}

async function getAllPosts(type = "articles") {
  const { data: articles, error } = await supabase
    .from(type)
    .select("*")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error || !articles) {
    console.error("Erreur lors de la récupération des articles:", error);
    return [];
  }

  const posts = await Promise.all(
    articles.map(async (article) => {
      // Preprocess markdown to convert S3 keys to presigned URLs before HTML conversion
      const preprocessedMarkdown = await preprocessMarkdown(article.content);
      const content = await markdownToHTML(preprocessedMarkdown);
      const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
        article.title
      )}`;
      const postSlug = generateSlugFromTitle(article.title);

      return {
        id: article.id,
        title: article.title,
        description: article.description || "",
        publishedAt: article.published_at || article.created_at,
        author: article.author || "",
        keywords: article.keywords || [],
        tags: article.tags || [],
        authorImage: article.author_image || "",
        authorUsername: article.author_username || "",
        image: article.image || defaultImage,
        status: article.status,
        slug: postSlug,
        source: content,
      };
    })
  );

  return posts;
}

export async function getBlogPosts(locale: string) {
  if (locale !== "fr") {
    return [];
  }
  return getAllPosts();
}

export async function getCustomerCasePosts(locale: string) {
  if (locale !== "fr") {
    return [];
  }
  return getAllPosts("customer_cases");
}

export async function getSolutionsPosts() {
  const { solutions } = await import("@/data/solutions");

  return solutions
    .filter((solution) => solution.status === "published")
    .map((solution) => {
      const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
        solution.title
      )}`;

      return {
        id: solution.id,
        title: solution.title,
        description: solution.description || "",
        publishedAt: solution.publishedAt,
        author: solution.author || "",
        keywords: solution.keywords || [],
        tags: solution.tags || [],
        authorImage: "",
        authorUsername: "",
        image: solution.image || defaultImage,
        status: solution.status,
        slug: null,
        link: solution.link,
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

// Nouvelle fonction pour récupérer un article par ID
export async function getPostById(id: string, type = "articles") {
  const { data: article, error } = await supabase
    .from(type)
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !article) {
    return { metadata: null, source: null };
  }

  // Vérifier si l'article est publié dans le futur
  if (article.published_at && new Date(article.published_at) > new Date()) {
    return { metadata: null, source: null };
  }

  // Preprocess markdown to convert S3 keys to presigned URLs before HTML conversion
  const preprocessedMarkdown = await preprocessMarkdown(article.content);
  const content = await markdownToHTML(preprocessedMarkdown);
  const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    article.title
  )}`;
  const postSlug = generateSlugFromTitle(article.title);

  return {
    source: content,
    metadata: {
      id: article.id,
      title: article.title,
      description: article.description || "",
      publishedAt: article.published_at || article.created_at,
      author: article.author || "",
      keywords: article.keywords || [],
      tags: article.tags || [],
      authorImage: article.author_image || "",
      authorUsername: article.author_username || "",
      image: article.image || defaultImage,
      status: article.status,
      slug: postSlug,
    } as Post,
    slug: postSlug,
  };
}
