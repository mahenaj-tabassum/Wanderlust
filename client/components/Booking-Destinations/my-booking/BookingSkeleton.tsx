const BookingSkeleton = () => (
  <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex-row">
    <div className="h-48 bg-slate-200 sm:h-auto sm:w-64" />
    <div className="flex-1 space-y-3 p-6">
      <div className="h-4 w-24 rounded bg-slate-200" />
      <div className="h-6 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-1/2 rounded bg-slate-200" />
      <div className="h-4 w-1/3 rounded bg-slate-200" />
    </div>
  </div>
);

export default BookingSkeleton;
