"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Headphones,
  Loader2,
  MapPin,
  Plane,
  ShieldCheck,
} from "lucide-react";
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

type ToastAction = {
  label: string;
  onClick: () => void;
};

/* react-toastify has no `description` / `action` options,
   so we render them as custom toast content */
const showToast = (
  type: "success" | "error" | "info",
  title: string,
  description?: string,
  action?: ToastAction,
) => {
  toast[type](({ closeToast }) => (
    <div>
      <p className="font-bold">{title}</p>
      {description && (
        <p className="mt-0.5 text-sm opacity-80">{description}</p>
      )}
      {action && (
        <button
          type="button"
          onClick={() => {
            action.onClick();
            closeToast?.();
          }}
          className="mt-2 cursor-pointer text-sm font-bold underline"
        >
          {action.label}
        </button>
      )}
    </div>
  ));
};

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
  // Becomes true once this trip is booked, so the button cannot be clicked again
  const [booked, setBooked] = useState(false);
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
      showToast(
        "error",
        "Login required",
        "Please log in first to book this trip.",
      );
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
      category: destination.category,
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
        showToast(
          "error",
          "Could not verify your account",
          "Please log out, log in again, and try once more.",
        );
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
          setBooked(true);
          showToast("info", title, description, {
            label: "My bookings",
            onClick: () => router.push("/my-booking"),
          });
        } else {
          showToast("error", title, description);
        }
        return;
      }

      // 6. সফল
      setBooked(true);
      showToast(
        "success",
        "Trip booked successfully!",
        `Your trip to ${destination.name}, ${destination.country} is confirmed for ${departureDate}.`,
        {
          label: "View booking",
          onClick: () => router.push("/my-booking"),
        },
      );
    } catch (error) {
      console.error("Booking error:", error);

      // fetch নিজেই ব্যর্থ হলে (ইন্টারনেট নেই / সার্ভার বন্ধ) TypeError আসে
      if (error instanceof TypeError) {
        showToast(
          "error",
          "Cannot reach the server",
          "Please check your internet connection and try again.",
        );
      } else {
        showToast(
          "error",
          "Something went wrong",
          "We could not complete your booking. Please try again.",
        );
      }
    } finally {
      bookingInProgress.current = false;
      setLoading(false);
    }
  };

  const rows = [
    {
      icon: MapPin,
      label: "Destination",
      value: destination.name,
      tone: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: Clock,
      label: "Duration",
      value: destination.duration,
      tone: "bg-orange-100 text-orange-500",
    },
    {
      icon: CalendarDays,
      label: "Departure",
      value: departureDate,
      tone: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-xl shadow-cyan-200/60 ring-1 ring-cyan-100 lg:sticky lg:top-24">
      {/* Price header */}
      <div className="relative overflow-hidden bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 px-6 pb-7 pt-6 text-white">
        <span className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
        <span className="pointer-events-none absolute -left-10 bottom-0 size-28 rounded-full bg-white/10" />
        <p className="relative text-xs font-extrabold uppercase tracking-wider text-white/90">
          Trip price
        </p>
        <div className="relative mt-2 flex items-baseline gap-2">
          <span className="text-5xl font-extrabold tracking-tight">
            ${destination.price.toLocaleString("en-US")}
          </span>
          <span className="text-sm font-bold text-white/90">/ person</span>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {rows.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {label}
                </p>
                <p className="truncate text-sm font-extrabold text-slate-900">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 border-t-2 border-dashed border-cyan-100" />

        <button
          type="button"
          onClick={handleBooking}
          disabled={loading || booked}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-400 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Booking...
            </>
          ) : booked ? (
            <>
              <CircleCheck className="size-5" />
              Already booked
            </>
          ) : (
            <>
              <Plane className="size-5" />
              Book This Trip
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-cyan-600" />
            Secure booking
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="size-4 text-orange-500" />
            24/7 support
          </span>
        </div>

        <p className="mt-3 text-center text-xs font-medium text-slate-400">
          Your next adventure starts here.
        </p>
      </div>
    </aside>
  );
};

export default PriceCard;
