import { BlogEditor } from "@/components/blog-editor";
import { getArticleForEditor } from "@/lib/blog";
import { notFound } from "next/navigation";

interface EditorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  if (process.env.ENABLE_MDX_EDITOR !== "1") {
    return notFound();
  }
  const { slug } = await params;
  const article = await getArticleForEditor(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Éditeur d&apos;article
          </h1>
          <h2 className="text-xl text-gray-600">{article.title}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <BlogEditor
            articleId={article.id}
            markdown={article.content || ""}
            title={article.title}
            description={article.description || ""}
            status={article.status}
            publishedAt={article.published_at}
            author={article.author || ""}
            tags={article.tags || []}
            keywords={article.keywords || []}
            currentImage={article.image}
          />
        </div>
      </div>
    </div>
  );
}
