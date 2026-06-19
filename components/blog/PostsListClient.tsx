"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const POSTS_PER_PAGE = 6;

export interface MappedPost {
  id?: string;
  slug?: string;
  link?: string;
  image: string;
  alt?: string;
  title: string;
  category: string;
  excerpt?: string;
}

interface PostsListClientProps {
  posts: MappedPost[];
  basePath: string;
  categoryBasePath?: string;
  linkText?: string;
  useExternalLinks?: boolean;
}

export default function PostsListClient({
  posts,
  basePath,
  categoryBasePath,
  linkText = "Lire plus",
  useExternalLinks = false,
}: PostsListClientProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const getPostUrl = (elm: { slug?: string; id?: string; link?: string }) => {
    if (useExternalLinks && elm.link) return elm.link;
    return elm.slug ? `${basePath}/${elm.slug}` : `${basePath}/${elm.id}`;
  };

  const getCategoryUrl = (category: string) => {
    if (!categoryBasePath) return "#";
    return `${categoryBasePath}/${category}`;
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="row child-cols-12 sm:child-cols-4 col-match g-2 lg:g-4 xl:g-6">
        {visiblePosts.map((elm, i) => (
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
                      <Link className="text-none" href={getPostUrl(elm)}>
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
      {hasMore && (
        <div className="text-center mt-4 lg:mt-6">
          <button
            className="btn btn-md btn-primary rounded-pill"
            onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
          >
            Charger plus
          </button>
        </div>
      )}
    </>
  );
}
