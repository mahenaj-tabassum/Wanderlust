import { CalendarClock, History } from "lucide-react";
import type { Tab } from "./types";

interface BookingTabsProps {
  tab: Tab;
  onChange: (tab: Tab) => void;
  upcomingCount: number;
  pastCount: number;
}

const BookingTabs = ({
  tab,
  onChange,
  upcomingCount,
  pastCount,
}: BookingTabsProps) => {
  const items = [
    {
      key: "upcoming",
      label: "Upcoming",
      count: upcomingCount,
      icon: CalendarClock,
    },
    { key: "past", label: "Past", count: pastCount, icon: History },
  ] as const;

  return (
    <div
      role="tablist"
      aria-label="Booking filter"
      className="relative z-10 -mt-6 inline-flex rounded-full bg-white p-1.5 shadow-xl shadow-cyan-200/60 ring-1 ring-cyan-100"
    >
      {items.map((item) => {
        const active = tab === item.key;
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              active
                ? "bg-linear-to-r from-cyan-500 to-sky-500 text-white shadow-md shadow-cyan-300/60"
                : "text-slate-500 hover:bg-cyan-50 hover:text-cyan-700"
            }`}
          >
            <Icon className="size-4" />
            {item.label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-extrabold ${
                active ? "bg-white/25 text-white" : "bg-cyan-100 text-cyan-700"
              }`}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BookingTabs;
