import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Headphones,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-sky-600 via-cyan-500 to-orange-400 shadow-2xl shadow-cyan-300/50">
        {/* Background decoration */}
        <span className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute bottom-0 left-1/3 size-40 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute left-10 top-10 size-2.5 rounded-full bg-amber-200" />
        <span className="pointer-events-none absolute left-1/2 top-16 size-2 rounded-full bg-white/80" />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full fill-white/10"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 40C240 90 480 0 720 40S1200 90 1440 30V80H0Z" />
        </svg>

        <div className="relative grid items-center gap-10 px-6 py-14 sm:px-12 md:grid-cols-[1.15fr_1fr] lg:px-16 lg:py-20">
          {/* Copy */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white ring-1 ring-white/40 backdrop-blur">
              <Sparkles className="size-3.5" />
              Your next trip starts here
            </span>

            <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Start Your{" "}
              <span className="relative inline-block text-amber-200">
                Journey?
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
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base font-medium text-white/90 sm:text-lg md:mx-0">
              Join thousands of travelers and plan your dream trip in minutes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105"
              >
                Explore Destinations
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-white/15 px-8 py-3.5 text-base font-bold text-white ring-1 ring-white/60 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-sky-700"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Decorative scene (desktop / tablet) */}
          <div className="relative hidden h-72 md:block" aria-hidden="true">
            <span className="absolute -right-8 -top-10 size-72 rounded-full border border-white/25" />
            <span className="absolute -right-20 -top-24 size-96 rounded-full border border-white/15" />
            <span className="absolute right-6 top-2 size-48 rounded-full bg-linear-to-br from-amber-200 to-orange-300 shadow-2xl shadow-orange-600/40" />

            <svg
              className="absolute inset-0 size-full"
              viewBox="0 0 400 280"
              fill="none"
            >
              <path
                d="M10 250 C120 285 160 120 260 135 S340 70 372 40"
                stroke="#fff"
                strokeOpacity=".8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 10"
              />
            </svg>

            <span className="absolute right-0 top-4 flex size-14 rotate-12 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-xl">
              <Plane className="size-7" />
            </span>

            <span className="absolute bottom-6 left-2 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs font-bold text-slate-800 shadow-lg">
              <span className="flex size-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                <Globe className="size-4" />
              </span>
              500+ destinations
            </span>
            <span className="absolute right-2 top-36 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs font-bold text-slate-800 shadow-lg">
              <span className="flex size-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Headphones className="size-4" />
              </span>
              24/7 support
            </span>
            <span className="absolute bottom-0 right-16 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs font-bold text-slate-800 shadow-lg">
              <span className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <ShieldCheck className="size-4" />
              </span>
              Secure payments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
