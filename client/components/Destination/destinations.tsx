"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import DestinationCard from "./DestinationCard";
import EmptySearchResult from "@/components/Destination/EmptySearchResult";
import Search_and_Filters from "@/components/Destination/Search_and_Filters";
import type { Destination } from "@/components/types/destination";

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch destinations
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const { data, error } = await authClient.token();
        const jwtToken = data?.token;

        if (error || !jwtToken) {
          throw new Error("Failed to get authentication token");
        }

        const response = await fetch("http://localhost:5000/all-destinations", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const result = await response.json();

        // Adjust this line to match your API response structure.
        setDestinations(result.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    }

    fetchDestinations();
  }, []);

  // Filter destinations by search query and category
  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch = [
        destination.name,
        destination.country,
        destination.category,
      ].some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      const matchesCategory =
        selectedCategory === "All" || destination.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [destinations, searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Page header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50"
              >
                YOUR NEXT ADVENTURE STARTS HERE
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Explore the world,
                <span className="block text-emerald-600">
                  one trip at a time.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover incredible places, find your perfect getaway, and make
                memories that last a lifetime.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {destinations.length} destinations
                </p>
                <p className="text-xs text-slate-500">Waiting to be explored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section>
          {/* Search and filters */}
          <Search_and_Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Results count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredDestinations.length}
              </span>{" "}
              {filteredDestinations.length === 1
                ? "destination"
                : "destinations"}
            </p>
          </div>

          {/* Destination cards or empty state */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      </div>
    </main>
  );
};

export default Destinations;
