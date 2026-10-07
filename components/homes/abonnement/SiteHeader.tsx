"use client";
import { navLinks } from "@/data/subscription";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CtaLink from "./CtaLink";
import { Close, Menu } from "./icons";
import s from "./landing.module.scss";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${s.header} ${scrolled || open ? s.headerScrolled : ""}`}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Link href="/" className={s.logo} aria-label="Fyliz, accueil">
          <Image src="/assets/images/logo.webp" alt="" width={72} height={72} priority />
          Fyliz
        </Link>

        <nav className={s.nav} aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={s.headerActions}>
          <CtaLink
            href={siteConfig.cta.buttonLink}
            ctaName="header_appel_decouverte"
            className={`${s.btnDark} ${s.btnSmall} ${s.headerCta}`}
          >
            Réserver un appel
          </CtaLink>
          <button
            type="button"
            className={s.menuButton}
            aria-expanded={open}
            aria-controls="landing-mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="landing-mobile-menu" className={s.mobileMenu} aria-label="Navigation mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <CtaLink
            href={siteConfig.cta.buttonLink}
            ctaName="menu_mobile_appel_decouverte"
            className={s.btnPrimary}
          >
            Réserver un appel découverte
          </CtaLink>
        </nav>
      )}
    </header>
  );
}
