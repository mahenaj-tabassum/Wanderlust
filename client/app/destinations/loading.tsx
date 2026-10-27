import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading destination content"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4"
    >
      {/* WL Logo with spinning ring */}
      <div className="relative flex size-32 items-center justify-center">
        {/* Background ring */}
        <div className="absolute inset-0 rounded-full border-[5px] border-emerald-100" />

        {/* Animated ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-[5px] border-transparent border-t-emerald-600 border-r-emerald-600" />

        {/* WL Logo */}
        <div className="relative flex size-20 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-extrabold tracking-tight">
              WL
            </span>
            <Compass className="mt-1 size-4" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-8 text-sm font-medium tracking-[0.2em] text-slate-500">
        LOADING
        <span className="animate-pulse text-emerald-600">...</span>
      </p>

      <p className="mt-2 text-xs text-slate-400">
        Preparing your next adventure
      </p>

      <span className="sr-only">Please wait while the page loads.</span>
    </div>
  );
}