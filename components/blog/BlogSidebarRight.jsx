import PostsSidebarRight from "./PostsSidebarRight";

export default async function BlogSidebarRight({ articles = [] }) {
  return (
    <PostsSidebarRight
      articles={articles}
      basePath="/blog"
      defaultCategory="Article"
      categoryBasePath="/category"
      linkText="Lire plus"
      title="Articles à la une"
    />
  );
}
