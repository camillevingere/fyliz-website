import { getSignedImageUrl } from "@/lib/image-utils";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default async function SolutionsSidebarRight({ articles = [] }) {
  const mappedPosts =
    articles.length > 0 &&
    (await Promise.all(
      articles.map(async (post) => {
        const signedImage =
          (await getSignedImageUrl(post.image || null)) ||
          "/images/default-blog.webp";

        return {
          id: post.slug || post.id,
          link: post.link,
          image: signedImage,
          alt: post.title,
          title: post.title,
          category: post.tags?.[0] || "Article",
          excerpt: post.description,
        };
      })
    ));

  console.log("mappedPosts", typeof mappedPosts[0].link);

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
                                  href={elm.link as string}
                                  className="position-cover"
                                  data-caption={elm.alt || elm.title}
                                />
                              </figure>
                              <Link
                                className="post-category fw-normal fw-bold fs-7 py-narrow px-1 rounded bg-primary position-absolute top-0 start-0 m-2"
                                style={{ color: "#ffffff !important" }}
                                href="#"
                              >
                                {elm.category}
                              </Link>
                            </div>
                          </div>
                          <div>
                            <div className="vstack items-start gap-2">
                              <h3 className="h4 sm:h5 md:h4 lh-lg m-0 xl:max-w-3/4 m-0">
                                <Link className="text-none" href={elm.link as string}>
                                  {elm.title}
                                </Link>
                              </h3>
                              <p className="fs-6 md:fs-5 text-truncate-3">
                                {elm.excerpt}{" "}
                              </p>
                              <Link
                                className="btn btn-text text-primary border-bottom d-inline-flex fs-7 md:fs-6 mt-2 md:mt-4 dark:text-tertiary"
                                href={elm.link as string}
                              >
                                Voir l'automatisation
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
                {/* <div className="nav-pagination mt-4 lg:mt-6 xl:mt-8">
                  <ul
                    className="nav-x uc-pagination hstack gap-1 justify-center ft-secondary"
                    data-uc-margin=""
                  >
                    <Pagination />
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="md:col-4 sticky-element3">
              <Sidebar articles={articles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
