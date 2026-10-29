import { RotateCcw, SearchX } from "lucide-react";

interface EmptySearchResultProps {
  onClear: () => void;
}

const EmptySearchResult = ({ onClear }: EmptySearchResultProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-cyan-200 bg-white px-6 py-16 text-center">
      <span className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-cyan-100/70 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-10 -right-10 size-40 rounded-full bg-orange-100/80 blur-2xl" />

      <div className="relative mb-5 flex size-20 rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-xl shadow-cyan-300/60">
        <SearchX className="size-9" />
      </div>

      <h3 className="relative text-xl font-extrabold text-slate-900">
        No destinations found
      </h3>

      <p className="relative mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500">
        Try searching for another place or choose a different category to
        discover more destinations.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="relative mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105"
      >
        <RotateCcw className="size-4" />
        Clear filters
      </button>
    </div>
  );
};

export default EmptySearchResult;
