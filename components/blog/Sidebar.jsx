import { getSignedImageUrl } from "@/lib/image-utils";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE = "/images/default-blog.webp";

export default async function Sidebar({ articles = [] }) {
  // Find the article with isFavorite=true, fallback to first article if none found
  const featuredArticle = articles.find((a) => a.isFavorite) || articles[0];

  const featured = featuredArticle
    ? [
        {
          id: featuredArticle.slug || featuredArticle.id,
          slug: featuredArticle.slug,
          title: featuredArticle.title,
          description: featuredArticle.description,
          imgSrc:
            (await getSignedImageUrl(featuredArticle.image || null)) ||
            FALLBACK_IMAGE,
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
          <h5 className="fs-7 m-0">Article à la une</h5>
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
                    href={post.slug ? `/${post.slug}` : `/${post.id}`}
                  />
                </div>
                <h4 className="h5 mt-3">
                  <Link
                    className="text-none"
                    href={post.slug ? `/${post.slug}` : `/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </h4>
                <p className="fs-6">{post.description}</p>
                <Link
                  className="btn btn-text text-primary dark:text-tertiary border-bottom mt-3"
                  href={post.slug ? `/${post.slug}` : `/${post.id}`}
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
                                  post.slug ? `/${post.slug}` : `/${post.id}`
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
      {/* <div className="widget social-widget vstack gap-2 text-center p-2 py-3 lg:p-4 lg:py-5 rounded-1-5 lg:rounded-2 bg-gray-25 dark:bg-gray-800">
        <div className="widgt-title">
          <h4 className="fs-7 m-0">Suivre @Lexend</h4>
        </div>
        <div className="widgt-content">
          <form className="vstack gap-1">
            <input
              className="form-control form-control-sm fs-6 fw-medium h-40px w-full rounded-pill bg-white dark:bg-gray-800 dark:bg-gray-800 dark:border-white dark:border-opacity-15 dark:border-opacity-15"
              type="email"
              placeholder="Votre email"
              required=""
            />
            <button
              className="btn btn-sm btn-primary dark:bg-tertiary dark:text-primary"
              type="submit"
            >
              S'inscrire
            </button>
          </form>
          <ul className="nav-x justify-center gap-1 mt-3">
            <li>
              <a
                href="#fb"
                className="cstack w-32px h-32px border rounded-circle hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-150"
              >
                <i className="icon icon-1 unicon-logo-facebook" />
              </a>
            </li>
            <li>
              <a
                href="#x"
                className="cstack w-32px h-32px border rounded-circle hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-150"
              >
                <i className="icon icon-1 unicon-logo-x-filled" />
              </a>
            </li>
            <li>
              <a
                href="#in"
                className="cstack w-32px h-32px border rounded-circle hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-150"
              >
                <i className="icon icon-1 unicon-logo-instagram" />
              </a>
            </li>
            <li>
              <a
                href="#yt"
                className="cstack w-32px h-32px border rounded-circle hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-150"
              >
                <i className="icon icon-1 unicon-logo-youtube" />
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}
