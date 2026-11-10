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

const title = "Agence agent IA PME : agents sur mesure à 3 000 € HT/mois";
const description =
  "On code tes agents IA sur mesure, branchés sur ton CRM, tes e-mails et WhatsApp, et on les maintient en production. 3 000 € HT/mois, sans engagement.";
const pageUrl = "https://fyliz.com/agence-agents-ia";

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
    question: "Qu'est-ce qu'une agence agent IA ?",
    answer:
      "Une agence agent IA conçoit, développe et maintient des agents IA pour les entreprises : des assistants qui lisent une demande, vont chercher l'information dans tes outils et agissent (répondre, mettre à jour un CRM, préparer un document), avec un humain qui reprend la main quand il le faut.",
  },
  {
    question: "Combien coûte un agent IA sur mesure ?",
    answer:
      "Chez Fyliz, 3 000 € HT/mois sans engagement, construction, maintenance et évolutions comprises, ou un projet au forfait sur devis. La consommation des API d'IA et les licences logicielles restent payées sur tes propres comptes.",
  },
  {
    question: "Combien de temps pour mettre un agent IA en production ?",
    answer:
      "On démarre 48 h après le premier appel. Un agent simple est testé sur tes vrais cas puis mis en production par étapes, d'abord avec validation humaine. Chaque agent est estimé avant de démarrer.",
  },
  {
    question: "Un agent IA peut-il remplacer un collaborateur ?",
    answer:
      "Il remplace des tâches, pas une personne : trier, répondre aux demandes fréquentes, relancer, préparer. Ton équipe garde les cas délicats et les décisions, et l'agent lui passe la main quand il n'est pas sûr.",
  },
  {
    question: "Un agent IA peut-il se brancher sur mes outils actuels ?",
    answer:
      "Oui, dès que l'outil a une API : CRM (HubSpot, Pipedrive, Odoo), e-mails, WhatsApp, Airtable, logiciel de réservation ou de facturation. On le connecte par API ou par MCP. Sans API, on te le dit dès le premier appel.",
  },
  {
    question: "Mes données sont-elles en sécurité (RGPD) ?",
    answer:
      "Les agents tournent sur tes comptes, hébergés dans l'Union européenne, avec des accès limités aux outils nécessaires. On signe un DPA, l'accord de sous-traitance prévu par le RGPD, et tu peux retirer nos accès à tout moment.",
  },
  {
    question: "Quel modèle d'IA utilisez-vous : ChatGPT, Claude ou Mistral ?",
    answer:
      "Celui qui convient à la tâche. On compare la qualité des réponses, le coût par appel et les contraintes sur les données, puis on choisit OpenAI, Claude ou Mistral. Le code est écrit pour pouvoir changer de modèle sans tout refaire.",
  },
  {
    question: "Si j'arrête l'abonnement, qu'est-ce que je récupère ?",
    answer:
      "Tout. Le code, les comptes, les clés d'API et la documentation sont à ton nom dès le départ. La résiliation prend effet à la fin du mois en cours et tes agents continuent de tourner.",
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
      "@id": "https://fyliz.com/agence-agents-ia#service",
      name: "Agence agents IA",
      serviceType: "Développement et maintenance d'agents IA sur mesure",
      description:
        "Conception, développement et maintenance d'agents IA sur mesure pour PME, connectés aux outils du client (CRM, e-mails, WhatsApp, logiciels métier) et hébergés sur ses comptes dans l'Union européenne. Abonnement mensuel sans engagement, démarrage sous 48 h, dépannage sous 24 h, ou projet au forfait sur devis.",
      url: "https://fyliz.com/agence-agents-ia",
      provider: { "@id": "https://fyliz.com/#organization" },
      areaServed: { "@type": "Country", name: "France" },
      audience: { "@type": "BusinessAudience", audienceType: "PME" },
      offers: [
        {
          "@type": "Offer",
          name: "Abonnement Fyliz",
          description:
            "Agents IA sur mesure, automatisations et développement, maintenance, corrections et dépannage sous 24 h, point mensuel, documentation. Sans engagement. Logiciels et API d'IA payés sur les comptes du client.",
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
          url: "https://fyliz.com/agence-agents-ia",
        },
        {
          "@type": "Offer",
          name: "Projet sur devis",
          description:
            "Cadrage de la tâche, proposition au forfait, agent livré testé et documenté.",
          url: "https://fyliz.com/agence-agents-ia",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://fyliz.com/agence-agents-ia#faq",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://fyliz.com/agence-agents-ia#breadcrumb",
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
          name: "Agence agents IA",
          item: "https://fyliz.com/agence-agents-ia",
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
  { id: "definition", label: "Ce qu'un agent IA fait vraiment" },
  { id: "sur-mesure", label: "Du code sur mesure" },
  { id: "cas-clients", label: "Nos agents IA en production" },
  { id: "methode", label: "Méthode en 5 étapes" },
  { id: "prix", label: "Prix d'un agent IA sur mesure" },
  { id: "securite", label: "Sécurité et RGPD" },
  { id: "pas-adapte", label: "Quand un agent n'est pas la réponse" },
  { id: "faq", label: "FAQ" },
];

function Cta({ note }: { note: string }) {
  return (
    <div className={s.inlineCta}>
      <CtaLink
        href={siteConfig.cta.buttonLink}
        ctaName="agence_agents_ia_appel_decouverte"
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
      <p>Ils nous ont confié leurs projets IA</p>
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

export default function AgenceAgentsIaPage() {
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
              <Crumbs
                items={[{ href: "/", label: "Accueil" }, { label: "Agence agents IA" }]}
              />
              <h1 className={`${s.title} ${s.titleXl}`}>
                Agence agents IA&nbsp;: on construit et on{" "}
                <span className={landing.serif}>fait tourner</span> tes agents sur
                mesure
              </h1>
              <p className={s.intro}>
                Fyliz est une <strong>agence d&apos;agents IA</strong> pour PME : on
                code des agents sur mesure, branchés sur tes outils (CRM, e-mails,
                WhatsApp, logiciels métier), et on les maintient en production.
                3 000 € HT/mois sans engagement, tout reste à ton nom.
              </p>
              <div className={s.heroActions}>
                <CtaLink
                  href={siteConfig.cta.buttonLink}
                  ctaName="agence_agents_ia_hero_appel_decouverte"
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
                  Mis à jour le <time dateTime="2026-11-10">10 novembre 2026</time>
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
                <p>
                  Ton projet d&apos;agent n&apos;est jamais sorti de la démo ? On
                  t&apos;a promis un « agent autonome » qui invente des réponses ? Ou tu
                  te demandes simplement qui le réparera le jour où ton CRM change ?
                  C&apos;est exactement ce qu&apos;on prend en charge, comme{" "}
                  <Link href="/">équipe IA externalisée</Link> : des agents qui
                  tournent déjà chez l&apos;hôtel J&apos;aime (présenté sur BFM
                  Business), chez INAFON avec MySkillFactory et chez Equity Family.
                </p>

                <h2 id="definition">Ce qu&apos;un agent IA fait vraiment dans une PME</h2>
                <p>
                  Un agent IA lit une demande, va chercher l&apos;information dans tes
                  outils, agit (il répond, met à jour, prépare) et passe la main à un
                  humain quand il n&apos;est pas sûr. C&apos;est la différence avec un
                  simple chatbot : il ne se contente pas de parler, il fait une partie
                  du travail, dans tes logiciels.
                </p>

                <h3>Agent IA, chatbot ou automatisation : la différence</h3>
                <Table
                  head={["Outil", "Ce qu'il fait", "Exemple"]}
                  rows={[
                    [
                      "Automatisation",
                      "Suit des règles fixes, sans jugement",
                      "Chaque nouveau devis est copié dans le CRM",
                    ],
                    [
                      "Chatbot",
                      "Répond à des questions à partir d'un texte",
                      "Une FAQ conversationnelle sur ton site",
                    ],
                    [
                      "Agent IA",
                      "Comprend la demande, consulte tes outils, agit, passe la main",
                      "Il lit un e-mail client, vérifie la réservation, répond ou transmet",
                    ],
                  ]}
                />
                <p>
                  Un <strong>chatbot IA sur mesure</strong> devient un agent dès
                  qu&apos;on le relie à tes données et qu&apos;on lui donne le droit
                  d&apos;agir. C&apos;est ce qu&apos;on a fait pour INAFON : un chatbot
                  sur le catalogue de formations, relié au CRM.
                </p>

                <h3>Les agents qu&apos;on construit, par tâche</h3>
                <ul>
                  <li>
                    <strong>Support client</strong> : répondre aux e-mails et aux
                    messages WhatsApp avec tes vraies données (cas J&apos;aime).
                  </li>
                  <li>
                    <strong>Ventes</strong> : relancer et qualifier des inscrits ou des
                    leads sur WhatsApp, comme un setter (cas Equity Family).
                  </li>
                  <li>
                    <strong>Admin et contenu</strong> : analyser des questionnaires,
                    faire une veille, préparer des e-mails personnalisés (cas INAFON).
                  </li>
                  <li>
                    <strong>Voix</strong> : un agent vocal qui décroche, répond aux
                    questions fréquentes et prend un rendez-vous (exemple type).
                  </li>
                </ul>

                <h2 id="sur-mesure">Du code sur mesure, pas une plateforme de chatbot</h2>
                <p>
                  On écrit le code de chaque agent pour ta tâche et tes outils, au lieu
                  de configurer un chatbot sur une plateforme payée à la conversation.
                  C&apos;est plus de travail au départ, et c&apos;est ce qui fait
                  qu&apos;un agent tient en production.
                </p>

                <h3>Ce que ça change pour toi</h3>
                <ul>
                  <li>
                    <strong>Ta logique métier exacte</strong> : les règles de ton
                    activité, pas celles prévues par un éditeur.
                  </li>
                  <li>
                    <strong>Des tests sur tes vrais cas</strong> : on rejoue tes
                    e-mails ou tes conversations passées avant la mise en ligne.
                  </li>
                  <li>
                    <strong>Pas de licence par conversation</strong> : tu paies la
                    consommation du modèle d&apos;IA, sur ton compte, au prix de
                    l&apos;éditeur.
                  </li>
                  <li>
                    <strong>Un code à ton nom</strong> : si tu changes de prestataire,
                    l&apos;agent part avec toi.
                  </li>
                </ul>

                <h3>Quel modèle d&apos;IA ? Celui qui convient à la tâche</h3>
                <p>
                  On n&apos;est pas liés à un modèle. Selon la qualité des réponses, le
                  coût par appel et les contraintes sur tes données, on choisit OpenAI,
                  Claude ou Mistral, et le code est écrit pour pouvoir en changer. Chez
                  Equity Family, chaque assistant peut même tourner sur un modèle
                  différent.
                </p>
                <p>
                  Et quand un workflow simple suffit, on ne code pas : on le construit
                  sur n8n, voir notre page <Link href="/agence-n8n">agence n8n</Link>.
                </p>

                <h2 id="cas-clients">Nos agents IA en production</h2>
                <p>
                  Trois agents nommés, décrits tels qu&apos;ils tournent aujourd&apos;hui
                  chez nos clients.
                </p>

                <h3>J&apos;aime : un agent qui gère le SAV d&apos;un hôtel</h3>
                <p>
                  Pour l&apos;hôtel J&apos;aime, on a construit un agent IA qui répond
                  aux e-mails et aux messages WhatsApp des clients en consultant les
                  réservations et les disponibilités, via un MCP connecté au logiciel
                  de réservation. Pas de plateforme intermédiaire : l&apos;agent parle
                  directement au logiciel de l&apos;hôtel. Le client a présenté la
                  solution dans{" "}
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

                <h3>INAFON (MySkillFactory) : des agents IA pour un organisme de formation</h3>
                <p>
                  Pour INAFON, l&apos;organisme de formation des notaires et client de
                  MySkillFactory, on a construit un chatbot en RAG sur le catalogue,
                  relié au CRM Odoo par MCP, l&apos;analyse des questionnaires de
                  satisfaction, une veille du droit notarial avec validation humaine et
                  des e-mails personnalisés par profil. Lire le{" "}
                  <Link href="/cas-clients/myskillfactory-agents-ia-pour-organisme-de-formation">
                    cas MySkillFactory et INAFON
                  </Link>{" "}
                  ou notre guide pour{" "}
                  <Link href="/blog/creer-un-agent-ia-rag-sur-n8n-guide-complet">
                    créer un agent IA RAG
                  </Link>
                  .
                </p>
                <Quote author="Juliette Brunelot, MySkillFactory, 22/08/2025">
                  « Camille a été très réactif. Nous avons pu programmer rapidement
                  notre séance de travail qui a été efficace. Nous avons atteint les
                  objectifs fixés. Merci Camille »
                </Quote>

                <h3>Equity Family : un setter IA sur WhatsApp</h3>
                <p>
                  Equity Family (groupe MLX MEDIA) vend des programmes de coaching par
                  webinaire live. Le risque : des inscrits qui oublient de venir. On a
                  codé une application sur mesure, branchée sur l&apos;API WhatsApp
                  officielle de Meta, dans laquelle un setter IA échange avec chaque
                  inscrit, lui confirme la date et l&apos;incite à se présenter au
                  webinaire. Les relances sont plafonnées pour ne pas harceler, et
                  l&apos;équipe suit toutes les conversations dans une messagerie.
                </p>
                <Illustration
                  src="/assets/images/agence-n8n/equity-family-tunnel-webinaire-n8n.webp"
                  alt="Tunnel de vente par webinaire d'Equity Family, de l'inscription à la vente"
                  width={1280}
                  height={840}
                  caption="Le tunnel d'Equity Family, dans lequel s'insère le setter IA."
                />
                <p>
                  Le setter s&apos;ajoute au reste du tunnel qu&apos;on maintient :
                  synchronisation du CRM, de l&apos;agenda et de la plateforme de
                  webinaire, e-mails ActiveCampaign, suivi des clients sur Airtable.
                  Lire le{" "}
                  <Link href="/cas-clients/equity-family-automatiser-un-tunnel-de-vente-par-webinaire">
                    cas Equity Family
                  </Link>
                  .
                </p>

                <p>
                  D&apos;autres entreprises nous ont confié leurs projets, dont Crédit
                  Agricole, La Provence, Montblanc, Ford, CMA CGM, VIP Paris Hotel et
                  Groupe M6. Tous les projets sont sur la page{" "}
                  <Link href="/cas-clients">cas clients</Link>.
                </p>
                <ClientLogos />

                <h2 id="methode">Notre méthode : de la tâche à l&apos;agent en production</h2>
                <p>
                  On démarre 48 h après le premier appel, et on avance par étapes :
                  l&apos;agent ne gagne en autonomie qu&apos;une fois qu&apos;il a
                  prouvé qu&apos;il répond juste.
                </p>
                <ol>
                  <li>
                    <strong>Appel de 30 min.</strong> On choisit une tâche précise et la
                    façon de mesurer si l&apos;agent la fait bien.
                  </li>
                  <li>
                    <strong>Cadrage.</strong> Les sources de données, les actions que
                    l&apos;agent a le droit de faire, et les cas où il passe la main.
                  </li>
                  <li>
                    <strong>Construction et tests.</strong> On code l&apos;agent et on le
                    teste sur tes vrais exemples avant toute mise en ligne.
                  </li>
                  <li>
                    <strong>Mise en production progressive.</strong> D&apos;abord avec
                    validation humaine, puis en autonomie sur les cas simples.
                  </li>
                  <li>
                    <strong>Suivi.</strong> Logs, corrections, nouvelles demandes, et
                    dépannage sous 24 h.
                  </li>
                </ol>

                <h3>Comment on livre vite</h3>
                <p>
                  On développe avec Claude Code, l&apos;agent de programmation
                  d&apos;Anthropic, ce qui accélère l&apos;écriture et les tests du
                  code. Ça ne décide pas du modèle de ton agent : une fois livré, il
                  peut tourner sur OpenAI, Claude ou Mistral.
                </p>

                <h2 id="prix">Combien coûte un agent IA sur mesure ?</h2>
                <p>
                  Chez Fyliz, <strong>3 000 € HT par mois</strong>, sans engagement,
                  construction, maintenance et évolutions comprises. Pour un besoin
                  unique, on propose aussi un projet au forfait sur devis. Le détail
                  est sur notre page <Link href="/tarifs">tarifs</Link>.
                </p>

                <h3>Ce qui est inclus, ce qui reste à ta charge</h3>
                <Table
                  head={["Élément", "Inclus", "À ta charge (sur tes comptes)"]}
                  rows={[
                    ["Cadrage, développement et tests des agents IA", "Oui", "Non"],
                    ["Automatisations et outils sur mesure autour de l'agent", "Oui", "Non"],
                    ["Maintenance, corrections, dépannage sous 24 h", "Oui", "Non"],
                    ["Évolutions et nouvelles demandes", "Oui", "Non"],
                    ["Point mensuel et documentation", "Oui", "Non"],
                    ["Consommation des API d'IA (OpenAI, Claude, Mistral)", "Non", "Oui"],
                    ["Hébergement, CRM et autres logiciels", "Non", "Oui"],
                  ]}
                />

                <h3>Pourquoi un abonnement pour un agent IA</h3>
                <p>
                  Un agent n&apos;est jamais « fini ». Tes outils changent, les modèles
                  d&apos;IA évoluent, tes clients posent de nouvelles questions. Livré
                  une fois puis laissé seul, un agent se dégrade. L&apos;abonnement
                  paie quelqu&apos;un pour le surveiller, le corriger et lui ajouter
                  des tâches, sans nouveau devis à chaque idée.
                </p>

                <h3>Ce que tu trouveras ailleurs</h3>
                <p>
                  La plupart des agences d&apos;agents IA n&apos;affichent pas de prix.
                  Celles qui le font parlent de projets à partir de quelques milliers
                  d&apos;euros, souvent jusqu&apos;à plusieurs dizaines de milliers,
                  avec une maintenance facturée à part. Compare toujours le coût sur un
                  an : construction, maintenance et évolutions.
                </p>

                <Cta note="30 min pour choisir la première tâche à confier à un agent, et voir si l'abonnement se justifie ou si un projet sur devis suffit." />

                <h2 id="securite">Sécurité, données et garde-fous</h2>
                <p>
                  L&apos;agent n&apos;accède qu&apos;à ce dont il a besoin, tourne sur
                  tes comptes, et chaque action sensible peut passer par un humain.
                </p>

                <h3>Tes données et ton code restent à toi</h3>
                <p>
                  Le code, les clés d&apos;API et la documentation sont à ton nom dès le
                  premier jour, hébergés dans l&apos;Union européenne. On signe un DPA,
                  l&apos;accord de sous-traitance prévu par le RGPD, et Fyliz
                  n&apos;a qu&apos;un accès délégué que tu peux retirer à tout moment.
                </p>

                <h3>Comment on évite que l&apos;agent invente</h3>
                <p>
                  On limite ses sources à tes documents et à tes outils (RAG), on
                  enregistre chaque réponse pour pouvoir la relire, et on lui apprend à
                  dire « je transmets à un collègue » plutôt qu&apos;à deviner. Pour
                  les sujets à risque, comme la veille juridique d&apos;INAFON, un
                  humain valide avant l&apos;envoi.
                </p>

                <h2 id="pas-adapte">Quand un agent IA n&apos;est pas la bonne réponse</h2>
                <ul>
                  <li>
                    <strong>Une tâche 100 % prévisible.</strong> Si les règles sont
                    fixes, une automatisation simple coûte moins cher et ne se trompe
                    pas.
                  </li>
                  <li>
                    <strong>Pas de données.</strong> Un agent sans documents ni outils à
                    consulter ne peut que deviner.
                  </li>
                  <li>
                    <strong>Un outil sans API.</strong> L&apos;agent ne peut pas agir
                    dedans, ou de façon fragile.
                  </li>
                  <li>
                    <strong>Un volume très faible.</strong> Dix demandes par mois ne
                    justifient pas 3 000 € HT/mois : un projet sur devis suffit.
                  </li>
                </ul>
                <p>On te le dit dès le premier appel.</p>

                <h2 id="equipe">Qui est derrière l&apos;agence agents IA Fyliz</h2>
                <div className={s.author}>
                  <Image
                    src="/assets/images/team/camille-vingere-fondateur-fyliz.webp"
                    alt="Camille Vingere, fondateur de l'agence agents IA Fyliz"
                    width={120}
                    height={120}
                  />
                  <div>
                    <p>
                      Fyliz a été fondée par <strong>Camille Vingere</strong>,
                      ingénieur. Depuis 2019, il connecte des outils métiers, automatise
                      des tâches chronophages et déploie des agents IA chez ses clients.
                      C&apos;est lui que tu rencontres pendant le premier appel.
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
                      montrent sa façon de travailler.
                    </p>
                  </div>
                </div>

                <h2 id="faq">Questions fréquentes sur les agences d&apos;agents IA</h2>
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
                <h2 id="a-retenir">Agence agents IA Fyliz : l&apos;essentiel</h2>
                <ul>
                  <li>
                    <strong>Prix</strong> : 3 000 € HT/mois, construction, maintenance
                    et évolutions comprises. API d&apos;IA et logiciels sur tes comptes.
                  </li>
                  <li>
                    <strong>Du vrai sur mesure</strong> : du code écrit pour ta tâche,
                    branché sur tes outils, avec le modèle d&apos;IA qui convient.
                  </li>
                  <li>
                    <strong>En production, pas en démo</strong> : tests sur tes cas,
                    validation humaine au départ, dépannage sous 24 h.
                  </li>
                  <li>
                    <strong>Propriété</strong> : hébergement UE, DPA signé, code et
                    documentation à toi, même après l&apos;arrêt.
                  </li>
                </ul>
                <Cta note="On regarde ensemble quelle tâche confier en premier à un agent IA." />
              </div>
              <div className={s.pageEnd} />
            </div>
          </div>
        </article>
      </SiteShell>
    </>
  );
}
