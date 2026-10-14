import landing from "@/components/homes/abonnement/landing.module.scss";
import { ArrowRight } from "@/components/homes/abonnement/icons";
import Link from "next/link";
import SiteShell from "./SiteShell";
import s from "./site.module.scss";

export default function NotFoundView() {
  return (
    <SiteShell finalCta={false}>
      <div className={landing.container}>
        <section className={s.notFound}>
          <span className={s.bigCode} aria-hidden>
            404
          </span>
          <h1 className={s.title}>Page introuvable</h1>
          <p className={s.intro}>
            La page que tu cherches a été déplacée ou supprimée. Les pages ci-dessous
            devraient t&apos;aider à retrouver ton chemin.
          </p>
          <div className={s.headActions}>
            <Link href="/" className={landing.btnPrimary}>
              Retour à l&apos;accueil
              <ArrowRight />
            </Link>
            <Link href="/blog" className={landing.btnGhost}>
              Lire le blog
            </Link>
            <Link href="/cas-clients" className={landing.btnGhost}>
              Voir les cas clients
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
