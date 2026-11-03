import CtaLink from "@/components/homes/abonnement/CtaLink";
import { ArrowRight, Plus } from "@/components/homes/abonnement/icons";
import landing from "@/components/homes/abonnement/landing.module.scss";
import { Crumbs } from "@/components/site/PageHead";
import SiteShell from "@/components/site/SiteShell";
import s from "@/components/site/site.module.scss";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Tarifs : prix d'une agence d'automatisation IA | Fyliz";
const description =
  "Prix d'une agence d'automatisation IA : 3 000 € HT/mois sans engagement, demandes illimitées, maintenance comprise, ou projet sur devis. Ce qui est inclus, comparé à un recrutement.";
const pageUrl = "https://fyliz.com/tarifs";

export const metadata: Metadata = {
  ...constructMetadata({
    title,
    description,
    alternates: { canonical: pageUrl },
  }),
  // `absolute` évite un second suffixe « | Fyliz » ajouté par le template du layout.
  title: { absolute: title },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: siteConfig.name,
    images: [{ url: "/og", width: 1200, height: 630, alt: title }],
    type: "website",
    locale: "fr_FR",
  },
};

const faq = [
  {
    question: "Combien coûte une agence d'automatisation IA ?",
    answer:
      "Deux modèles coexistent : le projet au forfait, dont le prix dépend du périmètre, et l'abonnement mensuel. Chez Fyliz, l'abonnement coûte 3 000 € HT/mois sans engagement, construction, maintenance et évolutions comprises. Un besoin ponctuel bien délimité est chiffré sur devis.",
  },
  {
    question: "Combien coûte une automatisation n8n ?",
    answer:
      "Une automatisation n8n simple, qui relie deux ou trois outils, se construit en quelques jours. Le prix monte avec le nombre d'outils connectés, la part d'IA, le volume traité et la maintenance attendue. Chez Fyliz, on choisit l'outil selon le besoin : n8n quand c'est le plus simple, du code sur mesure quand il faut aller plus loin. Avec l'abonnement, tout est compris dans les 3 000 € HT/mois ; en projet, on chiffre au forfait après diagnostic.",
  },
  {
    question: "Que construisez-vous concrètement ?",
    answer:
      "Des applications et des automatisations sur mesure, le plus souvent en code, des agents IA, et le déploiement de Claude et Claude Code dans tes équipes. On utilise aussi n8n quand c'est l'outil le plus simple pour le besoin. Tout est hébergé sur tes comptes.",
  },
  {
    question: "Les demandes sont-elles vraiment illimitées ?",
    answer:
      "Oui, il n'y a pas de plafond de demandes. On les traite une par une, dans l'ordre de priorité que tu choisis. Chacune est estimée avant de démarrer, et un gros projet est découpé en livrables.",
  },
  {
    question: "Qu'est-ce qui n'est pas inclus dans le prix ?",
    answer:
      "Les serveurs, les abonnements logiciels (CRM, outils métier, n8n s'il est utilisé), les licences Claude de tes équipes et la consommation des API d'IA. Ils restent payés sur tes propres comptes, ce qui te garantit d'en rester propriétaire. On t'aide à choisir les options les plus économiques.",
  },
  {
    question: "Y a-t-il des frais de mise en place ?",
    answer:
      "Non. L'onboarding (accès à tes outils, feuille de route du premier mois) fait partie de l'abonnement. On démarre 48 h après l'appel découverte.",
  },
  {
    question: "Peut-on faire une pause ou arrêter ?",
    answer:
      "Oui. L'abonnement est sans engagement : la résiliation prend effet à la fin du mois en cours. En pause, les jours non utilisés du mois sont conservés et repris quand tu relances.",
  },
  {
    question: "Que deviennent les automatisations si j'arrête ?",
    answer:
      "Elles continuent de tourner. Les comptes, le code, les workflows et la documentation sont à ton nom dès le départ.",
  },
  {
    question: "Comment obtenir un devis pour un projet ?",
    answer:
      "Réserve un appel découverte de 30 minutes. On regarde ton processus, puis on te propose soit un forfait avec périmètre, prix et critères de réussite, soit l'abonnement si tu as plusieurs automatisations à mener.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Agence d'automatisation IA Fyliz",
      serviceType: "Automatisation IA, agents IA, applications sur mesure et déploiement de Claude",
      url: pageUrl,
      provider: { "@id": "https://fyliz.com/#organization" },
      areaServed: { "@type": "Country", name: "France" },
      audience: { "@type": "BusinessAudience", audienceType: "PME" },
      offers: [
        {
          "@type": "Offer",
          name: "Abonnement Fyliz",
          description:
            "Demandes d'automatisation illimitées, applications et automatisations sur mesure, agents IA, déploiement de Claude et Claude Code, maintenance, corrections et dépannage sous 24 h, point mensuel, documentation, formation des équipes. Sans engagement. Logiciels et API d'IA payés sur les comptes du client.",
          price: "3000",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "3000",
            priceCurrency: "EUR",
            unitText: "mois",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
            valueAddedTaxIncluded: false,
          },
          url: pageUrl,
        },
        {
          "@type": "Offer",
          name: "Projet sur devis",
          description:
            "Diagnostic du processus, proposition au forfait, livraison testée et documentée.",
          url: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://fyliz.com/" },
        { "@type": "ListItem", position: 2, name: "Tarifs", item: pageUrl },
      ],
    },
  ],
};

const keyFacts = [
  { value: "3 000 €", label: "HT/mois, tout compris" },
  { value: "Illimitées", label: "demandes, par priorité" },
  { value: "48 h", label: "pour démarrer" },
  { value: "0", label: "engagement" },
];

const toc = [
  { id: "prix-marche", label: "Combien coûte une agence d'automatisation IA ?" },
  { id: "abonnement", label: "L'abonnement Fyliz" },
  { id: "fonctionnement", label: "Comment fonctionne l'abonnement" },
  { id: "exemple", label: "Exemple : Equity Family" },
  { id: "projet", label: "Projet sur devis" },
  { id: "comparatif", label: "Abonnement, projet ou recrutement" },
  { id: "faq", label: "FAQ" },
];

function Cta({ name, note }: { name: string; note: string }) {
  return (
    <div className={s.inlineCta}>
      <CtaLink href={siteConfig.cta.buttonLink} ctaName={name} className={landing.btnPrimary}>
        Réserver un appel découverte
        <ArrowRight />
      </CtaLink>
      <p>{note}</p>
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Illustrations 1280 px de large : défilement horizontal sur mobile pour garder le texte lisible.
function Illustration({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <figure className={s.illustration}>
      <div>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    </figure>
  );
}

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteShell>
        <article>
          <div className={landing.container}>
            <header className={`${s.pageHead} ${s.landingHead}`}>
              <Crumbs items={[{ href: "/", label: "Accueil" }, { label: "Tarifs" }]} />
              <h1 className={`${s.title} ${s.titleXl}`}>
                Tarifs : le prix de ton{" "}
                <span className={landing.serif}>agence d&apos;automatisation IA</span>
              </h1>
              <p className={s.intro}>
                Chez Fyliz, une <strong>agence d&apos;automatisation IA</strong> coûte{" "}
                <strong>3 000 € HT par mois</strong>, sans engagement : demandes
                illimitées, applications et automatisations sur mesure, agents IA,
                Claude déployé dans tes équipes, construits, maintenus et améliorés. Pour un besoin unique et bien délimité, on propose aussi un
                projet au forfait sur devis.
              </p>
              <div className={s.heroActions}>
                <CtaLink
                  href={siteConfig.cta.buttonLink}
                  ctaName="tarifs_hero_appel_decouverte"
                  className={landing.btnPrimary}
                >
                  Réserver un appel découverte
                  <ArrowRight />
                </CtaLink>
                <a href="#abonnement" className={landing.btnGhost}>
                  Voir ce qui est inclus
                </a>
              </div>
              <div className={s.meta}>
                <Image
                  src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                  alt=""
                  width={36}
                  height={36}
                />
                <span>
                  Par <strong>Camille Vingere</strong>, fondateur de Fyliz
                </span>
                <span className={s.metaDot} aria-hidden />
                <span>
                  Mis à jour le <time dateTime="2026-11-02">2 novembre 2026</time>
                </span>
              </div>
              <ul className={s.keyFacts}>
                {keyFacts.map((fact) => (
                  <li key={fact.label}>
                    <strong>{fact.value}</strong>
                    <span>{fact.label}</span>
                  </li>
                ))}
              </ul>
            </header>

            <div className={s.narrow}>
              <nav className={s.toc} aria-label="Sommaire">
                <p>Sommaire</p>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.label}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className={s.prose}>
                <h2 id="prix-marche">Combien coûte une agence d&apos;automatisation IA ?</h2>
                <p>
                  Le prix d&apos;une agence d&apos;automatisation IA dépend d&apos;abord
                  de son modèle. Sur le marché français, on en trouve deux :
                </p>
                <ul>
                  <li>
                    <strong>Le projet au forfait</strong> : l&apos;agence chiffre un
                    périmètre, le livre, puis facture à part la maintenance et chaque
                    évolution. Le prix varie de quelques milliers à plusieurs dizaines de
                    milliers d&apos;euros selon le nombre d&apos;outils, la part
                    d&apos;IA et le volume traité.
                  </li>
                  <li>
                    <strong>L&apos;abonnement mensuel</strong> : un montant fixe chaque
                    mois pour une équipe qui construit, maintient et fait évoluer tes
                    automatisations en continu.
                  </li>
                </ul>
                <p>
                  Fyliz a choisi l&apos;abonnement, parce qu&apos;une automatisation
                  n&apos;est jamais terminée : une API change de version, un champ de
                  CRM est renommé, un nouveau modèle d&apos;IA fait mieux pour moins
                  cher. Le projet sur devis reste possible pour un besoin ponctuel.
                </p>

                <h2 id="abonnement">L&apos;abonnement Fyliz : 3 000 € HT par mois</h2>
                <p>
                  Un prix fixe, sans quota de demandes ni avenant. Ce que tu paies à
                  Fyliz couvre le travail de l&apos;équipe ; les outils restent payés
                  sur tes comptes, à ton nom.
                </p>
                <Table
                  head={["Élément", "Inclus", "À ta charge (sur tes comptes)"]}
                  rows={[
                    ["Conception et construction des automatisations", "Oui", "Non"],
                    ["Applications et automatisations sur mesure (code ou n8n)", "Oui", "Non"],
                    ["Agents IA, déploiement de Claude et Claude Code", "Oui", "Non"],
                    ["Maintenance, corrections, dépannage sous 24 h", "Oui", "Non"],
                    ["Évolutions des automatisations existantes", "Oui", "Non"],
                    ["Point mensuel de priorisation", "Oui", "Non"],
                    ["Documentation et formation des équipes", "Oui", "Non"],
                    ["Onboarding et feuille de route du premier mois", "Oui", "Non"],
                    ["Serveurs, CRM et logiciels (dont n8n s'il est utilisé)", "Non", "Oui"],
                    ["Licences Claude et consommation des API d'IA", "Non", "Oui"],
                  ]}
                />

                <h2 id="fonctionnement">Comment fonctionne l&apos;abonnement ?</h2>
                <h3>Une file de demandes, traitée par priorité</h3>
                <p>
                  Tu ajoutes tes demandes dans un tableau partagé, sans plafond. On les
                  classe ensemble, chacune est estimée avant de démarrer, et les demandes
                  passent une par une dans l&apos;ordre que tu choisis. Un gros projet,
                  comme un agent IA connecté à plusieurs logiciels, est découpé en
                  livrables pour que tu voies des résultats chaque semaine.
                </p>
                <h3>Des délais courts</h3>
                <ul>
                  <li>Démarrage 48 h après l&apos;appel découverte.</li>
                  <li>Une automatisation simple tourne en quelques jours.</li>
                  <li>Un agent IA plus ambitieux est livré par étapes.</li>
                  <li>Un workflow en panne est pris en charge sous 24 h.</li>
                </ul>
                <h3>Tout t&apos;appartient, sortie sans engagement</h3>
                <p>
                  Les automatisations sont hébergées sur tes comptes et documentées. La
                  résiliation prend effet à la fin du mois en cours, et tout ce qui a
                  été livré continue de tourner. Tu peux aussi mettre l&apos;abonnement
                  en pause : les jours non utilisés du mois sont conservés.
                </p>

                <Cta
                  name="tarifs_abonnement_appel_decouverte"
                  note="30 min, gratuit. On regarde ensemble si l'abonnement se justifie pour ton activité."
                />

                <h2 id="exemple">Ce que l&apos;abonnement a livré chez Equity Family</h2>
                <p>
                  Equity Family, du groupe MLX MEDIA, vend ses programmes par webinaire.
                  Plutôt que de recruter un développeur et un expert en automatisation,
                  le groupe a pris l&apos;abonnement. Aucune de ces livraisons
                  n&apos;était prévue au départ : chacune est née d&apos;un besoin apparu
                  en cours de route.
                </p>
                <ul>
                  <li>
                    <strong>Réduire le coût des automatisations</strong> : migration de
                    Make, facturé à l&apos;opération, vers n8n auto-hébergé.
                  </li>
                  <li>
                    <strong>Remplir les lives</strong> : chauffe WhatsApp avant chaque
                    webinaire et emails qui suivent ce que chaque inscrit a fait.
                  </li>
                  <li>
                    <strong>Setia</strong> : un setter IA développé sur mesure, qui
                    qualifie les prospects sur WhatsApp et remplace un SaaS.
                  </li>
                  <li>
                    <strong>Tracking</strong> : une plateforme d&apos;analyse sur mesure
                    qui calcule la rentabilité de chaque webinaire, à la place d&apos;un
                    tableur rempli à la main.
                  </li>
                  <li>
                    <strong>MLX Compta</strong> : factures, échéanciers et relances des
                    paiements en retard.
                  </li>
                </ul>
                <Illustration
                  src="/assets/images/agence-n8n/equity-family-tunnel-webinaire-n8n.webp"
                  alt="Le tunnel webinaire d'Equity Family et ce que l'abonnement Fyliz a automatisé à chaque étape"
                  width={1280}
                  height={840}
                />
                <p>
                  Le détail est dans le{" "}
                  <Link href="/cas-clients/equity-family-automatiser-un-tunnel-de-vente-par-webinaire">
                    cas client Equity Family
                  </Link>
                  .
                </p>

                <h2 id="projet">Projet sur devis : combien coûte une automatisation ?</h2>
                <p>
                  Un seul besoin, bien délimité ? On diagnostique ton processus, on te
                  propose un forfait avec un périmètre, un prix et des critères de
                  réussite, puis on livre une automatisation testée et documentée, sans
                  abonnement.
                </p>
                <p>
                  Le prix d&apos;une automatisation, qu&apos;elle soit construite en
                  code, avec n8n ou autour d&apos;un agent IA, dépend de quatre
                  facteurs :
                </p>
                <ul>
                  <li>
                    <strong>Le nombre d&apos;outils connectés</strong> : relier un
                    formulaire à un CRM n&apos;a rien à voir avec synchroniser un ERP,
                    une compta et un outil de support.
                  </li>
                  <li>
                    <strong>La part d&apos;IA</strong> : lire des factures, rédiger des
                    relances ou répondre aux clients demande des tests et des garde-fous.
                  </li>
                  <li>
                    <strong>Le volume et la criticité</strong> : un workflow qui traite
                    des milliers de commandes doit gérer les erreurs et les reprises.
                  </li>
                  <li>
                    <strong>La maintenance attendue</strong> : en projet, elle se
                    facture à part ; dans l&apos;abonnement, elle est comprise.
                  </li>
                </ul>
                <p>
                  Quand n8n est l&apos;outil le plus simple, on l&apos;utilise : voir
                  notre page <Link href="/agence-n8n">agence n8n</Link>.
                </p>

                <h2 id="comparatif">Abonnement, projet ou recrutement : que choisir ?</h2>
                <Table
                  head={["", "Abonnement Fyliz", "Agence au projet", "Recruter un profil IA"]}
                  rows={[
                    ["Première automatisation", "Quelques jours", "6 à 10 semaines", "3 à 6 mois"],
                    ["Coût", "3 000 € HT/mois", "Devis à chaque projet", "Salaire chargé + recrutement"],
                    ["Maintenance", "Comprise", "En supplément", "Comprise, si la personne reste"],
                    ["Compétences", "Dev, IA, Claude, n8n", "Selon le projet", "Un seul profil"],
                    ["Engagement", "Aucun", "Le périmètre du devis", "Contrat de travail"],
                  ]}
                />
                <p>
                  Recruter reste pertinent quand l&apos;IA devient un métier à part
                  entière chez toi. Avant d&apos;en arriver là, l&apos;abonnement te
                  permet de lancer tes premières automatisations sans délai de
                  recrutement, avec plusieurs compétences réunies. Le projet convient à
                  un besoin unique qui ne bougera plus.
                </p>
                <p>
                  Les résultats obtenus par nos clients sont détaillés dans nos{" "}
                  <Link href="/cas-clients">cas clients</Link>, et les tâches
                  qu&apos;on automatise le plus souvent dans nos{" "}
                  <Link href="/solutions-automatisation-ia">solutions d&apos;automatisation IA</Link>.
                </p>

                <Cta
                  name="tarifs_comparatif_appel_decouverte"
                  note="On te dit franchement si un projet sur devis suffit pour ton besoin."
                />

                <h2 id="faq">FAQ : tarifs d&apos;une agence d&apos;automatisation IA</h2>
              </div>

              <div className={landing.faqList}>
                {faq.map((item) => (
                  <details key={item.question} className={landing.faqItem}>
                    <summary>
                      <h3 className={s.faqQuestion}>{item.question}</h3>
                      <span className={landing.faqIcon} aria-hidden>
                        <Plus />
                      </span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>

              <div className={`${s.prose} ${s.afterFaq}`}>
                <h2 id="a-retenir">Tarifs Fyliz : l&apos;essentiel</h2>
                <ul>
                  <li>
                    <strong>Abonnement</strong> : 3 000 € HT/mois, demandes illimitées,
                    construction, maintenance et évolutions comprises.
                  </li>
                  <li>
                    <strong>Projet</strong> : sur devis, au forfait, après diagnostic.
                  </li>
                  <li>
                    <strong>À ta charge</strong> : logiciels et API d&apos;IA, sur tes
                    comptes, à ton nom.
                  </li>
                  <li>
                    <strong>Sans engagement</strong> : résiliation en fin de mois, pause
                    possible, tout reste à toi.
                  </li>
                </ul>
                <p>
                  Fyliz est ton <Link href="/">équipe IA externalisée</Link> : des
                  experts qui conçoivent, déploient et maintiennent tes automatisations
                  sans que tu aies à recruter.
                </p>
              </div>
              <div className={s.pageEnd} />
            </div>
          </div>
        </article>
      </SiteShell>
    </>
  );
}
