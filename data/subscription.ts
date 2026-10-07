export const subscription = {
  price: 3000,
  priceLabel: "3 000 €",
  priceSuffix: "HT / mois",
};

export const navLinks = [
  { href: "#automatisations", label: "Ce qu'on automatise" },
  { href: "#methode", label: "Méthode" },
  { href: "#cas-clients", label: "Cas clients" },
  { href: "#tarif", label: "Tarif" },
  { href: "/blog", label: "Blog" },
];

// Idées client jouées en boucle par l'animation du hero (résultats illustratifs).
export const heroIdeas = [
  {
    goal: "Clients",
    idea: "Relancer automatiquement chaque devis non signé",
    value: 18,
    prefix: "+",
    suffix: " %",
    result: "de devis signés",
  },
  {
    goal: "Temps",
    idea: "Que les factures fournisseurs se saisissent toutes seules",
    value: 12,
    prefix: "",
    suffix: " h",
    result: "de saisie en moins chaque semaine",
  },
  {
    goal: "Argent",
    idea: "Relancer les factures impayées au bon moment",
    value: 35,
    prefix: "−",
    suffix: " %",
    result: "de retards de paiement",
  },
];

// Délai avant la première automatisation en production, sur un axe de 6 mois.
// `end` : fin de la fourchette haute, `solid` : part certaine de la barre (en %).
export const raceRows = [
  {
    label: "Recruter un profil IA",
    detail: "Annonce, entretiens, préavis, onboarding",
    result: "3 à 6 mois",
    end: 100,
    solid: 50,
  },
  {
    label: "Agence au projet",
    detail: "Devis, cadrage, développement",
    result: "6 à 10 semaines",
    end: 38,
    solid: 60,
  },
  {
    label: "Fyliz",
    detail: "Appel, onboarding, première livraison",
    result: "Quelques jours",
    end: 4,
    solid: 100,
    us: true,
  },
];

export const painPoints = [
  {
    value: "Quelques jours",
    text: "pour voir ta première automatisation tourner. Pas six mois de recrutement.",
  },
  {
    value: "Une équipe",
    text: "n8n, IA et dev réunis, plutôt qu'un seul profil censé tout savoir faire.",
  },
  {
    value: "Zéro engagement",
    text: "et tout t'appartient : si tu arrêtes, tes automatisations continuent de tourner.",
  },
];

export const steps = [
  {
    title: "Appel découverte",
    description:
      "30 minutes pour comprendre ton activité, tes outils, et repérer les automatisations au meilleur retour sur investissement.",
  },
  {
    title: "Onboarding",
    description:
      "Tu t'abonnes, on accède à tes outils et on construit ensemble la feuille de route du premier mois.",
  },
  {
    title: "Tu demandes, on livre",
    description:
      "Tu ajoutes tes demandes au tableau, on les traite par ordre de priorité. Chaque livraison est testée et documentée.",
  },
  {
    title: "On maintient, on améliore",
    description:
      "Surveillance, corrections et évolutions sont incluses. Chaque mois, on redéfinit les priorités avec toi.",
  },
];

export const automationAreas = [
  {
    title: "Ventes & prospection",
    outcome: "Plus de rendez-vous, zéro saisie dans le CRM.",
    benefits: [
      "Chaque lead qualifié et relancé en quelques secondes",
      "Tes commerciaux appellent les bons prospects en premier",
      "Un CRM à jour sans y penser",
    ],
  },
  {
    title: "Admin & finance",
    outcome: "La paperasse se traite toute seule.",
    benefits: [
      "Factures lues et saisies automatiquement",
      "Relances d'impayés envoyées au bon moment",
      "Un reporting financier prêt chaque lundi",
    ],
  },
  {
    title: "Opérations",
    outcome: "Tes outils se parlent enfin entre eux.",
    benefits: [
      "Fini le copier-coller entre tes logiciels",
      "Onboarding client lancé dès la signature",
      "Les bonnes alertes, aux bonnes personnes",
    ],
  },
  {
    title: "Support & contenu",
    outcome: "Tes clients ont une réponse, même à 23 h.",
    benefits: [
      "Réponses instantanées aux questions récurrentes",
      "Emails triés et transmis à la bonne personne",
      "Ton équipe garde les cas qui comptent vraiment",
    ],
  },
];

export const tools = [
  "n8n",
  "Make",
  "OpenAI",
  "Claude",
  "HubSpot",
  "Pipedrive",
  "Notion",
  "Airtable",
  "Google Workspace",
  "Slack",
  "Stripe",
  "Pennylane",
];

export const pricingFeatures = [
  "Demandes d'automatisation illimitées",
  "Agents IA & workflows n8n sur mesure",
  "Maintenance et corrections incluses",
  "Point mensuel de priorisation",
  "Documentation de chaque livrable",
  "Formation de tes équipes",
  "Tout est hébergé sur tes comptes et t'appartient",
  "Pause ou résiliation à tout moment",
];

export const subscriptionFaq = [
  {
    question: "Qu'est-ce qu'une équipe IA externalisée ?",
    answer:
      "C'est une équipe d'experts en IA et en automatisation qui travaille pour ton entreprise sans que tu aies à la recruter. Chez Fyliz, elle conçoit, déploie et maintient tes agents IA et tes workflows n8n, pour un abonnement mensuel fixe et sans engagement.",
  },
  {
    question: "Pourquoi externaliser son équipe IA plutôt que recruter ?",
    answer:
      "Recruter un profil IA expérimenté prend plusieurs mois et coûte souvent plus de 5 000 € chargés par mois, pour une seule personne et une seule expertise. Une équipe IA externalisée démarre en quelques jours, réunit plusieurs compétences (n8n, IA, développement) et s'adapte à tes besoins sans engagement.",
  },
  {
    question: "Comment fonctionnent les « demandes illimitées » ?",
    answer:
      "Tu ajoutes autant de demandes que tu veux à ton tableau. On les traite par ordre de priorité, et les gros projets sont découpés en livrables plus petits pour que tu voies des résultats en continu.",
  },
  {
    question: "En combien de temps une automatisation est-elle livrée ?",
    answer:
      "Ça dépend de sa complexité. Une automatisation simple est livrée en quelques jours, un agent IA plus ambitieux est livré par étapes. Pour chaque demande, on te donne une estimation avant de commencer.",
  },
  {
    question: "Est-ce que ça marche avec mes outils actuels ?",
    answer:
      "Oui. On travaille avec la plupart des CRM, ERP, outils de compta, de support et de marketing. Si ton outil a une API, on peut le connecter.",
  },
  {
    question: "Je n'y connais rien en IA, est-ce que c'est pour moi ?",
    answer:
      "Oui, c'est même fait pour ça. Tu nous décris le problème, on s'occupe de la technique, puis on forme tes équipes pour qu'elles utilisent les automatisations au quotidien.",
  },
  {
    question: "Pourquoi un abonnement plutôt qu'un projet ?",
    answer:
      "Une automatisation n'est jamais vraiment terminée : tes outils changent, tes besoins évoluent, de nouveaux modèles d'IA sortent. Avec l'abonnement, tu as une équipe qui connaît ta boîte, maintient l'existant et continue d'automatiser. Pour un besoin ponctuel et bien défini, on propose aussi des projets sur devis.",
  },
  {
    question: "À qui appartiennent les automatisations ?",
    answer:
      "À toi. Tout est hébergé sur tes comptes et documenté. Si tu arrêtes l'abonnement, tout ce qui a été livré reste en place et continue de fonctionner.",
  },
  {
    question: "Comment fonctionne la pause ?",
    answer:
      "Si tu as moins de besoins pendant un temps, tu mets ton abonnement en pause. Les jours non utilisés de ton mois en cours sont conservés et repris quand tu relances.",
  },
  {
    question: "Les coûts des outils et des API sont-ils inclus ?",
    answer:
      "Non. Les abonnements logiciels (n8n, CRM…) et la consommation des API d'IA restent à ta charge, sur tes propres comptes. On t'aide à choisir les options les plus économiques.",
  },
  {
    question: "Et si je veux arrêter ?",
    answer:
      "L'abonnement est sans engagement : tu peux le résilier quand tu veux, il s'arrête à la fin du mois en cours.",
  },
];
