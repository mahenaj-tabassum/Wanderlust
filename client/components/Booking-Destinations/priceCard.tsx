"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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

/* HTTP status অনুযায়ী ব্যবহারকারীর জন্য মেসেজ */
const getBookingErrorMessage = (status: number, serverMessage?: string) => {
  switch (status) {
    case 400:
      return {
        title: "Booking details are incomplete",
        description:
          serverMessage ??
          "Some required information is missing. Please refresh the page and try again.",
      };
    case 401:
      return {
        title: "Your session has expired",
        description: "Please log out, log in again, and then book this trip.",
      };
    case 404:
      return {
        title: "Destination not found",
        description:
          "This trip may have been removed. Please go back and choose another one.",
      };
    case 409:
      return {
        title: "Already booked",
        description:
          "You have already booked this trip. You can see it in My bookings.",
      };
    default:
      return {
        title: "Booking failed",
        description:
          status >= 500
            ? "Our server ran into a problem. Please try again in a few moments."
            : (serverMessage ?? "Something went wrong. Please try again."),
      };
  }
};

const PriceCard = ({ data }: DestinationDetailsProps) => {
  const router = useRouter();
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
    // 1. Login check
    if (!user) {
      toast.error("Login required", {
        description: "Please log in first to book this trip.",
      });
      return;
    }

    // 2. Prevent rapid repeated clicks before React re-renders
    if (bookingInProgress.current) return;
    bookingInProgress.current = true;
    setLoading(true);

    const bookingData = {
      userId: user.id,
      userName: user.name,
      email: user.email,
      destinationId: destination._id,
      destinationName: destination.name,
      destinationImage: destination.imageUrl,
      country: destination.country,
      price: destination.price,
      duration: destination.duration,
      departureDate: destination.departureDate,
      bookingDate: new Date(),
    };

    try {
      // 3. JWT token আনো
      const { data: tokenData, error: tokenError } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (tokenError || !jwtToken) {
        toast.error("Could not verify your account", {
          description: "Please log out, log in again, and try once more.",
        });
        return;
      }

      // 4. Booking request পাঠাও
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(bookingData),
      });

      // response body JSON না হলেও যেন ক্র্যাশ না করে
      const result: { message?: string } = await res.json().catch(() => ({}));

      // 5. Status অনুযায়ী মেসেজ
      if (!res.ok) {
        const { title, description } = getBookingErrorMessage(
          res.status,
          result.message,
        );

        if (res.status === 409) {
          // আগেই বুক করা, এটা ভুল না, তথ্য
          toast.info(title, {
            description,
            action: {
              label: "My bookings",
              onClick: () => router.push("/my-booking"),
            },
          });
        } else {
          toast.error(title, { description });
        }
        return;
      }

      // 6. সফল
      toast.success("Trip booked successfully!", {
        description: `Your trip to ${destination.name}, ${destination.country} is confirmed for ${departureDate}.`,
        action: {
          label: "View booking",
          onClick: () => router.push("/my-booking"),
        },
      });
    } catch (error) {
      console.error("Booking error:", error);

      // fetch নিজেই ব্যর্থ হলে (ইন্টারনেট নেই / সার্ভার বন্ধ) TypeError আসে
      if (error instanceof TypeError) {
        toast.error("Cannot reach the server", {
          description: "Please check your internet connection and try again.",
        });
      } else {
        toast.error("Something went wrong", {
          description: "We could not complete your booking. Please try again.",
        });
      }
    } finally {
      bookingInProgress.current = false;
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
        className="mt-7 w-full cursor-pointer rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
