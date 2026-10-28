"use client";

import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Destination } from "@/components/types/destination";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const router = useRouter();

  return (
    <Card className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
            {new Date(destination.departureDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>

      {/* Card action */}
      <CardFooter className="px-5 pb-5 pt-5">
        <Button
          variant="outline"
          className="w-full cursor-pointer rounded-xl border-slate-200 transition-colors hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          onClick={() => router.push(`/destinations/${destination._id}`)}
        >
          View details
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
