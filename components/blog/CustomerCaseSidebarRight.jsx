import PostsSidebarRight from "./PostsSidebarRight";

export default async function CustomerCaseSidebarRight({ articles = [] }) {
  return (
    <PostsSidebarRight
      articles={articles}
      basePath="/cas-clients"
      defaultCategory="Article"
      categoryBasePath="/cas-clients/category"
      linkText="Lire plus"
      title="Nos meilleurs clients"
    />
  );
}
