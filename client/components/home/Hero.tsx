import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Compass,
  MessageCircle,
  Star,
  Zap,
} from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const popular = [
  { label: "Beaches", emoji: "🏖️" },
  { label: "Mountains", emoji: "⛰️" },
  { label: "Cities", emoji: "🏙️" },
  { label: "Culture", emoji: "🏯" },
];

const travelers = [
  { letter: "A", tone: "from-cyan-400 to-sky-500" },
  { letter: "S", tone: "from-orange-500 to-amber-400" },
  { letter: "R", tone: "from-rose-400 to-pink-500" },
  { letter: "N", tone: "from-amber-400 to-yellow-400" },
];

export default function Hero() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:h-[max(34rem,calc(100svh-4.3rem))] lg:px-8 lg:pb-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-cyan-50 via-white to-orange-50 ring-1 ring-cyan-100 lg:h-full">
        {/* Decorative background */}
        <span className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-cyan-200/50 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-24 right-1/3 size-72 rounded-full bg-orange-200/60 blur-3xl" />
        <span className="pointer-events-none absolute right-10 top-10 hidden size-3 rounded-full bg-orange-400 lg:block" />
        <span className="pointer-events-none absolute left-1/2 top-24 hidden size-2 rounded-full bg-cyan-400 lg:block" />
        <span className="pointer-events-none absolute bottom-16 left-10 hidden size-4 rounded-full bg-amber-300 lg:block" />

        <div className="relative grid items-center gap-12 px-5 py-10 sm:px-10 lg:h-full lg:grid-cols-[minmax(0,50fr)_minmax(0,35fr)] lg:gap-x-[5%] lg:px-12 lg:py-6">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-cyan-100">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-orange-500" />
              </span>
              ✈️ Over 500+ destinations worldwide
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:mt-[2.5svh] lg:text-[length:clamp(2.7rem,7svh,4.25rem)]">
              Discover Your Next{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Adventure
                </span>
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-cyan-400"
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

            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-500 lg:mt-[2.5svh] lg:text-[length:clamp(.95rem,2.4svh,1.2rem)]">
              Handpicked trips, trusted guides and unforgettable memories, all
              in one place.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-[4svh]">
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-300/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105"
              >
                Explore Destinations
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-cyan-700 shadow-sm ring-1 ring-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
              >
                <MessageCircle className="size-5" />
                Talk to us
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-7 flex items-center gap-3 lg:mt-[4svh]">
              <div className="flex -space-x-2.5">
                {travelers.map(({ letter, tone }) => (
                  <span
                    key={letter}
                    className={`flex size-10 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white ring-[3px] ring-white ${tone}`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div>
                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-500">
                  Loved by travelers worldwide
                </p>
              </div>
            </div>

            {/* Popular chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 lg:mt-[3.5svh]">
              <span className="text-sm font-bold text-slate-500">Popular:</span>
              {popular.map(({ label, emoji }) => (
                <Link
                  key={label}
                  href="/destinations"
                  className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-cyan-100 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
                >
                  {emoji} {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: arch illustration */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            {/* Tilted colour arch behind */}
            <span className="absolute inset-3 rotate-6 rounded-t-full rounded-b-[2.5rem] bg-linear-to-br from-orange-300 via-amber-200 to-cyan-200" />

            <div className="relative h-80 overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-2xl shadow-cyan-300/50 ring-8 ring-white sm:h-96 lg:h-[clamp(20rem,64svh,32rem)]">
              <HeroIllustration />
            </div>

            {/* Rotating text stamp */}
            <div className="absolute -bottom-5 -left-3 flex size-24 items-center justify-center rounded-full bg-white shadow-xl shadow-cyan-200/70 ring-1 ring-cyan-100 sm:-left-8 sm:size-28">
              <svg
                viewBox="0 0 110 110"
                className="absolute inset-0 size-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="hero-stamp-circle"
                    d="M55 55 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0"
                  />
                </defs>
                <text
                  className="fill-slate-700"
                  fontSize="11.5"
                  fontWeight="800"
                  letterSpacing="2.6"
                >
                  <textPath href="#hero-stamp-circle">
                    EXPLORE • DISCOVER • WANDER •
                  </textPath>
                </text>
              </svg>
              <span className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md">
                <Compass className="size-6" />
              </span>
            </div>

            {/* Floating cards */}
            <div className="absolute -right-2 top-14 flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-xl shadow-orange-200/60 ring-1 ring-orange-100 sm:-right-8">
              <span className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <BadgePercent className="size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Best price
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Guaranteed deals
                </p>
              </div>
            </div>

            <div className="absolute -right-1 bottom-8 flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-xl shadow-cyan-200/60 ring-1 ring-cyan-100 sm:-right-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                <Zap className="size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Instant booking
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Confirm in minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
