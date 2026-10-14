import landing from "@/components/homes/abonnement/landing.module.scss";
import { ArrowRight } from "@/components/homes/abonnement/icons";
import Image from "next/image";
import Link from "next/link";
import { Crumbs, type Crumb } from "./PageHead";
import SiteShell from "./SiteShell";
import s from "./site.module.scss";

type ArticleViewProps = {
  crumbs: Crumb[];
  tags?: string[];
  title: string;
  description?: string;
  author?: string;
  authorImage?: string;
  publishedAt?: string;
  cover: string;
  html: string;
  back: { href: string; label: string };
  actions?: React.ReactNode;
};

// Gabarit commun des contenus en base (blog, cas clients, workflows n8n).
export default function ArticleView({
  crumbs,
  tags,
  title,
  description,
  author,
  authorImage,
  publishedAt,
  cover,
  html,
  back,
  actions,
}: ArticleViewProps) {
  return (
    <SiteShell>
      <article>
        <div className={landing.container}>
          <div className={s.narrow}>
            <header className={s.pageHead}>
              <Crumbs items={crumbs} />
              {tags && tags.length > 0 && (
                <ul className={s.tags}>
                  {tags.map((tag) => (
                    <li key={tag} className={s.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <h1 className={s.title}>{title}</h1>
              {description && <p className={s.intro}>{description}</p>}
              <div className={s.meta}>
                {author && (
                  <>
                    {authorImage && <Image src={authorImage} width={36} height={36} alt="" />}
                    <strong>{author}</strong>
                    <span className={s.metaDot} aria-hidden />
                  </>
                )}
                {publishedAt && (
                  <time dateTime={publishedAt}>
                    {new Date(publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
              {actions && <div className={s.headActions}>{actions}</div>}
            </header>

            <figure className={s.cover}>
              <Image alt={title} src={cover} width={1200} height={600} priority />
            </figure>

            <div className={s.prose} dangerouslySetInnerHTML={{ __html: html }} />

            <div className={s.articleFoot}>
              <Link href={back.href} className={landing.btnGhost}>
                {back.label}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
