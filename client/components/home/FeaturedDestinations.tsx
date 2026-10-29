import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import DestinationCard from "./DestinationCard";
import FeaturedCarousel from "./FeaturedCarousel";
import type { Destination } from "@/lib/data";

export default async function FeaturedDestinations() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-destination`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch destinations: ${response.status}`);
  }

  const result = await response.json();
  const featuredDestinations: Destination[] = result.data ?? [];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-cyan-50/60 to-white" />
      <span className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-orange-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600">
              <Flame className="size-3.5" />
              Top picks
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Featured{" "}
              <span className="bg-linear-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>

            <p className="mt-2 max-w-xl font-medium text-slate-500">
              Explore the places travelers love the most this season. Swipe or
              use the arrows to browse.
            </p>
          </div>

          <Link
            href="/destinations"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
          >
            View all
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {featuredDestinations.length > 0 ? (
          <FeaturedCarousel>
            {featuredDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </FeaturedCarousel>
        ) : (
          <p className="mt-10 rounded-3xl bg-white p-10 text-center font-medium text-slate-500 ring-1 ring-cyan-100">
            No featured destinations yet. Check back soon! ✈️
          </p>
        )}
      </div>
    </section>
  );
}
