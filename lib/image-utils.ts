import { absoluteUrl } from "./utils";

// Dossiers du bucket que le site a le droit de servir (voir app/media/[...key]/route.ts).
export const PUBLIC_MEDIA_PREFIXES = ["blog", "cas-clients", "automatisations-n8n"];

// Une clé S3 n'est ni une URL, ni une data URI, ni un chemin du site (`/assets/...`).
const isBucketKey = (url: string) =>
  !url.startsWith("http") && !url.startsWith("data:") && !url.startsWith("/");

/**
 * URL publique et stable d'une image : les clés S3 passent par le proxy /media
 * du site (le bucket est privé), le reste est renvoyé tel quel.
 */
export function getPublicImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  return isBucketKey(imageUrl) ? absoluteUrl(`/media/${imageUrl}`) : imageUrl;
}

// Remplace les clés S3 des images d'un contenu markdown (syntaxe markdown et balises <img>).
export function toPublicImageUrls(markdown: string): string {
  return markdown
    .replace(
      /(!\[[^\]]*\]\()([^)\s]+)/g,
      (_, prefix: string, url: string) => prefix + getPublicImageUrl(url),
    )
    .replace(
      /(<img[^>]+src=["'])([^"']+)/g,
      (_, prefix: string, url: string) => prefix + getPublicImageUrl(url),
    );
}
