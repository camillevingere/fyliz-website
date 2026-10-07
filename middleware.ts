import { NextResponse } from "next/server";

// Fiches templates n8n retirées du site (contenu DIY sans trafic ni leads).
// Les données restent en base, mais les URLs répondent 410 pour sortir de l'index Google.
export function middleware() {
  return new NextResponse("Cette page a été retirée.", {
    status: 410,
    headers: {
      "X-Robots-Tag": "noindex",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = { matcher: ["/automatisations-n8n/:slug+"] };
