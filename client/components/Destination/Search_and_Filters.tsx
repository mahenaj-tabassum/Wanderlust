import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { categoryList, getCategoryMeta } from "./category-meta";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const Search_and_Filters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  className = "",
}: SearchAndFiltersProps) => {
  return (
    <div
      className={`relative z-30 mb-6 rounded-3xl bg-white/90 p-4 shadow-xl shadow-cyan-200/50 ring-1 ring-cyan-100 backdrop-blur-xl sm:p-5 ${className}`}
    >
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
          <Search className="size-4" />
        </span>

        <Input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search places, countries or categories..."
          aria-label="Search destinations"
          className="h-12 rounded-2xl border-0 bg-cyan-50/70 pl-14 pr-11 text-sm font-semibold text-slate-800 placeholder:font-medium placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-400"
        />

        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-200/70 text-slate-600 transition-colors hover:bg-orange-100 hover:text-orange-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {categoryList.map((category) => {
          const active = selectedCategory === category;
          const meta = category === "All" ? null : getCategoryMeta(category);

          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(category)}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                active
                  ? `${meta ? meta.chip : "bg-linear-to-r from-cyan-500 to-sky-500 text-white"} -translate-y-0.5 shadow-lg`
                  : "bg-white text-slate-600 ring-1 ring-cyan-100 hover:-translate-y-0.5 hover:bg-cyan-50 hover:text-cyan-700"
              }`}
            >
              <span aria-hidden="true">{meta ? meta.emoji : "🌍"}</span>
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Search_and_Filters;
