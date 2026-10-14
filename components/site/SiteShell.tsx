import FinalCta from "@/components/homes/abonnement/FinalCta";
import Fonts from "@/components/homes/abonnement/Fonts";
import RevealObserver from "@/components/homes/abonnement/RevealObserver";
import SiteFooter from "@/components/homes/abonnement/SiteFooter";
import SiteHeader from "@/components/homes/abonnement/SiteHeader";
import s from "@/components/homes/abonnement/landing.module.scss";
import site from "@/components/site/site.module.scss";

const ROOT_ID = "site-root";

// Habillage commun à toutes les pages hors accueil : mêmes polices, header,
// footer et CTA final que la landing, pour un site visuellement unifié.
export default function SiteShell({
  children,
  finalCta = true,
}: {
  children: React.ReactNode;
  finalCta?: boolean;
}) {
  return (
    <div id={ROOT_ID} className={`${s.root} ${site.shell}`}>
      <Fonts />
      <SiteHeader />
      <main>
        {children}
        {finalCta && <FinalCta />}
      </main>
      <SiteFooter />
      <RevealObserver rootId={ROOT_ID} />
    </div>
  );
}
