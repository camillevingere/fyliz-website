import landing from "@/components/homes/abonnement/landing.module.scss";
import { Crumbs } from "./PageHead";
import SiteShell from "./SiteShell";
import s from "./site.module.scss";

// En-tête et conteneur des pages de liste (blog, cas clients, catalogue n8n, solutions).
export default function ListPage({
  crumb,
  title,
  accent,
  intro,
  children,
}: {
  crumb: string;
  title: string;
  accent?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <div className={landing.container}>
        <header className={s.pageHead}>
          <Crumbs items={[{ href: "/", label: "Accueil" }, { label: crumb }]} />
          <h1 className={`${s.title} ${s.titleXl}`}>
            {title}
            {accent && (
              <>
                {" "}
                <span className={landing.serif}>{accent}</span>
              </>
            )}
          </h1>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>
        <section className={s.listSection}>{children}</section>
      </div>
    </SiteShell>
  );
}
