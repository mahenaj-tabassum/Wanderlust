import React from "react";

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
  const destination = data.data;
  
  const departureDate = new Date(
    `${destination.departureDate}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
        className="mt-7 w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        Book This Trip
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Your next adventure starts here.
      </p>
    </aside>
  );
};

export default PriceCard;
