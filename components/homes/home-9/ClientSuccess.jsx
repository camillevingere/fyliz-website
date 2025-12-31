import { getCustomerCasePosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSignedImageUrl } from "@/lib/image-utils";
import Image from "next/image";
import Link from "next/link";

export default async function ClientSuccess() {
  const allPosts = await getCustomerCasePosts("fr");
  const articles = allPosts
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);

  const customerCases = await Promise.all(
    articles.map(async (post) => {
      const signedImage =
        (await getSignedImageUrl(post.image || null)) ||
        "/images/default-blog.webp";

      return {
        id: post.slug || post.id,
        slug: post.slug,
        image: signedImage,
        alt: post.title,
        title: post.title,
      };
    })
  );

  return (
    <div
      id="cas_clients"
      className="main-features section panel overflow-hidden"
    >
      <div
        className="section-outer panel py-6 md:py-8 xl:py-10 mx-2 border rounded-1-5 lg:rounded-2"
        style={{
          backgroundColor: "#fff5ed",
          borderColor: "#ffddcc",
        }}
      >
        <div className="container">
          <div className="section-inner panel">
            <div
              className="panel vstack items-center gap-2 xl:gap-3 mb-4 sm:mb-6 lg:mb-8 max-w-650px mx-auto text-center"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              <span
                className="fs-7 fw-medium py-narrow px-2 text-white rounded-pill"
                style={{ backgroundColor: "#ffd7b8" }}
              >
                Cas clients
              </span>
              <h2 className="h3 lg:h1 m-0">
                Ils ont transformé leur business avec{" "}
                <span style={{ color: "#ff781a" }}>Fyliz</span>
              </h2>
              <p className="fs-6 xl:fs-5 xl:px-8 text-dark">
                Des résultats concrets, mesurables et garantis. Découvrez
                comment nos clients ont multiplié leur productivité.
              </p>
            </div>
            <div
              className="row child-cols-12 md:child-cols-6 col-match g-2 lg:g-4"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              {customerCases.map((caseItem, index) => (
                <div key={caseItem.id || index}>
                  <div
                    className="panel vstack lg:hstack gap-2 p-2 overflow-hidden text-gray-900 rounded-2 lg:rounded-3 border shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <div className="panel lg:max-w-600px lg:min-w-600px">
                      <Image
                        className="rounded-1-5 border"
                        style={{ borderColor: "#e5e7eb" }}
                        alt={caseItem.alt}
                        src={caseItem.image}
                        width={680}
                        height={680}
                      />
                    </div>
                    <div className="panel vstack items-start gap-2 p-2">
                      <h4 className="h4 m-0 text-inherit">{caseItem.title}</h4>
                      <Link
                        href={`/cas-clients/${caseItem.slug}`}
                        className="btn btn-sm border px-2 mt-2 hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: "#ff781a",
                          borderColor: "#ff781a",
                          color: "#ffffff",
                        }}
                      >
                        <span>Voir l&apos;étude de cas</span>
                        <i className="icon icon-narrow unicon-arrow-up-right fw-bold rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="pre-cta vstack items-center gap-1 max-w-400px lg:max-w-750px mx-auto text-center mt-6 xl:mt-10"
              data-anime="onview:-100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              <div className="mb-2 lg:mb-3">
                <Link
                  href={siteConfig.cta.buttonLink}
                  className="btn btn-md xl:btn-lg border px-3 lg:px-5 w-auto rounded-pill hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "#ff781a",
                    borderColor: "#ff781a",
                    color: "#ffffff",
                  }}
                >
                  <span>Obtenir les mêmes résultats</span>
                </Link>
              </div>
              <div className="vstack sm:hstack justify-center gap-1 fs-6 text-gray-900 flex-row md-flex-column">
                <div className="hstack justify-center gap-2">
                  <b>Excellent</b>
                  <div className="rating panel">
                    <div className="hstack justify-center gap-narrow">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="icon unicon-star-filled text-white p-narrow"
                          style={{ backgroundColor: "#ff781a" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hstack justify-center gap-narrow">
                  <span className="desc rtl:order-first">
                    +30% de croissance moyenne constatée
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
