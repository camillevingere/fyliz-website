"use client";

import SearchBar from "@/components/workflows/SearchBar";
import WorkflowSidebarRightClient from "@/components/workflows/WorkflowSidebarRightClient";
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
      <div className="container">
        <div className="py-4 lg:py-6 xl:py-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>
      <WorkflowSidebarRightClient
        workflows={filteredWorkflows}
        allWorkflows={workflows}
      />
    </>
  );
}
