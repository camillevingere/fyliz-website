import Automations from "./Automations";
import CaseStudies from "./CaseStudies";
import Comparison from "./Comparison";
import Faq from "./Faq";
import Fonts from "./Fonts";
import FinalCta from "./FinalCta";
import Hero from "./Hero";
import Logos from "./Logos";
import Method from "./Method";
import Pricing from "./Pricing";
import RevealObserver from "./RevealObserver";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import Testimonials from "./Testimonials";
import s from "./landing.module.scss";

const ROOT_ID = "landing-abonnement";

export default function LandingPage() {
  return (
    <div id={ROOT_ID} className={s.root}>
      <Fonts />
      <SiteHeader />
      <main>
        <Hero />
        <Logos />
        <Comparison />
        <Automations />
        <Method />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <RevealObserver rootId={ROOT_ID} />
    </div>
  );
}
