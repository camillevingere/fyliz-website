import NotFoundView from "@/components/site/NotFoundView";

export const metadata = {
  title: "Page introuvable",
  description: "Fyliz, agence d'automatisation IA. La page que tu cherches est introuvable.",
  robots: { index: false },
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
