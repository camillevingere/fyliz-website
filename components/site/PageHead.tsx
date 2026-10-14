import Link from "next/link";
import s from "./site.module.scss";

export type Crumb = { href?: string; label: string };

// Fil d'Ariane visible ; le JSON-LD BreadcrumbList reste porté par chaque page.
export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className={s.crumbs}>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
