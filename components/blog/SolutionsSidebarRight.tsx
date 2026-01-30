import PostsSidebarRight from "./PostsSidebarRight";

export default async function SolutionsSidebarRight({ articles = [] }) {
  return (
    <PostsSidebarRight
      articles={articles}
      basePath="" // Not used when useExternalLinks is true
      defaultCategory="Article"
      linkText="Voir l'automatisation"
      useExternalLinks={true}
      title="Nos meilleures solutions"
    />
  );
}
