"use client";

import { useEffect, useMemo, useState } from "react";
import { CloudOff, MapPin, Plane, RotateCcw, Sparkles } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import DestinationCard from "./DestinationCard";
import EmptySearchResult from "@/components/Destination/EmptySearchResult";
import Search_and_Filters from "@/components/Destination/Search_and_Filters";
import NoDestinations from "@/components/Destination/NoDestinations";
import type { Destination } from "@/components/types/destination";

function DestinationSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100">
      <div className="h-56 animate-pulse bg-cyan-100/70" />
      <div className="space-y-3 p-5">
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-cyan-100/70" />
        <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
        <div className="flex gap-2 pt-3">
          <div className="h-7 w-24 animate-pulse rounded-full bg-cyan-100/70" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-orange-100/80" />
        </div>
        <div className="h-11 animate-pulse rounded-2xl bg-cyan-50" />
      </div>
    </div>
  );
}

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Fetch destinations
  useEffect(() => {
    let cancelled = false;

    async function fetchDestinations() {
      try {
        const { data, error } = await authClient.token();
        const jwtToken = data?.token;

        if (error || !jwtToken) {
          throw new Error("Failed to get authentication token");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/all-destinations`,
          { headers: { Authorization: `Bearer ${jwtToken}` } },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const result = await response.json();
        if (!cancelled) setDestinations(result.data ?? []);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDestinations();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = () => {
    setIsLoading(true);
    setHasError(false);
    setReloadKey((key) => key + 1);
  };

  // Filter destinations by search query and category
  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch = [
        destination.name,
        destination.country,
        destination.category,
      ].some((value) => (value ?? "").toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "All" || destination.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [destinations, searchQuery, selectedCategory]);

  const filtersActive = searchQuery !== "" || selectedCategory !== "All";

  // The API worked but returned nothing at all (different from "no search results")
  const noData = !isLoading && !hasError && destinations.length === 0;

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-50/60 via-white to-orange-50/40 text-slate-900">
      {/* Page header */}
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
          {/* Decoration */}
          <span className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-linear-to-br from-amber-200 to-orange-300 opacity-90" />
          <span className="pointer-events-none absolute right-1/3 top-10 size-2.5 rounded-full bg-amber-200" />
          <span className="pointer-events-none absolute bottom-24 left-1/2 size-2 rounded-full bg-white/80" />
          <Plane className="pointer-events-none absolute right-28 top-8 hidden size-10 -rotate-12 text-white/90 md:block" />
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full fill-white/10"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 40C240 90 480 0 720 40S1200 90 1440 30V80H0Z" />
          </svg>

          <div className="relative flex flex-col gap-8 px-6 pb-24 pt-12 sm:px-12 md:flex-row md:items-end md:justify-between lg:px-16 lg:pt-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white ring-1 ring-white/40 backdrop-blur">
                <Sparkles className="size-3.5" />
                Your next adventure starts here
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Explore the world,
                <span className="relative mt-1 block w-fit text-amber-200">
                  one trip at a time.
                  <svg
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-white"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8C30 2 50 12 80 6S130 2 160 8s30 0 38-4"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-white/90 sm:text-base">
                Discover incredible places, find your perfect getaway, and make
                memories that last a lifetime.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-xl shadow-sky-900/20">
              <div className="flex size-12 rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-md shadow-orange-300/60">
                <MapPin className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold leading-none text-slate-900">
                  {isLoading ? "…" : destinations.length}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  destinations
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Waiting to be explored
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Search and filters (overlaps the header) */}
        {!noData && (
          <Search_and_Filters
            className="-mt-12"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {hasError ? (
          <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-orange-200 bg-white px-6 py-16 text-center">
            <div className="mb-5 flex size-20 -rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-xl shadow-orange-300/60">
              <CloudOff className="size-9" />
            </div>
            <h3 className="text-xl font-extrabold">
              {"We couldn't load destinations"}
            </h3>
            <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500">
              Something went wrong while fetching trips. Check your connection
              and try again.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              <RotateCcw className="size-4" />
              Try again
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <DestinationSkeleton key={i} />
            ))}
          </div>
        ) : noData ? (
          <NoDestinations className="-mt-12" onRefresh={retry} />
        ) : (
          <>
            {/* Results count */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 font-extrabold text-cyan-700">
                  {filteredDestinations.length}
                </span>{" "}
                {filteredDestinations.length === 1
                  ? "destination"
                  : "destinations"}
              </p>

              {filtersActive && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-xs font-bold text-orange-600 ring-1 ring-orange-200 transition-colors hover:bg-orange-500 hover:text-white"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Destination cards or empty state */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                  />
                ))}
              </div>
            ) : (
              <EmptySearchResult onClear={handleClearFilters} />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Destinations;
