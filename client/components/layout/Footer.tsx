import Link from "next/link";
import {
  ArrowUp,
  BadgePercent,
  ChevronRight,
  Compass,
  Headphones,
  Heart,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Company",
    dot: "bg-cyan-400",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Explore",
    dot: "bg-orange-400",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Tour Packages", href: "/destinations" },
      { label: "Guides", href: "#" },
      { label: "Offers", href: "#" },
    ],
  },
  {
    title: "Support",
    dot: "bg-amber-400",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: BsFacebook, label: "Facebook", hover: "hover:bg-sky-500" },
  { icon: FaInstagram, label: "Instagram", hover: "hover:bg-pink-500" },
  { icon: IoLogoTwitter, label: "Twitter", hover: "hover:bg-cyan-500" },
  { icon: FaYoutube, label: "YouTube", hover: "hover:bg-red-500" },
];

const perks = [
  {
    icon: ShieldCheck,
    label: "Secure payments",
    tone: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: Headphones,
    label: "24/7 support",
    tone: "bg-orange-100 text-orange-500",
  },
  {
    icon: BadgePercent,
    label: "Best price",
    tone: "bg-amber-100 text-amber-600",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-linear-to-b from-cyan-50 via-white to-orange-50 text-slate-600">
      {/* Wave edge: fill matches your page background (white by default) */}
      <svg
        className="absolute inset-x-0 top-0 h-10 w-full fill-white sm:h-14"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1440V30C1260 75 1080 75 900 40S540 -5 360 30 90 65 0 40Z" />
      </svg>

      {/* Decorative blobs */}
      <span className="pointer-events-none absolute -left-20 top-40 size-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <span className="pointer-events-none absolute -right-16 bottom-10 size-72 rounded-full bg-orange-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Newsletter card */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-400 via-sky-400 to-orange-300 px-6 py-9 shadow-xl shadow-cyan-200/60 sm:px-10">
          <span className="absolute -right-8 -top-12 size-44 rounded-full bg-amber-200/70" />
          <span className="absolute -bottom-10 left-1/3 size-28 rounded-full bg-white/20" />
          <Plane className="absolute right-10 top-8 hidden size-10 -rotate-12 text-white/90 sm:block" />

          <div className="relative grid items-center gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Get travel deals in your inbox ✈️
              </h3>
              <p className="mt-2 max-w-md text-sm font-medium text-white/90">
                Hidden gems, flash offers and trip ideas. No spam, just
                wanderlust.
              </p>
            </div>

            <form className="flex flex-col gap-2 sm:flex-row lg:justify-end">
              <Input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="h-12 rounded-full border-0 bg-white px-5 text-slate-800 shadow-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white/70 sm:max-w-xs"
              />
              <Button
                type="submit"
                className="h-12 cursor-pointer rounded-full bg-slate-900 px-7 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900"
            >
              <span className="flex size-10 rotate-3 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-cyan-300/60 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Compass className="size-5" />
              </span>
              <span>
                Wanderlust<span className="text-orange-500">.</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Your passport to unforgettable journeys. Discover, plan and book
              trips with people who love travel as much as you do.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {perks.map(({ icon: Icon, label, tone }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-cyan-100"
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-full ${tone}`}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
                <span className={`size-2 rounded-full ${col.dot}`} />
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group/link inline-flex items-center gap-1 font-medium text-slate-600 transition-all hover:translate-x-1 hover:text-cyan-700"
                    >
                      <ChevronRight className="-ml-4 size-3.5 text-orange-500 opacity-0 transition-all group-hover/link:ml-0 group-hover/link:opacity-100" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-cyan-100" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center text-sm text-slate-500 md:text-left">
            <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
            <p className="mt-0.5 flex items-center justify-center gap-1 text-xs md:justify-start">
              Made with{" "}
              <Heart className="size-3.5 fill-rose-400 text-rose-400" /> for
              travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, hover }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className={`flex size-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-cyan-100 transition-all hover:-translate-y-1 hover:text-white hover:shadow-md ${hover}`}
              >
                <Icon className="size-4" />
              </Link>
            ))}

            <a
              href="#"
              aria-label="Back to top"
              className="ml-2 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-md shadow-orange-300/50 transition-all hover:-translate-y-1 hover:brightness-105"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
