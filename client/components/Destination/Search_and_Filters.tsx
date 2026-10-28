import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Beach",
  "Adventure",
  "Culture",
  "Luxury",
  "Romantic",
  "Nature",
];

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Search_and_Filters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchAndFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            All destinations
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find a place that matches your travel style.
          </p>
        </div>

        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search places or countries..."
            className="h-11 rounded-xl border-slate-200 bg-white pl-10 focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="mr-1 size-4 text-slate-500" />

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={
              selectedCategory === category
                ? "rounded-full bg-emerald-600 px-4 hover:bg-emerald-700"
                : "rounded-full border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-100"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Search_and_Filters;
