import { Sparkles } from "lucide-react";
import { features } from "@/lib/data";

// Each card cycles through this palette (works for any number of features)
const tones = [
  {
    tile: "from-cyan-400 to-sky-500 shadow-cyan-300/60",
    bar: "from-cyan-400 to-sky-500",
    num: "text-cyan-100",
    glow: "hover:shadow-cyan-200/80 hover:ring-cyan-300",
  },
  {
    tile: "from-orange-500 to-amber-400 shadow-orange-300/60",
    bar: "from-orange-500 to-amber-400",
    num: "text-orange-100",
    glow: "hover:shadow-orange-200/80 hover:ring-orange-300",
  },
  {
    tile: "from-amber-400 to-yellow-300 shadow-amber-300/60",
    bar: "from-amber-400 to-yellow-300",
    num: "text-amber-100",
    glow: "hover:shadow-amber-200/80 hover:ring-amber-300",
  },
  {
    tile: "from-rose-400 to-pink-500 shadow-rose-300/60",
    bar: "from-rose-400 to-pink-500",
    num: "text-rose-100",
    glow: "hover:shadow-rose-200/80 hover:ring-rose-300",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-orange-50/60 to-white" />
      <span className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full bg-orange-200/40 blur-3xl" />
      <span className="pointer-events-none absolute -left-24 bottom-10 size-72 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-700">
            <Sparkles className="size-3.5" />
            Why us
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                Wanderlust
              </span>
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full text-cyan-400"
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

          <p className="mt-4 font-medium text-slate-500">
            We take care of the details so you can focus on the journey.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, i) => {
            const t = tones[i % tones.length];
            return (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-cyan-100/60 ring-1 ring-cyan-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:even:mt-8 ${t.glow}`}
              >
                {/* Big faded number */}
                <span
                  className={`pointer-events-none absolute right-5 top-3 select-none text-6xl font-black leading-none ${t.num}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={`relative flex size-14 -rotate-3 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 ${t.tile}`}
                >
                  <Icon className="size-7" />
                </div>

                <h3 className="relative mt-6 text-lg font-extrabold text-slate-900">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  {description}
                </p>

                {/* Accent bar grows on hover */}
                <span
                  className={`absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-linear-to-r transition-transform duration-500 group-hover:scale-x-100 ${t.bar}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
