import { PUBLIC_MEDIA_PREFIXES } from "@/lib/image-utils";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

// Sert les images du bucket privé sous une URL stable du site (indexable, mise en cache),
// à la place des URLs pré-signées qui changent à chaque rendu et expirent après 7 jours.
export async function GET(_req: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const key = (await params).key.join("/");
  // Re-découpe la clé : un segment encodé (« ..%2F ») peut contenir des « / » une fois décodé.
  const parts = key.split("/");

  if (
    !PUBLIC_MEDIA_PREFIXES.includes(parts[0]) ||
    parts.length < 2 ||
    parts.some((part) => part === ".." || part === "") ||
    !/^[\w./-]+$/.test(key)
  ) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const object = await s3Client.send(
      new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: key }),
    );
    if (!object.Body || !object.ContentType?.startsWith("image/")) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(object.Body.transformToWebStream(), {
      headers: {
        "Content-Type": object.ContentType,
        ...(object.ContentLength ? { "Content-Length": String(object.ContentLength) } : {}),
        // Chaque clé contient un identifiant unique : son contenu ne change jamais.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if ((error as { name?: string }).name === "NoSuchKey") {
      return new Response("Not found", { status: 404 });
    }
    console.error("Erreur de lecture du média :", key, error);
    return new Response("Erreur", { status: 502 });
  }
}
