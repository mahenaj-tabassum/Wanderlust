import Link from "next/link";
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

const BookingCard = ({ booking, cancelling, onCancel }: BookingCardProps) => {
  const daysLeft = getDaysLeft(booking.departureDate);
  const isUpcoming = daysLeft >= 0;
  const isSoon = isUpcoming && daysLeft <= 14;

  console.log(booking);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex-row">
      {/* Photo */}
      <div className="relative h-48 shrink-0 sm:h-auto sm:w-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={booking.destinationImage}
          alt={booking.destinationName}
          className={`h-full w-full object-cover ${isUpcoming ? "" : "grayscale"}`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700">
          {booking.category}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isUpcoming
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isUpcoming ? "Confirmed" : "Completed"}
            </span>
            <span
              className={`text-xs font-medium ${
                isSoon ? "text-amber-600" : "text-slate-500"
              }`}
            >
              {getCountdownLabel(daysLeft)}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
            {booking.destinationName}
          </h3>
          <p className="text-sm text-slate-500">{booking.country}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Departure</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {formatDate(booking.departureDate)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Duration</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {booking.duration}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Booked on</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {formatDate(booking.bookingDate)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Ticket stub */}
      <div className="flex flex-row items-center justify-between gap-4 border-t border-dashed border-slate-300 bg-slate-50 p-6 sm:w-52 sm:flex-col sm:items-stretch sm:border-l sm:border-t-0">
        <div>
          <p className="text-xs text-slate-500">Booking ref</p>
          <p className="font-mono text-sm font-semibold text-slate-900">
            {getReference(booking._id)}
          </p>

          <p className="mt-4 text-xs text-slate-500">Total paid</p>
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            ${booking.price.toLocaleString("en-US")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/destinations/${booking.destinationId}`}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            View trip
          </Link>
          {isUpcoming && (
            <>
              <button
                type="button"
                onClick={() => onCancel(booking)}
                disabled={cancelling}
                className="rounded-xl cursor-pointer border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Cancel booking"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookingCard;
