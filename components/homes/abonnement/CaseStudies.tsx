import { getCustomerCasePosts } from "@/lib/blog";
import { getSignedImageUrl } from "@/lib/image-utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";
import s from "./landing.module.scss";

export default async function CaseStudies() {
  const posts = await getCustomerCasePosts("fr");
  const latest = posts
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  const cases = await Promise.all(
    latest.map(async (post) => ({
      slug: post.slug,
      title: post.title,
      image: (await getSignedImageUrl(post.image || null)) || "/images/default-blog.webp",
    })),
  );

  if (cases.length === 0) return null;

  return (
    <section id="cas-clients" className={s.section}>
      <div className={s.container}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Cas clients
          </span>
          <h2 className={s.h2}>
            Ce qu&apos;on a déjà <span className={s.serif}>automatisé.</span>
          </h2>
        </div>

        <div className={s.cases}>
          {cases.map((item, index) => (
            <Link
              key={item.slug}
              href={`/cas-clients/${item.slug}`}
              className={s.caseCard}
              data-reveal
              style={{ "--delay": index * 90 } as React.CSSProperties}
            >
              <div className={s.caseImage}>
                <Image src={item.image} alt="" width={800} height={450} />
              </div>
              <div className={s.caseBody}>
                <h3 className={s.h3}>{item.title}</h3>
                <span className={s.caseArrow} aria-hidden>
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.casesMore}>
          <Link href="/cas-clients" className={s.btnGhost}>
            Voir tous les cas clients
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
