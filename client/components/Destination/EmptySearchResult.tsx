import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptySearchResultProps {
  onClear: () => void;
}

const EmptySearchResult = ({ onClear }: EmptySearchResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-50">
        <Search className="size-6 text-emerald-600" />
      </div>

      <h3 className="text-lg font-semibold">No destinations found</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Try searching for another place or choose a different category to
        discover more destinations.
      </p>

      <Button variant="outline" className="mt-5 rounded-xl" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
};

export default EmptySearchResult;
