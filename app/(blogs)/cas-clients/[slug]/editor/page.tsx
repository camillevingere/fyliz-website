import { BlogEditor } from "@/components/blog-editor";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface EditorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticleBySlug(slug: string, type = "articles") {
  // Try to get by UUID first (if slug is actually an ID)
  const { data: articleById } = await supabase
    .from(type)
    .select("*")
    .eq("id", slug)
    .single();

  if (articleById) {
    return articleById;
  }

  // If not found by ID, try to find by generated slug from title
  const { data: articles } = await supabase.from(type).select("*");

  if (!articles) {
    return null;
  }

  // Generate slug from title and match
  const article = articles.find((article) => {
    const generatedSlug = article.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    return generatedSlug === slug;
  });

  return article || null;
}

export default async function EditorPage({ params }: EditorPageProps) {
  if (process.env.ENABLE_MDX_EDITOR !== "1") {
    return notFound();
  }
  const { slug } = await params;
  const article = await getArticleBySlug(slug, "customer_cases");

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
            type="customer_cases"
          />
        </div>
      </div>
    </div>
  );
}
