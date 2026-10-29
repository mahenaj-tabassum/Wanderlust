import { MessageCircleHeart, Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data";

// Cards cycle through this palette
const tones = [
  {
    stamp: "from-cyan-400 to-sky-500",
    strip: "from-cyan-400 to-sky-500",
    ring: "ring-cyan-300",
    fallback: "from-cyan-400 to-sky-500",
    glow: "hover:shadow-cyan-200/80",
  },
  {
    stamp: "from-orange-500 to-amber-400",
    strip: "from-orange-500 to-amber-400",
    ring: "ring-orange-300",
    fallback: "from-orange-500 to-amber-400",
    glow: "hover:shadow-orange-200/80",
  },
  {
    stamp: "from-amber-400 to-yellow-300",
    strip: "from-amber-400 to-yellow-300",
    ring: "ring-amber-300",
    fallback: "from-amber-400 to-yellow-400",
    glow: "hover:shadow-amber-200/80",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-cyan-50/60 to-white" />
      <span className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-orange-200/40 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600">
            <MessageCircleHeart className="size-3.5" />
            Reviews
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What Travelers{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Say
              </span>
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full text-orange-400"
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
            Real stories from people who explored with us.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const tone = tones[i % tones.length];
            return (
              <figure
                key={t.id}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 pt-8 shadow-lg shadow-cyan-100/60 ring-1 ring-cyan-100 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl lg:odd:-rotate-1 lg:even:rotate-1 ${tone.glow}`}
              >
                {/* Postcard colour strip */}
                <span
                  className={`absolute inset-x-0 top-0 h-2 bg-linear-to-r ${tone.strip}`}
                />

                {/* Postage stamp */}
                <span
                  className={`absolute right-5 top-6 flex size-14 rotate-6 items-center justify-center rounded-lg border-2 border-dashed border-white/80 bg-linear-to-br text-white shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${tone.stamp}`}
                >
                  <Quote className="size-6 fill-white/90" />
                </span>

                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label="Rated 5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="size-4.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 pr-2 text-[15px] font-medium leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>

                {/* Dashed "postmark" divider */}
                <div className="mt-6 border-t-2 border-dashed border-cyan-100" />

                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar
                    className={`size-12 ring-2 ring-offset-2 ${tone.ring}`}
                  >
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback
                      className={`bg-linear-to-br font-bold text-white ${tone.fallback}`}
                    >
                      {t.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-slate-900">
                      {t.name}
                    </p>
                    <p className="truncate text-xs font-semibold text-slate-500">
                      {t.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
