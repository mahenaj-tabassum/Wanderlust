import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

import { getCategoryMeta } from "@/components/Destination/category-meta";
import type { Destination } from "@/components/types/destination";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const meta = getCategoryMeta(destination.category);

  const departure = new Date(
    `${destination.departureDate}T00:00:00`,
  ).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Link
      href={`/destinations/${destination._id}`}
      aria-label={`View details for ${destination.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent" />

        <span
          className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-md ${meta.chip}`}
        >
          <span aria-hidden="true">{meta.emoji}</span>
          {destination.category}
        </span>

        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
          <MapPin className="size-3.5 text-orange-500" />
          {destination.country}
        </span>

        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
          <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-base font-extrabold text-transparent">
            ${destination.price.toLocaleString()}
          </span>
          <span className="ml-1 text-[11px] font-semibold text-slate-500">
            / person
          </span>
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-700">
          {destination.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm font-medium leading-6 text-slate-500">
          {destination.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-cyan-100 pt-4">
          <span className="flex items-center gap-2 rounded-full bg-cyan-50 py-1 pl-1 pr-3 text-xs font-bold text-slate-700">
            <span className="flex size-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Clock className="size-3.5" />
            </span>
            {destination.duration}
          </span>

          <span className="flex items-center gap-2 rounded-full bg-orange-50 py-1 pl-1 pr-3 text-xs font-bold text-slate-700">
            <span className="flex size-6 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <CalendarDays className="size-3.5" />
            </span>
            {departure}
          </span>
        </div>

        <span className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-cyan-50 py-3 text-sm font-bold text-cyan-700 ring-1 ring-cyan-100 transition-all group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-sky-500 group-hover:text-white group-hover:ring-transparent">
          View details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default DestinationCard;
