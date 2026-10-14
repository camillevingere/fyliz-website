import landing from "@/components/homes/abonnement/landing.module.scss";
import { Crumbs } from "./PageHead";
import SiteShell from "./SiteShell";
import s from "./site.module.scss";

// Page de texte simple (mentions légales, CGV, confidentialité).
export default function TextPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <SiteShell finalCta={false}>
      <div className={landing.container}>
        <div className={s.narrow}>
          <header className={s.pageHead}>
            <Crumbs items={[{ href: "/", label: "Accueil" }, { label: title }]} />
            <h1 className={s.title}>{title}</h1>
          </header>
          <div className={`${s.prose} ${s.legalBody}`}>{children}</div>
        </div>
      </div>
    </SiteShell>
  );
}
