interface BookingErrorProps {
  message: string;
  onRetry: () => void;
}

const BookingError = ({ message, onRetry }: BookingErrorProps) => (
  <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
    <p className="text-sm text-red-700">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
    >
      Try again
    </button>
  </div>
);

export default BookingError;
