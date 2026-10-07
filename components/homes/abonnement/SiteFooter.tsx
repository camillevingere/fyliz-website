import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import s from "./landing.module.scss";

const columns = [
  {
    title: "Offre",
    links: [
      { href: "#methode", label: "Méthode" },
      { href: "#tarif", label: "Tarif" },
      { href: "#faq", label: "FAQ" },
      { href: siteConfig.cta.buttonLink, label: "Réserver un appel" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/solutions-automatisation-ia", label: "Solutions" },
      { href: "/cas-clients", label: "Cas clients" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/legal/mentions-legales", label: "Mentions légales" },
      { href: "/legal/politique-de-confidentialite", label: "Confidentialité" },
      { href: "/legal/conditions-generales-de-vente", label: "CGV" },
    ],
  },
];

export default function SiteFooter() {
  const social = siteConfig.footer.find((section) => section.title === "Social")?.links ?? [];

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerGrid}>
          <div>
            <Link href="/" className={s.logo}>
              <Image src="/assets/images/logo.webp" alt="" width={72} height={72} />
              Fyliz
            </Link>
            <p>
              Ton équipe IA externalisée. Agents IA et workflows n8n sur mesure,
              pour les entreprises françaises.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className={`${s.eyebrow} ${s.footerTitle}`}>{column.title}</p>
              <ul className={s.footerLinks}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {siteConfig.company.name} · {siteConfig.company.address}
          </span>
          <ul className={s.footerLinks} style={{ flexDirection: "row", gap: 20 }}>
            {social.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${siteConfig.links.email}`}>{siteConfig.links.email}</a>
            </li>
          </ul>
        </div>

        <div className={s.footerWordmark} aria-hidden>
          fyliz
        </div>
      </div>
    </footer>
  );
}
