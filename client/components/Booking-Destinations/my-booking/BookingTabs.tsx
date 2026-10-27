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
    { key: "upcoming", label: "Upcoming", count: upcomingCount },
    { key: "past", label: "Past", count: pastCount },
  ] as const;

  return (
    <div
      role="tablist"
      aria-label="Booking filter"
      className="mt-6 inline-flex rounded-xl bg-slate-100 p-1"
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={tab === item.key}
          onClick={() => onChange(item.key)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
            tab === item.key
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {item.label} ({item.count})
        </button>
      ))}
    </div>
  );
};

export default BookingTabs;
