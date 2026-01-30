"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 lg:mb-6">
      <Input
        type="text"
        placeholder="Rechercher une automatisation..."
        value={searchQuery}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
}
