import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { getBlogPosts, getPost, getPostById } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import { constructMetadata } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts("fr");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  let post = await getPostById(slug);
  if (!post || !post.metadata || !post.source) {
    post = await getPost(slug);
  }

  if (!post || !post.metadata) {
    return constructMetadata({
      title: "Article non trouvé",
      description: "Cet article n'existe pas ou n'est plus disponible.",
    });
  }

  return constructMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    image: post.metadata.image,
    keywords: post.metadata.keywords,
  });
}

export default async function BlogPost({ params }) {
  const { slug } = params;

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
      <div className="theme-5 theme-5-light">
        <div
          className=" bp-xs page-wrapper bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 dark:bg-black dark:text-gray-200"
          style={{ overflowX: "clip" }}
        >
          <Header8 />
          <div id="wrapper" className="wrap">
            {/* Breadcrumbs */}
            <div
              style={{ marginTop: "120px" }}
              className="breadcrumbs panel z-1 py-2 bg-secondary dark:bg-gray-100 dark:bg-opacity-5 dark:text-white"
            >
              <div className="container max-w-xl">
                <ul className="breadcrumb nav-x justify-center items-center gap-1 fs-7 m-0 fw-bold">
                  <li>
                    <Image
                      alt="icon"
                      className="me-1"
                      src="/assets/images/common/icons/home.svg"
                      width="18"
                      height="18"
                    />
                  </li>
                  <li>
                    <Link href="/">Accueil</Link>
                  </li>
                  <li>
                    <i className="unicon-chevron-right fw-medium opacity-50 rtl:rotate-180" />
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <i className="unicon-chevron-right fw-medium opacity-50 rtl:rotate-180" />
                  </li>
                  <li>
                    <span className="opacity-50">{metadata.title}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Article Content */}
            <article className="post type-post single-post py-4 lg:py-6 xl:py-9">
              <div className="container max-w-lg">
                <div className="post-header panel vstack gap-2 lg:gap-4 mb-4 lg:mb-6 xl:mb-9">
                  <div className="panel">
                    <ul className="post-share-icons nav-x gap-1 dark:text-white">
                      {metadata.tags &&
                        metadata.tags.map((tag, idx) => (
                          <li key={idx}>
                            <span
                              className="badge bg-primary px-2 py-1 fs-7 rounded"
                              style={{ color: "#ffffff !important" }}
                            >
                              {tag}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <h1 className="h3 sm:h2 lg:display-6 xl:display-5 m-0">
                    {metadata.title}
                  </h1>
                  <p className="fs-5 lg:fs-4 text-muted">
                    {metadata.description}
                  </p>
                  <ul className="post-meta nav-x ft-tertiary justify-start gap-1 fs-7 text-gray-900 dark:text-white text-opacity-60 d-none lg:d-flex">
                    {metadata.author && (
                      <>
                        <li>
                          <div className="hstack gap-narrow ft-tertiary">
                            {metadata.authorImage && (
                              <Image
                                src={metadata.authorImage}
                                width={32}
                                height={32}
                                alt={metadata.author}
                                className="w-32px h-32px rounded-circle me-narrow"
                              />
                            )}
                            <span>{metadata.author}</span>
                          </div>
                        </li>
                        <li className="opacity-50">•</li>
                      </>
                    )}
                    <li>
                      <time dateTime={metadata.publishedAt}>
                        {new Date(metadata.publishedAt).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </li>
                  </ul>
                </div>
                <figure className="featured-image m-0 rounded ratio ratio-2x1 rounded-2 uc-transition-toggle overflow-hidden mb-4 lg:mb-6">
                  <Image
                    className="media-cover image uc-transition-scale-up uc-transition-opaque"
                    alt={metadata.title}
                    src={
                      signedImageUrl ||
                      metadata.image ||
                      "/images/default-blog.webp"
                    }
                    width={1200}
                    height={600}
                    priority
                  />
                </figure>
                <article
                  className="prose prose-xl dark:prose-invert lg:max-w-[800px] max-w-[350px]"
                  dangerouslySetInnerHTML={{ __html: post.source }}
                />
              </div>
            </article>

            {/* Back to Blog Link */}
            <div className="container max-w-lg mb-6">
              <Link
                href="/blog"
                className="btn btn-md btn-primary rounded-default shadow-xs"
              >
                ← Retour au blog
              </Link>
            </div>
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
