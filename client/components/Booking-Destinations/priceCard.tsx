"use client";

import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

interface DestinationDetailsProps {
  data: {
    message: string;
    data: Destination;
  };
}

const PriceCard = ({ data }: DestinationDetailsProps) => {
  const bookingInProgress = useRef(false);
  const [loading, setLoading] = useState(false);
  const destination = data.data;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const departureDate = new Date(
    `${destination.departureDate}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first to book this trip.");
      return;
    }

    // Prevent rapid repeated clicks before React re-renders
    if (bookingInProgress.current) return;
    setLoading(true);

    const bookingData = {
      userId: user.id,
      userName: user.name,
      email: user.email,
      destinationId: destination._id, // _id নয়, destinationId
      destinationName: destination.name,
      destinationImage: destination.imageUrl,
      country: destination.country,
      price: destination.price,
      duration: destination.duration,
      departureDate: destination.departureDate,
      bookingDate: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      const result = await res.json();

      if (res.status === 409) {
        toast.error("You have already booked this trip.");
        return;
      }

      if (!res.ok) {
        throw new Error(result.message || "Booking failed");
      }

      toast.success("Trip booked successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <p className="text-sm font-medium text-slate-500">Trip price</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          ${destination.price.toLocaleString("en-US")}
        </span>
        <span className="text-sm text-slate-500">/ person</span>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">Destination</span>
          <span className="font-medium text-slate-900">{destination.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Duration</span>
          <span className="font-medium text-slate-900">
            {destination.duration}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Departure</span>
          <span className="font-medium text-slate-900">{departureDate}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleBooking}
        disabled={loading}
        className="mt-7 w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        {loading ? "Booking..." : "Book This Trip"}
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Your next adventure starts here.
      </p>
    </aside>
  );
};

export default PriceCard;
