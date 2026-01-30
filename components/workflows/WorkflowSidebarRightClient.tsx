"use client";

import PostsSidebarRightClient from "@/components/blog/PostsSidebarRightClient";

interface Workflow {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  image?: string | null;
  tags?: string[];
  publishedAt?: string;
}

interface WorkflowSidebarRightClientProps {
  workflows?: Workflow[];
  allWorkflows?: Workflow[]; // All workflows for sidebar (unfiltered)
}

export default function WorkflowSidebarRightClient({
  workflows = [],
  allWorkflows,
}: WorkflowSidebarRightClientProps) {
  return (
    <PostsSidebarRightClient
      articles={workflows}
      sidebarArticles={allWorkflows || workflows}
      basePath="/automatisations-n8n"
      defaultCategory="Workflow"
      categoryBasePath="/automatisations-n8n/category"
      linkText="Lire plus"
      title="Nos meilleures automatisations"
    />
  );
}
