import CtaLink from "@/components/homes/abonnement/CtaLink";
import { ArrowRight, Plus } from "@/components/homes/abonnement/icons";
import landing from "@/components/homes/abonnement/landing.module.scss";
import { Crumbs } from "@/components/site/PageHead";
import SiteShell from "@/components/site/SiteShell";
import s from "@/components/site/site.module.scss";
import { brands6 } from "@/data/brands";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const title = "Agence n8n en France : experts n8n pour PME | Fyliz";
const description =
  "Agence n8n en France : nos experts créent, hébergent et maintiennent tes workflows n8n et agents IA. 3 000 € HT/mois sans engagement, démarrage sous 48 h.";
const pageUrl = "https://fyliz.com/agence-n8n";

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
    question: "Qu'est-ce qu'une agence n8n ?",
    answer:
      "Une agence n8n conçoit, déploie et maintient des automatisations construites avec n8n, l'outil open source d'automatisation de workflows. Elle relie tes logiciels (CRM, facturation, messagerie, IA) et prend en charge le suivi une fois les workflows en production.",
  },
  {
    question: "Combien coûte une agence n8n ?",
    answer:
      "Chez Fyliz, 3 000 € HT/mois sans engagement, construction et maintenance comprises, ou un projet au forfait sur devis. Les abonnements logiciels (n8n, CRM) et la consommation des API d'IA restent payés sur tes propres comptes.",
  },
  {
    question: "Agence n8n ou expert n8n freelance : que choisir ?",
    answer:
      "Un expert n8n freelance convient à un besoin ponctuel bien défini. Une agence n8n convient quand tu as plusieurs automatisations à construire et à maintenir dans la durée : une équipe assure la continuité, le dépannage et les évolutions.",
  },
  {
    question: "Faut-il savoir coder pour garder la main sur ses workflows ?",
    answer:
      "Non. Chaque livrable est documenté et on forme tes équipes. n8n est un outil sans code : chez MySkillFactory, c'est justement ce qui permet au client de modifier ses workflows sans développeur.",
  },
  {
    question: "Que se passe-t-il si un workflow tombe en panne ?",
    answer:
      "On prend en charge le dépannage sous 24 h. La maintenance et les corrections sont incluses dans l'abonnement, sans facture supplémentaire.",
  },
  {
    question: "Peut-on créer des agents IA avec n8n ?",
    answer:
      "Oui. n8n intègre des nœuds IA qui se branchent sur OpenAI ou Claude. On y ajoute un RAG pour que l'agent connaisse tes documents, et des MCP pour qu'il agisse dans tes logiciels.",
  },
  {
    question: "Pouvez-vous migrer nos automatisations de Make ou Zapier vers n8n ?",
    answer:
      "Oui. On audite l'existant, puis on reprend, corrige ou reconstruit sur n8n ce qui doit l'être. On a par exemple migré les automatisations Make d'Equity Family vers n8n auto-hébergé.",
  },
  {
    question: "Combien de temps pour une première automatisation ?",
    answer:
      "On démarre 48 h après le premier appel. Une automatisation simple tourne ensuite en quelques jours, les agents IA plus ambitieux sont livrés par étapes. Chaque demande est estimée avant de démarrer.",
  },
  {
    question: "n8n est-il gratuit ?",
    answer:
      "La version self-hosted est gratuite pour un usage interne, sous licence fair-code. n8n Cloud est payant. Dans les deux cas, ces coûts sont réglés sur tes comptes.",
  },
  {
    question: "Si j'arrête l'abonnement, qu'est-ce que je récupère ?",
    answer:
      "Tout. Les comptes, les workflows et la documentation sont à ton nom dès le départ. La résiliation prend effet à la fin du mois en cours et tes automatisations continuent de tourner.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fyliz.com/#organization",
      name: "Fyliz",
      url: "https://fyliz.com",
      founder: { "@id": "https://fyliz.com/#camille-vingere" },
    },
    {
      "@type": "Person",
      "@id": "https://fyliz.com/#camille-vingere",
      name: "Camille Vingere",
      jobTitle: "Fondateur",
      image:
        "https://fyliz.com/assets/images/team/camille-vingere-fondateur-fyliz.webp",
      worksFor: { "@id": "https://fyliz.com/#organization" },
      sameAs: [
        "https://www.linkedin.com/in/camille-vingere-developpeur-fullstack/",
        "https://www.youtube.com/@camilleroydev",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://fyliz.com/agence-n8n#service",
      name: "Agence n8n",
      serviceType: "Automatisation n8n et agents IA",
      description:
        "Conception, déploiement et maintenance de workflows n8n et d'agents IA pour PME, hébergés sur les comptes du client dans l'Union européenne. Abonnement mensuel sans engagement, demandes illimitées, démarrage sous 48 h, dépannage pris en charge sous 24 h, ou projet au forfait sur devis.",
      url: "https://fyliz.com/agence-n8n",
      provider: { "@id": "https://fyliz.com/#organization" },
      areaServed: { "@type": "Country", name: "France" },
      audience: { "@type": "BusinessAudience", audienceType: "PME" },
      offers: [
        {
          "@type": "Offer",
          name: "Abonnement Fyliz",
          description:
            "Demandes d'automatisation illimitées, workflows n8n et agents IA sur mesure, maintenance, corrections et dépannage sous 24 h, point mensuel, documentation, formation des équipes. Sans engagement. Logiciels et API d'IA payés sur les comptes du client.",
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
          url: "https://fyliz.com/agence-n8n",
        },
        {
          "@type": "Offer",
          name: "Projet sur devis",
          description:
            "Diagnostic du processus, proposition au forfait, livraison testée et documentée.",
          url: "https://fyliz.com/agence-n8n",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://fyliz.com/agence-n8n#faq",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://fyliz.com/agence-n8n#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://fyliz.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Agence n8n",
          item: "https://fyliz.com/agence-n8n",
        },
      ],
    },
  ],
};

const external = { target: "_blank", rel: "noopener noreferrer" };

const bfmUrl =
  "https://www.bfmtv.com/economie/replay-emissions/l-hebdo-des-pme/video-herve-debbah-j-a-ime-j-a-ime-solution-a-base-d-ia-pour-l-hotellerie-20-12_VN-202512200140.html";

const keyFacts = [
  { value: "50+", label: "entreprises accompagnées" },
  { value: "48 h", label: "pour démarrer" },
  { value: "24 h", label: "pour un dépannage" },
  { value: "3 000 €", label: "HT/mois, sans engagement" },
];

const toc = [
  { id: "definition", label: "Qu'est-ce qu'une agence n8n ?" },
  { id: "services", label: "Nos services n8n" },
  { id: "expert-n8n", label: "Expert n8n freelance ou agence" },
  { id: "n8n-make-zapier", label: "n8n vs Make vs Zapier" },
  { id: "prix", label: "Prix d'une agence n8n" },
  { id: "methode", label: "Méthode en 4 étapes" },
  { id: "cas-clients-n8n", label: "Cas clients" },
  { id: "hebergement-rgpd", label: "Hébergement et RGPD" },
  { id: "faq", label: "FAQ" },
];

function Cta({ note }: { note: string }) {
  return (
    <div className={s.inlineCta}>
      <CtaLink
        href={siteConfig.cta.buttonLink}
        ctaName="agence_n8n_appel_decouverte"
        className={landing.btnPrimary}
      >
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

function Quote({ children, author }: { children: ReactNode; author: string }) {
  return (
    <blockquote>
      <p>{children}</p>
      <p className={s.quoteAuthor}>{author}</p>
    </blockquote>
  );
}

function ClientLogos() {
  return (
    <div className={s.logosBox}>
      <p>Ils nous ont confié leurs automatisations</p>
      <ul>
        {brands6.map((brand) => (
          <li key={brand.alt}>
            <Image
              src={brand.src}
              alt={brand.alt === "La Provence 2026" ? "La Provence" : brand.alt}
              width={brand.width}
              height={brand.height}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Illustrations 1280 px de large : défilement horizontal sur mobile pour garder le texte lisible.
function Illustration({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className={s.illustration}>
      <div>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Le lecteur BFM interdit l'intégration hors de ses domaines : miniature cliquable vers le replay.
function BfmReplay() {
  return (
    <figure className={s.illustration}>
      <a href={bfmUrl} {...external}>
        <Image
          src="/assets/images/press/bfm-business-j-aime-replay.webp"
          alt="Hervé Debbah présente J'aime, solution à base d'IA pour l'hôtellerie, sur BFM Business : voir le replay"
          width={1280}
          height={720}
        />
      </a>
      <figcaption>L&apos;hebdo des PME, BFM Business : voir le replay sur bfmtv.com</figcaption>
    </figure>
  );
}

export default function AgenceN8nPage() {
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
              <Crumbs items={[{ href: "/", label: "Accueil" }, { label: "Agence n8n" }]} />
              <h1 className={`${s.title} ${s.titleXl}`}>
                Agence n8n en France :{" "}
                <span className={landing.serif}>création et maintenance</span> de
                workflows n8n pour PME
              </h1>
              <p className={s.intro}>
                Fyliz est une <strong>agence n8n</strong> française. Nos experts n8n
                conçoivent, déploient et maintiennent tes workflows et tes agents IA,
                hébergés sur tes comptes dans l&apos;Union européenne. Abonnement à
                3 000 € HT/mois sans engagement : demandes illimitées, démarrage sous
                48 h, dépannage sous 24 h.
              </p>
              <div className={s.heroActions}>
                <CtaLink
                  href={siteConfig.cta.buttonLink}
                  ctaName="agence_n8n_hero_appel_decouverte"
                  className={landing.btnPrimary}
                >
                  Réserver un appel découverte
                  <ArrowRight />
                </CtaLink>
                <a href="#prix" className={landing.btnGhost}>
                  Voir le prix
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
                  Mis à jour le <time dateTime="2026-10-14">14 octobre 2026</time>
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
                <h2 id="definition">Qu&apos;est-ce qu&apos;une agence n8n ?</h2>
                <p>
                  Une agence n8n conçoit, déploie et maintient des automatisations
                  construites avec <a href="https://n8n.io/" {...external}>n8n</a>,
                  l&apos;outil open source d&apos;automatisation de workflows. Elle
                  relie tes logiciels (CRM, facturation, e-mails, messagerie, IA) pour
                  que les tâches répétitives se fassent sans saisie manuelle.
                </p>
                <p>
                  Son travail couvre tout le cycle : choisir quoi automatiser en
                  premier, construire et tester le workflow, l&apos;héberger,
                  documenter, puis réparer et faire évoluer quand tes outils changent.
                  C&apos;est ce dernier point qui fait la différence : une API qui
                  change de version ou un champ de CRM renommé suffit à arrêter un
                  workflow.
                </p>
                <p>
                  Exemple : tu décris un problème métier, « on perd des devis parce que
                  personne ne relance ». On le traduit en workflow n8n : un déclencheur
                  à chaque nouveau devis, une attente, une vérification dans le CRM,
                  puis une relance rédigée par un agent IA.
                </p>
                <Illustration
                  src="/assets/images/agence-n8n/workflow-relance-devis-n8n.svg"
                  alt="Exemple de workflow n8n de relance de devis construit par une agence n8n"
                  width={1280}
                  height={700}
                />

                <h3>Agence, intégrateur ou consultant n8n : quelle différence ?</h3>
                <p>
                  Le métier technique est le même : connecter tes outils avec n8n. Un{" "}
                  <strong>intégrateur n8n</strong> exécute un cahier des charges. Un{" "}
                  <strong>consultant n8n</strong> conseille et forme, sans forcément
                  construire. Une <strong>agence n8n</strong> fait les trois : le
                  conseil en amont, la construction, puis le suivi une fois le workflow
                  en production.
                </p>

                <h2 id="services">Nos services d&apos;agence n8n</h2>
                <p>
                  Fyliz a accompagné plus de 50 entreprises sur leurs automatisations.
                  Voici ce qu&apos;on prend en charge.
                </p>

                <h3>Création de workflows n8n sur mesure</h3>
                <p>
                  On construit les automatisations qui comptent pour ton activité,
                  classées par tâche plutôt que par outil (exemples types) :
                </p>
                <ul>
                  <li>
                    <strong>Ventes et prospection</strong> : enrichir un lead, le créer
                    dans HubSpot ou Pipedrive, programmer la relance.
                  </li>
                  <li>
                    <strong>Admin et finance</strong> : récupérer les factures, les
                    envoyer dans Pennylane, relancer les impayés.
                  </li>
                  <li>
                    <strong>Opérations</strong> : synchroniser Notion, Airtable et
                    Google Workspace, envoyer un reporting hebdomadaire dans Slack.
                  </li>
                  <li>
                    <strong>Support client</strong> : trier les demandes, préparer une
                    réponse, transmettre le cas complexe à la bonne personne.
                  </li>
                </ul>
                <p>
                  D&apos;autres idées dans nos{" "}
                  <Link href="/solutions-automatisation-ia">
                    cas d&apos;usage de l&apos;automatisation IA
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/automatisations-n8n">catalogue de workflows n8n</Link>.
                </p>

                <h3>Agents IA avec n8n</h3>
                <p>
                  Un workflow suit des règles fixes ; un agent IA ajoute du jugement. Il
                  lit un e-mail, le classe, rédige la réponse. Dans n8n, on branche
                  OpenAI ou Claude, on leur donne ta documentation via un RAG et on les
                  relie à tes logiciels par MCP : l&apos;agent répond avec tes données.
                  Voir notre guide pour{" "}
                  <Link href="/blog/creer-un-agent-ia-rag-sur-n8n-guide-complet">
                    créer un agent IA RAG sur n8n
                  </Link>
                  .
                </p>

                <h3>Migration de Make ou Zapier vers n8n</h3>
                <p>
                  On audite tes scénarios Make ou tes Zaps, puis on reprend, corrige ou
                  reconstruit sur n8n ce qui doit l&apos;être, sans couper ce qui
                  tourne. C&apos;est ce qu&apos;on a fait pour Equity Family (détail
                  dans les <a href="#cas-clients-n8n">cas clients</a>).
                </p>

                <h3>Maintenance et dépannage n8n</h3>
                <p>
                  Champ renommé, API modifiée, modèle d&apos;IA qui évolue : le
                  dépannage est pris en charge sous 24 h. Corrections et évolutions sont
                  incluses dans l&apos;abonnement, sans facture supplémentaire. On
                  reprend aussi des workflows construits par quelqu&apos;un
                  d&apos;autre.
                </p>

                <h3>Hébergement et formation</h3>
                <p>
                  On installe ton instance n8n (Cloud ou self-hosted) sur ton compte,
                  on documente chaque workflow et on forme tes équipes pour
                  qu&apos;elles puissent les modifier elles-mêmes.
                </p>

                <h2 id="expert-n8n">
                  Expert n8n freelance, agence au projet ou abonnement : qui choisir ?
                </h2>
                <p>
                  Tout dépend du volume et de la durée. Pour un besoin ponctuel bien
                  défini, un expert n8n freelance suffit souvent. Pour plusieurs
                  automatisations à construire et à maintenir, il faut une équipe
                  disponible dans la durée.
                </p>
                <ul>
                  <li>
                    <strong>Le faire soi-même</strong> : n8n self-hosted est gratuit et
                    les tutos abondent. Mais celui qui a tout construit devient le seul
                    à savoir réparer.
                  </li>
                  <li>
                    <strong>Un expert n8n freelance</strong> : souvent excellent
                    techniquement, mais seul. Absence ou gros client, et ton workflow
                    attend. Compare le coût sur un an (construction, maintenance,
                    évolutions), pas le prix d&apos;une journée.
                  </li>
                  <li>
                    <strong>Une agence au projet</strong> : une équipe et un livrable
                    testé, mais la maintenance est souvent en option et chaque nouvelle
                    idée appelle un nouveau devis.
                  </li>
                  <li>
                    <strong>Recruter en interne</strong> : solide sur le papier, mais
                    long et coûteux pour une seule personne censée couvrir n8n, l&apos;IA
                    et le développement. C&apos;est le calcul qu&apos;a fait Equity
                    Family avant de choisir un abonnement.
                  </li>
                  <li>
                    <strong>Make ou Zapier seuls</strong> : simples à prendre en main,
                    mais facturés à l&apos;opération ou à la tâche, donc plus chers à
                    mesure que ton volume grandit.
                  </li>
                </ul>
                <Illustration
                  src="/assets/images/agence-n8n/alternatives-agence-n8n.svg"
                  alt="Comparatif des alternatives à une agence n8n : faire soi-même, freelance, agence au projet, recrutement, Make ou Zapier, abonnement"
                  width={1280}
                  height={860}
                />
                <Table
                  head={[
                    "Critère",
                    "Expert n8n freelance",
                    "Agence au projet",
                    "Abonnement Fyliz",
                  ]}
                  rows={[
                    [
                      "Coût",
                      "Taux journalier, construction puis maintenance au temps passé",
                      "Forfait par projet + maintenance à part",
                      "3 000 € HT/mois, construction comprise",
                    ],
                    [
                      "Continuité si absence",
                      "Dépend d'une personne",
                      "Équipe, pendant le projet",
                      "Équipe en continu, dépannage sous 24 h",
                    ],
                    ["Maintenance", "À négocier", "Souvent en option", "Incluse"],
                    [
                      "Engagement",
                      "À la mission",
                      "Au projet",
                      "Sans engagement, fin de mois",
                    ],
                    [
                      "Propriété des workflows",
                      "Selon le contrat",
                      "Selon le contrat",
                      "Toi, sur tes comptes",
                    ],
                  ]}
                />

                <h2 id="n8n-make-zapier">
                  n8n vs Make vs Zapier : pourquoi une agence n8n
                </h2>
                <p>
                  On choisit n8n par défaut pour trois raisons : il est open source,
                  hébergeable chez toi, et facturé à l&apos;exécution du workflow
                  plutôt qu&apos;à chaque étape (voir la{" "}
                  <a href="https://n8n.io/pricing/" {...external}>
                    page tarifs de n8n
                  </a>
                  ). Il intègre aussi des nœuds IA natifs pour construire des agents
                  dans le même workflow.
                </p>
                <Table
                  head={["", "n8n", "Make", "Zapier"]}
                  rows={[
                    [
                      "Facturation",
                      "À l'exécution du workflow (Cloud), serveur seul en self-hosted",
                      "À l'opération",
                      "À la tâche",
                    ],
                    [
                      "Hébergement",
                      "Cloud ou self-hosted, sur ton serveur",
                      "Cloud uniquement",
                      "Cloud uniquement",
                    ],
                    ["Code source", "Ouvert (licence fair-code)", "Fermé", "Fermé"],
                    [
                      "Coût quand le volume grandit",
                      "Stable",
                      "Augmente avec les opérations",
                      "Augmente avec les tâches",
                    ],
                  ]}
                />
                <Illustration
                  src="/assets/images/agence-n8n/cout-n8n-vs-tarif-par-operation.svg"
                  alt="Coût à l'opération de Make et Zapier face au coût fixe de n8n self-hosted"
                  width={1280}
                  height={720}
                />
                <p>
                  Make et Zapier restent de bons outils pour quelques scénarios à
                  faible volume, et on intervient aussi sur Make quand il fait le
                  travail. Et quand un agent IA connecté par MCP ou du code sur mesure
                  fait mieux, c&apos;est ce qu&apos;on livre. Comparatif détaillé :{" "}
                  <a href="https://n8n-france.com/n8n-vs-make-vs-zapier/" {...external}>
                    n8n vs Make vs Zapier
                  </a>{" "}
                  sur n8n-france.com, site édité par la même équipe que Fyliz.
                </p>

                <h2 id="prix">Combien coûte une agence n8n ?</h2>
                <p>
                  Chez Fyliz, une agence n8n coûte <strong>3 000 € HT par mois</strong>,
                  sans engagement, construction, maintenance et évolutions comprises.
                  Pour un besoin unique, on propose aussi un projet au forfait sur
                  devis. Les logiciels et l&apos;IA restent payés sur tes propres
                  comptes, ce qui te garantit d&apos;en rester propriétaire.
                </p>

                <h3>Ce qui est inclus dans l&apos;abonnement</h3>
                <Table
                  head={["Élément", "Inclus", "À ta charge (sur tes comptes)"]}
                  rows={[
                    ["Conception et construction des workflows n8n", "Oui", "Non"],
                    ["Agents IA sur mesure", "Oui", "Non"],
                    ["Maintenance, corrections, dépannage sous 24 h", "Oui", "Non"],
                    ["Évolutions des workflows existants", "Oui", "Non"],
                    ["Point mensuel, documentation, formation des équipes", "Oui", "Non"],
                    ["Abonnement n8n (Cloud ou serveur self-hosted)", "Non", "Oui"],
                    ["CRM et autres logiciels", "Non", "Oui"],
                    ["Consommation des API d'IA (OpenAI, Claude…)", "Non", "Oui"],
                  ]}
                />

                <h3>Des demandes illimitées, traitées par priorité</h3>
                <p>
                  Tu ajoutes tes demandes dans un tableau partagé, sans plafond. On les
                  classe ensemble, chacune est estimée avant de démarrer, et un gros
                  projet est découpé en livrables. Les demandes passent une par une,
                  dans l&apos;ordre que tu choisis, sans quota, sans avenant et sans
                  devis à chaque nouvelle idée.
                </p>
                <Illustration
                  src="/assets/images/agence-n8n/abonnement-n8n-cycle.webp"
                  alt="Fonctionnement de l'abonnement agence n8n Fyliz : demande, priorisation, livraison, maintenance"
                  width={1280}
                  height={660}
                  caption="Un point de priorisation chaque mois, puis la boucle recommence."
                />

                <h3>Sans engagement, avec pause possible</h3>
                <p>
                  La résiliation prend effet à la fin du mois en cours. Tu peux aussi
                  faire une pause : les jours non utilisés du mois sont conservés. Si tu
                  arrêtes, tes automatisations continuent de tourner, puisqu&apos;elles
                  sont sur tes comptes.
                </p>

                <h3>Le projet n8n ponctuel sur devis</h3>
                <p>
                  Un seul besoin, bien délimité ? On diagnostique ton processus, on te
                  propose un forfait, puis on livre une automatisation testée et
                  documentée, sans abonnement.
                </p>

                <Cta note="30 min pour auditer ton activité et voir si l'abonnement se justifie, ou si un projet sur devis suffit." />

                <h2 id="methode">Notre méthode d&apos;agence n8n en 4 étapes</h2>
                <p>
                  On démarre 48 h après le premier appel, et ta première automatisation
                  simple tourne en quelques jours.
                </p>
                <ol>
                  <li>
                    <strong>Consultation (30 min).</strong> On audite ton activité et
                    tes priorités d&apos;automatisation.
                  </li>
                  <li>
                    <strong>Onboarding, sous 48 h.</strong> Tu nous donnes accès à tes
                    outils, on crée ou on reprend ton instance n8n sur ton compte, et on
                    fixe la feuille de route du premier mois.
                  </li>
                  <li>
                    <strong>Demandes et livraisons.</strong> Chaque automatisation est
                    estimée, construite, testée, puis documentée avant sa mise en
                    production.
                  </li>
                  <li>
                    <strong>Maintenance et amélioration.</strong> On corrige, on dépanne
                    sous 24 h, on fait évoluer. Les priorités sont revues chaque mois.
                  </li>
                </ol>
                <Illustration
                  src="/assets/images/agence-n8n/timeline-abonnement-n8n.svg"
                  alt="Méthode de l'agence n8n Fyliz, de la consultation à la revue mensuelle"
                  width={1280}
                  height={600}
                />

                <h2 id="cas-clients-n8n">Cas clients : workflows n8n et agents IA livrés</h2>
                <p>
                  Quatre projets nommés, décrits tels qu&apos;ils ont été livrés : deux
                  sur n8n, deux sans.
                </p>

                <h3>Equity Family : tunnel de vente par webinaire migré de Make vers n8n</h3>
                <p>
                  Equity Family (groupe MLX MEDIA) vend des programmes de coaching par
                  webinaire live. Ses automatisations tournaient sur Make, facturé à
                  l&apos;opération : plus d&apos;inscrits, plus de frais. On a tout
                  migré sur n8n, auto-hébergé sur un serveur dédié du client.
                </p>
                <p>
                  On a ensuite construit la synchronisation de l&apos;emailing, du CRM,
                  de l&apos;agenda et de la plateforme de webinaire à chaque
                  inscription, une chauffe WhatsApp avant chaque webinaire, des e-mails
                  ActiveCampaign adaptés au comportement de chaque inscrit, puis des
                  outils sur mesure : un setter IA, une plateforme d&apos;analyse, un
                  suivi des clients sur Airtable et un outil de facturation. Quand le
                  client a changé de plateforme de webinaire, on a tout adapté sans
                  nouveau devis.
                </p>
                <Illustration
                  src="/assets/images/agence-n8n/equity-family-tunnel-webinaire-n8n.webp"
                  alt="Tunnel webinaire Equity Family automatisé sur n8n"
                  width={1280}
                  height={840}
                  caption="Le tunnel d'Equity Family, de l'inscription à la vente."
                />
                <p>
                  Lire le{" "}
                  <Link href="/cas-clients/equity-family-automatiser-un-tunnel-de-vente-par-webinaire">
                    cas Equity Family
                  </Link>
                  .
                </p>

                <h3>MySkillFactory : agents IA n8n pour un organisme de formation</h3>
                <p>
                  Pour INAFON, l&apos;organisme de formation des notaires et client de
                  MySkillFactory, on a construit sur n8n un chatbot en RAG sur le
                  catalogue relié au CRM Odoo par MCP, l&apos;analyse des
                  questionnaires de satisfaction, une veille du droit notarial avec
                  validation humaine et des e-mails personnalisés par profil. n8n étant
                  sans code, l&apos;équipe du client modifie ses workflows sans
                  développeur. Lire le{" "}
                  <Link href="/cas-clients/myskillfactory-agents-ia-pour-organisme-de-formation">
                    cas MySkillFactory et INAFON
                  </Link>
                  .
                </p>
                <Quote author="Juliette Brunelot, MySkillFactory, 22/08/2025">
                  « Camille a été très réactif. Nous avons pu programmer rapidement
                  notre séance de travail qui a été efficace. Nous avons atteint les
                  objectifs fixés. Merci Camille »
                </Quote>

                <h3>J&apos;aime : un SAV hôtelier géré par un agent IA</h3>
                <p>
                  Pour l&apos;hôtel J&apos;aime, on a construit un agent IA qui répond
                  aux e-mails et aux messages WhatsApp en consultant réservations et
                  disponibilités via un MCP connecté au logiciel de réservation. Pas de
                  n8n ici : l&apos;agent connecté par MCP faisait mieux le travail. Le
                  client a présenté la solution dans{" "}
                  <a href={bfmUrl} {...external}>
                    L&apos;hebdo des PME sur BFM Business
                  </a>
                  .
                </p>
                <BfmReplay />
                <p>
                  Voir le{" "}
                  <Link href="/cas-clients/j-aime-sav-ia-pour-lhotellerie">
                    cas J&apos;aime
                  </Link>{" "}
                  et notre guide pour{" "}
                  <Link href="/blog/comment-creer-un-mcp-pour-automatiser-les-reponses-clients-dans-lhotellerie">
                    créer un MCP qui répond aux clients d&apos;un hôtel
                  </Link>
                  .
                </p>

                <h3>Crédit Agricole (Linxo) : tests d&apos;intégration automatisés</h3>
                <p>
                  Une mission de développement, sans n8n. Sur Linxo Connect, service de
                  Linxo (groupe Crédit Agricole), on a développé des fonctionnalités en
                  React et Express et automatisé les tests d&apos;intégration avec une
                  machine à états. Ils couvrent environ 70 % des cas de figure, selon
                  le{" "}
                  <Link href="/cas-clients/credit-agricole-automatisation-des-tests-dintegration">
                    cas Crédit Agricole
                  </Link>
                  . Quand un besoin dépasse n8n, la même équipe écrit le code.
                </p>

                <h3>Avis clients</h3>
                <Quote author="Hervé, Parness Cruises, 13/08/2025">
                  « Il fallait installer n8n MCP pour Claude. Camille connaît
                  parfaitement son sujet et, en sus d&apos;effectuer cette
                  installation, il a à cœur de vous former pour vous rendre autonome.
                  Un état d&apos;esprit remarquable à la hauteur de ses compétences
                  techniques. »
                </Quote>
                <Quote author="Frederic, Everest Startup Studio, 08/10/2026">
                  « Camille est très pédagogue et efficace ! En quelques sessions il
                  m&apos;a formé sur les bases de l&apos;automatisation IA et nous avons
                  créé une architecture et une application déjà déployée et utile. Je
                  recommande ! »
                </Quote>
                <p>
                  D&apos;autres entreprises nous ont confié leurs automatisations, dont
                  Crédit Agricole, La Provence, Montblanc, Ford, CMA CGM, VIP Paris
                  Hotel et Groupe M6. Tous les projets sont sur la page{" "}
                  <Link href="/cas-clients">cas clients</Link>.
                </p>
                <ClientLogos />

                <h2 id="hebergement-rgpd">
                  Hébergement n8n, données et RGPD : tout reste chez toi
                </h2>
                <p>
                  Ton instance n8n, tes clés d&apos;API, tes workflows et leur
                  documentation sont à ton nom dès le premier jour, hébergés dans
                  l&apos;Union européenne. Fyliz n&apos;a qu&apos;un accès délégué, que
                  tu donnes et que tu peux retirer à tout moment. Si tu arrêtes, tu
                  récupères tout.
                </p>
                <Illustration
                  src="/assets/images/agence-n8n/propriete-instance-n8n.svg"
                  alt="Agence n8n : workflows et données sur les comptes du client, accès Fyliz révocable"
                  width={1280}
                  height={680}
                />

                <h3>n8n Cloud ou self-hosted : lequel choisir ?</h3>
                <p>
                  n8n Cloud est hébergé par l&apos;éditeur : rien à installer, mises à
                  jour automatiques, abonnement mensuel. Le self-hosted tourne sur ton
                  serveur : le logiciel est gratuit pour un usage interne, tu paies
                  seulement l&apos;hébergement, avec plus de contrôle sur les données,
                  mais une infrastructure à maintenir. On tranche ensemble à
                  l&apos;onboarding. Prix et différences dans notre comparatif{" "}
                  <Link href="/blog/n8n-cloud-vs-self-hosted">
                    n8n Cloud vs self-hosted
                  </Link>
                  .
                </p>

                <h3>RGPD et sécurité des accès</h3>
                <p>
                  Trois engagements : tes workflows et tes données sont hébergés dans
                  l&apos;Union européenne ; on signe un DPA, l&apos;accord de
                  sous-traitance prévu par le RGPD ; et on travaille uniquement depuis
                  des accès sur tes comptes, limités aux outils nécessaires.
                </p>

                <h2 id="n8n-pas-adapte">Quand n8n n&apos;est pas le bon choix</h2>
                <ul>
                  <li>
                    <strong>Une tâche déjà couverte par ton logiciel.</strong> Si ton
                    CRM relance un devis tout seul, active la fonction.
                  </li>
                  <li>
                    <strong>Un outil sans API.</strong> L&apos;automatisation devient
                    fragile. On te le dit dès la consultation.
                  </li>
                  <li>
                    <strong>Un besoin de développement.</strong> Une interface ou une
                    application sur mesure s&apos;écrit en code.
                  </li>
                  <li>
                    <strong>Un volume très faible.</strong> Deux automatisations par an
                    ne justifient pas 3 000 € HT/mois : un projet sur devis suffit.
                  </li>
                </ul>

                <h2 id="equipe">Qui est derrière l&apos;agence n8n Fyliz</h2>
                <div className={s.author}>
                  <Image
                    src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                    alt="Camille Vingere, fondateur de l'agence n8n Fyliz"
                    width={120}
                    height={120}
                  />
                  <div>
                    <p>
                      Fyliz a été fondée par <strong>Camille Vingere</strong>,
                      ingénieur. Depuis 2019, il connecte des outils métiers, automatise
                      des tâches chronophages et déploie des agents IA chez ses clients.
                      C&apos;est lui que tu rencontres pendant la consultation.
                    </p>
                    <p>
                      Son{" "}
                      <a
                        href="https://www.linkedin.com/in/camille-vingere-developpeur-fullstack/"
                        {...external}
                      >
                        profil LinkedIn
                      </a>{" "}
                      et sa{" "}
                      <a href="https://www.youtube.com/@camilleroydev" {...external}>
                        chaîne YouTube
                      </a>{" "}
                      montrent sa façon de travailler. Autour de lui, l&apos;équipe
                      réunit les compétences n8n, IA et développement.
                    </p>
                  </div>
                </div>

                <h2 id="faq">FAQ : agence n8n</h2>
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
                    {item.question === "n8n est-il gratuit ?" ? (
                      <p>
                        La version self-hosted est gratuite pour un usage interne, sous{" "}
                        <a href="https://docs.n8n.io/n8n-community-license" {...external}>
                          licence fair-code
                        </a>
                        . n8n Cloud est payant. Dans les deux cas, ces coûts sont réglés
                        sur tes comptes.
                      </p>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </details>
                ))}
              </div>

              <div className={s.prose}>
                <h2 id="a-retenir">Agence n8n Fyliz : l&apos;essentiel</h2>
                <ul>
                  <li>
                    <strong>Prix</strong> : 3 000 € HT/mois, construction, maintenance
                    et évolutions comprises. Outils et API sur tes comptes.
                  </li>
                  <li>
                    <strong>Réactivité</strong> : démarrage sous 48 h, demandes
                    illimitées par priorité, dépannage sous 24 h.
                  </li>
                  <li>
                    <strong>Propriété</strong> : hébergement UE, DPA signé, workflows et
                    documentation à toi, même après l&apos;arrêt.
                  </li>
                  <li>
                    <strong>Le bon outil</strong> : n8n quand c&apos;est le bon choix,
                    du code ou un agent IA quand ça ne l&apos;est pas.
                  </li>
                </ul>
                <p>
                  <strong>Pour aller plus loin :</strong>{" "}
                  <Link href="/blog/comment-utiliser-un-template-sur-n8n">
                    utiliser un template sur n8n
                  </Link>
                  ,{" "}
                  <Link href="/blog/inscription-n8n-cloud-guide-complet-pour-creer-ton-compte-en-5-minutes-2025">
                    créer ton compte n8n Cloud
                  </Link>
                  ,{" "}
                  <Link href="/blog/creer-un-agent-ia-rag-sur-n8n-guide-complet">
                    créer un agent IA RAG sur n8n
                  </Link>
                  .
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
