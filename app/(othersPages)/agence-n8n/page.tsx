import CtaLink from "@/components/homes/abonnement/CtaLink";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { brands6 } from "@/data/brands";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const title = "Agence n8n : des workflows qui tiennent, à 3 000 € HT/mois";
const description =
  "Workflow cassé, freelance injoignable, facture Make qui grimpe ? Ce que change une agence n8n, son prix (3 000 € HT/mois) et quand n8n ne convient pas.";
const pageUrl = "https://fyliz.com/agence-n8n";

export const metadata: Metadata = {
  ...constructMetadata({
    title,
    description,
    alternates: { canonical: pageUrl },
  }),
  // `absolute` évite le suffixe « | Fyliz » du template du layout.
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
    question: "Combien coûte une agence n8n ?",
    answer:
      "Chez Fyliz, 3 000 € HT/mois sans engagement, construction et maintenance comprises, ou un projet au forfait sur devis. Les abonnements logiciels (n8n, CRM) et la consommation des API d'IA restent payés sur tes propres comptes.",
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
    question: "Combien de temps pour une première automatisation ?",
    answer:
      "On démarre 48 h après le premier appel. Une automatisation simple tourne ensuite en quelques jours, les agents IA plus ambitieux sont livrés par étapes. Chaque demande est estimée avant de démarrer.",
  },
  {
    question: "Si j'arrête l'abonnement, qu'est-ce que je récupère ?",
    answer:
      "Tout. Les comptes, les workflows et la documentation sont à ton nom dès le départ. La résiliation prend effet à la fin du mois en cours et tes automatisations continuent de tourner.",
  },
  {
    question: "n8n est-il gratuit ?",
    answer:
      "La version self-hosted est gratuite pour un usage interne, sous licence fair-code. n8n Cloud est payant. Dans les deux cas, ces coûts sont réglés sur tes comptes.",
  },
  {
    question:
      "Pouvez-vous reprendre des workflows existants ou migrer depuis Make ou Zapier ?",
    answer:
      "Oui. On audite l'existant, puis on reprend, corrige ou reconstruit sur n8n ce qui doit l'être. On a par exemple migré les automatisations Make d'Equity Family vers n8n auto-hébergé.",
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

function Cta({ note }: { note: string }) {
  return (
    <div className="not-prose panel vstack items-center gap-2 text-center my-6 lg:my-8">
      <CtaLink
        href={siteConfig.cta.buttonLink}
        ctaName={siteConfig.cta.buttonText}
        className="btn btn-md xl:btn-lg btn-primary border border-dark px-3 lg:px-5 w-auto rounded-pill"
      >
        <span>{siteConfig.cta.buttonText}</span>
      </CtaLink>
      <p className="fs-6 text-gray-900 text-opacity-70 m-0">{note}</p>
    </div>
  );
}

function Table({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto">
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
      {caption && <p className="text-sm italic">{caption}</p>}
    </div>
  );
}

function Quote({ children, author }: { children: ReactNode; author: string }) {
  return (
    // Le texte porte déjà ses guillemets : on retire ceux ajoutés par prose
    <blockquote className="[&>p]:before:content-none [&>p]:after:content-none">
      <p>{children}</p>
      <p className="text-base not-italic">{author}</p>
    </blockquote>
  );
}

function ClientLogos() {
  return (
    <div
      className="not-prose my-6 lg:my-8 rounded-xl p-3 lg:p-4"
      style={{ background: "#f7f3ec" }}
    >
      <p
        className="text-sm text-center fw-bold m-0 mb-3"
        style={{ color: "#8a8178" }}
      >
        Ils nous ont confié leurs automatisations
      </p>
      <ul
        className="m-0 p-0 list-none"
        style={{
          display: "grid",
          gap: 16,
          alignItems: "center",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        }}
      >
        {brands6.map((brand) => (
          <li key={brand.alt} className="flex justify-center">
            <Image
              src={brand.src}
              alt={brand.alt === "La Provence 2026" ? "La Provence" : brand.alt}
              width={brand.width}
              height={brand.height}
              className="h-auto"
              style={{ maxHeight: 40, width: "auto" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Illustrations 1280 px de large : défilement horizontal sur mobile pour garder le texte lisible
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
    <figure className="not-prose my-6 lg:my-8">
      <div className="overflow-x-auto rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block w-full h-auto min-w-[680px] md:min-w-0"
        />
      </div>
      {caption && (
        <figcaption
          className="text-sm text-center mt-2"
          style={{ color: "#8a8178" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Le lecteur BFM interdit l'intégration hors de ses domaines : miniature cliquable vers le replay
function BfmReplay() {
  return (
    <figure className="not-prose my-6 lg:my-8">
      <a
        href="https://www.bfmtv.com/economie/replay-emissions/l-hebdo-des-pme/video-herve-debbah-j-a-ime-j-a-ime-solution-a-base-d-ia-pour-l-hotellerie-20-12_VN-202512200140.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/press/bfm-business-j-aime-replay.webp"
          alt="Hervé Debbah présente J'aime, solution à base d'IA pour l'hôtellerie, sur BFM Business : voir le replay"
          width={1280}
          height={720}
          className="block w-full h-auto rounded-xl"
        />
      </a>
      <figcaption
        className="text-sm text-center mt-2"
        style={{ color: "#8a8178" }}
      >
        L&apos;hebdo des PME, BFM Business : voir le replay sur bfmtv.com
      </figcaption>
    </figure>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function AgenceN8nPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="theme-5 theme-5-light">
        <div
          className="bp-xs page-wrapper bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 dark:bg-black dark:text-gray-200"
          style={{ overflowX: "clip" }}
        >
          <Header8 />
          <div id="wrapper" className="wrap">
            <div
              style={{ marginTop: "120px" }}
              className="breadcrumbs panel z-1 py-2 bg-secondary dark:bg-gray-100 dark:bg-opacity-5 dark:text-white"
            >
              <div className="container max-w-xl">
                <ul className="breadcrumb nav-x justify-center items-center gap-1 fs-7 m-0 fw-bold">
                  <li>
                    <Image
                      alt="icon"
                      className="me-1"
                      src="/assets/images/common/icons/home.svg"
                      width="18"
                      height="18"
                    />
                  </li>
                  <li>
                    <Link href="/">Accueil</Link>
                  </li>
                  <li>
                    <i className="unicon-chevron-right fw-medium opacity-50 rtl:rotate-180" />
                  </li>
                  <li>
                    <span className="opacity-50">Agence n8n</span>
                  </li>
                </ul>
              </div>
            </div>

            <article className="post type-post single-post py-4 lg:py-6 xl:py-9">
              <div className="container max-w-lg">
                <header className="post-header panel vstack gap-2 lg:gap-4 mb-4 lg:mb-6">
                  <h1 className="h3 sm:h2 lg:display-6 xl:display-5 m-0">
                    Agence n8n en France : enfin quelqu&apos;un pour construire
                    et maintenir tes automatisations
                  </h1>
                  <div className="hstack items-center gap-2">
                    <Image
                      src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-circle flex-shrink-0"
                    />
                    <p className="fs-7 text-gray-900 text-opacity-60 m-0">
                      Par Camille Vingere, fondateur de Fyliz. Mis à jour le{" "}
                      <time dateTime="2026-10-14">14 octobre 2026</time>.
                    </p>
                  </div>
                </header>

                <div className="prose prose-xl dark:prose-invert prose-lg lg:prose-2xl max-w-none prose-headings:mb-6 prose-headings:mt-8 prose-p:mb-6 prose-p:text-lg lg:prose-p:text-xl prose-p:leading-relaxed prose-p:font-thin prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-3 prose-blockquote:text-xl prose-blockquote:my-8 prose-table:text-base">
                  <p>
                    Une <strong>agence n8n</strong> conçoit, déploie et
                    maintient les automatisations qui relient tes outils : CRM,
                    facturation, e-mails, agents IA. Fyliz en est une. On
                    travaille en abonnement, à 3 000 € HT/mois sans engagement,
                    avec des demandes illimitées et des workflows hébergés sur
                    tes comptes.
                  </p>
                  <p>
                    Ça, c&apos;est la réponse courte. La longue commence un
                    lundi matin.
                  </p>
                  <p>
                    Lundi, 9 h 10. Ton commercial t&apos;apprend que les
                    relances de devis ne partent plus depuis jeudi. Personne
                    n&apos;a rien vu. Le workflow s&apos;est arrêté parce
                    qu&apos;un champ du CRM a changé de nom, et le freelance qui
                    l&apos;avait monté ne répond plus. Dans ta boîte mail, la
                    facture Make du mois a encore grimpé, parce que ton volume a
                    augmenté.
                  </p>
                  <p>
                    Si une de ces scènes te parle, lis la suite : les options
                    que tu as sans doute essayées, ce qu&apos;une agence n8n
                    change vraiment, à quel prix, et quand n8n ne convient pas.
                  </p>
                  <p>
                    Je dirige Fyliz, une{" "}
                    <Link href="/">équipe IA externalisée</Link> qui a
                    accompagné plus de 50 entreprises. Je prêche donc pour ma
                    paroisse : autant le dire, et te laisser juger sur pièces.
                  </p>

                  <h2>
                    Le vrai problème : construire une automatisation, puis la
                    faire tenir
                  </h2>
                  <p>
                    Construire une automatisation est rarement le problème. La
                    faire tenir dans le temps, oui, parce que tes outils, tes
                    process et les modèles d&apos;IA bougent sans prévenir.
                  </p>
                  <p>
                    Tu sais déjà quoi automatiser : les relances de devis, la
                    saisie des factures, le tri des demandes clients. Ce qui
                    manque, c&apos;est quelqu&apos;un pour s&apos;y mettre. Et
                    surtout quelqu&apos;un pour rester.
                  </p>
                  <p>
                    Car un workflow n&apos;est pas un meuble qu&apos;on monte
                    une fois. C&apos;est de la plomberie entre tes logiciels.
                    Une API change de version, un champ du CRM est renommé, un
                    modèle d&apos;IA évolue. Quelque chose casse. Souvent en
                    silence.
                  </p>
                  <p>
                    La facture, elle, n&apos;est pas technique. Une relance qui
                    ne part pas, c&apos;est un devis qui refroidit. Une facture
                    mal saisie, c&apos;est un rapprochement à refaire en fin de
                    mois. Un client sans réponse, c&apos;est un client qui va
                    voir ailleurs.
                  </p>
                  <p>
                    Reste une inquiétude plus discrète : tes données. Si ton
                    prestataire héberge tes workflows chez lui, le jour où tu
                    veux partir, tu récupères quoi ?
                  </p>
                  <p>
                    Alors tu as cherché des solutions. Probablement plusieurs.
                  </p>

                  <h2>
                    Expert n8n freelance, agence au projet, Make : ce que tu as
                    sans doute déjà essayé
                  </h2>
                  <p>
                    Avant de chercher une agence n8n, cinq options reviennent
                    presque toujours, et aucune n&apos;est mauvaise. Mais toutes
                    laissent un trou au même endroit : l&apos;après-livraison.
                  </p>

                  <h3>Le faire soi-même avec des tutos n8n</h3>
                  <p>
                    C&apos;est le réflexe le plus sain. n8n self-hosted est
                    gratuit pour un usage interne, les tutos abondent (on en
                    publie aussi, liens en bas de page), et un profil curieux
                    sort un premier workflow en quelques soirées.
                  </p>
                  <p>
                    Le hic, c&apos;est tout ce qui vient après. Un tuto ne dit
                    pas quoi automatiser en premier, ni comment savoir
                    qu&apos;un workflow a planté cette nuit. Et celui qui a tout
                    construit devient le seul point de passage. Le jour où il
                    part, ton automatisation devient une boîte noire.
                  </p>

                  <h3>Un expert n8n freelance</h3>
                  <p>
                    Un expert ou consultant n8n indépendant est souvent
                    excellent techniquement, et pour un besoin ponctuel bien
                    défini, c&apos;est souvent le bon choix.
                  </p>
                  <p>
                    Mais il est seul. S&apos;il part en vacances, ton workflow
                    attend. S&apos;il signe un gros client, tu passes après.
                    Pour comparer honnêtement un freelance n8n à une autre
                    option, additionne sur un an les jours de construction, de
                    maintenance et d&apos;évolution. C&apos;est ce total qui
                    compte, pas le prix d&apos;une journée.
                  </p>

                  <h3>Une agence au projet</h3>
                  <p>
                    L&apos;agence au projet règle la question des compétences :
                    une équipe, une méthode, un livrable testé. Puis elle
                    s&apos;en va.
                  </p>
                  <p>
                    La maintenance est souvent en option, et chaque nouvelle
                    idée appelle un nouveau devis. Résultat : on
                    n&apos;automatise que les gros sujets. Les petits gains du
                    quotidien restent sur la table, parce qu&apos;ils ne valent
                    pas un bon de commande.
                  </p>

                  <h3>Recruter en interne</h3>
                  <p>
                    Sur le papier, c&apos;est l&apos;option la plus solide. Mais
                    recruter un profil IA expérimenté prend du temps et coûte un
                    salaire chargé, pour une seule personne censée couvrir n8n,
                    l&apos;IA et le développement.
                  </p>
                  <p>
                    C&apos;est le calcul qu&apos;a fait Equity Family : plutôt
                    que de recruter un développeur et un spécialiste de
                    l&apos;automatisation, le groupe a choisi un abonnement. On
                    compare les deux options dans notre article internaliser ou
                    externaliser l&apos;IA.
                  </p>

                  <h3>Make ou Zapier, facturés à l&apos;opération</h3>
                  <p>
                    Make et Zapier sont de bons outils, simples à prendre en
                    main, et on intervient aussi sur Make quand il fait le
                    travail. Pour quelques scénarios à faible volume, ils
                    suffisent.
                  </p>
                  <p>
                    Le problème apparaît quand ton activité grandit : la
                    facturation à l&apos;opération suit le volume. Plus
                    d&apos;inscrits, plus de commandes, plus de frais. n8n
                    facture à l&apos;exécution du workflow, pas à chaque étape
                    (voir la{" "}
                    <a href="https://n8n.io/pricing/" {...external}>
                      page tarifs de n8n
                    </a>
                    ). En self-hosted, tu paies ton serveur, quel que soit le
                    nombre d&apos;opérations.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/cout-n8n-vs-tarif-par-operation.svg"
                    alt="Agence n8n : coût à l'opération de Make et Zapier face au coût fixe de n8n self-hosted"
                    width={1280}
                    height={720}
                  />
                  <p>
                    Côte à côte, tout se joue sur trois questions : qui
                    maintient, combien ça coûtera, et à quelle vitesse ça
                    démarre.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/alternatives-agence-n8n.svg"
                    alt="Comparatif des alternatives à une agence n8n : faire soi-même, freelance, agence au projet, recrutement, Make ou Zapier, abonnement"
                    width={1280}
                    height={860}
                  />
                  <p>
                    Il manque donc un modèle où la même équipe construit,
                    maintient et fait évoluer, pour un prix connu d&apos;avance.
                    C&apos;est le rôle d&apos;une agence n8n au mois.
                  </p>

                  <h2>Ce que fait une agence n8n pour une PME</h2>
                  <p>
                    Une agence n8n prend en charge tout le cycle de tes
                    automatisations : choisir quoi automatiser, construire,
                    tester, documenter, héberger sur tes comptes, puis réparer
                    et faire évoluer.
                  </p>
                  <p>
                    Tu décris un problème métier : « on perd des devis parce que
                    personne ne relance ». On le traduit en workflow n8n : un
                    déclencheur à chaque nouveau devis, une attente, une
                    vérification dans le CRM, puis une relance rédigée par un
                    agent IA. Tu n&apos;as pas à apprendre l&apos;outil.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/workflow-relance-devis-n8n.svg"
                    alt="Exemple de workflow n8n de relance de devis construit par une agence n8n"
                    width={1280}
                    height={700}
                  />

                  <h3>Ce qu&apos;on automatise avec n8n, par tâche</h3>
                  <p>
                    Par tâche plutôt que par outil (exemples types, pas des
                    résultats clients) :
                  </p>
                  <ul>
                    <li>
                      <strong>Ventes et prospection</strong> : enrichir un lead,
                      le créer dans HubSpot ou Pipedrive, programmer la relance.
                    </li>
                    <li>
                      <strong>Admin et finance</strong> : récupérer les
                      factures, les envoyer dans Pennylane, relancer les
                      impayés.
                    </li>
                    <li>
                      <strong>Opérations</strong> : synchroniser Notion,
                      Airtable et Google Workspace, envoyer un reporting
                      hebdomadaire dans Slack.
                    </li>
                    <li>
                      <strong>Support</strong> : trier les demandes, préparer
                      une réponse, transmettre le cas complexe à la bonne
                      personne.
                    </li>
                  </ul>
                  <p>
                    D&apos;autres idées dans nos{" "}
                    <Link href="/solutions-automatisation-ia">
                      cas d&apos;usage de l&apos;automatisation IA
                    </Link>
                    .
                  </p>

                  <h3>Des agents IA dans tes workflows n8n</h3>
                  <p>
                    Un workflow suit des règles fixes ; un agent IA ajoute du
                    jugement. Il lit un e-mail, le classe, rédige la réponse.
                    Dans n8n, on branche OpenAI ou Claude, on leur donne ta
                    documentation via un RAG et on les relie à tes logiciels par
                    MCP : l&apos;agent répond avec tes données. Plus de détails
                    sur notre page agence agents IA.
                  </p>

                  <h3>Agence ou intégrateur n8n : quelle différence ?</h3>
                  <p>
                    Le métier technique est le même : connecter tes outils avec
                    n8n. Un intégrateur n8n exécute un cahier des charges ; une
                    agence n8n ajoute le conseil en amont (quoi automatiser
                    d&apos;abord) et le suivi une fois le workflow en
                    production.
                  </p>

                  <h2>
                    n8n, Make ou Zapier : pourquoi on travaille surtout avec n8n
                  </h2>
                  <p>
                    On choisit n8n par défaut : open source, hébergeable chez
                    toi, facturé à l&apos;exécution, avec des nœuds IA natifs
                    (agents, RAG, OpenAI ou Claude dans le même workflow).
                  </p>
                  <p>
                    Mais <strong>n8n est un outil, pas une fin en soi</strong>.
                    Deux des quatre projets présentés plus bas ne tournent pas
                    sur n8n : quand un agent IA connecté par MCP ou du code fait
                    mieux le travail, c&apos;est ce qu&apos;on livre. Une
                    migration depuis Make ou Zapier se cadre dès le premier
                    appel.
                  </p>
                  <p>
                    Pour un comparatif détaillé, lis{" "}
                    <a
                      href="https://n8n-france.com/n8n-vs-make-vs-zapier/"
                      {...external}
                    >
                      n8n vs Make vs Zapier
                    </a>{" "}
                    sur n8n-france.com, un site édité par la même équipe que
                    Fyliz.
                  </p>

                  <h2>Comment fonctionne l&apos;abonnement agence n8n Fyliz</h2>
                  <p>
                    Un prix fixe par mois, une file de demandes sans plafond
                    traitée par priorité, la maintenance comprise, et tout ce
                    qui est livré reste à toi. C&apos;est la différence avec une
                    agence n8n classique, qui facture chaque projet, puis la
                    maintenance à part.
                  </p>

                  <h3>Des demandes illimitées, traitées par priorité</h3>
                  <p>
                    Tu ajoutes tes demandes dans un tableau partagé, autant que
                    tu veux. On les classe ensemble, chacune est estimée avant
                    de démarrer, et un gros projet est découpé en livrables.
                  </p>
                  <p>
                    Illimité ne veut pas dire simultané. Les demandes passent
                    une par une, dans l&apos;ordre que tu choisis. Mais il
                    n&apos;y a ni quota, ni avenant, ni devis à chaque nouvelle
                    idée. Les petites demandes ont enfin leur place dans la
                    file.
                  </p>

                  <h3>
                    Maintenance, dépannage sous 24 h et évolutions incluses
                  </h3>
                  <p>
                    Revenons au lundi matin. Champ renommé, API modifiée, modèle
                    d&apos;IA qui évolue : le dépannage est pris en charge sous
                    24 h. Corrections et évolutions sont incluses, sans facture
                    supplémentaire. Chaque mois, on fait un point de
                    priorisation avec toi. Chaque livrable est documenté, et on
                    forme tes équipes.
                  </p>

                  <h3>Sans engagement, avec pause possible</h3>
                  <p>
                    La résiliation prend effet à la fin du mois en cours. Tu
                    peux aussi faire une pause : les jours non utilisés du mois
                    sont conservés. Et si tu arrêtes, tes automatisations
                    continuent de tourner, puisqu&apos;elles sont sur tes
                    comptes.
                  </p>
                  <p>
                    Pourquoi un abonnement plutôt qu&apos;un projet ? Parce
                    qu&apos;une automatisation n&apos;est jamais finie. Tes
                    outils changent, tes besoins aussi.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/abonnement-n8n-cycle.webp"
                    alt="Fonctionnement de l'abonnement agence n8n Fyliz : demande, priorisation, livraison, maintenance"
                    width={1280}
                    height={660}
                    caption="Un point de priorisation chaque mois, puis la boucle recommence."
                  />

                  <h2>Notre méthode en 4 étapes</h2>
                  <p>
                    On démarre 48 h après le premier appel, et ta première
                    automatisation simple tourne en quelques jours. Voici le
                    déroulé :
                  </p>
                  <ol>
                    <li>
                      <strong>Consultation (30 min).</strong> On audite ton
                      activité et tes priorités d&apos;automatisation.
                    </li>
                    <li>
                      <strong>Onboarding, sous 48 h.</strong> Tu nous donnes
                      accès à tes outils, on crée ou on reprend ton instance n8n
                      sur ton compte, et on fixe la feuille de route du premier
                      mois.
                    </li>
                    <li>
                      <strong>Demandes et livraisons.</strong> Chaque
                      automatisation est estimée, construite, testée, puis
                      documentée avant sa mise en production.
                    </li>
                    <li>
                      <strong>Maintenance et amélioration.</strong> On corrige,
                      on dépanne sous 24 h, on fait évoluer. Les priorités sont
                      revues chaque mois.
                    </li>
                  </ol>
                  <p>
                    La consultation ne t&apos;engage à rien, l&apos;abonnement
                    non plus : tu peux t&apos;arrêter à la fin du premier mois.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/timeline-abonnement-n8n.svg"
                    alt="Méthode de l'agence n8n Fyliz, de la consultation à la revue mensuelle"
                    width={1280}
                    height={600}
                  />

                  <h2>Combien coûte une agence n8n ?</h2>
                  <p>
                    Chez Fyliz, 3 000 € HT par mois, prestation tout compris, ou
                    un projet au forfait sur devis. Logiciels et IA restent
                    payés sur tes propres comptes, ce qui te garantit d&apos;en
                    rester propriétaire.
                  </p>

                  <h3>Ce qui est inclus et ce qui ne l&apos;est pas</h3>
                  <Table
                    head={[
                      "Élément",
                      "Inclus dans l'abonnement",
                      "À ta charge (sur tes comptes)",
                    ]}
                    rows={[
                      [
                        "Conception et construction des workflows n8n",
                        "Oui",
                        "Non",
                      ],
                      ["Agents IA sur mesure", "Oui", "Non"],
                      [
                        "Maintenance, corrections, dépannage sous 24 h",
                        "Oui",
                        "Non",
                      ],
                      ["Évolutions des workflows existants", "Oui", "Non"],
                      [
                        "Point mensuel, documentation, formation des équipes",
                        "Oui",
                        "Non",
                      ],
                      [
                        "Abonnement n8n (Cloud ou serveur self-hosted)",
                        "Non",
                        "Oui",
                      ],
                      ["CRM et autres logiciels", "Non", "Oui"],
                      [
                        "Consommation des API d'IA (OpenAI, Claude...)",
                        "Non",
                        "Oui",
                      ],
                    ]}
                  />

                  <h3>Le projet ponctuel sur devis</h3>
                  <p>
                    Un seul besoin, bien délimité ? On diagnostique ton
                    processus, on te propose un forfait, puis on livre une
                    automatisation testée et documentée. Pas d&apos;abonnement.
                  </p>

                  <h3>
                    Freelance, agence au projet ou abonnement : le comparatif
                  </h3>
                  <p>
                    La plupart des prestataires séparent deux factures : la
                    construction, au projet ou sur devis, et un forfait de
                    maintenance qui ne comprend pas les nouveaux workflows.
                    Notre prix mensuel inclut la construction : compare 3 000 €
                    HT à la somme des deux, pas au seul forfait de maintenance.
                  </p>
                  <Table
                    head={[
                      "Critère",
                      "Expert ou consultant n8n freelance",
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
                      [
                        "Maintenance",
                        "À négocier",
                        "Souvent en option",
                        "Incluse",
                      ],
                      [
                        "Engagement",
                        "À la mission",
                        "Au projet",
                        "Sans engagement, fin de mois",
                      ],
                      [
                        "Qui garde la main",
                        "Selon le contrat",
                        "Selon le contrat",
                        "Toi, sur tes comptes",
                      ],
                    ]}
                  />
                  <p>
                    Le détail est sur la page tarifs et fonctionnement de
                    l&apos;abonnement.
                  </p>

                  <Cta note="30 min pour auditer ton activité et voir si l'abonnement se justifie, ou si un projet sur devis suffit." />

                  <h2>Nos cas clients : ce qu&apos;on a vraiment livré</h2>
                  <p>
                    Une agence n8n se juge sur pièces. Voici quatre projets
                    nommés, décrits tels qu&apos;ils ont été livrés : deux sur
                    n8n, deux sans. Aucun scénario inventé.
                  </p>

                  <h3>
                    Equity Family : un tunnel de vente par webinaire migré de
                    Make vers n8n
                  </h3>
                  <p>
                    Equity Family, du groupe MLX MEDIA (avec notamment Lexa et
                    Blink), vend des programmes de coaching par webinaire live.
                    Ses automatisations tournaient sur Make, facturé à
                    l&apos;opération : plus d&apos;inscrits, plus de frais.
                  </p>
                  <p>
                    On a tout migré sur n8n, auto-hébergé sur un serveur dédié
                    du client. Puis, demande après demande, on a construit la
                    synchronisation de l&apos;emailing, du CRM, de l&apos;agenda
                    et de la plateforme de webinaire à chaque inscription, une
                    chauffe WhatsApp pilotée par l&apos;équipe marketing avant
                    chaque webinaire, et des e-mails ActiveCampaign adaptés au
                    comportement de chaque inscrit.
                  </p>
                  <p>
                    Sont venus ensuite les outils sur mesure : « Setia », un
                    setter IA qui remplace un SaaS et amène les prospects à
                    réserver un appel ; « Tracking », une plateforme
                    d&apos;analyse qui remplace un tableur rempli à la main ;
                    une interface Airtable de suivi des clients coachés ; « MLX
                    Compta » pour les factures et échéanciers.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/equity-family-tunnel-webinaire-n8n.webp"
                    alt="Tunnel webinaire Equity Family automatisé sur n8n"
                    width={1280}
                    height={840}
                    caption="Le tunnel d'Equity Family, de l'inscription à la vente."
                  />
                  <p>
                    Le détail qui résume tout : quand Equity Family a changé de
                    plateforme de webinaire, on a tout adapté sans nouveau
                    devis. Lire le{" "}
                    <Link href="/cas-clients/equity-family-automatiser-un-tunnel-de-vente-par-webinaire">
                      cas Equity Family
                    </Link>
                    .
                  </p>

                  <h3>
                    MySkillFactory : agents IA pour un organisme de formation
                    (n8n)
                  </h3>
                  <p>
                    Pour INAFON, l&apos;organisme de formation des notaires et
                    client de MySkillFactory, on a construit sur n8n un chatbot
                    en RAG sur le catalogue relié au CRM Odoo par MCP,
                    l&apos;analyse des questionnaires de satisfaction, une
                    veille du droit notarial qui recommande les programmes à
                    mettre à jour (avec validation humaine) et des e-mails
                    personnalisés par profil de notaire. Pourquoi n8n ? Open
                    source et sans code, il permet à l&apos;équipe du client de
                    modifier ses workflows sans développeur. Lire le{" "}
                    <Link href="/cas-clients/myskillfactory-agents-ia-pour-organisme-de-formation">
                      cas MySkillFactory et INAFON
                    </Link>
                    .
                  </p>
                  <Quote author="Juliette Brunelot, MySkillFactory, 22/08/2025">
                    « Camille a été très réactif. Nous avons pu programmer
                    rapidement notre séance de travail qui a été efficace. Nous
                    avons atteint les objectifs fixés. Merci Camille »
                  </Quote>

                  <h3>J&apos;aime : un SAV hôtelier géré par un agent IA</h3>
                  <p>
                    Pour l&apos;hôtel J&apos;aime, on a construit un agent IA
                    qui répond aux e-mails et aux messages WhatsApp en
                    consultant réservations et disponibilités via un MCP
                    connecté au logiciel de réservation. Pas de n8n ici :
                    l&apos;agent connecté par MCP faisait mieux le travail. Le
                    client a présenté la solution dans{" "}
                    <a
                      href="https://www.bfmtv.com/economie/replay-emissions/l-hebdo-des-pme/video-herve-debbah-j-a-ime-j-a-ime-solution-a-base-d-ia-pour-l-hotellerie-20-12_VN-202512200140.html"
                      {...external}
                    >
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

                  <h3>
                    Crédit Agricole (Linxo) : tests d&apos;intégration
                    automatisés
                  </h3>
                  <p>
                    Pas de n8n non plus : c&apos;est une mission de
                    développement. Sur Linxo Connect, service de Linxo (groupe
                    Crédit Agricole), on a développé des fonctionnalités en
                    React et Express et automatisé les tests d&apos;intégration
                    avec une machine à états. Ils couvrent environ 70 % des cas
                    de figure, selon le{" "}
                    <Link href="/cas-clients/credit-agricole-automatisation-des-tests-dintegration">
                      cas Crédit Agricole
                    </Link>
                    . Quand un besoin dépasse n8n, la même équipe écrit le code.
                  </p>

                  <h3>Ce qu&apos;en disent d&apos;autres clients</h3>
                  <Quote author="Hervé, Parness Cruises, 13/08/2025">
                    « Il fallait installer n8n MCP pour Claude. Camille connaît
                    parfaitement son sujet et, en sus d&apos;effectuer cette
                    installation, il a à cœur de vous former pour vous rendre
                    autonome. Un état d&apos;esprit remarquable à la hauteur de
                    ses compétences techniques. »
                  </Quote>
                  <Quote author="Frederic, Everest Startup Studio, 08/10/2026">
                    « Camille est très pédagogue et efficace ! En quelques
                    sessions il m&apos;a formé sur les bases de
                    l&apos;automatisation IA et nous avons créé une architecture
                    et une application déjà déployée et utile. Je recommande ! »
                  </Quote>
                  <p>
                    D&apos;autres entreprises nous ont confié leurs
                    automatisations, dont Crédit Agricole, La Provence,
                    Montblanc, Ford, CMA CGM, VIP Paris Hotel et Groupe M6. Tous
                    les projets sont sur la page{" "}
                    <Link href="/cas-clients">cas clients</Link>.
                  </p>
                  <ClientLogos />

                  <h2>Tes données et tes comptes restent chez toi</h2>
                  <p>
                    Tout est hébergé sur tes comptes, dans l&apos;Union
                    européenne, documenté, et t&apos;appartient, même si tu
                    arrêtes.
                  </p>
                  <p>
                    Tu te souviens de la question du début : le jour où tu pars,
                    tu récupères quoi ? Tout. Une agence n8n qui héberge tes
                    workflows chez elle te rend dépendant ; chez nous,
                    l&apos;instance n8n, les clés d&apos;API et la documentation
                    sont à ton nom dès le premier jour. Nous n&apos;avons
                    qu&apos;un accès, que tu donnes et que tu peux retirer.
                  </p>
                  <Illustration
                    src="/assets/images/agence-n8n/propriete-instance-n8n.svg"
                    alt="Agence n8n : workflows et données sur les comptes du client, accès Fyliz révocable"
                    width={1280}
                    height={680}
                  />

                  <h3>n8n Cloud ou self-hosted : lequel pour ta PME ?</h3>
                  <p>
                    n8n Cloud est hébergé par l&apos;éditeur : rien à installer,
                    mises à jour automatiques. Le self-hosted tourne sur ton
                    serveur : plus de contrôle sur les données et les coûts,
                    mais une infrastructure à maintenir. On tranche ensemble à
                    l&apos;onboarding. Détails dans notre comparatif{" "}
                    <Link href="/blog/n8n-cloud-vs-self-hosted">
                      n8n Cloud vs self-hosted
                    </Link>
                    .
                  </p>

                  <h3>RGPD et accès</h3>
                  <p>
                    Trois engagements. Tes workflows et tes données sont
                    hébergés dans l&apos;Union européenne. On signe un DPA,
                    l&apos;accord de sous-traitance prévu par le RGPD. Et on
                    travaille uniquement depuis des accès sur tes comptes,
                    limités aux outils nécessaires.
                  </p>

                  <h2>Qui est derrière Fyliz</h2>
                  <figure
                    className="not-prose float-none sm:float-right sm:ms-4 mb-4 text-center"
                    style={{ maxWidth: 220 }}
                  >
                    <Image
                      src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                      alt="Camille Vingere, fondateur de l'agence n8n Fyliz"
                      width={220}
                      height={220}
                      className="rounded-circle"
                    />
                    <figcaption
                      className="text-sm mt-2"
                      style={{ color: "#8a8178" }}
                    >
                      Camille Vingere, fondateur de Fyliz
                    </figcaption>
                  </figure>
                  <p>
                    Fyliz a été fondée par <strong>Camille Vingere</strong>,
                    ingénieur, qui dirige l&apos;agence. Depuis 2019, il
                    connecte des outils métiers, automatise des tâches
                    chronophages et déploie des agents IA chez ses clients.
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
                    <a
                      href="https://www.youtube.com/@camilleroydev"
                      {...external}
                    >
                      chaîne YouTube
                    </a>{" "}
                    montrent sa façon de travailler. Autour de lui,
                    l&apos;équipe réunit les compétences n8n, IA et
                    développement, sans que tu aies à recruter chacune.
                  </p>
                  <div className="clear-both" />

                  <h2>Quand n8n n&apos;est pas le bon choix</h2>
                  <p>
                    n8n n&apos;est pas toujours la bonne réponse, et une agence
                    n8n honnête doit te le dire. Quatre cas où on te le
                    déconseillera :
                  </p>
                  <ul>
                    <li>
                      <strong>
                        Une tâche simple déjà couverte par ton logiciel.
                      </strong>{" "}
                      Si ton CRM relance un devis tout seul, active la fonction.
                    </li>
                    <li>
                      <strong>Un outil sans API.</strong> L&apos;automatisation
                      devient fragile. On te le dit dès la consultation.
                    </li>
                    <li>
                      <strong>Un besoin de développement.</strong> Une interface
                      ou une application sur mesure s&apos;écrit en code, comme
                      Tracking ou MLX Compta chez Equity Family.
                    </li>
                    <li>
                      <strong>Un volume très faible.</strong> Deux
                      automatisations par an ne justifient pas 3 000 € HT/mois :
                      un projet sur devis suffit.
                    </li>
                  </ul>
                  <p>
                    Mieux vaut le savoir en 30 minutes qu&apos;après trois mois
                    d&apos;abonnement.
                  </p>

                  <h2>FAQ sur notre agence n8n</h2>
                  {faq.map((item) => (
                    <div key={item.question}>
                      <h3>{item.question}</h3>
                      {item.question === "n8n est-il gratuit ?" ? (
                        <p>
                          La version self-hosted est gratuite pour un usage
                          interne, sous{" "}
                          <a
                            href="https://docs.n8n.io/n8n-community-license"
                            {...external}
                          >
                            licence fair-code
                          </a>
                          . n8n Cloud est payant. Dans les deux cas, ces coûts
                          sont réglés sur tes comptes.
                        </p>
                      ) : (
                        <p>{item.answer}</p>
                      )}
                    </div>
                  ))}

                  <h2>Et maintenant ?</h2>
                  <p>
                    Choisir une agence n8n, c&apos;est surtout choisir qui sera
                    là le lundi où ça casse.
                  </p>
                  <p>
                    <strong>Points à retenir :</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Prix</strong> : 3 000 € HT/mois, construction,
                      maintenance et évolutions comprises. Outils et API sur tes
                      comptes.
                    </li>
                    <li>
                      <strong>Réactivité</strong> : démarrage sous 48 h,
                      demandes illimitées par priorité, dépannage sous 24 h.
                    </li>
                    <li>
                      <strong>Sur tes comptes</strong> : hébergement UE, DPA
                      signé, workflows et documentation à toi, même après
                      l&apos;arrêt.
                    </li>
                    <li>
                      <strong>Le bon outil</strong> : n8n quand c&apos;est le
                      bon choix, du code ou un agent IA quand ça ne l&apos;est
                      pas.
                    </li>
                  </ul>
                  <p>
                    En 30 minutes avec Camille, on passe ton activité en revue
                    et on repère les automatisations qui comptent vraiment. Si
                    n8n n&apos;est pas la bonne réponse, tu le sauras aussi.
                  </p>

                  <Cta note="30 min d'audit de ton activité et de tes priorités d'automatisation. Sans engagement." />

                  <p>
                    <strong>Pour aller plus loin</strong>
                  </p>
                  <ul>
                    <li>
                      <Link href="/blog/comment-utiliser-un-template-sur-n8n">
                        Utiliser un template sur n8n
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/inscription-n8n-cloud-guide-complet-pour-creer-ton-compte-en-5-minutes-2025">
                        Créer ton compte n8n Cloud en 5 minutes
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/creer-un-agent-ia-rag-sur-n8n-guide-complet">
                        Créer un agent IA RAG sur n8n
                      </Link>
                    </li>
                  </ul>
                </div>

                <aside
                  className="panel hstack items-start gap-3 p-3 lg:p-4 mt-6 rounded-2 border"
                  style={{ backgroundColor: "#fff5ed", borderColor: "#ffddcc" }}
                >
                  <Image
                    src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                    alt=""
                    width={64}
                    height={64}
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="vstack gap-1">
                    <p className="fw-bold m-0">
                      Camille Vingere, fondateur de Fyliz
                    </p>
                    <p className="m-0">
                      Ingénieur, il connecte des outils métiers et déploie des
                      agents IA chez ses clients depuis 2019.
                    </p>
                    <ul className="nav-x gap-2 m-0">
                      {siteConfig.footer
                        .find((section) => section.title === "Social")
                        ?.links.filter((link) =>
                          ["LinkedIn", "Youtube"].includes(link.text),
                        )
                        .map((link) => (
                          <li key={link.text}>
                            <a
                              href={link.href}
                              {...external}
                              aria-label={link.text}
                            >
                              <i
                                className={`icon icon-2 ${link.text === "LinkedIn" ? "unicon-logo-linkedin" : "unicon-logo-youtube"}`}
                              />
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </article>
          </div>
          <Footer8 />
        </div>
      </div>
    </>
  );
}
