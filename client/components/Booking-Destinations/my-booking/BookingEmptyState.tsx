import Link from "next/link";
import type { Tab } from "./types";

interface BookingEmptyStateProps {
  tab: Tab;
}

const BookingEmptyState = ({ tab }: BookingEmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
    <h3 className="text-lg font-semibold text-slate-900">
      {tab === "upcoming" ? "No upcoming trips" : "No past trips yet"}
    </h3>
    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
      {tab === "upcoming"
        ? "Pick a destination and book your first trip. It will show up here."
        : "Trips you have taken will appear here after their departure date."}
    </p>
    {tab === "upcoming" && (
      <Link
        href="/destinations"
        className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        Browse destinations
      </Link>
    )}
  </div>
);

export default BookingEmptyState;
