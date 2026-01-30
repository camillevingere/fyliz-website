import PostsSidebarRight from "../blog/PostsSidebarRight";

export default async function WorkflowSidebarRight({
  workflows = [],
}: {
  workflows?: any[];
}) {
  return (
    <PostsSidebarRight
      articles={workflows}
      basePath="/automatisations-n8n"
      defaultCategory="Workflow"
      categoryBasePath="/automatisations-n8n/category"
      linkText="Lire plus"
      title="Nos meilleures automatisations"
    />
  );
}
