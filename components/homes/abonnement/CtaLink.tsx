"use client";
import posthog from "posthog-js";
import type { ReactNode } from "react";

export default function CtaLink({
  href,
  ctaName,
  className,
  children,
}: {
  href: string;
  ctaName: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        posthog.capture("cta_clicked", {
          cta_name: ctaName,
          page: window.location.pathname,
        });
      }}
    >
      {children}
    </a>
  );
}
