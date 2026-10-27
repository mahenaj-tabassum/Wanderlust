"use client";

import { useState } from "react";
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
    <section className="mx-auto max-w-5xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My bookings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {loading
            ? "Loading your trips..."
            : `${bookings.length} ${bookings.length === 1 ? "trip" : "trips"} booked`}
        </p>
      </header>

      <BookingTabs
        tab={tab}
        onChange={setTab}
        upcomingCount={upcoming.length}
        pastCount={past.length}
      />

      <div className="mt-6 space-y-5">
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
  );
};

export default MyBookingComponent;
