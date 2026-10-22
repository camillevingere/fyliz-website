export type PostFaqItem = { question: string; answer: string };

/** Google tronque les réponses longues ; au-delà, le passage n'est plus une réponse. */
const ANSWER_MAX = 900;

const decodeEntities = (html: string) =>
  html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)));

// Figures, blocs de code et encarts (CTA) retirés : ce n'est pas la réponse.
const toPlainText = (html: string) =>
  decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
      .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
      .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
      .replace(/<\/(p|li|h[1-6]|tr|blockquote)>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

/** Coupe sur une fin de phrase plutôt qu'au milieu d'un mot. */
const trimAnswer = (text: string) => {
  if (text.length <= ANSWER_MAX) return text;

  const cut = text.slice(0, ANSWER_MAX);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" ? "), cut.lastIndexOf(" ! "));

  return lastStop > ANSWER_MAX / 3
    ? cut.slice(0, lastStop + 1).trim()
    : `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
};

/**
 * La FAQ d'un article, lue dans son HTML rendu : un `FAQPage` qui décrit un
 * contenu absent de la page viole les consignes Google. Tout `h2`/`h3` formulé
 * en question est une question, et ce qui le suit jusqu'au titre suivant est
 * sa réponse. Un article sans question ne produit aucun bloc.
 */
export function extractPostFaq(html: string | null | undefined): PostFaqItem[] {
  if (!html) return [];

  const items: PostFaqItem[] = [];
  const seen = new Set<string>();
  const pattern = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[1-3]\b|$)/gi;

  for (const match of html.matchAll(pattern)) {
    const question = toPlainText(match[2] ?? "");
    if (!question.endsWith("?")) continue;

    const answer = trimAnswer(toPlainText(match[3] ?? ""));
    if (!answer) continue;

    const key = question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    items.push({ question, answer });
  }

  return items;
}
