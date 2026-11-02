import type { ReactNode } from "react";

// Le clic est suivi par l'écouteur global de app/posthog-provider.tsx,
// qui lit le nom du CTA dans data-cta.
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
    <a href={href} className={className} data-cta={ctaName}>
      {children}
    </a>
  );
}
