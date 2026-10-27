"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { Booking } from "./types";
import { getDaysLeft } from "./utils";

export const useMyBookings = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user?.id) return;

    // Fetch Bookings
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${user.id}`,
      );
      if (!res.ok) {
        toast.error("Failed to load bookings!");
      }

      const result: { message: string; data: Booking[] } = await res.json();
      setBookings(result.data);
    } catch (err) {
      console.error(err);
      setError("We could not load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setLoading(false);
      return;
    }
    fetchBookings();
  }, [isPending, user, fetchBookings]);

  const { upcoming, past } = useMemo(() => {
    const byDate = (a: Booking, b: Booking) =>
      new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();

    return {
      upcoming: bookings
        .filter((b) => getDaysLeft(b.departureDate) >= 0)
        .sort(byDate),
      past: bookings
        .filter((b) => getDaysLeft(b.departureDate) < 0)
        .sort((a, b) => byDate(b, a)),
    };
  }, [bookings]);

  const cancelBooking = async (booking: Booking) => {
    const confirmed = window.confirm(
      `Cancel your trip to ${booking.destinationName}? This cannot be undone.`,
    );
    if (!confirmed || !user) return;

    try {
      setCancellingId(booking._id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}?userId=${user.id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Cancel failed");

      setBookings((prev) => prev.filter((b) => b._id !== booking._id));
      toast.success("Booking cancelled.");
    } catch (err) {
      console.error(err);
      toast.error("Could not cancel the booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  return {
    user,
    isPending,
    bookings,
    upcoming,
    past,
    loading,
    error,
    cancellingId,
    refetch: fetchBookings,
    cancelBooking,
  };
};
