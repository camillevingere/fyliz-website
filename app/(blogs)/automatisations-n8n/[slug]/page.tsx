import ArticleView from "@/components/site/ArticleView";
import DownloadButton from "@/components/workflows/DownloadButton";
import { getN8nWorkflowSlugs, getPost, getPostById } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 432000; // 5 days — regenerate before presigned URLs expire (7 days)

export async function generateStaticParams() {
  return getN8nWorkflowSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug, "n8n_workflows");
  if (!post || !post.metadata || !post.source) {
    notFound();
  }
  let {
    title,
    publishedAt: publishedTime,
    description: description,
    image,
    author,
    tags,
    keywords,
  } = post.metadata;

  const postSlug = post.metadata.slug || post.slug || slug;
  const postUrl = `${siteConfig.url}/automatisations-n8n/${postSlug}`;

  return {
    title,
    description,
    keywords,
    authors: author
      ? [
          {
            name: author,
            url: siteConfig.url,
          },
        ]
      : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: postUrl,
      images: [
        {
          url: image,
        },
      ],
      tags,
    },
    alternates: {
      canonical: postUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Le contenu en base commence par un « # Titre » : le H1 de la page est déjà dans l'en-tête.
const demoteH1 = (html: string) =>
  html.replace(/<h1(\s|>)/g, "<h2$1").replace(/<\/h1>/g, "</h2>");

export default async function WorkflowPost({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  let post = await getPostById(slug, "n8n_workflows");
  if (!post || !post.metadata || !post.source) {
    post = await getPost(slug, "n8n_workflows");
  }

  if (!post || !post.metadata || !post.source) {
    notFound();
  }

  const signedImageUrl = await getSignedImageUrl(post.metadata.image || null);
  const { metadata } = post;
  const workflowJson = (post.metadata as any).workflowJson || null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    image: metadata.image,
    datePublished: metadata.publishedAt,
    author: {
      "@type": "Person",
      name: metadata.author || `Équipe ${siteConfig.name}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/automatisations-n8n/${metadata.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Automatisations n8n",
        item: `${siteConfig.url}/automatisations-n8n`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: `${siteConfig.url}/automatisations-n8n/${metadata.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleView
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/automatisations-n8n", label: "Automatisations n8n" },
          { label: metadata.title },
        ]}
        tags={metadata.tags}
        title={metadata.title}
        description={metadata.description}
        author={metadata.author}
        authorImage={metadata.authorImage}
        publishedAt={metadata.publishedAt}
        cover={signedImageUrl || metadata.image || "/images/default-blog.webp"}
        html={demoteH1(post.source)}
        back={{ href: "/automatisations-n8n", label: "Toutes les automatisations" }}
        actions={workflowJson ? (
          <DownloadButton
            workflowJson={workflowJson}
            workflowName={metadata.title}
            workflowSlug={metadata.slug}
          />
        ) : undefined}
      />
    </>
  );
}
