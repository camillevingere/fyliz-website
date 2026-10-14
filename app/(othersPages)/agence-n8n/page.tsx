import CtaLink from "@/components/homes/abonnement/CtaLink";
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const title = "Agence n8n pour PME : workflows illimités à 3 000 € HT/mois";
const description =
  "Agence n8n : on construit et maintient tes workflows, sans limite de demandes, sur tes comptes, à 3 000 € HT/mois sans engagement. Voici ce qui est inclus.";
const pageUrl = "https://fyliz.com/agence-n8n";

export const metadata: Metadata = {
  ...constructMetadata({ title, description, alternates: { canonical: pageUrl } }),
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
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
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
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://fyliz.com/" },
        { "@type": "ListItem", position: 2, name: "Agence n8n", item: "https://fyliz.com/agence-n8n" },
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

function Table({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
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
                  <p className="fs-7 text-gray-900 text-opacity-60 m-0">
                    <em>
                      Mis à jour le <time dateTime="2026-10-14">14 octobre 2026</time>
                    </em>
                  </p>
                  <h1 className="h3 sm:h2 lg:display-6 xl:display-5 m-0">
                    Agence n8n en France : ton équipe qui construit et maintient tes automatisations
                  </h1>
                </header>

                <div className="prose prose-xl dark:prose-invert prose-lg lg:prose-2xl max-w-none prose-headings:mb-6 prose-headings:mt-8 prose-p:mb-6 prose-p:text-lg lg:prose-p:text-xl prose-p:leading-relaxed prose-p:font-thin prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-3 prose-blockquote:text-xl prose-blockquote:my-8 prose-table:text-base">
                  <p>
                    Fyliz est une <strong>agence n8n</strong> pour PME : on conçoit, déploie et
                    maintient tes workflows n8n et tes agents IA, hébergés sur tes comptes.
                    Abonnement de 3 000 € HT/mois, demandes illimitées, maintenance incluse,
                    sans engagement.
                  </p>
                  <p>
                    Tu sais déjà quoi automatiser. Les relances de devis, la saisie des factures,
                    le tri des demandes clients. Mais personne n&apos;a le temps de s&apos;y
                    mettre. Ou un freelance a livré un workflow, puis il a disparu au premier bug.
                    Et tu ne veux pas que tes données clients partent chez un prestataire.
                  </p>
                  <p>
                    On fonctionne comme ton <Link href="/">équipe IA externalisée</Link> : un
                    seul prestataire pour la mise en place, l&apos;hébergement sur tes outils et
                    la maintenance. Fyliz a été fondée par Camille Vingere et a accompagné plus
                    de 50 entreprises. Nos projets sont nommés et décrits, pas inventés.
                  </p>
                  <p>
                    Sur cette page : ce qu&apos;on automatise, comment marche l&apos;abonnement,
                    ce qu&apos;il coûte, ce qu&apos;on a livré, et quand n8n n&apos;est pas le
                    bon choix.
                  </p>

                  <Cta note="30 min pour auditer ton activité et tes priorités d'automatisation." />

                  <p>
                    <strong>Points à retenir :</strong>
                  </p>
                  <ul>
                    <li>
                      3 000 € HT/mois : construction, maintenance et évolutions de tes workflows
                      n8n comprises.
                    </li>
                    <li>Démarrage 48 h après le premier appel, dépannage pris en charge sous 24 h.</li>
                    <li>
                      Tout tourne sur tes comptes, hébergé dans l&apos;UE, et reste à toi même si
                      tu arrêtes.
                    </li>
                    <li>n8n quand c&apos;est le bon outil, autre chose quand ça ne l&apos;est pas.</li>
                  </ul>

                  <h2>Ce que fait une agence n8n pour une PME</h2>
                  <p>
                    Une agence n8n conçoit, connecte, héberge et maintient les automatisations
                    entre tes outils. Là où un tuto s&apos;arrête à l&apos;installation, elle
                    prend en charge tout le cycle : choisir quoi automatiser, construire, tester,
                    documenter, puis réparer et faire évoluer.
                  </p>
                  <p>
                    Tu décris un problème métier : « on perd des leads parce que personne ne
                    relance ». On le traduit en workflow n8n. Tu n&apos;as pas à apprendre
                    l&apos;outil.
                  </p>

                  <h3>Ce qu&apos;on automatise avec n8n, par tâche</h3>
                  <p>
                    On raisonne par tâche, pas par outil. Voici les familles de tâches les plus
                    fréquentes (exemples types, pas des résultats clients) :
                  </p>
                  <ul>
                    <li>
                      <strong>Ventes et prospection</strong> : enrichir un lead, le créer dans
                      HubSpot ou Pipedrive, programmer la relance.
                    </li>
                    <li>
                      <strong>Admin et finance</strong> : récupérer les factures, les envoyer dans
                      Pennylane, relancer les impayés.
                    </li>
                    <li>
                      <strong>Opérations</strong> : synchroniser Notion, Airtable et Google
                      Workspace, envoyer un reporting hebdomadaire dans Slack.
                    </li>
                    <li>
                      <strong>Support</strong> : trier les demandes, préparer une réponse,
                      transmettre le cas complexe à la bonne personne.
                    </li>
                  </ul>
                  <p>
                    D&apos;autres idées sont dans nos{" "}
                    <Link href="/solutions-automatisation-ia">
                      cas d&apos;usage de l&apos;automatisation IA
                    </Link>
                    .
                  </p>
                  <Table
                    head={["Pôle", "Tâche automatisée", "Outils connectés"]}
                    rows={[
                      ["Ventes et prospection", "Enrichissement et relance des leads", "HubSpot, Pipedrive, Gmail"],
                      ["Admin et finance", "Collecte des factures et relance des impayés", "Pennylane, Google Drive, Stripe"],
                      ["Opérations", "Synchronisation d'outils et reporting hebdomadaire", "Notion, Airtable, Google Workspace, Slack"],
                      ["Support", "Tri et préparation des réponses", "Boîte mail, Slack"],
                    ]}
                    caption="Exemples types, pas des résultats clients."
                  />

                  <h3>Des agents IA dans tes workflows n8n</h3>
                  <p>
                    Un workflow classique suit des règles fixes. Un agent IA ajoute du
                    jugement : il lit un e-mail, le classe, en extrait l&apos;essentiel et
                    rédige une réponse. Dans n8n, on branche OpenAI ou Claude, on leur donne ta
                    documentation via un RAG, et on les relie à tes logiciels par MCP.
                    L&apos;agent répond avec tes données, pas avec des généralités. Plus de
                    détails sur notre page agence agents IA.
                  </p>

                  <h2>Comment fonctionne l&apos;abonnement agence n8n Fyliz</h2>
                  <p>
                    Un prix fixe par mois, une file de demandes sans plafond traitées par
                    priorité, et tout ce qui est livré reste à toi. Une agence n8n classique
                    facture chaque projet, puis la maintenance à part.
                  </p>

                  <h3>Des demandes illimitées, traitées par priorité</h3>
                  <p>
                    Tu ajoutes tes demandes dans un tableau partagé, autant que tu veux. On les
                    classe ensemble et chacune est estimée avant de démarrer. Un gros projet est
                    découpé en livrables.
                  </p>
                  <p>
                    Illimité ne veut pas dire simultané. Les demandes passent une par une, dans
                    l&apos;ordre que tu choisis. Mais il n&apos;y a ni quota, ni avenant, ni devis
                    à chaque nouvelle idée.
                  </p>

                  <h3>Maintenance, dépannage sous 24 h et évolutions incluses</h3>
                  <p>
                    Un workflow casse un jour : une API change, un champ du CRM est renommé, un
                    modèle d&apos;IA évolue. On prend alors en charge le dépannage sous 24 h.
                    Corrections et évolutions sont incluses. Chaque mois, on fait un point de
                    priorisation avec toi. Chaque livrable est documenté, et on forme tes
                    équipes.
                  </p>

                  <h3>Sans engagement, avec pause possible</h3>
                  <p>
                    La résiliation prend effet à la fin du mois en cours. Tu peux aussi faire une
                    pause : les jours non utilisés du mois sont conservés. Et si tu arrêtes, tes
                    automatisations continuent de tourner, puisqu&apos;elles sont sur tes
                    comptes.
                  </p>
                  <p>
                    Pourquoi un abonnement ? Parce qu&apos;une automatisation n&apos;est jamais
                    finie : tes outils changent, tes besoins aussi.
                  </p>

                  <h2>Notre méthode en 4 étapes</h2>
                  <p>
                    On démarre 48 h après le premier appel, et ta première automatisation simple
                    tourne en quelques jours :
                  </p>
                  <ol>
                    <li>
                      <strong>Consultation stratégique (30 min).</strong> On audite ton activité
                      et tes priorités d&apos;automatisation.
                    </li>
                    <li>
                      <strong>Onboarding, sous 48 h.</strong> Tu nous donnes accès à tes outils,
                      on crée ou on reprend ton instance n8n sur ton compte, et on fixe la
                      feuille de route du premier mois.
                    </li>
                    <li>
                      <strong>Demandes et livraisons.</strong> Chaque automatisation est
                      estimée, construite, testée, puis documentée avant sa mise en production.
                    </li>
                    <li>
                      <strong>Maintenance et amélioration.</strong> On corrige, on dépanne sous
                      24 h, on fait évoluer. Les priorités sont revues chaque mois.
                    </li>
                  </ol>
                  <p>
                    La consultation ne t&apos;engage à rien. L&apos;abonnement non plus : tu peux
                    t&apos;arrêter à la fin du premier mois.
                  </p>

                  <h2>Combien coûte une agence n8n ?</h2>
                  <p>
                    Chez Fyliz, 3 000 € HT par mois, prestation tout compris, ou un projet au
                    forfait sur devis. Les logiciels et l&apos;IA que tu utilises restent payés
                    sur tes propres comptes.
                  </p>

                  <h3>Ce qui est inclus et ce qui ne l&apos;est pas</h3>
                  <p>
                    Le prix couvre le travail de l&apos;équipe. Les outils sont à ton nom :
                    c&apos;est ce qui te garantit de rester propriétaire.
                  </p>
                  <Table
                    head={["Élément", "Inclus dans l'abonnement", "À ta charge (sur tes comptes)"]}
                    rows={[
                      ["Conception et construction des workflows n8n", "Oui", "Non"],
                      ["Agents IA sur mesure", "Oui", "Non"],
                      ["Maintenance, corrections et dépannage sous 24 h", "Oui", "Non"],
                      ["Évolutions des workflows existants", "Oui", "Non"],
                      ["Point mensuel de priorisation", "Oui", "Non"],
                      ["Documentation de chaque livrable", "Oui", "Non"],
                      ["Formation des équipes", "Oui", "Non"],
                      ["Abonnement n8n (Cloud ou serveur self-hosted)", "Non", "Oui"],
                      ["CRM et autres logiciels", "Non", "Oui"],
                      ["Consommation des API d'IA (OpenAI, Claude...)", "Non", "Oui"],
                    ]}
                  />

                  <Cta note="30 min pour auditer ton activité et voir si l'abonnement se justifie, ou si un projet sur devis suffit." />

                  <h3>Le projet ponctuel sur devis</h3>
                  <p>
                    Un seul besoin, bien délimité ? On diagnostique ton processus, on te propose
                    un forfait, puis on livre une automatisation testée et documentée. Pas
                    d&apos;abonnement.
                  </p>

                  <h3>Comment se situent les autres modèles du marché</h3>
                  <p>
                    La plupart des prestataires séparent deux factures : la construction, vendue
                    au projet ou « sur devis », et un forfait mensuel de maintenance qui ne
                    comprend pas les nouveaux workflows. Notre prix mensuel inclut la
                    construction. Compare donc 3 000 € HT à la somme des deux, pas au seul
                    forfait de maintenance. Le détail est sur la page tarifs et fonctionnement de
                    l&apos;abonnement.
                  </p>

                  <h2>Nos cas clients : ce qu&apos;on a vraiment livré</h2>
                  <p>
                    Voici quatre projets nommés, décrits tels qu&apos;ils ont été livrés. Deux
                    tournent sur n8n, deux non, et c&apos;est assumé :{" "}
                    <strong>n8n est un outil, pas une fin en soi</strong>. On choisit l&apos;outil
                    adapté à ton problème, et n8n quand c&apos;est le bon choix.
                  </p>

                  <h3>Equity Family : un tunnel de vente par webinaire migré de Make vers n8n</h3>
                  <p>
                    Equity Family vend des programmes de coaching par webinaire live.
                    L&apos;entreprise fait partie du groupe MLX MEDIA, avec notamment Lexa et
                    Blink. Plutôt que de recruter un développeur et un spécialiste de
                    l&apos;automatisation, le groupe a choisi l&apos;abonnement Fyliz.
                  </p>
                  <p>
                    Ses automatisations tournaient sur Make, facturé à l&apos;opération : plus
                    d&apos;inscrits, plus de frais. On a tout migré sur n8n, auto-hébergé sur un
                    serveur dédié du client. Puis, demande après demande, on a construit :
                  </p>
                  <ul>
                    <li>
                      la synchronisation de l&apos;emailing, du CRM, de l&apos;agenda et de la
                      plateforme de webinaire à chaque inscription ;
                    </li>
                    <li>une chauffe WhatsApp avant chaque webinaire, pilotée par l&apos;équipe marketing ;</li>
                    <li>des e-mails ActiveCampaign adaptés au comportement de chaque inscrit ;</li>
                    <li>
                      « Setia », un setter IA sur mesure qui remplace un SaaS et amène les
                      prospects à réserver un appel ;
                    </li>
                    <li>« Tracking », une plateforme d&apos;analyse qui remplace un tableur rempli à la main ;</li>
                    <li>
                      une interface Airtable de suivi des clients coachés, et « MLX Compta » pour
                      les factures et échéanciers.
                    </li>
                  </ul>
                  <p>
                    Quand Equity Family a changé de plateforme de webinaire, on a tout adapté
                    sans nouveau devis. Lire le{" "}
                    <Link href="/cas-clients/equity-family-automatiser-un-tunnel-de-vente-par-webinaire">
                      cas Equity Family
                    </Link>
                    .
                  </p>

                  <h3>MySkillFactory : agents IA pour un organisme de formation (n8n)</h3>
                  <p>
                    Pour INAFON, l&apos;organisme de formation des notaires et client de
                    MySkillFactory, on a construit sur n8n un chatbot en RAG sur le catalogue
                    relié au CRM Odoo par MCP, l&apos;analyse des questionnaires de satisfaction,
                    une veille du droit notarial qui recommande les programmes à mettre à jour
                    (avec validation humaine) et des e-mails personnalisés par profil de notaire.
                    Pourquoi n8n ? C&apos;est open source et sans code : l&apos;équipe du client
                    modifie ses workflows sans développeur. Lire le{" "}
                    <Link href="/cas-clients/myskillfactory-agents-ia-pour-organisme-de-formation">
                      cas MySkillFactory et INAFON
                    </Link>
                    .
                  </p>
                  <Quote author="Juliette Brunelot, MySkillFactory, 22/08/2025">
                    « Camille a été très réactif. Nous avons pu programmer rapidement notre
                    séance de travail qui a été efficace. Nous avons atteint les objectifs fixés.
                    Merci Camille »
                  </Quote>

                  <h3>J&apos;aime : un SAV hôtelier géré par un agent IA</h3>
                  <p>
                    Pour l&apos;hôtel J&apos;aime, on a construit un agent IA qui répond aux
                    e-mails et aux messages WhatsApp. Il consulte réservations et disponibilités
                    via un MCP connecté au logiciel de réservation, puis formule la réponse. Pas
                    de n8n ici : un agent IA connecté par MCP faisait mieux le travail. Le client
                    a présenté la solution dans{" "}
                    <a
                      href="https://www.bfmtv.com/economie/replay-emissions/l-hebdo-des-pme/video-herve-debbah-j-a-ime-j-a-ime-solution-a-base-d-ia-pour-l-hotellerie-20-12_VN-202512200140.html"
                      {...external}
                    >
                      L&apos;hebdo des PME sur BFM Business
                    </a>
                    . Voir le{" "}
                    <Link href="/cas-clients/j-aime-sav-ia-pour-lhotellerie">cas J&apos;aime</Link>{" "}
                    et notre guide pour{" "}
                    <Link href="/blog/comment-creer-un-mcp-pour-automatiser-les-reponses-clients-dans-lhotellerie">
                      créer un MCP qui répond aux clients d&apos;un hôtel
                    </Link>
                    .
                  </p>

                  <h3>Crédit Agricole (Linxo) : tests d&apos;intégration automatisés</h3>
                  <p>
                    Ce n&apos;est pas un projet n8n, c&apos;est une mission de développement. Sur
                    Linxo Connect, service de Linxo (groupe Crédit Agricole), on a développé des
                    fonctionnalités en React et Express et automatisé les tests d&apos;intégration
                    avec une machine à états. Ces tests couvrent environ 70 % des cas de figure,
                    selon le{" "}
                    <Link href="/cas-clients/credit-agricole-automatisation-des-tests-dintegration">
                      cas Crédit Agricole
                    </Link>
                    . Quand un besoin dépasse n8n, la même équipe écrit le code.
                  </p>
                  <Quote author="Hervé, Parness Cruises, 13/08/2025">
                    « Il fallait installer n8n MCP pour Claude. Camille connaît parfaitement son
                    sujet et, en sus d&apos;effectuer cette installation, il a à cœur de vous
                    former pour vous rendre autonome. Un état d&apos;esprit remarquable à la
                    hauteur de ses compétences techniques. »
                  </Quote>
                  <Quote author="Frederic, Everest Startup Studio, 08/10/2026">
                    « Camille est très pédagogue et efficace ! En quelques sessions il m&apos;a
                    formé sur les bases de l&apos;automatisation IA et nous avons créé une
                    architecture et une application déjà déployée et utile. Je recommande ! »
                  </Quote>
                  <p>
                    D&apos;autres entreprises nous ont confié leurs automatisations, dont Crédit
                    Agricole, La Provence, Montblanc, Ford, CMA CGM, VIP Paris Hotel et Groupe
                    M6. Tous les projets sont sur la page <Link href="/cas-clients">cas clients</Link>.
                  </p>

                  <h2>Qui est derrière Fyliz</h2>
                  <p>
                    Fyliz a été fondée par <strong>Camille Vingere</strong>, ingénieur, qui dirige
                    l&apos;agence. Depuis 2019, il connecte des outils métiers, automatise des
                    tâches chronophages et déploie des agents IA chez ses clients. C&apos;est lui
                    que tu rencontres pendant la consultation. Son{" "}
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
                    te donnent une idée de sa façon de travailler. Autour de lui, l&apos;équipe
                    réunit les compétences n8n, IA et développement, sans que tu aies à recruter
                    chacune.
                  </p>

                  <h2>Tes données et tes comptes restent chez toi</h2>
                  <p>
                    Tout est hébergé sur tes comptes, dans l&apos;Union européenne, documenté, et
                    t&apos;appartient, même si tu arrêtes. On travaille dans tes outils, avec des
                    accès que tu donnes et que tu peux retirer.
                  </p>
                  <p>
                    Une agence qui héberge tes workflows chez elle te rend dépendant. Chez nous,
                    l&apos;instance n8n, les clés d&apos;API et la documentation sont à ton nom
                    dès le premier jour.
                  </p>

                  <h3>n8n Cloud ou self-hosted : lequel pour ta PME ?</h3>
                  <p>
                    n8n Cloud est hébergé par l&apos;éditeur : rien à installer, mises à jour
                    automatiques. La version self-hosted tourne sur ton serveur : plus de contrôle
                    sur les données et les coûts, mais une infrastructure à maintenir. On
                    t&apos;aide à trancher pendant l&apos;onboarding. Détails dans notre
                    comparatif <Link href="/blog/n8n-cloud-vs-self-hosted">n8n Cloud vs self-hosted</Link>.
                  </p>

                  <h3>RGPD et accès</h3>
                  <p>
                    Trois engagements. Tes workflows et tes données sont hébergés dans
                    l&apos;Union européenne. On signe un DPA, l&apos;accord de sous-traitance
                    prévu par le RGPD. Et on travaille uniquement depuis des accès sur tes
                    comptes, limités aux outils nécessaires.
                  </p>
                  <Table
                    head={["Critère", "n8n Cloud", "n8n self-hosted"]}
                    rows={[
                      ["Installation", "Aucune", "Serveur à préparer"],
                      ["Mises à jour", "Automatiques", "À planifier"],
                      ["Contrôle de l'emplacement des données", "Limité aux options de l'éditeur", "Total"],
                      ["Coût", "Abonnement n8n Cloud", "Serveur + temps de maintenance"],
                      ["Pour qui", "PME qui veut aller vite", "PME aux données sensibles ou au gros volume"],
                    ]}
                  />

                  <h2>Expert n8n freelance, agence au projet ou abonnement : que choisir ?</h2>
                  <p>
                    Le freelance convient à un besoin ponctuel bien défini, l&apos;agence au
                    projet à un chantier unique, l&apos;abonnement à une PME qui veut automatiser
                    en continu. Le bon choix dépend moins du prix affiché que de ce qui se passe
                    après la livraison.
                  </p>
                  <p>
                    Un expert n8n indépendant est souvent excellent techniquement. Mais il est
                    seul : s&apos;il part en congés, ton workflow attend. L&apos;agence au projet
                    règle la question des compétences, puis s&apos;en va. L&apos;abonnement garde
                    la même équipe sur tes workflows mois après mois.
                  </p>
                  <Table
                    head={["Critère", "Expert ou consultant n8n freelance", "Agence au projet", "Abonnement Fyliz"]}
                    rows={[
                      ["Coût", "Taux journalier, construction puis maintenance facturées au temps passé", "Forfait par projet + maintenance à part", "3 000 € HT/mois, construction comprise"],
                      ["Continuité en cas d'absence", "Dépend d'une personne", "Équipe, pendant le projet seulement", "Équipe en continu, dépannage sous 24 h"],
                      ["Maintenance", "À négocier", "Souvent en option", "Incluse"],
                      ["Compétences", "n8n, parfois IA", "Variables", "n8n + IA + dev"],
                      ["Engagement", "À la mission", "Au projet", "Sans engagement, résiliation fin de mois"],
                      ["Qui garde la main sur les workflows", "Selon le contrat", "Selon le contrat", "Toi, sur tes comptes"],
                    ]}
                  />

                  <h3>Combien coûte un expert n8n freelance ?</h3>
                  <p>
                    Un freelance n8n facture à la journée, et son taux varie fortement selon
                    l&apos;expérience. Pour comparer honnêtement, additionne les jours de
                    construction, puis ceux de maintenance et d&apos;évolution sur un an.
                    C&apos;est ce total qui se compare à un abonnement, pas le prix d&apos;une
                    journée.
                  </p>

                  <h3>Et recruter en interne ?</h3>
                  <p>
                    Recruter un profil IA expérimenté prend du temps et coûte un salaire chargé,
                    pour une seule personne. C&apos;est le calcul qu&apos;a fait Equity Family.
                    On compare les deux options dans notre article internaliser ou externaliser
                    l&apos;IA.
                  </p>

                  <h2>n8n, Make ou Zapier : pourquoi on travaille surtout avec n8n</h2>
                  <p>
                    On choisit n8n par défaut pour trois raisons. Il est open source et
                    hébergeable chez toi. Il est facturé à l&apos;exécution du workflow, pas à
                    chaque étape (voir la{" "}
                    <a href="https://n8n.io/pricing/" {...external}>
                      page tarifs de n8n
                    </a>
                    ). Et il intègre des nœuds IA natifs : agents, RAG, OpenAI ou Claude.
                  </p>
                  <p>
                    Make et Zapier restent de bons outils, et on intervient aussi sur Make quand
                    il fait le travail. Mais quand le volume grimpe, la facturation à
                    l&apos;opération pèse : c&apos;est ce qui a poussé Equity Family à migrer vers
                    n8n auto-hébergé. Tu envisages une migration depuis Make ou Zapier ? On la
                    cadre pendant la consultation.
                  </p>
                  <p>
                    Pour un comparatif détaillé, lis{" "}
                    <a href="https://n8n-france.com/n8n-vs-make-vs-zapier/" {...external}>
                      n8n vs Make vs Zapier
                    </a>{" "}
                    sur n8n-france.com, un site édité par la même équipe que Fyliz.
                  </p>
                  <Table
                    head={["Argument", "Ce que ça change pour toi", "Source"]}
                    rows={[
                      ["Open source et self-hostable", "Tes données peuvent rester sur ton serveur", "Documentation n8n"],
                      ["Facturation à l'exécution", "Un workflow à 20 étapes compte comme une exécution", "Page tarifs n8n"],
                      ["Nœuds IA natifs", "Agents, RAG et modèles OpenAI ou Claude dans le même workflow", "Documentation n8n"],
                    ]}
                  />

                  <h2>Quand n8n n&apos;est pas le bon choix</h2>
                  <p>
                    n8n n&apos;est pas toujours la bonne réponse, et une agence n8n honnête doit
                    te le dire. Quatre cas où on te le déconseillera :
                  </p>
                  <ul>
                    <li>
                      <strong>Une tâche simple déjà couverte par ton logiciel.</strong> Si ton CRM
                      relance un devis tout seul, active la fonction.
                    </li>
                    <li>
                      <strong>Un outil sans API.</strong> L&apos;automatisation devient fragile. On
                      te le dit dès la consultation.
                    </li>
                    <li>
                      <strong>Un besoin de développement.</strong> Une interface ou une
                      application sur mesure s&apos;écrit en code, comme Tracking ou MLX Compta
                      chez Equity Family.
                    </li>
                    <li>
                      <strong>Un volume très faible.</strong> Deux automatisations par an ne
                      justifient pas 3 000 € HT/mois : un projet sur devis suffit.
                    </li>
                  </ul>
                  <p>Mieux vaut le savoir en 30 minutes qu&apos;après trois mois d&apos;abonnement.</p>
                  <Table
                    head={["Situation", "Pourquoi n8n n'est pas adapté", "Ce qu'on te conseille"]}
                    rows={[
                      ["Tâche simple déjà couverte par ton logiciel", "Un workflow ajoute une pièce à maintenir", "Activer la fonction native"],
                      ["Outil sans API", "Connexion fragile", "Vérifier les exports ou changer d'outil"],
                      ["Besoin d'interface ou d'application sur mesure", "Hors du périmètre d'un workflow", "Développement sur mesure (même équipe)"],
                      ["Volume très faible", "Abonnement non rentabilisé", "Projet ponctuel sur devis"],
                    ]}
                  />

                  <h2>FAQ sur notre agence n8n</h2>
                  {faq.map((item) => (
                    <div key={item.question}>
                      <h3>{item.question}</h3>
                      {item.question === "n8n est-il gratuit ?" ? (
                        <p>
                          La version self-hosted est gratuite pour un usage interne, sous{" "}
                          <a href="https://docs.n8n.io/n8n-community-license" {...external}>
                            licence fair-code
                          </a>
                          . n8n Cloud est payant. Dans les deux cas, ces coûts sont réglés sur tes
                          comptes.
                        </p>
                      ) : (
                        <p>{item.answer}</p>
                      )}
                    </div>
                  ))}

                  <h2>Points à retenir</h2>
                  <ul>
                    <li>
                      <strong>Prix</strong> : 3 000 € HT/mois, construction, maintenance et
                      évolutions comprises. Outils et API sur tes comptes.
                    </li>
                    <li>
                      <strong>Réactivité</strong> : démarrage sous 48 h, demandes illimitées par
                      priorité, dépannage sous 24 h.
                    </li>
                    <li>
                      <strong>Sur tes comptes</strong> : hébergement UE, DPA signé, workflows et
                      documentation à toi, même après l&apos;arrêt.
                    </li>
                    <li>
                      <strong>Le bon outil</strong> : n8n quand c&apos;est le bon choix, du code ou
                      un agent IA quand ça ne l&apos;est pas.
                    </li>
                  </ul>
                  <p>
                    Prochaine étape : voir ce que ça donnerait chez toi. En 30 minutes, on audite
                    ton activité et tes priorités d&apos;automatisation.
                  </p>

                  <Cta note="30 min d'audit de ton activité et de tes priorités d'automatisation." />

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

                {/* Encadré auteur, sans photo tant qu'elle n'est pas fournie */}
                <aside className="panel vstack gap-1 p-3 lg:p-4 mt-6 rounded-2 border" style={{ backgroundColor: "#fff5ed", borderColor: "#ffddcc" }}>
                  <p className="fw-bold m-0">Camille Vingere, fondateur de Fyliz</p>
                  <p className="m-0">
                    Ingénieur, il connecte des outils métiers et déploie des agents IA chez ses
                    clients depuis 2019.
                  </p>
                  <ul className="nav-x gap-2 m-0">
                    {siteConfig.footer
                      .find((section) => section.title === "Social")
                      ?.links.filter((link) => ["LinkedIn", "Youtube"].includes(link.text))
                      .map((link) => (
                        <li key={link.text}>
                          <a href={link.href} {...external} aria-label={link.text}>
                            <i
                              className={`icon icon-2 ${link.text === "LinkedIn" ? "unicon-logo-linkedin" : "unicon-logo-youtube"}`}
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
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
