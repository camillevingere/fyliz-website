"use client";

import Image from "next/image";
import Link from "next/link";
import SidebarClient from "./SidebarClient";

interface PostItem {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  image?: string | null;
  tags?: string[];
  link?: string;
}

interface PostsSidebarRightClientProps {
  articles: PostItem[];
  sidebarArticles?: PostItem[]; // Separate articles for sidebar (unfiltered)
  basePath: string;
  defaultCategory?: string;
  categoryBasePath?: string;
  linkText?: string;
  useExternalLinks?: boolean;
  title?: string;
}

export default function PostsSidebarRightClient({
  articles = [],
  sidebarArticles,
  basePath,
  defaultCategory = "Article",
  categoryBasePath,
  linkText = "Lire plus",
  useExternalLinks = false,
  title,
}: PostsSidebarRightClientProps) {
  // Use sidebarArticles if provided, otherwise use articles
  const sidebarItems = sidebarArticles || articles;
  const mappedPosts =
    articles.length > 0
      ? articles.map((post) => {
          return {
            id: post.slug || post.id,
            slug: post.slug,
            link: post.link,
            image: post.image || "/images/default-blog.webp",
            alt: post.title,
            title: post.title,
            category: post.tags?.[0] || defaultCategory,
            excerpt: post.description,
          };
        })
      : [];

  const getPostUrl = (elm: { slug?: string; id?: string; link?: string }) => {
    if (useExternalLinks && elm.link) {
      return elm.link;
    }
    return elm.slug ? `${basePath}/${elm.slug}` : `${basePath}/${elm.id}`;
  };

  const getCategoryUrl = (category: string) => {
    if (!categoryBasePath) return "#";
    return `${categoryBasePath}/${category}`;
  };

  return (
    <div className="section panel">
      <div className="container">
        <div className="panel py-4 lg:py-6 xl:py-8">
          <div className="row child-cols-12 g-2 lg:g-4 xl:g-8">
            <div className="md:col-8">
              <div className="uc-main panel" role="main">
                <div className="row child-cols-12 sm:child-cols-4 col-match g-2 lg:g-4 xl:g-6">
                  {mappedPosts.slice(0, 6).map((elm, i) => (
                    <div key={i} className="col-12">
                      <article className="post type-post panel rounded-2 p-2 lg:p-4 bg-gray-25 dark:bg-gray-800">
                        <div className="panel row child-cols-12 lg:child-cols g-2 lg:g-4">
                          <div className="lg:col-6 xl:col-4">
                            <div className="panel">
                              <figure className="featured-image m-0 rounded ratio ratio-16x9 lg:ratio-1x1 rounded-1-5 uc-transition-toggle overflow-hidden">
                                <Image
                                  className="media-cover image uc-transition-scale-up uc-transition-opaque"
                                  alt={elm.alt || elm.title}
                                  src={elm.image}
                                  width="768"
                                  height="560"
                                />
                                <Link
                                  href={getPostUrl(elm)}
                                  className="position-cover"
                                  data-caption={elm.alt || elm.title}
                                />
                              </figure>
                              <Link
                                className="post-category fw-normal fw-bold fs-7 py-narrow px-1 rounded bg-primary position-absolute top-0 start-0 m-2"
                                style={{ color: "#ffffff !important" }}
                                href={getCategoryUrl(elm.category)}
                              >
                                {elm.category}
                              </Link>
                            </div>
                          </div>
                          <div>
                            <div className="vstack items-start gap-2">
                              <h3 className="h4 sm:h5 md:h4 lh-lg m-0 xl:max-w-3/4">
                                <Link
                                  className="text-none"
                                  href={getPostUrl(elm)}
                                >
                                  {elm.title}
                                </Link>
                              </h3>
                              <p className="fs-6 md:fs-5 text-truncate-3">
                                {elm.excerpt}{" "}
                              </p>
                              <Link
                                className="btn btn-text text-primary border-bottom d-inline-flex fs-7 md:fs-6 mt-2 md:mt-4 dark:text-tertiary"
                                href={getPostUrl(elm)}
                              >
                                {linkText}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-4 sticky-element3">
              <SidebarClient
                articles={sidebarItems}
                title={title}
                basePath={basePath}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
