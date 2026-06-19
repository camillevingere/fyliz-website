"use client";

import PostsListClient from "./PostsListClient";
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
  sidebarArticles?: PostItem[];
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
  const sidebarItems = sidebarArticles || articles;

  const mappedPosts = articles.map((post) => ({
    id: post.slug || post.id,
    slug: post.slug,
    link: post.link,
    image: post.image || "/images/default-blog.webp",
    alt: post.title,
    title: post.title,
    category: post.tags?.[0] || defaultCategory,
    excerpt: post.description,
  }));

  return (
    <div className="section panel">
      <div className="container">
        <div className="panel py-4 lg:py-6 xl:py-8">
          <div className="row child-cols-12 g-2 lg:g-4 xl:g-8">
            <div className="md:col-8">
              <div className="uc-main panel" role="main">
                <PostsListClient
                  posts={mappedPosts}
                  basePath={basePath}
                  categoryBasePath={categoryBasePath}
                  linkText={linkText}
                  useExternalLinks={useExternalLinks}
                />
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
