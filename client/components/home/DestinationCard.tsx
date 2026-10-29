import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import type { Destination } from "@/lib/data";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-200/70">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/45 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-3 py-1 text-xs font-bold text-white shadow-md">
          <Sparkles className="size-3.5" />
          Featured
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">
          <Clock className="size-3.5 text-cyan-600" />
          {destination.duration}
        </span>

        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
          <MapPin className="size-3.5 text-orange-500" />
          {destination.country}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-extrabold text-slate-900 transition-colors group-hover:text-cyan-700">
          {destination.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              From
            </p>
            <p className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-2xl font-extrabold text-transparent">
              ${destination.price}
            </p>
          </div>

          <Link
            href={`/destinations/${destination._id}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700 ring-1 ring-cyan-100 transition-all hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
          >
            View details
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
