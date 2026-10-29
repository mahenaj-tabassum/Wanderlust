import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  Clock,
  Compass,
  Loader2,
  MapPin,
  Zap,
} from "lucide-react";
import { getCategoryMeta } from "@/components/Destination/category-meta";
import type { Booking } from "./types";
import {
  formatDate,
  getCountdownLabel,
  getDaysLeft,
  getReference,
} from "./utils";

interface BookingCardProps {
  booking: Booking;
  cancelling: boolean;
  onCancel: (booking: Booking) => void;
}

const RING_RADIUS = 26;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const toTime = (value: string) =>
  new Date(value.includes("T") ? value : `${value}T00:00:00`).getTime();

const BookingCard = ({ booking, cancelling, onCancel }: BookingCardProps) => {
  const daysLeft = getDaysLeft(booking.departureDate);
  const isUpcoming = daysLeft >= 0;
  const isSoon = isUpcoming && daysLeft <= 14;
  const meta = getCategoryMeta(booking.category);

  // Countdown ring: how much of the waiting time (booking day -> departure) has passed
  const bookedAt = toTime(booking.bookingDate);
  const departsAt = toTime(booking.departureDate);
  const raw =
    departsAt > bookedAt ? (Date.now() - bookedAt) / (departsAt - bookedAt) : 1;
  const progress = isUpcoming
    ? Math.min(1, Math.max(0, Number.isNaN(raw) ? 0 : raw))
    : 1;

  const facts = [
    {
      icon: CalendarDays,
      value: formatDate(booking.departureDate),
      title: "Departure",
      tone: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: Clock,
      value: booking.duration,
      title: "Duration",
      tone: "bg-orange-100 text-orange-500",
    },
    {
      icon: CalendarCheck,
      value: `Booked ${formatDate(booking.bookingDate)}`,
      title: "Booked on",
      tone: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-200/70 sm:min-h-56 sm:flex-row">
      {/* Gradient accent on the left edge */}
      <span className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-1.5 bg-linear-to-b from-cyan-400 via-amber-300 to-orange-400 sm:block" />

      {/* ---------- Left: information ---------- */}
      <div className="relative order-2 flex flex-1 flex-col justify-between gap-4 p-5 sm:order-1 sm:py-5 sm:pl-7 sm:pr-12">
        <Compass className="pointer-events-none absolute -bottom-6 left-1/3 size-28 text-cyan-100/60" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isUpcoming
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              <CircleCheck className="size-3.5" />
              {isUpcoming ? "Confirmed" : "Completed"}
            </span>
            {isSoon && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-600">
                <Zap className="size-3.5" />
                Coming up soon
              </span>
            )}
          </div>

          <h3 className="mt-2.5 line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {booking.destinationName}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
            <MapPin className="size-4 text-orange-500" />
            {booking.country}
          </p>
        </div>

        {/* Fact chips */}
        <ul className="relative flex flex-wrap gap-2">
          {facts.map(({ icon: Icon, value, title, tone }) => (
            <li
              key={title}
              title={title}
              className="flex items-center gap-1.5 rounded-full bg-cyan-50/70 py-1 pl-1 pr-3 text-xs font-bold text-slate-700 ring-1 ring-cyan-100"
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full ${tone}`}
              >
                <Icon className="size-3.5" />
              </span>
              {value}
            </li>
          ))}
        </ul>

        {/* Footer: price + actions */}
        <div className="relative flex flex-wrap items-end justify-between gap-3 border-t-2 border-dashed border-cyan-100 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Paid &middot;{" "}
              <span className="font-mono text-slate-500">
                {getReference(booking._id)}
              </span>
            </p>
            <p className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-2xl font-extrabold leading-tight tracking-tight text-transparent">
              ${booking.price.toLocaleString("en-US")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isUpcoming && (
              <button
                type="button"
                onClick={() => onCancel(booking)}
                disabled={cancelling}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-rose-600 ring-1 ring-rose-200 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelling && <Loader2 className="size-3.5 animate-spin" />}
                {cancelling ? "Cancelling..." : "Cancel"}
              </button>
            )}

            <Link
              href={`/destinations/${booking.destinationId}`}
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              View trip
              <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Right: image ---------- */}
      <div className="relative order-1 h-40 shrink-0 sm:order-2 sm:-ml-8 sm:h-auto sm:w-60">
        {/* Slanted photo */}
        <div className="absolute inset-0 overflow-hidden sm:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
          <Image
            src={booking.destinationImage}
            alt={booking.destinationName}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isUpcoming ? "" : "grayscale"}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
        </div>

        {booking.category && (
          <span
            className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md ${meta.chip}`}
          >
            <span aria-hidden="true">{meta.emoji}</span>
            {booking.category}
          </span>
        )}

        {/* Countdown ring */}
        <div
          className="absolute bottom-3 right-3 size-16 rounded-full bg-white shadow-lg shadow-cyan-200/80 ring-1 ring-cyan-100 sm:bottom-auto sm:left-[7%] sm:right-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
          role="img"
          aria-label={getCountdownLabel(daysLeft)}
        >
          <svg
            viewBox="0 0 64 64"
            className="absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="32"
              cy="32"
              r={RING_RADIUS}
              fill="none"
              stroke="#cffafe"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r={RING_RADIUS}
              fill="none"
              stroke={isUpcoming ? (isSoon ? "#f97316" : "#06b6d4") : "#94a3b8"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            {!isUpcoming ? (
              <CircleCheck className="size-6 text-slate-400" />
            ) : daysLeft === 0 ? (
              <span className="text-[11px] font-extrabold uppercase text-orange-600">
                Today
              </span>
            ) : (
              <>
                <span className="text-lg font-extrabold text-slate-900">
                  {daysLeft}
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  {daysLeft === 1 ? "day" : "days"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookingCard;
