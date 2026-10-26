import Image from "next/image";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
          alt="Ocean view from a seaside resort"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-4 py-20 text-center text-white sm:min-h-[640px]">
          <span className="mb-4 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
            ✈️ Over 500+ destinations worldwide
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover Your Next <span className="text-sky-300">Adventure</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Handpicked trips, trusted guides and unforgettable memories, all in
            one place.
          </p>

          {/* Search card */}
          <form className="mt-10 grid w-full max-w-4xl gap-3 rounded-2xl bg-background p-3 text-foreground shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            <label className="flex items-center gap-2 rounded-xl border px-3">
              <MapPin className="size-4 shrink-0 text-primary" />
              <Input
                placeholder="Where to?"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border px-3">
              <CalendarDays className="size-4 shrink-0 text-primary" />
              <Input
                type="date"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border px-3">
              <Users className="size-4 shrink-0 text-primary" />
              <Input
                type="number"
                min={1}
                placeholder="Guests"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </label>
            <Button
              type="submit"
              size="lg"
              className="h-full min-h-10 rounded-xl sm:col-span-2 lg:col-span-1"
            >
              <Search className="size-4" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
