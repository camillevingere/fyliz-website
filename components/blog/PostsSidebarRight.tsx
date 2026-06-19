import { getSignedImageUrl } from "@/lib/image-utils";
import PostsListClient from "./PostsListClient";
import Sidebar from "./Sidebar";

interface PostItem {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  image?: string | null;
  tags?: string[];
  link?: string;
}

interface PostsSidebarRightProps {
  articles: PostItem[];
  basePath: string;
  defaultCategory?: string;
  categoryBasePath?: string;
  linkText?: string;
  useExternalLinks?: boolean;
  title?: string;
}

export default async function PostsSidebarRight({
  articles = [],
  basePath,
  defaultCategory = "Article",
  categoryBasePath,
  linkText = "Lire plus",
  useExternalLinks = false,
  title,
}: PostsSidebarRightProps) {
  const mappedPosts =
    articles.length > 0
      ? await Promise.all(
          articles.map(async (post) => {
            const signedImage =
              (await getSignedImageUrl(post.image || null)) ||
              "/images/default-blog.webp";

            return {
              id: post.slug || post.id,
              slug: post.slug,
              link: post.link,
              image: signedImage,
              alt: post.title,
              title: post.title,
              category: post.tags?.[0] || defaultCategory,
              excerpt: post.description,
            };
          }),
        )
      : [];

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
              <Sidebar articles={articles} title={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
