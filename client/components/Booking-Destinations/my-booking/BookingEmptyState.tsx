import Link from "next/link";
import { Compass, History, Plane } from "lucide-react";
import type { Tab } from "./types";

interface BookingEmptyStateProps {
  tab: Tab;
}

const copy = {
  upcoming: {
    icon: Plane,
    title: "No upcoming trips",
    text: "You haven't booked anything yet. Find a place you love and start planning!",
  },
  past: {
    icon: History,
    title: "No past trips yet",
    text: "Your completed trips will show up here after you travel.",
  },
} as const;

const BookingEmptyState = ({ tab }: BookingEmptyStateProps) => {
  const { icon: Icon, title, text } = copy[tab];

  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border-2 border-dashed border-cyan-200 bg-white px-6 py-16 text-center">
      <span className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-cyan-100/70 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-10 -right-10 size-40 rounded-full bg-orange-100/80 blur-2xl" />

      <span className="relative mb-5 flex size-20 rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-xl shadow-cyan-300/60">
        <Icon className="size-9" />
      </span>

      <h3 className="relative text-xl font-extrabold text-slate-900">
        {title}
      </h3>
      <p className="relative mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500">
        {text}
      </p>

      {tab === "upcoming" && (
        <Link
          href="/destinations"
          className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          <Compass className="size-4" />
          Explore destinations
        </Link>
      )}
    </div>
  );
};

export default BookingEmptyState;
