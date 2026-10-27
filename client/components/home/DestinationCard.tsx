import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Destination } from "@/lib/data";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Card className="group overflow-hidden rounded-2xl p-0 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <Badge className="absolute left-3 top-3">Featured</Badge>
      </div>

      <CardContent className="space-y-2 px-5 pt-4">
        <h3 className="text-lg font-semibold">{destination.name}</h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" />
            {destination.country}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {destination.days} days
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-5 pb-5">
        <p className="text-sm text-muted-foreground">
          From{" "}
          <span className="text-xl font-bold text-foreground">
            ${destination.price}
          </span>
        </p>

        <Button size="sm" variant="outline" className="rounded-full">
          <Link href={`/destinations/${destination._id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
