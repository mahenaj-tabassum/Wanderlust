import { CloudOff, RotateCcw } from "lucide-react";

interface BookingErrorProps {
  message: string;
  onRetry: () => void;
}

const BookingError = ({ message, onRetry }: BookingErrorProps) => (
  <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-orange-200 bg-white px-6 py-14 text-center">
    <span className="mb-5 flex size-20 -rotate-3 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-xl shadow-orange-300/60">
      <CloudOff className="size-9" />
    </span>
    <h3 className="text-xl font-extrabold text-slate-900">
      Something went wrong
    </h3>
    <p
      role="alert"
      className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500"
    >
      {message}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-300/60 transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
    >
      <RotateCcw className="size-4" />
      Try again
    </button>
  </div>
);

export default BookingError;
