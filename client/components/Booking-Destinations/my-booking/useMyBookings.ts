"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { Booking } from "./types";
import { getDaysLeft } from "./utils";

export const useMyBookings = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userId = user?.id;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await authClient.token();
      const jwtToken = data?.token;
      if (!jwtToken) throw new Error("JWT Token not found!");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to load bookings (${res.status})`);
      }

      const result: { message: string; data: Booking[] } = await res.json();
      setBookings(result.data ?? []);
    } catch (err) {
      console.error(err);
      setError("We could not load your bookings. Please try again.");
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isPending) return;
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchBookings();
  }, [isPending, userId, fetchBookings]);

  // Split into upcoming and past trips
  const { upcoming, past } = useMemo(() => {
    const list = bookings ?? [];

    const byDate = (a: Booking, b: Booking) =>
      new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();

    return {
      upcoming: list
        .filter((b) => getDaysLeft(b.departureDate) >= 0)
        .sort(byDate),
      past: list
        .filter((b) => getDaysLeft(b.departureDate) < 0)
        .sort((a, b) => byDate(b, a)),
    };
  }, [bookings]);

  // Cancel a booking
  const cancelBooking = async (booking: Booking) => {
    const confirmed = window.confirm(
      `Cancel your trip to ${booking.destinationName}? This cannot be undone.`,
    );
    if (!confirmed || !userId) return;

    try {
      setCancellingId(booking._id);

      const { data } = await authClient.token();
      const jwtToken = data?.token;
      if (!jwtToken) throw new Error("JWT Token not found!");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}?userId=${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${jwtToken}` },
        },
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
