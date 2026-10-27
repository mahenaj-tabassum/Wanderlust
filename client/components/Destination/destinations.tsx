"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// 1. Define the structure of a destination
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
  rating: number;
  featured?: boolean;
}

const categories = [
  "All",
  "Beach",
  "Adventure",
  "Culture",
  "Luxury",
  "Romantic",
  "Nature",
];

const Destinations = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 3. API INTEGRATION PLACEHOLDER

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch("http://localhost:5000/all-destinations");

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

  // 4. Filter destinations by search query and category
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

  const featuredDestination = destinations.find(
    (destination) => destination.featured,
  );

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
        {/* Featured destination */}
        {featuredDestination && selectedCategory === "All" && !searchQuery && (
          <section className="mb-12">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">
                  HANDPICKED FOR YOU
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Featured destination
                </h2>
              </div>
            </div>

            <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white py-0 shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-64 overflow-hidden md:min-h-80">
                  <img
                    src={featuredDestination.imageUrl}
                    alt={featuredDestination.name}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <Badge className="absolute left-5 top-5 border-0 bg-white px-3 py-1.5 text-slate-900 hover:bg-white">
                    Featured trip
                  </Badge>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <Badge
                    variant="secondary"
                    className="mb-4 w-fit bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                  >
                    {featuredDestination.category}
                  </Badge>

                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {featuredDestination.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="size-4 text-emerald-600" />
                    {featuredDestination.country}
                  </p>

                  <p className="mt-5 leading-7 text-slate-600">
                    {featuredDestination.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Clock className="size-4 text-emerald-600" />
                      {featuredDestination.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-emerald-600" />
                      {new Date(
                        featuredDestination.departureDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    <div>
                      <p className="text-xs text-slate-500">Starting from</p>
                      <p className="text-3xl font-bold tracking-tight">
                        ${featuredDestination.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">per person</p>
                    </div>

                    <Button className="rounded-xl bg-emerald-600 px-5 hover:bg-emerald-700">
                      Explore trip
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Search and filters */}
        <section>
          <div className="mb-6 flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  All destinations
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Find a place that matches your travel style.
                </p>
              </div>

              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search places or countries..."
                  className="h-11 rounded-xl border-slate-200 bg-white pl-10 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="mr-1 size-4 text-slate-500" />

              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "rounded-full bg-emerald-600 px-4 hover:bg-emerald-700"
                      : "rounded-full border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-100"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

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

          {/* Destination cards */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <Card
                  key={destination._id}
                  className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Destination image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <Badge className="absolute left-4 top-4 border-0 bg-white/95 text-slate-800 hover:bg-white">
                      {destination.category}
                    </Badge>

                    <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm">
                      ${destination.price.toLocaleString()}
                      <span className="ml-1 text-xs font-normal text-slate-500">
                        / person
                      </span>
                    </div>
                  </div>

                  {/* Destination details */}
                  <CardContent className="p-5">
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="size-4 text-emerald-600" />
                      {destination.country}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-emerald-700">
                      {destination.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
                      {destination.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-4 text-emerald-600" />
                        {destination.duration}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4 text-emerald-600" />
                        {new Date(destination.departureDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </CardContent>

                  {/* Card action */}
                  <CardFooter className="px-5 pb-5 pt-5">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer rounded-xl border-slate-200 transition-colors hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => {
                        // TODO: Navigate to the destination details page.
                        router.push(`/destinations/${destination._id}`);
                      }}
                    >
                      View details
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty search results */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-50">
                <Search className="size-6 text-emerald-600" />
              </div>

              <h3 className="text-lg font-semibold">No destinations found</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Try searching for another place or choose a different category
                to discover more destinations.
              </p>

              <Button
                variant="outline"
                className="mt-5 rounded-xl"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Destinations;
