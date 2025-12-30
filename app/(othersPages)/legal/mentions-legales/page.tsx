
import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import Breadcumb from "@/components/otherPages/Breadcumb";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata = {
  title: "Mentions Légales || Fyliz - Agence d'automatisation",
  description:
    "Fyliz - Agence d'automatisation. Consultez nos mentions légales : informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
};

const markdown = `Mis à jour le 30/12/2025

# FYLIZ

Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (L.C.E.N.), il est porté à la connaissance des utilisateurs et visiteurs du site FYLIZ les présentes mentions légales.

Le site FYLIZ est accessible à l’adresse suivante : https://fyliz.com (ci-après le « Site »).
L’accès, la navigation et l’utilisation du Site impliquent l’acceptation pleine et entière des présentes mentions légales ainsi que des lois et règlements en vigueur.

## ARTICLE 1 – INFORMATIONS LÉGALES

### A. Éditeur du site

Le site FYLIZ est édité par :

**FYLIZ**
Société de droit français
Siège social : 200 rue de la Croix Nivert, 75015 Paris
SIRET : 991 869 629 00014
Numéro de TVA intracommunautaire : FR39991869629
Capital social : 1 000 €

Adresse e-mail : contact@fyliz.com

Ci-après désignée « l’Éditeur ».

### B. Directeur de la publication

Le Directeur de la publication est :

**Camille Vingere**

Adresse e-mail de contact : contact@fyliz.com

Ci-après désigné « le Directeur de publication ».

### C. Hébergeur du site

Le site FYLIZ est hébergé par :

**HOSTINGER INTERNATIONAL LTD**
Siège social : 61 Lordou Vironos Street,
6023 Larnaca, Chypre

Site web : https://hostinger.fr

Ci-après désigné « l’Hébergeur ».

### D. Utilisateurs

Sont considérés comme utilisateurs tous les internautes naviguant, consultant, lisant ou utilisant le Site FYLIZ.

Ci-après désignés « les Utilisateurs ».

## ARTICLE 2 – ACCESSIBILITÉ DU SITE

Le Site est accessible en principe vingt-quatre (24) heures sur vingt-quatre (24) et sept (7) jours sur sept (7), sauf interruption, programmée ou non, notamment pour des besoins de maintenance, de mise à jour, de sécurité ou en cas de force majeure.

L’Éditeur ne saurait être tenu responsable de tout dommage, quelle qu’en soit la nature, résultant d’une indisponibilité temporaire ou permanente du Site.

## ARTICLE 3 – RESPONSABILITÉ

L’Éditeur s’efforce de fournir sur le Site FYLIZ des informations aussi précises et à jour que possible. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour des informations, qu’elles soient de son fait ou du fait de tiers partenaires.

L’Utilisateur reconnaît utiliser les informations et contenus du Site sous sa responsabilité exclusive.

L’Éditeur ne pourra être tenu responsable de dommages directs ou indirects résultant de l’accès ou de l’utilisation du Site, y compris l’inaccessibilité, les pertes de données, les détériorations ou la présence de virus.

## ARTICLE 4 – PROPRIÉTÉ INTELLECTUELLE

Le Site FYLIZ et l’ensemble de ses contenus (textes, images, graphismes, logos, icônes, vidéos, sons, logiciels, structure, bases de données, etc.) sont protégés par les dispositions du Code de la propriété intellectuelle et demeurent la propriété exclusive de l’Éditeur ou de ses partenaires.

Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, de tout élément du Site, par quelque procédé que ce soit, est interdite sans l’autorisation écrite préalable de l’Éditeur.

Toute utilisation non autorisée du Site ou de l’un quelconque de ses éléments pourra faire l’objet de poursuites judiciaires.

## ARTICLE 5 – DONNÉES PERSONNELLES

Le traitement des données personnelles collectées via le Site FYLIZ est effectué conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

Les Utilisateurs disposent d’un droit d’accès, de rectification, d’opposition, de limitation et de suppression des données les concernant.

Ces droits peuvent être exercés à tout moment en adressant une demande à l’adresse suivante : contact@fyliz.com.

## ARTICLE 6 – LIENS HYPERTEXTES

Le Site FYLIZ peut contenir des liens hypertextes vers d’autres sites. L’Éditeur ne dispose d’aucun moyen de contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.

## ARTICLE 7 – LOI APPLICABLE ET JURIDICTION

Les présentes mentions légales sont régies par le droit français.

En cas de litige et à défaut de résolution amiable, les tribunaux français seront seuls compétents conformément aux règles de compétence en vigueur.

## ARTICLE 8 – CONTACT

Pour toute question, signalement de contenu illicite ou demande d’information concernant le Site, l’Utilisateur peut contacter l’Éditeur :

- par e-mail : contact@fyliz.com
- ou par courrier à l’adresse du siège social indiquée ci-dessus.

Le site FYLIZ vous souhaite une excellente navigation.



`;

export default function ConditionsGeneralesDeVentePage() {
  return (
    <>
      <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
        <Header8 />
        <div id="wrapper" className="wrap">
          <Breadcumb />
          <div className="section py-4 lg:py-6 xl:py-8">
            <div className="container max-w-lg">
              <div className="page-wrap panel vstack gap-4 lg:gap-6 xl:gap-8">
                <header className="page-header panel vstack justify-center gap-2 lg:gap-4 text-center">
                  <div className="panel">
                    <h1 className="h3 lg:h1 m-0">Mentions Légales</h1>
                  </div>
                </header>
              </div>
            </div>
          </div>
          <div className="pb-10 container max-w-lg prose prose-xl dark:prose-invert lg:max-w-[800px] max-w-[350px] prose-lg lg:prose-2xl prose-headings:mb-6 prose-headings:mt-8 prose-p:mb-6 prose-p:text-lg lg:prose-p:text-xl prose-p:leading-relaxed prose-p:font-thin prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-3 prose-blockquote:text-xl prose-blockquote:my-8">
            <MDXRemote source={markdown} />
          </div>
        </div>
        <Footer8 />
      </div>
    </>
  );
}
