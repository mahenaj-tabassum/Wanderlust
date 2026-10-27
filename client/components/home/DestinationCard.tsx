import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Destination } from "@/lib/data";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const { id, name, country, price, rating, days, image, tag } = destination;

  return (
    <Card className="group overflow-hidden rounded-2xl p-0 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute left-3 top-3">{tag}</Badge>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-900">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
        </span>
      </div>

      <CardContent className="space-y-2 px-5 pt-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" /> {country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" /> {days} days
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-5 pb-5">
        <p className="text-sm text-muted-foreground">
          From{" "}
          <span className="text-xl font-bold text-foreground">${price}</span>
        </p>
        <Button size="sm" variant="outline" className="rounded-full">
          <Link href={`/destinations/${id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
