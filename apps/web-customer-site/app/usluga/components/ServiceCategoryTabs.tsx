"use client";

import { ChevronDown } from "lucide-react";
import type { ServiceCategory } from "../mockData";

interface ServiceCategoryTabsProps {
  categories: ServiceCategory[];
  activeId?: string;
}

export function ServiceCategoryTabs({
  categories,
  activeId,
}: ServiceCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category.name}
            {category.hasDropdown && (
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            )}
          </button>
        );
      })}
    </div>
  );
}
