import ArticleView from "@/components/site/ArticleView";
import { getBlogPosts, getCustomerCasePosts, getPost, getPostById } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getPublicImageUrl } from "@/lib/image-utils";
import { relatedLinks } from "@/lib/internal-links";
import { extractPostFaq } from "@/lib/post-faq";
import { authorNode, ORG_ID, organizationNode, ref } from "@/lib/schema";
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
  image = getPublicImageUrl(image) ?? image;

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

  const imageUrl = getPublicImageUrl(post.metadata.image || null);
  const { metadata } = post;

  const postUrl = `${siteConfig.url}/blog/${metadata.slug}`;
  // Les questions viennent du corps rendu, jamais d'une liste tenue à part.
  const faq = extractPostFaq(post.source);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: metadata.title,
        description: metadata.description,
        image: imageUrl,
        datePublished: metadata.publishedAt,
        dateModified: metadata.updatedAt || metadata.publishedAt,
        url: postUrl,
        inLanguage: "fr",
        mainEntityOfPage: postUrl,
        author: authorNode(metadata.author),
        publisher: ref(ORG_ID),
      },
      ...(faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  const [samePosts, otherPosts] = await Promise.all([getBlogPosts("fr"), getCustomerCasePosts("fr")]);
  const related = [
    { title: "À lire aussi", links: relatedLinks(metadata, samePosts, "/blog") },
    { title: "Nos projets livrés", links: relatedLinks(metadata, otherPosts, "/cas-clients", 2) },
  ];

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
        cover={imageUrl || metadata.image || "/images/default-blog.webp"}
        html={post.source}
        back={{ href: "/blog", label: "Retour au blog" }}
        related={related}
      />
    </>
  );
}

