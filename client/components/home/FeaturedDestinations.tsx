import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationCard from "./DestinationCard";
import type { Destination } from "@/lib/data";

export default async function FeaturedDestinations() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-destinations`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const result = await response.json();
  const data: Destination[] = result.data ?? [];
  const featuredDestinations = data.slice(0, 6);
  console.log(featuredDestinations);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Top picks
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Destinations
          </h2>

          <p className="mt-2 max-w-xl text-muted-foreground">
            Explore the places travelers love the most this season.
          </p>
        </div>

        <Button variant="outline" className="w-fit rounded-full">
          <Link href="/destinations">
            View all <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredDestinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
