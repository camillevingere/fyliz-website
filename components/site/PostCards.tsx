import landing from "@/components/homes/abonnement/landing.module.scss";
import { ArrowUpRight } from "@/components/homes/abonnement/icons";
import Image from "next/image";
import Link from "next/link";
import s from "./site.module.scss";

export type PostCard = {
  key: string;
  href: string;
  external?: boolean;
  image: string;
  title: string;
  category?: string;
  excerpt?: string;
};

// Grille de cartes au style des cas clients de l'accueil. Sans hooks : utilisable
// côté serveur comme dans un composant client (recherche du catalogue n8n).
export default function PostCards({ posts }: { posts: PostCard[] }) {
  return (
    <div className={landing.cases}>
      {posts.map((post) => {
        const body = (
          <>
            <div className={landing.caseImage}>
              <Image src={post.image} alt="" width={800} height={450} loading="lazy" />
            </div>
            <div className={landing.caseBody}>
              <div>
                {post.category && <span className={s.cardCategory}>{post.category}</span>}
                <h2 className={landing.h3}>{post.title}</h2>
                {post.excerpt && <p className={s.cardExcerpt}>{post.excerpt}</p>}
              </div>
              <span className={landing.caseArrow} aria-hidden>
                <ArrowUpRight />
              </span>
            </div>
          </>
        );

        return post.external ? (
          <a
            key={post.key}
            href={post.href}
            className={landing.caseCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            {body}
          </a>
        ) : (
          <Link key={post.key} href={post.href} className={landing.caseCard}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}
