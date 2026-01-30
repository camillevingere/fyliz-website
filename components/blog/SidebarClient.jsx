"use client";

import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE = "/images/default-blog.webp";

export default function SidebarClient({
  articles = [],
  title = null,
  basePath = "/blog",
}) {
  // Find the article with isFavorite=true, fallback to first article if none found
  const featuredArticle = articles.find((a) => a.isFavorite) || articles[0];

  const featured = featuredArticle
    ? [
        {
          id: featuredArticle.slug || featuredArticle.id,
          slug: featuredArticle.slug,
          title: featuredArticle.title,
          description: featuredArticle.description,
          imgSrc: featuredArticle.image || FALLBACK_IMAGE,
          imgAlt: featuredArticle.title,
        },
      ]
    : null;

  const popular =
    articles.length > 3 &&
    articles.slice(3, 8).map((post) => ({
      id: post.slug || post.id,
      slug: post.slug,
      title: post.title,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
    }));

  return (
    <div className="uc-sidebar panel vstack gap-2 ">
      <div className="widget featured-widget vstack gap-2 lg:gap-4 p-2 py-3 lg:p-4 lg:py-5 rounded-1-5 lg:rounded-2 bg-gray-25 dark:bg-gray-800">
        <div className="widget-title text-center">
          <h5 className="fs-7 m-0">{title || "Article à la une"}</h5>
        </div>
        <div className="widget-content mt-2">
          {featured &&
            featured.map((post, index) => (
              <div className="panel text-center" key={index}>
                <div className="ratio ratio-16x9 rounded lg:rounded-1-5 uc-transition-toggle overflow-hidden">
                  <Image
                    className="media-cover image uc-transition-scale-up uc-transition-opaque"
                    alt={post.imgAlt}
                    src={post.imgSrc}
                    width="768"
                    height="560"
                  />
                  <Link
                    className="position-cover"
                    data-caption={post.imgAlt}
                    href={
                      post.slug
                        ? `${basePath}/${post.slug}`
                        : `${basePath}/${post.id}`
                    }
                  />
                </div>
                <h4 className="h5 mt-3">
                  <Link
                    className="text-none"
                    href={
                      post.slug
                        ? `${basePath}/${post.slug}`
                        : `${basePath}/${post.id}`
                    }
                  >
                    {post.title}
                  </Link>
                </h4>
                <p className="fs-6">{post.description}</p>
                <Link
                  className="btn btn-text text-primary dark:text-tertiary border-bottom mt-3"
                  href={
                    post.slug
                      ? `${basePath}/${post.slug}`
                      : `${basePath}/${post.id}`
                  }
                >
                  Lire plus
                </Link>
              </div>
            ))}
        </div>
      </div>
      {popular && (
        <div className="widget popular-widget vstack gap-2 p-2 py-3 lg:p-4 lg:py-5 rounded-1-5 lg:rounded-2 bg-gray-25 dark:bg-gray-800">
          <div className="widget-title text-center">
            <h5 className="fs-7 m-0">Populaires</h5>
          </div>
          <div className="widget-content">
            <div className="row child-cols-12 gx-4 gy-3 sep-x">
              {popular.map((post, i) => (
                <div key={post.id || i}>
                  <article className="post type-post panel">
                    <div className="row child-cols g-2 lg:g-3">
                      <div>
                        <div className="hstack items-start gap-3">
                          <span className="h3 lg:h2 fst-italic text-center text-primary dark:text-tertiary m-0 min-w-24px">
                            {i + 1}
                          </span>{" "}
                          <div className="post-header panel vstack justify-between gap-1">
                            <h3 className="post-title h6 m-0">
                              <Link
                                className="text-none"
                                href={
                                  post.slug
                                    ? `${basePath}/${post.slug}`
                                    : `${basePath}/${post.id}`
                                }
                              >
                                {post.title}
                              </Link>
                            </h3>
                            <div className="post-meta panel hstack justify-between fs-7 text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex">
                              <div className="meta">
                                <div className="hstack gap-2">
                                  <div>
                                    <div className="post-date hstack gap-narrow">
                                      <span>{post.date}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
