"use client";

import { useState } from "react";
import { Plane, Ticket } from "lucide-react";
import BookingCard from "./my-booking/BookingCard";
import BookingEmptyState from "./my-booking/BookingEmptyState";
import BookingError from "./my-booking/BookingError";
import BookingSkeleton from "./my-booking/BookingSkeleton";
import BookingTabs from "./my-booking/BookingTabs";
import LoginPrompt from "./my-booking/LoginPrompt";
import type { Tab } from "./my-booking/types";
import { useMyBookings } from "./my-booking/useMyBookings";

const MyBookingComponent = () => {
  const {
    user,
    isPending,
    bookings,
    upcoming,
    past,
    loading,
    error,
    cancellingId,
    refetch,
    cancelBooking,
  } = useMyBookings();

  const [tab, setTab] = useState<Tab>("upcoming");
  const visible = tab === "upcoming" ? upcoming : past;

  if (!isPending && !user) return <LoginPrompt />;

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 pb-16">
      {/* Header banner */}
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
          <span className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
          <Plane className="pointer-events-none absolute right-24 top-8 hidden size-9 -rotate-12 text-white/90 md:block" />

          <header className="relative flex items-center gap-5 px-6 pb-10 pt-10 sm:px-12">
            <span className="flex size-16 shrink-0 rotate-3 items-center justify-center rounded-3xl bg-white text-orange-500 shadow-xl shadow-sky-900/20">
              <Ticket className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                My bookings
              </h1>
              <p className="mt-1 text-sm font-semibold text-white/90">
                {loading
                  ? "Loading your trips..."
                  : `${bookings.length} ${bookings.length === 1 ? "trip" : "trips"} booked`}
              </p>
            </div>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <BookingTabs
          tab={tab}
          onChange={setTab}
          upcomingCount={upcoming.length}
          pastCount={past.length}
        />

        <div className="mt-6 space-y-6">
          {loading || isPending ? (
            <>
              <BookingSkeleton />
              <BookingSkeleton />
            </>
          ) : error ? (
            <BookingError message={error} onRetry={refetch} />
          ) : visible.length === 0 ? (
            <BookingEmptyState tab={tab} />
          ) : (
            visible.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                cancelling={cancellingId === booking._id}
                onCancel={cancelBooking}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default MyBookingComponent;
