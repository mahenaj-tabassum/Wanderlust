const BookingSkeleton = () => (
  <div
    className="relative flex animate-pulse flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-cyan-100/70 ring-1 ring-cyan-100 sm:min-h-56 sm:flex-row"
    aria-hidden="true"
  >
    {/* Left accent stripe */}
    <span className="absolute inset-y-0 left-0 hidden w-1.5 bg-cyan-100 sm:block" />

    {/* Left: information */}
    <div className="order-2 flex flex-1 flex-col justify-between gap-4 p-5 sm:order-1 sm:py-5 sm:pl-7 sm:pr-12">
      <div>
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-full bg-emerald-100/70" />
        </div>
        <div className="mt-3 h-7 w-2/3 rounded-full bg-cyan-100/70" />
        <div className="mt-2 h-4 w-1/3 rounded-full bg-slate-100" />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-28 rounded-full bg-cyan-50" />
        <div className="h-8 w-24 rounded-full bg-orange-50" />
        <div className="h-8 w-32 rounded-full bg-amber-50" />
      </div>

      <div className="flex items-end justify-between gap-3 border-t-2 border-dashed border-cyan-100 pt-4">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-full bg-slate-100" />
          <div className="h-7 w-20 rounded-full bg-orange-100/80" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 rounded-full bg-rose-50" />
          <div className="h-8 w-24 rounded-full bg-cyan-100/70" />
        </div>
      </div>
    </div>

    {/* Right: slanted photo + ring */}
    <div className="relative order-1 h-40 shrink-0 sm:order-2 sm:-ml-8 sm:h-auto sm:w-60">
      <div className="absolute inset-0 bg-cyan-100/70 sm:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]" />
      <span className="absolute right-3 top-3 h-6 w-20 rounded-full bg-white/70" />
      <span className="absolute bottom-3 right-3 size-16 rounded-full bg-white shadow-lg ring-1 ring-cyan-100 sm:bottom-auto sm:left-[7%] sm:right-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2" />
    </div>
  </div>
);

export default BookingSkeleton;
