import Link from "next/link";
import { Plus, RotateCcw } from "lucide-react";

interface NoDestinationsProps {
  onRefresh?: () => void;
  className?: string;
}

// Shown when the all-destinations API returns no data at all
// (not the same as "no results" after searching or filtering).
const NoDestinations = ({ onRefresh, className = "" }: NoDestinationsProps) => {
  return (
    <div
      className={`relative z-30 overflow-hidden rounded-3xl bg-white px-6 py-14 text-center shadow-xl shadow-cyan-200/50 ring-1 ring-cyan-100 sm:py-20 ${className}`}
    >
      {/* Background glow */}
      <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-cyan-100/80 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-16 -right-16 size-64 rounded-full bg-orange-100/90 blur-3xl" />

      {/* Illustration */}
      <svg
        viewBox="0 0 320 220"
        className="relative mx-auto w-64 sm:w-80"
        role="img"
        aria-label="An empty suitcase, a hot air balloon and a dotted path leading to a mystery pin"
      >
        <ellipse
          cx="160"
          cy="125"
          rx="150"
          ry="88"
          fill="#cffafe"
          opacity=".55"
        />

        {/* sun */}
        <circle cx="268" cy="46" r="34" fill="#fde68a" opacity=".5" />
        <circle cx="268" cy="46" r="22" fill="#fbbf24" />

        {/* clouds */}
        <g fill="#fff">
          <ellipse cx="62" cy="48" rx="26" ry="9" />
          <ellipse cx="50" cy="42" rx="13" ry="9" />
          <ellipse cx="74" cy="41" rx="12" ry="8" />
          <ellipse cx="214" cy="92" rx="20" ry="7" opacity=".9" />
          <ellipse cx="206" cy="87" rx="10" ry="7" opacity=".9" />
        </g>

        {/* dotted path */}
        <path
          d="M72 192 C118 214 124 128 176 146 S248 120 276 98"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="1 9"
        />

        {/* hot-air balloon */}
        <g transform="translate(128 58)">
          <path
            d="M-14 30 L-6 50 M14 30 L6 50"
            stroke="#92400e"
            strokeWidth="1.6"
          />
          <ellipse cx="0" cy="0" rx="27" ry="32" fill="#fb7185" />
          <ellipse cx="0" cy="0" rx="16" ry="32" fill="#fcd34d" />
          <ellipse cx="0" cy="0" rx="6" ry="32" fill="#fff" />
          <rect x="-8" y="49" width="16" height="11" rx="2.5" fill="#92400e" />
        </g>

        {/* empty suitcase */}
        <g transform="translate(26 164)">
          <path
            d="M18 8 V3 a4 4 0 0 1 4 -4 h14 a4 4 0 0 1 4 4 V8"
            fill="none"
            stroke="#92400e"
            strokeWidth="3.5"
          />
          <rect x="0" y="8" width="58" height="40" rx="9" fill="#f97316" />
          <rect
            x="11"
            y="8"
            width="5"
            height="40"
            fill="#c2410c"
            opacity=".55"
          />
          <rect
            x="42"
            y="8"
            width="5"
            height="40"
            fill="#c2410c"
            opacity=".55"
          />
          <rect x="24" y="24" width="10" height="7" rx="2" fill="#fde68a" />
        </g>

        {/* mystery pin */}
        <g transform="translate(276 98)">
          <ellipse
            cx="0"
            cy="3"
            rx="11"
            ry="3.5"
            fill="#0e7490"
            opacity=".25"
          />
          <path d="M-11 -26 L0 0 L11 -26Z" fill="#ff6b4a" />
          <circle
            cx="0"
            cy="-34"
            r="17"
            fill="#ff6b4a"
            stroke="#fff"
            strokeWidth="3"
          />
          <text
            x="0"
            y="-27.5"
            textAnchor="middle"
            fontSize="20"
            fontWeight="800"
            fill="#fff"
          >
            ?
          </text>
        </g>

        {/* sparkles */}
        <g fill="#fff">
          <path
            transform="translate(190 30)"
            d="M0 -7 Q1 -1 7 0 Q1 1 0 7 Q-1 1 -7 0 Q-1 -1 0 -7Z"
          />
          <path
            transform="translate(30 110)"
            d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z"
          />
        </g>
      </svg>

      <h3 className="relative mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        No destinations{" "}
        <span className="bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
          yet
        </span>
      </h3>

      <p className="relative mx-auto mt-3 max-w-md text-sm font-medium leading-6 text-slate-500 sm:text-base">
        No trips have been added so far. Be the first to add a destination, or
        check back soon for new adventures.
      </p>

      <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/addPackage"
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105"
        >
          <Plus className="size-5 transition-transform group-hover:rotate-90" />
          Add a destination
        </Link>

        {onRefresh ? (
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
          >
            <RotateCcw className="size-4" />
            Refresh
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
};

export default NoDestinations;
