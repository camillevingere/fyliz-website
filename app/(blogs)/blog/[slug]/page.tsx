import ArticleView from "@/components/site/ArticleView";
import { getBlogPosts, getPost, getPostById } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts("fr");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug);
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
  const postUrl = `${siteConfig.url}/blog/${postSlug}`;

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

export default async function BlogPost({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  let post = await getPostById(slug);
  if (!post || !post.metadata || !post.source) {
    post = await getPost(slug);
  }

  if (!post || !post.metadata || !post.source) {
    notFound();
  }

  const signedImageUrl = await getSignedImageUrl(post.metadata.image || null);
  const { metadata } = post;

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
      "@id": `${siteConfig.url}/blog/${metadata.slug}`,
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
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metadata.title,
        item: `${siteConfig.url}/blog/${metadata.slug}`,
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
          { href: "/blog", label: "Blog" },
          { label: metadata.title },
        ]}
        tags={metadata.tags}
        title={metadata.title}
        description={metadata.description}
        author={metadata.author}
        authorImage={metadata.authorImage}
        publishedAt={metadata.publishedAt}
        cover={signedImageUrl || metadata.image || "/images/default-blog.webp"}
        html={post.source}
        back={{ href: "/blog", label: "Retour au blog" }}
      />
    </>
  );
}

