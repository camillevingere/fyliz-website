"use client";

import PostCards from "@/components/site/PostCards";
import s from "@/components/site/site.module.scss";
import { useMemo, useState } from "react";

interface Workflow {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  image?: string | null;
  tags?: string[];
  publishedAt: string;
}

interface AutomatisationsN8nClientProps {
  workflows: Workflow[];
}

export default function AutomatisationsN8nClient({
  workflows,
}: AutomatisationsN8nClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkflows = useMemo(() => {
    if (!searchQuery.trim()) {
      return workflows;
    }

    const query = searchQuery.toLowerCase().trim();
    return workflows.filter((workflow) => {
      const titleMatch = workflow.title.toLowerCase().includes(query);
      const descriptionMatch = workflow.description
        ?.toLowerCase()
        .includes(query);
      const tagsMatch = workflow.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      return titleMatch || descriptionMatch || tagsMatch;
    });
  }, [workflows, searchQuery]);

  return (
    <>
      <div className={s.search}>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Rechercher un workflow (CRM, Gmail, agent IA…)"
          aria-label="Rechercher un workflow n8n"
        />
      </div>
      {filteredWorkflows.length === 0 ? (
        <p className={s.empty}>Aucun workflow ne correspond à « {searchQuery} ».</p>
      ) : (
        <PostCards
          posts={filteredWorkflows.map((workflow) => ({
            key: workflow.slug || workflow.id || workflow.title,
            href: `/automatisations-n8n/${workflow.slug || workflow.id}`,
            image: workflow.image || "/images/default-blog.webp",
            title: workflow.title,
            category: workflow.tags?.[0] || "Workflow n8n",
            excerpt: workflow.description,
          }))}
        />
      )}
    </>
  );
}
